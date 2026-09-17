import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Clock, HelpCircle, Trophy, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { quizzesPreview } from "@/data/quizzesPreview";

const QuizzesPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-sky/10 to-accent/10 py-16 md:py-24">
          <div className="eco-container text-center">
            <span className="text-7xl md:text-8xl mb-4 inline-block animate-bounce-slow">🧠</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("quizzesPage.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("quizzesPage.heroSubtitle")}
            </p>
          </div>
        </section>

        {/* Haqiqiy ishlaydigan viktorinaga banner */}
        <section className="eco-container -mt-4 relative z-10">
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-sm md:text-base font-medium">{t("quizzesPage.bannerText")}</p>
            </div>
            <Link to="/games/quiz">
              <Button className="whitespace-nowrap">
                <Trophy className="w-4 h-4" /> {t("quizzesPage.bannerCta")}
              </Button>
            </Link>
          </div>
        </section>

        <section className="eco-section">
          <div className="eco-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzesPreview.map((quiz) => (
                <article key={quiz.id} className="eco-card overflow-hidden group h-full flex flex-col opacity-90">
                  <div className={`bg-gradient-to-br ${quiz.color} p-8 text-center relative overflow-hidden`}>
                    <span className="text-7xl inline-block">{quiz.emoji}</span>
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-card/20" />
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-card/20" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {pick(quiz.title, language)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {pick(quiz.description, language)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        {quiz.questions} {t("quizzesPage.questions")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.time} {t("common.minutes")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {quiz.participants.toLocaleString()} {t("quizzesPage.participants")}
                      </span>
                      <Button variant="outline" size="sm" disabled>
                        {t("common.comingSoon")}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuizzesPage;
