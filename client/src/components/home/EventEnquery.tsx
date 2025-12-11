import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { type FormEvent } from "react";

import { toast } from "react-hot-toast";
import {
  Calendar,
  Users,
  Sparkles,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../utils/axios";

const EVENT_TYPES = [
  {
    id: "pre-wedding",
    title: "Pre-wedding",
    icon: Sparkles,
    description: "Capture your love story in our picturesque settings",
  },
  {
    id: "wedding",
    title: "Wedding",
    icon: Calendar,
    description: "Create unforgettable memories on your special day",
  },
  {
    id: "celebrations",
    title: "Celebrations",
    icon: Users,
    description: "Host birthdays, anniversaries, and milestone events",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    icon: Briefcase,
    description: "Professional venues for meetings and team building",
  },
];

export default function EventEnquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const eventType = EVENT_TYPES[currentFormIndex].id;
    const eventDate = formData.get("eventDate") as string;
    const guestCount = formData.get("guestCount") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await api.post("reservation/event-enquiry", {
        name,
        email,
        phoneNumber: phone,
        eventType,
        eventDate: eventDate || "Not specified",
        guestCount: guestCount || "Not specified",
        message: message || "No additional message",
      });
      console.log(res.data);
      toast.success("Enquiry sent successfully! We'll contact you soon.");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextForm = () => {
    setCurrentFormIndex((prev) => (prev + 1) % EVENT_TYPES.length);
  };

  const prevForm = () => {
    setCurrentFormIndex(
      (prev) => (prev - 1 + EVENT_TYPES.length) % EVENT_TYPES.length
    );
  };

  const currentEventType = EVENT_TYPES[currentFormIndex];
  const Icon = currentEventType.icon;

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-amber-400"
          >
            Plan Your Event
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light uppercase tracking-widest"
          >
            Host Your Special Occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
          >
            From intimate celebrations to grand corporate gatherings, Mili
            Resorts provides the perfect backdrop for your memorable events.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {EVENT_TYPES.map((eventType, index) => {
            const EventIcon = eventType.icon;
            return (
              <motion.div
                key={eventType.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative overflow-hidden rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                  currentFormIndex === index
                    ? "border-amber-400 bg-amber-400/10"
                    : "border-white/20 bg-white/5 hover:border-amber-400/50"
                }`}
                onClick={() => setCurrentFormIndex(index)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-amber-400/20">
                    <EventIcon className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-wide">
                    {eventType.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {eventType.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <button
            type="button"
            onClick={prevForm}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous form"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={nextForm}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next form"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFormIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="p-3 rounded-full bg-amber-400/20">
                  <Icon className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-light uppercase tracking-widest text-center">
                  {currentEventType.title} Enquiry
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                    Expected Guests
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    min="1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
                    placeholder="Number of guests"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition resize-none"
                    placeholder={`Tell us more about your ${currentEventType.title.toLowerCase()}...`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-amber-400 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Sending..."
                    : `Send ${currentEventType.title} Enquiry`}
                </button>
              </form>

              <div className="flex justify-center gap-2 mt-8">
                {EVENT_TYPES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentFormIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentFormIndex === index
                        ? "w-8 bg-amber-400"
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`Go to form ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
