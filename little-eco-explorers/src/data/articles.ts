import { LocalizedText } from "@/i18n/types";

export type ArticleCategory = "animals" | "plants" | "experiments" | "tips";

export interface Article {
  slug: string;
  category: ArticleCategory;
  emoji: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText[];
  views: number;
  rating: number;
}

// Barcha maqolalar uchun YAGONA manba. AnimalsPage, PlantsPage, ArticlesPage,
// PopularSection, CategoriesSection va ArticleDetailPage barchasi shu ro'yxatdan
// kategoriya bo'yicha filtrlab foydalanadi — shu sabab endi butun saytda
// bitta maqolaga bitta izchil havola (/articles/:slug) mavjud.
export const baseArticles: Article[] = [
  // ---------- HAYVONLAR ----------
  {
    slug: "bird-nests",
    category: "animals",
    emoji: "🐦",
    title: {
      uz: "Qushlar uyasini qanday quradi?",
      ru: "Как птицы строят свои гнёзда?",
      en: "How do birds build their nests?",
    },
    excerpt: {
      uz: "Bizning qanotli do'stlarimiz o'z qulay uylarini qanday yaratadi, bilib oling",
      ru: "Узнайте, как наши пернатые друзья строят свои уютные дома",
      en: "Discover how our feathered friends build their cozy homes",
    },
    body: [
      {
        uz: "Har bir qush turi o'z uyasini boshqacha quradi. Ba'zilari shoxchalardan, ba'zilari loydan, ba'zilari esa o't-o'lan va patlardan foydalanadi. Uya — bu shunchaki uy emas, balki tuxum va jo'jalarni sovuqdan, yomg'irdan va dushmanlardan himoya qiluvchi qal'a.",
        ru: "Каждый вид птиц строит своё гнездо по-своему. Одни используют веточки, другие — глину, третьи — траву и перья. Гнездо — это не просто дом, а настоящая крепость, защищающая яйца и птенцов от холода, дождя и врагов.",
        en: "Every bird species builds its nest a little differently. Some use twigs, some use mud, and others weave grass and feathers together. A nest isn't just a home — it's a fortress that protects eggs and chicks from cold, rain, and predators.",
      },
      {
        uz: "Qushlar uyani qurish uchun tumshug'i va oyoqlarinigina ishlatadi, lekin natija ba'zan haqiqiy san'at asariga o'xshaydi! Masalan, to'quvchi qushlar shoxlarga osilgan, murakkab to'r kabi uylar quradi.",
        ru: "Птицы строят гнёзда, используя только клюв и лапки, но результат порой напоминает настоящее произведение искусства! Например, ткачики строят сложные, похожие на плетёную корзину гнёзда, свисающие с веток.",
        en: "Birds build their nests using only their beak and feet, yet the result can look like a true work of art! Weaver birds, for example, build intricate basket-like nests that hang from branches.",
      },
      {
        uz: "Agar bahorda daraxtlar orasida uya ko'rsangiz, unga yaqinlashmang va tegmang — ona qush qo'rqib, jo'jalarini tashlab ketishi mumkin. Uzoqdan tomosha qilish — eng yaxshi yordam!",
        ru: "Если весной вы увидите гнездо среди деревьев, не подходите близко и не трогайте его — мама-птица может испугаться и покинуть птенцов. Наблюдать издалека — лучшая помощь, которую вы можете оказать.",
        en: "If you spot a nest among the trees in spring, don't get too close or touch it — the mother bird might get scared and abandon her chicks. Watching from a distance is the best way to help.",
      },
    ],
    views: 987,
    rating: 4.9,
  },
  {
    slug: "bear-hibernation",
    category: "animals",
    emoji: "🐻",
    title: {
      uz: "Ayiqlarning qishki uyqusi",
      ru: "Зимняя спячка медведей",
      en: "Why do bears hibernate?",
    },
    excerpt: {
      uz: "Nima uchun ayiqlar qishda uxlashadi va bunga qanday tayyorgarlik ko'rishadi?",
      ru: "Почему медведи спят зимой и как они к этому готовятся?",
      en: "Why do bears sleep through winter, and how do they get ready for it?",
    },
    body: [
      {
        uz: "Qishda oziq-ovqat kamayadi, shuning uchun ayiqlar issiq mavsumda ko'proq ovqatlanib, tanasiga yog' to'playdi. Bu yog' zaxirasi ularga butun qish davomida ovqatlanmasdan omon qolishga yordam beradi.",
        ru: "Зимой еды становится мало, поэтому летом и осенью медведи усиленно питаются и накапливают жир. Этот запас жира помогает им пережить всю зиму без еды.",
        en: "Food becomes scarce in winter, so bears eat as much as they can in summer and fall to build up fat. That fat reserve helps them survive the whole winter without eating.",
      },
      {
        uz: "Ayiq uyqusi oddiy uyqudan farq qiladi: yurak urishi sekinlashadi, tana harorati pasayadi va u haftalab, hatto oylab uyg'onmasligi mumkin. Ammo bu chinakam qish uyqusi (anabioz) emas — ayiq xavf sezsa, tezda uyg'onishi mumkin.",
        ru: "Медвежий сон отличается от обычного: сердцебиение замедляется, температура тела снижается, и медведь может не просыпаться неделями и даже месяцами. Но это не настоящий анабиоз — при опасности медведь может быстро проснуться.",
        en: "A bear's winter sleep is different from normal sleep: its heartbeat slows down, its body temperature drops, and it may not wake for weeks or even months. But it isn't true hibernation in the deepest sense — a bear can wake up quickly if it senses danger.",
      },
      {
        uz: "Qiziq fakt: urg'ochi ayiqlar aynan shu uyqu davrida bolalaydi! Kichkina ayiqchalar qorong'i uyada, onasining issiqligida bahorgacha o'sadi.",
        ru: "Интересный факт: именно во время этого сна медведицы рожают детёнышей! Маленькие медвежата растут в тёплой тёмной берлоге рядом с мамой до самой весны.",
        en: "Fun fact: mother bears actually give birth during this sleep! Tiny cubs grow inside the warm, dark den next to their mother until spring arrives.",
      },
    ],
    views: 1456,
    rating: 4.8,
  },
  {
    slug: "dolphins-facts",
    category: "animals",
    emoji: "🐬",
    title: {
      uz: "Delfinlar haqida ajoyib faktlar",
      ru: "Удивительные факты о дельфинах",
      en: "Amazing facts about dolphins",
    },
    excerpt: {
      uz: "Ushbu aqlli dengiz hayvonlari juda ko'p sirlarni yashiradi",
      ru: "Эти умные морские животные хранят немало секретов",
      en: "These clever sea animals have plenty of secrets to share",
    },
    body: [
      {
        uz: "Delfinlar — baliq emas, sut emizuvchi hayvonlar! Ular ona qornida rivojlanadi, onasining suti bilan oziqlanadi va nafas olish uchun har necha daqiqada suv yuzasiga chiqib turadi.",
        ru: "Дельфины — не рыбы, а млекопитающие! Они развиваются в утробе матери, питаются её молоком и каждые несколько минут всплывают на поверхность, чтобы подышать.",
        en: "Dolphins aren't fish — they're mammals! They grow inside their mother, drink her milk, and surface every few minutes to breathe air.",
      },
      {
        uz: "Delfinlar bir-biri bilan maxsus xushtaklar va \"iqirlar\" orqali gaplashadi, hatto har biri o'ziga xos \"ismga\" ega deb hisoblanadi! Ular atrofni ovoz to'lqinlari (exolokatsiya) yordamida \"ko'radi\".",
        ru: "Дельфины общаются друг с другом с помощью особых свистов и щелчков, и считается, что у каждого дельфина есть своё уникальное «имя»! Окружающий мир они «видят» с помощью звуковых волн — эхолокации.",
        en: "Dolphins talk to each other using special whistles and clicks, and scientists believe each dolphin even has its own unique \"name\"! They \"see\" the world around them using sound waves — a skill called echolocation.",
      },
      {
        uz: "Delfinlar juda hamjihat: kasal yoki yaralangan do'stini suv yuzasida ushlab turib, nafas olishiga yordam berishadi. Bu ularning nechog'lik mehribon jonzot ekanini ko'rsatadi.",
        ru: "Дельфины очень заботливы: они поддерживают больного или раненого сородича у поверхности воды, помогая ему дышать. Это показывает, насколько добрыми могут быть эти животные.",
        en: "Dolphins look out for each other — they'll hold a sick or injured friend near the surface to help it breathe. It shows just how caring these animals can be.",
      },
    ],
    views: 2341,
    rating: 5.0,
  },
  {
    slug: "ant-life",
    category: "animals",
    emoji: "🐜",
    title: {
      uz: "Chumolilar hayoti",
      ru: "Жизнь муравьёв",
      en: "The life of ants",
    },
    excerpt: {
      uz: "Kichik mehnatkashlar ajoyib tashkilotga ega",
      ru: "У этих маленьких тружеников удивительная организация",
      en: "These tiny workers have an amazingly organized society",
    },
    body: [
      {
        uz: "Chumolilar uyasida har bir a'zoning o'z vazifasi bor: ba'zilari oziq-ovqat qidiradi, ba'zilari uyani qo'riqlaydi, ba'zilari esa tuxum va lichinkalarga g'amxo'rlik qiladi. Bu — tabiatdagi eng uyushgan \"jamiyatlardan\" biri.",
        ru: "В муравейнике у каждого своя роль: одни ищут еду, другие охраняют дом, третьи заботятся об яйцах и личинках. Это одно из самых организованных «обществ» в природе.",
        en: "Inside an ant colony, every ant has its own job: some search for food, some guard the nest, and others care for the eggs and larvae. It's one of the most organized \"societies\" found in nature.",
      },
      {
        uz: "Chumoli o'zining vazniga qaraganda 10-50 barobar og'irroq yukni ko'tara oladi! Agar odam shunday kuchga ega bo'lsa, u avtomobilni bemalol ko'tarib yura olardi.",
        ru: "Муравей способен поднять груз, в 10–50 раз превышающий его собственный вес! Если бы человек обладал такой силой, он бы легко поднимал автомобиль.",
        en: "An ant can carry a load 10 to 50 times heavier than its own body weight! If a person had that kind of strength, they could easily lift a car.",
      },
      {
        uz: "Chumolilar hidlar orqali gaplashadi — ular maxsus izlar qoldirib, boshqa chumolilarga oziq-ovqat qayerdaligini \"aytib\" berishadi.",
        ru: "Муравьи «разговаривают» с помощью запахов — они оставляют特ные следы, чтобы «рассказать» другим муравьям, где найти еду.",
        en: "Ants \"talk\" to each other using scent — they leave special trails to tell other ants exactly where to find food.",
      },
    ],
    views: 876,
    rating: 4.7,
  },
  {
    slug: "butterfly-transformation",
    category: "animals",
    emoji: "🦋",
    title: {
      uz: "Kapalaklar va ularning o'zgarishi",
      ru: "Бабочки и их удивительное превращение",
      en: "Butterflies and their amazing transformation",
    },
    excerpt: {
      uz: "Ushbu mitti hayvon qanday qilib go'zal kapalakka aylanadi",
      ru: "Как эта крошечная гусеница превращается в прекрасную бабочку",
      en: "How a tiny caterpillar turns into a beautiful butterfly",
    },
    body: [
      {
        uz: "Kapalak hayoti tuxumdan boshlanadi. Tuxumdan qurt (gusenitsa) chiqadi va u barglarni yeb, tez o'sadi. Keyin qurt o'zini ipak pilla bilan o'rab, \"quvurcha\" (kokon) hosil qiladi.",
        ru: "Жизнь бабочки начинается с яйца. Из яйца вылупляется гусеница, которая ест листья и быстро растёт. Затем гусеница оборачивает себя шёлковой нитью, образуя кокон — куколку.",
        en: "A butterfly's life begins as an egg. A caterpillar hatches from the egg, eats leaves, and grows quickly. Then it wraps itself in silk to form a chrysalis, or pupa.",
      },
      {
        uz: "Pilla ichida sehrli voqea sodir bo'ladi: qurtning tanasi butunlay qayta quriladi va ondan qanotli, rangdor kapalak paydo bo'ladi. Bu jarayon metamorfoz deb ataladi.",
        ru: "Внутри кокона происходит настоящее волшебство: тело гусеницы полностью перестраивается, и из него появляется крылатая, разноцветная бабочка. Этот процесс называется метаморфозом.",
        en: "Inside the chrysalis, something magical happens: the caterpillar's body completely rebuilds itself, and a winged, colorful butterfly emerges. This process is called metamorphosis.",
      },
      {
        uz: "Ba'zi kapalak turlari minglab kilometr uchib, mavsum bo'yicha bir mamlakatdan boshqasiga ko'chib o'tadi — bunday uzoq parvozni shunchalik mitti jonzot amalga oshiradi!",
        ru: "Некоторые виды бабочек пролетают тысячи километров, мигрируя из одной страны в другую в зависимости от сезона — и это проделывает такое крошечное создание!",
        en: "Some butterfly species migrate thousands of kilometers between countries with the seasons — an incredible journey for such a tiny creature!",
      },
    ],
    views: 1234,
    rating: 4.9,
  },
  {
    slug: "hedgehogs",
    category: "animals",
    emoji: "🦔",
    title: {
      uz: "Bizning bog'imizdagi kirpilar",
      ru: "Ежи в нашем саду",
      en: "Hedgehogs in our garden",
    },
    excerpt: {
      uz: "Kirpilar nima bilan oziqlanadi va ularga qanday yordam berish mumkin",
      ru: "Чем питаются ежи и как им можно помочь",
      en: "What hedgehogs eat, and how we can help them",
    },
    body: [
      {
        uz: "Kirpining ustki tanasi mingdan ortiq ninachadan iborat. Xavf tug'ilganda u to'p shakliga kirib, faqat ninalarini ko'rsatadi — bu uni deyarli barcha dushmanlaridan himoya qiladi.",
        ru: "Спина ежа покрыта более чем тысячей иголок. При опасности он сворачивается в клубок, выставляя наружу только иголки — это защищает его почти от всех врагов.",
        en: "A hedgehog's back is covered with more than a thousand spines. When it senses danger, it curls into a tight ball, showing only its spines — this protects it from almost every predator.",
      },
      {
        uz: "Kirpilar asosan tunda faol bo'ladi va qurt-qumursqa, chuvalchang, mevalar bilan oziqlanadi — bu ularni bog'bonlarning eng yaxshi do'stiga aylantiradi, chunki ular zararkunandalarni yeydi!",
        ru: "Ежи активны в основном ночью и питаются жуками, червями и фруктами — это делает их лучшими друзьями садоводов, ведь они поедают вредителей!",
        en: "Hedgehogs are mostly active at night and eat insects, worms, and fruit — which makes them a gardener's best friend, since they eat garden pests!",
      },
      {
        uz: "Agar bog'ingizda kirpi ko'rsangiz, unga sigir suti bermang — bu ularning oshqozoniga zararli. Buning o'rniga toza suv qo'yish yetarli.",
        ru: "Если вы увидите ежа в своём саду, не давайте ему коровье молоко — оно вредно для его желудка. Достаточно просто поставить миску с чистой водой.",
        en: "If you spot a hedgehog in your garden, don't give it cow's milk — it's actually bad for their stomach. A bowl of clean water is all they need.",
      },
    ],
    views: 654,
    rating: 4.6,
  },

  // ---------- O'SIMLIKLAR ----------
  {
    slug: "forest-importance",
    category: "plants",
    emoji: "🌲",
    title: {
      uz: "Nima uchun o'rmonlar sayyora uchun muhim?",
      ru: "Почему леса так важны для планеты?",
      en: "Why are forests so important for the planet?",
    },
    excerpt: {
      uz: "Daraxtlar havoni qanday tozalashi va hayvonlarga uy berishi haqida bilib oling",
      ru: "Узнайте, как деревья очищают воздух и служат домом для животных",
      en: "Learn how trees clean the air and give animals a place to live",
    },
    body: [
      {
        uz: "Daraxtlar fotosintez jarayonida karbonat angidridni yutib, kislorod chiqaradi — shu sababli o'rmonlarni sayyoramizning \"o'pkasi\" deb atashadi. Bitta katta daraxt bir kunda bir necha kishi nafas olishi uchun yetarli kislorod ishlab chiqaradi.",
        ru: "В процессе фотосинтеза деревья поглощают углекислый газ и выделяют кислород — поэтому леса называют «лёгкими» нашей планеты. Одно большое дерево за день производит достаточно кислорода для нескольких человек.",
        en: "Through photosynthesis, trees absorb carbon dioxide and release oxygen — that's why forests are called the planet's \"lungs.\" A single large tree produces enough oxygen in one day for several people to breathe.",
      },
      {
        uz: "O'rmon — bu millionlab hayvon, qush va hasharotlar uchun uy. Bir daraxtning o'zida ham qushlar uya quradi, ham sincoblar yashaydi, ham hasharotlar poyasida hayot kechiradi.",
        ru: "Лес — это дом для миллионов животных, птиц и насекомых. На одном-единственном дереве могут гнездиться птицы, жить белки и обитать множество насекомых.",
        en: "A forest is home to millions of animals, birds, and insects. A single tree alone can hold bird nests, be home to squirrels, and host countless insects living on its bark.",
      },
      {
        uz: "Daraxt ildizlari tuproqni mustahkamlab, tog' jinslarining yemirilishi va sel-ko'chkilarning oldini oladi. Shuning uchun o'rmonlarni asrash — butun sayyorani asrash demakdir.",
        ru: "Корни деревьев укрепляют почву и предотвращают эрозию и оползни. Поэтому защита лесов — это защита всей нашей планеты.",
        en: "Tree roots hold the soil together and help prevent erosion and landslides. That's why protecting forests really means protecting the whole planet.",
      },
    ],
    views: 1234,
    rating: 4.8,
  },
  {
    slug: "grow-tree",
    category: "plants",
    emoji: "🌳",
    title: {
      uz: "O'z daraxtingni qanday o'stirish mumkin?",
      ru: "Как вырастить своё собственное дерево?",
      en: "How to grow your very own tree",
    },
    excerpt: {
      uz: "Yosh bog'bonlar uchun bosqichma-bosqich ko'rsatma",
      ru: "Пошаговая инструкция для юных садоводов",
      en: "A step-by-step guide for young gardeners",
    },
    body: [
      {
        uz: "Avval urug' yoki yosh ko'chat tanlang. Olma, o'rik yoki yong'oq urug'lari uydagi gulqoq (kastryulka)da ham ekish uchun yaxshi boshlang'ich hisoblanadi.",
        ru: "Сначала выберите семя или молодой саженец. Семена яблони, абрикоса или грецкого ореха отлично подходят для первого опыта посадки дома в горшке.",
        en: "First, choose a seed or a young sapling. Apple, apricot, or walnut seeds are a great starting point for planting at home in a pot.",
      },
      {
        uz: "Urug'ni nam tuproqqa ekib, quyoshli joyga qo'ying. Har kuni ozgina suv bering — lekin ko'p emas, chunki ortiqcha suv ildizni chiritishi mumkin.",
        ru: "Посадите семя во влажную почву и поставьте на солнечное место. Поливайте каждый день понемногу — но не слишком много, иначе корни могут загнить.",
        en: "Plant the seed in moist soil and place it somewhere sunny. Water it a little every day — but not too much, or the roots may start to rot.",
      },
      {
        uz: "Ko'chat 20-30 sm bo'lgach, uni bog' yoki hovliga ko'chirib o'tqazish mumkin. Bir necha yildan so'ng u siz kabi \"o'sib\", soya beradigan haqiqiy daraxtga aylanadi!",
        ru: "Когда саженец вырастет до 20–30 см, его можно пересадить в сад или во двор. Через несколько лет он «вырастет», как и вы, и превратится в настоящее дерево, дающее тень!",
        en: "Once the sapling reaches about 20–30 cm, you can transplant it into a garden or yard. In a few years, it will grow up just like you — into a real tree that gives shade!",
      },
    ],
    views: 765,
    rating: 4.9,
  },
  {
    slug: "medicinal-plants",
    category: "plants",
    emoji: "🌿",
    title: {
      uz: "O'zbekistonning shifobaxsh o'simliklari",
      ru: "Целебные растения Узбекистана",
      en: "Uzbekistan's healing plants",
    },
    excerpt: {
      uz: "Qaysi giyohlar shamollashni davolashda yordam beradi?",
      ru: "Какие травы помогают при простуде?",
      en: "Which herbs can help when you catch a cold?",
    },
    body: [
      {
        uz: "Yalpiz (mint) — eng mashhur shifobaxsh o'simliklardan biri. Uning barglaridan tayyorlangan choy tomoqni yumshatib, nafas olishni yengillashtiradi.",
        ru: "Мята — одно из самых известных целебных растений. Чай из её листьев смягчает горло и облегчает дыхание.",
        en: "Mint is one of the best-known healing plants. Tea made from its leaves soothes a sore throat and makes breathing easier.",
      },
      {
        uz: "Rayhon va boychechak kabi o'simliklar ham xalq tabobatida keng qo'llaniladi. Ammo har qanday o'simlikni davo sifatida ishlatishdan oldin katta odamlar va shifokor bilan maslahatlashish zarur.",
        ru: "Такие растения, как базилик и подснежник, также широко используются в народной медицине. Но прежде чем использовать любое растение как лекарство, обязательно посоветуйтесь со взрослыми и врачом.",
        en: "Plants like basil and snowdrop are also widely used in traditional medicine. But before using any plant as a remedy, it's important to check with a grown-up and a doctor first.",
      },
      {
        uz: "Shifobaxsh o'simliklarni yovvoyi tabiatdan yulib olishdan ko'ra, ularni bog'da o'zingiz o'stirish ancha yaxshi — bu ham tabiatni asraydi, ham har doim qo'l ostida bo'lishini ta'minlaydi.",
        ru: "Гораздо лучше выращивать целебные растения у себя в саду, чем срывать их в дикой природе — это и природу бережёт, и всегда будет под рукой.",
        en: "It's much better to grow healing plants in your own garden than to pick them from the wild — it protects nature and keeps them close at hand whenever you need them.",
      },
    ],
    views: 654,
    rating: 4.7,
  },
  {
    slug: "meadow-flowers",
    category: "plants",
    emoji: "🌻",
    title: {
      uz: "Adir gullari",
      ru: "Цветы холмистых лугов",
      en: "Flowers of the meadow hills",
    },
    excerpt: {
      uz: "Yurtimizning go'zal dala gullari bilan tanishing",
      ru: "Познакомьтесь с прекрасными полевыми цветами нашего края",
      en: "Meet the beautiful wildflowers of our countryside",
    },
    body: [
      {
        uz: "Bahorda adirlar lolaqizg'aldoq, boychechak va boshqa yovvoyi gullar bilan qip-qizil va rang-barang libosga burkanadi. Bu manzara faqat bir necha hafta davom etadi.",
        ru: "Весной холмы покрываются алыми маками, подснежниками и другими дикими цветами, превращаясь в яркий разноцветный ковёр. Это зрелище длится всего несколько недель.",
        en: "In spring, the hills burst into red poppies, snowdrops, and other wildflowers, turning into a bright, colorful carpet. This beautiful sight only lasts a few weeks.",
      },
      {
        uz: "Yovvoyi gullar asalarilar va kapalaklar uchun eng muhim oziq manbai. Ular bo'lmasa, gulni changlatuvchi hasharotlar ham ozayib ketardi.",
        ru: "Дикие цветы — важнейший источник пищи для пчёл и бабочек. Без них насекомых-опылителей стало бы намного меньше.",
        en: "Wildflowers are a vital food source for bees and butterflies. Without them, there would be far fewer pollinating insects.",
      },
      {
        uz: "Gulларни ko'rganda ularni yulib olish o'rniga, rasmga tushirib xotira sifatida saqlash mumkin — shunda gullar boshqa hasharot va odamlarga ham go'zallik ulashishda davom etadi.",
        ru: "Вместо того чтобы срывать цветы, лучше сфотографировать их на память — тогда они продолжат радовать своей красотой и насекомых, и других людей.",
        en: "Instead of picking the flowers, it's nicer to take a photo as a keepsake — that way the flowers keep sharing their beauty with insects and other people too.",
      },
    ],
    views: 543,
    rating: 4.6,
  },
  {
    slug: "mushroom-kingdom",
    category: "plants",
    emoji: "🍄",
    title: {
      uz: "Qo'ziqorinlar saltanati",
      ru: "Царство грибов",
      en: "The kingdom of mushrooms",
    },
    excerpt: {
      uz: "Qaysi qo'ziqorinlarni yig'ish mumkin, qaysilari esa xavfli?",
      ru: "Какие грибы можно собирать, а какие опасны?",
      en: "Which mushrooms are safe to pick, and which are dangerous?",
    },
    body: [
      {
        uz: "Qiziq fakt: qo'ziqorinlar o'simlik emas — ular alohida, mustaqil tabiat olamiga (zamburug'lar olamiga) mansub! Ular fotosintez qilmaydi, aksincha chirigan barglar va yog'ochdan oziqlanadi.",
        ru: "Интересный факт: грибы — это не растения! Они относятся к отдельному, самостоятельному царству природы — царству грибов. Они не фотосинтезируют, а питаются гниющими листьями и древесиной.",
        en: "Fun fact: mushrooms aren't plants at all — they belong to their own separate kingdom of nature called fungi! They don't photosynthesize; instead, they feed on decaying leaves and wood.",
      },
      {
        uz: "Ba'zi qo'ziqorinlar juda zaharli va hatto tashqi ko'rinishi yeyilishi mumkin bo'lganlarga o'xshab ketadi. Shuning uchun hech qachon o'zingiz bilmagan qo'ziqorinni terib yemang — faqat katta odam bilan birga va uning ruxsati bilan.",
        ru: "Некоторые грибы очень ядовиты и по внешнему виду могут напоминать съедобные. Поэтому никогда не ешьте незнакомый гриб самостоятельно — только вместе со взрослым и с его разрешения.",
        en: "Some mushrooms are highly poisonous and can look a lot like edible ones. That's why you should never eat a mushroom you don't recognize on your own — only with a grown-up's help and permission.",
      },
      {
        uz: "Qo'ziqorinlar o'rmon uchun juda foydali: ular chirigan daraxtlarni parchalab, tuproqni ozuqaga boyitadi va yangi o'simliklar o'sishiga yordam beradi.",
        ru: "Грибы очень полезны для леса: они разлагают гниющие деревья, обогащают почву питательными веществами и помогают расти новым растениям.",
        en: "Mushrooms are actually very helpful to the forest: they break down decaying wood, enrich the soil with nutrients, and help new plants grow.",
      },
    ],
    views: 987,
    rating: 4.8,
  },
  {
    slug: "houseplants",
    category: "plants",
    emoji: "🪴",
    title: {
      uz: "Xona o'simliklari",
      ru: "Комнатные растения",
      en: "Houseplants",
    },
    excerpt: {
      uz: "Uydagi yashil do'stlarimizni qanday parvarish qilish kerak?",
      ru: "Как ухаживать за нашими зелёными друзьями дома?",
      en: "How to take care of our green friends at home",
    },
    body: [
      {
        uz: "Xona o'simliklari nafaqat uyni bezaydi, balki havoni ham tozalaydi! Ular karbonat angidridni yutib, toza kislorod chiqaradi — xuddi kichkina daraxtlar kabi.",
        ru: "Комнатные растения не только украшают дом, но и очищают воздух! Они поглощают углекислый газ и выделяют чистый кислород — совсем как маленькие деревья.",
        en: "Houseplants don't just make a home look nice — they clean the air too! They absorb carbon dioxide and release fresh oxygen, just like tiny trees.",
      },
      {
        uz: "Har bir o'simlikning o'ziga xos ehtiyoji bor: ba'zilari ko'p quyosh yoqtiradi, ba'zilari soyani afzal ko'radi. Sug'orishdan oldin tuproqni barmog'ingiz bilan tekshiring — agar quruq bo'lsa, suv vaqti kelgan.",
        ru: "У каждого растения свои потребности: одни любят много солнца, другие предпочитают тень. Перед поливом проверьте почву пальцем — если она сухая, значит, пора полить.",
        en: "Every plant has its own needs: some love lots of sunlight, while others prefer shade. Before watering, check the soil with your finger — if it's dry, it's time to water.",
      },
      {
        uz: "O'simlikka g'amxo'rlik qilish — mas'uliyatni o'rganishning ajoyib yo'li. Kichkina ko'chatdan boshlab, uning kunma-kun qanday o'sishini kuzatish juda qiziqarli!",
        ru: "Забота о растении — отличный способ научиться ответственности. Наблюдать, как маленький росток растёт день за днём, очень увлекательно!",
        en: "Caring for a plant is a great way to learn responsibility. Watching a tiny sprout grow a little more each day is genuinely exciting!",
      },
    ],
    views: 432,
    rating: 4.5,
  },

  // ---------- TAJRIBALAR ----------
  {
    slug: "mini-greenhouse",
    category: "experiments",
    emoji: "🔬",
    title: {
      uz: "O'z mini-issiqxonangni yarat",
      ru: "Сделай свою мини-теплицу",
      en: "Build your own mini greenhouse",
    },
    excerpt: {
      uz: "Yosh botaniklar uchun oddiy va qiziqarli tajriba",
      ru: "Простой и увлекательный опыт для юных ботаников",
      en: "A simple, fun experiment for young botanists",
    },
    body: [
      {
        uz: "Kerakli narsalar: shaffof plastik idish (masalan, ishlatilgan botilka yoki konteyner), paxta yoki tuproq, urug' (loviya urug'i eng tez unadi) va bir oz suv.",
        ru: "Что понадобится: прозрачная пластиковая ёмкость (например, использованная бутылка или контейнер), вата или почва, семена (быстрее всего прорастает фасоль) и немного воды.",
        en: "What you'll need: a clear plastic container (like a used bottle or box), cotton or soil, a seed (bean seeds sprout fastest), and a little water.",
      },
      {
        uz: "Idish tubiga nam paxta yoki tuproq soling, urug'ni ustiga qo'ying va idishni yopib, quyosh tushadigan derazaga qo'ying. Shaffof qopqoq issiqxona effektini yaratadi — namlik ichkarida qoladi.",
        ru: "Положите на дно ёмкости влажную вату или почву, поместите сверху семя и закройте ёмкость, поставив её на окно, куда попадает солнце. Прозрачная крышка создаёт эффект теплицы — влага остаётся внутри.",
        en: "Place damp cotton or soil at the bottom of the container, put the seed on top, close it up, and set it on a sunny windowsill. The clear lid creates a greenhouse effect, trapping moisture inside.",
      },
      {
        uz: "Bir necha kundan so'ng urug' unib chiqishini kuzatasiz! Har kuni o'zgarishlarni kundalikka yozib borish — kichik olim bo'lishning ajoyib usuli.",
        ru: "Через несколько дней вы увидите, как семя прорастает! Записывать изменения каждый день в дневник — отличный способ почувствовать себя настоящим маленьким учёным.",
        en: "Within a few days, you'll see the seed sprout! Writing down the changes in a little journal each day is a great way to feel like a real young scientist.",
      },
    ],
    views: 654,
    rating: 4.7,
  },
  {
    slug: "water-purification",
    category: "experiments",
    emoji: "🧪",
    title: {
      uz: "Tajriba: Suvni tozalash",
      ru: "Опыт: очистка воды",
      en: "Experiment: purifying water",
    },
    excerpt: {
      uz: "Oddiy ashyolardan foydalanib suv filtri yasab ko'ring",
      ru: "Сделай фильтр для воды из простых материалов",
      en: "Build a water filter from simple household materials",
    },
    body: [
      {
        uz: "Kerakli narsalar: plastik botilka, mayda tosh, qum, ko'mir (kraska ko'miri emas, tabiiy ko'mir) va paxta yoki mato.",
        ru: "Что понадобится: пластиковая бутылка, мелкие камешки, песок, уголь (натуральный, не строительный) и вата или ткань.",
        en: "What you'll need: a plastic bottle, small pebbles, sand, natural charcoal (not the kind used for building), and cotton or cloth.",
      },
      {
        uz: "Botilkaning tagini kesib, uni teskari qo'ying (og'zi pastga qarab). Ichiga qatlab-qatlab paxta, ko'mir, qum va toshni joylashtiring — bu tabiiy filtr bo'ladi.",
        ru: "Отрежьте дно бутылки и переверните её горлышком вниз. Уложите слоями вату, уголь, песок и камешки — получится настоящий природный фильтр.",
        en: "Cut off the bottom of the bottle and turn it upside down, neck facing down. Layer in cotton, charcoal, sand, and pebbles — this creates a natural filter.",
      },
      {
        uz: "Loyqa suvni yuqoridan quysangiz, pastdan ancha tiniqroq suv chiqadi! Diqqat: bu suv hali ham qaynatilmasdan ichishga yaroqli emas — bu faqat filtrlash jarayonini o'rganish uchun tajriba.",
        ru: "Если налить сверху мутную воду, снизу вытечет гораздо более чистая вода! Внимание: эта вода всё ещё не пригодна для питья без кипячения — это лишь опыт для изучения процесса фильтрации.",
        en: "Pour muddy water in from the top, and much clearer water will come out the bottom! Note: this water still isn't safe to drink without boiling — it's just an experiment to learn how filtering works.",
      },
    ],
    views: 543,
    rating: 4.5,
  },

  // ---------- MASLAHATLAR ----------
  {
    slug: "recycling-tips",
    category: "tips",
    emoji: "♻️",
    title: {
      uz: "Chiqindilarni to'g'ri saralaymiz",
      ru: "Правильно сортируем мусор",
      en: "Sorting waste the right way",
    },
    excerpt: {
      uz: "Butun oila uchun chiqindilarni alohida yig'ishning oddiy qoidalari",
      ru: "Простые правила раздельного сбора мусора для всей семьи",
      en: "Simple household rules for sorting waste as a family",
    },
    body: [
      {
        uz: "Chiqindilarni asosiy 4 turga ajratish mumkin: qog'oz, plastik, shisha va organik (oziq-ovqat) chiqindilar. Har biri alohida qutida yig'ilsa, qayta ishlash ancha osonlashadi.",
        ru: "Мусор можно разделить на 4 основных вида: бумага, пластик, стекло и органические (пищевые) отходы. Если собирать каждый вид отдельно, перерабатывать его становится гораздо проще.",
        en: "Waste can be sorted into four main types: paper, plastic, glass, and organic (food) waste. When each type is collected separately, recycling becomes much easier.",
      },
      {
        uz: "Uyda kichik oilaviy \"o'yin\" tashkil qiling: kim tezroq va to'g'riroq chiqindini saralasa, g'olib bo'ladi! Bu — bizning \"Axlatni saralash\" o'yinimizga juda o'xshaydi.",
        ru: "Устройте дома небольшую семейную «игру»: кто быстрее и правильнее рассортирует мусор, тот и победил! Это очень похоже на нашу игру «Сортировка мусора».",
        en: "Turn it into a small family game at home: whoever sorts the trash fastest and most correctly wins! It's a lot like our own \"Sort the Trash\" game.",
      },
      {
        uz: "Eng yaxshi chiqindi — umuman hosil bo'lmagan chiqindi. Qayta ishlatiladigan sumka va idishlardan foydalanish chiqindi miqdorini sezilarli kamaytiradi.",
        ru: "Лучший мусор — тот, которого вообще не возникает. Использование многоразовых сумок и контейнеров заметно сокращает количество отходов.",
        en: "The best kind of waste is the waste that's never created in the first place. Using reusable bags and containers noticeably cuts down on how much trash we make.",
      },
    ],
    views: 2341,
    rating: 5.0,
  },
  {
    slug: "save-water",
    category: "tips",
    emoji: "💧",
    title: {
      uz: "Uyda suvni tejaymiz",
      ru: "Экономим воду дома",
      en: "Saving water at home",
    },
    excerpt: {
      uz: "Har kuni suvni asrashning 10 ta oddiy usuli",
      ru: "10 простых способов беречь воду каждый день",
      en: "10 simple ways to save water every day",
    },
    body: [
      {
        uz: "Tish yuvayotganda kranni yopib qo'ying — bu bir daqiqada bir necha litr suvni tejaydi. Kichik odat, katta natija!",
        ru: "Закрывайте кран, пока чистите зубы — это экономит несколько литров воды за одну минуту. Маленькая привычка — большой результат!",
        en: "Turn off the tap while brushing your teeth — it saves several liters of water in just one minute. A small habit with a big result!",
      },
      {
        uz: "Dush qabul qilish vannaga qaraganda ancha kam suv sarflaydi. Dush vaqtini 5 daqiqagacha qisqartirish ham katta yordam beradi.",
        ru: "Душ расходует гораздо меньше воды, чем ванна. Сократить время принятия душа до 5 минут — тоже отличная помощь.",
        en: "Taking a shower uses far less water than a bath. Keeping showers to about 5 minutes helps a lot too.",
      },
      {
        uz: "Yomg'ir suvini idishga yig'ib, gullarni sug'orish uchun ishlating — bu ham suv, ham pulni tejaydi va tabiatga foyda keltiradi.",
        ru: "Собирайте дождевую воду в ёмкость и используйте её для полива цветов — это экономит и воду, и деньги, а заодно приносит пользу природе.",
        en: "Collect rainwater in a container and use it to water your plants — it saves both water and money, and it's good for nature too.",
      },
    ],
    views: 876,
    rating: 4.6,
  },
  {
    slug: "global-warming-kids",
    category: "tips",
    emoji: "🌍",
    title: {
      uz: "Global isish nima o'zi?",
      ru: "Что такое глобальное потепление?",
      en: "What is global warming?",
    },
    excerpt: {
      uz: "Sayyoramiz nima uchun isib bormoqda va biz nima qila olamiz?",
      ru: "Почему наша планета нагревается и что мы можем сделать?",
      en: "Why is our planet getting warmer and what can we do?",
    },
    body: [
      {
        uz: "Global isish — bu Yer haroratining asta-sekin ko'tarilishidir. Bunga asosan zavodlardan chiqayotgan tutunlar, mashinalar va daraxtlarning kesilishi sabab bo'ladi. Bu gazlar Yer atrofida xuddi qalin ko'rpa kabi yig'ilib qoladi va issiqlikni ushlab qoladi.",
        ru: "Глобальное потепление — это постепенное повышение температуры Земли. В основном это вызвано дымом от заводов, автомобилями и вырубкой деревьев. Эти газы собираются вокруг Земли, как толстое одеяло, и удерживают тепло.",
        en: "Global warming is the gradual increase in Earth's temperature. It is mostly caused by smoke from factories, cars, and cutting down trees. These gases wrap around the Earth like a thick blanket, trapping the heat."
      },
      {
        uz: "Haroratning ko'tarilishi tufayli muzliklar erib, dengiz sathi ko'tarilmoqda. Ayrim jonivorlar, masalan oq ayiqlar o'z yashash joylarini yo'qotishi mumkin.",
        ru: "Из-за повышения температуры ледники тают, а уровень моря повышается. Некоторые животные, например, белые медведи, могут потерять среду обитания.",
        en: "Because of the rising temperatures, glaciers are melting and sea levels are rising. Some animals, like polar bears, could lose their habitats."
      },
      {
        uz: "Biz sayyoramizga yordam berishimiz mumkin! Chiroqlarni o'chirish, suvni tejash, daraxt ekish va ko'proq velosipedda yurish tabiatni asrashning oddiy va zo'r usullaridir.",
        ru: "Мы можем помочь нашей планете! Выключать свет, беречь воду, сажать деревья и чаще ездить на велосипеде — это простые и отличные способы защиты природы.",
        en: "We can help our planet! Turning off lights, saving water, planting trees, and riding bikes more often are simple and great ways to protect nature."
      }
    ],
    views: 1200,
    rating: 4.9,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return baseArticles.find((a) => a.slug === slug);
}
