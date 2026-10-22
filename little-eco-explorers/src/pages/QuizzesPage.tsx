import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Clock, HelpCircle, Trophy, Users, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { quizzesPreview } from "@/data/quizzesPreview";
import { DailyEcoChallenges } from "@/components/home/DailyEcoChallenges";

const QuizzesPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-sky/10 to-accent/10 py-16 md:py-20">
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

        {/* Grand Eco-Quiz Featured Banner */}
        <section className="eco-container -mt-6 relative z-10 mb-10">
          <div className="bg-card border-2 border-primary/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl bg-gradient-to-r from-primary/10 via-card to-accent/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl flex-shrink-0">
                🏆
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Katta Eko-Chempionat</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                  70 ta Savol, 7 ta Bosqichli Bosh Eko-Viktorina!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Barcha bosqichlardan o'tib, oliy toifali Tabiat Chempioni unvoniga sazovor bo'l!
                </p>
              </div>
            </div>
            <Link to="/games/quiz" className="flex-shrink-0 w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto gap-2 shadow-glow">
                <Trophy className="w-5 h-5" /> Viktorinani Boshlash
              </Button>
            </Link>
          </div>
        </section>

        {/* Daily Eco Challenges Widget */}
        <section className="eco-container mb-12">
          <DailyEcoChallenges />
        </section>

        {/* Thematic Quizzes Grid */}
        <section className="eco-section pt-0">
          <div className="eco-container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                  <span>✨</span> Mavzuli Viktorinalar va Testlar
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  O'zing qiziqqan mavzuni tanla va darhol o'ynashni boshla!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzesPreview.map((quiz) => (
                <Link
                  key={quiz.id}
                  to={`/quizzes/${quiz.id}`}
                  className="group block h-full"
                >
                  <article className="eco-card overflow-hidden h-full flex flex-col border-2 hover:border-primary transition-all duration-300 hover:shadow-glow group-hover:-translate-y-1">
                    <div className={`bg-gradient-to-br ${quiz.color} p-8 text-center relative overflow-hidden`}>
                      <span className="text-7xl inline-block group-hover:scale-110 transition-transform duration-300">
                        {quiz.emoji}
                      </span>
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-card/20" />
                      <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-card/20" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pick(quiz.title, language)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {pick(quiz.description, language)}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-4 h-4" />
                          {quiz.questions} {t("quizzesPage.questions")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {quiz.time} {t("common.minutes")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/80">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          {quiz.participants.toLocaleString()} {t("quizzesPage.participants")}
                        </span>
                        <Button size="sm" className="gap-1.5 group-hover:shadow-glow">
                          <Play className="w-3.5 h-3.5" />
                          {t("quizzesPage.start")}
                        </Button>
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

export default QuizzesPage;
