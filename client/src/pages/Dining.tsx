import Navbar from "../components/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../components/ui/scroll-area";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";
import { Button } from "../components/ui/button";

import {
  ORDERABLE_MENU_ITEMS,
  type OrderableMenuItem,
} from "../data/orderableMenu";

const categoryImages: Record<string, string> = {
  Soups:
    "https://images.unsplash.com/photo-1547592166-23acbe3b624b?q=80&w=2070",
  "Chef's Signature":
    "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2070",
  "Bengali Classics":
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070",
  "Rice & Noodles":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070",
  Desserts:
    "https://images.unsplash.com/photo-1551024601-5637ade98e30?q=80&w=2070",
  Beverages:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=2070",
  Breads:
    "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=2070",
  Starters:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070",
};

const groupByCategory = (items: OrderableMenuItem[]) =>
  items.reduce<Record<string, OrderableMenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

export default function Dining() {
  const grouped = useMemo(() => groupByCategory(ORDERABLE_MENU_ITEMS), []);

  const categories = Object.keys(grouped);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [categories.length]);

  if (!categories.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No menu items found.
      </div>
    );
  }

  const categoryName = categories[currentIndex];
  const currentItems = grouped[categoryName] || [];
  const background = categoryImages[categoryName] ?? "";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-serif">
      <Navbar />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: background ? `url(${background})` : undefined,
            }}
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-screen flex-col pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/3 space-y-8 text-center lg:text-left">
            <motion.div
              key={`heading-${currentIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3 text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
                <span className="tracking-[0.35em] uppercase text-xs font-bold">
                  Category {currentIndex + 1} / {categories.length}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-light tracking-tight">
                {categoryName}
              </h1>
            </motion.div>

            <div className="flex items-center justify-center lg:justify-start gap-5 pt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-14 w-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-14 w-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-2/3 h-[55vh] lg:h-[70vh]">
            <motion.div
              key={`menu-${currentIndex}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 shadow-2xl"
            >
              <ScrollArea className="h-full pr-6">
                <div className="space-y-6">
                  {currentItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="group flex justify-between items-baseline border-b border-white/10 pb-4 last:border-none"
                    >
                      <div>
                        <p className="text-lg md:text-xl text-white/90 group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block w-10 h-px bg-white/20 group-hover:w-16 group-hover:bg-amber-400 transition-all" />
                        <p className="text-lg md:text-xl font-light text-white/80">
                          ₹{item.price}
                        </p>
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
