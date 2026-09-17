import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * `useOverlayData` (localStorage) o'rnini bosuvchi hook.
 * Berilgan Supabase jadvalidan ma'lumotni o'qiydi va CRUD amallarini
 * to'g'ridan-to'g'ri bazaga yozadi — endi ma'lumot faqat bitta brauzerda
 * emas, barcha foydalanuvchilar uchun umumiy bazada saqlanadi.
 *
 * @param table   Supabase jadval nomi (masalan "articles")
 * @param idField Asosiy kalit ustuni nomi (masalan "slug" yoki "id")
 * @param orderBy Saralash ustuni (ixtiyoriy)
 */
export function useSupabaseTable<T extends Record<string, unknown>>(
  table: string,
  idField: keyof T & string,
  orderBy?: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select("*");
    if (orderBy) query = query.order(orderBy, { ascending: true });
    const { data: rows, error: err } = await query;
    if (err) {
      setError(err.message);
    } else {
      setData((rows ?? []) as T[]);
      setError(null);
    }
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upsert = useCallback(
    async (row: T) => {
      const { error: err } = await supabase.from(table).upsert(row);
      if (err) return { ok: false, error: err.message };
      await refresh();
      return { ok: true };
    },
    [table, refresh]
  );

  const remove = useCallback(
    async (idValue: T[typeof idField]) => {
      const { error: err } = await supabase.from(table).delete().eq(idField, idValue);
      if (err) return { ok: false, error: err.message };
      await refresh();
      return { ok: true };
    },
    [table, idField, refresh]
  );

  return { data, loading, error, refresh, upsert, remove };
}
