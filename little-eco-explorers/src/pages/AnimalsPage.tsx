import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Eye, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles } from "@/data/articles";

const AnimalsPage = () => {
  const { language, t } = useLanguage();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);
  const animals = articles.filter((a) => a.category === "animals");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-orange/10 py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl md:text-8xl mb-4 inline-block animate-bounce-slow">🦁</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("animalsPage.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("animalsPage.heroSubtitle")}
            </p>
          </div>
        </section>

        <section className="eco-section">
          <div className="eco-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animals.map((animal) => (
                <Link key={animal.slug} to={`/articles/${animal.slug}`}>
                  <article className="eco-card overflow-hidden group h-full">
                    <div className="bg-orange/10 p-8 flex items-center justify-center">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {animal.emoji}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pick(animal.title, language)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {pick(animal.excerpt, language)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {animal.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {animal.rating}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnimalsPage;
