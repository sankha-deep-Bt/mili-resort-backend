import Awards from "../components/home/Awards";
import About from "../components/home/About";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Villas from "../components/home/Villas";
import Experience from "../components/home/Experiences";
import Latest from "../components/home/Latest";
import Testimonials from "../components/home/Testimonials";
import Packages from "../components/home/Packages";
import CulturalEvents from "../components/home/CulturalEvents";
import MapSection from "../components/home/MapSection";
import Booking from "../components/home/Bookings";
import Footer from "../components/home/Footer";
import EventEnquiry from "../components/home/EventEnquery";

import GalleryPreview from "../components/home/GalleryPreview";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <Hero />
      <Awards />
      <Booking />
      <Villas />
      <Experience />
      <Latest />
      <Testimonials />
      <About />
      <Packages />
      <CulturalEvents />
      <EventEnquiry />
      <GalleryPreview />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Home;

// import Awards from "../components/Awards";
// import About from "../components/About";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Villas from "../components/Villas";
// import Experience from "../components/Experiences";
// import Latest from "../components/Latest";
// import Testimonials from "../components/Testimonials";
// import Packages from "../components/Packages";
// import CulturalEvents from "../components/CulturalEvents";
// import MapSection from "../components/MapSection";
// import Booking from "../components/Bookings";
// import Footer from "../components/Footer";
// import EventEnquiry from "../components/EventEnquery";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col font-sans bg-white text-stone-900">
//       {/* NAV */}
//       <Navbar />

//       {/* MAIN CONTENT */}
//       <main className="flex-1 w-full mx-auto">
//         {/* Each section wrapped for better spacing & responsiveness */}
//         <section className="w-full">
//           <Hero />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Awards />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Booking />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Villas />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Experience />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Latest />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Testimonials />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <About />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <Packages />
//         </section>

//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <CulturalEvents />
//         </section>
//         <section className="w-full px-4 md:px-8 lg:px-10 py-10">
//           <EventEnquiry />
//         </section>

//         <section className="w-full">
//           <MapSection />
//         </section>
//       </main>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;
