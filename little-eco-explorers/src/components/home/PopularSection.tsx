import { Link } from "react-router-dom";
import { ArrowRight, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles } from "@/data/articles";

export const PopularSection = () => {
  const { language, t } = useLanguage();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);
  const popularItems = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <section className="eco-section">
      <div className="eco-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("home.popular.heading")}
            </h2>
            <p className="text-muted-foreground">{t("home.popular.subheading")}</p>
          </div>
          <Link to="/articles" className="hidden md:block">
            <Button variant="ghost">
              {t("common.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <Link key={item.slug} to={`/articles/${item.slug}`}>
              <article className="eco-card overflow-hidden group h-full">
                <div className="bg-muted p-8 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground mb-3">
                    {t(`category.${item.category}` as "category.animals")}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {pick(item.title, language)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {pick(item.excerpt, language)}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/articles">
            <Button variant="outline">
              {t("common.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
