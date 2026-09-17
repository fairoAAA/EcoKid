import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { baseArticles, ArticleCategory } from "@/data/articles";

const categoryMeta: { key: ArticleCategory; emoji: string; color: string }[] = [
  { key: "animals", emoji: "🦁", color: "bg-orange/20" },
  { key: "plants", emoji: "🌿", color: "bg-primary/20" },
  { key: "experiments", emoji: "🔬", color: "bg-sky/20" },
  { key: "tips", emoji: "♻️", color: "bg-accent/20" },
];

export const CategoriesSection = () => {
  const { language, t } = useLanguage();
  const { data: articles } = useOverlayData("ecokids:overlay:articles", baseArticles);

  return (
    <section className="eco-section bg-muted/30">
      <div className="eco-container">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("home.categories.heading")}
          </h2>
          <p className="text-muted-foreground">{t("home.categories.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryMeta.map((cat) => {
            const items = articles.filter((a) => a.category === cat.key).slice(0, 3);
            return (
              <div key={cat.key} className="eco-card p-5">
                <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {cat.emoji}
                </div>
                <h3 className="font-display text-lg font-bold mb-3">{t(`category.${cat.key}` as "category.animals")}</h3>
                <ul className="space-y-2 mb-4">
                  {items.map((a) => (
                    <li key={a.slug}>
                      <Link to={`/articles/${a.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1">
                        {pick(a.title, language)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/articles?category=${cat.key}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {t("home.categories.viewAll")}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
