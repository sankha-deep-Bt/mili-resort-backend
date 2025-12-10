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
