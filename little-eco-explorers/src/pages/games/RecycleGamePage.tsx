import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/types";
import { useOverlayData } from "@/hooks/useOverlayData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { allTrashItems, trashBins, medals, TrashItem, TrashType } from "@/data/recycleItems";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const RecycleGamePage = () => {
  const { language, t } = useLanguage();
  const { data: allItems } = useOverlayData("ecokids:overlay:trashItems", allTrashItems);

  const [level, setLevel] = useLocalStorage("ecokids:recycle:level", 1);
  const [totalScore, setTotalScore] = useLocalStorage("ecokids:recycle:score", 0);

  const [items, setItems] = useState<TrashItem[]>([]);
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ key: string; correct: boolean } | null>(null);
  const [levelScore, setLevelScore] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [draggedKey, setDraggedKey] = useState<string | null>(null);

  const generateItems = useCallback(
    (lvl: number) => {
      const count = Math.min(3 + lvl, 15);
      return shuffle(allItems).slice(0, Math.min(count, allItems.length));
    },
    [allItems]
  );

  useEffect(() => {
    setItems(generateItems(level));
    setPlaced(new Set());
    setLevelScore(0);
    setLevelComplete(false);
  }, [level, generateItems]);

  const itemKey = (item: TrashItem, idx: number) => `${item.name.uz}-${idx}`;

  const checkAllPlaced = (newPlaced: Set<string>) => {
    if (newPlaced.size === items.length) {
      setTimeout(() => setLevelComplete(true), 500);
    }
  };

  const handleDrop = (binType: TrashType, key: string, item: TrashItem) => {
    if (placed.has(key)) return;
    const correct = item.type === binType;
    setFeedback({ key, correct });
    setTimeout(() => setFeedback(null), 900);

    if (correct) {
      const newPlaced = new Set(placed).add(key);
      setPlaced(newPlaced);
      setLevelScore((prev) => prev + 10);
      setTotalScore((prev) => prev + 10);
      checkAllPlaced(newPlaced);
    }
    setSelectedItem(null);
    setDraggedKey(null);
  };

  const handleDragStart = (key: string) => setDraggedKey(key);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDropZone = (e: React.DragEvent, binType: TrashType) => {
    e.preventDefault();
    if (!draggedKey) return;
    const idx = parseInt(draggedKey.split("-").pop() ?? "-1", 10);
    const item = items[idx];
    if (item) handleDrop(binType, draggedKey, item);
  };

  const handleItemClick = (key: string) => {
    if (placed.has(key)) return;
    setSelectedItem(selectedItem === key ? null : key);
  };

  const handleBinClick = (binType: TrashType) => {
    if (!selectedItem) return;
    const idx = parseInt(selectedItem.split("-").pop() ?? "-1", 10);
    const item = items[idx];
    if (item) handleDrop(binType, selectedItem, item);
  };

  const nextLevel = () => setLevel((prev) => prev + 1);
  const restart = () => {
    setLevel(1);
    setTotalScore(0);
  };

  const medal = medals[Math.min(Math.floor(level / 3), medals.length - 1)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="eco-container py-6 md:py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("common.back")}
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="bg-card border border-border rounded-full px-4 py-1.5">
              {t("recycle.level")}: {level}
            </span>
            <span className="bg-card border border-border rounded-full px-4 py-1.5">
              {t("recycle.score")}: {totalScore}
            </span>
          </div>
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">{t("recycle.title")}</h1>
        <p className="text-center text-sm text-muted-foreground mb-8">{t("recycle.dragHint")}</p>

        {levelComplete ? (
          <div className="max-w-md mx-auto text-center bg-card border border-border rounded-3xl p-10 shadow-xl">
            <span className="text-6xl mb-4 inline-block">{medal}</span>
            <h2 className="font-display text-2xl font-bold mb-2">{t("recycle.levelComplete")}</h2>
            <p className="text-muted-foreground mb-6">
              +{levelScore} {t("recycle.score")}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={restart}>
                <RotateCcw className="w-4 h-4" /> {t("recycle.restart")}
              </Button>
              <Button onClick={nextLevel}>
                <Trophy className="w-4 h-4" /> {t("recycle.nextLevel")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Buyumlar */}
            <div className="flex flex-wrap gap-3 justify-center mb-10 max-w-3xl mx-auto">
              {items.map((item, idx) => {
                const key = itemKey(item, idx);
                if (placed.has(key)) return null;
                const isSelected = selectedItem === key;
                const isFeedback = feedback?.key === key;
                return (
                  <button
                    key={key}
                    draggable
                    onDragStart={() => handleDragStart(key)}
                    onClick={() => handleItemClick(key)}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border-2 flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing transition-all ${
                      isSelected ? "border-primary scale-110 shadow-glow" : "border-border hover:border-primary/40"
                    } ${isFeedback ? (feedback?.correct ? "animate-bounce" : "animate-shake border-destructive") : ""}`}
                  >
                    <span className="text-3xl md:text-4xl">{item.emoji}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground font-medium px-1 text-center line-clamp-1">
                      {pick(item.name, language)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Qutilar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {trashBins.map((bin) => (
                <div
                  key={bin.type}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropZone(e, bin.type)}
                  onClick={() => handleBinClick(bin.type)}
                  className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${bin.color}`}
                >
                  <span className="text-2xl md:text-3xl">{bin.emoji}</span>
                  <span className="text-xs md:text-sm font-bold text-center px-1">{pick(bin.name, language)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecycleGamePage;
