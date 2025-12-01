import { motion } from "framer-motion";

export default function Packages() {
  return (
    <section id="packages" className="py-24 bg-stone-100">
      <div className="container mx-auto px-4 md:px-12 max-w-[68.75rem]">
        <div className="text-center mb-16">
          <h2 className="text-lg font-light uppercase tracking-widest">
            Popular Packages
          </h2>
        </div>

        <div className="space-y-24">
          {/* Package 1 */}
          <div
            id="exclusive-package"
            className="flex flex-col md:flex-row-reverse items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 h-[37.5rem] relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://harmless-tapir-303.convex.cloud/api/storage/2b12aa00-ce60-4a93-84c5-fadb1f67c302')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-0 right-0 bg-primary text-white px-6 py-4 text-xs font-bold tracking-widest uppercase">
                Details
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 py-8 md:pr-20 md:pl-12 text-center md:text-left"
            >
              <div className="max-w-[18rem] mx-auto md:mx-0">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-5">
                  Exclusive Package
                </h3>
                <p className="text-zinc-700 font-serif italic mb-8">
                  Indulge in our exclusive rooms featuring world-class service,
                  nestled on a serene small hill. Enjoy breathtaking natural
                  views of lush forests, creating the perfect sanctuary for
                  relaxation and connection with nature.
                </p>
                <a
                  href="#"
                  className="inline-block px-10 py-5 bg-stone-100 border-2 border-stone-100 text-zinc-700 text-[0.6rem] font-bold tracking-widest uppercase hover:bg-zinc-700 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  Explore Package
                </a>
              </div>
            </motion.div>
          </div>

          {/* Package 2 */}
          <div
            id="family-package"
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 h-[37.5rem] relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://harmless-tapir-303.convex.cloud/api/storage/3f8e7867-0d46-4250-a62c-63b311793454')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-0 right-0 bg-primary text-white px-6 py-4 text-xs font-bold tracking-widest uppercase">
                Details
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 py-8 md:pl-20 md:pr-12 text-center md:text-left"
            >
              <div className="max-w-[18rem] mx-auto md:mx-0">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-5">
                  Family Package
                </h3>
                <p className="text-zinc-700 font-serif italic mb-8">
                  Experience the perfect family getaway in the heart of
                  Mukutmanipur, Bankura. Our resort offers a blend of adventure
                  and relaxation amidst the serene landscapes of West Bengal,
                  ensuring memorable moments for everyone.
                </p>
                <a
                  href="#"
                  className="inline-block px-10 py-5 bg-stone-100 border-2 border-stone-100 text-zinc-700 text-[0.6rem] font-bold tracking-widest uppercase hover:bg-zinc-700 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  Explore Package
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
