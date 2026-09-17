import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const slides: { titleKey: TranslationKey; subtitleKey: TranslationKey; emoji: string; bgClass: string }[] = [
  { titleKey: "hero.slide1.title", subtitleKey: "hero.slide1.subtitle", emoji: "🌍", bgClass: "from-primary/20 via-sky/20 to-accent/20" },
  { titleKey: "hero.slide2.title", subtitleKey: "hero.slide2.subtitle", emoji: "🦊", bgClass: "from-orange/20 via-accent/20 to-primary/20" },
  { titleKey: "hero.slide3.title", subtitleKey: "hero.slide3.subtitle", emoji: "🎮", bgClass: "from-sky/20 via-primary/20 to-accent/20" },
  { titleKey: "hero.slide4.title", subtitleKey: "hero.slide4.subtitle", emoji: "♻️", bgClass: "from-primary/20 via-accent/20 to-sky/20" },
  { titleKey: "hero.slide5.title", subtitleKey: "hero.slide5.subtitle", emoji: "🌱", bgClass: "from-accent/20 via-primary/20 to-sky/20" },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgClass} transition-all duration-700`} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/30 animate-float" />
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-sky/30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-orange/30 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="eco-container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl md:text-8xl lg:text-9xl mb-6 animate-bounce-slow">{slide.emoji}</div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-4 leading-tight">
            {t(slide.titleKey)}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t(slide.subtitleKey)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/articles">
              <Button variant="hero" size="xl">
                <Sparkles className="w-5 h-5" />
                {t("hero.ctaLearn")}
              </Button>
            </Link>
            <Link to="/games/quiz">
              <Button variant="outline" size="xl" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                {t("hero.ctaQuiz")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <Button variant="ghost" size="icon" onClick={prevSlide} className="rounded-full bg-card/50 hover:bg-card">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={nextSlide} className="rounded-full bg-card/50 hover:bg-card">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
