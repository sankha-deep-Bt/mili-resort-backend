import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function Villas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms",
        {
          withCredentials: true,
        }
      );

      // IMPORTANT FIX
      setRooms(Array.isArray(res.data.rooms) ? res.data.rooms : []);
    } catch (err) {
      console.error("Room fetch error:", err);
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Duplicate items for infinite scroll effect
  const extendedRooms = [...rooms, ...rooms];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex >= rooms.length) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, itemsToShow]);

  const handleTransitionEnd = () => {
    if (currentIndex >= rooms.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      // Force reflow/re-enable transition in next tick
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  };

  return (
    <section className="pb-24 bg-stone-50 overflow-hidden mt-7">
      <div className="container mx-auto px-4 md:px-12 max-w-[83.75rem]">
        <div className="relative">
          <div className="overflow-hidden -mx-4">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (100 / itemsToShow)}%`,
              }}
              transition={{
                duration: isTransitioning ? 0.5 : 0,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleTransitionEnd}
            >
              {extendedRooms.map((room, index) => (
                <div
                  key={index}
                  className="shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="group relative h-[28rem] overflow-hidden cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${room?.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="border-t-2 border-white/60 pt-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase leading-relaxed">
                          {room.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors hidden md:flex"
          >
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </button>
        </div>

        <div className="text-center mt-16">
          <a
            href="/rooms"
            className="inline-block px-10 py-5 border-2 rounded-full border-zinc-700 text-zinc-700 text-xs font-bold tracking-widest uppercase hover:bg-zinc-700 hover:text-white transition-colors"
          >
            Explore All Rooms
          </a>
        </div>
      </div>
    </section>
  );
}
