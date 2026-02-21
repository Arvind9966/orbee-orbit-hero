import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import DateSection from "@/components/sections/DateSection";
import QRDownloadSection from "@/components/sections/QRDownloadSection";
import Footer from "@/components/sections/Footer";

const Index = () => (
  <div className="bg-background overflow-hidden">
    <HeroSection />
    <GallerySection />
    <DateSection />
    <QRDownloadSection />
    <Footer />
  </div>
);

export default Index;
