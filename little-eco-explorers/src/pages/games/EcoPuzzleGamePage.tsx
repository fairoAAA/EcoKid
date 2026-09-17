import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const emojiMap = ["", "🌲", "🦊", "🦉", "🦌", "🐿️", "🐻", "🍄", "🌷"];

const EcoPuzzleGamePage = () => {
  const { language } = useLanguage();
  const [tiles, setTiles] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const texts = {
    title: { uz: "Eko-pazl: O'rmon", ru: "Эко-пазл: Лес", en: "Eco Puzzle: Forest" },
    subtitle: {
      uz: "O'rmon jonzotlarini 1 dan 8 gacha to'g'ri tartibda yig'ing!",
      ru: "Собери лесных обитателей по порядку от 1 до 8!",
      en: "Arrange the forest creatures in order from 1 to 8!",
    },
    moves: { uz: "Harakatlar", ru: "Ходы", en: "Moves" },
    win: { uz: "Ajoyib! O'rmon tiklandi!", ru: "Отлично! Лес восстановлен!", en: "Awesome! Forest restored!" },
    winDesc: {
      uz: (m: number) => `Siz pazlni ${m} ta harakatda bajardingiz. Tabiat sizdan minnatdor!`,
      ru: (m: number) => `Вы собрали пазл за ${m} ходов. Природа благодарна вам!`,
      en: (m: number) => `You solved the puzzle in ${m} moves. Nature thanks you!`,
    },
    start: { uz: "Boshlash", ru: "Начать", en: "Start" },
    restart: { uz: "Qayta boshlash", ru: "Заново", en: "Restart" },
    back: { uz: "O'yinlarga qaytish", ru: "Назад к играм", en: "Back to games" },
  };

  const startGame = () => {
    const newTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let emptyIdx = 8;
    for (let i = 0; i < 80; i++) {
      const neighbors: number[] = [];
      if (emptyIdx % 3 !== 0) neighbors.push(emptyIdx - 1);
      if (emptyIdx % 3 !== 2) neighbors.push(emptyIdx + 1);
      if (Math.floor(emptyIdx / 3) !== 0) neighbors.push(emptyIdx - 3);
      if (Math.floor(emptyIdx / 3) !== 2) neighbors.push(emptyIdx + 3);

      const swapIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
      [newTiles[emptyIdx], newTiles[swapIdx]] = [newTiles[swapIdx], newTiles[emptyIdx]];
      emptyIdx = swapIdx;
    }
    setTiles(newTiles);
    setMoves(0);
    setWon(false);
    setIsPlaying(true);
  };

  const moveTile = (idx: number) => {
    if (!isPlaying || won) return;
    const emptyIdx = tiles.indexOf(0);
    const isAdjacent =
      (idx === emptyIdx - 1 && emptyIdx % 3 !== 0) ||
      (idx === emptyIdx + 1 && emptyIdx % 3 !== 2) ||
      idx === emptyIdx - 3 ||
      idx === emptyIdx + 3;

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[emptyIdx], newTiles[idx]] = [newTiles[idx], newTiles[emptyIdx]];
      setTiles(newTiles);
      setMoves((m) => m + 1);

      if (newTiles.slice(0, 8).every((t, i) => t === i + 1)) {
        setWon(true);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50/50">
      <Header />
      <main className="flex-1 py-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-md mb-4 flex items-center justify-between">
          <Link to="/games">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {texts.back[language] || texts.back.uz}
            </Button>
          </Link>
          <div className="text-sm font-semibold text-foreground">
            {texts.moves[language]}: <strong className="text-primary text-base">{moves}</strong>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <span>🧩</span> {texts.title[language]}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {texts.subtitle[language]}
          </p>
        </div>

        <div className="relative bg-emerald-100/70 border-4 border-emerald-300 p-4 rounded-2xl shadow-xl">
          <div className="grid grid-cols-3 gap-3">
            {(tiles.length > 0 ? tiles : [1, 2, 3, 4, 5, 6, 7, 8, 0]).map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => moveTile(i)}
                disabled={!isPlaying || t === 0}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex flex-col items-center justify-center font-bold text-2xl transition-all ${
                  t === 0
                    ? "bg-transparent cursor-default border-2 border-dashed border-emerald-300/60"
                    : isPlaying
                    ? "bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 border-2 border-emerald-200"
                    : "bg-white/70 border border-emerald-100"
                }`}
              >
                {t !== 0 && (
                  <>
                    <span className="text-3xl">{emojiMap[t]}</span>
                    <span className="text-xs text-muted-foreground font-mono mt-0.5">{t}</span>
                  </>
                )}
              </button>
            ))}
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center rounded-2xl">
              {won ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-2 animate-bounce" />
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.win[language]}</h2>
                  <p className="text-emerald-100 text-sm mb-4">{texts.winDesc[language](moves)}</p>
                </>
              ) : (
                <>
                  <span className="text-5xl mb-2">🌲</span>
                  <h2 className="font-display text-2xl font-bold mb-2">{texts.title[language]}</h2>
                  <p className="text-emerald-100 text-sm mb-4">{texts.subtitle[language]}</p>
                </>
              )}
              <Button
                onClick={startGame}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 shadow-lg"
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
      </main>
      <Footer />
    </div>
  );
};

export default EcoPuzzleGamePage;
