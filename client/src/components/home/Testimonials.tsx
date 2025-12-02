import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ananya Sen",
    city: "Kolkata, West Bengal",
    stay: "Family Getaway",
    quote:
      "Mili's Resort felt like a private estate in Mukutmanipur. The staff pampered my parents while the kids lived in the pool—pure joy!",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/57d140d8-8886-4d1c-a238-d4b2a6eefc32",
  },
  {
    name: "Pradip & Mou Banerjee",
    city: "Howrah, West Bengal",
    stay: "Anniversary Escape",
    quote:
      "We wanted something close to Kolkata yet magical. The moonlit dinners and the gardens made our anniversary unforgettable.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/9c67b8fd-b83c-486d-8354-89e49e07fa16",
  },
  {
    name: "Ritwika Mukherjee",
    city: "Asansol, West Bengal",
    stay: "Solo Weekend",
    quote:
      "Quiet library corners, rainforest-like views, and filter coffee delivered with a smile—this is the Mukutmanipur retreat I keep coming back to.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/1f421219-4bb7-4a65-bb7d-ed669df73487",
  },
  {
    name: "Subhajit Chatterjee",
    city: "Durgapur, West Bengal",
    stay: "Workation",
    quote:
      "Super-fast Wi-Fi by the pool, spotless rooms, and the team anticipating every need—Mili's Resort redefined productive relaxation.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/45697ae2-8d03-4661-a3c2-e5dd9625814a",
  },
  {
    name: "Labonno Das",
    city: "Siliguri, West Bengal",
    stay: "Friends Reunion",
    quote:
      "From folk music nights to chef's special moa desserts, every detail celebrated Bengal. We're already planning our Durga Puja stay here.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/b750a902-902c-42de-935c-0c8e784f0f86",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[activeIndex];

  const goTo = (delta: number) => {
    setActiveIndex(
      (prev) => (prev + delta + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 max-w-[83.75rem]">
        <div className="text-center mb-14 space-y-4">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.5em]">
            West Bengal Voices
          </p>
          <h4 className="text-3xl md:text-4xl font-light uppercase tracking-widest">
            Bengali Guests on Mili Resorts
          </h4>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            "Absolute perfection. The service, the décor, the food, the villas,
            the view, the staff, the everything." These heartfelt Mukutmanipur
            stories keep us inspired every single day.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="relative w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.image}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-contain bg-black"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/40 pointer-events-none" />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-primary text-primary"
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentTestimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-serif italic text-zinc-700 leading-relaxed"
              >
                "{currentTestimonial.quote}"
              </motion.blockquote>
            </AnimatePresence>

            <div>
              <p className="text-lg font-semibold text-zinc-900">
                {currentTestimonial.name}
              </p>
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mt-1">
                {currentTestimonial.city} • {currentTestimonial.stay}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(-1)}
                className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(1)}
                className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex-1 flex flex-wrap gap-2 justify-end">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    onClick={() => setActiveIndex(index)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
                      index === activeIndex
                        ? "bg-primary text-white"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                  >
                    {testimonial.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
