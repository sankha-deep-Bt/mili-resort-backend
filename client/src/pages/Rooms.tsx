import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const heroBackdrop =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80";
const fallbackRoomImage =
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80";

const highlightTiles = [
  {
    title: "Nature-Dipped Suites",
    copy: "Each room opens to forest, lake, or courtyard views framed by floor-to-ceiling glass.",
  },
  {
    title: "Curated Rituals",
    copy: "Butler-on-call, twilight Baul sessions, and artisanal bath amenities await.",
  },
  {
    title: "Slow Living Guaranteed",
    copy: "Handwoven linens, cane textures, and mood lighting encourage intentional pauses.",
  },
] as const;

// Static placeholder rooms
const rooms = [
  {
    _id: "1",
    name: "Ground Floor Deluxe Room",
    type: "Deluxe",
    price: 2500,
    description: "Spacious deluxe room with all amenities.",
    status: "available",
    image: fallbackRoomImage,
  },
  {
    _id: "2",
    name: "First Floor Super Deluxe Room",
    type: "Super Deluxe",
    price: 3000,
    description: "Premium room with balcony and view.",
    status: "booked",
    image: fallbackRoomImage,
  },
];

export default function Rooms() {
  const navigate = useNavigate();

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    []
  );

  const sortedRooms = [...rooms];

  const handleBookingRedirect = () => {
    navigate("/#booking");
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Navbar />
      <section className="relative isolate overflow-hidden bg-black pt-36 pb-24">
        <img
          src={heroBackdrop}
          alt="Premium suites"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-stone-950/90" />
        <div className="relative container mx-auto px-6 lg:px-12 max-w-6xl text-white space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.75rem] uppercase tracking-[0.6em] text-white/70"
          >
            Our Premium Rooms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight"
          >
            Seven distinct sanctuaries curated for slow, mindful escapes.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg text-white/80"
          >
            From sun-graced deluxe suites to expansive family cottages, each
            space is layered with handcrafted textures, curated art, and
            thoughtful amenities inspired by the Mukutmanipur landscape.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-6 uppercase tracking-[0.4em] bg-amber-400 text-black hover:bg-amber-300"
              onClick={handleBookingRedirect}
            >
              Book a Stay
            </Button>
            <Button
              size="lg"
              className="rounded-full border border-zinc-700 bg-zinc-900 text-white px-8 py-6 uppercase tracking-[0.4em] hover:bg-zinc-800 hover:text-white"
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {highlightTiles.map((tile, index) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.5em] text-amber-200/70 mb-4">
                  {tile.title}
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {tile.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-primary">
              The Collection
            </p>
            <h2 className="text-3xl font-serif text-stone-900">
              Explore every signature room at Mili Resorts
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto">
              Availability updates in real time from our concierge dashboards.
              Select a room to begin your booking journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedRooms.map((room, index) => (
              <motion.article
                key={room._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] flex flex-col"
              >
                <div
                  className="h-56 w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${room.image ?? fallbackRoomImage})`,
                  }}
                />
                <div className="p-8 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        room.status === "available" ? "secondary" : "outline"
                      }
                      className="uppercase tracking-[0.3em]"
                    >
                      {room.status.split("_").join(" ")}
                    </Badge>
                    <span className="text-sm text-stone-500">
                      Sleeps 2-4 guests
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-900">
                      {room.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">{room.type}</p>
                  </div>
                  <p className="text-stone-600 flex-1">{room.description}</p>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.5em] text-stone-400">
                        Tariff
                      </p>
                      <p className="text-2xl font-semibold text-stone-900">
                        {currencyFormatter.format(room.price)}
                        <span className="text-base text-stone-500 font-normal">
                          {" "}
                          / night
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/dashboard")}
                      className="uppercase tracking-[0.4em]"
                    >
                      Guest Portal
                    </Button>
                  </div>
                  <Button
                    className="w-full rounded-full py-6 tracking-[0.4em]"
                    onClick={handleBookingRedirect}
                  >
                    Book this Room
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
