import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "VITE_SUPABASE_URL yoki VITE_SUPABASE_ANON_KEY topilmadi. .env faylni tekshiring (.env.example'ga qarang)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
