// All recipes are written for 4 servings. The app scales them.
// i: [amount, unit, item]   unit "" = count
// p: main protein (keeps the week varied)
// Lunches: t = "Heat" or "Cold". No fish, egg dishes, broccoli, cabbage, or curry (office-microwave safe).
// Dinners: m = total minutes (60 max). sc = slow cooker (m = hands-on minutes, h = hours on Low).

const LUNCHES = [
{id:"l1",n:"Teriyaki Chicken Bowl",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","white rice"],[0.5,"cup","teriyaki sauce"],[2,"","carrot"],[2,"cup","snap peas"],[1,"tbsp","oil"],[1,"tsp","sesame seeds"]],
s:["Cook rice in the rice cooker.","Cut chicken into bite-size pieces. Slice carrots thin.","Heat oil in a large pan on medium-high. Cook chicken 6–8 min, until no pink.","Add carrots and snap peas. Cook 3 min.","Stir in teriyaki sauce. Cook 1 min.","Split rice and chicken into containers. Top with sesame seeds."]},

{id:"l2",n:"Beef Taco Rice Bowl",t:"Heat",m:30,p:"beef",i:[[1,"lb","ground beef"],[1.5,"cup","white rice"],[1,"can","black beans"],[1,"cup","frozen corn"],[1,"cup","mild salsa"],[1,"tsp","cumin"],[1,"tsp","paprika"],[1,"tsp","garlic powder"]],
s:["Cook rice in the rice cooker.","Brown beef in a pan on medium-high, 8 min. Drain fat.","Add cumin, paprika, garlic powder, and salt. Stir 1 min.","Rinse beans. Add beans and corn to the pan. Heat 3 min.","Split rice and beef into containers. Top with salsa."]},

{id:"l3",n:"Chicken Burrito Bowl",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","white rice"],[1,"can","pinto beans"],[1,"","bell pepper"],[1,"","onion"],[1,"cup","frozen corn"],[1,"cup","mild salsa"],[1,"","lime"],[1,"tsp","cumin"],[1,"tsp","paprika"],[1,"tbsp","oil"]],
s:["Cook rice. Stir lime juice into the rice.","Cut chicken into small pieces. Slice pepper and onion.","Heat oil in a pan on medium-high. Cook chicken with cumin, paprika, and salt, 7 min.","Add pepper and onion. Cook 4 min.","Rinse beans. Microwave beans and corn 2 min.","Split everything into containers. Top with salsa."]},

{id:"l4",n:"Pasta Bolognese",t:"Heat",m:35,p:"beef",i:[[1,"lb","ground beef"],[1,"lb","penne"],[1,"jar","marinara (24 oz)"],[1,"","onion"],[2,"clove","garlic"],[0.5,"cup","grated parmesan"]],
s:["Boil pasta per the box. Drain.","Dice onion. Mince garlic.","Brown beef and onion in a pan, 8 min. Drain fat.","Add garlic. Cook 1 min. Add marinara. Simmer 10 min.","Mix in pasta. Split into containers. Top with parmesan."]},

{id:"l5",n:"Lemon Chicken Orzo",t:"Heat",m:30,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","orzo"],[3,"cup","chicken broth"],[3,"cup","baby spinach"],[1,"","lemon"],[2,"clove","garlic"],[0.5,"cup","grated parmesan"],[1,"tbsp","olive oil"],[1,"tsp","oregano"]],
s:["Cut chicken into bite-size pieces. Season with oregano, salt, and pepper.","Heat oil in a deep pan. Cook chicken 6 min. Move to a plate.","Add minced garlic, orzo, and broth to the pan. Bring to a boil.","Lower heat. Simmer 10 min, stirring often.","Stir in spinach, chicken, lemon juice, and parmesan.","Split into containers."]},

{id:"l6",n:"Greek Chicken Bowl",t:"Cold",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","white rice"],[1,"","cucumber"],[1,"pint","cherry tomatoes"],[0.5,"cup","kalamata olives"],[0.5,"","red onion"],[1,"","lemon"],[3,"tbsp","olive oil"],[1,"tsp","oregano"]],
s:["Cook rice. Let it cool.","Rub chicken with a little oil, oregano, salt, and pepper.","Air fry at 380°F for 18–20 min. Slice.","Chop cucumber and onion. Halve tomatoes.","Mix the rest of the oil with lemon juice.","Pack rice, chicken, veggies, and olives. Pour dressing over. Eat cold."]},

{id:"l7",n:"Italian Pasta Salad",t:"Cold",m:25,p:"pork",i:[[1,"lb","rotini"],[4,"oz","salami"],[1,"pint","cherry tomatoes"],[1,"","cucumber"],[0.5,"cup","black olives"],[0.5,"cup","grated parmesan"],[0.25,"cup","olive oil"],[3,"tbsp","red wine vinegar"],[1,"tsp","Italian seasoning"]],
s:["Boil pasta per the box. Rinse with cold water. Drain.","Chop salami and cucumber. Halve tomatoes.","Whisk oil, vinegar, Italian seasoning, and salt.","Toss everything together with parmesan.","Split into containers. Eat cold."]},

{id:"l8",n:"Chicken Fried Rice",t:"Heat",m:30,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","white rice"],[2,"cup","frozen peas & carrots"],[3,"","green onion"],[3,"tbsp","soy sauce"],[1,"tsp","sesame oil"],[2,"clove","garlic"],[1,"tbsp","oil"]],
s:["Cook rice. Spread on a tray to cool 10 min.","Cut chicken small. Cook in oil on high, 6 min.","Add minced garlic and peas & carrots. Cook 3 min.","Add rice, soy sauce, and sesame oil. Stir-fry 3 min.","Top with sliced green onion. Split into containers."]},

{id:"l9",n:"Beef & Snap Pea Stir-Fry",t:"Heat",m:30,p:"beef",i:[[1,"lb","flank steak"],[1.5,"cup","white rice"],[3,"cup","snap peas"],[1,"","bell pepper"],[0.25,"cup","soy sauce"],[1,"tbsp","brown sugar"],[1,"tbsp","cornstarch"],[2,"clove","garlic"],[1,"tsp","ground ginger"],[1,"tbsp","oil"]],
s:["Cook rice.","Slice beef into thin strips. Toss with cornstarch.","Mix soy sauce, sugar, minced garlic, ginger, and a splash of water.","Cook beef in hot oil, 3 min. Move to a plate.","Cook snap peas and sliced pepper, 3 min.","Add beef and sauce. Stir 2 min, until thick.","Split with rice into containers."]},

{id:"l10",n:"Sweet & Sour Chicken",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","white rice"],[1,"can","pineapple chunks (20 oz)"],[2,"","bell pepper"],[0.25,"cup","ketchup"],[0.25,"cup","rice vinegar"],[3,"tbsp","brown sugar"],[2,"tbsp","soy sauce"],[1,"tbsp","cornstarch"],[1,"tbsp","oil"]],
s:["Cook rice.","Cut chicken and peppers into chunks.","Cook chicken in oil on medium-high, 7 min.","Add peppers and drained pineapple. Cook 3 min.","Mix ketchup, vinegar, sugar, soy sauce, and cornstarch. Pour in.","Stir 2 min, until thick. Split with rice."]},

{id:"l11",n:"Turkey Meatball Pasta",t:"Heat",m:40,p:"turkey",i:[[1,"lb","ground turkey"],[0.5,"cup","panko"],[1,"","egg"],[0.25,"cup","grated parmesan"],[1,"lb","rotini"],[1,"jar","marinara (24 oz)"],[1,"tsp","Italian seasoning"]],
s:["Heat oven to 400°F.","Mix turkey, panko, egg, parmesan, seasoning, and salt. Roll into 1-inch balls.","Bake on a lined tray, 18 min.","Boil pasta per the box. Drain.","Warm marinara. Add meatballs.","Split pasta and meatballs into containers."]},

{id:"l12",n:"Beef & Bean Chili",t:"Heat",m:45,p:"beef",i:[[1,"lb","ground beef"],[1,"","onion"],[1,"","bell pepper"],[1,"can","kidney beans"],[1,"can","black beans"],[1,"can","crushed tomatoes (28 oz)"],[1,"tbsp","paprika"],[2,"tsp","cumin"],[1,"tsp","garlic powder"],[1,"cup","white rice"]],
s:["Dice onion and pepper.","Brown beef, onion, and pepper in a large pot, 8 min. Drain fat.","Add spices. Stir 1 min.","Rinse beans. Add beans and tomatoes. Simmer 25 min.","Cook rice while it simmers.","Split rice and chili into containers."]},

{id:"l13",n:"Honey Mustard Chicken & Sweet Potato",t:"Heat",m:40,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[2,"","sweet potato"],[12,"oz","green beans"],[3,"tbsp","Dijon mustard"],[2,"tbsp","honey"],[2,"tbsp","olive oil"]],
s:["Heat oven to 425°F.","Cut sweet potatoes into 1-inch cubes. Trim green beans.","Mix mustard and honey. Coat the chicken.","Spread everything on a lined sheet pan. Add oil, salt, and pepper.","Bake 25–30 min, until chicken is cooked through.","Slice chicken. Split into containers."]},

{id:"l14",n:"Honey Garlic Chicken & Rice",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","white rice"],[12,"oz","green beans"],[0.25,"cup","honey"],[3,"tbsp","soy sauce"],[4,"clove","garlic"],[1,"tbsp","cornstarch"],[1,"tbsp","oil"]],
s:["Cook rice.","Cut chicken into pieces. Cook in oil, 7 min.","Add green beans. Cook 4 min.","Mix honey, soy sauce, minced garlic, cornstarch, and a splash of water. Pour in.","Stir until thick. Split with rice."]},

{id:"l15",n:"BBQ Chicken & Potatoes",t:"Heat",m:40,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"lb","baby potatoes"],[2,"cup","frozen corn"],[0.5,"cup","BBQ sauce"],[2,"tbsp","olive oil"],[1,"tsp","paprika"]],
s:["Halve potatoes. Toss with oil, paprika, and salt.","Air fry at 400°F for 18 min. Shake halfway.","Cut chicken into chunks. Cook in a pan, 7 min.","Stir BBQ sauce into the chicken.","Microwave corn 3 min.","Split into containers."]},

{id:"l16",n:"Peanut Noodle Salad",t:"Cold",m:25,p:"chicken",i:[[0.75,"lb","spaghetti"],[1,"lb","chicken breast"],[2,"","carrot"],[1,"","cucumber"],[1,"cup","frozen shelled edamame"],[0.25,"cup","peanut butter"],[3,"tbsp","soy sauce"],[2,"tbsp","honey"],[2,"tbsp","rice vinegar"],[1,"tsp","sesame oil"]],
s:["Boil spaghetti. Rinse with cold water. Drain.","Cook chicken in a pan, 6 min per side. Slice.","Shred carrots. Slice cucumber thin. Microwave edamame 2 min.","Whisk peanut butter, soy sauce, honey, vinegar, sesame oil, and a splash of warm water.","Toss everything. Split into containers. Eat cold."]},

{id:"l17",n:"Chickpea Quinoa Salad",t:"Cold",m:25,p:"veg",i:[[1.5,"cup","quinoa"],[2,"can","chickpeas"],[1,"","cucumber"],[1,"pint","cherry tomatoes"],[0.5,"","red onion"],[1,"bunch","parsley"],[0.25,"cup","olive oil"],[2,"","lemon"]],
s:["Rinse quinoa. Cook in the rice cooker like white rice. Let cool.","Rinse chickpeas. Chop cucumber, tomatoes, onion, and parsley.","Whisk oil, lemon juice, salt, and pepper.","Toss everything. Split into containers. Eat cold."]},

{id:"l18",n:"Stuffed Pepper Bowl",t:"Heat",m:35,p:"turkey",i:[[1,"lb","ground turkey"],[1.5,"cup","white rice"],[2,"","bell pepper"],[1,"","onion"],[1,"can","diced tomatoes"],[1,"tsp","Italian seasoning"],[0.5,"cup","grated parmesan"]],
s:["Cook rice.","Dice peppers and onion.","Brown turkey with peppers and onion, 10 min.","Add tomatoes and seasoning. Simmer 5 min.","Stir in rice. Split into containers. Top with parmesan."]},

{id:"l19",n:"Sausage, Peppers & Potatoes",t:"Heat",m:40,p:"pork",i:[[1,"lb","mild Italian sausage"],[1.5,"lb","baby potatoes"],[2,"","bell pepper"],[1,"","onion"],[2,"tbsp","olive oil"],[1,"tsp","Italian seasoning"]],
s:["Heat oven to 425°F.","Halve potatoes. Slice sausage, peppers, and onion.","Toss everything with oil, seasoning, and salt on a sheet pan.","Bake 30 min. Stir halfway.","Split into containers."]},

{id:"l20",n:"Carnitas Bowl",t:"Heat",m:15,sc:1,h:8,p:"pork",i:[[2,"lb","pork shoulder"],[1,"cup","orange juice"],[1,"","onion"],[4,"clove","garlic"],[2,"tsp","cumin"],[1,"tsp","oregano"],[1.5,"cup","white rice"],[1,"can","black beans"],[1,"cup","frozen corn"],[1,"","lime"]],
s:["Cut pork into 4 chunks. Rub with cumin, oregano, and salt.","Put pork, chopped onion, garlic, and orange juice in the slow cooker.","Cook on Low 8 hr.","Shred pork with two forks.","Cook rice. Rinse beans. Microwave beans and corn 2 min.","Split into containers. Squeeze lime on top."]},

{id:"l21",n:"Mediterranean Couscous",t:"Cold",m:20,p:"veg",i:[[1.5,"cup","couscous"],[1,"can","chickpeas"],[1,"","cucumber"],[1,"pint","cherry tomatoes"],[0.5,"cup","kalamata olives"],[0.5,"","red onion"],[0.25,"cup","olive oil"],[1,"","lemon"],[0.25,"cup","grated parmesan"]],
s:["Make couscous per the box. Fluff with a fork. Let cool.","Rinse chickpeas. Chop the veggies.","Whisk oil, lemon juice, and salt.","Toss everything. Split into containers. Eat cold."]},

{id:"l22",n:"Beef & Potato Hash",t:"Heat",m:35,p:"beef",i:[[1,"lb","ground beef"],[1.5,"lb","Yukon gold potatoes"],[1,"","bell pepper"],[1,"","onion"],[1,"tsp","paprika"],[1,"tsp","garlic powder"],[2,"tbsp","oil"],[0.25,"cup","ketchup"]],
s:["Dice potatoes small. Microwave in a covered bowl, 5 min.","Brown beef in a large pan, 7 min. Drain. Move to a plate.","Add oil, potatoes, and diced onion and pepper. Cook 10 min, until golden.","Add beef and spices. Stir 2 min.","Split into containers. Add ketchup on top."]},

{id:"l23",n:"Chicken Shawarma Bowl",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","white rice"],[1,"","cucumber"],[1,"pint","cherry tomatoes"],[1,"","lemon"],[2,"tsp","cumin"],[2,"tsp","paprika"],[0.5,"tsp","turmeric"],[1,"tsp","garlic powder"],[2,"tbsp","olive oil"],[0.5,"cup","hummus"]],
s:["Cook rice.","Toss chicken with oil, spices, lemon juice, and salt.","Air fry at 380°F for 18–20 min. Slice.","Chop cucumber. Halve tomatoes.","Pack rice, chicken, and veggies. Add a scoop of hummus."]},

{id:"l24",n:"Korean-Style Beef Bowl",t:"Heat",m:25,p:"beef",i:[[1,"lb","ground beef"],[1.5,"cup","white rice"],[0.25,"cup","soy sauce"],[2,"tbsp","brown sugar"],[1,"tsp","sesame oil"],[3,"clove","garlic"],[1,"tsp","ground ginger"],[2,"","carrot"],[12,"oz","green beans"],[3,"","green onion"]],
s:["Cook rice.","Brown beef, 7 min. Drain.","Add minced garlic, ginger, soy sauce, sugar, and sesame oil. Simmer 2 min.","Shred carrots. Microwave carrots and green beans in a covered bowl, 4 min.","Split rice, beef, and veggies. Top with sliced green onion."]},

{id:"l25",n:"Pasta Primavera",t:"Heat",m:25,p:"veg",i:[[1,"lb","penne"],[2,"","zucchini"],[1,"","bell pepper"],[1,"pint","cherry tomatoes"],[1,"can","cannellini beans"],[3,"clove","garlic"],[0.25,"cup","olive oil"],[0.75,"cup","grated parmesan"]],
s:["Boil pasta. Save a mug of pasta water. Drain.","Chop zucchini and pepper. Halve tomatoes.","Cook veggies in oil on medium-high, 6 min. Add minced garlic, 1 min.","Add pasta, rinsed beans, parmesan, and a splash of pasta water. Toss.","Split into containers."]},

{id:"l26",n:"Lemon Pepper Chicken & Rice",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","white rice"],[12,"oz","green beans"],[1,"tbsp","lemon pepper seasoning"],[2,"tbsp","olive oil"],[1,"","lemon"]],
s:["Cook rice.","Coat chicken with oil and lemon pepper.","Air fry at 380°F for 18 min. Slice.","Toss green beans with oil and salt. Air fry at 400°F for 8 min.","Split into containers. Squeeze lemon over."]},

{id:"l27",n:"Sweet Potato Black Bean Bowl",t:"Heat",m:35,p:"veg",i:[[1.5,"cup","quinoa"],[2,"","sweet potato"],[1,"can","black beans"],[1,"cup","frozen corn"],[1,"cup","mild salsa"],[1,"","lime"],[1,"tsp","cumin"],[1,"tsp","paprika"],[2,"tbsp","olive oil"]],
s:["Rinse quinoa. Cook in the rice cooker like white rice.","Cube sweet potatoes. Toss with oil, cumin, paprika, and salt.","Air fry at 400°F for 15–18 min. Shake halfway.","Rinse beans. Microwave beans and corn 2 min.","Split into containers. Add lime juice and salsa."]},

{id:"l28",n:"Turkey Taco Pasta",t:"Heat",m:30,p:"turkey",i:[[1,"lb","ground turkey"],[0.75,"lb","pasta shells"],[1,"cup","mild salsa"],[1,"can","diced tomatoes"],[1,"cup","frozen corn"],[1,"tsp","cumin"],[1,"tsp","paprika"],[1,"tsp","garlic powder"]],
s:["Boil pasta. Drain.","Brown turkey, 8 min.","Add spices, salsa, tomatoes, and corn. Simmer 5 min.","Stir in pasta. Split into containers."]},

{id:"l29",n:"Italian Chicken & Potatoes",t:"Heat",m:45,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"lb","baby potatoes"],[12,"oz","green beans"],[3,"tbsp","olive oil"],[2,"tsp","Italian seasoning"],[1,"tsp","garlic powder"],[0.25,"cup","grated parmesan"]],
s:["Heat oven to 425°F.","Halve potatoes. Toss with half the oil and seasoning, plus salt. Roast 15 min.","Toss chicken and green beans with the rest of the oil and seasoning. Add to the pan.","Roast 20–25 min more.","Sprinkle parmesan. Slice chicken. Split into containers."]},

{id:"l30",n:"BLT Pasta Salad",t:"Cold",m:25,p:"pork",i:[[1,"lb","rotini"],[0.75,"lb","bacon"],[1,"pint","cherry tomatoes"],[3,"cup","baby spinach"],[0.75,"cup","mayo"],[1,"","lemon"],[1,"tsp","garlic powder"]],
s:["Boil pasta. Rinse with cold water. Drain.","Air fry bacon at 400°F for 8–10 min, until crisp. Chop.","Halve tomatoes. Chop spinach.","Mix mayo, lemon juice, garlic powder, salt, and pepper.","Toss everything. Split into containers. Eat cold."]},

{id:"l31",n:"Hawaiian Pork & Rice",t:"Heat",m:35,p:"pork",i:[[1.5,"lb","pork tenderloin"],[1.5,"cup","white rice"],[1,"can","pineapple chunks (20 oz)"],[1,"","bell pepper"],[0.5,"cup","teriyaki sauce"],[3,"","green onion"],[1,"tbsp","oil"]],
s:["Cook rice.","Cut pork into bite-size pieces.","Cook pork in oil on medium-high, 6–7 min.","Add chopped pepper and drained pineapple. Cook 3 min.","Stir in teriyaki sauce. Cook 1 min.","Split with rice. Top with sliced green onion."]},

{id:"l32",n:"Balsamic Chicken & Veggie Bowl",t:"Heat",m:35,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","quinoa"],[2,"","zucchini"],[1,"","bell pepper"],[1,"","red onion"],[3,"tbsp","balsamic vinegar"],[3,"tbsp","olive oil"],[1,"tsp","Italian seasoning"]],
s:["Rinse quinoa. Cook in the rice cooker like white rice.","Cut chicken, zucchini, pepper, and onion into chunks.","Toss with oil, balsamic, Italian seasoning, and salt.","Air fry at 400°F for 15–18 min. Shake halfway.","Split quinoa, chicken, and veggies into containers."]}
];

const DINNERS = [
{id:"d1",n:"Chicken Fajitas",m:30,p:"chicken",i:[[1.5,"lb","chicken breast"],[2,"","bell pepper"],[1,"","onion"],[8,"","flour tortilla"],[2,"tsp","cumin"],[2,"tsp","paprika"],[1,"tsp","garlic powder"],[1,"","lime"],[2,"tbsp","oil"],[1,"cup","mild salsa"],[1,"","avocado"]],
s:["Slice chicken, peppers, and onion into strips.","Toss with oil, spices, and salt.","Cook in a large pan on high, 10–12 min.","Squeeze lime over.","Warm tortillas in the microwave, 30 sec.","Fill with chicken, salsa, and sliced avocado."]},

{id:"d2",n:"Beef Tacos",m:25,p:"beef",i:[[1,"lb","ground beef"],[12,"","taco shell"],[2,"tsp","paprika"],[1,"tsp","cumin"],[1,"tsp","garlic powder"],[1,"tsp","onion powder"],[0.5,"tsp","oregano"],[2,"cup","shredded lettuce"],[2,"","tomato"]],
s:["Brown beef, 8 min. Drain fat.","Add spices, salt, and a splash of water. Simmer 3 min.","Chop lettuce and tomato.","Warm shells in the oven at 350°F, 5 min.","Fill shells."]},

{id:"d3",n:"Sheet Pan Chicken & Potatoes",m:50,p:"chicken",i:[[2,"lb","chicken thighs, boneless"],[2,"lb","baby potatoes"],[1,"lb","carrots"],[3,"tbsp","olive oil"],[2,"tsp","garlic powder"],[2,"tsp","paprika"],[1,"tsp","thyme"]],
s:["Heat oven to 425°F.","Halve potatoes. Cut carrots into sticks.","Toss everything with oil, spices, salt, and pepper on a sheet pan.","Bake 35–40 min, until chicken is cooked through."]},

{id:"d4",n:"Chicken Tenders & Fries",m:45,p:"chicken",i:[[1.5,"lb","chicken tenders"],[1,"cup","panko"],[0.5,"cup","flour"],[2,"","egg"],[0.5,"cup","grated parmesan"],[1,"tsp","garlic powder"],[3,"","russet potato"],[2,"tbsp","oil"]],
s:["Cut potatoes into sticks. Toss with oil and salt.","Air fry at 400°F for 18–20 min. Shake halfway. Set aside.","Set out 3 bowls: flour / beaten eggs / panko + parmesan + garlic powder.","Dip each tender in flour, then egg, then panko.","Spray with oil. Air fry at 400°F for 10–12 min. Flip halfway.","Put fries back in for 2 min to rewarm."]},

{id:"d5",n:"Pot Roast",m:15,sc:1,h:8,p:"beef",i:[[3,"lb","chuck roast"],[1.5,"lb","baby potatoes"],[1,"lb","carrots"],[1,"","onion"],[3,"clove","garlic"],[2,"cup","beef broth"],[2,"tbsp","tomato paste"],[1,"tsp","thyme"]],
s:["Season roast with salt and pepper.","Put potatoes, carrots, chopped onion, and garlic in the slow cooker. Set roast on top.","Mix broth and tomato paste. Pour over. Add thyme.","Cook on Low 8 hr.","Slice or shred. Serve with the veggies."]},

{id:"d6",n:"BBQ Pulled Pork Sandwiches",m:10,sc:1,h:8,p:"pork",i:[[3,"lb","pork shoulder"],[1,"cup","BBQ sauce"],[0.25,"cup","apple cider vinegar"],[2,"tbsp","brown sugar"],[1,"tsp","paprika"],[1,"tsp","garlic powder"],[8,"","bun"],[1,"jar","pickles"]],
s:["Rub pork with sugar, paprika, garlic powder, and salt.","Put in the slow cooker with the vinegar.","Cook on Low 8 hr.","Shred. Pour off most of the liquid. Stir in BBQ sauce.","Serve on buns with pickles."]},

{id:"d7",n:"Salsa Chicken Rice Bowls",m:10,sc:1,h:6,p:"chicken",i:[[2,"lb","chicken breast"],[1.5,"cup","mild salsa"],[1,"can","black beans"],[1,"cup","frozen corn"],[1,"tsp","cumin"],[1.5,"cup","white rice"],[1,"","lime"]],
s:["Put chicken, salsa, cumin, and salt in the slow cooker.","Cook on Low 6 hr.","Shred chicken. Stir in rinsed beans and corn. Cover 15 min.","Cook rice. Stir in lime juice.","Serve chicken over rice."]},

{id:"d8",n:"Beef & Broccoli",m:30,p:"beef",i:[[1.5,"lb","flank steak"],[4,"cup","broccoli florets"],[1.5,"cup","white rice"],[0.25,"cup","soy sauce"],[2,"tbsp","brown sugar"],[1,"tbsp","cornstarch"],[3,"clove","garlic"],[1,"tsp","ground ginger"],[1,"tbsp","oil"]],
s:["Cook rice.","Slice beef thin, across the grain. Toss with cornstarch.","Microwave broccoli with a splash of water, covered, 3 min.","Sear beef in hot oil, 3 min.","Add minced garlic, ginger, soy sauce, sugar, a splash of water, and broccoli.","Stir 2 min, until glossy. Serve over rice."]},

{id:"d9",n:"Pork Chops & Potatoes",m:35,p:"pork",i:[[4,"","boneless pork chop"],[1.5,"lb","baby potatoes"],[12,"oz","green beans"],[2,"tbsp","olive oil"],[1,"tsp","paprika"],[1,"tsp","garlic powder"],[1,"tsp","brown sugar"]],
s:["Halve potatoes. Toss with oil and salt. Air fry at 400°F for 15 min. Set aside.","Rub chops with oil, paprika, garlic powder, sugar, and salt.","Air fry at 400°F for 10–12 min. Flip halfway.","Air fry green beans at 400°F for 7 min while chops rest.","Rewarm potatoes 2 min. Serve."]},

{id:"d10",n:"Parmesan Chicken & Spaghetti",m:40,p:"chicken",i:[[1.5,"lb","thin chicken cutlets"],[0.75,"cup","panko"],[0.5,"cup","grated parmesan"],[2,"","egg"],[0.75,"lb","spaghetti"],[1,"jar","marinara (24 oz)"]],
s:["Boil pasta. Warm marinara.","Beat eggs in one bowl. Mix panko and parmesan in another.","Dip chicken in egg, then crumbs.","Spray with oil. Air fry at 400°F for 12 min. Flip halfway.","Serve on pasta with sauce."]},

{id:"d11",n:"Shepherd's Pie",m:55,p:"beef",i:[[1,"lb","ground beef"],[2,"lb","Yukon gold potatoes"],[1,"","onion"],[2,"cup","frozen peas & carrots"],[1.5,"cup","beef broth"],[2,"tbsp","tomato paste"],[1,"tbsp","Worcestershire sauce"],[2,"tbsp","flour"],[3,"tbsp","olive oil"]],
s:["Heat oven to 400°F.","Peel and cube potatoes. Boil 15 min, until soft.","Meanwhile, brown beef and diced onion, 8 min. Drain.","Stir in flour, tomato paste, Worcestershire, veggies, and most of the broth. Simmer 5 min.","Drain potatoes. Mash with olive oil, salt, and the rest of the broth.","Spread meat in a baking dish. Top with mash. Bake 20 min."]},

{id:"d12",n:"Mild Chicken Curry",m:40,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1,"","onion"],[3,"clove","garlic"],[1,"tbsp","mild curry powder"],[1,"can","tomato sauce (15 oz)"],[1,"cup","chicken broth"],[1,"can","chickpeas"],[3,"cup","baby spinach"],[1.5,"cup","basmati rice"],[1,"tbsp","oil"]],
s:["Cook rice.","Dice onion. Cut chicken into pieces.","Cook onion in oil, 5 min. Add minced garlic and curry powder, 1 min.","Add chicken. Cook 5 min.","Add tomato sauce, broth, and rinsed chickpeas. Simmer 15 min.","Stir in spinach. Serve over rice."]},

{id:"d13",n:"Chicken Noodle Soup",m:40,p:"chicken",i:[[1.5,"lb","chicken breast"],[8,"cup","chicken broth"],[3,"","carrot"],[3,"","celery stalk"],[1,"","onion"],[0.5,"lb","egg noodles"],[1,"tsp","thyme"],[2,"tbsp","oil"]],
s:["Dice onion, carrots, and celery.","Cook veggies in oil in a big pot, 6 min.","Add broth, thyme, and whole chicken breasts. Simmer 20 min.","Take out chicken. Shred it. Put it back.","Add noodles. Cook 7 min. Salt to taste."]},

{id:"d14",n:"Minestrone Soup",m:45,p:"veg",i:[[1,"","onion"],[2,"","carrot"],[2,"","celery stalk"],[2,"","zucchini"],[3,"clove","garlic"],[1,"can","diced tomatoes"],[6,"cup","vegetable broth"],[1,"can","cannellini beans"],[1,"cup","ditalini or small pasta"],[3,"cup","baby spinach"],[0.5,"cup","grated parmesan"],[2,"tbsp","olive oil"],[1,"tsp","Italian seasoning"]],
s:["Dice onion, carrot, celery, and zucchini.","Cook in oil, 7 min. Add minced garlic, 1 min.","Add tomatoes, broth, rinsed beans, and seasoning. Simmer 15 min.","Add pasta. Cook 9 min.","Stir in spinach. Top bowls with parmesan."]},

{id:"d15",n:"Meatloaf Muffins & Potatoes",m:40,p:"beef",i:[[1.5,"lb","ground beef"],[1,"","egg"],[0.5,"cup","panko"],[0.5,"","onion"],[0.5,"cup","ketchup"],[1,"tbsp","Worcestershire sauce"],[1,"tsp","garlic powder"],[1.5,"lb","baby potatoes"],[2,"tbsp","oil"]],
s:["Heat oven to 400°F. Oil a 12-cup muffin pan.","Halve potatoes. Toss with oil and salt on a sheet pan. Put in the oven.","Mix beef, egg, panko, grated onion, half the ketchup, Worcestershire, garlic powder, and salt.","Press into muffin cups. Top with the rest of the ketchup.","Bake 20–25 min, next to the potatoes."]},

{id:"d16",n:"Burgers & Sweet Potato Fries",m:35,p:"beef",i:[[1.5,"lb","ground beef"],[4,"","bun"],[1,"","tomato"],[1,"cup","shredded lettuce"],[2,"","sweet potato"],[2,"tbsp","oil"],[1,"tsp","garlic powder"]],
s:["Cut sweet potatoes into sticks. Toss with oil and salt.","Air fry at 400°F for 15–18 min. Shake halfway.","Shape beef into patties. Season with salt, pepper, and garlic powder.","Cook in a hot pan, 4–5 min per side.","Slice tomato. Build burgers."]},

{id:"d17",n:"Pork Fried Rice",m:30,p:"pork",i:[[1,"lb","boneless pork chops"],[1.5,"cup","white rice"],[3,"","egg"],[2,"cup","frozen peas & carrots"],[4,"","green onion"],[3,"tbsp","soy sauce"],[1,"tsp","sesame oil"],[2,"tbsp","oil"]],
s:["Cook rice. Spread on a tray to cool.","Dice pork. Cook in oil on high, 6 min. Push to one side.","Scramble eggs in the empty side, 1 min.","Add veggies, rice, soy sauce, and sesame oil. Stir-fry 4 min.","Top with sliced green onion."]},

{id:"d18",n:"Chicken Lo Mein",m:30,p:"chicken",i:[[1,"lb","chicken breast"],[0.75,"lb","lo mein noodles or spaghetti"],[2,"","carrot"],[1,"","bell pepper"],[2,"cup","snap peas"],[0.25,"cup","soy sauce"],[1,"tbsp","oyster sauce"],[1,"tbsp","sesame oil"],[1,"tsp","brown sugar"],[2,"clove","garlic"],[1,"tbsp","oil"]],
s:["Boil noodles. Drain.","Slice chicken and veggies thin.","Cook chicken in oil, 5 min.","Add veggies and minced garlic. Cook 3 min.","Add noodles, soy sauce, oyster sauce, sesame oil, and sugar. Toss 2 min."]},

{id:"d19",n:"Honey Garlic Pork Tenderloin",m:35,p:"pork",i:[[1.5,"lb","pork tenderloin"],[1.5,"cup","white rice"],[12,"oz","green beans"],[0.25,"cup","honey"],[3,"tbsp","soy sauce"],[3,"clove","garlic"],[1,"tbsp","oil"]],
s:["Cook rice. Heat oven to 425°F.","Mix honey, soy sauce, and minced garlic.","Sear pork in oil in an oven-safe pan, 2 min per side.","Brush pork with sauce. Add green beans around it.","Roast 18–20 min.","Rest 5 min. Slice. Spoon pan juices over."]},

{id:"d20",n:"Greek Lemon Chicken & Potatoes",m:50,p:"chicken",i:[[2,"lb","chicken thighs, boneless"],[2,"lb","Yukon gold potatoes"],[2,"","lemon"],[4,"clove","garlic"],[0.25,"cup","olive oil"],[2,"tsp","oregano"],[0.5,"cup","chicken broth"]],
s:["Heat oven to 425°F.","Cut potatoes into wedges.","Mix oil, lemon juice, minced garlic, oregano, and salt.","Toss chicken and potatoes in it. Spread in a baking dish. Pour broth around.","Bake 40 min, until potatoes are soft."]},

{id:"d21",n:"Sausage & Spinach Rigatoni",m:30,p:"pork",i:[[1,"lb","mild Italian sausage"],[1,"lb","rigatoni"],[1,"can","crushed tomatoes (28 oz)"],[1,"","onion"],[3,"clove","garlic"],[3,"cup","baby spinach"],[0.5,"cup","grated parmesan"]],
s:["Boil pasta. Save a mug of pasta water. Drain.","Remove sausage casings. Brown sausage with diced onion, 8 min.","Add minced garlic, 1 min. Add tomatoes. Simmer 10 min.","Stir in spinach, pasta, and a splash of pasta water.","Top with parmesan."]},

{id:"d22",n:"Teriyaki Meatballs & Rice",m:35,p:"turkey",i:[[1.5,"lb","ground turkey"],[1,"","egg"],[0.5,"cup","panko"],[2,"","green onion"],[1.5,"cup","white rice"],[0.75,"cup","teriyaki sauce"],[12,"oz","green beans"]],
s:["Cook rice. Heat oven to 400°F.","Mix turkey, egg, panko, sliced green onion, and salt. Roll into 1-inch balls.","Bake on a lined tray, 15–18 min.","Warm teriyaki sauce in a pan. Add meatballs. Toss.","Microwave green beans in a covered bowl, 4 min. Serve over rice."]},

{id:"d23",n:"Beef Stew",m:20,sc:1,h:8,p:"beef",i:[[2,"lb","beef stew meat"],[1.5,"lb","Yukon gold potatoes"],[1,"lb","carrots"],[1,"","onion"],[3,"cup","beef broth"],[2,"tbsp","tomato paste"],[3,"tbsp","flour"],[1,"tbsp","Worcestershire sauce"],[1,"tsp","thyme"]],
s:["Toss beef with flour, salt, and pepper.","Cube potatoes. Chop carrots and onion.","Put everything in the slow cooker.","Mix broth, tomato paste, and Worcestershire. Pour in. Add thyme.","Cook on Low 8 hr. Stir before serving."]},

{id:"d24",n:"Honey Garlic Chicken",m:10,sc:1,h:6,p:"chicken",i:[[2,"lb","chicken thighs, boneless"],[0.5,"cup","honey"],[0.5,"cup","soy sauce"],[4,"clove","garlic"],[2,"tbsp","ketchup"],[1,"tbsp","cornstarch"],[1.5,"cup","white rice"],[1,"bag","frozen stir-fry veggies"]],
s:["Put chicken in the slow cooker.","Mix honey, soy sauce, minced garlic, and ketchup. Pour over.","Cook on Low 5–6 hr.","Take out chicken. Chop it.","Mix cornstarch with a splash of water. Stir into the sauce. Cover on High 15 min. Add chicken back.","Cook rice. Microwave veggies per the bag. Serve."]},

{id:"d25",n:"Chicken & White Bean Soup",m:15,sc:1,h:6,p:"chicken",i:[[1.5,"lb","chicken breast"],[2,"can","cannellini beans"],[1,"","onion"],[3,"","carrot"],[2,"","celery stalk"],[6,"cup","chicken broth"],[3,"clove","garlic"],[1,"tsp","Italian seasoning"],[3,"cup","baby spinach"],[0.5,"cup","grated parmesan"]],
s:["Chop onion, carrots, and celery. Rinse beans.","Put everything except spinach and parmesan in the slow cooker.","Cook on Low 6–7 hr.","Shred chicken with two forks. Stir in spinach.","Top bowls with parmesan."]},

{id:"d26",n:"Honey BBQ Wings",m:40,p:"chicken",i:[[2.5,"lb","chicken wings"],[1,"tbsp","baking powder"],[1,"tsp","garlic powder"],[0.5,"cup","BBQ sauce"],[2,"tbsp","honey"],[4,"","carrot"]],
s:["Pat wings dry. Toss with baking powder, garlic powder, and salt.","Air fry at 380°F for 20 min. Flip halfway.","Turn up to 400°F. Cook 5–8 min more, until crispy.","Mix BBQ sauce and honey. Toss wings in it.","Cut carrots into sticks. Serve."]},

{id:"d27",n:"Shredded Beef Tacos",m:15,sc:1,h:8,p:"beef",i:[[2.5,"lb","chuck roast"],[1,"cup","beef broth"],[1,"","onion"],[4,"clove","garlic"],[2,"tsp","cumin"],[2,"tsp","paprika"],[1,"tsp","oregano"],[2,"tbsp","apple cider vinegar"],[1,"","lime"],[12,"","corn tortilla"],[1,"","avocado"]],
s:["Cut roast into 4 chunks. Rub with spices and salt.","Put in the slow cooker with chopped onion, garlic, broth, and vinegar.","Cook on Low 8 hr.","Shred. Squeeze lime over.","Warm tortillas. Fill with beef and sliced avocado."]},

{id:"d28",n:"Stuffed Peppers",m:55,p:"beef",i:[[4,"","bell pepper"],[1,"lb","ground beef"],[0.75,"cup","white rice"],[1,"can","diced tomatoes"],[1,"","onion"],[1,"tsp","Italian seasoning"],[0.5,"cup","grated parmesan"]],
s:["Cook rice. Heat oven to 375°F.","Cut tops off peppers. Remove seeds. Microwave peppers, covered, 4 min.","Brown beef and diced onion, 8 min. Drain.","Stir in tomatoes, seasoning, and rice.","Stuff peppers. Stand them in a baking dish. Top with parmesan.","Bake 25 min."]},

{id:"d29",n:"Baked Turkey Penne",m:45,p:"turkey",i:[[1,"lb","penne"],[1,"lb","ground turkey"],[1,"","zucchini"],[1,"jar","marinara (24 oz)"],[0.75,"cup","grated parmesan"],[0.5,"cup","panko"],[1,"tbsp","olive oil"],[1,"tsp","Italian seasoning"]],
s:["Heat oven to 400°F. Boil pasta 2 min less than the box says. Drain.","Brown turkey with diced zucchini, 8 min.","Add seasoning and marinara.","Mix in pasta. Pour into a baking dish.","Top with panko and parmesan. Drizzle oil.","Bake 15 min, until golden."]},

{id:"d30",n:"One-Pot Chicken & Rice",m:45,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[1.5,"cup","white rice"],[3,"cup","chicken broth"],[1,"","onion"],[3,"clove","garlic"],[2,"cup","frozen peas & carrots"],[1,"tsp","paprika"],[1,"tsp","oregano"],[1,"","lemon"],[1,"tbsp","oil"]],
s:["Season chicken with paprika, oregano, and salt.","Brown chicken in oil in a deep pan, 3 min per side. Move to a plate.","Cook diced onion, 3 min. Add minced garlic and rice. Stir 1 min.","Add broth. Set chicken on top. Cover. Simmer on low, 20 min.","Add peas & carrots. Cover 5 min. Squeeze lemon over."]},

{id:"d31",n:"Steak Bites & Potatoes",m:35,p:"beef",i:[[1.5,"lb","sirloin steak"],[1.5,"lb","baby potatoes"],[1,"bunch","asparagus"],[2,"tbsp","olive oil"],[1,"tsp","garlic powder"],[1,"tsp","paprika"]],
s:["Halve potatoes. Toss with oil and salt. Air fry at 400°F for 15 min.","Cut steak into 1-inch cubes. Toss with oil, garlic powder, paprika, salt, and pepper.","Trim asparagus. Add steak and asparagus to the potatoes.","Air fry at 400°F for 8–10 min. Shake halfway."]},

{id:"d32",n:"Kielbasa Sheet Pan",m:40,p:"pork",i:[[1,"pkg","kielbasa (14 oz)"],[1.5,"lb","baby potatoes"],[12,"oz","green beans"],[1,"","onion"],[2,"tbsp","olive oil"],[1,"tsp","paprika"],[1,"tsp","garlic powder"]],
s:["Heat oven to 425°F.","Halve potatoes. Slice kielbasa and onion.","Toss potatoes with oil and spices. Roast 15 min.","Add kielbasa, green beans, and onion. Stir.","Roast 15–20 min more."]},

{id:"d33",n:"Sloppy Joes",m:30,p:"beef",i:[[1.5,"lb","ground beef"],[1,"","onion"],[1,"","bell pepper"],[1,"can","tomato sauce (8 oz)"],[0.25,"cup","ketchup"],[1,"tbsp","brown sugar"],[1,"tbsp","Worcestershire sauce"],[1,"tsp","yellow mustard"],[4,"","bun"]],
s:["Dice onion and pepper.","Brown beef with onion and pepper, 8 min. Drain.","Add tomato sauce, ketchup, sugar, Worcestershire, and mustard.","Simmer 10 min.","Serve on buns."]},

{id:"d34",n:"Chicken Pitas with Hummus",m:35,p:"chicken",i:[[1.5,"lb","chicken thighs, boneless"],[4,"","pita"],[1,"cup","hummus"],[1,"","cucumber"],[2,"","tomato"],[0.5,"","red onion"],[1,"","lemon"],[2,"tsp","oregano"],[1,"tsp","garlic powder"],[2,"tbsp","olive oil"]],
s:["Toss chicken with oil, lemon juice, oregano, garlic powder, and salt.","Air fry at 380°F for 18–20 min. Slice.","Chop cucumber, tomatoes, and onion.","Warm pitas. Spread with hummus. Add chicken and veggies."]},

{id:"d35",n:"Orange Chicken",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[0.5,"cup","cornstarch"],[0.75,"cup","orange juice"],[2,"tbsp","soy sauce"],[3,"tbsp","brown sugar"],[1,"tbsp","rice vinegar"],[2,"clove","garlic"],[1.5,"cup","white rice"],[2,"","green onion"]],
s:["Cook rice.","Cut chicken into 1-inch pieces. Save 1 spoonful of cornstarch. Toss chicken in the rest.","Spray with oil. Air fry at 400°F for 12–14 min. Shake halfway.","Simmer orange juice, soy sauce, sugar, vinegar, and minced garlic, 3 min.","Mix saved cornstarch with a splash of water. Stir in until thick.","Toss chicken in sauce. Top with green onion. Serve with rice."]},

{id:"d36",n:"Cashew Chicken",m:30,p:"chicken",i:[[1.5,"lb","chicken breast"],[0.75,"cup","cashews"],[1,"","bell pepper"],[1,"","onion"],[3,"tbsp","soy sauce"],[2,"tbsp","hoisin sauce"],[1,"tbsp","honey"],[1,"tbsp","cornstarch"],[2,"clove","garlic"],[1.5,"cup","white rice"],[1,"tbsp","oil"]],
s:["Cook rice.","Cut chicken into pieces. Toss with cornstarch.","Cook chicken in oil, 6 min.","Add chopped pepper, onion, and minced garlic. Cook 3 min.","Add soy sauce, hoisin, honey, and a splash of water. Stir 1 min.","Stir in cashews. Serve over rice."]},

{id:"d37",n:"Garlic Parmesan Chicken Pasta",m:30,p:"chicken",i:[[1.5,"lb","chicken breast"],[1,"lb","linguine"],[5,"clove","garlic"],[0.25,"cup","olive oil"],[0.75,"cup","grated parmesan"],[1,"","lemon"],[3,"cup","baby spinach"],[1,"tsp","Italian seasoning"]],
s:["Boil pasta. Save a mug of pasta water. Drain.","Cut chicken into pieces. Season with Italian seasoning and salt.","Cook chicken in a little oil, 7 min. Move to a plate.","Warm the rest of the oil and sliced garlic on low, 2 min. Don't let it brown.","Add pasta, chicken, parmesan, lemon juice, and a splash of pasta water. Toss.","Stir in spinach."]},

{id:"d38",n:"Chicken Marsala",m:40,p:"chicken",i:[[1.5,"lb","thin chicken cutlets"],[0.5,"lb","mushrooms"],[0.75,"cup","marsala wine"],[0.75,"cup","chicken broth"],[0.25,"cup","flour"],[3,"tbsp","olive oil"],[2,"clove","garlic"],[0.75,"lb","spaghetti"]],
s:["Boil pasta. Drain.","Coat chicken in flour, salt, and pepper.","Cook chicken in oil, 4 min per side. Move to a plate.","Cook sliced mushrooms, 5 min. Add minced garlic, 1 min.","Add marsala and broth. Simmer 5 min.","Put chicken back for 3 min. Serve over pasta."]},

{id:"d39",n:"Baked Beef Burritos",m:35,p:"beef",i:[[1,"lb","ground beef"],[1,"can","refried beans"],[1,"cup","white rice"],[8,"","large flour tortilla"],[1,"cup","mild salsa"],[1,"tsp","cumin"],[1,"tsp","paprika"],[1,"tsp","garlic powder"],[1,"tbsp","oil"]],
s:["Cook rice. Heat oven to 400°F.","Brown beef, 8 min. Drain. Add spices and salt.","Microwave tortillas 20 sec so they bend.","Fill each with beans, rice, beef, and salsa. Roll up.","Set seam-side down on a tray. Brush with oil.","Bake 15 min, until golden."]},

{id:"d40",n:"Lentil Soup",m:45,p:"veg",i:[[1.5,"cup","brown lentils"],[1,"","onion"],[2,"","carrot"],[2,"","celery stalk"],[3,"clove","garlic"],[1,"can","diced tomatoes"],[6,"cup","vegetable broth"],[1,"tsp","cumin"],[1,"tsp","paprika"],[3,"cup","baby spinach"],[1,"","lemon"],[2,"tbsp","olive oil"]],
s:["Rinse lentils. Dice onion, carrot, and celery.","Cook veggies in oil, 6 min. Add minced garlic and spices, 1 min.","Add lentils, tomatoes, and broth. Simmer 25–30 min.","Stir in spinach and lemon juice. Salt to taste."]},

{id:"d41",n:"Chicken Cacciatore",m:15,sc:1,h:6,p:"chicken",i:[[2,"lb","chicken thighs, boneless"],[1,"can","crushed tomatoes (28 oz)"],[1,"","bell pepper"],[1,"","onion"],[0.5,"lb","mushrooms"],[3,"clove","garlic"],[1,"tsp","Italian seasoning"],[0.75,"lb","penne"],[0.25,"cup","grated parmesan"]],
s:["Slice pepper, onion, and mushrooms.","Put veggies in the slow cooker. Set chicken on top. Season with salt and Italian seasoning.","Add garlic. Pour tomatoes over.","Cook on Low 6 hr.","Boil pasta. Serve chicken and sauce over pasta. Top with parmesan."]},

{id:"d42",n:"Pork Chops & Apples",m:30,p:"pork",i:[[4,"","boneless pork chop"],[2,"","apple"],[1,"","onion"],[0.5,"cup","apple cider or juice"],[1,"tsp","thyme"],[2,"tbsp","olive oil"],[1.5,"cup","white rice"]],
s:["Cook rice.","Season chops with salt, pepper, and thyme.","Sear in oil on medium-high, 4–5 min per side. Move to a plate.","Cook sliced apples and onion, 5 min.","Add cider. Simmer 3 min. Put chops back. Spoon sauce over.","Serve with rice."]},

{id:"d43",n:"Baked Chicken Drumsticks",m:50,p:"chicken",i:[[3,"lb","chicken drumsticks"],[2,"tbsp","olive oil"],[2,"tsp","paprika"],[1,"tsp","garlic powder"],[1,"tsp","brown sugar"],[1.5,"cup","white rice"],[2,"cup","frozen corn"]],
s:["Heat oven to 425°F. Cook rice.","Pat drumsticks dry. Toss with oil, spices, sugar, and salt.","Bake on a lined tray, 40–45 min. Flip halfway.","Microwave corn 3 min. Serve."]},

{id:"d44",n:"French Dip Sandwiches",m:10,sc:1,h:8,p:"beef",i:[[3,"lb","chuck roast"],[2,"cup","beef broth"],[1,"","onion"],[3,"clove","garlic"],[2,"tbsp","soy sauce"],[1,"tbsp","Worcestershire sauce"],[1,"tsp","thyme"],[6,"","hoagie roll"]],
s:["Season roast with salt and pepper.","Put in the slow cooker with sliced onion, garlic, broth, soy sauce, Worcestershire, and thyme.","Cook on Low 8 hr.","Shred beef. Skim fat off the juice.","Fill rolls with beef. Dip in the juice."]},

{id:"d45",n:"Egg Roll in a Bowl",m:25,p:"pork",i:[[1,"lb","ground pork"],[1,"bag","coleslaw mix (14 oz)"],[3,"tbsp","soy sauce"],[1,"tsp","sesame oil"],[3,"clove","garlic"],[1,"tsp","ground ginger"],[3,"","green onion"],[1.5,"cup","white rice"]],
s:["Cook rice.","Brown pork, 7 min. Drain.","Add minced garlic and ginger, 1 min.","Add coleslaw mix and soy sauce. Cook 5 min, until soft.","Stir in sesame oil. Top with green onion. Serve over rice."]},

{id:"d46",n:"Taco Soup",m:35,p:"beef",i:[[1,"lb","ground beef"],[1,"","onion"],[1,"can","black beans"],[1,"can","pinto beans"],[1,"can","diced tomatoes"],[1,"cup","frozen corn"],[3,"cup","beef broth"],[2,"tsp","cumin"],[2,"tsp","paprika"],[1,"tsp","garlic powder"],[1,"","avocado"]],
s:["Brown beef with diced onion, 8 min. Drain.","Add spices. Stir 1 min.","Rinse beans. Add beans, tomatoes, corn, and broth.","Simmer 20 min.","Top bowls with sliced avocado."]},

{id:"d47",n:"Turkey Sweet Potato Skillet",m:30,p:"turkey",i:[[1.5,"lb","ground turkey"],[2,"","sweet potato"],[1,"","bell pepper"],[1,"","onion"],[3,"cup","baby spinach"],[1,"tsp","cumin"],[1,"tsp","paprika"],[2,"tbsp","oil"]],
s:["Dice sweet potatoes small. Microwave in a covered bowl, 5 min.","Brown turkey with diced onion in oil, 8 min.","Add sweet potatoes, diced pepper, and spices. Cook 8 min, until tender.","Stir in spinach until wilted."]},

{id:"d48",n:"Chicken Souvlaki & Rice",m:35,p:"chicken",i:[[1.5,"lb","chicken breast"],[1.5,"cup","white rice"],[2,"","zucchini"],[1,"","red onion"],[2,"","lemon"],[3,"tbsp","olive oil"],[2,"tsp","oregano"],[2,"clove","garlic"]],
s:["Cook rice.","Cut chicken into chunks. Toss with oil, lemon juice, minced garlic, oregano, and salt.","Cut zucchini and onion into chunks. Toss with a little oil and salt.","Air fry chicken and veggies at 400°F for 15–18 min. Shake halfway.","Serve over rice. Squeeze more lemon over."]}
];
