import { motion } from "framer-motion";
import { Play, Youtube, ArrowUpRight } from "lucide-react";

export default function Experience() {
  const channelUrl = "https://www.youtube.com/@MiliResortsofficial";
  const facebookUrl = "https://www.facebook.com/miliresorts/";

  const handleChannelVisit = () => {
    window.open(channelUrl, "_blank", "noopener,noreferrer");
  };

  const handleFacebookVisit = () => {
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 bg-[#f3f4f6]">
      <div className="container mx-auto px-4 md:px-12 max-w-[68.75rem]">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:max-w-[28rem] md:-mr-24 relative z-10 shadow-xl"
          >
            <div className="text-center">
              <h2 className="text-neutral-800 text-xs font-bold tracking-widest uppercase mb-3">
                Customer
              </h2>
              <div className="text-3xl font-light uppercase mb-5">
                Is Supreme
              </div>
              <p className="text-zinc-700 text-lg font-serif italic mb-8 mx-1.5">
                When it comes to our guests, no request is too big and no detail
                is too small.
              </p>
              <button
                type="button"
                onClick={handleFacebookVisit}
                className="block w-full bg-primary py-5 text-white text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                Learn More
              </button>
            </div>
            <div className="mt-8 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 text-left text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">
                      <Youtube className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/60">
                        Channel Preview
                      </p>
                      <p className="text-xl font-semibold">
                        Mili Resorts Official
                      </p>
                      <p className="text-sm text-white/70">
                        youtube.com/@MiliResortsofficial
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/20 px-4 py-1 text-[0.55rem] uppercase tracking-[0.5em] text-white/70">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      Subscribers
                    </p>
                    <p className="text-2xl font-semibold">12.5K</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      Videos
                    </p>
                    <p className="text-2xl font-semibold">180+</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleChannelVisit}
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] transition hover:bg-white/20 flex items-center justify-center gap-2"
                >
                  Visit YouTube Channel
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:flex-1 h-[36rem] bg-[url('https://assets.website-files.com/5b4f3cc33f2e3868c5a5b80c/5b56ca5118c0117abec40440_experience_placeholder.jpg')] bg-cover bg-center relative group cursor-pointer"
          >
            <button
              type="button"
              onClick={handleChannelVisit}
              className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Open Mili Resorts YouTube channel"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4">
                <Play className="w-6 h-6 fill-white" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">
                Watch on YouTube
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
