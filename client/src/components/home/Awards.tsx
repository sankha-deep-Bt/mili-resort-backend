import { motion } from "framer-motion";

export default function Awards() {
  return (
    <section className="py-24 md:py-36 bg-white text-zinc-700">
      <div className="container mx-auto px-4 md:px-12 max-w-230">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-primary text-xs font-bold tracking-widest uppercase mb-4">
              Award Winning MILI RESORTS
            </h2>
            <p className="text-lg md:text-xl font-serif italic text-zinc-600">
              Discover an exclusive sanctuary nestled amidst lush forests and
              rolling hills, where nature's serenity embraces luxury
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center md:justify-end gap-4 flex-wrap"
          >
            <img
              src="https://cdn.prod.website-files.com/5b4f3cc33f2e38145ba5b812/5b626e2cb54c827548313eed_5b5a8a7189a0174f6709b35d_international_hotel2.png"
              alt="Award 1"
              className="h-20 object-contain"
            />
            <img
              src="https://cdn.prod.website-files.com/5b4f3cc33f2e38145ba5b812/5b5a8ab1141352f4ea9d3511_World_luxury_hotel_awards.png"
              alt="Award 2"
              className="h-20 object-contain"
            />
            <img
              src="https://cdn.prod.website-files.com/5b4f3cc33f2e38145ba5b812/5b5a89d6a08d6b417bcafcd8_trip_advisor_logo.png"
              alt="Award 3"
              className="h-20 object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
