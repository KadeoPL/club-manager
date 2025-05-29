import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import News from "@/components/layout/News";

export default function Home() {
  return (
    <div className="w-full min-h-max">
      <Navbar />
      <HeroSection />
      <News />
    </div>
  );
}
