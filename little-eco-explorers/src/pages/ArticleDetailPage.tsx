import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { Eye, Star, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles } from "@/data/articles";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <span className="text-6xl mb-4 inline-block">🍂</span>
            <h1 className="font-display text-2xl font-bold mb-2">{t("articleDetail.notFoundTitle")}</h1>
            <p className="text-muted-foreground mb-6">{t("articleDetail.notFoundDesc")}</p>
            <Link to="/articles" className="text-primary hover:underline font-semibold">
              {t("articleDetail.backToArticles")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="eco-container">
            <Link to="/articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t("articleDetail.backToArticles")}
            </Link>
            <div className="text-center">
              <span className="text-7xl md:text-8xl mb-4 inline-block">{article.emoji}</span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {pick(article.title, language)}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                {pick(article.excerpt, language)}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {article.views.toLocaleString()} {t("common.views")}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" /> {article.rating} {t("common.rating")}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="eco-section">
          <div className="eco-container max-w-2xl mx-auto space-y-5 text-foreground/90 leading-relaxed text-lg">
            {article.body.map((paragraph, i) => (
              <p key={i}>{pick(paragraph, language)}</p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
