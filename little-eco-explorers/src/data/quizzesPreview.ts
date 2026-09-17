import { LocalizedText } from "@/i18n/types";

export interface QuizPreview {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  questions: number;
  time: string;
  participants: number;
  emoji: string;
  color: string;
}

// Diqqat: bu 6 tasi hozircha "vitrina" kartochkalar - ularning har biri
// uchun alohida o'yin mantig'i hali yozilmagan (bu katta, alohida ish bo'lardi).
// Shuning uchun ular endi buzilgan /quizzes/:slug havolalariga ega emas;
// QuizzesPage ularni faqat ko'rgazma sifatida ko'rsatadi va foydalanuvchini
// haqiqatan ishlaydigan /games/quiz'ga yo'naltiradi.
export const quizzesPreview: QuizPreview[] = [
  {
    id: 1,
    title: { uz: "Sen qaysi o'rmon hayvonisan?", ru: "Какое ты лесное животное?", en: "Which forest animal are you?" },
    description: {
      uz: "Testdan o't va o'rmon aholisining qaysi biriga o'xshashingni bilib ol!",
      ru: "Пройди тест и узнай, на кого из лесных жителей ты похож!",
      en: "Take the test and find out which forest dweller you're most like!",
    },
    questions: 10,
    time: "5",
    participants: 2341,
    emoji: "🦊",
    color: "from-orange/30 to-accent/30",
  },
  {
    id: 2,
    title: { uz: "Chiqindilarni to'g'ri saralaysanmi?", ru: "Правильно ли ты сортируешь мусор?", en: "Do you sort trash correctly?" },
    description: {
      uz: "Chiqindilarni alohida yig'ish bo'yicha bilimlaringni tekshirib ko'r.",
      ru: "Проверь свои знания о раздельном сборе мусора.",
      en: "Test your knowledge of waste sorting.",
    },
    questions: 8,
    time: "4",
    participants: 1876,
    emoji: "♻️",
    color: "from-primary/30 to-sky/30",
  },
  {
    id: 3,
    title: { uz: "Ekologik savodxonlik darajang", ru: "Уровень твоей экологической грамотности", en: "Your ecological literacy level" },
    description: {
      uz: "Tabiatni himoya qilish qoidalarini qanchalik yaxshi bilasan?",
      ru: "Насколько хорошо ты знаешь правила защиты природы?",
      en: "How well do you know the rules of protecting nature?",
    },
    questions: 12,
    time: "6",
    participants: 3456,
    emoji: "🌍",
    color: "from-sky/30 to-primary/30",
  },
  {
    id: 4,
    title: { uz: "Daraxtni tavsifidan top", ru: "Угадай дерево по описанию", en: "Guess the tree from its description" },
    description: {
      uz: "Daraxtlarni qanchalik yaxshi tanishingni sinab ko'r.",
      ru: "Проверь, насколько хорошо ты различаешь деревья.",
      en: "See how well you can tell trees apart.",
    },
    questions: 10,
    time: "5",
    participants: 987,
    emoji: "🌳",
    color: "from-primary/30 to-accent/30",
  },
  {
    id: 5,
    title: { uz: "Sen qanday eko-qahramonsan?", ru: "Какой ты эко-герой?", en: "What kind of eco-hero are you?" },
    description: {
      uz: "Eko-shaxsing turini aniqla va foydali maslahatlar ol.",
      ru: "Определи свой эко-тип и получи полезные советы.",
      en: "Discover your eco-personality and get helpful tips.",
    },
    questions: 15,
    time: "8",
    participants: 4521,
    emoji: "🦸",
    color: "from-accent/30 to-orange/30",
  },
  {
    id: 6,
    title: { uz: "Qizil kitob hayvonlari", ru: "Животные из Красной книги", en: "Red Book animals" },
    description: {
      uz: "Noyob va yo'qolib borayotgan turlar haqidagi bilimlaringni tekshir.",
      ru: "Проверь свои знания о редких и исчезающих видах.",
      en: "Test your knowledge of rare and endangered species.",
    },
    questions: 12,
    time: "6",
    participants: 1234,
    emoji: "📕",
    color: "from-orange/30 to-primary/30",
  },
];
