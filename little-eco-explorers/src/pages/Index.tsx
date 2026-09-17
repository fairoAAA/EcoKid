import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularSection } from "@/components/home/PopularSection";
import { QuizzesSection } from "@/components/home/QuizzesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { GamesSection } from "@/components/home/GamesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularSection />
        <QuizzesSection />
        <CategoriesSection />
        <GamesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
