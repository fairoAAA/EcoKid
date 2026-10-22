import { LocalizedText } from "@/i18n/types";

export type QuizType = "trivia" | "personality";

export interface PersonalityOutcome {
  id: string;
  name: LocalizedText;
  emoji: string;
  description: LocalizedText;
  advice: LocalizedText;
}

export interface ThematicQuestion {
  id: number;
  question: LocalizedText;
  emoji?: string;
  options: LocalizedText[];
  correct?: number;
  explanation?: LocalizedText;
  outcomeIds?: string[];
}

export interface ThematicQuiz {
  id: number;
  type: QuizType;
  title: LocalizedText;
  description: LocalizedText;
  emoji: string;
  color: string;
  time: string;
  questions: ThematicQuestion[];
  outcomes?: PersonalityOutcome[];
}

export const thematicQuizzes: ThematicQuiz[] = [
  // 1. Shaxsiyat testi: Qaysi o'rmon hayvonisan?
  {
    id: 1,
    type: "personality",
    title: { uz: "Sen qaysi o'rmon hayvonisan?", ru: "Какое ты лесное животное?", en: "Which forest animal are you?" },
    description: {
      uz: "Qiziqarli savollarga javob ber va tabiatan qaysi o'rmon jonivoriga o'xshashingni bilib ol!",
      ru: "Ответь на вопросы и узнай, на кого из лесных обитателей ты больше всего похож!",
      en: "Answer the questions and discover which forest animal you resemble most!",
    },
    emoji: "🦊",
    color: "from-orange-500/20 to-amber-500/20",
    time: "4",
    outcomes: [
      {
        id: "fox",
        name: { uz: "Aqlli va zukko Tulki", ru: "Умная и сообразительная Лиса", en: "Clever and witty Fox" },
        emoji: "🦊",
        description: {
          uz: "Sen har qanday vaziyatdan oson yo'l topa olasan! Zukkosan, qiziquvchansan va doim yangiliklarni o'rganishga intilasan.",
          ru: "Ты легко находишь выход из любой ситуации! Любознателен, сообразителен и полон энергии.",
          en: "You always find a smart way out of any situation! Curious, quick-witted, and love learning.",
        },
        advice: {
          uz: "Zukkoliging bilan o'rtoqlaringga chiqindilarni to'g'ri saralashni o'rgat!",
          ru: "Используй свой ум, чтобы научить друзей разделять мусор!",
          en: "Use your wits to teach friends how to sort recycling!",
        },
      },
      {
        id: "bear",
        name: { uz: "Mehribon va qudratli Ayiq", ru: "Добрый и сильный Медведь", en: "Kind and mighty Bear" },
        emoji: "🐻",
        description: {
          uz: "Sen o'rmonning eng ishonchli va mehribon do'stisan. Katta yuraging bor va yaqinlaringni doim himoya qilasan.",
          ru: "Ты самый надежный и добрый защитник природы. У тебя большое сердце и сильный дух.",
          en: "You are the most reliable and kind friend. You have a big heart and protect everyone.",
        },
        advice: {
          uz: "Katta daraxtlarni himoya qilish va yangi ko'chatlar ekishda yetakchi bo'l!",
          ru: "Будь лидером в защите деревьев и посадке новых саженцев!",
          en: "Be a leader in protecting trees and planting new saplings!",
        },
      },
      {
        id: "owl",
        name: { uz: "Donishmand Boyqush", ru: "Мудрая Сова", en: "Wise Owl" },
        emoji: "🦉",
        description: {
          uz: "Sen vazmin, dono va kitob o'qishni sevadigan insonsan. Do'stlaring sendan doim maslahat so'rashadi.",
          ru: "Ты рассудительный, мудрый и любишь читать. Друзья часто обращаются к тебе за советом.",
          en: "You are calm, wise, and love reading books. Friends always come to you for great advice.",
        },
        advice: {
          uz: "Tabiat va ekologiya haqidagi bilimlaringni sinfdoshlaring bilan bo'lish!",
          ru: "Делись экологическими знаниями с одноклассниками!",
          en: "Share your knowledge about nature with classmates!",
        },
      },
      {
        id: "squirrel",
        name: { uz: "Epchil va mehnatkash Olmaxon", ru: "Ловкая и трудолюбивая Белочка", en: "Agile and industrious Squirrel" },
        emoji: "🐿️",
        description: {
          uz: "Sen bir joyda jim o'tirolmaysan! Har doim harakatdasan, tirishqoqsan va yangi rejalaring juda ko'p.",
          ru: "Ты неутомим и полон сил! Всегда в движении, трудолюбив и полон свежих идей.",
          en: "You are energetic and agile! Always active, hardworking, and full of exciting ideas.",
        },
        advice: {
          uz: "O'rmon va bog'larda qushlarga don sepib, yashil makon yaratishda davom et!",
          ru: "Подкармливай птиц в парках и помогай сохранять зеленые зоны!",
          en: "Keep feeding birds and helping parks stay clean and green!",
        },
      },
    ],
    questions: [
      {
        id: 1,
        question: {
          uz: "O'rmonda sayr qilayotganda birinchi bo'lib nima qilasan?",
          ru: "Что ты делаешь первым делом во время прогулки по лесу?",
          en: "What do you do first during a walk in the forest?",
        },
        emoji: "🌲",
        options: [
          { uz: "Yangi yo'llar va qiziqarli narsalarni izlayman", ru: "Ищу новые тропинки и интересные находки", en: "Explore new trails and interesting spots" },
          { uz: "Katta qulay daraxt soyasida dam olaman", ru: "Отдыхаю в тени большого дерева", en: "Rest in the shade of a big comfortable tree" },
          { uz: "Qushlar va o'simliklarni diqqat bilan kuzataman", ru: "Внимательно наблюдаю за птицами и растениями", en: "Quietly observe the birds and plants" },
          { uz: "Yong'oq yoki mevalar terishga yuguraman", ru: "Бегу собирать ягоды или шишки", en: "Run around gathering nuts or berries" },
        ],
        outcomeIds: ["fox", "bear", "owl", "squirrel"],
      },
      {
        id: 2,
        question: {
          uz: "Do'stlaring bilan o'yin o'ynaganda qaysi rolni yoqtirasan?",
          ru: "Какую роль ты выбираешь в играх с друзьями?",
          en: "What role do you prefer when playing with friends?",
        },
        emoji: "🎲",
        options: [
          { uz: "Hiyla va qiziqarli rejalar tuzuvchi", ru: "Генератор хитрых идей и планов", en: "The strategist who comes up with clever plans" },
          { uz: "Hamma do'stlarni himoya qiluvchi kuchli do'st", ru: "Надежный защитник и опора команды", en: "The strong and protective team guardian" },
          { uz: "O'yin qoidalarini adolatli tushuntiruvchi", ru: "Справедливый судья, знающий все правила", en: "The fair judge who knows all the rules" },
          { uz: "Eng chaqqon va harakatchan ishtirokchi", ru: "Самый шустрый и подвижный игрок", en: "The fastest and most energetic player" },
        ],
        outcomeIds: ["fox", "bear", "owl", "squirrel"],
      },
      {
        id: 3,
        question: {
          uz: "Agar o'rmonda axlat ko'rib qolsang, nima qilasan?",
          ru: "Что ты сделаешь, если увидишь мусор в лесу?",
          en: "What would you do if you see litter in the forest?",
        },
        emoji: "🗑️",
        options: [
          { uz: "Uni qayta ishlash mumkin bo'lgan qutilarga olib boraman", ru: "Отнесу в ближайший контейнер для переработки", en: "Take it to the nearest recycling bin" },
          { uz: "O'rtoqlarimni chaqirib, butun joyni birgalikda tozalayman", ru: "Соберу команду и мы дружно все уберем", en: "Gather friends to clean up the whole area together" },
          { uz: "Boshqalarga axlat tashlamaslik haqida tushuntiraman", ru: "Объясню окружающим, почему нельзя мусорить", en: "Teach others why littering harms nature" },
          { uz: "Zudlik bilan sumkaga yig'ib chiqindi qutisiga tashlayman", ru: "Быстро соберу в пакет и выброшу в урну", en: "Quickly pick it up and dispose of it" },
        ],
        outcomeIds: ["fox", "bear", "owl", "squirrel"],
      },
      {
        id: 4,
        question: {
          uz: "Dam olish kuningni qanday o'tkazishni yoqtirasan?",
          ru: "Как ты любишь проводить выходной день?",
          en: "How do you love spending your day off?",
        },
        emoji: "☀️",
        options: [
          { uz: "Yangi sarguzashtlar va jumboqlar yechish", ru: "Решать загадки и искать приключения", en: "Solving puzzles and discovering new adventures" },
          { uz: "Oila davrasida mazali taomlar yeyish", ru: "Вкусный обед в кругу семьи", en: "Enjoying delicious meals with family" },
          { uz: "Qiziqarli tabiat haqidagi kitob o'qish", ru: "Чтение увлекательной книги о природе", en: "Reading an exciting book about nature" },
          { uz: "Tashqarida to'p o'ynash va yugurish", ru: "Подвижные игры и спорт на свежем воздухе", en: "Running and playing sports outdoors" },
        ],
        outcomeIds: ["fox", "bear", "owl", "squirrel"],
      },
    ],
  },

  // 2. Chiqindilarni to'g'ri saralaysanmi?
  {
    id: 2,
    type: "trivia",
    title: { uz: "Chiqindilarni to'g'ri saralaysanmi?", ru: "Правильно ли ты сортируешь мусор?", en: "Do you sort trash correctly?" },
    description: {
      uz: "Turli chiqindilarni qaysi qutiga tashlash kerakligini bilishingni sinab ko'r!",
      ru: "Проверь свои знания о том, в какие баки выбрасывать разные отходы!",
      en: "Test how well you know which bins to use for different types of waste!",
    },
    emoji: "♻️",
    color: "from-emerald-500/20 to-sky-500/20",
    time: "4",
    questions: [
      {
        id: 1,
        question: {
          uz: "Eski batareykalarni qaysi qutiga tashlash kerak?",
          ru: "Куда следует выбрасывать использованные батарейки?",
          en: "Where should used batteries be disposed of?",
        },
        emoji: "🔋",
        options: [
          { uz: "Oddiy axlat paqiriga", ru: "В обычное мусорное ведро", en: "In regular household trash" },
          { uz: "Maxsus xavfli chiqindilar qutisiga", ru: "В специальный контейнер для батареек", en: "In a dedicated battery drop-off box" },
          { uz: "Plastik qutisiga", ru: "В контейнер для пластика", en: "In the plastic bin" },
          { uz: "Suvga oqizib yuborish kerak", ru: "Смыть в канализацию", en: "Flush down the drain" },
        ],
        correct: 1,
        explanation: {
          uz: "Batareykalarda og'ir metallar bor, shuning uchun ularni faqat maxsus qutilarga topshirish kerak.",
          ru: "Батарейки содержат тяжелые металлы, поэтому их сдают в специальные пункты.",
          en: "Batteries contain toxic heavy metals and must always go to special drop-off points.",
        },
      },
      {
        id: 2,
        question: {
          uz: "Banan po'chog'i va olma qoldig'i qanday chiqindi?",
          ru: "К какому виду отходов относятся банановая кожура и огрызок яблока?",
          en: "What type of waste are banana peels and apple cores?",
        },
        emoji: "🍌",
        options: [
          { uz: "Organik chiqindi", ru: "Органические отходы", en: "Organic waste" },
          { uz: "Qog'oz chiqindisi", ru: "Бумажные отходы", en: "Paper waste" },
          { uz: "Plastik chiqindi", ru: "Пластиковые отходы", en: "Plastic waste" },
          { uz: "Xavfli chiqindi", ru: "Опасные отходы", en: "Hazardous waste" },
        ],
        correct: 0,
        explanation: {
          uz: "Oziq-ovqat qoldiqlari organik bo'lib, ulardan kompost o'g'it tayyorlash mumkin.",
          ru: "Остатки еды являются органикой и перерабатываются в полезный компост.",
          en: "Food scraps are organic and turn into nutrient-rich compost fertilizer.",
        },
      },
      {
        id: 3,
        question: {
          uz: "Qaysi idishni cheksiz marta qayta ishlash mumkin?",
          ru: "Какой материал можно перерабатывать бесконечное число раз без потери качества?",
          en: "Which material can be recycled infinitely without losing quality?",
        },
        emoji: "🍾",
        options: [
          { uz: "Qog'oz", ru: "Бумага", en: "Paper" },
          { uz: "Plastik paket", ru: "Пластиковый пакет", en: "Plastic bag" },
          { uz: "Shisha va metall", ru: "Стекло и металл", en: "Glass and metal" },
          { uz: "Karton quti", ru: "Картонная коробка", en: "Cardboard box" },
        ],
        correct: 2,
        explanation: {
          uz: "Shisha va alyuminiy o'z xususiyatini yo'qotmagan holda cheksiz marta qayta ishlanadi.",
          ru: "Стекло и алюминий можно переплавлять сколько угодно раз.",
          en: "Glass and aluminum can be melted and remade endlessly without degrading.",
        },
      },
      {
        id: 4,
        question: {
          uz: "Plastik shishalarni qutiga tashlashdan oldin nima qilish foydali?",
          ru: "Что рекомендуется сделать с пластиковой бутылкой перед выбросом?",
          en: "What is recommended to do with a plastic bottle before binning it?",
        },
        emoji: "🧴",
        options: [
          { uz: "Uni suv bilan to'ldirish", ru: "Наполнить её водой", en: "Fill it with water" },
          { uz: "Ezib, hajmini kichraytirish", ru: "Смять, чтобы уменьшить объем", en: "Crush it to reduce its volume" },
          { uz: "Bo'yab qo'yish", ru: "Покрасить краской", en: "Paint it" },
          { uz: "Yoqib yuborish", ru: "Сжечь", en: "Burn it" },
        ],
        correct: 1,
        explanation: {
          uz: "Shishani ezish orqali axlat qutisida joy tejaladi va tashish osonlashadi.",
          ru: "Смятая бутылка занимает меньше места в контейнере и мусоровозе.",
          en: "Crushing bottles saves up to 75% space in bins and collection trucks.",
        },
      },
    ],
  },

  // 3. Ekologik savodxonlik darajang
  {
    id: 3,
    type: "trivia",
    title: { uz: "Ekologik savodxonlik darajang", ru: "Уровень твоей экологической грамотности", en: "Your ecological literacy level" },
    description: {
      uz: "Orol dengizi, toza energiya va tabiat hodisalari haqidagi bilimlaringni sinab ko'r!",
      ru: "Проверь свои знания об Аральском море, чистой энергии и охране природы!",
      en: "Test your knowledge on the Aral Sea, clean energy, and environmental science!",
    },
    emoji: "🌍",
    color: "from-sky-500/20 to-primary/20",
    time: "5",
    questions: [
      {
        id: 1,
        question: {
          uz: "Yer yuzida ichishga yaroqli chuchuk suv qancha foizni tashkil qiladi?",
          ru: "Какой процент воды на Земле пригоден для питья (пресная вода)?",
          en: "What percentage of all water on Earth is fresh and drinkable?",
        },
        emoji: "💧",
        options: [
          { uz: "Taxminan 3%", ru: "Около 3%", en: "About 3%" },
          { uz: "50%", ru: "50%", en: "50%" },
          { uz: "71%", ru: "71%", en: "71%" },
          { uz: "90%", ru: "90%", en: "90%" },
        ],
        correct: 0,
        explanation: {
          uz: "Yer yuzidagi suvning 97% sho'r dengiz suvi, atigi 3% chuchuk suvdir. Shuning uchun suvni asrash shart!",
          ru: "Около 97% воды соленая, и лишь 3% пресная, из которой большая часть во льдах.",
          en: "Only about 3% of Earth's water is fresh, making water conservation critical!",
        },
      },
      {
        id: 2,
        question: {
          uz: "Qaysi transport vositasi atmosferaga umuman zararli gaz chiqarmaydi?",
          ru: "Какой вид транспорта вообще не загрязняет атмосферу выхлопными газами?",
          en: "Which vehicle emits zero greenhouse gases during operation?",
        },
        emoji: "🚴",
        options: [
          { uz: "Velosiped", ru: "Велосипед", en: "Bicycle" },
          { uz: "Dizel avtobusi", ru: "Дизельный автобус", en: "Diesel bus" },
          { uz: "Samolyot", ru: "Самолёт", en: "Airplane" },
          { uz: "Mototsikl", ru: "Мотоцикл", en: "Motorcycle" },
        ],
        correct: 0,
        explanation: {
          uz: "Velosiped inson kuchi bilan harakatlanadi va havoni 100% toza saqlaydi.",
          ru: "Велосипед работает на мускульной силе и абсолютно безвреден для воздуха.",
          en: "Bicycles run purely on pedal power and emit zero emissions.",
        },
      },
      {
        id: 3,
        question: {
          uz: "Ozon qatlami Yerni nimadan himoya qiladi?",
          ru: "От чего озоновый слой защищает жизнь на Земле?",
          en: "What does the ozone layer protect life on Earth from?",
        },
        emoji: "🛡️",
        options: [
          { uz: "Quyoshning zararli ultrabinafsha nurlaridan", ru: "От опасного ультрафиолетового излучения", en: "From harmful ultraviolet radiation" },
          { uz: "Meteoritlardan", ru: "От метеоритов", en: "From meteorites" },
          { uz: "Kuchli yomg'irlardan", ru: "От сильных дождей", en: "From heavy rainfall" },
          { uz: "Sovuq shamoldan", ru: "От холодного ветра", en: "From cold winds" },
        ],
        correct: 0,
        explanation: {
          uz: "Ozon qatlami quyoshning zararli nurlarini yutib, barcha tirik mavjudotlarni saqlaydi.",
          ru: "Озоновый экран задерживает жесткий ультрафиолет, опасный для кожи и глаз.",
          en: "The ozone layer absorbs high-frequency UV light, protecting living tissue.",
        },
      },
      {
        id: 4,
        question: {
          uz: "Quyosh va shamol energiyasining asosiy afzalligi nima?",
          ru: "В чем главное преимущество солнечной и ветровой энергии?",
          en: "What is the main benefit of solar and wind energy?",
        },
        emoji: "☀️",
        options: [
          { uz: "Ular bitmas-tuganmas va havoni bulg'amaydi", ru: "Они неисчерпаемы и не загрязняют воздух", en: "They are limitless and do not pollute" },
          { uz: "Faqat tunda ishlaydi", ru: "Они работают только ночью", en: "They work only at night" },
          { uz: "Ko'p tutun chiqaradi", ru: "Они выделяют много дыма", en: "They produce lots of smoke" },
          { uz: "Faqat sovuqda ishlaydi", ru: "Работают только в мороз", en: "They only work in freezing cold" },
        ],
        correct: 0,
        explanation: {
          uz: "Qayta tiklanuvchi energiya tabiat resurslarini yoqmaydi va havoga zaharli tutun chiqarmaydi.",
          ru: "Зеленая энергетика возобновляема и не производит парниковых выбросов.",
          en: "Renewable energy produces no carbon dioxide or air pollution.",
        },
      },
    ],
  },

  // 4. Daraxtni tavsifidan top
  {
    id: 4,
    type: "trivia",
    title: { uz: "Daraxtni tavsifidan top", ru: "Угадай дерево по описанию", en: "Guess the tree from its description" },
    description: {
      uz: "Barglari, mevasi va xususiyatlariga qarab daraxt nomini topa olasanmi?",
      ru: "Сможешь ли ты определить дерево по его листьям, плодам и особенностям?",
      en: "Can you identify the tree from its leaves, bark, and fruit?",
    },
    emoji: "🌳",
    color: "from-primary/20 to-accent/20",
    time: "5",
    questions: [
      {
        id: 1,
        question: {
          uz: "Qishda ham, yozda ham yam-yashil turadigan, ignabargli va xushbo'y daraxt qaysi?",
          ru: "Какое хвойное вечнозеленое дерево радует нас зелеными иголками зимой и летом?",
          en: "Which fragrant evergreen conifer stays green through both winter and summer?",
        },
        emoji: "🌲",
        options: [
          { uz: "Qarag'ay yoki Archa", ru: "Сосна или Ель", en: "Pine or Fir" },
          { uz: "Terak", ru: "Тополь", en: "Poplar" },
          { uz: "Tol", ru: "Ива", en: "Willow" },
          { uz: "O'rik", ru: "Абрикос", en: "Apricot" },
        ],
        correct: 0,
        explanation: {
          uz: "Archa va qarag'aylar ignabargli bo'lib, qishda o'z yaproqlarini to'kmaydi.",
          ru: "Хвойные деревья сохраняют иголки круглый год и очищают воздух фитонцидами.",
          en: "Conifers have needle leaves with a waxy coating that withstand winter freezes.",
        },
      },
      {
        id: 2,
        question: {
          uz: "Yuzlab yillar yashaydigan, qudratli tanaga va mayda shoxlarida yong'oqsimon meva (jeled)ga ega daraxt qaysi?",
          ru: "Какое могучее дерево живет сотни лет и приносит плоды-жёлуди?",
          en: "Which sturdy ancient tree lives for centuries and produces acorns?",
        },
        emoji: "🌰",
        options: [
          { uz: "Eman (Dub)", ru: "Дуб", en: "Oak" },
          { uz: "Olma", ru: "Яблоня", en: "Apple tree" },
          { uz: "Qayin", ru: "Береза", en: "Birch" },
          { uz: "Banan", ru: "Банан", en: "Banana plant" },
        ],
        correct: 0,
        explanation: {
          uz: "Eman daraxti juda mustahkam yog'ochga ega bo'lib, 500-1000 yilgacha yashay oladi.",
          ru: "Дуб — символ стойкости, живет сотни лет и дает пищу лесной живности.",
          en: "Oaks can live for over 500 years and their acorns sustain many forest animals.",
        },
      },
      {
        id: 3,
        question: {
          uz: "O'zbekistonda keng tarqalgan, ko'chalarimizga ulkan soya beradigan va qadimiy hisoblangan bargli daraxt qaysi?",
          ru: "Какое величественное дерево с широкими резными листьями дарит тень во дворах и садах Узбекистана?",
          en: "Which majestic shade tree with broad palmate leaves is celebrated across Uzbekistan?",
        },
        emoji: "🍂",
        options: [
          { uz: "Sharq chinori", ru: "Восточный платан (чинара)", en: "Oriental Plane tree (Chinar)" },
          { uz: "Palma", ru: "Пальма", en: "Palm tree" },
          { uz: "Kaktus", ru: "Кактус", en: "Cactus" },
          { uz: "Bambuk", ru: "Бамбук", en: "Bamboo" },
        ],
        correct: 0,
        explanation: {
          uz: "Chinorlar bir necha asr yashaydi va ularning ulkan soyasi yoz jaziramasida ajoyib salqinlik beradi.",
          ru: "Чинара — долгожитель востока, укрывающий от зноя своей могучей кроной.",
          en: "Plane trees (chinars) can live for centuries, providing massive cool shade in hot summers.",
        },
      },
      {
        id: 4,
        question: {
          uz: "Suv bo'ylarida o'sadigan, ingichka egiluvchan shoxlari yerga osilib turadigan daraxt qaysi?",
          ru: "Какое дерево часто растет у воды и имеет длинные гибкие свисающие ветви?",
          en: "Which graceful tree thrives by riverbanks with slender branches weeping to the ground?",
        },
        emoji: "🌿",
        options: [
          { uz: "Majnuntol (Tol)", ru: "Плакучая ива", en: "Weeping Willow" },
          { uz: "Chinor", ru: "Платан", en: "Plane tree" },
          { uz: "Limon", ru: "Лимон", en: "Lemon tree" },
          { uz: "Zaytun", ru: "Олива", en: "Olive tree" },
        ],
        correct: 0,
        explanation: {
          uz: "Majnuntol daryo va ko'l bo'ylarida yaxshi o'sadi va o'zining egiluvchan shoxlari bilan mashhur.",
          ru: "Ива любит влагу, ее гибкие ветви опускаются прямо к глади воды.",
          en: "Willows love wet soils and stabilize riverbanks with their deep root nets.",
        },
      },
    ],
  },

  // 5. Shaxsiyat testi: Sen qanday eko-qahramonsan?
  {
    id: 5,
    type: "personality",
    title: { uz: "Sen qanday eko-qahramonsan?", ru: "Какой ты эко-герой?", en: "What kind of eco-hero are you?" },
    description: {
      uz: "Ekologik super-kuchingni aniqla va tabiatga qanday yordam berish senga eng mos ekanini bil!",
      ru: "Определи свою супер-силу и узнай, какая эко-миссия подходит тебе больше всего!",
      en: "Discover your eco-superpower and find out which green mission suits you best!",
    },
    emoji: "🦸",
    color: "from-accent/20 to-orange-500/20",
    time: "4",
    outcomes: [
      {
        id: "forest_guardian",
        name: { uz: "O'rmon Qo'riqchisi", ru: "Хранитель Леса", en: "Forest Guardian" },
        emoji: "🌲",
        description: {
          uz: "Sening kuching — o'simliklar va jonivorlarga bo'lgan cheksiz mehr! Har bir ko'chat sen bilan birga go'zal daraxtga aylanadi.",
          ru: "Твоя сила — в заботе о растениях и животных! Каждое семечко с тобой вырастает в цветущий сад.",
          en: "Your superpower is deep love for plants and animals! Nature thrives when you are around.",
        },
        advice: {
          uz: "Har bahorda albatta o'z daraxtingni ek va uni parvarish qil!",
          ru: "Сажай новые деревья весной и поливай комнатные растения дома!",
          en: "Plant trees every spring and care for green spaces in your neighborhood!",
        },
      },
      {
        id: "water_protector",
        name: { uz: "Suv Himoyachisi", ru: "Защитник Чистой Воды", en: "Water Protector" },
        emoji: "💧",
        description: {
          uz: "Sen daryo, ko'l va dengizlarning tozaligi uchun qayg'urasan. Har bir tomchi suvning qadrini hammadan yaxshi bilasan!",
          ru: "Ты бережешь реки, озера и каждую каплю воды. С тобой водоемы всегда остаются кристально чистыми!",
          en: "You safeguard rivers, lakes, and oceans. You value every drop of fresh water!",
        },
        advice: {
          uz: "Kranlarni doim vaqtida yop va daryo bo'yida chiqindi qoldirmaslikni eslat!",
          ru: "Всегда вовремя закрывай краны и никогда не мусори у водоемов!",
          en: "Keep taps tightly closed and ensure clean shorelines during picnics!",
        },
      },
      {
        id: "green_innovator",
        name: { uz: "Yashil Innovator", ru: "Зеленый Новатор", en: "Green Innovator" },
        emoji: "⚡",
        description: {
          uz: "Sen zamonaviy texnologiyalar, quyosh panellari va chiqindisiz hayot tarafdorisan! Aqliy ixtirolaring olamni qutqaradi.",
          ru: "Ты обожаешь солнечные панели, электромобили и умные технологии, спасающие планету!",
          en: "You champion solar energy, clean tech, and zero-waste solutions!",
        },
        advice: {
          uz: "Eski narsalardan yangi foydali buyumlar yasashni o'rgan (upcycling)!",
          ru: "Придумывай полезные поделки из старых вещей и экономь энергию!",
          en: "Invent creative upcycled crafts and lead the way in saving electricity!",
        },
      },
      {
        id: "recycling_champion",
        name: { uz: "Saralash Chempioni", ru: "Чемпион Сортировки", en: "Recycling Champion" },
        emoji: "♻️",
        description: {
          uz: "Sen uchun axlat yo'q, faqat qayta ishlanadigan xomashyo bor! Barcha idishlarni chaqqonlik bilan o'z joyiga saralaysan.",
          ru: "Для тебя нет мусора, есть только ценные ресурсы! Ты мастерски сортируешь пластик, стекло и бумагу.",
          en: "You know there is no waste, only valuable resources waiting to be reused!",
        },
        advice: {
          uz: "Uyda chiqindilarni alohida yig'ish tizimini tashkil qil va ota-onangga yordam ber!",
          ru: "Организуй раздельный сбор мусора дома и вовлекай всю семью!",
          en: "Set up separate sorting bins at home and inspire your whole family!",
        },
      },
    ],
    questions: [
      {
        id: 1,
        question: {
          uz: "Tabiatni qutqarish uchun qaysi super-kuchni tanlagan bo'larding?",
          ru: "Какую супер-силу ты бы выбрал для спасения природы?",
          en: "Which superpower would you choose to save the planet?",
        },
        emoji: "✨",
        options: [
          { uz: "Bir tegish bilan qurigan daraxtlarni gullatish", ru: "Оживлять увядшие растения одним касанием", en: "Make withered trees bloom with a single touch" },
          { uz: "Ifloslangan daryolarni zumda tiniq qilish", ru: "Мгновенно очищать загрязненные реки", en: "Instantly purify polluted rivers and lakes" },
          { uz: "Quyosh va shamoldan cheksiz toza energiya olish", ru: "Добывать чистую энергию из солнечных лучей", en: "Harvest infinite clean energy from sun and wind" },
          { uz: "Plastik chiqindilarni xavfsiz narsalarga aylantirish", ru: "Превращать горы пластика в полезные вещи", en: "Transform plastic waste into eco-friendly items" },
        ],
        outcomeIds: ["forest_guardian", "water_protector", "green_innovator", "recycling_champion"],
      },
      {
        id: 2,
        question: {
          uz: "Maktabda qaysi ekologik loyihani boshlashni xohlaysan?",
          ru: "Какой экологический проект ты бы запустил в школе?",
          en: "Which green project would you launch at school?",
        },
        emoji: "🏫",
        options: [
          { uz: "Maktab hovlisiga ko'chat va gullar ekish", ru: "Посадка живого школьного сада и цветников", en: "Planting a living school garden and trees" },
          { uz: "Suvni tejaydigan aqlli sensorli kranlar o'rnatish", ru: "Установка сенсорных водосберегающих кранов", en: "Installing smart water-saving taps" },
          { uz: "Quyosh batareyasi bilan ishlaydigan robot yasash", ru: "Создание робота на солнечных батареях", en: "Building a solar-powered school gadget" },
          { uz: "Qog'oz va plastik qutilarini saralash musobaqasi", ru: "Конкурс по сбору и сортировке макулатуры", en: "A friendly paper and plastic recycling championship" },
        ],
        outcomeIds: ["forest_guardian", "water_protector", "green_innovator", "recycling_champion"],
      },
      {
        id: 3,
        question: {
          uz: "Ko'chada ketayotib qaysi narsa sening kayfiyatingni eng ko'p ko'taradi?",
          ru: "Что на улице поднимает тебе настроение больше всего?",
          en: "What outdoors boosts your mood the most?",
        },
        emoji: "🌈",
        options: [
          { uz: "Yam-yashil o'tlar va daraxtlar hidi", ru: "Запах свежей листвы и пение птиц", en: "The scent of green trees and birds singing" },
          { uz: "Chaqnab oqayotgan toza ariq suvi", ru: "Журчание прозрачного прохладного ручья", en: "The sound of clean sparkling water flowing" },
          { uz: "Tomlardagi zamonaviy quyosh panellari", ru: "Солнечные батареи на крышах домов", en: "Sleek solar panels on rooftops" },
          { uz: "Toza, saralangan va tartibli shahar ko'chalari", ru: "Чистые улицы с аккуратными баками для раздельного мусора", en: "Clean streets with colorful recycling bins" },
        ],
        outcomeIds: ["forest_guardian", "water_protector", "green_innovator", "recycling_champion"],
      },
    ],
  },

  // 6. Qizil kitob hayvonlari
  {
    id: 6,
    type: "trivia",
    title: { uz: "Qizil kitob hayvonlari", ru: "Животные из Красной книги", en: "Red Book animals" },
    description: {
      uz: "O'zbekiston va dunyodagi noyob, himoyaga muhtoj jonivorlarni bilasanmi?",
      ru: "Знаешь ли ты редких животных Узбекистана и мира, занесенных в Красную книгу?",
      en: "Do you know the rare and protected animals from the Red Data Book?",
    },
    emoji: "📕",
    color: "from-rose-500/20 to-primary/20",
    time: "5",
    questions: [
      {
        id: 1,
        question: {
          uz: "Tyan-Shan va Pomir baland tog'larida yashaydigan, 'tog'lar arvohi' deb ataluvchi noyob yirtqich qaysi?",
          ru: "Какой редкий хищник живет высоко в горах Тянь-Шаня и зовется «призраком гор»?",
          en: "Which elusive big cat lives in high mountains and is nicknamed the 'ghost of the mountains'?",
        },
        emoji: "🐆",
        options: [
          { uz: "Qor barsi (Ilvirs)", ru: "Снежный барс (Ирбис)", en: "Snow Leopard" },
          { uz: "Sher", ru: "Лев", en: "Lion" },
          { uz: "Gepard", ru: "Гепард", en: "Cheetah" },
          { uz: "Begemot", ru: "Бегемот", en: "Hippopotamus" },
        ],
        correct: 0,
        explanation: {
          uz: "Qor barsi (Ilvirs) O'zbekiston Qizil kitobiga kiritilgan bo'lib, baland qorli tog' cho'qqilarida yashaydi.",
          ru: "Снежный барс занесен в Красную книгу и охраняется в горных заповедниках.",
          en: "The Snow Leopard is an endangered high-altitude cat protected by strict international laws.",
        },
      },
      {
        id: 2,
        question: {
          uz: "Qizil kitob nima uchun 'Qizil' deb nomlangan?",
          ru: "Почему Красная книга названа именно «Красной»?",
          en: "Why is the Red Book called 'Red'?",
        },
        emoji: "🚨",
        options: [
          { uz: "Qizil rang xavf va diqqatni bildirgani uchun", ru: "Потому что красный цвет означает сигнал тревоги и опасности", en: "Because red signals danger and urgent alarm" },
          { uz: "Barglari qizil bo'lgani uchun", ru: "Из-за красных страниц", en: "Because trees have red leaves" },
          { uz: "Qizil bo'yoq arzon bo'lgani uchun", ru: "Потому что красная краска дешевле", en: "Because red ink was cheaper" },
          { uz: "Faqat qizil hayvonlar yozilgani uchun", ru: "Туда записаны только красные животные", en: "Only red-colored animals are listed" },
        ],
        correct: 0,
        explanation: {
          uz: "Qizil rang — xuddi svetofordagi kabi insoniyatni xavfdan ogohlantiruvchi ramziy belgi.",
          ru: "Красный цвет — сигнал опасности, напоминающий о необходимости беречь уязвимые виды.",
          en: "Red symbolizes a warning siren that species are close to vanishing forever.",
        },
      },
      {
        id: 3,
        question: {
          uz: "O'zbekiston dashtlarida yashaydigan, tez yugurishi va chiroyli shoxlari bilan mashhur nozik kiyik qaysi?",
          ru: "Какая грациозная антилопа обитает в степях и пустынях Узбекистана и занесена в Красную книгу?",
          en: "Which graceful antelope roams the deserts and steppes of Uzbekistan?",
        },
        emoji: "🦌",
        options: [
          { uz: "Jayron", ru: "Джейран", en: "Goitered Gazelle (Jeyran)" },
          { uz: "Zebra", ru: "Зебра", en: "Zebra" },
          { uz: "Kenguru", ru: "Кенгуру", en: "Kangaroo" },
          { uz: "Shimol bug'usi", ru: "Северный олень", en: "Reindeer" },
        ],
        correct: 0,
        explanation: {
          uz: "Jayronlar Buxorodagi maxsus 'Jayron' ekologik pitomnigida asrab-avaylanadi va ko'paytiriladi.",
          ru: "Джейраны охраняются в специализированном экоцентре «Джейран» в Бухарской области.",
          en: "The Jeyran gazelle is conserved in dedicated nature reserves such as the Bukhara Eco-Center.",
        },
      },
      {
        id: 4,
        question: {
          uz: "Noyob hayvonlarni saqlab qolish uchun nima qilish kerak?",
          ru: "Что люди должны делать, чтобы сохранить редкие виды животных?",
          en: "What must humans do to help protect endangered wildlife?",
        },
        emoji: "🛡️",
        options: [
          { uz: "Qo'riqxonalar tashkil qilish va ularni ovlamaslik", ru: "Создавать заповедники и не охотиться на них", en: "Establish nature reserves and ban illegal hunting" },
          { uz: "Ularni uylarda qafasda saqlash", ru: "Держать их дома в клетках", en: "Keep them in cages at home" },
          { uz: "O'rmonlarni kesib tashlash", ru: "Вырубать леса", en: "Cut down their home forests" },
          { uz: "Hech narsa qilmaslik", ru: "Ничего не делать", en: "Do nothing at all" },
        ],
        correct: 0,
        explanation: {
          uz: "Qo'riqxonalar hayvonlar o'z tabiiy muhitida xavfsiz ko'payishi uchun eng yaxshi joydir.",
          ru: "Заповедники дают возможность животным жить и размножаться в безопасности.",
          en: "Protected nature reserves give wildlife safe sanctuaries to thrive and breed.",
        },
      },
    ],
  },
];

export function getThematicQuizById(id: number): ThematicQuiz | undefined {
  return thematicQuizzes.find((q) => q.id === id);
}
