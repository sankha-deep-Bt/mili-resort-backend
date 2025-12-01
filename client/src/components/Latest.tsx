import { motion } from "framer-motion";

const galleryImages = [
  "https://harmless-tapir-303.convex.cloud/api/storage/95a0a177-bd01-472f-b743-c78ccff37022",
  "https://harmless-tapir-303.convex.cloud/api/storage/db58acc9-b84c-4fde-a7cb-dadeeea90796",
  "https://harmless-tapir-303.convex.cloud/api/storage/a7c589b3-f774-47c9-b925-a5229f739f8a",
  "https://harmless-tapir-303.convex.cloud/api/storage/0072011c-5c1a-4098-b91d-7110efb3b494",
  "https://harmless-tapir-303.convex.cloud/api/storage/ec7ea7c6-db58-48d3-84bd-df999b692b0d",
  "https://harmless-tapir-303.convex.cloud/api/storage/b029f707-65d8-4cf2-8ed9-50445908b347",
  "https://harmless-tapir-303.convex.cloud/api/storage/f306b404-0426-46f6-b101-5903dad6c97d",
  "https://harmless-tapir-303.convex.cloud/api/storage/60257acb-136e-4f4c-a397-e1db8cf8da04",
  "https://harmless-tapir-303.convex.cloud/api/storage/cb4af125-ee18-4f56-bf4b-d908e5a64c5e",
  "https://harmless-tapir-303.convex.cloud/api/storage/0ffe9e0a-d036-495e-b20b-918df6d9df18",
];

export default function Latest() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-12 max-w-[83.75rem]">
        <div className="text-center mb-14 space-y-4">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.5em]">
            Resort Gallery
          </p>
          <h4 className="text-3xl md:text-4xl font-light uppercase tracking-widest">
            Fresh Moments from Mukutmanipur
          </h4>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            A glimpse of celebrations, tranquil evenings, and the vibrant
            grounds that make Mili Resort the pride of Mukutmanipur.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="aspect-square overflow-hidden rounded-2xl bg-black/5"
            >
              <img
                src={src}
                alt={`Mili's Resort gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
