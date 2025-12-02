import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

type EventHighlight = {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
};

const bioParagraph =
  "At Mili Resorts, intimate gatherings bloom into soulful celebrations where Mukutmanipur's folklore, river breeze, and crimson sunsets compose the perfect stage. Our team curates boutique events featuring Baul storytellers, handloom artisans, slow-cooked Panch-Phoron feasts, and modern instrumental duos that serenade under lantern-lit banyans. Guests sip nolen gur cocktails, learn rhythmic claps from local elders, and dance barefoot beside shimmering terracotta diyas. Each performance honors the resilience of Bankura's culture while embracing contemporary comfort. Whether it's an anniversary toast or a corporate retreat, every note, aroma, and smile echoes our promise: hospitality rooted in heritage and community that celebrates lasting friendships.";

const fallbackHighlights: EventHighlight[] = [
  {
    title: "Live Music Band Nights",
    subtitle: "Lantern-lit lawn sessions",
    description:
      "Amplified guitars, neo-jazz percussion, and soulful vocalists score sunset cocktails while chefs pass seasonal tapas.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/6493e255-1bc1-49bc-a9db-2f5e02257575",
  },
  {
    title: "Baul Songs of Bengal",
    subtitle: "Earthy ektara storytellers",
    description:
      "Folk poets share Mukutmanipur legends through hypnotic rhythms under moonlit sal trees.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/0cb3ed38-45f1-46af-9a16-880d701bb2a2",
  },
  {
    title: "New Year's DJ Night Party",
    subtitle: "31 December · Exclusive for Guests",
    description:
      "A neon-lit courtyard concert featuring DJs, countdown visuals, and midnight fireworks.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/ae300c3a-3a66-4bc6-83ef-925613ffe6fb",
  },
];

export default function CulturalEvents() {
  const [events, setEvents] = useState<EventHighlight[]>(fallbackHighlights);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/event/highlights"
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
        // fallback is already set, no need to update
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="cultural-events" className="py-24 bg-[#0b0704] text-white">
      <div className="container mx-auto px-4 md:px-12 max-w-[83.75rem]">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.6em] text-amber-400/80">
            Cultural Evenings
          </p>
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.4em]">
            Small Events, Big Memories
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            {bioParagraph}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((highlight, index) => (
            <motion.article
              key={highlight._id ?? `${highlight.title}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] min-h-[420px] shadow-2xl">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8 space-y-3">
                  <span className="text-xs uppercase tracking-[0.5em] text-white/70">
                    {highlight.subtitle ?? "Cultural Rendezvous"}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-wide">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
