import { motion } from "framer-motion";
import { GALLERY_SHOWCASE } from "../data/galleryShowcase";

export default function GalleryPreview() {
  // Duplicate items to match the 10-item grid in the screenshot (2 rows of 5)
  const displayItems = [...GALLERY_SHOWCASE, ...GALLERY_SHOWCASE].slice(0, 10);

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://harmless-tapir-303.convex.cloud/api/storage/2597a725-9531-47ea-9f8d-37d8b7d35820')",
        }}
      />
      <div className="container mx-auto px-4 md:px-8 max-w-360 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Resort Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light uppercase tracking-widest text-stone-800"
          >
            Fresh Moments from Mukutmanipur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
          >
            A glimpse of celebrations, tranquil evenings, and the vibrant
            grounds that make Mili Resort the pride of Mukutmanipur.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/gallery"
            className="inline-block px-10 py-4 border border-stone-300 text-stone-600 uppercase tracking-[0.2em] text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded-full"
          >
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
