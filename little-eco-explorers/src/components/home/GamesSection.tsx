import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { gamesList } from "@/data/gamesList";

export const GamesSection = () => {
  const { language, t } = useLanguage();
  // Diqqat: ilgari bu bolim mustaqil, butunlay buzilgan havolalar
  // royxatiga ega edi (/games/sorting, /games/bird-rescue va h.k. -
  // ularning hech biri App.tsx'da mavjud emas edi). Endi u GamesPage
  // bilan bitta manbadan (gamesList) foydalanadi.
  const featured = gamesList.filter((g) => g.playable).slice(0, 3);

  return (
    <section className="eco-section">
      <div className="eco-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("home.games.heading")}
            </h2>
            <p className="text-muted-foreground">{t("home.games.subheading")}</p>
          </div>
          <Link to="/games" className="hidden md:block">
            <Button variant="ghost">
              {t("common.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((game) => (
            <Link key={game.id} to={game.href}>
              <article className="eco-card p-6 text-center group h-full hover:shadow-glow">
                <div className={`${game.color} w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{game.emoji}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pick(game.title, language)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{pick(game.description, language)}</p>
                <Button variant="accent" size="sm" className="w-full">
                  <Gamepad2 className="w-4 h-4" />
                  {t("gamesPage.play")}
                </Button>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/games">
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
