import { useState, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "./use-toast";

interface TableConfig {
  table: string;
  idField: string;
}

interface GenericRecord {
  [key: string]: unknown;
  slug?: string;
  id?: string | number;
  category?: string;
  emoji?: string;
  title?: { uz: string; ru: string; en: string };
  excerpt?: { uz: string; ru: string; en: string };
  body?: unknown[];
  views?: number;
  rating?: number;
  question?: { uz: string; ru: string; en: string };
  options?: { uz: string; ru: string; en: string }[];
  correct?: number;
  correct_index?: number;
  explanation?: { uz: string; ru: string; en: string };
  name?: { uz: string; ru: string; en: string };
  type?: string;
  correct_bin?: string;
}

const tableConfigs: Record<string, TableConfig> = {
  "ecokids:overlay:articles": { table: "articles", idField: "slug" },
  "ecokids:overlay:quizQuestions": { table: "quiz_questions", idField: "id" },
  "ecokids:overlay:trashItems": { table: "recycle_items", idField: "id" },
  ecokids_articles: { table: "articles", idField: "slug" },
  ecokids_quiz: { table: "quiz_questions", idField: "id" },
  ecokids_recycle: { table: "recycle_items", idField: "id" },
};

function getItemId(item: GenericRecord, idField: string, index: number): string {
  if (item[idField] !== undefined && item[idField] !== null) {
    return String(item[idField]);
  }
  if (item.slug) return String(item.slug);
  if (item.id !== undefined) return String(item.id);
  if (item.name?.uz) return `item-${item.name.uz.toLowerCase().replace(/\s+/g, "-")}`;
  return `item-${index}`;
}

export function useOverlayData<T>(storageKey: string, base: T[]) {
  const { toast } = useToast();
  const config = tableConfigs[storageKey];

  const [overlay, setOverlay] = useState<T[] | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as T[]) : null;
    } catch (err) {
      void err;
      return null;
    }
  });

  const previousIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!config) return;

    const fetchFromSupabase = async () => {
      try {
        const { data: rows, error } = await supabase
          .from(config.table)
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) {
          return;
        }

        if (rows && rows.length > 0) {
          const rawList = rows as GenericRecord[];
          let mappedData: unknown[] = rawList;

          if (config.table === "quiz_questions") {
            mappedData = rawList.map((item, idx) => ({
              id: isNaN(Number(item.id)) ? idx + 1 : Number(item.id),
              emoji: item.emoji || "❓",
              question: item.question || { uz: "", ru: "", en: "" },
              options: item.options || [
                { uz: "", ru: "", en: "" },
                { uz: "", ru: "", en: "" },
                { uz: "", ru: "", en: "" },
                { uz: "", ru: "", en: "" },
              ],
              correct: item.correct_index ?? item.correct ?? 0,
              explanation: item.explanation || { uz: "", ru: "", en: "" },
            }));
          } else if (config.table === "recycle_items") {
            mappedData = rawList.map((item) => ({
              name: item.name || { uz: "", ru: "", en: "" },
              emoji: item.emoji || "🗑️",
              type: item.correct_bin || item.type || "plastic",
            }));
          } else if (config.table === "articles") {
            mappedData = rawList.map((item) => ({
              slug: item.slug,
              category: item.category,
              emoji: item.emoji || "📝",
              title: item.title || { uz: "", ru: "", en: "" },
              excerpt: item.excerpt || { uz: "", ru: "", en: "" },
              body: item.body || [],
              views: item.views ?? 0,
              rating: Number(item.rating ?? 5),
            }));
          }

          setOverlay(mappedData as T[]);
          previousIdsRef.current = new Set(
            (mappedData as GenericRecord[]).map((item, i) => getItemId(item, config.idField, i))
          );
          try {
            window.localStorage.setItem(storageKey, JSON.stringify(mappedData));
          } catch (err) {
            void err;
          }
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    };

    fetchFromSupabase();
  }, [storageKey, config]);

  const data = overlay ?? base;
  const isCustomized = overlay !== null;

  const save = useCallback(
    async (newData: T[]) => {
      setOverlay(newData);

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(newData));
      } catch (err) {
        void err;
      }

      if (config) {
        try {
          const currentIds = new Set<string>();
          const rawItems = newData as GenericRecord[];
          let dbData: Record<string, unknown>[] = [];

          if (config.table === "articles") {
            dbData = rawItems.map((item, i) => {
              const id = getItemId(item, config.idField, i);
              currentIds.add(id);
              return {
                slug: item.slug,
                category: item.category,
                emoji: item.emoji,
                title: item.title,
                excerpt: item.excerpt,
                body: item.body,
                views: item.views ?? 0,
                rating: item.rating ?? 5,
              };
            });
          } else if (config.table === "quiz_questions") {
            dbData = rawItems.map((item, i) => {
              const id = getItemId(item, config.idField, i);
              currentIds.add(id);
              return {
                id: String(item.id || id),
                emoji: item.emoji || "❓",
                question: item.question,
                options: item.options,
                correct_index: item.correct,
                explanation: item.explanation,
                category: "general",
                order_index: i,
              };
            });
          } else if (config.table === "recycle_items") {
            dbData = rawItems.map((item, i) => {
              const id = getItemId(item, config.idField, i);
              currentIds.add(id);
              return {
                id,
                name: item.name,
                emoji: item.emoji,
                correct_bin: item.type,
                order_index: i,
              };
            });
          }

          // Delete removed items from Supabase if any
          const deletedIds = Array.from(previousIdsRef.current).filter((id) => !currentIds.has(id));
          if (deletedIds.length > 0) {
            await supabase.from(config.table).delete().in(config.idField, deletedIds);
          }
          previousIdsRef.current = currentIds;

          const { error } = await supabase.from(config.table).upsert(dbData);
          if (error) {
            console.error("Supabase upsert error:", error);
            toast({
              title: "Lokal xotiraga saqlandi",
              description: "Supabase'ga yozishda xatolik. Supabase loyihangizda schema.sql ishga tushirilganligini tekshiring.",
              variant: "default",
            });
          } else {
            toast({
              title: "Muvaffaqiyatli saqlandi",
              description: "Ma'lumotlar to'liq Supabase serveriga sinxronlashtirildi.",
            });
          }
        } catch (err) {
          console.error("Supabase save error:", err);
        }
      }
    },
    [storageKey, config, toast]
  );

  const resetToBase = useCallback(async () => {
    setOverlay(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch (err) {
      void err;
    }

    if (config) {
      try {
        if (previousIdsRef.current.size > 0) {
          await supabase.from(config.table).delete().in(config.idField, Array.from(previousIdsRef.current));
          previousIdsRef.current.clear();
        }
        toast({
          title: "Boshlang'ich holatga qaytarildi",
          description: "Barcha maxsus o'zgarishlar o'chirildi.",
        });
      } catch (err) {
        console.error("Reset error:", err);
      }
    }
  }, [storageKey, config, toast]);

  return { data, save, resetToBase, isCustomized };
}
