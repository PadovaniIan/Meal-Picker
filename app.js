(() => {
  const BASE = 4; // recipes are written for 4 servings
  const $ = id => document.getElementById(id);
  const byId = Object.fromEntries([...LUNCHES, ...DINNERS].map(r => [r.id, r]));
  let state = { lunches: [], dinners: [] };

  /* ---------- randomness (crypto, unbiased) ---------- */
  function rnd(n) {
    const buf = new Uint32Array(1), lim = Math.floor(0x100000000 / n) * n;
    let x; do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= lim);
    return x % n;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- picking with variety rules ---------- */
  // No more than ~1/3 of the picks share a protein; same cap for slow-cooker dinners.
  const keys = r => [r.p, r.sc ? "slowcooker" : null].filter(Boolean);
  function fits(r, chosen, cap) {
    return keys(r).every(k => chosen.filter(c => keys(c).includes(k)).length < cap);
  }
  function pick(pool, n) {
    n = Math.min(n, pool.length);
    const cap = Math.max(1, Math.ceil(n / 3)), out = [];
    for (const r of shuffle(pool)) { if (out.length >= n) break; if (fits(r, out, cap)) out.push(r); }
    for (const r of shuffle(pool)) { if (out.length >= n) break; if (!out.includes(r)) out.push(r); }
    return shuffle(out);
  }
  function swapOne(pool, list, idx) {
    const others = list.filter((_, i) => i !== idx);
    const cap = Math.max(1, Math.ceil(list.length / 3));
    const free = shuffle(pool.filter(r => !list.includes(r)));
    if (!free.length) return list;
    const next = free.find(r => fits(r, others, cap)) || free[0];
    const copy = list.slice(); copy[idx] = next; return copy;
  }

  /* ---------- amounts ---------- */
  const WHOLE_UNITS = ["can", "jar", "pkg", "bag", "bunch", "pint", "clove"];
  const HALF_OK = ["onion", "red onion", "bell pepper", "lemon", "lime", "cucumber", "avocado", "sweet potato", "zucchini", "apple", "tomato"];
  const PLURAL_UNIT = { cup: "cups", can: "cans", jar: "jars", clove: "cloves", bunch: "bunches", pint: "pints", bag: "bags" };
  const FRAC = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

  // Small volumes step down to a smaller spoon so tiny batches stay accurate.
  const TSP = { cup: 48, tbsp: 3, tsp: 1 };
  function bestVolume(tsp) {
    if (tsp >= 12) return [tsp / 48, "cup"];
    if (tsp >= 3) return [tsp / 3, "tbsp"];
    return [tsp, "tsp"];
  }
  function roundAmt(v, unit, name) {
    if (WHOLE_UNITS.includes(unit)) return Math.max(1, Math.ceil(v - 0.05));
    if (unit === "oz") return Math.max(1, Math.round(v));
    if (!unit) return HALF_OK.includes(name) ? Math.max(0.5, Math.ceil(v * 2 - 0.1) / 2) : Math.max(1, Math.ceil(v - 0.1));
    return Math.max(0.25, Math.round(v * 4) / 4);
  }
  function numText(v) {
    const w = Math.floor(v), f = +(v - w).toFixed(2);
    return (w ? String(w) : "") + (FRAC[f] || (f ? f.toString().slice(1) : "")) || "0";
  }
  function plural(name) {
    if (/zucchini$/.test(name)) return name;
    if (/(potato|tomato)$/.test(name)) return name + "es";
    if (/(ch|sh|x)$/.test(name)) return name + "es";
    return name + "s";
  }
  function fitUnit(v, unit) {
    if (!TSP[unit]) return [v, unit];
    const [nv, nu] = bestVolume(v * TSP[unit]);
    return TSP[nu] < TSP[unit] ? [nv, nu] : [v, unit]; // only step down, never up
  }
  function line(v, unit, name) {
    const n = numText(v);
    if (!unit) return `${n} ${v > 1 ? plural(name) : name}`;
    const u = v > 1 && PLURAL_UNIT[unit] ? PLURAL_UNIT[unit] : unit;
    return `${n} ${u} ${name}`;
  }
  const scaled = (r, servings) => r.i.map(([q, u, n]) => {
    const [v, unit] = fitUnit(q * servings / BASE, u);
    return [roundAmt(v, unit, n), unit, n];
  });

  /* ---------- shopping list ---------- */
  const CATS = ["Produce", "Meat", "Fridge", "Frozen", "Bread", "Pantry"];
  function category(unit, name) {
    if (/^frozen/.test(name)) return "Frozen";
    if (/broth|powder|seasoning/.test(name)) return "Pantry";
    if (/chicken|beef|pork|turkey|sausage|salami|bacon|kielbasa|steak|roast/.test(name)) return "Meat";
    if (/parmesan|^egg$|hummus|mayo|orange juice/.test(name)) return "Fridge";
    if (/bun|pita|tortilla|roll$|taco shell/.test(name)) return "Bread";
    if (["can", "jar"].includes(unit)) return "Pantry";
    if (/onion$|bell pepper|carrot|lemon|lime|cucumber|^tomato$|cherry tomatoes|spinach|potato|zucchini|green beans|snap peas|parsley|avocado|apple$|celery|mushrooms|garlic|asparagus|lettuce|broccoli|coleslaw/.test(name)) return "Produce";
    return "Pantry";
  }
  function shoppingList() {
    const total = {};
    const add = (r, servings) => r.i.forEach(([q, u, n]) => {
      const vol = TSP[u], k = (vol ? "vol" : u) + "|" + n;
      total[k] = (total[k] || 0) + q * servings / BASE * (vol || 1);
    });
    state.lunches.forEach(x => add(x.r, x.servings));
    state.dinners.forEach(x => add(x.r, x.servings));
    const groups = {};
    Object.entries(total).forEach(([k, v]) => {
      let [u, n] = k.split("|");
      if (u === "vol") [v, u] = bestVolume(v);
      (groups[category(u, n)] ||= []).push({ n, text: line(roundAmt(v, u, n), u, n) });
    });
    return CATS.filter(c => groups[c]).map(c => ({ cat: c, items: groups[c].sort((a, b) => a.n.localeCompare(b.n)) }));
  }

  /* ---------- render ---------- */
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function card(r, servings, tags, onSwap) {
    const c = el("article", "card");
    const b = el("button", "swap", "↻"); b.type = "button"; b.title = "Swap"; b.setAttribute("aria-label", "Swap " + r.n); b.onclick = onSwap;
    c.append(b, el("h3", null, r.n));
    const meta = el("div", "meta"); tags.forEach(t => meta.append(el("span", "tag", t))); c.append(meta);
    const ul = el("ul"); scaled(r, servings).forEach(([v, u, n]) => ul.append(el("li", null, line(v, u, n)))); c.append(ul);
    const d = el("details"); d.append(el("summary", null, "Steps"));
    const ol = el("ol"); r.s.forEach(s => ol.append(el("li", null, s))); d.append(ol); c.append(d);
    return c;
  }
  const timeTags = r => r.sc ? [`${r.m} min prep`, `Slow cooker ${r.h} hr`] : [`${r.m} min`];

  function render() {
    const L = $("lunchList"), D = $("dinnerList"), S = $("shopList");
    L.replaceChildren(); D.replaceChildren(); S.replaceChildren();

    state.lunches.forEach((x, i) => L.append(card(x.r, x.servings,
      [x.r.t, ...timeTags(x.r), `${x.servings} box${x.servings > 1 ? "es" : ""}`],
      () => { state.lunches = swapList(LUNCHES, state.lunches, i); save(); render(); })));
    state.dinners.forEach((x, i) => D.append(card(x.r, x.servings,
      [...timeTags(x.r), `${x.servings} serving${x.servings > 1 ? "s" : ""}`],
      () => { state.dinners = swapList(DINNERS, state.dinners, i); save(); render(); })));

    shoppingList().forEach(g => {
      S.append(el("h4", null, g.cat));
      const ul = el("ul"); g.items.forEach(it => ul.append(el("li", null, it.text))); S.append(ul);
    });
    $("lunchSec").hidden = !state.lunches.length;
    $("dinnerSec").hidden = !state.dinners.length;
    $("shopSec").hidden = !(state.lunches.length || state.dinners.length);
  }
  function swapList(pool, list, idx) {
    const rs = swapOne(pool, list.map(x => x.r), idx);
    return list.map((x, i) => ({ r: rs[i], servings: x.servings }));
  }

  /* ---------- inputs ---------- */
  function num(id) {
    const e = $(id), v = Math.round(+e.value);
    const c = Math.min(+e.max, Math.max(+e.min, isNaN(v) ? +e.min : v));
    e.value = c; return c;
  }
  function settings() {
    return { people: num("people"), days: num("days"), lunches: num("lunches"), dinners: num("dinners"), leftovers: $("leftovers").checked };
  }
  function lunchPortions(total, count) {
    count = Math.min(count, total);
    return Array.from({ length: count }, (_, i) => Math.floor(total / count) + (i < total % count ? 1 : 0));
  }
  function build(s, lunchRecipes, dinnerRecipes) {
    const portions = lunchPortions(s.people * s.days, lunchRecipes.length);
    state.lunches = portions.map((p, i) => ({ r: lunchRecipes[i], servings: p }));
    const ds = s.people * (s.leftovers ? 2 : 1);
    state.dinners = dinnerRecipes.map(r => ({ r, servings: ds }));
  }
  function randomize() {
    const s = settings();
    const nL = s.days ? Math.min(s.lunches, s.people * s.days) : 0;
    build(s, pick(LUNCHES, nL), pick(DINNERS, s.dinners));
    save(); render();
  }

  /* ---------- URL hash (refresh/share keeps the same week) ---------- */
  function save() {
    const s = settings();
    const h = new URLSearchParams({ p: s.people, d: s.days, o: s.leftovers ? 1 : 0,
      L: state.lunches.map(x => x.r.id).join("."), D: state.dinners.map(x => x.r.id).join(".") });
    history.replaceState(null, "", "#" + h.toString());
  }
  function load() {
    if (!location.hash) return false;
    const h = new URLSearchParams(location.hash.slice(1));
    const ids = k => (h.get(k) || "").split(".").filter(id => byId[id]).map(id => byId[id]);
    const L = ids("L").filter(r => r.id[0] === "l"), D = ids("D").filter(r => r.id[0] === "d");
    if (!L.length && !D.length) return false;
    if (h.has("p")) $("people").value = h.get("p");
    if (h.has("d")) $("days").value = h.get("d");
    $("leftovers").checked = h.get("o") !== "0";
    $("lunches").value = L.length; $("dinners").value = D.length;
    const s = settings();
    build(s, L.slice(0, s.people * s.days), D);
    render(); return true;
  }

  /* ---------- events ---------- */
  $("controls").addEventListener("submit", e => { e.preventDefault(); randomize(); });
  $("copy").addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation();
    const text = shoppingList().map(g => g.cat + "\n" + g.items.map(i => "- " + i.text).join("\n")).join("\n\n");
    navigator.clipboard?.writeText(text).then(() => { e.target.textContent = "Copied"; setTimeout(() => e.target.textContent = "Copy", 1500); });
  });

  if (!load()) randomize();
})();
