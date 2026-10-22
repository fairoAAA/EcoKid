import { useState, useEffect } from "react";
import { Check, Flame, Sparkles, Trophy } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Challenge {
  id: string;
  emoji: string;
  title: { uz: string; ru: string; en: string };
  points: number;
}

const DAILY_CHALLENGES: Challenge[] = [
  {
    id: "water_tap",
    emoji: "🚰",
    title: {
      uz: "Tish yuvayotganda kran suvini yopib qo'ydim",
      ru: "Выключил воду, пока чистил зубы",
      en: "Turned off the tap while brushing teeth",
    },
    points: 10,
  },
  {
    id: "lights_off",
    emoji: "💡",
    title: {
      uz: "Xonadan chiqayotganda chiroqni o'chirdim",
      ru: "Выключил свет, выходя из комнаты",
      en: "Turned off the lights when leaving the room",
    },
    points: 10,
  },
  {
    id: "reusable_bag",
    emoji: "🛍️",
    title: {
      uz: "Plastik xalta o'rniga mato xalta ishlatdim",
      ru: "Использовал тканевую сумку вместо пакета",
      en: "Used a reusable bag instead of plastic",
    },
    points: 15,
  },
];

export const DailyEcoChallenges = () => {
  const { language } = useLanguage();
  const { playCorrect, playVictory } = useSoundEffects();

  const getTodayKey = () => {
    const today = new Date().toISOString().split("T")[0];
    return `ecokids:challenges:${today}`;
  };

  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(getTodayKey());
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      return Number(localStorage.getItem("ecokids:challenges:streak") || 1);
    } catch {
      return 1;
    }
  });

  const toggleChallenge = (id: string) => {
    setCompleted((prev) => {
      const isAlready = prev.includes(id);
      const updated = isAlready ? prev.filter((item) => item !== id) : [...prev, id];

      try {
        localStorage.setItem(getTodayKey(), JSON.stringify(updated));
      } catch {
        /* ignore */
      }

      if (!isAlready) {
        if (updated.length === DAILY_CHALLENGES.length) {
          playVictory();
          const nextStreak = streak + 1;
          setStreak(nextStreak);
          try {
            localStorage.setItem("ecokids:challenges:streak", String(nextStreak));
          } catch {
            /* ignore */
          }
        } else {
          playCorrect();
        }
      }

      return updated;
    });
  };

  const allDone = completed.length === DAILY_CHALLENGES.length;
  const totalEarned = completed.reduce((acc, id) => {
    const ch = DAILY_CHALLENGES.find((c) => c.id === id);
    return acc + (ch ? ch.points : 0);
  }, 0);

  const texts = {
    heading: {
      uz: "Kunlik Eko-Vazifalar",
      ru: "Ежедневные Эко-Задания",
      en: "Daily Eco Challenges",
    },
    subheading: {
      uz: "Har kuni kichik odatlar orqali tabiatga katta yordam bering!",
      ru: "Помогай природе каждый день простыми полезными привычками!",
      en: "Help nature every day with simple positive habits!",
    },
    streakText: {
      uz: (s: number) => `${s} kunlik seriya`,
      ru: (s: number) => `Серия: ${s} дн.`,
      en: (s: number) => `${s} day streak`,
    },
    pointsText: {
      uz: "Eko-ballar",
      ru: "Эко-баллы",
      en: "Eco-points",
    },
    allDoneTitle: {
      uz: "Barakalla! Bugungi barcha vazifalar bajarildi! 🎉",
      ru: "Отлично! Все задания на сегодня выполнены! 🎉",
      en: "Awesome! All tasks for today are completed! 🎉",
    },
  };

  return (
    <section className="eco-card p-6 md:p-8 bg-gradient-to-br from-emerald-500/10 via-card to-amber-500/10 border-2 border-emerald-500/30 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2 text-foreground">
            <span>🌱</span> {texts.heading[language]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{texts.subheading[language]}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            {texts.streakText[language](streak)}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            +{totalEarned} {texts.pointsText[language]}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {DAILY_CHALLENGES.map((ch) => {
          const isDone = completed.includes(ch.id);
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => toggleChallenge(ch.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ${
                isDone
                  ? "bg-emerald-500/15 border-emerald-500 text-foreground"
                  : "bg-card hover:bg-muted/50 border-border hover:border-emerald-300 text-foreground"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    isDone
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-muted-foreground/40 bg-background"
                  }`}
                >
                  {isDone && <Check className="w-5 h-5 stroke-[3]" />}
                </div>
                <div className="text-2xl select-none">{ch.emoji}</div>
                <span className={`text-sm sm:text-base font-medium ${isDone ? "line-through opacity-80" : ""}`}>
                  {ch.title[language]}
                </span>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex-shrink-0">
                +{ch.points}
              </span>
            </button>
          );
        })}
      </div>

      {allDone && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200 text-center font-semibold text-sm flex items-center justify-center gap-2 animate-bounce-slow">
          <Trophy className="w-5 h-5 text-amber-500" />
          {texts.allDoneTitle[language]}
        </div>
      )}
    </section>
  );
};
