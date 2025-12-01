// import { motion } from "framer-motion";
// import { useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import { Menu, X } from "lucide-react"; // <-- hamburger icons

// const menuItems = [
//   { name: "Home", href: "/" },
//   { name: "Our Premium Rooms", href: "/rooms" },
//   { name: "About", href: "/#about" },
//   { name: "Packages", href: "/#packages" },
//   { name: "Latest Offers", href: "/#latest-offers" },
//   { name: "Food & Beverages", href: "/dining" },
//   { name: "Gallery", href: "/gallery" },
//   { name: "Events", href: "/#cultural-events" },
//   { name: "Contact", href: "/#contact" },
// ];

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [openMenu, setOpenMenu] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`sticky top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
//         isScrolled
//           ? "border-white/10 bg-black/60 backdrop-blur-xl"
//           : "border-transparent bg-black"
//       }`}
//     >
//       <div className="flex items-center justify-between px-6 lg:px-12 py-4">
//         {/* LOGO */}
//         <a href="/" className="block text-white no-underline">
//           <img
//             src="/logo.jpg"
//             alt="Mili Resorts logo"
//             className="h-12 w-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
//           />
//         </a>

//         {/* DESKTOP NAV */}
//         <div className="hidden lg:flex items-center gap-24 ml-auto">
//           <nav className="flex items-center gap-10 text-white/90 text-[0.75rem] font-semibold uppercase tracking-[0.3em]">
//             {menuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="relative transition-all after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:text-white hover:after:scale-x-100"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </nav>

//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="rounded-full border border-white/60 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white hover:bg-white/10 transition-colors"
//           >
//             Login
//           </button>
//         </div>

//         {/* MOBILE HAMBURGER */}
//         <button
//           type="button"
//           onClick={() => setOpenMenu(!openMenu)}
//           className="lg:hidden text-white"
//         >
//           {openMenu ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {openMenu && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4"
//         >
//           <nav className="flex flex-col gap-6 text-white/90 text-[0.75rem] font-semibold uppercase tracking-[0.3em]">
//             {menuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setOpenMenu(false)}
//                 className="py-2 border-b border-white/10"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </nav>

//           <button
//             type="button"
//             onClick={() => {
//               setOpenMenu(false);
//               navigate("/login");
//             }}
//             className="mt-6 w-full rounded-full border border-white/60 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-white hover:bg-white/10 transition-colors"
//           >
//             Login
//           </button>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// }

import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth"; // <-- added

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Our Premium Rooms", href: "/rooms" },
  { name: "About", href: "/#about" },
  { name: "Packages", href: "/#packages" },
  { name: "Latest Offers", href: "/#latest-offers" },
  { name: "Food & Beverages", href: "/dining" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/#cultural-events" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuth } = useAuth(); // <-- added
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-black/60 backdrop-blur-xl"
          : "border-transparent bg-black"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* LOGO */}
        <a href="/" className="block text-white no-underline">
          <img
            src="/logo.jpg"
            alt="Mili Resorts logo"
            className="h-12 w-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
          />
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-24 ml-auto">
          <nav className="flex items-center gap-10 text-white/90 text-[0.75rem] font-semibold uppercase tracking-[0.3em]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative transition-all after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:text-white hover:after:scale-x-100"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* LOGIN / DASHBOARD BUTTON */}
          <button
            type="button"
            onClick={() => navigate(isAuth ? "/dashboard" : "/login")}
            className="rounded-full border border-white/60 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white hover:bg-white/10 transition-colors"
          >
            {isAuth ? "Dashboard" : "Login"}
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden text-white"
        >
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4"
        >
          <nav className="flex flex-col gap-6 text-white/90 text-[0.75rem] font-semibold uppercase tracking-[0.3em]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="py-2 border-b border-white/10"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* MOBILE LOGIN / DASHBOARD BUTTON */}
          <button
            type="button"
            onClick={() => {
              setOpenMenu(false);
              navigate(isAuth ? "/dashboard" : "/login");
            }}
            className="mt-6 w-full rounded-full border border-white/60 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-white hover:bg-white/10 transition-colors"
          >
            {isAuth ? "Dashboard" : "Login"}
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
