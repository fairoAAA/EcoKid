import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Lock, Trophy, Volume2, VolumeX, Sparkles, Award, RotateCcw, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { quizQuestions as baseQuizQuestions, chunkIntoLevels } from "@/data/quizQuestions";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { EcoConfetti } from "@/components/common/EcoConfetti";
import { EcoCertificateModal } from "@/components/common/EcoCertificateModal";

const QuizGamePage = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { isMuted, toggleMute, playCorrect, playWrong, playVictory, playLifeline } = useSoundEffects();
  const { data: allQuestions } = useOverlayData("ecokids:overlay:quizQuestions", baseQuizQuestions);

  const levels = useMemo(() => chunkIntoLevels(allQuestions, 10), [allQuestions]);

  const [currentLevel, setCurrentLevel] = useLocalStorage("ecokids:quiz:currentLevel", 0);
  const [completedLevels, setCompletedLevels] = useLocalStorage<number[]>("ecokids:quiz:completedLevels", []);
  const [bestScore, setBestScore] = useLocalStorage("ecokids:quiz:bestScore", 0);

  const [currentQuestionInLevel, setCurrentQuestionInLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelResult, setLevelResult] = useState<"passed" | "failed" | null>(null);
  const [usedLifeline, setUsedLifeline] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const activeLevel = levels[currentLevel] ?? [];
  const currentQuestion = activeLevel[currentQuestionInLevel];
  const levelSize = activeLevel.length;
  const passThreshold = Math.ceil(levelSize * 0.7);

  const handleUseLifeline = () => {
    if (usedLifeline || showExplanation || !currentQuestion) return;
    playLifeline();
    setUsedLifeline(true);
    const incorrectIndices = [0, 1, 2, 3].filter((idx) => idx !== currentQuestion.correct);
    const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  const handleAnswer = (index: number) => {
    if (showExplanation || !currentQuestion) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === currentQuestion.correct) {
      playCorrect();
      setScore((prev) => prev + 1);
      setCorrectInLevel((prev) => prev + 1);
      setStreak((s) => s + 1);
    } else {
      playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setHiddenOptions([]);

    if (currentQuestionInLevel < levelSize - 1) {
      setCurrentQuestionInLevel((prev) => prev + 1);
      return;
    }

    // Bosqich tugadi
    const passed = correctInLevel >= passThreshold;
    setLevelResult(passed ? "passed" : "failed");

    if (passed) {
      playVictory();
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }
    } else {
      playWrong();
    }

    if (score + (correctInLevel >= passThreshold ? 0 : 0) > bestScore) {
      setBestScore(score);
    }
  };

  const startLevel = (levelIndex: number) => {
    if (levelIndex !== 0 && !completedLevels.includes(levelIndex - 1)) return;
    setCurrentLevel(levelIndex);
    setCurrentQuestionInLevel(0);
    setCorrectInLevel(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setLevelResult(null);
    setUsedLifeline(false);
    setHiddenOptions([]);
    setStreak(0);
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      startLevel(currentLevel + 1);
    }
  };

  const progressPercent = levelSize > 0 ? ((currentQuestionInLevel + (showExplanation ? 1 : 0)) / levelSize) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500/10 via-background to-primary/10">
      <EcoConfetti trigger={levelResult === "passed" || completedLevels.length === levels.length} />

      <div className="eco-container py-6 md:py-10">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("common.back")}
          </Link>

          <div className="flex items-center gap-3">
            {streak >= 2 && !levelResult && (
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

        {/* Bosqichlar paneli */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-8">
          {levels.map((_, idx) => {
            const unlocked = idx === 0 || completedLevels.includes(idx - 1);
            const done = completedLevels.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => unlocked && startLevel(idx)}
                disabled={!unlocked}
                className={`w-11 h-11 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${
                  idx === currentLevel
                    ? "bg-primary text-primary-foreground scale-110 shadow-glow"
                    : done
                    ? "bg-emerald-500 text-white shadow-sm"
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
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce-slow" />
            <h2 className="font-display text-2xl font-bold mb-3">{t("quizGame.allLevelsDone")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("quizGame.correctCount")}: {bestScore} / {allQuestions.length}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => setShowCertificate(true)} className="gap-2 bg-amber-600 hover:bg-amber-500 text-white">
                <Award className="w-4 h-4" /> Eko-Sertifikat olish
              </Button>
              <Button variant="outline" onClick={() => navigate("/games")}>{t("common.back")}</Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm font-semibold text-muted-foreground">
              <span>
                {t("quizGame.level")} {currentLevel + 1} · {t("quizGame.question")} {currentQuestionInLevel + 1}/{levelSize}
              </span>
              <span className="text-primary font-bold">
                {t("quizGame.correctCount")}: {correctInLevel}
              </span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>

            {levelResult ? (
              <div className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center shadow-xl animate-in zoom-in-95 duration-200">
                <span className="text-6xl mb-4 inline-block">{levelResult === "passed" ? "🎉" : "😔"}</span>
                <h2 className="font-display text-2xl font-bold mb-2">
                  {correctInLevel} / {levelSize}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {levelResult === "passed" ? t("quizGame.levelPassed") : t("quizGame.levelFailed")}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button variant="outline" onClick={() => startLevel(currentLevel)} className="gap-2">
                    <RotateCcw className="w-4 h-4" /> {t("recycle.restart")}
                  </Button>
                  {levelResult === "passed" && (
                    <Button onClick={() => setShowCertificate(true)} className="gap-2 bg-amber-600 hover:bg-amber-500 text-white">
                      <Award className="w-4 h-4" /> Sertifikat olish
                    </Button>
                  )}
                  {levelResult === "passed" && currentLevel + 1 < levels.length && (
                    <Button onClick={goToNextLevel}>{t("quizGame.nextQuestion")} →</Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl">
                <div className="text-center mb-6">
                  <span className="text-6xl inline-block mb-3 animate-bounce-slow">{currentQuestion.emoji}</span>
                  <h2 className="font-display text-xl md:text-2xl font-bold">{pick(currentQuestion.question, language)}</h2>
                </div>

                {/* 50/50 Lifeline Button */}
                {!showExplanation && (
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
                    let style = "border-border hover:border-primary/50 bg-background";
                    if (showExplanation) {
                      if (isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-bold";
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
                        {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />}
                        {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="bg-muted/60 border border-border rounded-2xl p-4 mb-6 text-sm text-muted-foreground animate-in fade-in duration-200">
                    <strong className="block text-foreground mb-1">💡 Bilasizmi?</strong>
                    {pick(currentQuestion.explanation, language)}
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

      <EcoCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        quizTitle={`Eko-Viktorina: ${currentLevel + 1}-Bosqich`}
        score={correctInLevel}
        totalQuestions={levelSize}
        badgeEmoji="🏆"
      />
    </div>
  );
};

export default QuizGamePage;
