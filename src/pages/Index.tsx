import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import ARTryOn from "@/components/ARTryOn";
import MeetArtisans from "@/components/MeetArtisans";
import Sustainability from "@/components/Sustainability";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <ARTryOn />
      <MeetArtisans />
      <Sustainability />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
