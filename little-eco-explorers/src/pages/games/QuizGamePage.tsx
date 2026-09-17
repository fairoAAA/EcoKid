import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Lock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { quizQuestions as baseQuizQuestions, chunkIntoLevels } from "@/data/quizQuestions";

const QuizGamePage = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { data: allQuestions } = useOverlayData("ecokids:overlay:quizQuestions", baseQuizQuestions);

  // Darajalar endi doim 10 ta deb FARAZ QILINMAYDI - haqiqiy massiv
  // uzunligidan dinamik hisoblanadi (admin savol qo'shsa/o'chirsa ham
  // ishlayveradi).
  const levels = useMemo(() => chunkIntoLevels(allQuestions, 10), [allQuestions]);

  const [currentLevel, setCurrentLevel] = useLocalStorage("ecokids:quiz:currentLevel", 0);
  const [completedLevels, setCompletedLevels] = useLocalStorage<number[]>("ecokids:quiz:completedLevels", []);
  const [bestScore, setBestScore] = useLocalStorage("ecokids:quiz:bestScore", 0);

  const [currentQuestionInLevel, setCurrentQuestionInLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelResult, setLevelResult] = useState<"passed" | "failed" | null>(null);

  const activeLevel = levels[currentLevel] ?? [];
  const currentQuestion = activeLevel[currentQuestionInLevel];
  const levelSize = activeLevel.length;
  const passThreshold = Math.ceil(levelSize * 0.7);

  const handleAnswer = (index: number) => {
    if (showExplanation || !currentQuestion) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuestion.correct) {
      setScore((prev) => prev + 1);
      setCorrectInLevel((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestionInLevel < levelSize - 1) {
      setCurrentQuestionInLevel((prev) => prev + 1);
      return;
    }

    // Bosqich tugadi
    const passed = correctInLevel >= passThreshold;
    setLevelResult(passed ? "passed" : "failed");
    if (passed && !completedLevels.includes(currentLevel)) {
      setCompletedLevels([...completedLevels, currentLevel]);
    }
    if (score > bestScore) setBestScore(score);
  };

  const startLevel = (levelIndex: number) => {
    if (levelIndex !== 0 && !completedLevels.includes(levelIndex - 1)) return;
    setCurrentLevel(levelIndex);
    setCurrentQuestionInLevel(0);
    setCorrectInLevel(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setLevelResult(null);
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      startLevel(currentLevel + 1);
    }
  };

  const progressPercent = levelSize > 0 ? ((currentQuestionInLevel + (showExplanation ? 1 : 0)) / levelSize) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky/10 via-background to-primary/10">
      <div className="eco-container py-6 md:py-10">
        <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("common.back")}
        </Link>

        {/* Bosqichlar paneli */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {levels.map((_, idx) => {
            const unlocked = idx === 0 || completedLevels.includes(idx - 1);
            const done = completedLevels.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => unlocked && startLevel(idx)}
                disabled={!unlocked}
                className={`w-11 h-11 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                  idx === currentLevel
                    ? "bg-primary text-primary-foreground scale-110 shadow-glow"
                    : done
                    ? "bg-accent text-accent-foreground"
                    : unlocked
                    ? "bg-card border-2 border-primary/30 text-foreground hover:border-primary"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {unlocked ? (done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1) : <Lock className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        {!currentQuestion ? (
          <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-3xl p-10 shadow-xl">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-3">{t("quizGame.allLevelsDone")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("quizGame.correctCount")}: {bestScore} / {allQuestions.length}
            </p>
            <Button onClick={() => navigate("/games")}>{t("common.back")}</Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm font-semibold text-muted-foreground">
              <span>
                {t("quizGame.level")} {currentLevel + 1} · {t("quizGame.question")} {currentQuestionInLevel + 1}/{levelSize}
              </span>
              <span>
                {t("quizGame.correctCount")}: {correctInLevel}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>

            {levelResult ? (
              <div className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center shadow-xl">
                <span className="text-6xl mb-4 inline-block">{levelResult === "passed" ? "🎉" : "😔"}</span>
                <h2 className="font-display text-2xl font-bold mb-2">
                  {correctInLevel} / {levelSize}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {levelResult === "passed" ? t("quizGame.levelPassed") : t("quizGame.levelFailed")}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button variant="outline" onClick={() => startLevel(currentLevel)}>
                    {t("recycle.restart")}
                  </Button>
                  {levelResult === "passed" && currentLevel + 1 < levels.length && (
                    <Button onClick={goToNextLevel}>{t("quizGame.nextQuestion")} →</Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl">
                <div className="text-center mb-6">
                  <span className="text-6xl inline-block mb-3">{currentQuestion.emoji}</span>
                  <h2 className="font-display text-xl md:text-2xl font-bold">{pick(currentQuestion.question, language)}</h2>
                </div>

                <div className="grid gap-3 mb-6">
                  {currentQuestion.options.map((opt, idx) => {
                    const isCorrect = idx === currentQuestion.correct;
                    const isSelected = idx === selectedAnswer;
                    let style = "border-border hover:border-primary/50 bg-background";
                    if (showExplanation) {
                      if (isCorrect) style = "border-green-500 bg-green-500/10";
                      else if (isSelected) style = "border-destructive bg-destructive/10";
                      else style = "border-border opacity-50";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={showExplanation}
                        className={`text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all flex items-center justify-between ${style}`}
                      >
                        {pick(opt, language)}
                        {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />}
                        {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="bg-muted/60 rounded-2xl p-4 mb-6 text-sm text-muted-foreground">
                    💡 {pick(currentQuestion.explanation, language)}
                  </div>
                )}

                <Button className="w-full" size="lg" disabled={!showExplanation} onClick={handleNext}>
                  {currentQuestionInLevel < levelSize - 1 ? t("quizGame.nextQuestion") : t("quizGame.finishLevel")}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGamePage;
