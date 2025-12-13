import { motion } from "framer-motion";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <div className="absolute inset-0 bg-[url('/about-image.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl text-white font-light uppercase tracking-widest text-center px-4"
          >
            Our Story
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 max-w-5xl space-y-20">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-light text-primary uppercase tracking-widest">
            A Serene Escape
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
            Nestled near the breathtaking Mukutmanipur Dam in Bankura, West
            Bengal, Mili Resorts offers a serene escape into nature’s embrace.
            Surrounded by lush greenery and scenic landscapes, our 4.5-star
            resort provides modern comfort, spacious rooms with balconies
            overlooking the hills, and a peaceful ambiance perfect for families,
            couples, and solo travelers seeking relaxation away from city
            hustle.
          </p>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-8">
            <h3 className="text-2xl font-light uppercase tracking-wide border-b border-primary/20 pb-4">
              Key Features & Amenities
            </h3>
            <ul className="space-y-6">
              {[
                {
                  title: "Comfortable Accommodations",
                  desc: "Clean, well-equipped rooms with stunning natural views, air conditioning, and thoughtful amenities for a home-like stay.",
                },
                {
                  title: "Recreational Facilities",
                  desc: "Refreshing swimming pool, well-maintained park areas, and spaces for outdoor activities amid the dam’s beauty.",
                },
                {
                  title: "Dining Excellence",
                  desc: "Multi-cuisine restaurant serving delicious, fresh meals tailored to guest preferences.",
                },
                {
                  title: "Prime Location",
                  desc: "Just 3 km from Mukutmanipur Dam, ideal for exploring the region’s natural wonders and tranquil spots.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-800">{item.title}</h4>
                    <p className="text-stone-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-stone-500 italic pt-4">
              Our friendly staff ensures personalized hospitality, earning us
              consistent 4.5+ ratings for cleanliness, service, and guest
              satisfaction. Book your stay at Mili Resorts for unforgettable
              memories in the heart of nature.
            </p>
          </div>
          <div className="h-full min-h-[400px] bg-[url('/about-image.jpg')] bg-cover bg-center rounded-2xl shadow-xl" />
        </motion.section>

        {/* Weddings & Corporate */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary uppercase tracking-widest mb-4">
              Weddings & Corporate Events
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto">
              Mili Resorts Mukutmanipur transforms into a dream destination for
              weddings, celebrations, and corporate events. Our scenic
              landscapes, spacious lawns, and modern banquet facilities provide
              an idyllic backdrop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                <span className="text-primary">✦</span> Weddings & Celebrations
              </h3>
              <ul className="space-y-4 text-stone-600">
                <li>
                  <strong className="text-stone-800">
                    Picturesque Settings:
                  </strong>{" "}
                  Host fairy-tale weddings with Mukutmanipur Dam views, lush
                  greenery, and customizable mandap setups.
                </li>
                <li>
                  <strong className="text-stone-800">
                    All-Inclusive Services:
                  </strong>{" "}
                  Multi-cuisine catering, decoration support, swimming pool for
                  pre-wedding fun, and spacious accommodations.
                </li>
                <li>
                  <strong className="text-stone-800">
                    Memorable Experiences:
                  </strong>{" "}
                  Ideal for birthdays, anniversaries, and family reunions with
                  friendly staff ensuring personalized touches.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                <span className="text-primary">✦</span> Corporate Events
              </h3>
              <ul className="space-y-4 text-stone-600">
                <li>
                  <strong className="text-stone-800">Productive Spaces:</strong>{" "}
                  Well-equipped banquet halls with Wi-Fi, AV setups, parking,
                  and power backup.
                </li>
                <li>
                  <strong className="text-stone-800">Relax & Recharge:</strong>{" "}
                  Combine work with leisure using our swimming pool, park areas,
                  and restaurant.
                </li>
                <li>
                  <strong className="text-stone-800">Tailored Packages:</strong>{" "}
                  Flexible options for groups, including meals and stays,
                  perfect for off-site corporate getaways.
                </li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}
