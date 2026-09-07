/**
 * FeastFlow Platform - Seed Data & Mock Database
 * Contains categories, restaurants, menu items with customization, promo codes, and initial state.
 */

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Cuisines', icon: 'fa-utensils', badge: 'Popular' },
  { id: 'pizza', name: 'Pizza & Italian', icon: 'fa-pizza-slice', count: 18 },
  { id: 'burgers', name: 'Gourmet Burgers', icon: 'fa-burger', count: 24 },
  { id: 'pakistani', name: 'Pakistani & Desi', icon: 'fa-pepper-hot', count: 16 },
  { id: 'bbq', name: 'BBQ & Grills', icon: 'fa-fire', count: 12 },
  { id: 'asian', name: 'Chinese & Asian', icon: 'fa-bowl-rice', count: 15 },
  { id: 'chicken', name: 'Crispy Chicken', icon: 'fa-drumstick-bite', count: 20 },
  { id: 'healthy', name: 'Healthy & Bowls', icon: 'fa-leaf', count: 14 },
  { id: 'desserts', name: 'Desserts & Bakery', icon: 'fa-cake-candles', count: 22 },
  { id: 'drinks', name: 'Drinks & Shakes', icon: 'fa-wine-glass', count: 19 },
  { id: 'breakfast', name: 'All-Day Breakfast', icon: 'fa-egg', count: 11 }
];

const INITIAL_RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'The Artisan Charcoal Grill',
    slug: 'the-artisan-charcoal-grill',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'BBQ & Grills',
    category: 'bbq',
    rating: 4.9,
    reviewsCount: 1420,
    deliveryTime: '25-35 min',
    deliveryFee: 1.99,
    minOrder: 15.00,
    priceRange: '$$$',
    isPromoted: true,
    offerBadge: '20% OFF ABOVE $30',
    isOpen: true,
    openingHours: '12:00 PM - 11:30 PM',
    address: '42 Gourmet Boulevard, Downtown Culinary District',
    description: 'Masterfully flame-grilled prime meats, artisanal slow-smoked ribs, and handcrafted secret marinades created by world-renowned pitmasters.',
    featuredDishes: ['dish-1', 'dish-2', 'dish-3'],
    tags: ['Steak', 'Smoked Ribs', 'Halal', 'Chef Choice']
  },
  {
    id: 'rest-2',
    name: 'Bella Napoli Woodfired Pizza',
    slug: 'bella-napoli-woodfired-pizza',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Pizza & Italian',
    category: 'pizza',
    rating: 4.8,
    reviewsCount: 980,
    deliveryTime: '20-30 min',
    deliveryFee: 0.00,
    minOrder: 12.00,
    priceRange: '$$',
    isPromoted: true,
    offerBadge: 'FREE DELIVERY',
    isOpen: true,
    openingHours: '11:00 AM - 11:00 PM',
    address: '18 Piazza San Marco Lane, Little Italy',
    description: 'Authentic 72-hour naturally fermented sourdough pizzas baked in 900°F volcanic stone ovens with San Marzano tomatoes and Buffalo Mozzarella.',
    featuredDishes: ['dish-4', 'dish-5', 'dish-6'],
    tags: ['Sourdough', 'Vegetarian Options', 'Organic', 'Free Delivery']
  },
  {
    id: 'rest-3',
    name: 'Royal Mughlai Dastarkhwan',
    slug: 'royal-mughlai-dastarkhwan',
    logo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Pakistani & Desi',
    category: 'pakistani',
    rating: 4.9,
    reviewsCount: 2150,
    deliveryTime: '30-40 min',
    deliveryFee: 1.49,
    minOrder: 18.00,
    priceRange: '$$',
    isPromoted: false,
    offerBadge: 'CHEF RECOMMENDED',
    isOpen: true,
    openingHours: '12:30 PM - Midnight',
    address: '88 Heritage Spice Road, Old City Bazaar',
    description: 'Heritage recipes passed down through royal Mughal culinary dynasties. Slow-dum cooked saffron biryanis, silken Nihari, and fresh tandoor breads.',
    featuredDishes: ['dish-7', 'dish-8', 'dish-9'],
    tags: ['Dum Biryani', 'Halal 100%', 'Spicy', 'Tandoor']
  },
  {
    id: 'rest-4',
    name: 'The Smash Burger Co.',
    slug: 'the-smash-burger-co',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Gourmet Burgers',
    category: 'burgers',
    rating: 4.7,
    reviewsCount: 1640,
    deliveryTime: '15-25 min',
    deliveryFee: 0.99,
    minOrder: 10.00,
    priceRange: '$$',
    isPromoted: false,
    offerBadge: 'SUPER FAST DELIVERY',
    isOpen: true,
    openingHours: '11:00 AM - 01:00 AM',
    address: '5 West End Avenue, Midtown Food Hub',
    description: 'Crispy lacy-edged Angus beef patties smashed hot on seasoned chrome flat tops, toasted brioche buns, melted aged cheddar, and house relish.',
    featuredDishes: ['dish-10', 'dish-11', 'dish-12'],
    tags: ['Angus Beef', 'Truffle Fries', 'Craft Shakes', 'Quick Bite']
  },
  {
    id: 'rest-5',
    name: 'Tokyo Golden Ramen & Wok',
    slug: 'tokyo-golden-ramen-wok',
    logo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Chinese & Asian',
    category: 'asian',
    rating: 4.8,
    reviewsCount: 820,
    deliveryTime: '25-35 min',
    deliveryFee: 2.49,
    minOrder: 14.00,
    priceRange: '$$',
    isPromoted: false,
    offerBadge: '15% OFF ORDERS $25+',
    isOpen: true,
    openingHours: '11:30 AM - 10:30 PM',
    address: '77 Sakura Way, Asian Quarter',
    description: 'Deep 18-hour rich broth ramen bowls, handmade springy noodles, sizzling wok teriyaki specialties, and crispy steamed gyoza.',
    featuredDishes: ['dish-13', 'dish-14', 'dish-15'],
    tags: ['Ramen', 'Dumplings', 'Wok Stir-fry', 'Umami']
  },
  {
    id: 'rest-6',
    name: 'Crispy Golden Roosters',
    slug: 'crispy-golden-roosters',
    logo: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Crispy Chicken',
    category: 'chicken',
    rating: 4.6,
    reviewsCount: 1120,
    deliveryTime: '20-30 min',
    deliveryFee: 1.29,
    minOrder: 12.00,
    priceRange: '$',
    isPromoted: false,
    offerBadge: 'FAMILY COMBO DEALS',
    isOpen: true,
    openingHours: '10:30 AM - 11:30 PM',
    address: '14 Metro Plaza, South Strip',
    description: 'Triple buttermilk-soaked tender chicken dredged in 14 secret herbs and spices, fried to golden crunchy perfection with homemade honey butter biscuits.',
    featuredDishes: ['dish-16', 'dish-17', 'dish-18'],
    tags: ['Crispy Tenders', 'Nashville Hot', 'Loaded Fries']
  },
  {
    id: 'rest-7',
    name: 'Green Goddess Organic Bowls',
    slug: 'green-goddess-organic-bowls',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Healthy & Bowls',
    category: 'healthy',
    rating: 4.9,
    reviewsCount: 760,
    deliveryTime: '15-25 min',
    deliveryFee: 0.00,
    minOrder: 14.00,
    priceRange: '$$',
    isPromoted: false,
    offerBadge: 'FREE DELIVERY',
    isOpen: true,
    openingHours: '08:00 AM - 09:00 PM',
    address: '29 Sunrise Terrace, Eco Park Plaza',
    description: 'Farm-to-fork nutrient-dense superfood bowls, wild salmon, cold-pressed raw tonics, organic microgreens, and wholesome vegan protein creations.',
    featuredDishes: ['dish-19', 'dish-20', 'dish-21'],
    tags: ['Vegan', 'Gluten-Free', 'Superfoods', 'Fresh & Clean']
  },
  {
    id: 'rest-8',
    name: 'Sweet Velvet Artisan Patisserie',
    slug: 'sweet-velvet-artisan-patisserie',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Desserts & Bakery',
    category: 'desserts',
    rating: 4.9,
    reviewsCount: 1890,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 10.00,
    priceRange: '$$',
    isPromoted: true,
    offerBadge: 'BUY 1 GET 1 DRINK',
    isOpen: true,
    openingHours: '09:00 AM - 11:00 PM',
    address: '60 Boulevard St. Honore, French Quarter',
    description: 'Handmade French macarons, decadent Belgian molten chocolate lava cakes, pistachio cheesecakes, and specialty barista pour-overs.',
    featuredDishes: ['dish-22', 'dish-23', 'dish-24'],
    tags: ['Chocolate', 'Cheesecake', 'Fresh Bakery', 'Sweet Treats']
  }
];

const INITIAL_MENU_ITEMS = [
  // The Artisan Charcoal Grill
  {
    id: 'dish-1',
    restaurantId: 'rest-1',
    name: 'Prime Tomahawk Ribeye Steak',
    description: 'Dry-aged 32oz bone-in tomahawk ribeye, seared over white oak lump charcoal with black truffle compound butter and roasted garlic sprigs.',
    price: 48.50,
    rating: 4.9,
    reviewsCount: 310,
    category: 'Chef Specials',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Signature',
    ingredients: ['Dry Aged Beef', 'Black Truffle Butter', 'Smoked Sea Salt', 'Roasted Garlic', 'Fresh Rosemary'],
    customizations: {
      sizes: [
        { name: 'Medium Cut (20oz)', priceDelta: 0 },
        { name: 'Master Cut (32oz)', priceDelta: 16.00 }
      ],
      doneness: ['Medium Rare', 'Medium', 'Medium Well'],
      addons: [
        { name: 'Lobster Tail Topping', price: 14.00 },
        { name: 'Chimichurri Herb Butter', price: 2.50 },
        { name: 'Charred Asparagus Spear', price: 4.50 },
        { name: 'Truffle Mashed Potatoes', price: 5.50 }
      ]
    }
  },
  {
    id: 'dish-2',
    restaurantId: 'rest-1',
    name: 'Texas Mesquite Smoked Brisket',
    description: '14-hour hardwood oak smoked brisket with peppercorn bark, served with pickled sweet onions, jalapeño slaw, and honey bourbon sauce.',
    price: 26.90,
    rating: 4.8,
    reviewsCount: 220,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Pitmaster Choice',
    ingredients: ['Prime Angus Brisket', 'Coarse Black Pepper', 'Cider Spritz', 'Hickory Glaze'],
    customizations: {
      sizes: [
        { name: 'Half Pound (8oz)', priceDelta: 0 },
        { name: 'Full Pound (16oz)', priceDelta: 11.50 }
      ],
      addons: [
        { name: 'Extra Cheddar Jalapeño Sausage', price: 4.00 },
        { name: 'Southern Cornbread Muffin', price: 2.50 },
        { name: 'Pit Smoked Beans', price: 3.50 }
      ]
    }
  },
  {
    id: 'dish-3',
    restaurantId: 'rest-1',
    name: 'Flame Grilled Lamb Chops',
    description: 'New Zealand grass-fed lamb cutlets crusted in crushed pistachios, mint oil, and pomegranate reduction, served with roasted heirloom carrots.',
    price: 32.00,
    rating: 4.9,
    reviewsCount: 185,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: false,
    ingredients: ['New Zealand Lamb', 'Mint Relish', 'Pistachio Crumble', 'Pomegranate Glaze'],
    customizations: {
      sizes: [
        { name: '3 Pieces', priceDelta: 0 },
        { name: '5 Pieces Feaster', priceDelta: 9.50 }
      ],
      addons: [
        { name: 'Garlic Butter Naan', price: 2.50 },
        { name: 'Greek Tzatziki Dip', price: 2.00 }
      ]
    }
  },

  // Bella Napoli Woodfired Pizza
  {
    id: 'dish-4',
    restaurantId: 'rest-2',
    name: 'Truffle Burrata Margherita D.O.P.',
    description: 'Whole organic creamy burrata heart centered on blistered sourdough crust, San Marzano tomato puree, black truffle pesto, and fresh basil leaves.',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 420,
    category: 'Artisan Pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    badge: 'Best Seller',
    ingredients: ['San Marzano Tomatoes', 'Fresh Burrata', 'Truffle Oil', 'Basil', 'Extra Virgin Olive Oil'],
    customizations: {
      sizes: [
        { name: '10" Personal Crust', priceDelta: 0 },
        { name: '14" Family Stone Crust', priceDelta: 6.50 }
      ],
      crustTypes: ['Classic Neapolitan', 'Crispy Thin Crust', 'Garlic Butter Stuffed Crust (+ $3.00)'],
      addons: [
        { name: 'Extra Bufala Mozzarella', price: 3.50 },
        { name: 'Wood-roasted Mushrooms', price: 2.50 },
        { name: 'Spicy Hot Honey Drizzle', price: 1.50 },
        { name: 'Prosciutto di Parma', price: 4.50 }
      ]
    }
  },
  {
    id: 'dish-5',
    restaurantId: 'rest-2',
    name: 'Diavola Spianata Calabrese',
    description: 'Zesty crushed red chili sauce, spicy aged Calabrian salami, smoked provolone cheese, oregano sprigs, and infused chili honey glaze.',
    price: 19.90,
    rating: 4.8,
    reviewsCount: 290,
    category: 'Artisan Pizzas',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Hot & Spicy',
    ingredients: ['Calabrian Salami', 'Smoked Provolone', 'Chili Flakes', 'Hot Honey'],
    customizations: {
      sizes: [
        { name: '10" Personal Crust', priceDelta: 0 },
        { name: '14" Family Stone Crust', priceDelta: 6.50 }
      ],
      addons: [
        { name: 'Kalamata Black Olives', price: 2.00 },
        { name: 'Caramelized Sweet Onions', price: 1.50 },
        { name: 'Garlic Dipping Aioli', price: 1.50 }
      ]
    }
  },
  {
    id: 'dish-6',
    restaurantId: 'rest-2',
    name: 'Wild Forest Quattro Funghi',
    description: 'Cremini, shiitake, oyster, and portobello mushrooms sautéed with thyme, creamy taleggio cheese base, and white truffle essence drizzle.',
    price: 22.00,
    rating: 4.7,
    reviewsCount: 160,
    category: 'Artisan Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: false,
    ingredients: ['Shiitake', 'Oyster Mushrooms', 'Taleggio', 'White Truffle Essence'],
    customizations: {
      sizes: [
        { name: '10" Personal Crust', priceDelta: 0 },
        { name: '14" Family Stone Crust', priceDelta: 6.50 }
      ],
      addons: [
        { name: 'Shaved Parmigiano Reggiano', price: 3.00 },
        { name: 'Crispy Rosemary Flatbreads', price: 2.50 }
      ]
    }
  },

  // Royal Mughlai Dastarkhwan
  {
    id: 'dish-7',
    restaurantId: 'rest-3',
    name: 'Special Royal Dum Mutton Biryani',
    description: 'Fragrant long-grain aged basmati rice layered with baby mutton pieces, saffron strands, fried golden onions, dried prunes, and rose essence slow-cooked in sealed clay pot (Handi).',
    price: 21.00,
    rating: 4.95,
    reviewsCount: 890,
    category: 'Royal Rice Specialties',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Legendary',
    ingredients: ['Aged Basmati Rice', 'Tender Goat Meat', 'Kashmiri Saffron', 'Kewra Rose Water', 'Crispy Barista'],
    customizations: {
      sizes: [
        { name: 'Single Pot (Serves 1-2)', priceDelta: 0 },
        { name: 'Matka Family Pot (Serves 3-4)', priceDelta: 17.00 }
      ],
      spiceLevel: ['Mild Royal', 'Traditional Spicy', 'Extra Fiery Special'],
      addons: [
        { name: 'Boiled Egg & Spiced Potato', price: 2.00 },
        { name: 'Zeera Mint Raita & Fresh Salad', price: 1.50 },
        { name: 'Shahi Gulab Jamun (2 pcs)', price: 3.00 },
        { name: 'Extra Mutton Boti Skewer', price: 5.50 }
      ]
    }
  },
  {
    id: 'dish-8',
    restaurantId: 'rest-3',
    name: 'Lahori Shinwari Chicken Karahi',
    description: 'Fresh chicken cooked in a traditional cast-iron wok with vine-ripened tomatoes, julienned ginger, green chilies, and freshly cracked black pepper. No onions, pure rich gravy.',
    price: 18.50,
    rating: 4.9,
    reviewsCount: 520,
    category: 'Curries & Karahi',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Popular',
    ingredients: ['Farm Fresh Chicken', 'Plum Tomatoes', 'Green Chilies', 'Cracked Pepper', 'Desi Ghee'],
    customizations: {
      sizes: [
        { name: 'Half Karahi (1-2 persons)', priceDelta: 0 },
        { name: 'Full Karahi (3-4 persons)', priceDelta: 12.00 }
      ],
      addons: [
        { name: 'Garlic Roghani Naan (2 pcs)', price: 3.00 },
        { name: 'Sesame Kulcha Naan', price: 2.50 },
        { name: 'Fresh Mint Chutney', price: 1.00 }
      ]
    }
  },
  {
    id: 'dish-9',
    restaurantId: 'rest-3',
    name: 'Slow-Stewed Royal Beef Nihari',
    description: 'Marrow bone beef shank simmered overnight for 12 hours in an aromatic spice infusion, garnished with fresh ginger slivers, lemon, and green chilies.',
    price: 20.00,
    rating: 4.85,
    reviewsCount: 410,
    category: 'Curries & Karahi',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: false,
    ingredients: ['Beef Shank', 'Bone Marrow Nalli', 'Long Pepper Spices', 'Garnish Tray'],
    customizations: {
      sizes: [
        { name: 'Regular Portion', priceDelta: 0 },
        { name: 'Special Nalli Double Marrow', priceDelta: 6.00 }
      ],
      addons: [
        { name: 'Tandoori Roti Basket (3 pcs)', price: 2.50 },
        { name: 'Extra Marrow Bone Spoon', price: 3.50 }
      ]
    }
  },

  // The Smash Burger Co.
  {
    id: 'dish-10',
    restaurantId: 'rest-4',
    name: 'The Black Truffle Double Smash',
    description: 'Two 4oz smashed Angus beef patties, double Wisconsin sharp cheddar, caramelized shallots, black truffle aioli, and crispy potato straw nests inside toasted brioche.',
    price: 15.50,
    rating: 4.8,
    reviewsCount: 650,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Top Rated',
    ingredients: ['Double Angus Beef', 'Truffle Mayo', 'Wisconsin Cheddar', 'Crispy Shallots', 'Brioche Bun'],
    customizations: {
      sizes: [
        { name: 'Double Patty (8oz)', priceDelta: 0 },
        { name: 'Triple Patty Beast (12oz)', priceDelta: 4.50 }
      ],
      addons: [
        { name: 'Crisp Beef Bacon Strips', price: 2.50 },
        { name: 'Fried Cage-Free Egg', price: 1.50 },
        { name: 'Side of Truffle Fries', price: 4.50 },
        { name: 'Smash Secret Dip', price: 1.00 }
      ]
    }
  },
  {
    id: 'dish-11',
    restaurantId: 'rest-4',
    name: 'Smokin’ Jalapeño Fire Burger',
    description: 'Ghost pepper Monterey Jack cheese, pickled jalapeño coins, smoked bacon jam, chipotle mayo, and crispy onion rings on sesame bun.',
    price: 14.80,
    rating: 4.7,
    reviewsCount: 380,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Spicy Favorite',
    ingredients: ['Angus Patty', 'Ghost Jack Cheese', 'Bacon Jam', 'Chipotle Crema'],
    customizations: {
      sizes: [
        { name: 'Single (4oz)', priceDelta: -2.00 },
        { name: 'Double (8oz)', priceDelta: 0 }
      ],
      addons: [
        { name: 'Extra Melted Cheddar Drizzle', price: 2.00 },
        { name: 'Loaded Queso Fries', price: 4.90 }
      ]
    }
  },
  {
    id: 'dish-12',
    restaurantId: 'rest-4',
    name: 'Salted Caramel Crunch Thickshake',
    description: 'Rich churned Madagascan vanilla ice cream spun with Fleur de Sel caramel sauce, sea salt pretzels, whipped cream peak, and gold drizzle.',
    price: 7.50,
    rating: 4.9,
    reviewsCount: 420,
    category: 'Drinks & Shakes',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    ingredients: ['Vanilla Bean Ice Cream', 'Artisan Caramel', 'Pretzel Crumbs', 'Whipped Cream'],
    customizations: {
      sizes: [
        { name: 'Regular (16oz)', priceDelta: 0 },
        { name: 'Giant Jar (24oz)', priceDelta: 2.50 }
      ],
      addons: [
        { name: 'Extra Shot of Espresso', price: 1.50 },
        { name: 'Chocolate Wafer Straw', price: 1.00 }
      ]
    }
  },

  // Tokyo Golden Ramen & Wok
  {
    id: 'dish-13',
    restaurantId: 'rest-5',
    name: 'Kyoto Black Garlic Tonkotsu Ramen',
    description: '18-hour velvety bone broth, house-made ramen noodles, melt-in-mouth chashu tender cuts, ajitsuke tamago ramen egg, wood ear mushrooms, and fragrant black garlic oil.',
    price: 17.50,
    rating: 4.9,
    reviewsCount: 390,
    category: 'Ramen & Bowls',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'House Special',
    ingredients: ['Rich Broth', 'Handmade Noodles', 'Chashu Cuts', 'Soft Jammy Egg', 'Mayu Garlic Oil'],
    customizations: {
      sizes: [
        { name: 'Standard Bowl', priceDelta: 0 },
        { name: 'Sumo Extra Noodle Bowl', priceDelta: 3.50 }
      ],
      noodleFirmness: ['Soft', 'Medium Firm (Standard)', 'Firm Katame'],
      addons: [
        { name: 'Extra Chashu Braised Cuts (3 pcs)', price: 4.00 },
        { name: 'Extra Seasoned Egg', price: 2.00 },
        { name: 'Spicy Chili Paste Ball', price: 1.00 },
        { name: 'Crispy Nori Seaweed (4 sheets)', price: 1.50 }
      ]
    }
  },
  {
    id: 'dish-14',
    restaurantId: 'rest-5',
    name: 'Crispy Pan-Fried Pork & Leek Gyoza',
    description: 'Hand-pleated Japanese dumplings seared until lacy and crisp on the bottom, juicy tender inside, served with scallion ponzu dipping glaze (6 pieces).',
    price: 9.80,
    rating: 4.8,
    reviewsCount: 260,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    ingredients: ['Tender Minced Filling', 'Chives', 'Ginger', 'Sesame Oil', 'Ponzu Sauce'],
    customizations: {
      sizes: [
        { name: '6 Pieces', priceDelta: 0 },
        { name: '12 Pieces Sharing Platter', priceDelta: 7.00 }
      ],
      addons: [
        { name: 'Spicy Crispy Rayu Oil', price: 1.50 }
      ]
    }
  },

  // Crispy Golden Roosters
  {
    id: 'dish-16',
    restaurantId: 'rest-6',
    name: 'Nashville Hot Crispy Chicken Tenders',
    description: 'Jumbo tender chicken strips soaked in cultured buttermilk, dusted in spicy cayenne brown sugar glaze, served on Texas toast with crinkle dill pickles.',
    price: 13.90,
    rating: 4.7,
    reviewsCount: 450,
    category: 'Chicken Combos',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Crispy Favorite',
    ingredients: ['Buttermilk Chicken', 'Nashville Chili Rub', 'House Pickles', 'Comeback Sauce'],
    customizations: {
      sizes: [
        { name: '4 Jumbo Tenders', priceDelta: 0 },
        { name: '8 Jumbo Party Tenders', priceDelta: 8.50 }
      ],
      spiceLevel: ['Southern Mild', 'Medium Hot', 'Nashville Inferno (Crying Allowed)'],
      addons: [
        { name: 'Honey Glazed Buttermilk Biscuit', price: 2.00 },
        { name: 'Cajun Seasoned Waffle Fries', price: 3.50 },
        { name: 'Garlic Parmesan Dip', price: 1.00 }
      ]
    }
  },

  // Green Goddess Organic Bowls
  {
    id: 'dish-19',
    restaurantId: 'rest-7',
    name: 'Wild Miso Salmon Superfood Bowl',
    description: 'Pan-seared Alaskan wild salmon, tricolor warm quinoa, creamy avocado slices, edamame beans, pickled ginger, wakame, and ginger sesame dressing.',
    price: 18.90,
    rating: 4.9,
    reviewsCount: 380,
    category: 'Power Bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true,
    badge: 'Nutrient Rich',
    ingredients: ['Wild Salmon', 'Avocado', 'Organic Quinoa', 'Edamame', 'Toasted Sesame'],
    customizations: {
      sizes: [
        { name: 'Standard Fuel Bowl', priceDelta: 0 },
        { name: 'Double Protein Power Bowl', priceDelta: 6.50 }
      ],
      addons: [
        { name: 'Soft Poached Organic Egg', price: 2.00 },
        { name: 'Cold Pressed Green Juice Bottle', price: 4.50 },
        { name: 'Extra Avocado Scoop', price: 2.50 }
      ]
    }
  },
  {
    id: 'dish-20',
    restaurantId: 'rest-7',
    name: 'Mediterranean Grilled Halloumi Salad',
    description: 'Charred golden Cypriot halloumi, baby spinach, Persian cucumbers, sun-dried cherry tomatoes, kalamata olives, toasted pine nuts, and herb vinaigrette.',
    price: 15.50,
    rating: 4.8,
    reviewsCount: 220,
    category: 'Power Bowls',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: false,
    ingredients: ['Halloumi Cheese', 'Spinach', 'Pine Nuts', 'Kalamata Olives', 'Lemon Herb Vinaigrette'],
    customizations: {
      sizes: [
        { name: 'Regular Salad Bowl', priceDelta: 0 },
        { name: 'Large Feasting Salad Bowl', priceDelta: 4.00 }
      ],
      addons: [
        { name: 'Warm Zaatar Pita Bread', price: 2.00 },
        { name: 'Herb Hummus Dollop', price: 2.00 }
      ]
    }
  },

  // Sweet Velvet Artisan Patisserie
  {
    id: 'dish-22',
    restaurantId: 'rest-8',
    name: 'Molten Belgian Dark Chocolate Lava',
    description: 'Warm 70% Guanaja dark chocolate cake with a river of silky molten center, served with Tahitian vanilla bean gelato and raspberry dust.',
    price: 11.50,
    rating: 4.95,
    reviewsCount: 540,
    category: 'Patisserie Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    badge: 'Indulgent',
    ingredients: ['Belgian Dark Chocolate', 'Tahitian Vanilla Gelato', 'Butter', 'Fresh Raspberries'],
    customizations: {
      sizes: [
        { name: 'Single Molten Dome', priceDelta: 0 },
        { name: 'Couple Duet (2 cakes)', priceDelta: 8.50 }
      ],
      addons: [
        { name: 'Extra Gelato Scoop', price: 3.00 },
        { name: 'Hot Salted Butter Caramel Pour', price: 2.00 },
        { name: 'Crushed Candied Hazelnuts', price: 1.50 }
      ]
    }
  },
  {
    id: 'dish-23',
    restaurantId: 'rest-8',
    name: 'Sicilian Pistachio Basque Cheesecake',
    description: 'Burnt caramelized top with an ultra-creamy oozing pistachio paste core, baked fresh daily with pure Mediterranean pistachios.',
    price: 10.90,
    rating: 4.9,
    reviewsCount: 380,
    category: 'Patisserie Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    badge: 'Chef Creation',
    ingredients: ['Sicilian Pistachio Butter', 'Cream Cheese', 'Caramelized Crust'],
    customizations: {
      sizes: [
        { name: 'Generous Slice', priceDelta: 0 },
        { name: 'Whole 6" Party Cake', priceDelta: 32.00 }
      ],
      addons: [
        { name: 'Espresso Macchiato Cup', price: 3.50 }
      ]
    }
  }
];

const INITIAL_PROMOS = [
  {
    code: 'FEAST20',
    discountPercent: 20,
    minSpend: 25.00,
    description: '20% discount on all orders over $25.00',
    maxDiscount: 15.00,
    expiry: 'Expires in 3 days'
  },
  {
    code: 'FREEDEL',
    discountAmount: 0,
    isFreeDelivery: true,
    minSpend: 15.00,
    description: 'Zero delivery fee on orders above $15.00',
    expiry: 'Special Weekend Deal'
  },
  {
    code: 'WELCOME50',
    discountAmount: 5.00,
    minSpend: 20.00,
    description: 'Flat $5.00 OFF on your meal',
    expiry: 'New Foodie Perk'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-09-06 15:40',
    restaurantId: 'rest-1',
    restaurantName: 'The Artisan Charcoal Grill',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    status: 'on_the_way', // 'confirmed', 'preparing', 'picked_up', 'on_the_way', 'delivered'
    statusStep: 4, // 1 to 5
    estimatedArrival: '18 mins',
    items: [
      { id: 'dish-1', name: 'Prime Tomahawk Ribeye Steak', size: 'Medium Cut (20oz)', quantity: 1, price: 48.50 },
      { id: 'dish-12', name: 'Salted Caramel Crunch Thickshake', size: 'Regular (16oz)', quantity: 2, price: 7.50 }
    ],
    subtotal: 63.50,
    deliveryFee: 1.99,
    tax: 5.08,
    discount: 12.70,
    grandTotal: 57.87,
    paymentMethod: 'Credit Card (•••• 4892)',
    deliveryAddress: 'Penthouse 14B, Sapphire Sky Residences, Downtown Central',
    rider: {
      name: 'Alexandre Sterling',
      phone: '+1 (555) 928-3011',
      rating: 4.95,
      vehicle: 'Yamaha MT-07 Midnight Edition (Plate # FF-7782)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      currentLocation: '3.1 km away • Main Boulevard Crossing'
    }
  },
  {
    id: 'ORD-97842',
    date: '2026-09-05 19:15',
    restaurantId: 'rest-2',
    restaurantName: 'Bella Napoli Woodfired Pizza',
    restaurantLogo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    status: 'delivered',
    statusStep: 5,
    estimatedArrival: 'Delivered',
    items: [
      { id: 'dish-4', name: 'Truffle Burrata Margherita D.O.P.', size: '14" Family Stone Crust', quantity: 1, price: 28.00 },
      { id: 'dish-5', name: 'Diavola Spianata Calabrese', size: '10" Personal Crust', quantity: 1, price: 19.90 }
    ],
    subtotal: 47.90,
    deliveryFee: 0.00,
    tax: 3.83,
    discount: 9.58,
    grandTotal: 42.15,
    paymentMethod: 'Apple Pay',
    deliveryAddress: 'Penthouse 14B, Sapphire Sky Residences, Downtown Central',
    rider: {
      name: 'Michael Chen',
      phone: '+1 (555) 349-1120',
      rating: 4.9,
      vehicle: 'Vespa Elettrica 2026',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      currentLocation: 'Delivered'
    }
  },
  {
    id: 'ORD-96510',
    date: '2026-09-02 13:20',
    restaurantId: 'rest-3',
    restaurantName: 'Royal Mughlai Dastarkhwan',
    restaurantLogo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=200&q=80',
    status: 'delivered',
    statusStep: 5,
    estimatedArrival: 'Delivered',
    items: [
      { id: 'dish-7', name: 'Special Royal Dum Mutton Biryani', size: 'Single Pot (Serves 1-2)', quantity: 2, price: 21.00 },
      { id: 'dish-8', name: 'Lahori Shinwari Chicken Karahi', size: 'Half Karahi', quantity: 1, price: 18.50 }
    ],
    subtotal: 60.50,
    deliveryFee: 1.49,
    tax: 4.84,
    discount: 0.00,
    grandTotal: 66.83,
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: 'Penthouse 14B, Sapphire Sky Residences, Downtown Central',
    rider: {
      name: 'Tariq Al-Mansoor',
      phone: '+1 (555) 782-9901',
      rating: 4.88,
      vehicle: 'Honda CG 125 Red',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      currentLocation: 'Delivered'
    }
  }
];

const INITIAL_USER = {
  name: 'Sophia Montgomery',
  email: 'sophia.montgomery@example.com',
  phone: '+1 (555) 849-2041',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  tier: 'VIP Platinum Gourmand',
  points: 1850,
  addresses: [
    {
      id: 'addr-1',
      title: 'Home (Penthouse)',
      street: 'Penthouse 14B, Sapphire Sky Residences',
      area: 'Downtown Central',
      city: 'Metropolis',
      isDefault: true,
      instructions: 'Ring video doorbell, elevator keycard with concierge'
    },
    {
      id: 'addr-2',
      title: 'Design Studio / Office',
      street: '450 Innovation Parkway, Suite 800',
      area: 'Tech Corridor',
      city: 'Metropolis',
      isDefault: false,
      instructions: 'Leave with 8th floor front desk reception'
    }
  ],
  favoriteRestaurants: ['rest-1', 'rest-3', 'rest-8'],
  favoriteDishes: ['dish-1', 'dish-4', 'dish-7', 'dish-22']
};
