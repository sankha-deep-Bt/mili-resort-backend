// import { ORDERABLE_MENU_GROUPS } from "../../data/orderableMenu"; // Assuming these imports are available
// import { Button } from "../ui/button";
// import { motion } from "framer-motion";
// import { Checkbox } from "../ui/checkbox";
// import { useState } from "react";

// // --- MOCK DATA (to make the file runnable) ---
// interface MenuItem {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
// }

// // NOTE: In a real application, this data would come from the imported module.
// const SECTION_DESCRIPTIONS: Record<string, string> = {
//   Soups:
//     "Hand-beaten broths simmered with peppercorn, ginger, and smoky chilli oil.",
//   "Chef's Signature": "Wok-tossed favourites inspired by Tangra lanes.",
//   "Bengali Classics": "Heritage recipes finished in cast-iron dekchis.",
//   "Rice & Noodles": "Steamed in brass haandis for the perfect grain.",
//   Desserts: "Sweet endings with nostalgia.",
//   Beverages: "Refreshing coolers & bottled fizz.",
// };

// const MOCK_ORDERABLE_MENU_GROUPS: Record<string, MenuItem[]> = {
//   Soups: [
//     {
//       id: "soup1",
//       name: "Tomato Dhonia Shorba",
//       price: 180,
//       category: "Soups",
//     },
//     {
//       id: "soup2",
//       name: "Gondhoraj Chicken Clear Soup",
//       price: 250,
//       category: "Soups",
//     },
//   ],
//   "Bengali Classics": [
//     {
//       id: "classic1",
//       name: "Luchi & Kosha Mangsho",
//       price: 650,
//       category: "Bengali Classics",
//     },
//     {
//       id: "classic2",
//       name: "Bhapa Ilish (Steamed Hilsa)",
//       price: 990,
//       category: "Bengali Classics",
//     },
//     {
//       id: "classic3",
//       name: "Aloo Posto (Poppy Seed Potato)",
//       price: 420,
//       category: "Bengali Classics",
//     },
//   ],
//   Desserts: [
//     { id: "dessert1", name: "Mishti Doi", price: 150, category: "Desserts" },
//     {
//       id: "dessert2",
//       name: "Nolen Gur Ice Cream",
//       price: 200,
//       category: "Desserts",
//     },
//   ],
// };
// // ---------------------------------------------

// const Menu = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
//   // State to hold selected food items
//   const [foodSelections, setFoodSelections] = useState<
//     Record<string, MenuItem>
//   >({});

//   // Function to handle checking/unchecking a food item
//   const handleFoodToggle = (itemId: string) => {
//     const item = MOCK_ORDERABLE_MENU_GROUPS[
//       Object.keys(MOCK_ORDERABLE_MENU_GROUPS).find((key) =>
//         MOCK_ORDERABLE_MENU_GROUPS[key].some((i) => i.id === itemId)
//       ) || ""
//     ]?.find((i) => i.id === itemId);

//     if (!item) return;

//     setFoodSelections((prevSelections) => {
//       if (prevSelections[itemId]) {
//         // Remove item if already selected
//         const { [itemId]: removed, ...rest } = prevSelections;
//         return rest;
//       } else {
//         // Add item if not selected
//         return {
//           ...prevSelections,
//           [itemId]: item,
//         };
//       }
//     });
//   };

//   // Use mock data for iteration since actual imports are not available here
//   const menuGroups = MOCK_ORDERABLE_MENU_GROUPS;

//   return (
//     <div className="py-12">
//       <div className="space-y-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center space-y-3"
//         >
//           <p className="text-xs uppercase tracking-[0.6em] text-primary/80">
//             Food & Beverages
//           </p>
//           <h2 className="text-3xl font-serif text-stone-900">
//             Bengali authentic restaurant menu
//           </h2>
//           <p className="text-stone-500 max-w-3xl mx-auto">
//             Curated by our Mukutmanipur chefs, each section pays homage to
//             Kolkata club favourites, Tangra-Chinese nostalgia, and heirloom
//             family recipes. Select items to add to your booking.
//           </p>
//         </motion.div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {Object.entries(menuGroups).map(([category, items], index) => (
//             <motion.section
//               key={category}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ delay: index * 0.03 }}
//               className="relative overflow-hidden rounded-3xl border border-amber-100/60 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
//             >
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_55%)] opacity-70" />
//               <div className="relative space-y-6">
//                 <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-200/60 pb-4">
//                   <div>
//                     <p className="text-[0.65rem] uppercase tracking-[0.5em] text-amber-500/70">
//                       Heritage Kitchen
//                     </p>
//                     <h3 className="text-xl font-semibold text-stone-900">
//                       {category}
//                     </h3>
//                     <p className="text-sm text-stone-600">
//                       {SECTION_DESCRIPTIONS[category] ||
//                         "Authentic delicacies."}
//                     </p>
//                   </div>
//                   <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
//                     Since 1998
//                   </span>
//                 </div>
//                 <ul className="space-y-3">
//                   {items.map((item) => (
//                     <li
//                       key={item.id}
//                       className="flex items-center justify-between gap-4 border-b border-amber-100/60 pb-3 last:border-b-0 last:pb-0"
//                     >
//                       <div className="flex items-center gap-3">
//                         <Checkbox
//                           id={item.id}
//                           checked={!!foodSelections[item.id]}
//                           onCheckedChange={() => handleFoodToggle(item.id)}
//                           className="border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
//                         />
//                         <label
//                           htmlFor={item.id}
//                           className="font-medium text-stone-800 cursor-pointer select-none"
//                         >
//                           {item.name}
//                         </label>
//                       </div>
//                       <span className="text-primary font-semibold">
//                         ₹{item.price.toLocaleString("en-IN")}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.section>
//           ))}
//         </div>

//         {/* Fixed "Proceed to Booking" button */}
//         {Object.keys(foodSelections).length > 0 && (
//           <div className="fixed bottom-6 right-6 z-50">
//             <Button
//               onClick={() => setActiveTab("overview")} // Use the prop function
//               className="shadow-xl bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg animate-in slide-in-from-bottom-4 transition duration-300"
//             >
//               Proceed to Booking ({Object.keys(foodSelections).length} items
//               selected)
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Menu;
import { ORDERABLE_MENU_GROUPS } from "../../data/orderableMenu"; // Assuming these imports are available
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

// --- MOCK DATA (to make the file runnable) ---
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

// NOTE: In a real application, this data would come from the imported module.
const SECTION_DESCRIPTIONS: Record<string, string> = {
  Soups:
    "Hand-beaten broths simmered with peppercorn, ginger, and smoky chilli oil.",
  "Chef's Signature": "Wok-tossed favourites inspired by Tangra lanes.",
  "Bengali Classics": "Heritage recipes finished in cast-iron dekchis.",
  "Rice & Noodles": "Steamed in brass haandis for the perfect grain.",
  Desserts: "Sweet endings with nostalgia.",
  Beverages: "Refreshing coolers & bottled fizz.",
};

const MOCK_ORDERABLE_MENU_GROUPS: Record<string, MenuItem[]> = {
  Soups: [
    {
      id: "soup1",
      name: "Tomato Dhonia Shorba",
      price: 180,
      category: "Soups",
    },
    {
      id: "soup2",
      name: "Gondhoraj Chicken Clear Soup",
      price: 250,
      category: "Soups",
    },
  ],
  "Bengali Classics": [
    {
      id: "classic1",
      name: "Luchi & Kosha Mangsho",
      price: 650,
      category: "Bengali Classics",
    },
    {
      id: "classic2",
      name: "Bhapa Ilish (Steamed Hilsa)",
      price: 990,
      category: "Bengali Classics",
    },
    {
      id: "classic3",
      name: "Aloo Posto (Poppy Seed Potato)",
      price: 420,
      category: "Bengali Classics",
    },
  ],
  Desserts: [
    { id: "dessert1", name: "Mishti Doi", price: 150, category: "Desserts" },
    {
      id: "dessert2",
      name: "Nolen Gur Ice Cream",
      price: 200,
      category: "Desserts",
    },
  ],
};
// ---------------------------------------------

const Menu = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  // State to hold selected food items
  const [foodSelections, setFoodSelections] = useState<
    Record<string, MenuItem>
  >({});

  // Function to handle checking/unchecking a food item
  const handleFoodToggle = (itemId: string) => {
    const item = MOCK_ORDERABLE_MENU_GROUPS[
      Object.keys(MOCK_ORDERABLE_MENU_GROUPS).find((key) =>
        MOCK_ORDERABLE_MENU_GROUPS[key].some((i) => i.id === itemId)
      ) || ""
    ]?.find((i) => i.id === itemId);

    if (!item) return;

    setFoodSelections((prevSelections) => {
      if (prevSelections[itemId]) {
        // Remove item if already selected
        const { [itemId]: removed, ...rest } = prevSelections;
        return rest;
      } else {
        // Add item if not selected
        return {
          ...prevSelections,
          [itemId]: item,
        };
      }
    });
  };

  // Use mock data for iteration since actual imports are not available here
  // const menuGroups = MOCK_ORDERABLE_MENU_GROUPS;

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <p className="text-xs uppercase tracking-[0.6em] text-primary/80">
          Food & Beverages
        </p>
        <h2 className="text-3xl font-serif text-stone-900">
          Bengali authentic restaurant menu
        </h2>
        <p className="text-stone-500 max-w-3xl mx-auto">
          Curated by our Mukutmanipur chefs, each section pays homage to Kolkata
          club favourites, Tangra-Chinese nostalgia, and heirloom family
          recipes. Select items to add to your booking.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(ORDERABLE_MENU_GROUPS).map(
          ([category, items], index) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.03 }}
              className="relative overflow-hidden rounded-3xl border border-amber-100/60 bg-linear-to-br from-amber-50 via-white to-rose-50 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_55%)] opacity-70" />
              <div className="relative space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-200/60 pb-4">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.5em] text-amber-500/70">
                      Heritage Kitchen
                    </p>
                    <h3 className="text-xl font-semibold text-stone-900">
                      {category}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {SECTION_DESCRIPTIONS[category] ||
                        "Authentic delicacies."}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                    Since 1998
                  </span>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 border-b border-amber-100/60 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={item.id}
                          checked={!!foodSelections[item.id]}
                          onCheckedChange={() => handleFoodToggle(item.id)}
                          className="border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor={item.id}
                          className="font-medium text-stone-800 cursor-pointer select-none"
                        >
                          {item.name}
                        </label>
                      </div>
                      <span className="text-primary font-semibold">
                        ₹{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )
        )}
      </div>
      {Object.keys(foodSelections).length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setActiveTab("overview")}
            className="shadow-xl bg-primary text-white rounded-full px-8 py-6 text-lg animate-in slide-in-from-bottom-4"
          >
            Proceed to Booking ({Object.keys(foodSelections).length} items)
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
