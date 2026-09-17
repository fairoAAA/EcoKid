import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle, RotateCcw, Trophy } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const OceanCleanerGamePage = () => {
  const { language } = useLanguage();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("ecokids:ocean:highScore") || 0);
    } catch {
      return 0;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boatRef = useRef({ x: 170, y: 350, width: 60, height: 35 });
  const trashesRef = useRef<{ x: number; y: number; type: string; speed: number }[]>([]);
  const requestRef = useRef<number>();

  const texts = {
    title: { uz: "Okean tozalovchi", ru: "Очиститель океана", en: "Ocean Cleaner" },
    subtitle: {
      uz: "Qayiqni harakatlantirib, suvga tushayotgan plastik chiqindilarni tutib oling!",
      ru: "Управляйте лодкой и ловите падающий пластиковый мусор!",
      en: "Steer the boat and catch the falling plastic waste!",
    },
    score: { uz: "Ball", ru: "Счёт", en: "Score" },
    best: { uz: "Eng yaxshi", ru: "Рекорд", en: "Best" },
    gameOver: { uz: "O'yin tugadi!", ru: "Игра окончена!", en: "Game Over!" },
    caughtMsg: {
      uz: (s: number) => `Siz ${s / 10} ta plastik chiqindini tozalab, okeanni asrab qoldingiz!`,
      ru: (s: number) => `Вы собрали ${s / 10} единиц пластика и спасли океан!`,
      en: (s: number) => `You collected ${s / 10} plastic items and saved the ocean!`,
    },
    start: { uz: "Boshlash", ru: "Начать", en: "Start" },
    restart: { uz: "Qayta o'ynash", ru: "Играть снова", en: "Play Again" },
    back: { uz: "O'yinlarga qaytish", ru: "Назад к играм", en: "Back to games" },
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    trashesRef.current = [];
    boatRef.current.x = 170;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isPlaying || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    boatRef.current.x = Math.max(0, Math.min(x - boatRef.current.width / 2, canvasRef.current.width - boatRef.current.width));
  };

  const nudgeBoat = (dx: number) => {
    if (!isPlaying || !canvasRef.current) return;
    boatRef.current.x = Math.max(0, Math.min(boatRef.current.x + dx, canvasRef.current.width - boatRef.current.width));
  };

  const gameLoop = useCallback(() => {
    if (!isPlaying || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;

    ctx.clearRect(0, 0, cw, ch);

    // Ocean gradient
    const seaGrad = ctx.createLinearGradient(0, 0, 0, ch);
    seaGrad.addColorStop(0, "#e0f2fe");
    seaGrad.addColorStop(0.5, "#7dd3fc");
    seaGrad.addColorStop(1, "#0284c7");
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, 0, cw, ch);

    // Animated gentle waves
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.beginPath();
    ctx.arc(cw * 0.25, 370, 80, 0, Math.PI, false);
    ctx.arc(cw * 0.75, 370, 80, 0, Math.PI, false);
    ctx.fill();

    // Draw boat
    ctx.font = "36px serif";
    ctx.fillText("⛵", boatRef.current.x, boatRef.current.y + 25);

    // Add falling trash
    if (Math.random() < 0.025) {
      const types = ["🥤", "🛍️", "🧴", "🧃"];
      trashesRef.current.push({
        x: Math.random() * (cw - 30),
        y: -10,
        type: types[Math.floor(Math.random() * types.length)],
        speed: 1.5 + Math.random() * 2,
      });
    }

    // Move & collide trash
    for (let i = trashesRef.current.length - 1; i >= 0; i--) {
      const trash = trashesRef.current[i];
      trash.y += trash.speed;

      ctx.font = "26px serif";
      ctx.fillText(trash.type, trash.x, trash.y);

      // Caught by boat
      if (
        trash.y >= boatRef.current.y - 10 &&
        trash.y <= boatRef.current.y + boatRef.current.height &&
        trash.x + 20 >= boatRef.current.x &&
        trash.x <= boatRef.current.x + boatRef.current.width
      ) {
        setScore((prev) => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
            try {
              localStorage.setItem("ecokids:ocean:highScore", String(next));
            } catch (err) {
              void err;
            }
          }
          return next;
        });
        trashesRef.current.splice(i, 1);
        continue;
      }

      // Missed trash sank to bottom
      if (trash.y > ch) {
        setGameOver(true);
        setIsPlaying(false);
      }
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, highScore]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameLoop]);

  return (
    <div className="min-h-screen flex flex-col bg-cyan-50/50">
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
              {texts.score[language]}: <strong className="text-cyan-700 text-base">{score}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              {texts.best[language]}: <strong className="text-amber-600">{highScore}</strong>
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <span>🌊</span> {texts.title[language]}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {texts.subtitle[language]}
          </p>
        </div>

        <div className="relative bg-cyan-100 border-4 border-cyan-400 rounded-2xl overflow-hidden shadow-xl max-w-full">
          <canvas
            ref={canvasRef}
            width={380}
            height={420}
            onMouseMove={(e) => handlePointerMove(e.clientX)}
            onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
            className="block max-w-full cursor-ew-resize select-none"
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
              {gameOver ? (
                <>
                  <span className="text-5xl mb-2">🌊</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.gameOver[language]}</h2>
                  <p className="text-cyan-100 text-sm mb-4">{texts.caughtMsg[language](score)}</p>
                </>
              ) : (
                <>
                  <span className="text-5xl mb-2">⛵</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.title[language]}</h2>
                  <p className="text-cyan-100 text-sm mb-4 max-w-xs">{texts.subtitle[language]}</p>
                </>
              )}
              <Button
                onClick={startGame}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold gap-2 shadow-lg"
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

        {isPlaying && (
          <div className="mt-4 flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => nudgeBoat(-35)}
              className="gap-2 bg-white"
            >
              <ArrowLeftCircle className="w-5 h-5" /> Chapga
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => nudgeBoat(35)}
              className="gap-2 bg-white"
            >
              O'ngga <ArrowRightCircle className="w-5 h-5" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OceanCleanerGamePage;
