import { supabase } from "@/lib/supabaseClient";

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const { data, error } = await supabase
    .from("subscribers")
    .select("id, email, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => ({ id: row.id, email: row.email, date: row.created_at }));
}

export async function addSubscriber(email: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from("subscribers").insert({ email });
  if (error) {
    // unique constraint -> allaqachon obuna bo'lgan
    if (error.code === "23505") return { ok: true };
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function removeSubscriber(id: string): Promise<void> {
  await supabase.from("subscribers").delete().eq("id", id);
}
