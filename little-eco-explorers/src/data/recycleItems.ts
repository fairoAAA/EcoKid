import { LocalizedText } from "@/i18n/types";

export type TrashType = "plastic" | "paper" | "organic" | "metal" | "glass" | "special";

export interface TrashItem {
  name: LocalizedText;
  emoji: string;
  type: TrashType;
}

// Diqqat: asl loyihada 2 ta mazmuniy xato bor edi (bolalarga NOTO'G'RI
// ma'lumot o'rgatardi):
//  1) "Gazak qopqog'i" (konfet qog'ozi) - "organik" deb belgilangan edi,
//     aslida konfet o'rami PLASTIK hisoblanadi -> tuzatildi.
//  2) "Konditsioner qopqog'i" nomi bilan savat (🛒) emoji ishlatilgan edi -
//     ikkisi mos kelmasdi -> "Metall qoshiq" bilan almashtirildi.
export const allTrashItems: TrashItem[] = [
  { name: { uz: "Tuxum", ru: "Яйцо", en: "Egg" }, emoji: "🥚", type: "organic" },
  { name: { uz: "Pechenye", ru: "Печенье", en: "Cookie" }, emoji: "🍪", type: "organic" },
  { name: { uz: "Non", ru: "Хлеб", en: "Bread" }, emoji: "🍞", type: "organic" },
  { name: { uz: "Olma", ru: "Яблоко", en: "Apple" }, emoji: "🍎", type: "organic" },
  { name: { uz: "Banan", ru: "Банан", en: "Banana" }, emoji: "🍌", type: "organic" },
  { name: { uz: "Kartoshka", ru: "Картошка", en: "Potato" }, emoji: "🥔", type: "organic" },
  { name: { uz: "Sabzi", ru: "Морковь", en: "Carrot" }, emoji: "🥕", type: "organic" },
  { name: { uz: "Barglar", ru: "Листья", en: "Leaves" }, emoji: "🍂", type: "organic" },
  { name: { uz: "Gazeta", ru: "Газета", en: "Newspaper" }, emoji: "📰", type: "paper" },
  { name: { uz: "Quti", ru: "Коробка", en: "Box" }, emoji: "📦", type: "paper" },
  { name: { uz: "Karton", ru: "Картон", en: "Cardboard" }, emoji: "🗃️", type: "paper" },
  { name: { uz: "Kitob", ru: "Книга", en: "Book" }, emoji: "📕", type: "paper" },
  { name: { uz: "Qalam", ru: "Карандаш", en: "Pencil" }, emoji: "✏️", type: "paper" },
  { name: { uz: "Plastik paket", ru: "Пластиковый пакет", en: "Plastic bag" }, emoji: "🛍️", type: "plastic" },
  { name: { uz: "Plastik stakan", ru: "Пластиковый стакан", en: "Plastic cup" }, emoji: "🥤", type: "plastic" },
  { name: { uz: "Plastik qop", ru: "Пластиковая бутылочка", en: "Plastic bottle" }, emoji: "🧴", type: "plastic" },
  { name: { uz: "Plastik quti", ru: "Пластиковая упаковка", en: "Plastic carton" }, emoji: "🧃", type: "plastic" },
  { name: { uz: "Konfet qog'ozi", ru: "Фантик от конфеты", en: "Candy wrapper" }, emoji: "🍬", type: "plastic" },
  { name: { uz: "Shisha stakan", ru: "Стеклянный стакан", en: "Glass cup" }, emoji: "🍶", type: "glass" },
  { name: { uz: "Shisha banka", ru: "Стеклянная банка", en: "Glass jar" }, emoji: "🍾", type: "glass" },
  { name: { uz: "Shisha suv idishi", ru: "Стеклянная бутылка воды", en: "Glass water bottle" }, emoji: "💧", type: "glass" },
  { name: { uz: "Stakan", ru: "Стакан", en: "Drinking glass" }, emoji: "🥛", type: "glass" },
  { name: { uz: "Metall quti", ru: "Металлическая банка", en: "Metal can" }, emoji: "🥫", type: "metal" },
  { name: { uz: "Metall qoshiq", ru: "Металлическая ложка", en: "Metal spoon" }, emoji: "🥄", type: "metal" },
  { name: { uz: "Batareyka", ru: "Батарейка", en: "Battery" }, emoji: "🔋", type: "special" },
  { name: { uz: "Termometr", ru: "Градусник", en: "Thermometer" }, emoji: "🌡️", type: "special" },
  { name: { uz: "Eski telefon", ru: "Старый телефон", en: "Old phone" }, emoji: "📱", type: "special" },
  { name: { uz: "Tuxum po'chog'i", ru: "Яичная скорлупа", en: "Eggshell" }, emoji: "🍳", type: "organic" },
  { name: { uz: "Daftar", ru: "Тетрадь", en: "Notebook" }, emoji: "📓", type: "paper" },
  { name: { uz: "Plastik qoshiq", ru: "Пластиковая ложка", en: "Plastic spoon" }, emoji: "🥄", type: "plastic" },
  { name: { uz: "Sut qutisi", ru: "Коробка от молока", en: "Milk carton" }, emoji: "🥛", type: "paper" },
  { name: { uz: "Eski chiroq", ru: "Старая лампочка", en: "Old light bulb" }, emoji: "💡", type: "special" },
  { name: { uz: "Shprist", ru: "Шприц", en: "Syringe" }, emoji: "💉", type: "special" },
];

export const trashBins: { type: TrashType; name: LocalizedText; emoji: string; color: string }[] = [
  { type: "plastic", name: { uz: "Plastik", ru: "Пластик", en: "Plastic" }, emoji: "🔵", color: "bg-sky/30 border-sky" },
  { type: "paper", name: { uz: "Qog'oz", ru: "Бумага", en: "Paper" }, emoji: "📄", color: "bg-accent/30 border-accent" },
  { type: "organic", name: { uz: "Organik", ru: "Органика", en: "Organic" }, emoji: "🟢", color: "bg-primary/30 border-primary" },
  { type: "metal", name: { uz: "Metall", ru: "Металл", en: "Metal" }, emoji: "⚙️", color: "bg-orange/30 border-orange" },
  { type: "glass", name: { uz: "Shisha", ru: "Стекло", en: "Glass" }, emoji: "🟦", color: "bg-cyan-500/30 border-cyan-500" },
  { type: "special", name: { uz: "Maxsus", ru: "Особые", en: "Special" }, emoji: "⬛", color: "bg-slate-800/30 border-slate-800" },
];

export const medals = ["🥇", "🥈", "🥉", "🏅", "🎖️"];
