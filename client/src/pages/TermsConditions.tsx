import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { motion } from "framer-motion";

const clauses = [
  "The content of the pages of this website is subject to change without notice.",
  "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.",
  "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable.",
  "Our website contains material which is owned by or licensed to us. Reproduction is prohibited other than in accordance with the copyright notice.",
  "All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
  "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
  "From time to time our website may also include links to other websites. These links are provided for your convenience.",
  "You may not create a link to our website from another website or document without prior written consent.",
  "Any dispute arising out of use of our website and/or purchase with us is subject to the laws of India.",
  "We are not liable for any loss or damage arising directly or indirectly out of the decline of authorization for any transaction.",
];

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative isolate overflow-hidden bg-gradient-to-b from-black via-[#0f0f0f] to-black">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />
        <section className="relative mx-auto max-w-5xl px-6 pt-28 pb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.7rem] uppercase tracking-[0.6em] text-amber-200/80"
          >
            Mili Resorts • Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-light uppercase tracking-[0.3em]"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base text-white/70"
          >
            For the purpose of these Terms and Conditions, the terms “we”, “us”,
            “our” refer to Mili Resorts, KHATRA HIGH SCHOOL ROAD, Bankura, West
            Bengal 722140. “You” or “visitor” refers to any natural or legal
            person interacting with our website or services.
          </motion.p>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-20">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <div className="grid gap-6 md:grid-cols-2">
              {clauses.map((item, index) => (
                <motion.article
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                    Clause {index + 1}
                  </div>
                  <p className="mt-3 text-sm text-white/80">{item}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-4 text-sm text-white/70">
            <p>
              Our website materials include design, layout, look, appearance,
              and graphics that are owned or licensed to us. All trademarks not
              belonging to us are acknowledged. Disputes arising from website
              usage or purchases are governed by the laws of India.
            </p>
            <p>
              We shall not be liable for any loss arising from declined
              transactions where cardholders exceed preset limits mutually
              agreed with acquiring banks. Thank you for respecting these terms
              while enjoying the Mili Resorts experience.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
