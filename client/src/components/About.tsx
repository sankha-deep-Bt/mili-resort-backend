import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row min-h-[80vh]">
      <div
        className="w-full md:w-[70%] bg-[url('https://harmless-tapir-303.convex.cloud/api/storage/e0f11dea-48ab-4a48-942e-45bb265fdece')] bg-cover bg-center min-h-[50vh]"
        style={{ backgroundPosition: "25% 50%" }}
      />
      <div className="w-full md:w-[37%] bg-primary text-white flex flex-col justify-center py-12 px-8 md:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-light uppercase mb-8">
            About MILI RESORTS
          </h2>
          <p className="text-white/80 text-lg font-serif italic mb-8 leading-relaxed">
            Each villa has been carefully designed and decorated with its own
            unique style, making no two rooms the same.
            <br />
            <br />
            The originality of Mili Resorts paired with the natural grace of its
            Mukutmanipur setting makes every stay feel like a one-of-a-kind
            celebration.
          </p>
          <a
            href="#"
            className="inline-block px-10 py-5 border-2 border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-colors"
          >
            Our Story
          </a>
        </motion.div>
      </div>
    </section>
  );
}
