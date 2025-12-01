// import { Facebook, Instagram, Youtube } from "lucide-react";

// const quickLinks = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "#about" },
//   { label: "Contact", href: "#contact" },
// ];

// const exploreLinks = [
//   { label: "Our Premium Rooms", href: "/rooms" },
//   { label: "Packages", href: "/#packages" },
//   { label: "Latest Offers", href: "/#latest-offers" },
//   { label: "Food & Beverages", href: "/dining" },
//   { label: "Gallery", href: "/#gallery" },
//   { label: "Events", href: "/#cultural-events" },
// ];

// const socialLinks = [
//   {
//     label: "Facebook",
//     href: "https://www.facebook.com/miliresorts/",
//     Icon: Facebook,
//   },
//   {
//     label: "Instagram",
//     href: "https://www.instagram.com/miliresorts/",
//     Icon: Instagram,
//   },
//   {
//     label: "YouTube",
//     href: "https://www.youtube.com/@MiliResortsofficial",
//     Icon: Youtube,
//   },
// ] as const;

// export default function Footer() {
//   const handleSocialClick = (url: string) => {
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <footer className="bg-primary pt-16 text-white">
//       <div className="container mx-auto max-w-[83.75rem] px-6 lg:px-12">
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
//           <div className="space-y-5 text-center sm:text-left">
//             <a
//               href="/"
//               className="inline-flex items-center drop-shadow-[0_6px_15px_rgba(0,0,0,0.35)]"
//             >
//               <img
//                 src="public/footer.jpg"
//                 alt="Mili's Resort logo"
//                 className="h-16 w-auto"
//               />
//             </a>
//             <p className="text-sm text-white/70 leading-relaxed">
//               Boutique stays framed by Mukutmanipur's forests, Baul evenings,
//               and thoughtful hospitality. Every villa feels custom-crafted for
//               calm.
//             </p>
//             <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-white/70">
//               {socialLinks.map(({ label, href, Icon }) => (
//                 <button
//                   key={label}
//                   type="button"
//                   onClick={() => handleSocialClick(href)}
//                   aria-label={`Visit our ${label}`}
//                   title={`Visit our ${label}`}
//                   className="rounded-full p-2 transition-all duration-200 hover:text-white hover:-translate-y-1 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span className="sr-only">{`Visit our ${label}`}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
//               Quick Links
//             </p>
//             <ul className="mt-6 space-y-3 text-sm">
//               {quickLinks.map((item) => (
//                 <li key={item.label}>
//                   <a
//                     href={item.href}
//                     className="group inline-flex items-center gap-3 text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
//                   >
//                     <span className="h-px w-4 bg-white/40 transition-all duration-200 group-hover:w-6 group-hover:bg-white" />
//                     {item.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
//               Explore
//             </p>
//             <ul className="mt-6 space-y-3 text-sm">
//               {exploreLinks.map((item) => (
//                 <li key={item.label}>
//                   <a
//                     href={item.href}
//                     className="group inline-flex items-center gap-3 text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
//                   >
//                     <span className="h-px w-4 bg-white/40 transition-all duration-200 group-hover:w-6 group-hover:bg-white" />
//                     {item.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-6 text-sm text-white/80">
//             <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
//               Visit & Connect
//             </p>
//             <div className="rounded-3xl bg-white/5 p-6 space-y-4">
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   Address
//                 </p>
//                 <p className="mt-1 leading-relaxed">
//                   Basnala, Mukutmanipur
//                   <br />
//                   Bankura, West Bengal – India
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   Phone
//                 </p>
//                 <div className="mt-1 space-y-1">
//                   <a
//                     href="tel:+919933162020"
//                     className="block text-white/70 transition-colors duration-200 hover:text-white"
//                   >
//                     +91 9933162020
//                   </a>
//                   <a
//                     href="tel:+918101179917"
//                     className="block text-white/70 transition-colors duration-200 hover:text-white"
//                   >
//                     +91 8101179917
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   Email
//                 </p>
//                 <a
//                   href="mailto:miliresorts.ofc@gmail.com"
//                   className="block text-white/70 transition-colors duration-200 hover:text-white"
//                 >
//                   miliresorts.ofc@gmail.com
//                 </a>
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   Instagram
//                 </p>
//                 <a
//                   href="https://www.instagram.com/miliresorts/"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="block text-white/70 transition-colors duration-200 hover:text-white"
//                 >
//                   instagram.com/miliresorts
//                 </a>
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   Facebook
//                 </p>
//                 <a
//                   href="https://www.facebook.com/miliresorts/"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="block text-white/70 transition-colors duration-200 hover:text-white"
//                 >
//                   facebook.com/miliresorts
//                 </a>
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
//                   YouTube
//                 </p>
//                 <a
//                   href="https://www.youtube.com/@MiliResortsofficial"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="block text-white/70 transition-colors duration-200 hover:text-white"
//                 >
//                   youtube.com/@MiliResortsofficial
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-14 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 text-white/90">
//           {socialLinks.map(({ label, href, Icon }) => (
//             <a
//               key={`cta-${label}`}
//               href={href}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition hover:border-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
//             >
//               <Icon className="h-4 w-4" />
//               <span>{label}</span>
//             </a>
//           ))}
//         </div>

//         <div className="mt-16 border-t border-white/15 py-8 text-center text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
//           © Mili Resorts 2024 · All Rights Reserved
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const exploreLinks = [
  { label: "Our Premium Rooms", href: "/rooms" },
  { label: "Packages", href: "/#packages" },
  { label: "Latest Offers", href: "/#latest-offers" },
  { label: "Food & Beverages", href: "/dining" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Events", href: "/#cultural-events" },
];

const disclaimerLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Delivery Policy", href: "/delivery-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/miliresorts/",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/miliresorts/",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MiliResortsofficial",
    Icon: Youtube,
  },
] as const;

export default function Footer() {
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-primary pt-16 text-white">
      <div className="container mx-auto max-w-[83.75rem] px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5 text-center sm:text-left">
            <a
              href="/"
              className="inline-flex items-center drop-shadow-[0_6px_15px_rgba(0,0,0,0.35)]"
            >
              <img
                src="/logo.jpg"
                alt="Mili's Resort logo"
                className="h-16 w-auto"
              />
            </a>
            <p className="text-sm text-white/70 leading-relaxed">
              Boutique stays framed by Mukutmanipur's forests, Baul evenings,
              and thoughtful hospitality. Every villa feels custom-crafted for
              calm.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-white/70">
              {socialLinks.map(({ label, href, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleSocialClick(href)}
                  aria-label={`Visit our ${label}`}
                  title={`Visit our ${label}`}
                  className="rounded-full p-2 transition-all duration-200 hover:text-white hover:-translate-y-1 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{`Visit our ${label}`}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
              Quick Links
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-px w-4 bg-white/40 transition-all duration-200 group-hover:w-6 group-hover:bg-white" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
              Explore
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-px w-4 bg-white/40 transition-all duration-200 group-hover:w-6 group-hover:bg-white" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
              Disclaimer
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              {disclaimerLinks.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex w-full items-center justify-between rounded-full border border-white/20 px-5 py-3 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-200 via-pink-300 to-purple-400 animate-pulse" />
                      {item.label}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] opacity-0 transition-all duration-300 group-hover:opacity-100">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 text-sm text-white/80">
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60">
              Visit & Connect
            </p>
            <div className="rounded-3xl bg-white/5 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Address
                </p>
                <p className="mt-1 leading-relaxed">
                  Basnala, Mukutmanipur
                  <br />
                  Bankura, West Bengal – India
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Phone
                </p>
                <div className="mt-1 space-y-1">
                  <a
                    href="tel:+919933162020"
                    className="block text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    +91 9933162020
                  </a>
                  <a
                    href="tel:+918101179917"
                    className="block text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    +91 8101179917
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Email
                </p>
                <a
                  href="mailto:miliresorts.ofc@gmail.com"
                  className="block text-white/70 transition-colors duration-200 hover:text-white"
                >
                  miliresorts.ofc@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/miliresorts/"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-white/70 transition-colors duration-200 hover:text-white"
                >
                  instagram.com/miliresorts
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  Facebook
                </p>
                <a
                  href="https://www.facebook.com/miliresorts/"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-white/70 transition-colors duration-200 hover:text-white"
                >
                  facebook.com/miliresorts
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                  YouTube
                </p>
                <a
                  href="https://www.youtube.com/@MiliResortsofficial"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-white/70 transition-colors duration-200 hover:text-white"
                >
                  youtube.com/@MiliResortsofficial
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 text-white/90">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={`cta-${label}`}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition hover:border-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="mt-16 border-t border-white/15 py-8 text-center text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
          © Mili Resorts 2024 · All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
