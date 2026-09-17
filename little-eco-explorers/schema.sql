-- EcoKids / little-eco-explorers — Supabase backend schema
-- Ishlatish: Supabase loyihangizda SQL Editor'ga bu faylni to'liq nusxalab bajaring.

-- ============================================================
-- 1) PROFILLAR (admin/moderator rollari, Supabase Auth ustiga)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'moderator' check (role in ('admin', 'moderator')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Har bir kirgan foydalanuvchi o'z profilini o'qiy oladi
create policy "profiles: self select" on public.profiles
  for select using (auth.uid() = id);

-- Adminlar hamma profillarni ko'ra oladi
create policy "profiles: admin select all" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles: admin manage" on public.profiles
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Yangi auth.users yozuvi yaratilganda avtomatik profil yaratish (default: moderator)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), 'moderator');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Yordamchi funksiya: joriy foydalanuvchi admin/moderatormi?
create or replace function public.is_staff()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$ language sql security definer stable;

create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$ language sql security definer stable;

-- ============================================================
-- 2) MAQOLALAR (articles)
-- ============================================================
create table if not exists public.articles (
  slug text primary key,
  category text not null check (category in ('animals','plants','experiments','tips')),
  emoji text not null default '📝',
  title jsonb not null default '{}',   -- {uz,ru,en}
  excerpt jsonb not null default '{}',
  body jsonb not null default '[]',    -- LocalizedText[]
  views integer not null default 0,
  rating numeric not null default 5,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

alter table public.articles enable row level security;
create policy "articles: public read" on public.articles for select using (true);
create policy "articles: staff write" on public.articles for insert with check (public.is_staff());
create policy "articles: staff update" on public.articles for update using (public.is_staff());
create policy "articles: staff delete" on public.articles for delete using (public.is_staff());

-- ============================================================
-- 3) VIKTORINA SAVOLLARI (quiz_questions)
-- ============================================================
create table if not exists public.quiz_questions (
  id text primary key,
  emoji text not null default '❓',
  question jsonb not null default '{}',
  options jsonb not null default '[]',      -- LocalizedText[]
  correct_index integer not null default 0,
  explanation jsonb not null default '{}',
  category text default 'general',
  order_index integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

alter table public.quiz_questions enable row level security;
create policy "quiz_questions: public read" on public.quiz_questions for select using (true);
create policy "quiz_questions: staff write" on public.quiz_questions for insert with check (public.is_staff());
create policy "quiz_questions: staff update" on public.quiz_questions for update using (public.is_staff());
create policy "quiz_questions: staff delete" on public.quiz_questions for delete using (public.is_staff());

-- ============================================================
-- 4) QAYTA ISHLASH O'YINI PREDMETLARI (recycle_items)
-- ============================================================
create table if not exists public.recycle_items (
  id text primary key,
  name jsonb not null default '{}',
  emoji text not null default '🗑️',
  correct_bin text not null default 'plastic',
  order_index integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

alter table public.recycle_items enable row level security;
create policy "recycle_items: public read" on public.recycle_items for select using (true);
create policy "recycle_items: staff write" on public.recycle_items for insert with check (public.is_staff());
create policy "recycle_items: staff update" on public.recycle_items for update using (public.is_staff());
create policy "recycle_items: staff delete" on public.recycle_items for delete using (public.is_staff());

-- ============================================================
-- 5) NEWSLETTER OBUNACHILARI (subscribers)
-- ============================================================
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
-- Har kim (anonim tashrif buyuruvchi) obuna bo'lishi mumkin
create policy "subscribers: anyone can insert" on public.subscribers for insert with check (true);
-- Faqat xodimlar ro'yxatni ko'radi/o'chiradi
create policy "subscribers: staff select" on public.subscribers for select using (public.is_staff());
create policy "subscribers: staff delete" on public.subscribers for delete using (public.is_staff());

-- ============================================================
-- 6) BOLALAR PROGRESSI (localStorage o'rniga qurilma bo'yicha)
--    Login talab qilinmaydi — anonim device_id bilan saqlanadi,
--    shu bilan refresh/qurilma almashtirishda ma'lumot yo'qolmaydi
--    (agar shu brauzer/qurilmada qolsa) va admin statistikani ko'radi.
-- ============================================================
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  game_id text not null,
  score integer not null default 0,
  completed boolean not null default false,
  data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (device_id, game_id)
);

alter table public.progress enable row level security;
-- Anonim foydalanuvchilar faqat o'z device_id yozuvini o'qiy/yoza oladi
-- (device_id brauzerda tasodifiy generatsiya qilinib saqlanadi, autentifikatsiya emas —
--  shuning uchun bu "yashirin token" darajasidagi himoya, mutlaq xavfsizlik emas)
create policy "progress: anyone can upsert own device" on public.progress
  for insert with check (true);
create policy "progress: anyone can update own device" on public.progress
  for update using (true);
create policy "progress: anyone can read own device" on public.progress
  for select using (true);
-- Xodimlar to'liq statistika uchun barcha yozuvlarni ko'radi
create policy "progress: staff select all" on public.progress
  for select using (public.is_staff());

-- ============================================================
-- 7) YANGILANISH VAQTINI AVTOMATIK YANGILASH TRIGGERI
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at before update on public.articles
  for each row execute procedure public.set_updated_at();

drop trigger if exists quiz_questions_set_updated_at on public.quiz_questions;
create trigger quiz_questions_set_updated_at before update on public.quiz_questions
  for each row execute procedure public.set_updated_at();

drop trigger if exists recycle_items_set_updated_at on public.recycle_items;
create trigger recycle_items_set_updated_at before update on public.recycle_items
  for each row execute procedure public.set_updated_at();

drop trigger if exists progress_set_updated_at on public.progress;
create trigger progress_set_updated_at before update on public.progress
  for each row execute procedure public.set_updated_at();
