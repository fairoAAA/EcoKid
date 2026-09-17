import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const BirdRescueGamePage = () => {
  const { language, t } = useLanguage();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("ecokids:bird:highScore") || 0);
    } catch {
      return 0;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdRef = useRef({ y: 200, velocity: 0 });
  const pipesRef = useRef<{ x: number; y: number; passed: boolean }[]>([]);
  const requestRef = useRef<number>();

  const texts = {
    title: { uz: "Qushchani qutqar", ru: "Спаси птенца", en: "Rescue the Chick" },
    subtitle: {
      uz: "Ekranga bosib qushchani uchiring va plastik chiqindilardan ehtiyot bo'ling!",
      ru: "Нажимай на экран, чтобы птенец взлетал, и избегай пластикового мусора!",
      en: "Tap the screen to flap the bird and avoid plastic waste!",
    },
    score: { uz: "Ball", ru: "Счёт", en: "Score" },
    best: { uz: "Eng yaxshi", ru: "Рекорд", en: "Best" },
    gameOver: { uz: "O'yin tugadi!", ru: "Игра окончена!", en: "Game Over!" },
    passedMsg: {
      uz: (s: number) => `Siz ${s} ta to'siqdan o'tdingiz!`,
      ru: (s: number) => `Вы преодолели ${s} препятствий!`,
      en: (s: number) => `You passed ${s} obstacles!`,
    },
    start: { uz: "Boshlash", ru: "Начать", en: "Start" },
    restart: { uz: "Qayta o'ynash", ru: "Играть снова", en: "Play Again" },
    back: { uz: "O'yinlarga qaytish", ru: "Назад к играм", en: "Back to games" },
    tapToFly: { uz: "Uchish uchun bosing", ru: "Нажмите для полёта", en: "Tap to fly" },
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    pipesRef.current = [];
    birdRef.current = { y: 200, velocity: 0 };
  };

  const jump = () => {
    if (isPlaying) {
      birdRef.current.velocity = -6;
    }
  };

  const gameLoop = useCallback(() => {
    if (!isPlaying || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;

    ctx.clearRect(0, 0, cw, ch);

    // Sky gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
    bgGrad.addColorStop(0, "#bae6fd");
    bgGrad.addColorStop(1, "#f0fdf4");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cw, ch);

    // Bird physics
    birdRef.current.velocity += 0.28;
    birdRef.current.y += birdRef.current.velocity;

    // Draw bird
    ctx.font = "32px serif";
    ctx.fillText("🐦", 45, birdRef.current.y);

    // Obstacles
    if (
      Math.random() < 0.015 &&
      (pipesRef.current.length === 0 || pipesRef.current[pipesRef.current.length - 1].x < cw - 180)
    ) {
      pipesRef.current.push({ x: cw, y: Math.random() * (ch - 140) + 60, passed: false });
    }

    for (let i = pipesRef.current.length - 1; i >= 0; i--) {
      const p = pipesRef.current[i];
      p.x -= 2.8;

      ctx.font = "28px serif";
      ctx.fillText("🛍️", p.x, p.y);

      // Collision
      if (
        p.x < 75 &&
        p.x + 25 > 45 &&
        birdRef.current.y > p.y - 25 &&
        birdRef.current.y < p.y + 25
      ) {
        setGameOver(true);
        setIsPlaying(false);
      }

      if (!p.passed && p.x < 45) {
        p.passed = true;
        setScore((prev) => {
          const next = prev + 1;
          if (next > highScore) {
            setHighScore(next);
            try {
              localStorage.setItem("ecokids:bird:highScore", String(next));
            } catch (err) {
              void err;
            }
          }
          return next;
        });
      }

      if (p.x < -40) pipesRef.current.splice(i, 1);
    }

    if (birdRef.current.y > ch - 10 || birdRef.current.y < 10) {
      setGameOver(true);
      setIsPlaying(false);
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, highScore]);

  useEffect(() => {
    if (isPlaying) requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameLoop]);

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/50">
      <Header />
      <main className="flex-1 py-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-xl mb-4 flex items-center justify-between">
          <Link to="/games">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {texts.back[language] || texts.back.uz}
            </Button>
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold text-foreground">
            <span>
              {texts.score[language]}: <strong className="text-primary text-base">{score}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              {texts.best[language]}: <strong className="text-amber-600">{highScore}</strong>
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <span>🐦</span> {texts.title[language]}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {texts.subtitle[language]}
          </p>
        </div>

        <div
          className="relative bg-sky-100 border-4 border-sky-300 rounded-2xl overflow-hidden shadow-xl max-w-full cursor-pointer select-none"
          onClick={jump}
        >
          <canvas ref={canvasRef} width={380} height={420} className="block max-w-full" />

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
              {gameOver ? (
                <>
                  <span className="text-5xl mb-2">😢</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.gameOver[language]}</h2>
                  <p className="text-sky-100 mb-4">{texts.passedMsg[language](score)}</p>
                </>
              ) : (
                <>
                  <span className="text-5xl mb-2">🌿</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.title[language]}</h2>
                  <p className="text-sky-100 text-sm mb-4 max-w-xs">{texts.subtitle[language]}</p>
                </>
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                size="lg"
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold gap-2 shadow-lg"
              >
                {gameOver ? (
                  <>
                    <RotateCcw className="w-4 h-4" /> {texts.restart[language]}
                  </>
                ) : (
                  texts.start[language]
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BirdRescueGamePage;
