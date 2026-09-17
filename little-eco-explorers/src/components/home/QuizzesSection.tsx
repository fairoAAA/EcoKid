import { Link } from "react-router-dom";
import { ArrowRight, Clock, HelpCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { quizzesPreview } from "@/data/quizzesPreview";

export const QuizzesSection = () => {
  const { language, t } = useLanguage();
  // Bosh sahifada faqat birinchi 3 tasi "vitrina" sifatida ko'rsatiladi;
  // "Testni boshlash" endi haqiqatan ishlaydigan /games/quiz'ga olib boradi
  // (avval har biri mavjud bo'lmagan /quizzes/:slug'ga buzilgan havola edi).
  const featured = quizzesPreview.slice(0, 3);

  return (
    <section className="eco-section bg-muted/50">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t("home.quizzes.heading")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("home.quizzes.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((quiz) => (
            <Link key={quiz.id} to="/games/quiz">
              <article className="eco-card overflow-hidden group h-full">
                <div className={`bg-gradient-to-br ${quiz.color} p-8 text-center relative overflow-hidden`}>
                  <span className="text-7xl inline-block group-hover:animate-wiggle">{quiz.emoji}</span>
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-card/20" />
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-card/20" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {pick(quiz.title, language)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{pick(quiz.description, language)}</p>
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
                  <Button variant="accent" className="w-full group-hover:shadow-glow">
                    <Trophy className="w-4 h-4" />
                    {t("home.quizzes.start")}
                  </Button>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/quizzes">
            <Button variant="outline" size="lg">
              {t("common.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
