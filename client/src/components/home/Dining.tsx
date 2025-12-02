import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";
import { Button } from "../ui/button";

const menuCategories = [
  {
    category: "Soups & Salads",
    image:
      "https://images.unsplash.com/photo-1547592166-23acbe3b624b?q=80&w=2070",
    description:
      "Light, refreshing beginnings featuring organic greens and comforting broths.",
    items: [
      { name: "Hot n Sour Soup (Veg/Chicken)", price: "₹110/130" },
      { name: "Manchow Soup (Veg/Chicken)", price: "₹110/135" },
      { name: "Clear Soup (Veg/Chicken)", price: "₹90/125" },
      { name: "Sweet Corn Soup (Veg/Chicken)", price: "₹120/140" },
      { name: "Fresh Green Salad", price: "₹80" },
      { name: "Onion Salad", price: "₹65" },
      { name: "Cucumber Salad", price: "₹70" },
    ],
  },
  {
    category: "Chinese Specialties",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2070",
    description:
      "Authentic wok-tossed favorites bringing the flavors of Tangra to your table.",
    items: [
      { name: "Mushroom in Chilli Sauce", price: "₹270" },
      { name: "Garlic Chicken", price: "₹280" },
      { name: "Garlic Fish", price: "₹310" },
      { name: "Paneer in Hot Garlic Sauce", price: "₹285" },
      { name: "Chicken in Hot Garlic Sauce", price: "₹280" },
      { name: "Dice Chicken in Lemon Sauce", price: "₹280" },
      { name: "Lemon Chicken", price: "₹290" },
      { name: "Lemon Fish", price: "₹320" },
    ],
  },
  {
    category: "Rice & Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070",
    description:
      "Aromatic basmati preparations, from royal biryanis to comforting pulaos.",
    items: [
      { name: "Steamed Rice", price: "₹45" },
      { name: "Basmati Rice", price: "₹90" },
      { name: "Ghee Rice", price: "₹120" },
      { name: "Jeera Rice", price: "₹140" },
      { name: "Vegetable Pulao", price: "₹160" },
      { name: "Kashmiri Pulao", price: "₹250" },
      { name: "Vegetable Biryani", price: "₹160" },
      { name: "Basanti Pulao", price: "₹300", highlight: true },
      { name: "Chicken Biryani", price: "₹195" },
      { name: "Mutton Biryani", price: "₹320" },
    ],
  },
  {
    category: "Indian Main Course (Veg)",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2070",
    description:
      "Rich, slow-cooked vegetarian delicacies spiced to perfection.",
    items: [
      { name: "Dal Fry", price: "₹80" },
      { name: "Dal Tadka", price: "₹100" },
      { name: "Dal Makhani", price: "₹160" },
      { name: "Aloo Jeera", price: "₹145" },
      { name: "Dhokar Dalna", price: "₹160", highlight: true },
      { name: "Methi Matar Malai", price: "₹225" },
      { name: "Mix Vegetable", price: "₹170" },
      { name: "Veg Jalfrezi", price: "₹180" },
      { name: "Chana Masala", price: "₹140" },
      { name: "Kashmiri Dum Aloo", price: "₹150" },
      { name: "Fulgobi Mahima", price: "₹170" },
      { name: "Navaratna Korma", price: "₹200" },
      { name: "Mushroom Matar Masala", price: "₹230" },
      { name: "Paneer Butter Masala", price: "₹240" },
      { name: "Matar Paneer", price: "₹210" },
      { name: "Paneer Kadhai", price: "₹230" },
      { name: "Shahi Paneer", price: "₹280" },
      { name: "Paneer Tikka Masala", price: "₹250" },
      { name: "Posto Bora", price: "₹90", highlight: true },
      { name: "Aloo Posto", price: "₹155", highlight: true },
      { name: "Shukto", price: "₹150", highlight: true },
      { name: "Lau Chingri", price: "₹220", highlight: true },
    ],
  },
  {
    category: "Indian Main Course (Non-Veg)",
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070",
    description:
      "Succulent meats and fresh catch cooked in traditional gravies.",
    items: [
      { name: "Chicken Kadhai", price: "₹220" },
      { name: "Chicken Do Pyaza", price: "₹200" },
      { name: "Chicken Kassa", price: "₹185" },
      { name: "Chicken Curry", price: "₹170" },
      { name: "Chicken Bharta", price: "₹260" },
      { name: "Chicken Masala", price: "₹220" },
      { name: "Chicken Tikka Masala", price: "₹250" },
      { name: "Chicken Butter Masala", price: "₹270" },
      { name: "Chicken Reshmi Masala", price: "₹280" },
      { name: "Mutton Curry", price: "₹399" },
      { name: "Mutton Kassa", price: "₹399" },
      { name: "Mutton Do Pyaza", price: "₹399" },
      { name: "Mutton Kadhai", price: "₹410" },
      { name: "Mutton Rogan Josh", price: "₹430" },
      {
        name: "Fish Curry (Bengali Style) 1pc",
        price: "₹140",
        highlight: true,
      },
      { name: "Fish Curry (Bhetki) 2pcs", price: "₹240" },
      { name: "Chara Pona Sorse", price: "₹120", highlight: true },
      { name: "Hilsa Bhapa (1pc)", price: "As per size", highlight: true },
      { name: "Hilsa Sarse (1pc)", price: "As per size", highlight: true },
      {
        name: "Hilsa Begun-er Tel Jhol (1pc)",
        price: "As per size",
        highlight: true,
      },
      { name: "Pomfret Jhal (1pc)", price: "As per size" },
      {
        name: "Prawn Malai Curry (2pcs)",
        price: "As per size",
        highlight: true,
      },
      { name: "Prawn Butter Masala (2pcs)", price: "As per size" },
    ],
  },
  {
    category: "Egg Specials",
    image:
      "https://images.unsplash.com/photo-1587486913049-53fc88980fa1?q=80&w=2070",
    description: "Classic egg preparations for a hearty addition to your meal.",
    items: [
      { name: "Egg Curry – Double Egg", price: "₹90" },
      { name: "Egg Masala – Double Egg", price: "₹130" },
      { name: "Egg Omelette – Double Egg", price: "₹50" },
      { name: "Egg Bhujia – Double Egg", price: "₹80" },
    ],
  },
  {
    category: "Indian Breads",
    image:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=2070",
    description: "Freshly baked tandoori breads and soft rotis.",
    items: [
      { name: "Plain Tawa Roti", price: "₹10" },
      { name: "Butter Tawa Roti", price: "₹15" },
      { name: "Tandoori Roti", price: "₹30" },
      { name: "Butter Tandoori Roti", price: "₹40" },
      { name: "Plain Naan", price: "₹40" },
      { name: "Butter Naan", price: "₹50" },
      { name: "Garlic Naan", price: "₹60" },
      { name: "Cheese Chilli Garlic Naan", price: "₹85" },
      { name: "Masala Kulcha", price: "₹70" },
    ],
  },
  {
    category: "Appetizers & Starters",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070",
    description:
      "Crispy, savory bites perfect for starting your culinary journey.",
    items: [
      { name: "French Fries", price: "₹130" },
      { name: "Green Peas Dry (Veg/Non-Veg)", price: "₹130/170" },
      { name: "Corn Butter Fry", price: "₹170" },
      { name: "Salted Peanuts", price: "₹60" },
      { name: "Peanuts Masala", price: "₹120" },
      { name: "Veg Pakora (6 pcs)", price: "₹120" },
      { name: "Paneer Pakora (6 pcs)", price: "₹180" },
      { name: "Chicken Pakora (6 pcs)", price: "₹195" },
      { name: "Fish Finger (6 pcs)", price: "₹225" },
      { name: "Pomfret Fry", price: "As per size" },
      { name: "Fish Fry (Rui/Katla) 1 pc", price: "₹130", highlight: true },
      { name: "Honey Chilli Potato", price: "₹150" },
      { name: "Mushroom Salt n Pepper", price: "₹220" },
      { name: "Crispy Chilli Babycorn", price: "₹230" },
      { name: "Crispy Chilli Mushroom", price: "₹230" },
      { name: "Veg Manchurian (Full/Half)", price: "₹170/110" },
      { name: "Paneer Chilli (Full/Half)", price: "₹250/140" },
      { name: "Schezwan Paneer", price: "₹260" },
      { name: "Paneer 65", price: "₹255" },
      { name: "Kung Pao Chicken", price: "₹190" },
      { name: "Chicken Chilli Dry (Full/Half)", price: "₹240/140" },
      { name: "Chicken Manchurian (Full/Half)", price: "₹260/145" },
      { name: "Chicken Salt n Pepper", price: "₹245" },
      { name: "Chicken 65", price: "₹250" },
      { name: "Schezwan Chicken", price: "₹260" },
      { name: "Chicken Lollipop (6 pcs)", price: "₹280" },
      { name: "Chicken Crispy", price: "₹270" },
      { name: "Drums of Heaven (6 pcs)", price: "₹285" },
      { name: "Fish Chilli", price: "₹290" },
      { name: "Prawns Chilli", price: "₹350" },
      { name: "Schezwan Fish", price: "₹295" },
      { name: "Golden Fry Prawns", price: "₹400" },
      { name: "Hot Garlic Prawns", price: "₹400" },
    ],
  },
  {
    category: "Tandoori Starters",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070",
    description: "Smoky, clay-oven grilled kebabs marinated in exotic spices.",
    items: [
      { name: "Paneer Tikka", price: "₹280" },
      { name: "Tandoori Aloo", price: "₹170" },
      { name: "Paneer Ajwain Tikka", price: "₹290" },
      { name: "Chicken Tikka", price: "₹295" },
      { name: "Chicken Reshmi Kabab", price: "₹320" },
      { name: "Chicken Tandoori (Half/Full)", price: "₹250/400" },
      { name: "Chicken Malai Tikka", price: "₹300" },
      { name: "Chicken Hariyali Tikka", price: "₹320" },
      { name: "Chicken Achari Kabab", price: "₹320" },
      { name: "Chicken Seekh Kabab", price: "₹350" },
      { name: "Chicken Lasooni Tikka", price: "₹320" },
      { name: "Fish Tikka", price: "₹350" },
      { name: "Ajwain Fish Tikka", price: "₹320" },
      { name: "Pomfret Tandoori", price: "As per size" },
    ],
  },
  {
    category: "Chinese Rice & Noodles",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2070",
    description:
      "Staple Asian sides, wok-tossed with fresh vegetables and meats.",
    items: [
      { name: "Veg Fried Rice", price: "₹150" },
      { name: "Egg Fried Rice", price: "₹160" },
      { name: "Chicken Fried Rice", price: "₹185" },
      { name: "Mixed Fried Rice", price: "₹280" },
      { name: "Veg Hakka Noodles", price: "₹160" },
      { name: "Egg Hakka Noodles", price: "₹170" },
      { name: "Chicken Hakka Noodles", price: "₹190" },
      { name: "Mix Hakka Noodles", price: "₹250" },
      {
        name: "Chilli Garlic Fried Rice (Veg/Egg/Chicken/Mix)",
        price: "₹170/190/230/255",
      },
      {
        name: "Chilli Garlic Noodles (Veg/Egg/Chicken/Mix)",
        price: "₹180/190/230/280",
      },
    ],
  },
  {
    category: "Accompaniments & Desserts",
    image:
      "https://images.unsplash.com/photo-1551024601-5637ade98e30?q=80&w=2070",
    description: "The perfect sides and sweet endings to complete your feast.",
    items: [
      { name: "Roasted Papad", price: "₹20" },
      { name: "Fried Papad", price: "₹30" },
      { name: "Masala Papad", price: "₹40" },
      { name: "Mixed Raita", price: "₹60" },
      { name: "Pineapple Raita", price: "₹70" },
      { name: "Plain Curd", price: "₹50" },
      { name: "Ice Cream", price: "₹60" },
      { name: "Ice Cream with Hot Chocolate Sauce", price: "₹90" },
      { name: "Hot Gulab Jamun", price: "₹20" },
    ],
  },
  {
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=2070",
    description: "Refreshing drinks to quench your thirst.",
    items: [
      { name: "Hot Coffee", price: "₹40" },
      { name: "Milk Tea", price: "₹25" },
      { name: "Bottled Water", price: "₹25" },
      { name: "Cold Drinks (300ml)", price: "₹45" },
      { name: "Cold Drinks (750ml)", price: "₹75" },
      { name: "Masala Cold Drink", price: "₹65" },
      { name: "Juice Glass", price: "₹70" },
      { name: "Fresh Lime Soda", price: "₹60" },
      { name: "Fresh Lime Water", price: "₹50" },
    ],
  },
];

export default function Dining() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % menuCategories.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + menuCategories.length) % menuCategories.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentCategory = menuCategories[currentIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-serif">
      <Navbar />

      {/* Background Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentCategory.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-screen flex-col pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side: Category Info */}
          <div className="w-full lg:w-1/3 space-y-8 text-center lg:text-left">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
                <span className="text-xs uppercase tracking-[0.4em] font-sans font-bold">
                  Course {currentIndex + 1} of {menuCategories.length}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-white">
                {currentCategory.category}
              </h1>
              <p className="text-lg text-white/80 italic font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                {currentCategory.description}
              </p>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-14 w-14 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-14 w-14 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Right Side: Menu Items */}
          <div className="w-full lg:w-2/3 h-[50vh] lg:h-[70vh]">
            <motion.div
              key={`menu-${currentIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-full w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 shadow-2xl"
            >
              <ScrollArea className="h-full pr-6">
                <div className="space-y-6">
                  {currentCategory.items.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className="group flex items-baseline justify-between border-b border-white/10 pb-4 last:border-0 hover:border-amber-400/50 transition-colors duration-300"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-lg md:text-xl font-medium tracking-wide ${
                              item.highlight
                                ? "text-amber-400"
                                : "text-white/90"
                            } group-hover:text-amber-300 transition-colors`}
                          >
                            {item.name}
                          </span>
                          {item.highlight && (
                            <Badge
                              variant="secondary"
                              className="bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border-0 text-[0.6rem] tracking-widest uppercase"
                            >
                              Signature
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="h-px w-8 bg-white/20 hidden sm:block group-hover:w-16 group-hover:bg-amber-400/50 transition-all duration-500" />
                        <span className="text-lg md:text-xl font-light text-white/80 font-sans">
                          {item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
