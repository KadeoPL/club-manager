import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import News from "@/components/layout/News";
import MatchSection from "@/components/layout/MatchSection";
import StrategicPartnershipSection from "@/components/layout/StrategicPartnershipSection";

export default function Home() {
  return (
    <div className="w-full min-h-max">
      <Navbar />
      <HeroSection />
      <MatchSection />
      <News />
      <StrategicPartnershipSection />
    </div>
  );
}
