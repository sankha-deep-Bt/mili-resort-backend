import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const images = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
  "/hero6.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          exit={{ clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      {/* Static overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest uppercase mb-6"
        >
          MILI RESORTS
          <br />
          <span className="font-bold text-2xl md:text-4xl lg:text-5xl mt-4 block">
            Where Comfort Meets Nature
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl font-serif italic mb-8 max-w-2xl"
        >
          Experience tranquility in the heart of Basnala, Mukutmanipur. Your
          perfect escape awaits.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link to="/rooms">
            <button className="px-8 py-4 border-2 border-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              Explore Rooms
            </button>
          </Link>

          <Link to="/gallery">
            <button className="px-8 py-4 bg-primary border-2 border-primary text-white text-xs font-bold tracking-widest hover:bg-primary/80 transition-colors uppercase">
              View Gallery
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
