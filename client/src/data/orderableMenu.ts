export type OrderableMenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export const ORDERABLE_MENU_ITEMS: OrderableMenuItem[] = [
  {
    id: "soup-hot-sour-veg",
    name: "Hot n Sour Soup (Veg)",
    category: "Soups",
    price: 110,
  },
  {
    id: "soup-hot-sour-chicken",
    name: "Hot n Sour Soup (Chicken)",
    category: "Soups",
    price: 130,
  },
  {
    id: "main-paneer-butter",
    name: "Paneer Butter Masala",
    category: "Chef's Signature",
    price: 240,
  },
  {
    id: "main-paneer-tikka",
    name: "Paneer Tikka Masala",
    category: "Chef's Signature",
    price: 250,
  },
  {
    id: "main-chicken-kassa",
    name: "Chicken Kassa",
    category: "Chef's Signature",
    price: 185,
  },
  {
    id: "main-chicken-butter",
    name: "Chicken Butter Masala",
    category: "Chef's Signature",
    price: 270,
  },
  {
    id: "main-mutton-rogan",
    name: "Mutton Rogan Josh",
    category: "Bengali Classics",
    price: 430,
  },
  {
    id: "main-fish-bhetki",
    name: "Bhetki Fish Curry",
    category: "Bengali Classics",
    price: 240,
  },
  {
    id: "carb-veg-fried-rice",
    name: "Veg Fried Rice",
    category: "Rice & Noodles",
    price: 150,
  },
  {
    id: "carb-chicken-fried-rice",
    name: "Chicken Fried Rice",
    category: "Rice & Noodles",
    price: 185,
  },
  {
    id: "carb-veg-hakka",
    name: "Veg Hakka Noodles",
    category: "Rice & Noodles",
    price: 160,
  },
  {
    id: "carb-chicken-hakka",
    name: "Chicken Hakka Noodles",
    category: "Rice & Noodles",
    price: 190,
  },
  {
    id: "dessert-ice-cream",
    name: "Ice Cream Scoop",
    category: "Desserts",
    price: 60,
  },
  {
    id: "dessert-gulab-jamun",
    name: "Hot Gulab Jamun",
    category: "Desserts",
    price: 20,
  },
  {
    id: "beverage-fresh-lime",
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 60,
  },
  {
    id: "beverage-masala-fizz",
    name: "Masala Cold Drink",
    category: "Beverages",
    price: 65,
  },
  {
    id: "bread-tandoori-roti",
    name: "Tandoori Roti",
    category: "Breads",
    price: 30,
  },
  {
    id: "bread-butter-naan",
    name: "Butter Naan",
    category: "Breads",
    price: 50,
  },
  {
    id: "bread-garlic-naan",
    name: "Garlic Naan",
    category: "Breads",
    price: 60,
  },
  {
    id: "starter-chicken-tikka",
    name: "Chicken Tikka",
    category: "Starters",
    price: 295,
  },
  {
    id: "starter-paneer-tikka",
    name: "Paneer Tikka",
    category: "Starters",
    price: 280,
  },
  {
    id: "starter-chicken-resmi",
    name: "Chicken Reshmi Kabab",
    category: "Starters",
    price: 320,
  },
];

export const ORDERABLE_MENU_GROUPS = ORDERABLE_MENU_ITEMS.reduce<
  Record<string, OrderableMenuItem[]>
>((groups, item) => {
  if (!groups[item.category]) {
    groups[item.category] = [];
  }
  groups[item.category].push(item);
  return groups;
}, {});

export const ORDERABLE_MENU_MAP = ORDERABLE_MENU_ITEMS.reduce<
  Record<string, OrderableMenuItem>
>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
