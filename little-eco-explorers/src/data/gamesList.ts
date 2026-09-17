import { LocalizedText } from "@/i18n/types";

export interface GameItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  emoji: string;
  difficulty: "easy" | "medium" | "hard";
  time: string;
  color: string;
  href: string;
  playable: boolean;
}

// Yagona manba: avval GamesPage va bosh sahifadagi GamesSection ikkita
// MUSTAQIL va bir-biriga zid ro'yxatga ega edi (GamesSection'dagi hech bir
// havola ishlamas edi: /games/sorting, /games/bird-rescue va h.k.).
// Endi ikkalasi ham shu yagona ro'yxatdan foydalanadi.
export const gamesList: GameItem[] = [
  {
    id: "recycle",
    title: { uz: "Chiqindini saralash", ru: "Сортировка мусора", en: "Sort the trash" },
    description: {
      uz: "Chiqindilarni kerakli qutilarga torting va atrof-muhitni tozalang!",
      ru: "Перетаскивай мусор в нужные корзины и очищай окружающую среду!",
      en: "Drag trash into the right bins and clean up the environment!",
    },
    emoji: "♻️",
    difficulty: "easy",
    time: "5",
    color: "bg-primary/20",
    href: "/games/recycle",
    playable: true,
  },
  {
    id: "tree",
    title: { uz: "Daraxt ek", ru: "Посади дерево", en: "Plant a tree" },
    description: {
      uz: "Daraxt ekish uchun bosing! Har bir bosish bilan sayyora yashil bo'lishini kuzating!",
      ru: "Нажимай, чтобы посадить дерево! Смотри, как планета зеленеет с каждым нажатием!",
      en: "Tap to plant a tree! Watch the planet get greener with every tap!",
    },
    emoji: "🌱",
    difficulty: "easy",
    time: "∞",
    color: "bg-accent/20",
    href: "/games/tree",
    playable: true,
  },
  {
    id: "quiz",
    title: { uz: "Eko-viktorina", ru: "Эко-викторина", en: "Eco quiz" },
    description: {
      uz: "Ekologiya bo'yicha bilimlaringni sinab ko'r! Tabiat va qayta ishlash haqida 60 ta savol, 6 bosqich.",
      ru: "Проверь свои знания об экологии! 60 вопросов о природе и переработке, 6 уровней.",
      en: "Test your ecology knowledge! 60 questions about nature and recycling, across 6 levels.",
    },
    emoji: "🧠",
    difficulty: "medium",
    time: "5-7",
    color: "bg-sky/20",
    href: "/games/quiz",
    playable: true,
  },
  {
    id: "bird-rescue",
    title: { uz: "Qushchani qutqar", ru: "Спаси птенца", en: "Rescue the chick" },
    description: {
      uz: "Polaponning o'rmon orqali o'z uyiga boradigan yo'lini topishga yordam ber",
      ru: "Помоги птенцу найти дорогу домой через лес",
      en: "Help a baby bird find its way home through the forest",
    },
    emoji: "🐦",
    difficulty: "medium",
    time: "10",
    color: "bg-orange/20",
    href: "/games/bird-rescue",
    playable: true,
  },
  {
    id: "eco-puzzle",
    title: { uz: "Eko-pazl: O'rmon", ru: "Эко-пазл: Лес", en: "Eco puzzle: Forest" },
    description: {
      uz: "Bo'laklardan o'rmonning go'zal manzarasini yig'ing",
      ru: "Собери красивый лесной пейзаж из кусочков пазла",
      en: "Piece together a beautiful forest scene",
    },
    emoji: "🧩",
    difficulty: "easy",
    time: "5",
    color: "bg-primary/20",
    href: "/games/eco-puzzle",
    playable: true,
  },
  {
    id: "eco-maze",
    title: { uz: "Eko-labirint", ru: "Эко-лабиринт", en: "Eco maze" },
    description: {
      uz: "Barglarni yig'ib, labirintdan chiqish yo'lini toping",
      ru: "Собирай листья и найди выход из лабиринта",
      en: "Collect leaves and find your way out of the maze",
    },
    emoji: "🌀",
    difficulty: "hard",
    time: "15",
    color: "bg-sky/20",
    href: "/games/eco-maze",
    playable: true,
  },
  {
    id: "ocean-cleaner",
    title: { uz: "Okean tozalovchi", ru: "Очиститель океана", en: "Ocean cleaner" },
    description: {
      uz: "Qayiqda suzib okeanni plastiklardan tozalang",
      ru: "Управляйте лодкой и очищайте океан от пластика",
      en: "Sail the boat and clean the ocean from plastics",
    },
    emoji: "🌊",
    difficulty: "medium",
    time: "5",
    color: "bg-cyan-500/20",
    href: "/games/ocean-cleaner",
    playable: true,
  }
];
