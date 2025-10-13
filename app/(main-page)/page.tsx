import HeroSection from "@/components/main-page-layout/HeroSection";
import News from "@/components/main-page-layout/News";
import MatchSection from "@/components/main-page-layout/MatchSection";
import StrategicPartnershipSection from "@/components/main-page-layout/StrategicPartnershipSection";
import LeagueTable from "@/components/main-page-ui/LeagueTable";
import SponsorsSection from "@/components/main-page-layout/SponsorsSection";
import Footer from "@/components/main-page-layout/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-max">
      <HeroSection />
      <MatchSection />
      <News />
      <StrategicPartnershipSection />
      <LeagueTable />
      <SponsorsSection />
      <Footer />
    </div>
  );
}
