import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const villas = [
  {
    name: "Ground Floor Deluxe Room",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/595b9948-f517-4407-bec4-488fe0266a5b",
  },
  {
    name: "First Floor Super Deluxe Room",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/89f4a0d1-4505-4bf7-9c06-f445bb2e93a4",
  },
  {
    name: "Ground Floor Cottage Room Double bed",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/6546e674-a31b-4cd0-920c-ca8d3300081b",
  },
  {
    name: "Ground Floor Cottage Room 4 beded",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/594daab9-4f31-4193-83e9-93b452d634ad",
  },
  {
    name: "Ground Floor Standard Room",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/9333e614-1155-4f90-be8b-1e2c47685e97",
  },
  {
    name: "1st floor & 2nd floor Standard ac Double Bed Room",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/19c1e9be-8454-4a15-981b-598bfe66a02c",
  },
  {
    name: "1st floor & 2nd floor Standard ac 4 Beded Room",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/4b39fa3d-f2b1-4cc1-90cc-b3e9720415f5",
  },
];

export default function Villas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate items for infinite scroll effect
  const extendedVillas = [...villas, ...villas];

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
    if (currentIndex >= villas.length) return;
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
    if (currentIndex >= villas.length) {
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
              {extendedVillas.map((villa, index) => (
                <div
                  key={index}
                  className="shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="group relative h-[28rem] overflow-hidden cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${villa.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="border-t-2 border-white/60 pt-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase leading-relaxed">
                          {villa.name}
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
            href="#"
            className="inline-block px-10 py-5 border-2 rounded-full border-zinc-700 text-zinc-700 text-xs font-bold tracking-widest uppercase hover:bg-zinc-700 hover:text-white transition-colors"
          >
            Explore All Villas
          </a>
        </div>
      </div>
    </section>
  );
}
