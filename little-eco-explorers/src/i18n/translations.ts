// Interfeys (UI) matnlari — sayt bo'ylab qayta ishlatiladigan barcha statik matnlar.
// Har bir kalit uchtala tilda ham yozilishi SHART (TypeScript buni tekshiradi).

const uz = {
  // --- Umumiy ---
  "common.back": "Orqaga",
  "common.viewAll": "Barchasini ko'rish",
  "common.readMore": "Batafsil o'qish",
  "common.comingSoon": "Tez kunda",
  "common.loading": "Yuklanmoqda...",
  "common.close": "Yopish",
  "common.views": "ko'rishlar",
  "common.rating": "reyting",
  "common.minutes": "daqiqa",

  // --- Header / navigatsiya ---
  "nav.animals": "Hayvonlar",
  "nav.plants": "O'simliklar",
  "nav.games": "O'yinlar",
  "nav.articles": "Maqolalar",
  "nav.quizzes": "Viktorinalar",
  "nav.search": "Qidirish",
  "nav.searchPlaceholder": "Maqola, o'yin yoki viktorina qidirish...",
  "nav.searchEmpty": "Hech narsa topilmadi",
  "nav.language": "Til",

  // --- Footer ---
  "footer.description": "Tabiatni birgalikda himoya qilishni o'rganamiz! Qiziqarli maqolalar, o'yinlar va viktorinalar sayyoramizning yosh himoyachilari uchun.",
  "footer.sections": "Bo'limlar",
  "footer.about": "Ma'lumot",
  "footer.aboutUs": "Loyiha haqida",
  "footer.contact": "Biz bilan bog'lanish",
  "footer.privacy": "Maxfiylik siyosati",
  "footer.rights": "Barcha huquqlar himoyalangan.",
  "footer.madeWith": "Sayyoramiz uchun",
  "footer.madeWithEnd": "bilan yaratilgan",

  // --- Bosh sahifa: Hero slaydlar ---
  "hero.slide1.title": "Tabiatni asrashni o'rganamiz!",
  "hero.slide1.subtitle": "Ekologiyaning ajoyib olamini biz bilan kashf eting",
  "hero.slide2.title": "Hayvonlar bilan tanish!",
  "hero.slide2.subtitle": "Hayvonlar va qushlarning tabiatda qanday yashashini bilib oling!",
  "hero.slide3.title": "O'yna va o'rgan!",
  "hero.slide3.subtitle": "Ekologiya bo'yicha qiziqarli o'yinlar va viktorinalar sizni kutmoqda!",
  "hero.slide4.title": "Tabiat qahramoniga aylan!",
  "hero.slide4.subtitle": "Chiqindilarni saralashni va resurslarni tejashni o'rganing!",
  "hero.slide5.title": "O'simliklarni o'rgan",
  "hero.slide5.subtitle": "Daraxtlar, gullar va o'tlar bizning yashil do'stlarimizdir",
  "hero.ctaLearn": "O'rganishni boshlash!",
  "hero.ctaQuiz": "Viktorinadan o'tish",

  // --- Bosh sahifa: bo'limlar ---
  "home.popular.heading": "🔥 Hozirda mashhur",
  "home.popular.subheading": "Bu haftaning eng mashhur maqolalari",
  "home.categories.heading": "📚 Kategoriya bo'yicha maqolalar",
  "home.categories.subheading": "O'zing qiziqtirayotgan mavzuni tanla!",
  "home.categories.viewAll": "Barchasini ko'rish →",
  "home.games.heading": "🎮 Eko-o'yinlar",
  "home.games.subheading": "O'yna va o'rgan!",
  "home.quizzes.heading": "🧠 Viktorinadan o't",
  "home.quizzes.subheading": "Qiziqarli testlar orqali ekologiya va tabiat haqidagi bilimlaringni sinab ko'r!",
  "home.quizzes.start": "Testni boshlash",

  // --- Newsletter ---
  "newsletter.title": "Eko-maslahatlarni pochtangizda qabul qiling! ✉️",
  "newsletter.description": "Yangiliklarimizga obuna bo'ling va tabiat haqidagi yangi maqolalar, o'yinlar hamda viktorinalardan birinchilardan bo'lib xabardor bo'ling!",
  "newsletter.placeholder": "Sizning elektron pochtangiz",
  "newsletter.subscribe": "Obuna bo'lish",
  "newsletter.successTitle": "Urra! Yangiliklarimizga obuna bo'ldingiz! 🎉",
  "newsletter.successDesc": "Tez orada sizga birinchi xatni yuboramiz",
  "newsletter.note": "Biz spam yubormaymiz. Faqat foydali ma'lumotlar! 🌿",

  // --- Hayvonlar sahifasi ---
  "animalsPage.heroTitle": "Hayvonlar",
  "animalsPage.heroSubtitle": "Dunyo hayvonlari haqida ajoyib faktlarni bilib oling — kichik mavjudotlardan tortib ulkan kitlargacha!",

  // --- O'simliklar sahifasi ---
  "plantsPage.heroTitle": "O'simliklar",
  "plantsPage.heroSubtitle": "Kichik maysalardan tortib ulkan daraxtlargacha — o'simliklar olamini o'rganing!",

  // --- Maqolalar sahifasi ---
  "articlesPage.heroTitle": "Maqolalar",
  "articlesPage.heroSubtitle": "Tabiat, hayvonlar va ekologiya haqidagi qiziqarli hikoyalar dunyosiga xush kelibsiz!",
  "articlesPage.categoryAll": "Barchasi",
  "category.animals": "Hayvonlar",
  "category.plants": "O'simliklar",
  "category.experiments": "Tajribalar",
  "category.tips": "Maslahatlar",

  // --- Maqola detali ---
  "articleDetail.notFoundTitle": "Maqola topilmadi",
  "articleDetail.notFoundDesc": "Afsuski, siz qidirgan maqola mavjud emas.",
  "articleDetail.backToArticles": "Maqolalarga qaytish",

  // --- O'yinlar sahifasi ---
  "gamesPage.heroTitle": "Eko-o'yinlar",
  "gamesPage.heroSubtitle": "O'yna va tabiatga g'amxo'rlik qilishni o'rgan! Yosh ekologlar uchun qiziqarli topshiriqlar.",
  "gamesPage.playNow": "Hozir o'yna",
  "gamesPage.comingSoonHeading": "Tez kunda",
  "gamesPage.play": "O'ynash",
  "gamesPage.difficulty.easy": "Oson",
  "gamesPage.difficulty.medium": "O'rtacha",
  "gamesPage.difficulty.hard": "Qiyin",

  // --- Viktorinalar sahifasi ---
  "quizzesPage.heroTitle": "Viktorinalar",
  "quizzesPage.heroSubtitle": "Qiziqarli testlar orqali ekologiya va tabiat haqidagi bilimlaringni sinab ko'r!",
  "quizzesPage.questions": "ta savol",
  "quizzesPage.participants": "kishi o'tdi",
  "quizzesPage.start": "Boshlash",
  "quizzesPage.bannerText": "Hozircha faqat bitta interaktiv viktorina o'ynash mumkin — qolganlari tayyorlanmoqda!",
  "quizzesPage.bannerCta": "Interaktiv viktorinani o'ynash",

  // --- Chiqindi saralash o'yini ---
  "recycle.title": "Axlatni Saralash",
  "recycle.level": "Daraja",
  "recycle.score": "Ball",
  "recycle.levelComplete": "Daraja Yakunlandi!",
  "recycle.nextLevel": "Keyingi Daraja",
  "recycle.restart": "Qayta boshlash",
  "recycle.correct": "Ajoyib! To'g'ri! 🎉",
  "recycle.wrong": "Yana urinib ko'r! 🤔",
  "recycle.dragHint": "Buyumni ushlab, kerakli qutiga torting yoki avval buyumni, so'ng qutini bosing",
  "recycle.bin.plastic": "Plastik",
  "recycle.bin.paper": "Qog'oz",
  "recycle.bin.organic": "Organik",
  "recycle.bin.metal": "Metall",
  "recycle.bin.glass": "Shisha",
  "recycle.bin.special": "Maxsus",

  // --- Daraxt ekish o'yini ---
  "tree.back": "O'yinlar ro'yxatiga qaytish",
  "tree.foxName": "Aqlli Tulki",
  "tree.welcome": "Salom! Men Aqlli Tulkiman. Keling, birgalikda bog' yaratamiz!",
  "tree.dig1": "Barakalla! Erni yumshatish daraxt ildizi uchun juda muhim! ⛏️",
  "tree.dig2": "Ajoyib! Sen juda kuchli ekolog ekansan! 💪",
  "tree.dig3": "Yana ozgina qoldi! Chuqurcha deyarli tayyor! ✨",
  "tree.dig4": "Tayyor! Endi eng hayajonli lahza - ko'chat ekish! 🌱",
  "tree.fact1": "Bilasizmi? Bitta daraxt yiliga 2 kishi uchun yetarli kislorod beradi! 🌬️",
  "tree.fact2": "Daraxtlar qushlar va hasharotlar uchun eng shinam uy hisoblanadi! 🐦",
  "tree.fact3": "Sayyoramizda 3 trilliondan ortiq daraxt bor, keling ularni ko'paytiramiz! 🌍",
  "tree.fact4": "Daraxt ekish - kelajak avlodga qoldirilgan eng yaxshi sovg'adir! 🎁",
  "tree.plantedMsg": "Zo'r natija! Sen haqiqiy Tabiat Qahramonisan! 🔥",
  "tree.treesLabel": "Daraxtlar",
  "tree.stageLabel": "Bosqich",
  "tree.digBtn": "QAZISH",
  "tree.plantBtn": "EKISH",
  "tree.gardenTitle": "Mening Bog'im",
  "tree.treesCountSuffix": "ta daraxt",
  "tree.noTreesYet": "Hali daraxtlar yo'q",
  "tree.readyToPlant": "EKISHGA TAYYOR! ✨",
  "tree.needDigging": "YERNI QAZISH KERAK ⛏️",
  "tree.congratsTitle": "AJOYIB!",
  "tree.congratsSubtitle": "Sen haqiqiy Tabiat Qahramonisan!",
  "tree.xp": "+50 XP",
  "tree.modelLoading": "Daraxt yuklanmoqda...",
  "tree.modelError": "Model yuklanmadi, lekin daraxting bog'ingda saqlandi 🌳",

  // --- Viktorina o'yini ---
  "quizGame.level": "Bosqich",
  "quizGame.question": "Savol",
  "quizGame.correctCount": "To'g'ri",
  "quizGame.nextQuestion": "Keyingi savol",
  "quizGame.finishLevel": "Bosqichni yakunlash",
  "quizGame.levelPassed": "Tabriklayman! Bosqichdan o'tdingiz.",
  "quizGame.levelFailed": "Afsus, keyingi bosqich uchun kamida 7 ta to'g'ri javob kerak. Bosqichni qayta boshlang.",
  "quizGame.allLevelsDone": "Ajoyib! Siz barcha bosqichlarni yakunladingiz! Haqiqiy Eko-Chempionsiz! 🏆",

  // --- 404 ---
  "notFound.title": "Sahifa topilmadi",
  "notFound.subtitle": "Siz izlagan sahifa mavjud emas yoki ko'chirilgan",
  "notFound.backHome": "Bosh sahifaga qaytish",

  // --- Loyiha haqida / bog'lanish / maxfiylik ---
  "about.title": "Loyiha haqida",
  "about.p1": "EcoKids — yosh tabiat do'stlari uchun yaratilgan ta'lim platformasi. Bizning maqsadimiz — bolalarga o'yin, viktorina va qiziqarli maqolalar orqali ekologiya va tabiatni asrashni sevdirish.",
  "about.p2": "Loyiha ochiq manba sifatida rivojlanmoqda va doimiy ravishda yangi o'yinlar, tillar va imkoniyatlar bilan boyitib borilmoqda.",
  "contact.title": "Biz bilan bog'lanish",
  "contact.body": "Savol, taklif yoki fikringiz bo'lsa, quyidagi manzil orqali biz bilan bog'lanishingiz mumkin:",
  "contact.emailLabel": "Elektron pochta",
  "privacy.title": "Maxfiylik siyosati",
  "privacy.p1": "EcoKids sizning shaxsiy ma'lumotlaringizni uchinchi shaxslarga sotmaydi yoki bermaydi. Til tanlovingiz va o'yin natijalaringiz faqat sizning brauzeringizda (localStorage) saqlanadi va serverga yuborilmaydi.",
  "privacy.p2": "Elektron pochta bo'limiga kiritilgan manzil faqat yangiliklar yuborish uchun ishlatiladi, uni istalgan vaqtda bekor qilishingiz mumkin.",
} as const;

const ru: Record<keyof typeof uz, string> = {
  // --- Общее ---
  "common.back": "Назад",
  "common.viewAll": "Смотреть всё",
  "common.readMore": "Читать далее",
  "common.comingSoon": "Скоро",
  "common.loading": "Загрузка...",
  "common.close": "Закрыть",
  "common.views": "просмотров",
  "common.rating": "рейтинг",
  "common.minutes": "мин",

  // --- Шапка / навигация ---
  "nav.animals": "Животные",
  "nav.plants": "Растения",
  "nav.games": "Игры",
  "nav.articles": "Статьи",
  "nav.quizzes": "Викторины",
  "nav.search": "Поиск",
  "nav.searchPlaceholder": "Поиск статей, игр, викторин...",
  "nav.searchEmpty": "Ничего не найдено",
  "nav.language": "Язык",

  // --- Подвал ---
  "footer.description": "Учимся вместе беречь природу! Увлекательные статьи, игры и викторины для юных защитников нашей планеты.",
  "footer.sections": "Разделы",
  "footer.about": "Информация",
  "footer.aboutUs": "О проекте",
  "footer.contact": "Связаться с нами",
  "footer.privacy": "Политика конфиденциальности",
  "footer.rights": "Все права защищены.",
  "footer.madeWith": "Сделано для нашей планеты с",
  "footer.madeWithEnd": "",

  // --- Главная: слайды ---
  "hero.slide1.title": "Учимся беречь природу!",
  "hero.slide1.subtitle": "Откройте вместе с нами удивительный мир экологии",
  "hero.slide2.title": "Знакомство с животными!",
  "hero.slide2.subtitle": "Узнайте, как животные и птицы живут в природе!",
  "hero.slide3.title": "Играй и учись!",
  "hero.slide3.subtitle": "Увлекательные игры и викторины по экологии ждут тебя!",
  "hero.slide4.title": "Стань героем природы!",
  "hero.slide4.subtitle": "Научись сортировать мусор и беречь ресурсы!",
  "hero.slide5.title": "Изучай растения",
  "hero.slide5.subtitle": "Деревья, цветы и травы — наши зелёные друзья",
  "hero.ctaLearn": "Начать учиться!",
  "hero.ctaQuiz": "Пройти викторину",

  // --- Главная: секции ---
  "home.popular.heading": "🔥 Популярное сейчас",
  "home.popular.subheading": "Самые популярные статьи этой недели",
  "home.categories.heading": "📚 Статьи по категориям",
  "home.categories.subheading": "Выбери интересующую тебя тему!",
  "home.categories.viewAll": "Смотреть всё →",
  "home.games.heading": "🎮 Эко-игры",
  "home.games.subheading": "Играй и учись!",
  "home.quizzes.heading": "🧠 Пройди викторину",
  "home.quizzes.subheading": "Проверь свои знания об экологии и природе с помощью увлекательных тестов!",
  "home.quizzes.start": "Начать тест",

  // --- Рассылка ---
  "newsletter.title": "Получайте эко-советы на почту! ✉️",
  "newsletter.description": "Подпишитесь на рассылку и первыми узнавайте о новых статьях, играх и викторинах о природе!",
  "newsletter.placeholder": "Ваш email",
  "newsletter.subscribe": "Подписаться",
  "newsletter.successTitle": "Ура! Вы подписались на рассылку! 🎉",
  "newsletter.successDesc": "Скоро мы отправим вам первое письмо",
  "newsletter.note": "Мы не рассылаем спам. Только полезная информация! 🌿",

  // --- Страница животных ---
  "animalsPage.heroTitle": "Животные",
  "animalsPage.heroSubtitle": "Узнайте удивительные факты о животных всего мира — от маленьких существ до огромных китов!",

  // --- Страница растений ---
  "plantsPage.heroTitle": "Растения",
  "plantsPage.heroSubtitle": "От маленьких травинок до огромных деревьев — изучайте мир растений!",

  // --- Страница статей ---
  "articlesPage.heroTitle": "Статьи",
  "articlesPage.heroSubtitle": "Добро пожаловать в мир увлекательных историй о природе, животных и экологии!",
  "articlesPage.categoryAll": "Все",
  "category.animals": "Животные",
  "category.plants": "Растения",
  "category.experiments": "Опыты",
  "category.tips": "Советы",

  // --- Детали статьи ---
  "articleDetail.notFoundTitle": "Статья не найдена",
  "articleDetail.notFoundDesc": "К сожалению, запрашиваемая статья не существует.",
  "articleDetail.backToArticles": "Вернуться к статьям",

  // --- Страница игр ---
  "gamesPage.heroTitle": "Эко-игры",
  "gamesPage.heroSubtitle": "Играй и учись заботиться о природе! Увлекательные задания для юных экологов.",
  "gamesPage.playNow": "Играть сейчас",
  "gamesPage.comingSoonHeading": "Скоро",
  "gamesPage.play": "Играть",
  "gamesPage.difficulty.easy": "Легко",
  "gamesPage.difficulty.medium": "Средне",
  "gamesPage.difficulty.hard": "Сложно",

  // --- Страница викторин ---
  "quizzesPage.heroTitle": "Викторины",
  "quizzesPage.heroSubtitle": "Проверь свои знания об экологии и природе с помощью увлекательных тестов!",
  "quizzesPage.questions": "вопросов",
  "quizzesPage.participants": "чел. прошли",
  "quizzesPage.start": "Начать",
  "quizzesPage.bannerText": "Пока доступна только одна интерактивная викторина — остальные готовятся!",
  "quizzesPage.bannerCta": "Играть в викторину",

  // --- Игра «Сортировка мусора» ---
  "recycle.title": "Сортировка мусора",
  "recycle.level": "Уровень",
  "recycle.score": "Очки",
  "recycle.levelComplete": "Уровень пройден!",
  "recycle.nextLevel": "Следующий уровень",
  "recycle.restart": "Начать заново",
  "recycle.correct": "Отлично! Правильно! 🎉",
  "recycle.wrong": "Попробуй ещё раз! 🤔",
  "recycle.dragHint": "Перетащи предмет в нужную корзину или сначала нажми на предмет, затем на корзину",
  "recycle.bin.plastic": "Пластик",
  "recycle.bin.paper": "Бумага",
  "recycle.bin.organic": "Органика",
  "recycle.bin.metal": "Металл",
  "recycle.bin.glass": "Стекло",
  "recycle.bin.special": "Особые",

  // --- Игра «Посади дерево» ---
  "tree.back": "Вернуться к играм",
  "tree.foxName": "Умная Лиса",
  "tree.welcome": "Привет! Я Умная Лиса. Давай вместе создадим сад!",
  "tree.dig1": "Молодец! Рыхлить землю очень важно для корней дерева! ⛏️",
  "tree.dig2": "Отлично! Ты настоящий эколог! 💪",
  "tree.dig3": "Ещё чуть-чуть! Ямка почти готова! ✨",
  "tree.dig4": "Готово! Теперь самый волнующий момент — посадка саженца! 🌱",
  "tree.fact1": "А знаешь? Одно дерево даёт достаточно кислорода для 2 человек в год! 🌬️",
  "tree.fact2": "Деревья — самый уютный дом для птиц и насекомых! 🐦",
  "tree.fact3": "На нашей планете более 3 триллионов деревьев, давай сажать ещё! 🌍",
  "tree.fact4": "Посадить дерево — лучший подарок будущим поколениям! 🎁",
  "tree.plantedMsg": "Отличный результат! Ты настоящий Герой Природы! 🔥",
  "tree.treesLabel": "Деревья",
  "tree.stageLabel": "Этап",
  "tree.digBtn": "КОПАТЬ",
  "tree.plantBtn": "САДИТЬ",
  "tree.gardenTitle": "Мой сад",
  "tree.treesCountSuffix": "дерева",
  "tree.noTreesYet": "Пока нет деревьев",
  "tree.readyToPlant": "ГОТОВО К ПОСАДКЕ! ✨",
  "tree.needDigging": "НУЖНО ВЫКОПАТЬ ЯМКУ ⛏️",
  "tree.congratsTitle": "ОТЛИЧНО!",
  "tree.congratsSubtitle": "Ты настоящий Герой Природы!",
  "tree.xp": "+50 XP",
  "tree.modelLoading": "Дерево загружается...",
  "tree.modelError": "Модель не загрузилась, но дерево сохранено в твоём саду 🌳",

  // --- Игра-викторина ---
  "quizGame.level": "Уровень",
  "quizGame.question": "Вопрос",
  "quizGame.correctCount": "Правильно",
  "quizGame.nextQuestion": "Следующий вопрос",
  "quizGame.finishLevel": "Завершить уровень",
  "quizGame.levelPassed": "Поздравляем! Вы прошли уровень.",
  "quizGame.levelFailed": "Увы, для следующего уровня нужно минимум 7 правильных ответов. Попробуйте уровень заново.",
  "quizGame.allLevelsDone": "Отлично! Вы прошли все уровни! Вы настоящий Эко-чемпион! 🏆",

  // --- 404 ---
  "notFound.title": "Страница не найдена",
  "notFound.subtitle": "Страница, которую вы ищете, не существует или была перемещена",
  "notFound.backHome": "Вернуться на главную",

  // --- О проекте / контакты / конфиденциальность ---
  "about.title": "О проекте",
  "about.p1": "EcoKids — образовательная платформа для юных друзей природы. Наша цель — привить детям любовь к экологии через игры, викторины и увлекательные статьи.",
  "about.p2": "Проект развивается как открытый и постоянно пополняется новыми играми, языками и возможностями.",
  "contact.title": "Связаться с нами",
  "contact.body": "Если у вас есть вопрос, предложение или отзыв, вы можете связаться с нами по адресу:",
  "contact.emailLabel": "Электронная почта",
  "privacy.title": "Политика конфиденциальности",
  "privacy.p1": "EcoKids не продаёт и не передаёт ваши личные данные третьим лицам. Выбор языка и результаты игр хранятся только в вашем браузере (localStorage) и не отправляются на сервер.",
  "privacy.p2": "Адрес, указанный в разделе рассылки, используется только для отправки новостей, и вы можете отписаться в любое время.",
};

const en: Record<keyof typeof uz, string> = {
  // --- Common ---
  "common.back": "Back",
  "common.viewAll": "View all",
  "common.readMore": "Read more",
  "common.comingSoon": "Coming soon",
  "common.loading": "Loading...",
  "common.close": "Close",
  "common.views": "views",
  "common.rating": "rating",
  "common.minutes": "min",

  // --- Header / navigation ---
  "nav.animals": "Animals",
  "nav.plants": "Plants",
  "nav.games": "Games",
  "nav.articles": "Articles",
  "nav.quizzes": "Quizzes",
  "nav.search": "Search",
  "nav.searchPlaceholder": "Search articles, games, quizzes...",
  "nav.searchEmpty": "Nothing found",
  "nav.language": "Language",

  // --- Footer ---
  "footer.description": "Let's learn to protect nature together! Fun articles, games and quizzes for young defenders of our planet.",
  "footer.sections": "Sections",
  "footer.about": "Info",
  "footer.aboutUs": "About the project",
  "footer.contact": "Contact us",
  "footer.privacy": "Privacy policy",
  "footer.rights": "All rights reserved.",
  "footer.madeWith": "Made for our planet with",
  "footer.madeWithEnd": "",

  // --- Home: hero slides ---
  "hero.slide1.title": "Let's learn to protect nature!",
  "hero.slide1.subtitle": "Discover the amazing world of ecology with us",
  "hero.slide2.title": "Meet the animals!",
  "hero.slide2.subtitle": "Learn how animals and birds live in nature!",
  "hero.slide3.title": "Play and learn!",
  "hero.slide3.subtitle": "Fun ecology games and quizzes are waiting for you!",
  "hero.slide4.title": "Become a nature hero!",
  "hero.slide4.subtitle": "Learn to sort waste and save resources!",
  "hero.slide5.title": "Learn about plants",
  "hero.slide5.subtitle": "Trees, flowers and grasses are our green friends",
  "hero.ctaLearn": "Start learning!",
  "hero.ctaQuiz": "Take a quiz",

  // --- Home: sections ---
  "home.popular.heading": "🔥 Popular right now",
  "home.popular.subheading": "This week's most popular articles",
  "home.categories.heading": "📚 Articles by category",
  "home.categories.subheading": "Pick a topic that interests you!",
  "home.categories.viewAll": "View all →",
  "home.games.heading": "🎮 Eco games",
  "home.games.subheading": "Play and learn!",
  "home.quizzes.heading": "🧠 Take a quiz",
  "home.quizzes.subheading": "Test your knowledge of ecology and nature with fun quizzes!",
  "home.quizzes.start": "Start test",

  // --- Newsletter ---
  "newsletter.title": "Get eco tips in your inbox! ✉️",
  "newsletter.description": "Subscribe to our newsletter and be the first to know about new articles, games and quizzes about nature!",
  "newsletter.placeholder": "Your email address",
  "newsletter.subscribe": "Subscribe",
  "newsletter.successTitle": "Hooray! You're subscribed! 🎉",
  "newsletter.successDesc": "We'll send you our first email soon",
  "newsletter.note": "We don't send spam. Only useful information! 🌿",

  // --- Animals page ---
  "animalsPage.heroTitle": "Animals",
  "animalsPage.heroSubtitle": "Discover amazing facts about animals from around the world — from tiny creatures to giant whales!",

  // --- Plants page ---
  "plantsPage.heroTitle": "Plants",
  "plantsPage.heroSubtitle": "From tiny sprouts to giant trees — explore the world of plants!",

  // --- Articles page ---
  "articlesPage.heroTitle": "Articles",
  "articlesPage.heroSubtitle": "Welcome to a world of fascinating stories about nature, animals and ecology!",
  "articlesPage.categoryAll": "All",
  "category.animals": "Animals",
  "category.plants": "Plants",
  "category.experiments": "Experiments",
  "category.tips": "Tips",

  // --- Article detail ---
  "articleDetail.notFoundTitle": "Article not found",
  "articleDetail.notFoundDesc": "Sorry, the article you're looking for doesn't exist.",
  "articleDetail.backToArticles": "Back to articles",

  // --- Games page ---
  "gamesPage.heroTitle": "Eco games",
  "gamesPage.heroSubtitle": "Play and learn to care for nature! Fun challenges for young ecologists.",
  "gamesPage.playNow": "Play now",
  "gamesPage.comingSoonHeading": "Coming soon",
  "gamesPage.play": "Play",
  "gamesPage.difficulty.easy": "Easy",
  "gamesPage.difficulty.medium": "Medium",
  "gamesPage.difficulty.hard": "Hard",

  // --- Quizzes page ---
  "quizzesPage.heroTitle": "Quizzes",
  "quizzesPage.heroSubtitle": "Test your knowledge of ecology and nature with fun quizzes!",
  "quizzesPage.questions": "questions",
  "quizzesPage.participants": "people took it",
  "quizzesPage.start": "Start",
  "quizzesPage.bannerText": "Only one interactive quiz is playable so far — the rest are on their way!",
  "quizzesPage.bannerCta": "Play the interactive quiz",

  // --- Recycle game ---
  "recycle.title": "Sort the Trash",
  "recycle.level": "Level",
  "recycle.score": "Score",
  "recycle.levelComplete": "Level complete!",
  "recycle.nextLevel": "Next level",
  "recycle.restart": "Restart",
  "recycle.correct": "Great! Correct! 🎉",
  "recycle.wrong": "Try again! 🤔",
  "recycle.dragHint": "Drag an item into the right bin, or tap the item then tap the bin",
  "recycle.bin.plastic": "Plastic",
  "recycle.bin.paper": "Paper",
  "recycle.bin.organic": "Organic",
  "recycle.bin.metal": "Metal",
  "recycle.bin.glass": "Glass",
  "recycle.bin.special": "Special",

  // --- Tree planting game ---
  "tree.back": "Back to games",
  "tree.foxName": "Clever Fox",
  "tree.welcome": "Hi! I'm Clever Fox. Let's build a garden together!",
  "tree.dig1": "Well done! Loosening the soil is so important for tree roots! ⛏️",
  "tree.dig2": "Awesome! You're a real ecologist! 💪",
  "tree.dig3": "Almost there! The hole is nearly ready! ✨",
  "tree.dig4": "Ready! Now for the most exciting part — planting! 🌱",
  "tree.fact1": "Did you know? One tree produces enough oxygen for 2 people a year! 🌬️",
  "tree.fact2": "Trees are the coziest home for birds and insects! 🐦",
  "tree.fact3": "Our planet has over 3 trillion trees — let's grow even more! 🌍",
  "tree.fact4": "Planting a tree is the best gift for future generations! 🎁",
  "tree.plantedMsg": "Amazing result! You're a true Nature Hero! 🔥",
  "tree.treesLabel": "Trees",
  "tree.stageLabel": "Stage",
  "tree.digBtn": "DIG",
  "tree.plantBtn": "PLANT",
  "tree.gardenTitle": "My Garden",
  "tree.treesCountSuffix": "trees",
  "tree.noTreesYet": "No trees yet",
  "tree.readyToPlant": "READY TO PLANT! ✨",
  "tree.needDigging": "DIG THE HOLE FIRST ⛏️",
  "tree.congratsTitle": "AMAZING!",
  "tree.congratsSubtitle": "You're a true Nature Hero!",
  "tree.xp": "+50 XP",
  "tree.modelLoading": "Loading tree...",
  "tree.modelError": "The model failed to load, but your tree was saved in your garden 🌳",

  // --- Quiz game ---
  "quizGame.level": "Level",
  "quizGame.question": "Question",
  "quizGame.correctCount": "Correct",
  "quizGame.nextQuestion": "Next question",
  "quizGame.finishLevel": "Finish level",
  "quizGame.levelPassed": "Congratulations! You passed the level.",
  "quizGame.levelFailed": "Sorry, you need at least 7 correct answers to move on. Try the level again.",
  "quizGame.allLevelsDone": "Amazing! You've completed every level! You're a true Eco Champion! 🏆",

  // --- 404 ---
  "notFound.title": "Page not found",
  "notFound.subtitle": "The page you're looking for doesn't exist or has been moved",
  "notFound.backHome": "Back to home",

  // --- About / contact / privacy ---
  "about.title": "About the project",
  "about.p1": "EcoKids is an educational platform for young friends of nature. Our goal is to help children fall in love with ecology through games, quizzes and fun articles.",
  "about.p2": "The project is developed as an open one and is constantly growing with new games, languages and features.",
  "contact.title": "Contact us",
  "contact.body": "If you have a question, suggestion or feedback, you can reach us at:",
  "contact.emailLabel": "Email",
  "privacy.title": "Privacy policy",
  "privacy.p1": "EcoKids does not sell or share your personal data with third parties. Your language choice and game results are stored only in your browser (localStorage) and are never sent to a server.",
  "privacy.p2": "The address entered in the newsletter section is used only to send updates, and you can unsubscribe at any time.",
};

export const translations = { uz, ru, en };
export type TranslationKey = keyof typeof uz;
