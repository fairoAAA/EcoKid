import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Volume2, VolumeX, Sparkles, Award, RotateCcw, Trophy, Flame } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { getThematicQuizById, PersonalityOutcome } from "@/data/thematicQuizzes";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { EcoConfetti } from "@/components/common/EcoConfetti";
import { EcoCertificateModal } from "@/components/common/EcoCertificateModal";

const ThematicQuizPlayerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { isMuted, toggleMute, playCorrect, playWrong, playVictory, playLifeline } = useSoundEffects();

  const quiz = useMemo(() => getThematicQuizById(Number(id)), [id]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [usedLifeline, setUsedLifeline] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Personality test state: maps outcomeId -> count
  const [personalityTallies, setPersonalityTallies] = useState<Record<string, number>>({});
  const [winningOutcome, setWinningOutcome] = useState<PersonalityOutcome | null>(null);

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-6xl mb-4">🔍</span>
          <h1 className="font-display text-2xl font-bold mb-2">Viktorina topilmadi</h1>
          <p className="text-muted-foreground mb-6">Siz qidirgan viktorina mavjud emas yoki o'chirilgan.</p>
          <Button onClick={() => navigate("/quizzes")}>Viktorinalar ro'yxatiga qaytish</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = ((currentIndex + (showExplanation || quiz.type === "personality" ? 1 : 0)) / totalQuestions) * 100;

  // 50/50 Lifeline
  const handleUseLifeline = () => {
    if (usedLifeline || showExplanation || quiz.type !== "trivia" || currentQuestion.correct === undefined) return;
    playLifeline();
    setUsedLifeline(true);

    const incorrectIndices = [0, 1, 2, 3].filter((idx) => idx !== currentQuestion.correct);
    // Shuffle and pick 2 to hide
    const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  // Handle Answer Click
  const handleAnswerClick = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);

    if (quiz.type === "trivia") {
      setShowExplanation(true);
      const isCorrect = index === currentQuestion.correct;
      if (isCorrect) {
        playCorrect();
        setScore((s) => s + 1);
        setStreak((st) => {
          const next = st + 1;
          if (next > highestStreak) setHighestStreak(next);
          return next;
        });
      } else {
        playWrong();
        setStreak(0);
      }
    } else {
      // Personality quiz: tallies vote
      const outcomeId = currentQuestion.outcomeIds?.[index];
      if (outcomeId) {
        setPersonalityTallies((prev) => ({
          ...prev,
          [outcomeId]: (prev[outcomeId] || 0) + 1,
        }));
      }
      playCorrect();
      setTimeout(() => {
        handleNextQuestion({ ...personalityTallies, ...(outcomeId ? { [outcomeId]: (personalityTallies[outcomeId] || 0) + 1 } : {}) });
      }, 350);
    }
  };

  const handleNextQuestion = (latestTallies?: Record<string, number>) => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setHiddenOptions([]);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // Quiz Finished!
    setIsFinished(true);
    playVictory();

    if (quiz.type === "personality" && quiz.outcomes) {
      const talliesToEvaluate = latestTallies || personalityTallies;
      let topId = quiz.outcomes[0].id;
      let topCount = -1;
      Object.entries(talliesToEvaluate).forEach(([idKey, count]) => {
        if (count > topCount) {
          topCount = count;
          topId = idKey;
        }
      });
      const bestMatch = quiz.outcomes.find((o) => o.id === topId) || quiz.outcomes[0];
      setWinningOutcome(bestMatch);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setUsedLifeline(false);
    setHiddenOptions([]);
    setIsFinished(false);
    setPersonalityTallies({});
    setWinningOutcome(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-500/5 via-background to-sky-500/5">
      <Header />
      <EcoConfetti trigger={isFinished} />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Top Bar Navigation & Tools */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link to="/quizzes">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t("common.back")}
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              {quiz.type === "trivia" && streak >= 2 && !isFinished && (
                <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/30 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {streak}x seriya!
                </div>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className="w-9 h-9 rounded-full"
                title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-primary" />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {!isFinished && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                <span>
                  {pick(quiz.title, language)} · {currentIndex + 1}/{totalQuestions}
                </span>
                {quiz.type === "trivia" && (
                  <span className="text-primary font-bold">
                    To'g'ri: {score}
                  </span>
                )}
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Active Question or Completion Screen */}
          {isFinished ? (
            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 md:p-10 text-center shadow-xl animate-in zoom-in-95 duration-300">
              {quiz.type === "personality" && winningOutcome ? (
                <>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400/20 to-primary/20 flex items-center justify-center text-6xl mx-auto mb-4 border-4 border-amber-400">
                    {winningOutcome.emoji}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Sening natijang:
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                    {pick(winningOutcome.name, language)}
                  </h2>
                  <p className="text-muted-foreground text-base max-w-lg mx-auto mb-6 leading-relaxed">
                    {pick(winningOutcome.description, language)}
                  </p>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-sm text-emerald-800 dark:text-emerald-200 mb-8 max-w-md mx-auto text-left">
                    <strong className="block mb-1">💡 Eko-Maslahat:</strong>
                    {pick(winningOutcome.advice, language)}
                  </div>
                </>
              ) : (
                <>
                  <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-4 animate-bounce-slow" />
                  <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">
                    {score >= Math.ceil(totalQuestions * 0.7) ? "Barakalla! Ajoyib natija! 🎉" : "Yaxshi urinish! 🌿"}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Siz {totalQuestions} tadan <strong className="text-primary text-xl">{score}</strong> ta savolga to'g'ri javob berdingiz!
                  </p>
                  {highestStreak >= 2 && (
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full mb-6">
                      <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                      Eng uzun to'g'ri seriya: {highestStreak} ta
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Button variant="outline" onClick={handleRestart} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Qayta o'ynash
                </Button>

                <Button
                  onClick={() => setShowCertificate(true)}
                  className="gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold"
                >
                  <Award className="w-4 h-4" /> Eko-Sertifikat olish
                </Button>

                <Button onClick={() => navigate("/quizzes")}>
                  Boshqa viktorinalar
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl">
              {/* Question Header */}
              <div className="text-center mb-8">
                {currentQuestion.emoji && (
                  <span className="text-6xl inline-block mb-3 animate-bounce-slow">
                    {currentQuestion.emoji}
                  </span>
                )}
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {pick(currentQuestion.question, language)}
                </h2>
              </div>

              {/* 50/50 Lifeline Button (For trivia) */}
              {quiz.type === "trivia" && !showExplanation && (
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUseLifeline}
                    disabled={usedLifeline}
                    className="gap-1.5 text-xs font-bold border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    50/50 Maslahat {usedLifeline && "(Ishlatildi)"}
                  </Button>
                </div>
              )}

              {/* Options */}
              <div className="grid gap-3 mb-6">
                {currentQuestion.options.map((opt, idx) => {
                  if (hiddenOptions.includes(idx)) {
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border-2 border-dashed border-border/40 text-muted-foreground/30 text-center text-sm font-mono select-none"
                      >
                        — 50/50 orqali o'chirildi —
                      </div>
                    );
                  }

                  const isCorrect = idx === currentQuestion.correct;
                  const isSelected = idx === selectedAnswer;

                  let style = "border-border hover:border-primary/50 bg-background text-foreground";

                  if (showExplanation && quiz.type === "trivia") {
                    if (isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-bold";
                    else if (isSelected) style = "border-destructive bg-destructive/10 text-destructive";
                    else style = "border-border opacity-40";
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswerClick(idx)}
                      disabled={showExplanation}
                      className={`text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all flex items-center justify-between text-sm sm:text-base ${style}`}
                    >
                      <span>{pick(opt, language)}</span>
                      {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />}
                      {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {showExplanation && currentQuestion.explanation && (
                <div className="bg-muted/70 border border-border rounded-2xl p-4 mb-6 text-sm text-muted-foreground animate-in fade-in duration-200">
                  <strong className="block text-foreground mb-1">💡 Bilasizmi?</strong>
                  {pick(currentQuestion.explanation, language)}
                </div>
              )}

              {/* Next Button for Trivia */}
              {quiz.type === "trivia" && (
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!showExplanation}
                  onClick={() => handleNextQuestion()}
                >
                  {currentIndex < totalQuestions - 1 ? t("quizGame.nextQuestion") : t("quizGame.finishLevel")}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      <EcoCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        quizTitle={pick(quiz.title, language)}
        score={quiz.type === "trivia" ? score : totalQuestions}
        totalQuestions={totalQuestions}
        badgeEmoji={quiz.emoji}
      />

      <Footer />
    </div>
  );
};

export default ThematicQuizPlayerPage;
