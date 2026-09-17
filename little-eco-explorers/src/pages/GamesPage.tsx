import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Star, Clock, Gamepad2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { gamesList } from "@/data/gamesList";

const difficultyKey = { easy: "gamesPage.difficulty.easy", medium: "gamesPage.difficulty.medium", hard: "gamesPage.difficulty.hard" } as const;

const GamesPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-sky/10 py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl md:text-8xl mb-4 inline-block animate-bounce-slow">🎮</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("gamesPage.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("gamesPage.heroSubtitle")}
            </p>
          </div>
        </section>

        <section className="eco-section">
          <div className="eco-container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" />
              {t("gamesPage.playNow")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {gamesList.filter((g) => g.playable).map((game) => (
                <Link key={game.id} to={game.href}>
                  <article className="eco-card p-6 text-center group h-full flex flex-col hover:shadow-glow">
                    <div className={`${game.color} w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-5xl group-hover:scale-125 transition-transform duration-300">
                        {game.emoji}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {pick(game.title, language)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {pick(game.description, language)}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {t(difficultyKey[game.difficulty])}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {game.time === "∞" ? "∞" : `${game.time} ${t("common.minutes")}`}
                      </span>
                    </div>
                    <Button variant="accent" className="w-full group-hover:shadow-glow">
                      <Gamepad2 className="w-4 h-4" />
                      {t("gamesPage.play")}
                    </Button>
                  </article>
                </Link>
              ))}
            </div>

            {gamesList.some((g) => !g.playable) && (
              <>
                <h2 className="font-display text-2xl font-bold text-muted-foreground mb-6">
                  {t("gamesPage.comingSoonHeading")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                  {gamesList.filter((g) => !g.playable).map((game) => (
                    <article key={game.id} className="eco-card p-6 text-center h-full flex flex-col">
                      <div className={`${game.color} w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                        <span className="text-4xl">{game.emoji}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {pick(game.title, language)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {pick(game.description, language)}
                      </p>
                      <Button variant="outline" disabled className="w-full">
                        {t("common.comingSoon")}
                      </Button>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GamesPage;
