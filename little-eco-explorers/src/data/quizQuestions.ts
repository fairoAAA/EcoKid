import { LocalizedText } from "@/i18n/types";

export interface QuizQuestion {
  id: number;
  emoji: string;
  question: LocalizedText;
  options: [LocalizedText, LocalizedText, LocalizedText, LocalizedText];
  correct: 0 | 1 | 2 | 3;
  explanation: LocalizedText;
}

// Diqqat: bu ro'yxat asl loyihadagi 100 ta savoldan TAKRORLANMAGAN, noyob
// savollarni ajratib olish orqali tuzildi (dasturiy tekshiruv orqali - asl
// faylda 100 tadan atigi 64 tasi noyob edi, 18 tasi so'zma-so'z 2-5 marta
// qaytarilgan edi). Bu yerda 60 tasi qoldirilib, 6 ta bosqichga (har birida
// 10 tadan) taqsimlangan. 31-savoldagi "Batrak" degan mantiqsiz variant
// "Qurbaqa"ga tuzatildi - qolgan barcha savollar va tushuntirishlar original
// mazmunini saqlab qoladi.
export const quizQuestions: QuizQuestion[] = [
  // ---------- 1-BOSQICH ----------
  {
    id: 1, emoji: "🍶",
    question: { uz: "Plastik yo'q bo'lishi uchun qancha vaqt kerak?", ru: "Сколько времени нужно, чтобы пластик разложился?", en: "How long does it take for plastic to break down?" },
    options: [
      { uz: "1 yil", ru: "1 год", en: "1 year" },
      { uz: "10 yil", ru: "10 лет", en: "10 years" },
      { uz: "100–500 yil", ru: "100–500 лет", en: "100–500 years" },
      { uz: "1 oy", ru: "1 месяц", en: "1 month" },
    ],
    correct: 2,
    explanation: { uz: "Plastik shishaning parchalanishi uchun 100–500 yil kerak bo'ladi.", ru: "Пластиковой бутылке требуется 100–500 лет, чтобы разложиться.", en: "A plastic bottle takes 100–500 years to break down." },
  },
  {
    id: 2, emoji: "🐼",
    question: { uz: "WWF ramzi qaysi hayvon?", ru: "Какое животное является символом WWF?", en: "Which animal is the symbol of the WWF?" },
    options: [
      { uz: "Yo'lbars", ru: "Тигр", en: "Tiger" },
      { uz: "Panda", ru: "Панда", en: "Panda" },
      { uz: "Fil", ru: "Слон", en: "Elephant" },
      { uz: "Sher", ru: "Лев", en: "Lion" },
    ],
    correct: 1,
    explanation: { uz: "Katta panda WWF (Butunjahon Yovvoyi Tabiat Fondi) ramzi.", ru: "Большая панда — символ WWF (Всемирного фонда дикой природы).", en: "The giant panda is the symbol of the WWF (World Wildlife Fund)." },
  },
  {
    id: 3, emoji: "⚡",
    question: { uz: "Qaysi energiya manbasi qayta tiklanmaydi?", ru: "Какой источник энергии невозобновляемый?", en: "Which energy source is non-renewable?" },
    options: [
      { uz: "Quyosh", ru: "Солнце", en: "Sun" },
      { uz: "Shamol", ru: "Ветер", en: "Wind" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Suv", ru: "Вода", en: "Water" },
    ],
    correct: 2,
    explanation: { uz: "Neft — qayta tiklanmaydigan manba.", ru: "Нефть — невозобновляемый источник энергии.", en: "Oil is a non-renewable energy source." },
  },
  {
    id: 4, emoji: "🌲",
    question: { uz: "1 tonna qog'oz uchun necha daraxt kerak?", ru: "Сколько деревьев нужно на 1 тонну бумаги?", en: "How many trees does it take to make 1 tonne of paper?" },
    options: [
      { uz: "1–2", ru: "1–2", en: "1–2" },
      { uz: "5–10", ru: "5–10", en: "5–10" },
      { uz: "17–20", ru: "17–20", en: "17–20" },
      { uz: "50", ru: "50", en: "50" },
    ],
    correct: 2,
    explanation: { uz: "1 tonna qog'oz uchun 17–20 daraxt kerak.", ru: "На 1 тонну бумаги требуется 17–20 деревьев.", en: "It takes 17–20 trees to produce 1 tonne of paper." },
  },
  {
    id: 5, emoji: "🌳",
    question: { uz: "O'simliklar qaysi gazni chiqaradi?", ru: "Какой газ выделяют растения?", en: "Which gas do plants release?" },
    options: [
      { uz: "CO2", ru: "CO2", en: "CO2" },
      { uz: "Azot", ru: "Азот", en: "Nitrogen" },
      { uz: "O2", ru: "O2", en: "O2" },
      { uz: "Geliy", ru: "Гелий", en: "Helium" },
    ],
    correct: 2,
    explanation: { uz: "O'simliklar kislorod chiqaradi.", ru: "Растения выделяют кислород.", en: "Plants release oxygen." },
  },
  {
    id: 6, emoji: "🔋",
    question: { uz: "Batareykalarni qayerga tashlash kerak?", ru: "Куда нужно выбрасывать батарейки?", en: "Where should batteries be thrown away?" },
    options: [
      { uz: "Oddiy axlatga", ru: "В обычный мусор", en: "In regular trash" },
      { uz: "Maxsus konteynerga", ru: "В специальный контейнер", en: "In a special container" },
      { uz: "Unitazga", ru: "В унитаз", en: "Down the toilet" },
      { uz: "Ko'chaga", ru: "На улицу", en: "On the street" },
    ],
    correct: 1,
    explanation: { uz: "Batareykalar zararli modda tarqatadi, shuning uchun maxsus konteynerga tashlanishi kerak.", ru: "Батарейки выделяют вредные вещества, поэтому их нужно выбрасывать в специальный контейнер.", en: "Batteries release harmful substances, so they must go in a special container." },
  },
  {
    id: 7, emoji: "🇩🇪",
    question: { uz: "Qaysi mamlakat chiqindilarni qayta ishlashda yetakchi?", ru: "Какая страна лидирует по переработке отходов?", en: "Which country leads in recycling waste?" },
    options: [
      { uz: "AQSh", ru: "США", en: "USA" },
      { uz: "Xitoy", ru: "Китай", en: "China" },
      { uz: "Germaniya", ru: "Германия", en: "Germany" },
      { uz: "Rossiya", ru: "Россия", en: "Russia" },
    ],
    correct: 2,
    explanation: { uz: "Germaniya chiqindilarning 65 foizdan ortig'ini qayta ishlaydi.", ru: "Германия перерабатывает более 65% отходов.", en: "Germany recycles more than 65% of its waste." },
  },
  {
    id: 8, emoji: "🌊",
    question: { uz: "Yer yuzasining necha foizi suv bilan qoplangan?", ru: "Сколько процентов поверхности Земли покрыто водой?", en: "What percentage of Earth's surface is covered by water?" },
    options: [
      { uz: "50%", ru: "50%", en: "50%" },
      { uz: "71%", ru: "71%", en: "71%" },
      { uz: "30%", ru: "30%", en: "30%" },
      { uz: "90%", ru: "90%", en: "90%" },
    ],
    correct: 1,
    explanation: { uz: "Yer yuzasining 71% qismi suv bilan qoplangan.", ru: "71% поверхности Земли покрыто водой.", en: "71% of Earth's surface is covered by water." },
  },
  {
    id: 9, emoji: "👣",
    question: { uz: "Karbon izi nima?", ru: "Что такое углеродный след?", en: "What is a carbon footprint?" },
    options: [
      { uz: "Ko'mir izi", ru: "След от угля", en: "A trace of coal" },
      { uz: "CO2 miqdori", ru: "Количество CO2", en: "The amount of CO2" },
      { uz: "Qora dog'", ru: "Чёрное пятно", en: "A black stain" },
      { uz: "Dinozavr izi", ru: "След динозавра", en: "A dinosaur footprint" },
    ],
    correct: 1,
    explanation: { uz: "Karbon izi — biz ishlab chiqaradigan CO2 miqdori.", ru: "Углеродный след — это количество CO2, которое мы производим.", en: "A carbon footprint is the amount of CO2 we produce." },
  },
  {
    id: 10, emoji: "🏜️",
    question: { uz: "Qaysi dengiz qurib bormoqda?", ru: "Какое море высыхает?", en: "Which sea is drying up?" },
    options: [
      { uz: "Qora dengiz", ru: "Чёрное море", en: "The Black Sea" },
      { uz: "Orol dengizi", ru: "Аральское море", en: "The Aral Sea" },
      { uz: "O'rta dengiz", ru: "Средиземное море", en: "The Mediterranean Sea" },
      { uz: "Qizil dengiz", ru: "Красное море", en: "The Red Sea" },
    ],
    correct: 1,
    explanation: { uz: "Orol dengizi deyarli qurib qolgan.", ru: "Аральское море почти полностью высохло.", en: "The Aral Sea has nearly dried up completely." },
  },

  // ---------- 2-BOSQICH ----------
  {
    id: 11, emoji: "🐋",
    question: { uz: "Har yili okeanga qancha plastik tushadi?", ru: "Сколько пластика попадает в океан каждый год?", en: "How much plastic enters the ocean every year?" },
    options: [
      { uz: "100 ming tonna", ru: "100 тысяч тонн", en: "100 thousand tonnes" },
      { uz: "1 mln tonna", ru: "1 млн тонн", en: "1 million tonnes" },
      { uz: "8 mln tonna", ru: "8 млн тонн", en: "8 million tonnes" },
      { uz: "100 tonna", ru: "100 тонн", en: "100 tonnes" },
    ],
    correct: 2,
    explanation: { uz: "Okeanga har yili taxminan 8 million tonna plastik tushadi.", ru: "В океан ежегодно попадает около 8 миллионов тонн пластика.", en: "About 8 million tonnes of plastic enter the ocean every year." },
  },
  {
    id: 12, emoji: "🌱",
    question: { uz: "Kompost nima?", ru: "Что такое компост?", en: "What is compost?" },
    options: [
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Organik chiqindidan o'g'it", ru: "Удобрение из органических отходов", en: "Fertilizer made from organic waste" },
      { uz: "Kimyoviy modda", ru: "Химическое вещество", en: "A chemical substance" },
      { uz: "Hayvonlar uchun ozuqa", ru: "Корм для животных", en: "Animal feed" },
    ],
    correct: 1,
    explanation: { uz: "Kompost — organik chiqindilardan tayyorlangan tabiiy o'g'it.", ru: "Компост — это natural удобрение, приготовленное из органических отходов.", en: "Compost is a natural fertilizer made from organic waste." },
  },
  {
    id: 13, emoji: "🐦",
    question: { uz: "Qaysi qush orqaga uchishi mumkin?", ru: "Какая птица умеет летать назад?", en: "Which bird can fly backwards?" },
    options: [
      { uz: "Chumchuq", ru: "Воробей", en: "Sparrow" },
      { uz: "Kolibri", ru: "Колибри", en: "Hummingbird" },
      { uz: "Burgut", ru: "Орёл", en: "Eagle" },
      { uz: "Kabutar", ru: "Голубь", en: "Pigeon" },
    ],
    correct: 1,
    explanation: { uz: "Kolibri — orqaga uchishga qodir yagona qush turi.", ru: "Колибри — единственная птица, способная летать назад.", en: "The hummingbird is the only bird that can fly backwards." },
  },
  {
    id: 14, emoji: "🧊",
    question: { uz: "Global isish natijasida nima sodir bo'ladi?", ru: "Что происходит из-за глобального потепления?", en: "What happens as a result of global warming?" },
    options: [
      { uz: "Okean soviydi", ru: "Океан охлаждается", en: "The ocean cools down" },
      { uz: "Muzliklar eriydi", ru: "Ледники тают", en: "Glaciers melt" },
      { uz: "Daraxtlar tezroq o'sadi", ru: "Деревья растут быстрее", en: "Trees grow faster" },
      { uz: "Hayvonlar ko'payadi", ru: "Животных становится больше", en: "Animal populations grow" },
    ],
    correct: 1,
    explanation: { uz: "Muzliklar eriydi va iqlim o'zgaradi.", ru: "Ледники тают, и климат меняется.", en: "Glaciers melt and the climate changes." },
  },
  {
    id: 15, emoji: "🦤",
    question: { uz: "Qaysi hayvon inson tufayli yo'q bo'lib ketgan?", ru: "Какое животное вымерло из-за человека?", en: "Which animal went extinct because of humans?" },
    options: [
      { uz: "It", ru: "Собака", en: "Dog" },
      { uz: "Mushuk", ru: "Кошка", en: "Cat" },
      { uz: "Dodo", ru: "Додо", en: "Dodo" },
      { uz: "Chumchuq", ru: "Воробей", en: "Sparrow" },
    ],
    correct: 2,
    explanation: { uz: "Dodo qushi ov qilish tufayli yo'q bo'lib ketgan.", ru: "Птица додо вымерла из-за охоты на неё.", en: "The dodo bird went extinct due to hunting." },
  },
  {
    id: 16, emoji: "💨",
    question: { uz: "Qaysi energiya manbasi ifloslantirmaydi?", ru: "Какой источник энергии не загрязняет природу?", en: "Which energy source doesn't pollute?" },
    options: [
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Shamol", ru: "Ветер", en: "Wind" },
      { uz: "Gaz", ru: "Газ", en: "Gas" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
    ],
    correct: 1,
    explanation: { uz: "Shamol energiyasi ifloslanish keltirib chiqarmaydi.", ru: "Энергия ветра не вызывает загрязнения.", en: "Wind energy doesn't cause pollution." },
  },
  {
    id: 17, emoji: "💧",
    question: { uz: "Qaysi chiqindi turi suvni ko'proq ifloslantiradi?", ru: "Какой вид отходов сильнее всего загрязняет воду?", en: "Which type of waste pollutes water the most?" },
    options: [
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Qog'oz", ru: "Бумага", en: "Paper" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
    ],
    correct: 0,
    explanation: { uz: "Plastik chiqindilar suv havzalarini eng ko'p ifloslantiradi.", ru: "Пластиковые отходы сильнее всего загрязняют водоёмы.", en: "Plastic waste pollutes bodies of water the most." },
  },
  {
    id: 18, emoji: "☀️",
    question: { uz: "Qaysi energiya manbasi cheksiz hisoblanadi?", ru: "Какой источник энергии считается бесконечным?", en: "Which energy source is considered limitless?" },
    options: [
      { uz: "Quyosh", ru: "Солнце", en: "Sun" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Gaz", ru: "Газ", en: "Gas" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
    ],
    correct: 0,
    explanation: { uz: "Quyosh energiyasi deyarli cheksiz manbadir.", ru: "Солнечная энергия — практически бесконечный источник.", en: "Solar energy is an almost limitless source." },
  },
  {
    id: 19, emoji: "🐾",
    question: { uz: "Qaysi hayvonlar himoyaga muhtoj?", ru: "Какие животные нуждаются в защите?", en: "Which animals need protection?" },
    options: [
      { uz: "Yo'lbars", ru: "Тигр", en: "Tiger" },
      { uz: "Panda", ru: "Панда", en: "Panda" },
      { uz: "Fil", ru: "Слон", en: "Elephant" },
      { uz: "Barchasi", ru: "Все вышеперечисленные", en: "All of the above" },
    ],
    correct: 3,
    explanation: { uz: "Barcha bu turlar yo'qolib ketish xavfi ostida va himoyaga muhtoj.", ru: "Все эти виды находятся под угрозой исчезновения и нуждаются в защите.", en: "All of these species are endangered and need protection." },
  },
  {
    id: 20, emoji: "♻️",
    question: { uz: "Qaysi chiqindilarni qayta ishlash mumkin?", ru: "Какие отходы можно перерабатывать?", en: "Which waste materials can be recycled?" },
    options: [
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Barchasi", ru: "Всё перечисленное", en: "All of the above" },
    ],
    correct: 3,
    explanation: { uz: "Plastik, metall va shishaning barchasini qayta ishlash mumkin.", ru: "Пластик, металл и стекло — всё это можно перерабатывать.", en: "Plastic, metal, and glass can all be recycled." },
  },

  // ---------- 3-BOSQICH ----------
  {
    id: 21, emoji: "🌍",
    question: { uz: "\"Ekologiya\" so'zi nimani anglatadi?", ru: "Что означает слово «экология»?", en: "What does the word \"ecology\" mean?" },
    options: [
      { uz: "Uy", ru: "Дом", en: "House" },
      { uz: "Oila", ru: "Семья", en: "Family" },
      { uz: "Tirik mavjudotlarning atrof-muhit bilan aloqasi", ru: "Связь живых существ с окружающей средой", en: "The relationship between living things and their environment" },
      { uz: "Hech biri", ru: "Ничего из перечисленного", en: "None of the above" },
    ],
    correct: 2,
    explanation: { uz: "Ekologiya — atrof-muhit va organizmlar o'rtasidagi munosabatlarni o'rganadigan fan.", ru: "Экология — наука, изучающая взаимоотношения между окружающей средой и организмами.", en: "Ecology is the science that studies the relationship between organisms and their environment." },
  },
  {
    id: 22, emoji: "🛡️",
    question: { uz: "Ozon qatlami nima uchun muhim?", ru: "Почему важен озоновый слой?", en: "Why is the ozone layer important?" },
    options: [
      { uz: "CO2 chiqaradi", ru: "Выделяет CO2", en: "It releases CO2" },
      { uz: "Zararli nurlanishni bloklaydi", ru: "Блокирует вредное излучение", en: "It blocks harmful radiation" },
      { uz: "Namlikni oshiradi", ru: "Повышает влажность", en: "It increases humidity" },
      { uz: "Hech biri", ru: "Ничего из перечисленного", en: "None of the above" },
    ],
    correct: 1,
    explanation: { uz: "Ozon qatlami quyoshning zararli ultrabinafsha nurlarini bloklaydi.", ru: "Озоновый слой блокирует вредное ультрафиолетовое излучение солнца.", en: "The ozone layer blocks the sun's harmful ultraviolet rays." },
  },
  {
    id: 23, emoji: "📅",
    question: { uz: "Jahon atrof-muhitni muhofaza qilish kuni qachon nishonlanadi?", ru: "Когда отмечается Всемирный день окружающей среды?", en: "When is World Environment Day celebrated?" },
    options: [
      { uz: "5 may", ru: "5 мая", en: "May 5" },
      { uz: "5 iyun", ru: "5 июня", en: "June 5" },
      { uz: "10 iyun", ru: "10 июня", en: "June 10" },
      { uz: "15 iyun", ru: "15 июня", en: "June 15" },
    ],
    correct: 1,
    explanation: { uz: "5 iyun — Jahon atrof-muhitni muhofaza qilish kuni.", ru: "5 июня — Всемирный день окружающей среды.", en: "June 5 is World Environment Day." },
  },
  {
    id: 24, emoji: "🔥",
    question: { uz: "Qaysi gaz issiqxona effektini kuchaytiradi?", ru: "Какой газ усиливает парниковый эффект?", en: "Which gas increases the greenhouse effect?" },
    options: [
      { uz: "Kislorod", ru: "Кислород", en: "Oxygen" },
      { uz: "Metan", ru: "Метан", en: "Methane" },
      { uz: "Azot", ru: "Азот", en: "Nitrogen" },
      { uz: "Geliy", ru: "Гелий", en: "Helium" },
    ],
    correct: 1,
    explanation: { uz: "Metan — asosiy issiqxona gazlaridan biri.", ru: "Метан — один из основных парниковых газов.", en: "Methane is one of the main greenhouse gases." },
  },
  {
    id: 25, emoji: "💧",
    question: { uz: "Tabiatdagi suv aylanishi qanday boshlanadi?", ru: "С чего начинается круговорот воды в природе?", en: "What is the first stage of the water cycle?" },
    options: [
      { uz: "Bug'lanish", ru: "Испарение", en: "Evaporation" },
      { uz: "Sikl", ru: "Цикл", en: "Cycle" },
      { uz: "Oqim", ru: "Течение", en: "Current" },
      { uz: "Yugurish", ru: "Бег", en: "Running" },
    ],
    correct: 0,
    explanation: { uz: "Bug'lanish — suv aylanishining boshlang'ich bosqichi.", ru: "Испарение — это начальный этап круговорота воды.", en: "Evaporation is the first stage of the water cycle." },
  },
  {
    id: 26, emoji: "🌳",
    question: { uz: "Nima tuproq eroziyasini kamaytiradi?", ru: "Что уменьшает эрозию почвы?", en: "What reduces soil erosion?" },
    options: [
      { uz: "Daraxtlar", ru: "Деревья", en: "Trees" },
      { uz: "G'alla", ru: "Зерно", en: "Grain" },
      { uz: "Barchasi", ru: "Всё перечисленное", en: "All of the above" },
      { uz: "Hech biri", ru: "Ничего из перечисленного", en: "None of the above" },
    ],
    correct: 0,
    explanation: { uz: "Daraxtlar ildizi bilan tuproqni mustahkamlab, eroziyani kamaytiradi.", ru: "Деревья укрепляют почву корнями и уменьшают эрозию.", en: "Trees hold soil together with their roots and reduce erosion." },
  },
  {
    id: 27, emoji: "🏭",
    question: { uz: "Havo ifloslanishining asosiy omili nima?", ru: "Что является основной причиной загрязнения воздуха?", en: "What is the main cause of air pollution?" },
    options: [
      { uz: "Ozon", ru: "Озон", en: "Ozone" },
      { uz: "CO2", ru: "CO2", en: "CO2" },
      { uz: "To'siqlar", ru: "Преграды", en: "Barriers" },
      { uz: "Zavod tutuni", ru: "Заводской дым", en: "Factory smoke" },
    ],
    correct: 3,
    explanation: { uz: "Zavod tutuni havoning ifloslanishiga eng katta hissa qo'shadi.", ru: "Заводской дым сильнее всего загрязняет воздух.", en: "Factory smoke contributes the most to air pollution." },
  },
  {
    id: 28, emoji: "☢️",
    question: { uz: "Qaysi chiqindi turi eng xavfli hisoblanadi?", ru: "Какой вид отходов считается самым опасным?", en: "Which type of waste is considered the most dangerous?" },
    options: [
      { uz: "Organik", ru: "Органические", en: "Organic" },
      { uz: "Radioaktiv", ru: "Радиоактивные", en: "Radioactive" },
      { uz: "Qog'oz", ru: "Бумага", en: "Paper" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
    ],
    correct: 1,
    explanation: { uz: "Radioaktiv chiqindi eng xavfli chiqindi turi hisoblanadi.", ru: "Радиоактивные отходы считаются самым опасным видом отходов.", en: "Radioactive waste is considered the most dangerous type of waste." },
  },
  {
    id: 29, emoji: "🧬",
    question: { uz: "Biologik xilma-xillik nima?", ru: "Что такое биологическое разнообразие?", en: "What is biodiversity?" },
    options: [
      { uz: "Shakllar xilma-xilligi", ru: "Разнообразие форм", en: "Diversity of shapes" },
      { uz: "Tirik organizmlar xilma-xilligi", ru: "Разнообразие живых организмов", en: "Diversity of living organisms" },
      { uz: "Rang variantlari", ru: "Варианты цветов", en: "Color variations" },
      { uz: "Hech biri", ru: "Ничего из перечисленного", en: "None of the above" },
    ],
    correct: 1,
    explanation: { uz: "Biologik xilma-xillik — Yerdagi tirik organizmlarning turli-tumanligini bildiradi.", ru: "Биологическое разнообразие — это разнообразие живых организмов на Земле.", en: "Biodiversity refers to the variety of living organisms on Earth." },
  },
  {
    id: 30, emoji: "🏞️",
    question: { uz: "Qaysi joyda tabiiy botqoq-ekotizim mavjud bo'lishi mumkin?", ru: "Где может существовать природная болотная экосистема?", en: "Where can a natural wetland ecosystem exist?" },
    options: [
      { uz: "Cho'l", ru: "Пустыня", en: "Desert" },
      { uz: "Botqoqliklar", ru: "Болота", en: "Wetlands" },
      { uz: "Shahar", ru: "Город", en: "City" },
      { uz: "Barchasi", ru: "Везде из перечисленного", en: "All of the above" },
    ],
    correct: 1,
    explanation: { uz: "Botqoqliklar boy tabiiy ekotizimga ega bo'lgan hududlardir.", ru: "Болота — территории с богатой природной экосистемой.", en: "Wetlands are areas with rich natural ecosystems." },
  },

  // ---------- 4-BOSQICH ----------
  {
    id: 31, emoji: "🦀",
    question: { uz: "Qaysi hayvon suvni tozalashda yordam beradi?", ru: "Какое животное помогает очищать воду?", en: "Which animal helps clean water?" },
    options: [
      { uz: "Baliq", ru: "Рыба", en: "Fish" },
      { uz: "Salyangoz", ru: "Улитка", en: "Snail" },
      { uz: "Qurbaqa", ru: "Лягушка", en: "Frog" },
      { uz: "Qisqichbaqa", ru: "Краб", en: "Crab" },
    ],
    correct: 3,
    explanation: { uz: "Qisqichbaqalar suvdagi o'simlik va organik qoldiqlarni tozalashga yordam beradi.", ru: "Крабы помогают очищать воду от растительных и органических остатков.", en: "Crabs help clean plant matter and organic debris out of the water." },
  },
  {
    id: 32, emoji: "🌳",
    question: { uz: "Qaysi daraxtlar shamol eroziyasini kamaytiradi?", ru: "Какие деревья уменьшают ветровую эрозию?", en: "Which trees reduce wind erosion?" },
    options: [
      { uz: "Faqat maxsus \"shamol daraxtlari\"", ru: "Только специальные «ветрозащитные деревья»", en: "Only special \"windbreak trees\"" },
      { uz: "Faqat qizil daraxt", ru: "Только красное дерево", en: "Only redwood" },
      { uz: "Barcha daraxtlar", ru: "Все деревья", en: "All trees" },
      { uz: "Hech biri", ru: "Ни одно", en: "None of them" },
    ],
    correct: 2,
    explanation: { uz: "Barcha daraxtlar shamol eroziyasini kamaytirishga yordam beradi.", ru: "Все деревья помогают уменьшить ветровую эрозию.", en: "All trees help reduce wind erosion." },
  },
  {
    id: 33, emoji: "🏭",
    question: { uz: "Qaysi modda havo ifloslanishini eng ko'p oshiradi?", ru: "Что сильнее всего повышает загрязнение воздуха?", en: "What increases air pollution the most?" },
    options: [
      { uz: "CO2", ru: "CO2", en: "CO2" },
      { uz: "Metan", ru: "Метан", en: "Methane" },
      { uz: "Zavod tutuni", ru: "Заводской дым", en: "Factory smoke" },
      { uz: "Ozon", ru: "Озон", en: "Ozone" },
    ],
    correct: 2,
    explanation: { uz: "Zavod tutuni havoni eng ko'p ifloslantiradigan omillardan biri.", ru: "Заводской дым — один из главных источников загрязнения воздуха.", en: "Factory smoke is one of the leading causes of air pollution." },
  },
  {
    id: 34, emoji: "☀️",
    question: { uz: "Qaysi energiya manbasi eng barqaror hisoblanadi?", ru: "Какой источник энергии считается самым устойчивым?", en: "Which energy source is considered the most sustainable?" },
    options: [
      { uz: "Quyosh", ru: "Солнце", en: "Sun" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
      { uz: "Gaz", ru: "Газ", en: "Gas" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
    ],
    correct: 0,
    explanation: { uz: "Quyosh energiyasi cheksiz va barqaror manba hisoblanadi.", ru: "Солнечная энергия — неисчерпаемый и устойчивый источник.", en: "Solar energy is a limitless, sustainable source." },
  },
  {
    id: 35, emoji: "☢️",
    question: { uz: "Qaysi chiqindi juda xavfli hisoblanadi?", ru: "Какие отходы считаются очень опасными?", en: "Which waste is considered very dangerous?" },
    options: [
      { uz: "Organik", ru: "Органические", en: "Organic" },
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Radioaktiv", ru: "Радиоактивные", en: "Radioactive" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
    ],
    correct: 2,
    explanation: { uz: "Radioaktiv chiqindi inson salomatligi uchun juda xavflidir.", ru: "Радиоактивные отходы очень опасны для здоровья человека.", en: "Radioactive waste is very dangerous to human health." },
  },
  {
    id: 38, emoji: "🌲",
    question: { uz: "Qaysi daraxtlar tuproqda suvni ushlab turadi?", ru: "Какие деревья удерживают воду в почве?", en: "Which trees hold water in the soil?" },
    options: [
      { uz: "Faqat sadr", ru: "Только кедр", en: "Only cedar" },
      { uz: "Faqat qarag'ay", ru: "Только сосна", en: "Only pine" },
      { uz: "Barcha daraxtlar", ru: "Все деревья", en: "All trees" },
      { uz: "Faqat \"shamol daraxti\"", ru: "Только «ветрозащитное дерево»", en: "Only \"windbreak\" trees" },
    ],
    correct: 2,
    explanation: { uz: "Barcha daraxtlarning ildizlari tuproqdagi namlikni ushlab turishga yordam beradi.", ru: "Корни всех деревьев помогают удерживать влагу в почве.", en: "The roots of all trees help hold moisture in the soil." },
  },
  {
    id: 39, emoji: "🐾",
    question: { uz: "Qaysi hayvonlar biologik xilma-xillikni saqlashga yordam beradi?", ru: "Какие животные помогают сохранять биоразнообразие?", en: "Which animals help preserve biodiversity?" },
    options: [
      { uz: "Fil", ru: "Слон", en: "Elephant" },
      { uz: "Baliq", ru: "Рыба", en: "Fish" },
      { uz: "Barchasi", ru: "Все перечисленные", en: "All of them" },
      { uz: "Hech biri", ru: "Ни одно", en: "None of them" },
    ],
    correct: 2,
    explanation: { uz: "Barcha turlar ekologik barqarorlikka o'z hissasini qo'shadi.", ru: "Все виды вносят свой вклад в экологическую устойчивость.", en: "Every species contributes to ecological balance." },
  },
  {
    id: 40, emoji: "🌊",
    question: { uz: "Okeanlarni eng ko'p ifloslantiradigan modda qaysi?", ru: "Что сильнее всего загрязняет океаны?", en: "What pollutes the oceans the most?" },
    options: [
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Qog'oz", ru: "Бумага", en: "Paper" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
    ],
    correct: 0,
    explanation: { uz: "Plastik chiqindilar okeanlarni eng ko'p ifloslantiruvchi moddadir.", ru: "Пластиковые отходы сильнее всего загрязняют океаны.", en: "Plastic waste is the biggest polluter of the oceans." },
  },
  {
    id: 41, emoji: "🦁",
    question: { uz: "Qaysi hayvonlar ekologik muvozanatni saqlaydi?", ru: "Какие животные поддерживают экологическое равновесие?", en: "Which animals maintain ecological balance?" },
    options: [
      { uz: "Sher", ru: "Лев", en: "Lion" },
      { uz: "Fil", ru: "Слон", en: "Elephant" },
      { uz: "Barcha yovvoyi hayvonlar", ru: "Все дикие животные", en: "All wild animals" },
      { uz: "It", ru: "Собака", en: "Dog" },
    ],
    correct: 2,
    explanation: { uz: "Barcha yovvoyi hayvonlar tabiatdagi ekologik muvozanatni saqlashda o'z rolini o'ynaydi.", ru: "Все дикие животные играют свою роль в поддержании экологического баланса природы.", en: "All wild animals play a role in maintaining nature's ecological balance." },
  },
  {
    id: 42, emoji: "🔆",
    question: { uz: "Qaysi energiya turi to'g'ridan-to'g'ri quyosh nuridan olinadi?", ru: "Какой вид энергии получают напрямую из солнечного света?", en: "Which type of energy comes directly from sunlight?" },
    options: [
      { uz: "Fotovoltaik", ru: "Фотоэлектрическая", en: "Photovoltaic" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
      { uz: "Metan", ru: "Метан", en: "Methane" },
    ],
    correct: 0,
    explanation: { uz: "Fotovoltaik panellar quyosh nurini to'g'ridan-to'g'ri elektr energiyasiga aylantiradi.", ru: "Фотоэлектрические панели напрямую преобразуют солнечный свет в электричество.", en: "Photovoltaic panels convert sunlight directly into electricity." },
  },

  // ---------- 5-BOSQICH ----------
  {
    id: 43, emoji: "🌿",
    question: { uz: "O'simliklar nima uchun hayot uchun zarur?", ru: "Почему растения необходимы для жизни?", en: "Why are plants essential for life?" },
    options: [
      { uz: "Kislorod chiqaradi", ru: "Выделяют кислород", en: "They release oxygen" },
      { uz: "CO2 chiqaradi", ru: "Выделяют CO2", en: "They release CO2" },
      { uz: "Hech qanday sababi yo'q", ru: "Нет причины", en: "There's no reason" },
      { uz: "Barcha javoblar", ru: "Все ответы верны", en: "All of the answers" },
    ],
    correct: 0,
    explanation: { uz: "O'simliklar kislorod ishlab chiqaradi va bu hayot uchun zarurdir.", ru: "Растения производят кислород, необходимый для жизни.", en: "Plants produce the oxygen that life depends on." },
  },
  {
    id: 45, emoji: "💨",
    question: { uz: "Qaysi energiya manbasi havo ifloslanishini kamaytiradi?", ru: "Какой источник энергии снижает загрязнение воздуха?", en: "Which energy source reduces air pollution?" },
    options: [
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
      { uz: "Shamol", ru: "Ветер", en: "Wind" },
      { uz: "Gaz", ru: "Газ", en: "Gas" },
    ],
    correct: 2,
    explanation: { uz: "Shamol energiyasi havoni ifloslantirmasdan elektr ishlab chiqaradi.", ru: "Энергия ветра производит электричество, не загрязняя воздух.", en: "Wind energy generates electricity without polluting the air." },
  },
  {
    id: 46, emoji: "🌳",
    question: { uz: "Nima tuproqni mustahkam va barqaror qiladi?", ru: "Что делает почву прочной и устойчивой?", en: "What keeps soil strong and stable?" },
    options: [
      { uz: "Barcha daraxtlar", ru: "Все деревья", en: "All trees" },
      { uz: "Faqat \"shamol daraxti\"", ru: "Только «ветрозащитное дерево»", en: "Only \"windbreak\" trees" },
      { uz: "Faqat palma", ru: "Только пальма", en: "Only palm trees" },
      { uz: "Hech biri", ru: "Ничто из перечисленного", en: "None of the above" },
    ],
    correct: 0,
    explanation: { uz: "Barcha daraxtlarning ildiz tizimi tuproqni mustahkamlaydi.", ru: "Корневая система любых деревьев укрепляет почву.", en: "The root system of any tree helps hold soil together." },
  },
  {
    id: 47, emoji: "🍌",
    question: { uz: "Qaysi chiqindi turi organik hisoblanadi?", ru: "Какой вид отходов является органическим?", en: "Which kind of waste is organic?" },
    options: [
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Meva qoldig'i", ru: "Остатки фруктов", en: "Fruit scraps" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
    ],
    correct: 1,
    explanation: { uz: "Meva qoldiqlari organik chiqindi hisoblanadi va kompost uchun ishlatilishi mumkin.", ru: "Остатки фруктов — это органические отходы, которые можно использовать для компоста.", en: "Fruit scraps are organic waste and can be used for composting." },
  },
  {
    id: 48, emoji: "🦀",
    question: { uz: "Qaysi hayvon suvni tabiiy ravishda tozalaydi?", ru: "Какое животное естественным образом очищает воду?", en: "Which animal naturally helps purify water?" },
    options: [
      { uz: "Qisqichbaqa", ru: "Краб", en: "Crab" },
      { uz: "Baliq", ru: "Рыба", en: "Fish" },
      { uz: "Chumchuq", ru: "Воробей", en: "Sparrow" },
      { uz: "Fil", ru: "Слон", en: "Elephant" },
    ],
    correct: 0,
    explanation: { uz: "Qisqichbaqalar suvdagi organik qoldiqlarni tozalashga yordam beradi.", ru: "Крабы помогают очищать водоёмы от органических остатков.", en: "Crabs help clean organic debris out of the water." },
  },
  {
    id: 49, emoji: "☀️",
    question: { uz: "Qaysi energiya manbasi ham cheksiz, ham barqaror?", ru: "Какой источник энергии одновременно неисчерпаем и устойчив?", en: "Which energy source is both limitless and sustainable?" },
    options: [
      { uz: "Quyosh", ru: "Солнце", en: "Sun" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Gaz", ru: "Газ", en: "Gas" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
    ],
    correct: 0,
    explanation: { uz: "Quyosh energiyasi cheksiz va barqaror manbadir.", ru: "Солнечная энергия — неисчерпаемый и устойчивый источник.", en: "Solar energy is a limitless and sustainable source." },
  },
  {
    id: 51, emoji: "🐿️",
    question: { uz: "Qaysi hayvonlar o'simlik urug'larini tarqatadi?", ru: "Какие животные распространяют семена растений?", en: "Which animals spread plant seeds?" },
    options: [
      { uz: "Quyon", ru: "Заяц", en: "Rabbit" },
      { uz: "Chumchuq", ru: "Воробей", en: "Sparrow" },
      { uz: "Ko'plab hayvon turlari", ru: "Многие виды животных", en: "Many kinds of animals" },
      { uz: "Fil", ru: "Слон", en: "Elephant" },
    ],
    correct: 2,
    explanation: { uz: "Ko'plab hayvon turlari mevalarni yeb, urug'larni tabiatda tarqatishga yordam beradi.", ru: "Многие животные, поедая плоды, помогают распространять семена по природе.", en: "Many animals help spread seeds through nature by eating fruit." },
  },
  {
    id: 54, emoji: "☢️",
    question: { uz: "Qaysi chiqindi turi zararli hisoblanadi?", ru: "Какой вид отходов считается вредным?", en: "Which type of waste is considered harmful?" },
    options: [
      { uz: "Organik", ru: "Органические", en: "Organic" },
      { uz: "Radioaktiv", ru: "Радиоактивные", en: "Radioactive" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
    ],
    correct: 1,
    explanation: { uz: "Radioaktiv chiqindi eng xavfli chiqindi turlaridan biridir.", ru: "Радиоактивные отходы — один из самых опасных видов отходов.", en: "Radioactive waste is one of the most dangerous types of waste." },
  },
  {
    id: 55, emoji: "🦀",
    question: { uz: "Qaysi hayvonlar suv muhitini tozalashga yordam beradi?", ru: "Какие животные помогают очищать водную среду?", en: "Which animals help clean the water environment?" },
    options: [
      { uz: "Qisqichbaqa", ru: "Краб", en: "Crab" },
      { uz: "Baliq", ru: "Рыба", en: "Fish" },
      { uz: "Ikkalasi ham", ru: "Оба варианта", en: "Both of them" },
      { uz: "Hech biri", ru: "Ни один", en: "Neither" },
    ],
    correct: 2,
    explanation: { uz: "Qisqichbaqa va baliqlarning ko'plab turlari suvni tozalashda yordam beradi.", ru: "Многие виды крабов и рыб помогают очищать воду.", en: "Many species of crabs and fish help keep the water clean." },
  },
  {
    id: 56, emoji: "💧",
    question: { uz: "Qaysi energiya turi suv oqimidan olinadi?", ru: "Какой вид энергии получают из потока воды?", en: "Which type of energy is generated from flowing water?" },
    options: [
      { uz: "Gidroelektr", ru: "Гидроэнергия", en: "Hydroelectric" },
      { uz: "Ko'mir", ru: "Уголь", en: "Coal" },
      { uz: "Neft", ru: "Нефть", en: "Oil" },
      { uz: "Shamol", ru: "Ветер", en: "Wind" },
    ],
    correct: 0,
    explanation: { uz: "Gidroelektr stansiyalari suv oqimidan elektr energiyasi ishlab chiqaradi.", ru: "Гидроэлектростанции вырабатывают электричество за счёт потока воды.", en: "Hydroelectric plants generate electricity from the flow of water." },
  },

  // ---------- 6-BOSQICH ----------
  {
    id: 57, emoji: "♻️",
    question: { uz: "Qaysi materiallarni qayta ishlash mumkin?", ru: "Какие материалы можно перерабатывать?", en: "Which materials can be recycled?" },
    options: [
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
      { uz: "Barchasi", ru: "Всё перечисленное", en: "All of the above" },
    ],
    correct: 3,
    explanation: { uz: "Shisha, plastik va metallning barchasini qayta ishlash mumkin.", ru: "Стекло, пластик и металл — всё это подлежит переработке.", en: "Glass, plastic, and metal can all be recycled." },
  },
  {
    id: 58, emoji: "🐝",
    question: { uz: "Qaysi hayvonlar o'simliklarni changlatadi?", ru: "Какие животные опыляют растения?", en: "Which animals pollinate plants?" },
    options: [
      { uz: "Asalarilar", ru: "Пчёлы", en: "Bees" },
      { uz: "Itlar", ru: "Собаки", en: "Dogs" },
      { uz: "Mushuklar", ru: "Кошки", en: "Cats" },
      { uz: "Baliqlar", ru: "Рыбы", en: "Fish" },
    ],
    correct: 0,
    explanation: { uz: "Asalarilar o'simliklarni changlatib, mevalar hosil bo'lishiga yordam beradi.", ru: "Пчёлы опыляют растения, помогая формироваться плодам.", en: "Bees pollinate plants, helping fruit to form." },
  },
  {
    id: 59, emoji: "🌳",
    question: { uz: "Nima havo sifatini yaxshilaydi?", ru: "Что улучшает качество воздуха?", en: "What improves air quality?" },
    options: [
      { uz: "Barcha daraxtlar", ru: "Все деревья", en: "All trees" },
      { uz: "Faqat palma", ru: "Только пальма", en: "Only palm trees" },
      { uz: "Faqat sadr", ru: "Только кедр", en: "Only cedar" },
      { uz: "Faqat \"shamol daraxti\"", ru: "Только «ветрозащитное дерево»", en: "Only \"windbreak\" trees" },
    ],
    correct: 0,
    explanation: { uz: "Barcha daraxtlar havodagi kislorod miqdorini oshirib, havo sifatini yaxshilaydi.", ru: "Все деревья повышают уровень кислорода и улучшают качество воздуха.", en: "All trees raise oxygen levels and improve air quality." },
  },
  {
    id: 62, emoji: "🐾",
    question: { uz: "Qaysi hayvonlar biologik xilma-xillikni oshiradi?", ru: "Какие животные повышают биоразнообразие?", en: "Which animals increase biodiversity?" },
    options: [
      { uz: "Fil", ru: "Слон", en: "Elephant" },
      { uz: "Quyon", ru: "Заяц", en: "Rabbit" },
      { uz: "Har bir tur o'z hissasini qo'shadi", ru: "Каждый вид вносит свой вклад", en: "Every species contributes" },
      { uz: "Mushuk", ru: "Кошка", en: "Cat" },
    ],
    correct: 2,
    explanation: { uz: "Har bir hayvon turi biologik xilma-xillikka o'z hissasini qo'shadi.", ru: "Каждый вид животных вносит свой вклад в биологическое разнообразие.", en: "Every animal species contributes to biodiversity." },
  },
  {
    id: 65, emoji: "🌳",
    question: { uz: "Nima tuproq eroziyasini kamaytirishga yordam beradi?", ru: "Что помогает уменьшить эрозию почвы?", en: "What helps reduce soil erosion?" },
    options: [
      { uz: "Barcha daraxtlar", ru: "Все деревья", en: "All trees" },
      { uz: "Faqat palma", ru: "Только пальма", en: "Only palm trees" },
      { uz: "Faqat \"shamol daraxti\"", ru: "Только «ветрозащитное дерево»", en: "Only \"windbreak\" trees" },
      { uz: "Hech biri", ru: "Ничто из перечисленного", en: "None of the above" },
    ],
    correct: 0,
    explanation: { uz: "Barcha daraxtlar ildizi bilan tuproqni mustahkamlab, eroziyani kamaytiradi.", ru: "Все деревья укрепляют почву корнями, уменьшая эрозию.", en: "All trees help hold soil together with their roots, reducing erosion." },
  },
  {
    id: 66, emoji: "🍎",
    question: { uz: "Qaysi chiqindi organik hisoblanadi?", ru: "Какие отходы являются органическими?", en: "Which waste is organic?" },
    options: [
      { uz: "Meva qoldiqlari", ru: "Остатки фруктов", en: "Fruit scraps" },
      { uz: "Plastik", ru: "Пластик", en: "Plastic" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Metall", ru: "Металл", en: "Metal" },
    ],
    correct: 0,
    explanation: { uz: "Meva qoldiqlari organik chiqindi hisoblanadi.", ru: "Остатки фруктов относятся к органическим отходам.", en: "Fruit scraps count as organic waste." },
  },
  {
    id: 67, emoji: "🦀",
    question: { uz: "Qaysi hayvonlar suv ekotizimini saqlashga yordam beradi?", ru: "Какие животные помогают сохранять водную экосистему?", en: "Which animals help maintain the water ecosystem?" },
    options: [
      { uz: "Qisqichbaqa", ru: "Краб", en: "Crab" },
      { uz: "Baliq", ru: "Рыба", en: "Fish" },
      { uz: "Ikkalasi ham", ru: "Оба варианта", en: "Both of them" },
      { uz: "Hech biri", ru: "Ни один", en: "Neither" },
    ],
    correct: 2,
    explanation: { uz: "Qisqichbaqa va baliqlar suv ekotizimining barqaror bo'lishiga yordam beradi.", ru: "Крабы и рыбы помогают поддерживать устойчивость водной экосистемы.", en: "Crabs and fish help keep the water ecosystem in balance." },
  },
  {
    id: 69, emoji: "🌿",
    question: { uz: "Qaysi o'simliklar kislorod chiqaradi?", ru: "Какие растения выделяют кислород?", en: "Which plants release oxygen?" },
    options: [
      { uz: "Barcha o'simliklar", ru: "Все растения", en: "All plants" },
      { uz: "Faqat palma", ru: "Только пальма", en: "Only palm trees" },
      { uz: "Faqat sadr", ru: "Только кедр", en: "Only cedar" },
      { uz: "Faqat \"shamol daraxti\"", ru: "Только «ветрозащитное дерево»", en: "Only \"windbreak\" trees" },
    ],
    correct: 0,
    explanation: { uz: "Barcha o'simliklar fotosintez orqali kislorod chiqaradi.", ru: "Все растения выделяют кислород в процессе фотосинтеза.", en: "All plants release oxygen through photosynthesis." },
  },
  {
    id: 70, emoji: "🔋",
    question: { uz: "Qaysi chiqindi maxsus konteynerga tashlanishi kerak?", ru: "Какие отходы нужно выбрасывать в специальный контейнер?", en: "Which waste needs to go in a special container?" },
    options: [
      { uz: "Batareyka", ru: "Батарейка", en: "Battery" },
      { uz: "Meva qoldig'i", ru: "Остатки фруктов", en: "Fruit scraps" },
      { uz: "Shisha", ru: "Стекло", en: "Glass" },
      { uz: "Qog'oz", ru: "Бумага", en: "Paper" },
    ],
    correct: 0,
    explanation: { uz: "Batareykalar zararli moddalarni o'z ichiga oladi va maxsus konteynerga tashlanishi kerak.", ru: "Батарейки содержат вредные вещества, поэтому их нужно выбрасывать в специальный контейнер.", en: "Batteries contain harmful substances and must go in a special container." },
  },
  {
    id: 100, emoji: "♻️",
    question: { uz: "Plastikni qayta ishlash nima uchun muhim?", ru: "Почему важно перерабатывать пластик?", en: "Why is recycling plastic important?" },
    options: [
      { uz: "Atrof-muhitni asraydi", ru: "Помогает беречь окружающую среду", en: "It helps protect the environment" },
      { uz: "Pul topish uchun", ru: "Чтобы заработать деньги", en: "To make money" },
      { uz: "Zavod ishlashini oshirish uchun", ru: "Чтобы загрузить работу заводов", en: "To increase factory output" },
      { uz: "Hech qanday sababi yo'q", ru: "Нет причины", en: "There's no reason" },
    ],
    correct: 0,
    explanation: { uz: "Plastikni qayta ishlash tabiatni asrab, chiqindi miqdorini kamaytiradi.", ru: "Переработка пластика бережёт природу и сокращает количество отходов.", en: "Recycling plastic protects nature and cuts down on waste." },
  },
  {
    id: 101, emoji: "🚴",
    question: { uz: "Qaysi transport ekologik eng toza?", ru: "Какой транспорт самый экологичный?", en: "Which transport is the most eco-friendly?" },
    options: [
      { uz: "Avtomobil", ru: "Автомобиль", en: "Car" },
      { uz: "Samolyot", ru: "Самолёт", en: "Airplane" },
      { uz: "Velosiped", ru: "Велосипед", en: "Bicycle" },
      { uz: "Kema", ru: "Корабль", en: "Ship" },
    ],
    correct: 2,
    explanation: { uz: "Velosiped hech qanday zararli gaz chiqarmaydi.", ru: "Велосипед не выделяет вредных газов.", en: "A bicycle emits no harmful gases." },
  },
  {
    id: 102, emoji: "👕",
    question: { uz: "Eski kiyimlarni nima qilish kerak?", ru: "Что делать со старой одеждой?", en: "What should you do with old clothes?" },
    options: [
      { uz: "Axlatga tashlash", ru: "Выбросить в мусор", en: "Throw them away" },
      { uz: "Yoqib yuborish", ru: "Сжечь", en: "Burn them" },
      { uz: "Muhtojlarga berish yoki qayta ishlash", ru: "Отдать нуждающимся или переработать", en: "Donate or recycle them" },
      { uz: "Dengizga tashlash", ru: "Бросить в море", en: "Throw in the sea" },
    ],
    correct: 2,
    explanation: { uz: "Eski kiyimlar qayta ishlatilishi yoki qayta ishlanishi mumkin.", ru: "Старую одежду можно использовать повторно или переработать.", en: "Old clothes can be reused or recycled." },
  },
  {
    id: 103, emoji: "💡",
    question: { uz: "Elektrni tejashning eng oddiy usuli nima?", ru: "Какой самый простой способ сэкономить электричество?", en: "What's the easiest way to save electricity?" },
    options: [
      { uz: "Uydan chiqishda chiroqni o'chirish", ru: "Выключать свет уходя", en: "Turn off lights when leaving" },
      { uz: "Televizorni tunu-kun yoqish", ru: "Держать телевизор включенным", en: "Keep TV on all day" },
      { uz: "Chiroqlarni umuman yoqmaslik", ru: "Никогда не включать свет", en: "Never turn on lights" },
      { uz: "Katta lampochkalarni ishlatish", ru: "Использовать большие лампочки", en: "Use big light bulbs" },
    ],
    correct: 0,
    explanation: { uz: "Chiroqlarni o'chirish orqali biz energiya tejaymiz va tabiatni asraymiz.", ru: "Выключая свет, мы экономим энергию и бережем природу.", en: "Turning off lights saves energy and helps nature." },
  },
  {
    id: 104, emoji: "💧",
    question: { uz: "Tish yuvayotganda nima qilish kerak?", ru: "Что нужно делать, пока чистишь зубы?", en: "What should you do while brushing your teeth?" },
    options: [
      { uz: "Suvni yopib qo'yish", ru: "Закрывать воду", en: "Turn off the water" },
      { uz: "Suvni oqizib qo'yish", ru: "Оставлять воду включенной", en: "Leave water running" },
      { uz: "Issiq suvdan foydalanish", ru: "Использовать горячую воду", en: "Use hot water" },
      { uz: "Hovuzda yuvish", ru: "Чистить зубы в бассейне", en: "Brush in the pool" },
    ],
    correct: 0,
    explanation: { uz: "Suvni yopib qo'yish ko'plab suvni tejaydi.", ru: "Выключение воды экономит много воды.", en: "Turning off the water saves a lot of it." },
  },
  {
    id: 105, emoji: "🛍️",
    question: { uz: "Do'konga borganda nima olib borish ekologik toza?", ru: "Что экологичнее брать с собой в магазин?", en: "What is eco-friendly to take to the store?" },
    options: [
      { uz: "Plastik paketlar", ru: "Пластиковые пакеты", en: "Plastic bags" },
      { uz: "Mato (qayta ishlatiladigan) xalta", ru: "Тканевая сумка", en: "Reusable cloth bag" },
      { uz: "Qog'oz paketlar", ru: "Бумажные пакеты", en: "Paper bags" },
      { uz: "Hech narsa", ru: "Ничего", en: "Nothing" },
    ],
    correct: 1,
    explanation: { uz: "Mato xalta ko'p marta ishlatilishi tufayli tabiat uchun xavfsiz.", ru: "Тканевая сумка безопасна для природы, так как используется многократно.", en: "Cloth bags are safe for nature since they are reusable." },
  },
  {
    id: 106, emoji: "🍔",
    question: { uz: "Ovqat qoldiqlarini nima qilish tavsiya etiladi?", ru: "Что рекомендуется делать с остатками еды?", en: "What is recommended to do with food leftovers?" },
    options: [
      { uz: "Plastik bilan aralashtirish", ru: "Смешивать с пластиком", en: "Mix with plastic" },
      { uz: "Ko'chaga tashlash", ru: "Выбрасывать на улицу", en: "Throw on the street" },
      { uz: "Kompost qilish", ru: "Компостировать", en: "Compost them" },
      { uz: "Suvga oqizish", ru: "Смывать в воду", en: "Flush down water" },
    ],
    correct: 2,
    explanation: { uz: "Ovqat qoldiqlari kompost qilinsa o'g'itga aylanadi.", ru: "Остатки еды при компостировании становятся удобрением.", en: "Food leftovers become fertilizer when composted." },
  },
  {
    id: 107, emoji: "🐞",
    question: { uz: "Xonqizi (bojyako'rovka) bog'da qanday yordam beradi?", ru: "Как божья коровка помогает в саду?", en: "How does a ladybug help in the garden?" },
    options: [
      { uz: "Gullarni yeydi", ru: "Ест цветы", en: "Eats flowers" },
      { uz: "Zararkunandalarni yeydi", ru: "Поедает вредителей", en: "Eats pests" },
      { uz: "Asal yig'adi", ru: "Собирает мёд", en: "Collects honey" },
      { uz: "Tuproqni qaziydi", ru: "Копает землю", en: "Digs the soil" },
    ],
    correct: 1,
    explanation: { uz: "Xonqizi o'simliklarni yeydigan zararkunandalarni yeb, o'simlikni asraydi.", ru: "Божья коровка ест вредителей и защищает растения.", en: "Ladybugs eat pests and protect plants." },
  },
  {
    id: 108, emoji: "📱",
    question: { uz: "Buzilgan elektron qurilmalarni nima qilish kerak?", ru: "Что делать со сломанными электронными устройствами?", en: "What should you do with broken electronics?" },
    options: [
      { uz: "Axlat qutisiga tashlash", ru: "Выбросить в мусор", en: "Throw in the trash" },
      { uz: "Tuproqqa ko'mish", ru: "Закопать в землю", en: "Bury in the dirt" },
      { uz: "Maxsus qabul qilish punktiga topshirish", ru: "Сдать в специальный пункт", en: "Hand over to a special recycling point" },
      { uz: "Daryoga tashlash", ru: "Выбросить в реку", en: "Throw in a river" },
    ],
    correct: 2,
    explanation: { uz: "E-chiqindilar maxsus zavodlarda qayta ishlanadi.", ru: "Электронные отходы перерабатываются на специальных заводах.", en: "E-waste is recycled at special plants." },
  },
  {
    id: 109, emoji: "🌱",
    question: { uz: "Daraxt ekish nega foydali?", ru: "Почему сажать деревья полезно?", en: "Why is planting trees helpful?" },
    options: [
      { uz: "Havo tozalanadi", ru: "Воздух очищается", en: "Air gets cleaner" },
      { uz: "Yerni issiqlashdan asraydi", ru: "Защищает землю от жары", en: "Protects earth from heat" },
      { uz: "Jonivorlarga uy beradi", ru: "Дает дом животным", en: "Provides homes for animals" },
      { uz: "Barchasi to'g'ri", ru: "Все верно", en: "All of the above" },
    ],
    correct: 3,
    explanation: { uz: "Daraxtlar havoni tozalaydi, soya beradi va tabiatni saqlaydi.", ru: "Деревья очищают воздух, дают тень и сохраняют природу.", en: "Trees clean the air, provide shade, and preserve nature." },
  },
  {
    id: 110, emoji: "🌍",
    question: { uz: "Tabiatni kim himoya qilishi kerak?", ru: "Кто должен защищать природу?", en: "Who should protect nature?" },
    options: [
      { uz: "Faqat kattalar", ru: "Только взрослые", en: "Only adults" },
      { uz: "Faqat olimlar", ru: "Только ученые", en: "Only scientists" },
      { uz: "Barchamiz", ru: "Мы все", en: "All of us" },
      { uz: "Hech kim", ru: "Никто", en: "Nobody" },
    ],
    correct: 2,
    explanation: { uz: "Har bir inson, yoshidan qat'i nazar, tabiatni asrashi kerak.", ru: "Каждый человек, независимо от возраста, должен беречь природу.", en: "Everyone, regardless of age, must protect nature." },
  }
];

// Savollarni 10 tadan bosqichlarga bo'lish - endi bosqich hajmi qattiq
// kodlanmagan (dynamic), shu bilan "10 ta deb faraz qilish" xatosi oldini olinadi.
export function chunkIntoLevels(questions: QuizQuestion[], levelSize = 10): QuizQuestion[][] {
  const levels: QuizQuestion[][] = [];
  for (let i = 0; i < questions.length; i += levelSize) {
    levels.push(questions.slice(i, i + levelSize));
  }
  return levels;
}
