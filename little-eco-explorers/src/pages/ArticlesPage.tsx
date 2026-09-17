import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles, ArticleCategory } from "@/data/articles";

const ArticlesPage = () => {
  const { language, t } = useLanguage();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);
  const [searchParams, setSearchParams] = useSearchParams();

  const categories: { value: ArticleCategory | "all"; label: string }[] = [
    { value: "all", label: t("articlesPage.categoryAll") },
    { value: "animals", label: t("category.animals") },
    { value: "plants", label: t("category.plants") },
    { value: "experiments", label: t("category.experiments") },
    { value: "tips", label: t("category.tips") },
  ];

  const activeCategory = (searchParams.get("category") as ArticleCategory | "all") || "all";
  const setActiveCategory = (cat: ArticleCategory | "all") => {
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredArticles = activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-accent/10 py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl md:text-8xl mb-4 inline-block animate-bounce-slow">📚</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("articlesPage.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("articlesPage.heroSubtitle")}
            </p>
          </div>
        </section>

        <section className="py-8 border-b border-border">
          <div className="eco-container">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={activeCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.value)}
                  className="flex-shrink-0"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="eco-section">
          <div className="eco-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`}>
                  <article className="eco-card overflow-hidden group h-full">
                    <div className="bg-muted p-8 flex items-center justify-center">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {article.emoji}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                        {t(`category.${article.category}` as "category.animals")}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pick(article.title, language)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {pick(article.excerpt, language)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {article.rating}
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

export default ArticlesPage;
