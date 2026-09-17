import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, RotateCcw, Trophy, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const MAZE_SIZE = 8;
const INITIAL_PLAYER = { x: 0, y: 0 };
const EXIT = { x: 7, y: 7 };

const generateMaze = () => {
  const walls = new Set<string>();
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(Math.random() * MAZE_SIZE);
    const y = Math.floor(Math.random() * MAZE_SIZE);
    if ((x === 0 && y === 0) || (x === EXIT.x && y === EXIT.y)) continue;
    walls.add(`${x},${y}`);
  }
  return walls;
};

const EcoMazeGamePage = () => {
  const { language } = useLanguage();
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [leaves, setLeaves] = useState<Set<string>>(new Set());
  const [totalLeaves, setTotalLeaves] = useState(4);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [won, setWon] = useState(false);

  const texts = {
    title: { uz: "Eko-labirint", ru: "Эко-лабиринт", en: "Eco Maze" },
    subtitle: {
      uz: "Barglarni yig'ing va o'rmon eshigiga chiqish yo'lini toping!",
      ru: "Собирай листья и найди путь к выходу из леса!",
      en: "Collect leaves and find your way to the forest exit!",
    },
    leaves: { uz: "Barglar", ru: "Листья", en: "Leaves" },
    score: { uz: "Ball", ru: "Счёт", en: "Score" },
    win: { uz: "Muvaffaqiyat!", ru: "Победа!", en: "Victory!" },
    winDesc: {
      uz: (s: number) => `Siz labirintdan muvaffaqiyatli chiqdingiz va ${s} ball to'pladingiz!`,
      ru: (s: number) => `Вы выбрались из лабиринта и набрали ${s} баллов!`,
      en: (s: number) => `You escaped the maze and scored ${s} points!`,
    },
    start: { uz: "Boshlash", ru: "Начать", en: "Start" },
    restart: { uz: "Qayta o'ynash", ru: "Играть снова", en: "Play Again" },
    back: { uz: "O'yinlarga qaytish", ru: "Назад к играм", en: "Back to games" },
  };

  const startGame = () => {
    setPlayer(INITIAL_PLAYER);
    const newWalls = generateMaze();
    setWalls(newWalls);
    const newLeaves = new Set<string>();
    const count = 4;
    setTotalLeaves(count);
    for (let i = 0; i < count; i++) {
      let lx: number, ly: number;
      do {
        lx = Math.floor(Math.random() * MAZE_SIZE);
        ly = Math.floor(Math.random() * MAZE_SIZE);
      } while (newWalls.has(`${lx},${ly}`) || (lx === 0 && ly === 0) || (lx === EXIT.x && ly === EXIT.y));
      newLeaves.add(`${lx},${ly}`);
    }
    setLeaves(newLeaves);
    setScore(0);
    setWon(false);
    setIsPlaying(true);
  };

  const move = useCallback(
    (dx: number, dy: number) => {
      if (!isPlaying || won) return;
      setPlayer((p) => {
        const nx = p.x + dx;
        const ny = p.y + dy;
        if (nx >= 0 && nx < MAZE_SIZE && ny >= 0 && ny < MAZE_SIZE && !walls.has(`${nx},${ny}`)) {
          const key = `${nx},${ny}`;
          if (leaves.has(key)) {
            setScore((s) => s + 15);
            const newL = new Set(leaves);
            newL.delete(key);
            setLeaves(newL);
          }
          if (nx === EXIT.x && ny === EXIT.y) {
            setWon(true);
            setIsPlaying(false);
          }
          return { x: nx, y: ny };
        }
        return p;
      });
    },
    [isPlaying, won, walls, leaves]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") move(0, -1);
      if (e.key === "ArrowDown" || e.key === "s") move(0, 1);
      if (e.key === "ArrowLeft" || e.key === "a") move(-1, 0);
      if (e.key === "ArrowRight" || e.key === "d") move(1, 0);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  return (
    <div className="min-h-screen flex flex-col bg-lime-50/40">
      <Header />
      <main className="flex-1 py-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-md mb-4 flex items-center justify-between">
          <Link to="/games">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {texts.back[language] || texts.back.uz}
            </Button>
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold text-foreground">
            <span>
              {texts.leaves[language]}:{" "}
              <strong className="text-lime-700">{totalLeaves - leaves.size}/{totalLeaves}</strong>
            </span>
            <span>
              {texts.score[language]}: <strong className="text-primary">{score}</strong>
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <span>🌀</span> {texts.title[language]}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {texts.subtitle[language]}
          </p>
        </div>

        <div className="relative bg-lime-100/70 border-4 border-lime-300 p-3 rounded-2xl shadow-xl">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${MAZE_SIZE}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: MAZE_SIZE * MAZE_SIZE }).map((_, i) => {
              const x = i % MAZE_SIZE;
              const y = Math.floor(i / MAZE_SIZE);
              const isWall = walls.has(`${x},${y}`);
              const isPlayer = player.x === x && player.y === y;
              const isExit = EXIT.x === x && EXIT.y === y;
              const isLeaf = leaves.has(`${x},${y}`);

              return (
                <div
                  key={i}
                  className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-xl sm:text-2xl transition-colors ${
                    isWall
                      ? "bg-emerald-800 text-emerald-100 shadow-inner"
                      : "bg-white/80 border border-lime-200"
                  }`}
                >
                  {isPlayer ? "🦊" : isExit ? "🚪" : isLeaf ? "🍂" : isWall ? "🌲" : ""}
                </div>
              );
            })}
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center rounded-2xl">
              {won ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-lime-400 mb-2 animate-bounce" />
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.win[language]}</h2>
                  <p className="text-lime-100 text-sm mb-4">{texts.winDesc[language](score)}</p>
                </>
              ) : (
                <>
                  <span className="text-5xl mb-2">🦊</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.title[language]}</h2>
                  <p className="text-lime-100 text-sm mb-4">{texts.subtitle[language]}</p>
                </>
              )}
              <Button
                onClick={startGame}
                size="lg"
                className="bg-lime-600 hover:bg-lime-500 text-white font-bold gap-2 shadow-lg"
              >
                {won ? (
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

        {/* On-screen controls for mobile/tablets */}
        {isPlaying && (
          <div className="mt-6 grid grid-cols-3 gap-2 w-44">
            <div />
            <Button variant="outline" size="icon" onClick={() => move(0, -1)} className="h-12 w-12 bg-white">
              <ArrowUp className="w-6 h-6" />
            </Button>
            <div />
            <Button variant="outline" size="icon" onClick={() => move(-1, 0)} className="h-12 w-12 bg-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => move(0, 1)} className="h-12 w-12 bg-white">
              <ArrowDown className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => move(1, 0)} className="h-12 w-12 bg-white">
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EcoMazeGamePage;
