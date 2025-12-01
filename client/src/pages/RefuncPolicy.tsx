import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const policyPoints = [
  "Cancellation requests are accepted within 2 days of placing the order unless shipment processing has begun.",
  "Perishable items such as flowers or eatables are non-cancellable; refunds are considered only for quality issues.",
  "Damaged or defective items must be reported within 2 days for merchant verification and resolution.",
  "If the product received differs from its description or expectations, notify customer service within 2 days.",
  "Products covered by manufacturer warranties should be addressed directly with the manufacturer.",
  "Approved refunds are processed within 1-2 days to the original payment method.",
];

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative isolate overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.25),_transparent_60%)]" />
        <section className="relative mx-auto max-w-4xl px-6 pt-28 pb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.65rem] uppercase tracking-[0.6em] text-amber-200/80"
          >
            Updated on Nov 27, 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl font-semibold uppercase tracking-[0.3em]"
          >
            Cancellation & Refund Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/70"
          >
            Mili Resorts is committed to helping guests as far as possible with
            a liberal yet responsible cancellation framework.
          </motion.p>
        </section>

        <section className="relative mx-auto max-w-4xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-2">
            {policyPoints.map((point, index) => (
              <motion.article
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
              >
                <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Guideline {index + 1}
                </div>
                <p className="mt-3 text-sm text-white/80">{point}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/15 via-transparent to-transparent p-8 text-sm text-white/80">
            For complaints about manufacturer-warranted products, please contact
            the manufacturer directly. All refund communications should be
            routed through our customer service desk to ensure swift resolution.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
