import { motion } from "framer-motion";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

type OfferCard = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  priceLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const FALLBACK_OFFERS: OfferCard[] = [
  {
    id: "fallback-discount",
    title: "Flat 10% Off All Rooms",
    description:
      "Book your stay now and enjoy a flat 10% discount on all room categories, including complimentary breakfast.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/595b9948-f517-4407-bec4-488fe0266a5b",
    priceLabel: "Flat 10% Off",
    ctaLabel: "Book Now",
    ctaHref: "/rooms",
  },
  {
    id: "fallback-celebration",
    title: "Celebration Weekend",
    description:
      "Poolside high-tea, private bonfire dinners, and décor styling for anniversaries and milestone events.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/594daab9-4f31-4193-83e9-93b452d634ad",
    priceLabel: "Event Packages",
    ctaLabel: "Plan an Event",
    ctaHref: "/#cultural-events",
  },
  {
    id: "fallback-gourmet",
    title: "Gourmet Getaway",
    description:
      "Chef's tasting menus, curated beverage pairings, and late checkout for culinary-led adventures.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/9333e614-1155-4f90-be8b-1e2c47685e97",
    priceLabel: "Complimentary F&B",
    ctaLabel: "View Dining",
    ctaHref: "/dining",
  },
];

type OfferCardProps = {
  data: OfferCard;
  index: number;
};

type LatestProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

function OfferCardItem({ data, index }: OfferCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden bg-white shadow-lg flex flex-col h-full"
    >
      <div
        className="h-56 bg-cover bg-center relative shrink-0"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${data.imageUrl})`,
        }}
      >
        {data.priceLabel && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-primary shadow-sm">
            {data.priceLabel}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col grow space-y-4">
        <div>
          <h5 className="text-xl font-semibold text-stone-800 mb-2">
            {data.title}
          </h5>
          {data.description && (
            <p className="text-sm text-stone-500 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        <div className="mt-auto pt-2">
          {data.ctaLabel && (
            <Button
              variant="outline"
              className="w-full border-stone-200 hover:bg-stone-50 hover:text-primary"
              asChild={Boolean(data.ctaHref)}
            >
              {data.ctaHref ? (
                <a href={data.ctaHref}>{data.ctaLabel}</a>
              ) : (
                <span>{data.ctaLabel}</span>
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Latest({
  eyebrow = "Latest Offers",
  title = "Tailored escapes for every stay",
  description = "Surprise upgrades, curated F&B pairings, and only at Mili experiences crafted weekly by the resort team.",
}: LatestProps) {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/latest-offers"
      );
      // ensure offers is always an array
      setOffers(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load offers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const cardsToRender: OfferCard[] =
    offers.length > 0 ? offers : FALLBACK_OFFERS;

  return (
    <section id="latest-offers" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-12 max-w-335">
        <div className="text-center mb-14 space-y-4">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.5em]">
            {eyebrow}
          </p>
          <h4 className="text-3xl md:text-4xl font-light uppercase tracking-widest">
            {title}
          </h4>
          {description && (
            <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsToRender.map((offer, index) => (
            <OfferCardItem key={offer.id} data={offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
