import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function MapSection() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-12 max-w-[68.75rem]">
        <div className="text-center mb-16">
          <h2 className="text-lg font-light uppercase tracking-widest mb-4">
            Find Us
          </h2>
          <p className="text-zinc-600 font-serif italic">
            Visit us at Basnala, Mukutmanipur
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 space-y-8"
          >
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-6 border-b pb-4">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase mb-1">Address</p>
                    <p className="text-zinc-600 font-serif">
                      Basnala, Mukutmanipur
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase mb-1">Phone</p>
                    <div className="text-zinc-600 font-serif space-y-1">
                      <p>+91 9933162020</p>
                      <p>+91 8101179917</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase mb-1">Email</p>
                    <p className="text-zinc-600 font-serif">
                      miliresorts.ofc@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-2/3 h-[400px] bg-white p-2 shadow-sm"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235145.8908478968!2d86.64162253741006!3d22.944534841328938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f649fadbfed037%3A0x885d646f21fdf2b6!2sMili%20Resorts!5e0!3m2!1sen!2sin!4v1763973256987!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
