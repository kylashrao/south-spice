export interface Recipe {
  id: string;
  slug: string;
  title: string;
  region: string;
  cookingTime: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  image: string;
  isPopular?: boolean;
  story: string;
  ingredients: { group: string; items: { name: string; quantity: string }[] }[];
  steps: { title: string; body: string }[];
  servingSuggestions: string[];
  tips: string[];
  tags: string[];
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    slug: "classic-masala-dosa",
    title: "Classic Masala Dosa",
    region: "Karnataka",
    cookingTime: "40 mins",
    prepTime: "20 mins (plus overnight fermentation)",
    servings: 4,
    difficulty: "Medium",
    description: "A crispy, golden crepe made from fermented rice and lentil batter, filled with a spiced potato curry. Served with coconut chutney and hot sambar.",
    image: "/images/dosa.png",
    isPopular: true,
    story: "Born in the kitchens of Udupi, the masala dosa is South India's most beloved breakfast — a paper-thin lacy crepe wrapped around buttery turmeric potatoes. The secret is in the long fermentation, which gives the dosa its signature tang and feather-light crispness.",
    ingredients: [
      {
        group: "For the dosa batter",
        items: [
          { name: "Idli rice", quantity: "2 cups" },
          { name: "Urad dal (split black gram)", quantity: "1/2 cup" },
          { name: "Fenugreek seeds", quantity: "1/2 tsp" },
          { name: "Poha (flattened rice)", quantity: "1/4 cup" },
          { name: "Salt", quantity: "to taste" },
        ],
      },
      {
        group: "For the potato masala",
        items: [
          { name: "Potatoes, boiled and crumbled", quantity: "4 medium" },
          { name: "Onions, sliced thin", quantity: "2 medium" },
          { name: "Green chilies, slit", quantity: "3" },
          { name: "Ginger, grated", quantity: "1 tbsp" },
          { name: "Mustard seeds", quantity: "1 tsp" },
          { name: "Curry leaves", quantity: "1 sprig" },
          { name: "Turmeric powder", quantity: "1/2 tsp" },
          { name: "Coconut oil or ghee", quantity: "2 tbsp" },
          { name: "Fresh coriander", quantity: "a small handful" },
        ],
      },
    ],
    steps: [
      { title: "Soak the grains", body: "Rinse the rice, urad dal, and fenugreek seeds. Soak the rice in one bowl and the dal with fenugreek in another for at least 6 hours. Soak poha 30 minutes before grinding." },
      { title: "Grind into batter", body: "Grind the urad dal first into a light, fluffy paste, adding cold water gradually. Then grind the rice and poha together into a slightly coarse batter. Combine both, add salt, and mix with your hand for warmth." },
      { title: "Ferment overnight", body: "Cover and leave in a warm spot for 8 to 12 hours, until the batter doubles and smells gently sour. This is what gives the dosa its character." },
      { title: "Make the masala", body: "Heat oil in a pan, splutter mustard seeds, add curry leaves, ginger, and chilies. Add onions and sauté until soft and golden. Stir in turmeric, then fold in the crumbled potatoes with a splash of water and salt. Finish with fresh coriander." },
      { title: "Cook the dosa", body: "Heat a cast iron tawa until very hot. Pour a ladle of batter and spread quickly in a spiral from the center outward. Drizzle ghee around the edges and cook until deep golden and crisp." },
      { title: "Fill and fold", body: "Place a generous spoon of potato masala along the center of the dosa. Fold over and slide onto a warm plate. Serve immediately with coconut chutney and sambar." },
    ],
    servingSuggestions: [
      "Serve hot off the tawa with coconut chutney, tomato chutney, and steaming sambar.",
      "Accompany with a tall tumbler of South Indian filter coffee for a classic breakfast.",
      "Garnish the masala with a sprinkle of pomegranate seeds for a festive touch.",
    ],
    tips: [
      "A heavy cast iron tawa is the secret to crispy dosas — wipe it with a sliced onion before pouring batter.",
      "If the batter has not fermented well, place it inside a switched-off oven with the light on overnight.",
      "Add a teaspoon of sugar to the batter — it helps the dosas brown beautifully.",
    ],
    tags: ["Breakfast", "Vegetarian", "Fermented", "Iconic"],
  },
  {
    id: "2",
    slug: "steamed-idli-sambar",
    title: "Steamed Idli & Sambar",
    region: "Tamil Nadu",
    cookingTime: "30 mins",
    prepTime: "15 mins (plus fermentation)",
    servings: 4,
    difficulty: "Easy",
    description: "Soft, pillowy steamed rice cakes accompanied by a flavorful, tangy, and slightly spicy lentil and vegetable stew.",
    image: "/images/idli.png",
    isPopular: true,
    story: "Idli is South India's gentlest comfort — clouds of steamed rice and lentil that ask only to be dipped in molten ghee, sambar, or a smear of tangy chutney. Once a temple offering, today it is the morning ritual of millions.",
    ingredients: [
      {
        group: "For the idli batter",
        items: [
          { name: "Idli rice", quantity: "2 cups" },
          { name: "Urad dal", quantity: "1 cup" },
          { name: "Fenugreek seeds", quantity: "1/2 tsp" },
          { name: "Salt", quantity: "to taste" },
        ],
      },
      {
        group: "For the sambar",
        items: [
          { name: "Toor dal", quantity: "1 cup" },
          { name: "Tamarind, soaked", quantity: "a lemon-sized ball" },
          { name: "Sambar powder", quantity: "2 tbsp" },
          { name: "Mixed vegetables (drumstick, pumpkin, carrot, shallots)", quantity: "2 cups" },
          { name: "Mustard seeds", quantity: "1 tsp" },
          { name: "Dried red chilies", quantity: "2" },
          { name: "Curry leaves", quantity: "1 sprig" },
          { name: "Asafoetida", quantity: "a pinch" },
          { name: "Ghee", quantity: "1 tbsp" },
        ],
      },
    ],
    steps: [
      { title: "Soak and grind", body: "Soak rice and dal separately for 6 hours. Grind dal first to a fluffy mousse, then rice to a smooth paste. Combine, salt lightly, and ferment overnight until risen." },
      { title: "Steam the idlis", body: "Grease idli plates and pour in spoonfuls of batter. Steam over boiling water for 10 to 12 minutes until a toothpick comes out clean. Rest for 2 minutes before unmolding." },
      { title: "Cook the sambar base", body: "Pressure cook the toor dal until creamy. In a pot, simmer vegetables with tamarind water, turmeric, and sambar powder until tender. Stir in the cooked dal." },
      { title: "Finish with tempering", body: "Heat ghee, splutter mustard seeds, add red chilies, curry leaves, and asafoetida. Pour the sizzling tempering over the sambar." },
      { title: "Serve", body: "Place two idlis on a banana leaf or warm plate. Ladle hot sambar generously over them and serve with coconut chutney." },
    ],
    servingSuggestions: [
      "Drizzle each idli with a spoon of melted ghee for a richer flavor.",
      "Pair with both coconut chutney and a fiery tomato-onion chutney for contrast.",
      "Serve molagai podi (spiced lentil powder) mixed with sesame oil on the side.",
    ],
    tips: [
      "Use stone-ground batter when possible — it produces the softest idlis.",
      "Do not over-soak the dal; 4 to 6 hours is the sweet spot.",
      "Steam on medium heat — high heat will give you dense idlis.",
    ],
    tags: ["Breakfast", "Vegetarian", "Steamed", "Comfort"],
  },
  {
    id: "3",
    slug: "hyderabadi-chicken-biryani",
    title: "Hyderabadi Chicken Biryani",
    region: "Telangana",
    cookingTime: "1 hr 15 mins",
    prepTime: "30 mins (plus marination)",
    servings: 6,
    difficulty: "Hard",
    description: "A majestic slow-cooked rice dish layered with marinated chicken, saffron, caramelized onions, and whole aromatic spices.",
    image: "/images/biryani.png",
    isPopular: true,
    story: "Born in the royal kitchens of the Nizams, Hyderabadi biryani is theatre on a plate. The kacchi method — raw marinated chicken slow-cooked under a blanket of half-done basmati rice — is a guarded heritage of dum cooking, sealed with dough and finished over embers.",
    ingredients: [
      {
        group: "For the marinade",
        items: [
          { name: "Chicken, bone-in", quantity: "1 kg" },
          { name: "Thick yogurt", quantity: "1 cup" },
          { name: "Ginger-garlic paste", quantity: "3 tbsp" },
          { name: "Red chili powder", quantity: "2 tsp" },
          { name: "Garam masala", quantity: "1 tsp" },
          { name: "Lime juice", quantity: "2 tbsp" },
          { name: "Mint and coriander, chopped", quantity: "1/2 cup each" },
          { name: "Salt", quantity: "to taste" },
        ],
      },
      {
        group: "For the rice and dum",
        items: [
          { name: "Aged basmati rice", quantity: "3 cups" },
          { name: "Whole spices (cardamom, cloves, cinnamon, bay leaf)", quantity: "as needed" },
          { name: "Saffron soaked in warm milk", quantity: "1/4 cup" },
          { name: "Fried onions (birista)", quantity: "1 cup" },
          { name: "Ghee", quantity: "1/4 cup" },
          { name: "Rosewater or kewra", quantity: "1 tsp" },
        ],
      },
    ],
    steps: [
      { title: "Marinate the chicken", body: "Combine chicken with yogurt, ginger-garlic paste, spices, herbs, lime juice, and salt. Marinate for at least 2 hours, ideally overnight in the fridge." },
      { title: "Parboil the rice", body: "Bring a large pot of water to a boil with whole spices and salt. Add soaked basmati and cook until 70 percent done — the grains should bend but still have a bite. Drain immediately." },
      { title: "Layer the biryani", body: "In a heavy-bottomed pot, spread the marinated chicken in a single layer. Top with fried onions, mint, coriander, and a drizzle of ghee. Cover with the parboiled rice. Pour saffron milk and rosewater over the top." },
      { title: "Seal and dum", body: "Cover the pot tightly — traditionally with dough or a foil and lid combination. Cook on high heat for 4 minutes, then on the lowest heat for 35 to 40 minutes. Do not open until ready." },
      { title: "Rest and serve", body: "Let the biryani rest, undisturbed, for 10 minutes after cooking. Open dramatically at the table, layer onto plates by digging from bottom to top, and serve with raita and mirchi ka salan." },
    ],
    servingSuggestions: [
      "Serve with a cooling cucumber raita and a wedge of lime.",
      "Mirchi ka salan, a tangy peanut-sesame chili curry, is the classic Hyderabadi pairing.",
      "Finish the meal with sheer khurma or a small bowl of double ka meetha.",
    ],
    tips: [
      "Always use aged basmati — fresh rice clumps and breaks during dum.",
      "The water for parboiling should taste like sea water; this seasons the rice through.",
      "Place a flat tawa under your dum pot to diffuse heat and prevent burning.",
    ],
    tags: ["Festive", "Non-vegetarian", "Slow-cooked", "Iconic"],
  },
  {
    id: "4",
    slug: "chettinad-pepper-chicken",
    title: "Chettinad Pepper Chicken",
    region: "Tamil Nadu",
    cookingTime: "45 mins",
    prepTime: "20 mins",
    servings: 4,
    difficulty: "Medium",
    description: "A deeply spiced, intensely flavorful curry featuring a fresh ground paste of black stone flower, pepper, and coconut.",
    image: "/images/chettinad.png",
    story: "From the merchant kitchens of Karaikudi, Chettinad cuisine is famous for its unapologetic use of freshly roasted spices. This pepper chicken is a fiery, fragrant celebration of black pepper, fennel, and the elusive black stone flower.",
    ingredients: [
      {
        group: "Spice paste",
        items: [
          { name: "Black peppercorns", quantity: "2 tbsp" },
          { name: "Fennel seeds", quantity: "1 tbsp" },
          { name: "Coriander seeds", quantity: "2 tbsp" },
          { name: "Dried red chilies", quantity: "5" },
          { name: "Black stone flower (kalpasi)", quantity: "1 tsp" },
          { name: "Grated coconut", quantity: "1/3 cup" },
        ],
      },
      {
        group: "For the curry",
        items: [
          { name: "Chicken, bone-in", quantity: "750 g" },
          { name: "Onions, finely chopped", quantity: "2" },
          { name: "Tomatoes, chopped", quantity: "2" },
          { name: "Ginger-garlic paste", quantity: "2 tbsp" },
          { name: "Curry leaves", quantity: "2 sprigs" },
          { name: "Sesame or coconut oil", quantity: "3 tbsp" },
          { name: "Turmeric", quantity: "1/2 tsp" },
          { name: "Salt", quantity: "to taste" },
        ],
      },
    ],
    steps: [
      { title: "Toast the spices", body: "Dry-roast the whole spices on low heat until they release their oils and turn fragrant. Cool, add coconut, and grind to a slightly coarse paste with a splash of water." },
      { title: "Build the base", body: "Heat oil in a heavy pan. Add curry leaves, then sauté onions until deep golden. Stir in ginger-garlic paste, then tomatoes, and cook until the oil separates." },
      { title: "Cook the chicken", body: "Add the chicken pieces, turmeric, and salt. Sear until the surface is opaque, about 4 minutes. Stir in the spice paste and cook for 3 more minutes." },
      { title: "Simmer to silk", body: "Add a cup of hot water, cover, and simmer for 25 minutes until the chicken is tender and the gravy clings to each piece." },
      { title: "Finish", body: "Crack a fresh round of pepper over the curry, scatter curry leaves, and rest, covered, for 5 minutes before serving." },
    ],
    servingSuggestions: [
      "Pair with steaming hot rice and a spoon of ghee.",
      "Serve with parotta or appam to mop up the dark, glossy gravy.",
      "Cucumber raita on the side balances the heat beautifully.",
    ],
    tips: [
      "The spices must be freshly toasted — pre-ground masala will not give the same depth.",
      "A small piece of black stone flower transforms the dish; do not skip it if you can find it.",
      "Let the curry rest for 10 minutes before serving — the flavors deepen as it sits.",
    ],
    tags: ["Spicy", "Non-vegetarian", "Regional", "Bold"],
  },
  {
    id: "5",
    slug: "appam-vegetable-stew",
    title: "Appam & Vegetable Stew",
    region: "Kerala",
    cookingTime: "35 mins",
    prepTime: "20 mins (plus fermentation)",
    servings: 4,
    difficulty: "Medium",
    description: "Lacy, bowl-shaped fermented rice pancakes served with a mild, comforting vegetable stew simmered in rich coconut milk.",
    image: "/images/appam.png",
    isPopular: true,
    story: "Sunday breakfast in a Kerala home: appam, soft-centered and lace-edged, paired with a stew so gentle and fragrant it feels like a hug. This is comfort food that needs nothing but a window seat and morning light.",
    ingredients: [
      {
        group: "For the appam",
        items: [
          { name: "Raw rice", quantity: "2 cups" },
          { name: "Cooked rice", quantity: "1/2 cup" },
          { name: "Grated coconut", quantity: "1/2 cup" },
          { name: "Yeast", quantity: "1/2 tsp" },
          { name: "Sugar", quantity: "2 tsp" },
          { name: "Salt", quantity: "to taste" },
        ],
      },
      {
        group: "For the stew",
        items: [
          { name: "Mixed vegetables (potato, carrot, beans, peas)", quantity: "3 cups" },
          { name: "Thin coconut milk", quantity: "1 cup" },
          { name: "Thick coconut milk", quantity: "1 cup" },
          { name: "Green chilies, slit", quantity: "3" },
          { name: "Ginger, julienned", quantity: "1 tbsp" },
          { name: "Whole spices (cardamom, cloves, cinnamon)", quantity: "as needed" },
          { name: "Curry leaves", quantity: "1 sprig" },
          { name: "Coconut oil", quantity: "2 tbsp" },
        ],
      },
    ],
    steps: [
      { title: "Make the batter", body: "Soak raw rice for 4 hours. Grind with cooked rice, coconut, yeast, sugar, and a little water into a smooth pouring batter. Cover and ferment for 6 to 8 hours until frothy." },
      { title: "Cook the appam", body: "Heat an appam pan and pour a ladle of batter. Quickly swirl the pan in a circular motion so the batter coats the sides — leaving a thick spongy center and lacy edges. Cover and cook for 2 minutes until done." },
      { title: "Start the stew", body: "Heat coconut oil, add whole spices and curry leaves. Toss in ginger and chilies, then add vegetables and the thin coconut milk. Simmer until the vegetables are just tender." },
      { title: "Finish with thick coconut milk", body: "Lower the heat. Pour in the thick coconut milk and warm gently — never boil, or it will split. Season with salt and a touch of pepper." },
      { title: "Serve", body: "Place two appams on a plate with a generous bowl of stew alongside. Tear a piece of appam, scoop the stew, and savor." },
    ],
    servingSuggestions: [
      "A small bowl of pickled lime adds a sharp, bright contrast.",
      "Pair with a Kerala-style egg roast for a heartier breakfast.",
      "Coconut chutney on the side complements both the appam and stew.",
    ],
    tips: [
      "If using yeast, make sure your water is warm, not hot, when activating it.",
      "A nonstick appam pan works well at home if you do not have a traditional kadai-style pan.",
      "Do not skip the swirling motion — that is what creates the signature lacy edge.",
    ],
    tags: ["Breakfast", "Vegetarian", "Coconut", "Gentle"],
  },
  {
    id: "6",
    slug: "kerala-avial",
    title: "Kerala Avial",
    region: "Kerala",
    cookingTime: "25 mins",
    prepTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    description: "A thick, wholesome mixture of local vegetables generously coated with coconut paste, yogurt, and aromatic curry leaves.",
    image: "/images/avial.png",
    story: "Legend says avial was invented by Bhima during the Pandavas' exile, when leftover vegetables were tossed together with coconut. Today it remains a non-negotiable on every Kerala sadya — proof that simplicity, done right, is sacred.",
    ingredients: [
      {
        group: "Vegetables",
        items: [
          { name: "Drumstick, cut to fingers", quantity: "1" },
          { name: "Raw banana", quantity: "1 medium" },
          { name: "Yam", quantity: "1 cup, cubed" },
          { name: "Carrot", quantity: "1, julienned" },
          { name: "Beans", quantity: "10, halved" },
          { name: "Ash gourd", quantity: "1 cup, cubed" },
          { name: "Cucumber", quantity: "1, julienned" },
        ],
      },
      {
        group: "Coconut paste & finish",
        items: [
          { name: "Grated coconut", quantity: "1 cup" },
          { name: "Cumin seeds", quantity: "1 tsp" },
          { name: "Green chilies", quantity: "4" },
          { name: "Turmeric", quantity: "1/2 tsp" },
          { name: "Thick yogurt, beaten", quantity: "1/2 cup" },
          { name: "Coconut oil", quantity: "2 tbsp" },
          { name: "Curry leaves", quantity: "2 sprigs" },
        ],
      },
    ],
    steps: [
      { title: "Cook the vegetables", body: "Place the longer-cooking vegetables (yam, drumstick, raw banana) in a wide pot with turmeric, salt, and a little water. Cook covered for 6 minutes, then add the rest. Cook until just tender — never mushy." },
      { title: "Grind the paste", body: "Pulse coconut, cumin, and green chilies into a coarse, fragrant paste. Do not over-grind." },
      { title: "Bring it together", body: "Stir the coconut paste into the vegetables and cook for 2 minutes. Take off the heat, then fold in the beaten yogurt gently — the residual warmth is enough." },
      { title: "Finish raw", body: "Drizzle raw coconut oil over the top and scatter fresh curry leaves. Cover and rest for 5 minutes for the aroma to bloom. Do not stir afterwards." },
    ],
    servingSuggestions: [
      "Avial is a staple of the Kerala sadya — serve with rice, sambar, and parippu.",
      "It also pairs beautifully with adai (mixed lentil pancakes).",
      "Leftovers taste even better the next day — gently warm without boiling.",
    ],
    tips: [
      "The raw coconut oil at the end is essential — never skip it.",
      "Use the freshest grated coconut you can find for the brightest flavor.",
      "Cut all the vegetables to roughly the same size so they cook evenly.",
    ],
    tags: ["Sadya", "Vegetarian", "Coconut", "Heritage"],
  },
  {
    id: "7",
    slug: "spicy-tomato-rasam",
    title: "Spicy Tomato Rasam",
    region: "Tamil Nadu",
    cookingTime: "20 mins",
    prepTime: "10 mins",
    servings: 4,
    difficulty: "Easy",
    description: "A warming, tangy, and peppery soup traditionally eaten with rice or enjoyed as a comforting broth on a rainy day.",
    image: "/images/rasam.png",
    story: "Rasam is medicine in a tumbler. Sip it when you feel the first chill of a cold; pour it over hot rice when you crave something warm. Every household has its own jealously guarded version — this is a bright, lemony tomato one.",
    ingredients: [
      {
        group: "Rasam powder (fresh)",
        items: [
          { name: "Toor dal", quantity: "1 tbsp" },
          { name: "Coriander seeds", quantity: "2 tbsp" },
          { name: "Cumin seeds", quantity: "1 tsp" },
          { name: "Black pepper", quantity: "1 tsp" },
          { name: "Dried red chilies", quantity: "3" },
        ],
      },
      {
        group: "For the rasam",
        items: [
          { name: "Ripe tomatoes, crushed", quantity: "3" },
          { name: "Tamarind, soaked in warm water", quantity: "a small lime-sized ball" },
          { name: "Cooked toor dal water", quantity: "1 cup" },
          { name: "Garlic, crushed", quantity: "4 cloves" },
          { name: "Curry leaves", quantity: "1 sprig" },
          { name: "Mustard seeds", quantity: "1 tsp" },
          { name: "Asafoetida", quantity: "a pinch" },
          { name: "Ghee", quantity: "1 tbsp" },
          { name: "Fresh coriander", quantity: "to garnish" },
        ],
      },
    ],
    steps: [
      { title: "Make the rasam powder", body: "Dry-roast the rasam powder ingredients until fragrant. Cool and grind to a coarse powder." },
      { title: "Build the broth", body: "Crush tomatoes by hand into a pot. Add tamarind water, dal water, garlic, and 2 cups of water. Stir in 2 teaspoons of the rasam powder. Simmer gently — do not boil hard." },
      { title: "Watch for the froth", body: "When the rasam begins to froth at the edges and a heady aroma rises, it is ready. This is the moment to take it off the heat." },
      { title: "Temper", body: "Heat ghee, splutter mustard seeds, add asafoetida and curry leaves. Pour the sizzling tempering into the rasam." },
      { title: "Serve", body: "Garnish with chopped coriander and ladle over hot steamed rice or sip from a tumbler." },
    ],
    servingSuggestions: [
      "Drizzle a little ghee on top just before serving for richness.",
      "Pair with a dry vegetable curry like beans poriyal for a complete meal.",
      "A small papad on the side adds a delightful crunch.",
    ],
    tips: [
      "Never boil rasam — once it froths, take it off the heat or the tang turns flat.",
      "Use fresh rasam powder if possible. It transforms the dish.",
      "Crush garlic with the skin on before adding for extra aroma.",
    ],
    tags: ["Comfort", "Vegetarian", "Soupy", "Quick"],
  },
  {
    id: "8",
    slug: "pal-payasam",
    title: "Pal Payasam",
    region: "South India",
    cookingTime: "40 mins",
    prepTime: "10 mins",
    servings: 6,
    difficulty: "Medium",
    description: "A rich, slow-simmered rice and milk pudding flavored with cardamom and generously garnished with ghee-roasted nuts.",
    image: "/images/payasam.png",
    story: "Pal payasam is the offering of celebration — born in temple kitchens, served in brass tumblers at weddings, ladled into banana leaves on auspicious days. The patience of slow-simmered milk is the whole secret.",
    ingredients: [
      {
        group: "Main",
        items: [
          { name: "Full-fat milk", quantity: "1 liter" },
          { name: "Basmati or short-grain rice", quantity: "1/4 cup" },
          { name: "Sugar", quantity: "1/2 cup, or to taste" },
          { name: "Green cardamom, crushed", quantity: "4 pods" },
          { name: "Saffron strands", quantity: "a small pinch" },
        ],
      },
      {
        group: "Garnish",
        items: [
          { name: "Ghee", quantity: "2 tbsp" },
          { name: "Cashews, halved", quantity: "2 tbsp" },
          { name: "Raisins", quantity: "2 tbsp" },
          { name: "Pistachios, slivered", quantity: "1 tbsp" },
        ],
      },
    ],
    steps: [
      { title: "Soak the rice", body: "Wash the rice and soak it for 15 minutes. Drain." },
      { title: "Reduce the milk", body: "Bring milk to a gentle boil in a heavy-bottomed pan. Add the drained rice and lower the heat. Simmer, stirring often, for 30 to 35 minutes until the milk has reduced to a creamy consistency and the rice is fully cooked." },
      { title: "Sweeten and perfume", body: "Add sugar and stir until dissolved. Add the cardamom and saffron. Simmer for 5 more minutes." },
      { title: "Toast the garnish", body: "Heat ghee in a small pan. Fry the cashews until golden, then add raisins and let them puff. Pour over the payasam." },
      { title: "Serve warm or chilled", body: "Pal payasam tastes wonderful both warm and chilled. It will thicken as it sits — loosen with a splash of warm milk if needed." },
    ],
    servingSuggestions: [
      "Serve in small brass tumblers for an authentic touch.",
      "A pinch of edible camphor gives it a temple-style flavor — use very sparingly.",
      "Top with a few rose petals for festive occasions.",
    ],
    tips: [
      "Use a heavy-bottomed pan and stir often to prevent the milk from scorching.",
      "Do not add sugar before the rice is fully cooked — it will harden the rice.",
      "Saffron releases more color when soaked first in 1 tablespoon of warm milk.",
    ],
    tags: ["Dessert", "Festive", "Vegetarian", "Slow"],
  },
  {
    id: "9",
    slug: "authentic-filter-coffee",
    title: "Authentic Filter Coffee",
    region: "South India",
    cookingTime: "15 mins",
    prepTime: "5 mins",
    servings: 2,
    difficulty: "Easy",
    description: "Strong, frothy coffee brewed using a traditional metal filter and chicory blend, mixed with boiling hot milk.",
    image: "/images/filter-coffee.png",
    story: "South Indian filter coffee is a ritual, not a beverage. The slow drip, the dramatic pour between davara and tumbler, the foam that crowns the top — this is morning, distilled into one perfect golden cup.",
    ingredients: [
      {
        group: "For two tumblers",
        items: [
          { name: "Filter coffee powder (with chicory)", quantity: "3 heaped tbsp" },
          { name: "Boiling water", quantity: "1 cup" },
          { name: "Full-fat milk", quantity: "1.5 cups" },
          { name: "Sugar", quantity: "to taste" },
        ],
      },
    ],
    steps: [
      { title: "Set up the filter", body: "Place the perforated disc in the lower chamber of a traditional South Indian coffee filter. Spoon coffee powder into the upper chamber and tamp it gently — not too tight." },
      { title: "Pour the water", body: "Slowly pour boiling water over the coffee. Cover with the lid and let the decoction drip down for 10 to 15 minutes. Do not press or rush." },
      { title: "Heat the milk", body: "Bring milk to a strong boil. Pour into a tumbler with sugar." },
      { title: "Mix and froth", body: "Add 2 to 3 tablespoons of decoction to each tumbler of milk. Pour the coffee back and forth between the tumbler and davara from a height to create a creamy froth." },
      { title: "Serve immediately", body: "Hand it over while the foam still crowns the cup. Drink slowly — this is not coffee to rush." },
    ],
    servingSuggestions: [
      "Serve in the traditional steel davara-tumbler set for the full experience.",
      "Pair with a freshly fried medu vada or a slice of Mysore pak.",
      "Best enjoyed at sunrise, on a verandah, with the newspaper.",
    ],
    tips: [
      "Use freshly ground coffee with at least 20 percent chicory for the classic taste.",
      "The decoction can be stored in the fridge for a day — never reheat directly.",
      "The signature froth comes from pouring milk and decoction back and forth from height.",
    ],
    tags: ["Drink", "Ritual", "Quick", "Iconic"],
  }
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return mockRecipes.find((r) => r.slug === slug);
}
