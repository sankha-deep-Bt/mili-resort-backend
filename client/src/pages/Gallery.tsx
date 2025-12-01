import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { GALLERY_SHOWCASE } from "../data/galleryShowcase";

type DisplayCard = {
  key: string;
  title: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
};

export default function Gallery() {
  // Since Convex is removed, just use GALLERY_SHOWCASE directly
  const displayCards: Array<DisplayCard> = useMemo(() => {
    const cards = GALLERY_SHOWCASE.map((item) => ({
      key: `seed-${item.displayOrder}`,
      ...item,
    }));

    return cards.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, []);

  const swappedCards = useMemo(() => {
    const overrides: Record<string, string> = {
      "Moonlit Courtyard Celebrations":
        "Festoon lights, live music, and curated seating turn the main courtyard into Mili Resorts' most romantic social setting.",
      "Garden Suites by Night":
        "Nestled amid foliage, the signature garden suites glow gently, promising privacy with postcard-ready views.",
      "Villa Facades in Full Glow":
        "Every cottage block shines in synchronized illumination, highlighting the architectural symmetry that lines the pool.",
      "Bloom-Lined Promenade":
        "Marigold blooms frame the promenade, guiding guests from villas to experience zones with a burst of color.",
      "Bodhi Wall of Serenity":
        "A hand-painted Buddha mural anchors the garden stage, creating a meditative backdrop for cultural performances.",
      "Intimate Lawn Gatherings":
        "The central lawn hosts cozy winter soirées, complete with artisanal food counters and fireside conversations.",
    };

    const cards = displayCards.map((card) => ({
      ...card,
      description: overrides[card.title] ?? card.description,
    }));

    // Swap images: Frame 1 <-> 6, 2 <-> 5, 3 <-> 4
    const swapImage = (i: number, j: number) => {
      if (cards[i] && cards[j]) {
        [cards[i].imageUrl, cards[j].imageUrl] = [
          cards[j].imageUrl,
          cards[i].imageUrl,
        ];
      }
    };

    swapImage(0, 5);
    swapImage(1, 4);
    swapImage(2, 3);

    return cards;
  }, [displayCards]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative isolate overflow-hidden bg-gradient-to-b from-black via-[#050505] to-black">
        <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <section className="relative mx-auto max-w-5xl px-6 pt-28 pb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.7rem] uppercase tracking-[0.6em] text-amber-200/80"
          >
            Mili Resorts • Mukutmanipur
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-light uppercase tracking-[0.3em]"
          >
            Resort Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-base text-white/70"
          >
            Wander through our moonlit lawns, villa clusters, and curated art
            corners. Each frame captures the warmth of Bengali hospitality, the
            sparkle of festive nights, and the lush gardens that make every stay
            at Mili Resorts unforgettable.
          </motion.p>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {swappedCards.map((item, index) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/80">
                    Frame {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-3 px-6 py-6">
                  <h3 className="text-xl font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
