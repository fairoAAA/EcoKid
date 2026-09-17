import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const DEVICE_ID_KEY = "ecokids:device_id";

/** Har bir brauzer/qurilma uchun tasodifiy, doimiy ID (login talab qilinmaydi). */
function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  let id = window.localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export interface ProgressRow {
  game_id: string;
  score: number;
  completed: boolean;
  data: Record<string, unknown>;
}

/**
 * O'yin/viktorina natijasini Supabase'ga saqlaydi — endi bolaning progressi
 * faqat localStorage'da emas, bazada ham turadi (admin buni ko'ra oladi,
 * qurilma xotirasi tozalanmasa ham progress qayta yuklab olinadi).
 */
export function useProgress(gameId: string) {
  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [loading, setLoading] = useState(true);
  const deviceId = getDeviceId();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("progress")
      .select("game_id, score, completed, data")
      .eq("device_id", deviceId)
      .eq("game_id", gameId)
      .maybeSingle();
    setProgress((data as ProgressRow) ?? null);
    setLoading(false);
  }, [deviceId, gameId]);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(
    async (score: number, completed: boolean, extra: Record<string, unknown> = {}) => {
      const row = { device_id: deviceId, game_id: gameId, score, completed, data: extra };
      const { error } = await supabase.from("progress").upsert(row, { onConflict: "device_id,game_id" });
      if (!error) setProgress({ game_id: gameId, score, completed, data: extra });
      return { ok: !error, error: error?.message };
    },
    [deviceId, gameId]
  );

  return { progress, loading, save };
}
