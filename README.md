# Meal Picker

Random weekly lunches and dinners. Static site — no build step.

## Put it on GitHub Pages
1. Create a new repo on GitHub (e.g. `meal-picker`).
2. Upload `index.html`, `style.css`, `app.js`, `recipes.js`.
3. Repo **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
4. Site appears at `https://<your-username>.github.io/meal-picker/` in a minute or two.

## Use
- **People** – who's eating.
- **Lunch days** – workdays to prep for.
- **Lunches** – how many different lunch recipes to split those days across.
- **Dinners** – how many dinner recipes.
- **Leftovers** – doubles dinner amounts.
- **↻** on a card swaps just that meal.
- The URL keeps the current week, so refresh or bookmark it.

## Add or edit recipes
Edit `recipes.js`. Every recipe is written for 4 servings; amounts scale automatically.
```
{id:"d49", n:"Name", m:30, p:"chicken", i:[[1.5,"lb","chicken breast"],[1,"","onion"]], s:["Step one.","Step two."]}
```
- Lunches also need `t:"Heat"` or `t:"Cold"`.
- Slow cooker: add `sc:1, h:8` (`m` = hands-on minutes).
- Give each recipe a new, unique `id` (`l…` for lunches, `d…` for dinners).

## Rules the recipes follow
- No cilantro, coconut, spicy food, or lactose dairy (parmesan only).
- Lunches: one container, keep for the week, no strong-smelling microwave foods (no fish, eggs as the main item, broccoli, cabbage, or curry).
- Dinners: 60 min or less, or slow cooker with ≤20 min prep. Leftovers reheat well in a microwave or air fryer.
