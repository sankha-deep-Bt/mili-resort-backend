import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { motion } from "framer-motion";

const bulletPoints = [
  "International orders are shipped via registered international couriers or speed post only.",
  "Domestic orders are dispatched through registered domestic couriers or speed post.",
  "Orders are shipped within the timeline agreed at order confirmation, subject to courier norms.",
  "We are not liable for courier/postal delays; our responsibility ends when consignments are handed over.",
  "Deliveries are made to the address supplied by the buyer, and confirmation is sent to the registered email.",
  "For service utilization issues, contact our helpdesk at 9933162020 or miliresorts.ofc@gmail.com.",
];

export default function DeliveryPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative isolate overflow-hidden bg-linear-to-b from-black via-[#090909] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
        <section className="relative mx-auto max-w-4xl px-6 pt-28 pb-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.65rem] uppercase tracking-[0.6em] text-amber-200/80"
          >
            Mili Resorts • Policy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl font-semibold uppercase tracking-[0.3em]"
          >
            Shipping & Delivery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/70"
          >
            Our delivery ethos is built on clarity and reliability. Whether you
            are engaging with us domestically or internationally, we ensure
            consignments are handled with utmost care and transparent
            communication.
          </motion.p>
        </section>

        <section className="relative mx-auto max-w-4xl px-6 pb-24">
          <div className="space-y-6">
            {bulletPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-200/20 text-xs font-bold text-amber-200">
                  {index + 1}
                </span>
                <p className="text-sm text-white/80">{point}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent p-8 text-sm text-white/80">
            Orders are confirmed and delivery details shared via the email ID
            used during registration. For any assistance, please reach out to
            our concierge desk using the contact information above—we are happy
            to help.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
