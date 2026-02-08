import BestSellersSection from "@/components/landing-page/BestSellersSection";
import CategoriesSection from "@/components/landing-page/CategoriesSection";
import HeroSection from "@/components/landing-page/HeroSection";
import PetalRain from "@/components/landing-page/PetalRain";
import WhyChoosePhoolPatta from "@/components/landing-page/WhyChoosePhoolPatta";


export default function Home() {
  return (
  <>
    
    <PetalRain/>
    <HeroSection />
    <CategoriesSection />
    <BestSellersSection />
    <WhyChoosePhoolPatta />
    
    </>
  );
}
