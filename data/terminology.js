// د پښتو الفبا
export const pashtoAlphabet = [
  'ا', 'ب', 'پ', 'ت', 'ټ', 'ث', 'ج', 'چ', 'ح', 'خ',
  'د', 'ډ', 'ذ', 'ر', 'ړ', 'ز', 'ژ', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'ګ', 'ل',
  'م', 'ن', 'ڼ', 'و', 'ه', 'ی',
];

// د لومړنیو حقوقي اصطلاحاتو ډیټا
export const terminologyData = [
  {
    id: 't001',
    letter: 'ا',
    term: 'اجاره',
    transliteration: 'Ijara',
    category: 'مدني حقوق',
    definition:
      'هغه قرارداد چې له مخې یې یو کس د بل کس ملکیت یا شي د یوې ټاکلې مودې او ټاکلې کرایې په بدل کې د استفادې لپاره ترلاسه کوي.',
    simpleExplanation:
      'د کور، موټر یا د ځمکې کرایه کول، د اجارې قرارداد دي.',
    example:
      'احمد د خپل کور یوه برخه میاشتنی ۵۰۰۰ افغانۍ کرایه ورکړه، دا د اجارې قرارداد دی.',
  },
  {
    id: 't002',
    letter: 'ا',
    term: 'امانت',
    transliteration: 'Amanat',
    category: 'مدني حقوق',
    definition:
      'د بل کس د ملکیت یا شي په باور ساتل، پرته له دې چې د هغه د کارولو حق ولري.',
    simpleExplanation:
      'کله چې یو څوک بل ته یو شي د ساتلو لپاره درکړي، هغه امانت دی.',
    example:
      'محمد خپل ساعت علی ته د ساتلو لپاره ورکړ، علی باید هغه په امانت کې وساتي.',
  },
  {
    id: 't003',
    letter: 'ا',
    term: 'اقرار',
    transliteration: 'Iqrar',
    category: 'جزایي حقوق',
    definition:
      'د یو کس له خوا د یوې ادعا یا جرم اعتراف کول، په داسې حال کې چې هغه پوه او خپله خوښه وي.',
    simpleExplanation:
      'کله چې یو کس ووایي "هو، زه دا کار کړی دی"، هغه اقرار دی.',
    example:
      'متهم په محکمه کې وویل چې هغه پیسې یې اخیستې دي، دا اقرار دی.',
  },
  {
    id: 't004',
    letter: 'ب',
    term: 'بيع',
    transliteration: 'Bay',
    category: 'مدني حقوق',
    definition:
      'د یو شي د ملکیت د بدلولو قرارداد چې له مخې یې یو کس خپل شي د یوې ټاکلې پیسې په بدل کې بل ته ورکوي.',
    simpleExplanation: 'د یو شي پیرود او پلورل، بیع دی.',
    example:
      'سعید خپل موټر احمد ته په ۵۰۰,۰۰۰ افغانیو وپلورل، دا بیع ده.',
  },
  {
    id: 't005',
    letter: 'ت',
    term: 'تهمت',
    transliteration: 'Tohmat',
    category: 'جزایي حقوق',
    definition:
      'د یو کس په اړه د درواغو تورونو وهل، په داسې ډول چې د هغه حیثیت ته زیان ورسوي.',
    simpleExplanation:
      'کله چې یو څوک په بل درواغ ووایي چې هغه بد کار کړی، هغه تهمت دی.',
    example:
      'زید وویل چې عمرو غلا کړې، خو دا ثابته نه شوه، دا تهمت و.',
  },
  {
    id: 't006',
    letter: 'ج',
    term: 'جنایت',
    transliteration: 'Jinayat',
    category: 'جزایي حقوق',
    definition:
      'هغه ستر جرم چې د یو کس پر ژوند، بدن یا ازادي باندې تیری وي، لکه وژنه، غلا او نور.',
    simpleExplanation:
      'د وژنې، جنسي تیری او لویو غلاوو په څېر سترې جنایي جرمونه.',
    example: 'که یو څوک بل کس ووژني، دا د جنایت یوه بڼه ده.',
  },
  {
    id: 't007',
    letter: 'ح',
    term: 'حق',
    transliteration: 'Haq',
    category: 'عمومي حقوق',
    definition:
      'هغه قانوني امتیاز یا اختیار چې یو کس ته د قانون له خوا ورکړل شوی وي.',
    simpleExplanation:
      'هر هغه څه چې یو کس یې د قانون له مخې ترلاسه کولای شي، د هغه حق دی.',
    example: 'هر کارګر حق لري چې د خپل کار معاش ترلاسه کړي.',
  },
  {
    id: 't008',
    letter: 'ح',
    term: 'حکم',
    transliteration: 'Hukm',
    category: 'قضايي',
    definition:
      'هغه رسمي پرېکړه چې د محکمې له خوا د یوې قضیې په اړه ورکول کیږي.',
    simpleExplanation: 'د قاضي وروستۍ پرېکړه چې هغه د قضیې په اړه کوي.',
    example:
      'محکمې حکم وکړ چې متهم دې دوه کاله بند محکوم شي.',
  },
  {
    id: 't009',
    letter: 'د',
    term: 'دعوا',
    transliteration: 'Dawa',
    category: 'مدني حقوق',
    definition:
      'هغه رسمي غوښتنه چې یو کس د محکمې له لارې د خپل حق د ترلاسه کولو لپاره کوي.',
    simpleExplanation:
      'کله چې یو څوک محکمې ته لاړ شي او د خپل حق غوښتنه وکړي.',
    example:
      'احمد محکمې ته دعوا وکړه چې محمد دې خپل پور ادا کړي.',
  },
  {
    id: 't010',
    letter: 'د',
    term: 'دلیل',
    transliteration: 'Dalil',
    category: 'قضايي',
    definition:
      'هغه معلومات یا اسناد چې د یوې ادعا د اثبات یا رد لپاره کارول کیږي.',
    simpleExplanation:
      'د یوې خبرې د ثابتولو لپاره هغه شواهد چې وړاندې کیږي.',
    example:
      'د غلا د قضیې لپاره د عکسونو او د شاهدانو د څرګندونو په څېر دلایل وړاندې شول.',
  },
  {
    id: 't011',
    letter: 'ر',
    term: 'رشوت',
    transliteration: 'Rishwat',
    category: 'جزایي حقوق',
    definition:
      'د یو کس له خوا د بل کس ته د پیسو یا ډالۍ ورکول، ترڅو هغه د خپلې دندې خلاف کار وکړي.',
    simpleExplanation:
      'کله چې یو څوک پیسې ورکړي ترڅو یو کار په ناقانونه توګه ترسره شي.',
    example:
      'د پولیسو افسر ته پیسې ورکول ترڅو د یوې قضیې په اړه یې زغم وکړي، رشوت دی.',
  },
  {
    id: 't012',
    letter: 'س',
    term: 'سند',
    transliteration: 'Sanad',
    category: 'قضايي',
    definition:
      'هغه لیکلی یا رسمي سند چې د یوې موضوع د اثبات لپاره کارول کیږي.',
    simpleExplanation:
      'هر رسمي کاغذ چې یو څه ثابتوي، لکه د ملکیت سند.',
    example:
      'د ځمکې د ملکیت سند د محکمې په وړاندې وړاندې شو.',
  },
  {
    id: 't013',
    letter: 'ش',
    term: 'شاهد',
    transliteration: 'Shahed',
    category: 'قضايي',
    definition:
      'هغه کس چې د یوې پېښې یا قضیې په اړه معلومات لري او د محکمې په وړاندې یې څرګندوي.',
    simpleExplanation:
      'هغه کس چې یو څه لیدلي یا اوریدلي وي او د محکمې په وړاندې یې وایي.',
    example:
      'د پیښې شاهد محکمې ته وویل چې هغه ولیدل چې متهم کور ته ننوت.',
  },
  {
    id: 't014',
    letter: 'ع',
    term: 'عدالت',
    transliteration: 'Adalat',
    category: 'عمومي حقوق',
    definition:
      'هغه حالت چې هر کس ته د قانون له مخې خپل حق ورکړل شي، پرته له تبعیض.',
    simpleExplanation: 'انصاف، د هر کس حق ورکول.',
    example:
      'د عدالت لپاره اړینه ده چې قاضي پرته له تعصب پرېکړه وکړي.',
  },
  {
    id: 't015',
    letter: 'ع',
    term: 'عقد',
    transliteration: 'Aqd',
    category: 'مدني حقوق',
    definition:
      'هغه قانوني تړون چې د دواړو خواوو ترمنځ د یوې موافقې له مخې رامنځته کیږي.',
    simpleExplanation:
      'کله چې دوه کسه د یو کار په اړه موافقه وکړي او قانوني تړون وکړي.',
    example:
      'د کار قرارداد یو عقد دی چې کارګر او کارفرما ترمنځ لاسلیک کیږي.',
  },
  {
    id: 't016',
    letter: 'غ',
    term: 'غصب',
    transliteration: 'Ghasb',
    category: 'جزایي حقوق',
    definition:
      'د بل کس د ملکیت یا شي په زور یا پرته له اجازې نیول او د خپلې خوښې له مخې کارول.',
    simpleExplanation: 'د بل کس شي په زور یا پرته له اجازې نیول.',
    example:
      'زید د عمرو ځمکه پرته له اجازې ونیوله او پرې کرنه یې پیل کړه، دا غصب دی.',
  },
  {
    id: 't017',
    letter: 'ف',
    term: 'فسخ',
    transliteration: 'Faskh',
    category: 'مدني حقوق',
    definition:
      'د یو قانوني قرارداد لغوه کول، یا د محکمې له خوا یا د دواړو خواوو د موافقې له مخې.',
    simpleExplanation: 'د یوې موافقې یا قرارداد پای ته رسول.',
    example:
      'دواړو خواوو موافقه وکړه چې د کور کرایې قرارداد فسخ کړي.',
  },
  {
    id: 't018',
    letter: 'ق',
    term: 'قانون',
    transliteration: 'Qanoon',
    category: 'عمومي حقوق',
    definition:
      'هغه ټولګه قواعد چې د یوې ټولنې د نظم او د خلکو د حقونو د ساتنې لپاره وضع کیږي.',
    simpleExplanation:
      'هغه قواعد چې ټولنې ته لارښوونه کوي چې څه سم دي او څه ناسم.',
    example: 'د ترافیک قانون ټاکي چې موټر باید چېرته ودریږي.',
  },
  {
    id: 't019',
    letter: 'ق',
    term: 'قاضي',
    transliteration: 'Qazi',
    category: 'قضايي',
    definition:
      'هغه کس چې د محکمې له خوا د قضیو د اوریدلو او پرېکړې صلاحیت لري.',
    simpleExplanation:
      'د محکمې مشر چې د قضیو په اړه پرېکړه کوي.',
    example: 'قاضي د شواهدو له اوریدو وروسته حکم صادر کړ.',
  },
  {
    id: 't020',
    letter: 'ک',
    term: 'کفالت',
    transliteration: 'Kafalat',
    category: 'مدني حقوق',
    definition:
      'د یو کس ژمنه چې د بل کس د پور یا دندې په اړه به یې مسؤلیت په غاړه واخلي.',
    simpleExplanation: 'کله چې یو څوک د بل کس د پور ضمانت وکړي.',
    example:
      'احمد د محمد د پور لپاره کفالت وکړ چې که محمد ونه ورکړي، هغه به یې ورکړي.',
  },
  {
    id: 't021',
    letter: 'م',
    term: 'محکمه',
    transliteration: 'Mahkama',
    category: 'قضايي',
    definition:
      'هغه رسمي اداره چې د قوانینو د تطبیق او د قضیو د حل لپاره جوړه شوې وي.',
    simpleExplanation:
      'هغه ځای چې قاضیانو په کې قضیې حل کوي.',
    example:
      'د کابل ابتدایی محکمه د دې قضیې د اوریدلو مسؤلیت درلود.',
  },
  {
    id: 't022',
    letter: 'م',
    term: 'مدعي',
    transliteration: 'Mudai',
    category: 'قضايي',
    definition:
      'هغه کس چې د محکمې په وړاندې د بل کس پر ضد دعوا یا شکایت کوي.',
    simpleExplanation:
      'هغه کس چې شکایت کوي او د خپل حق غوښتنه کوي.',
    example:
      'مدعي محکمې ته وویل چې مدعی علیه د هغه پیسې نه ورکوي.',
  },
  {
    id: 't023',
    letter: 'م',
    term: 'مدعی علیه',
    transliteration: 'Mudai Alaih',
    category: 'قضايي',
    definition:
      'هغه کس چې د بل کس له خوا پر ضد دعوا یا شکایت کیږي.',
    simpleExplanation: 'هغه کس چې پر ضد شکایت شوی وي.',
    example:
      'مدعی علیه باید د محکمې په وړاندې د خپل ځان دفاع وکړي.',
  },
  {
    id: 't024',
    letter: 'م',
    term: 'موکل',
    transliteration: 'Mokel',
    category: 'قضايي',
    definition:
      'هغه کس چې د خپلې قضیې د پرمخ بیولو لپاره وکیل نیسي.',
    simpleExplanation:
      'هغه کس چې وکیل نیسي، د هغه موکل دی.',
    example:
      'زید خپل موکل ته وویل چې هغه باید د قضیې په اړه ریښتیا ووایي.',
  },
  {
    id: 't025',
    letter: 'و',
    term: 'وکالت',
    transliteration: 'Wikalat',
    category: 'قضايي',
    definition:
      'د یو کس له خوا د بل کس د قضیې یا چارو د پرمخ بیولو لپاره د وکیل ټاکل.',
    simpleExplanation:
      'د وکیل نیول او هغه ته د خپلې قضیې سپارل.',
    example:
      'د وکالت تړون لاسلیک شو ترڅو وکیل د موکل په استازیتوب محکمې ته لاړ شي.',
  },
  {
    id: 't026',
    letter: 'و',
    term: 'وصیت',
    transliteration: 'Wasiyat',
    category: 'مدني حقوق',
    definition:
      'د یو کس له خوا د خپل مرګ وروسته د خپل مال د ویش یا د یو کار د ترسره کولو په اړه لیکلی فرمان.',
    simpleExplanation:
      'د مرګ وروسته د مال د ویش لپاره هغه څه چې یو کس لیکي.',
    example:
      'پلار خپل وصیت کې ولیکل چې د هغه کور به زوی ته ورسیږي.',
  },
  {
    id: 't027',
    letter: 'ه',
    term: 'هدیه',
    transliteration: 'Hadiya',
    category: 'مدني حقوق',
    definition:
      'هغه شی چې یو کس په خپله خوښه بل ته د ډالۍ په توګه ورکوي، پرته له کوم بدل.',
    simpleExplanation:
      'د یو شي په وړیا توګه بل ته ورکول.',
    example:
      'احمد خپل ملګري ته یو کتاب د هدیې په توګه ورکړ.',
  },
];

// د حرف له مخې اصطلاحات
export function getTermsByLetter(letter) {
  return terminologyData.filter((t) => t.letter === letter);
}

// د لټون فعالیت
export function searchTerms(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return terminologyData.filter(
    (t) =>
      t.term.includes(q) ||
      t.definition.includes(q) ||
      t.simpleExplanation.includes(q) ||
      (t.transliteration && t.transliteration.toLowerCase().includes(q))
  );
}

// هغه حروف چې اصطلاحات لري
export function getAvailableLetters() {
  return new Set(terminologyData.map((t) => t.letter));
}