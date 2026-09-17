// Ilova qo'llab-quvvatlaydigan tillar
export type Language = "uz" | "ru" | "en";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

// Ko'p tilli matn uchun umumiy interfeys — barcha kontent fayllarida ishlatiladi
export interface LocalizedText {
  uz: string;
  ru: string;
  en: string;
}

// Berilgan tildagi matnni xavfsiz olish (agar tarjima yo'q bo'lsa, o'zbekchaga qaytadi)
export function pick(text: LocalizedText, lang: Language): string {
  return text[lang] ?? text.uz;
}
