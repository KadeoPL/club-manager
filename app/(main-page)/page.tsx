import HeroSection from "@/components/main-page-layout/HeroSection";
import News from "@/components/main-page-layout/News";
import StrategicPartnershipSection from "@/components/main-page-layout/StrategicPartnershipSection";
import SponsorsSection from "@/components/main-page-layout/SponsorsSection";
import Footer from "@/components/main-page-layout/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-max">
      <HeroSection />
      <News />
      <StrategicPartnershipSection />
      <SponsorsSection />
      <Footer />
    </div>
  );
}
