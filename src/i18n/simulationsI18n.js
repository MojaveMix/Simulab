// Localized metadata, summaries, guides and telemetry translations for all 15 simulations.

export const SIMULATION_TRANSLATIONS = {
  fr: {
    "vedic-square-3d": {
      title: "Carré Védique 3D — Géométrie Sacrée",
      shortTitle: "Carré Védique 3D",
      category: "Théorie des Nombres & Géométrie Sacrée",
      badge: "Moteur 3D Phare",
      summary:
        "Explorez l'arithmétique modulaire (mod 9), la table des racines numériques, les symétries miroirs de somme 9 et les topologies d'ondes harmoniques 3D.",
      theory:
        "Issu des mathématiques indiennes anciennes et de l'art géométrique islamique, le Carré Védique est une table de multiplication 9×9 où chaque produit est réduit à sa racine numérique en additionnant ses chiffres. Mettre en valeur un chiffre révèle de superbes symétries géométriques régies par l'arithmétique modulo 9.",
      difficulty: "Tous Niveaux",
    },
    "calculus-fourier-lab": {
      title: "Labo Calcul Différentiel & Harmoniques de Fourier",
      shortTitle: "Calcul & Fourier",
      category: "Calcul, Fonctions & Analyse",
      badge: "Analyse Interactive",
      summary:
        "Visualisez les dérivées, tangentes, courbures, sommes de Riemann vs quadratures exactes de Simpson et la synthèse harmonique de Fourier.",
      theory:
        "Le calcul différentiel et intégral relie les taux de variation locaux à l'accumulation globale via le théorème fondamental du calcul.",
      difficulty: "Intermédiaire",
    },
    "chaos-attractor-3d": {
      title: "Attracteur Étrange de Lorenz & Chaos 3D",
      shortTitle: "Attracteur Chaos 3D",
      category: "Systèmes Dynamiques & Topologie",
      badge: "Solveur RK4 3D",
      summary:
        "Simulez le chaos déterministe dans l'espace des phases 3D à l'aide de l'intégration Runge-Kutta d'ordre 4 (Lorenz, Rössler, Thomas).",
      theory:
        "Découvert par Edward Lorenz en 1963, l'attracteur démontre que des équations déterministes non linéaires peuvent être extrêmement sensibles aux conditions initiales (l'effet papillon).",
      difficulty: "Avancé",
    },
    "probability-monte-carlo": {
      title: "Labo Probabilités, Planche de Galton & Monte Carlo",
      shortTitle: "Probabilités & Monte Carlo",
      category: "Probabilités & Statistiques Stochastiques",
      badge: "Moteur Stochastique",
      summary:
        "Comparez les tirages de la planche de Galton aux lois binomiales et gaussiennes avec estimation en direct de π par Monte Carlo.",
      theory:
        "La planche de Galton démontre le théorème central limite : des choix binaires indépendants s'accumulent en une distribution gaussienne.",
      difficulty: "Débutant–Intermédiaire",
    },
    "projectile-ballistics": {
      title: "Balistique & Résistance Aérodynamique",
      shortTitle: "Projectiles & Traînée",
      category: "Mécanique Classique & Cinématique",
      badge: "Cinématique RK4",
      summary:
        "Comparez les trajectoires avec traînée aérodynamique réelle aux paraboles du vide sur différentes gravités planétaires avec suivi énergétique.",
      theory:
        "Dans le vide, la trajectoire est une parabole symétrique. Dans l'air, la traînée quadratique réduit la portée et dissipe l'énergie mécanique.",
      difficulty: "Tous Niveaux",
    },
    "double-pendulum-lab": {
      title: "Double Pendule Couplé & Chaos Lagrangien",
      shortTitle: "Double Pendule",
      category: "Mécanique Analytique & Oscillations",
      badge: "Lagrangien RK4",
      summary:
        "Observez le transfert d'énergie, les modes normaux non linéaires et les trajectoires chaotiques d'un double pendule couplé.",
      theory:
        "Le double pendule est le système paradigmatique à deux degrés de liberté dont les équations d'Euler-Lagrange deviennent chaotiques au-delà d'une énergie critique.",
      difficulty: "Intermédiaire–Avancé",
    },
    "orbital-gravity-3d": {
      title: "Labo Gravitation & Mécanique Orbitale 3D",
      shortTitle: "Mécanique Orbitale 3D",
      category: "Astrophysique & Gravitation",
      badge: "Moteur Céleste 3D",
      summary:
        "Simulez les orbites planétaires et de satellites 3D régies par la loi universelle de Newton, l'équation Vis-Viva et les lois de Kepler.",
      theory:
        "Sous une force centrale en 1/r², les trajectoires forment des ellipses avec l'étoile à un foyer, conservant le moment cinétique.",
      difficulty: "Tous Niveaux",
    },
    "wave-interference-3d": {
      title: "Superposition & Interférence d'Ondes 3D",
      shortTitle: "Interférence d'Ondes 3D",
      category: "Ondes, Acoustique & Phase Quantique",
      badge: "Surface d'Ondes 3D",
      summary:
        "Visualisez la superposition d'ondes à deux sources, l'amplification constructive, les lignes nodales d'annulation et l'intensité des franges.",
      theory:
        "L'expérience de Thomas Young prouve la nature ondulatoire : les crêtes s'additionnent (franges brillantes) ou s'annulent (lignes nodales).",
      difficulty: "Intermédiaire",
    },
    "optics-refraction-lens": {
      title: "Optique Géométrique : Loi de Snell-Descartes & Lentilles",
      shortTitle: "Optique & Réfraction",
      category: "Optique & Électromagnétisme",
      badge: "Tracé de Rayons",
      summary:
        "Tracez la réfraction laser, la réflexion totale interne (TIR), les angles critiques et les rayons principaux à travers des lentilles minces.",
      theory:
        "Le principe de moindre temps de Fermat dicte la réfraction de la lumière vers la normale en milieu plus dense.",
      difficulty: "Tous Niveaux",
    },
    "thermodynamics-gas-lab": {
      title: "Cinétique des Gaz & Distribution de Maxwell-Boltzmann",
      shortTitle: "Thermodynamique Cinétique",
      category: "Thermodynamique & Mécanique Statistique",
      badge: "Chambre Cinétique",
      summary:
        "Simulez les collisions élastiques dans un piston à volume variable et analysez la pression (PV=nRT), la vitesse RMS et les courbes de Maxwell-Boltzmann.",
      theory:
        "La théorie cinétique relie les chocs microscopiques des molécules à la pression et température macroscopiques.",
      difficulty: "Intermédiaire",
    },
    "function-grapher": {
      title: "Traceur de Fonctions — Visualisez Chaque Équation",
      shortTitle: "Grapheur de Fonctions",
      category: "Algèbre, Fonctions & Graphes",
      badge: "Graphes Animés",
      summary:
        "Choisissez une famille de fonctions (droite, parabole, sinus, exponentielle, log…) et ajustez ses paramètres pour voir la courbe, les racines et la tangente.",
      theory:
        "Chaque fonction associe un x à un y. Modifier les coefficients étire, déplace ou inverse la courbe, et la tangente illustre la dérivée.",
      difficulty: "Tous Niveaux",
    },
    "unit-circle-trig": {
      title: "Cercle Trigonométrique & Fonctions Sinus/Cosinus",
      shortTitle: "Cercle Trigonométrique",
      category: "Trigonométrie & Géométrie",
      badge: "Cercle Animé",
      summary:
        "Faites tourner un point sur le cercle de rayon 1 et regardez sinus et cosinus se dérouler en ondes, prouvant sin² + cos² = 1.",
      theory:
        "Le cosinus est la projection horizontale et le sinus la projection verticale. Le théorème de Pythagore garantit sin²θ + cos²θ = 1 partout.",
      difficulty: "Débutant",
    },
    "spring-oscillator": {
      title: "Système Masse-Ressort & Mouvement Harmonique",
      shortTitle: "Ressort & Oscillation",
      category: "Oscillations & Ondes",
      badge: "Oscillateur Vivant",
      summary:
        "Tirez une masse attachée à un ressort et observez le graphe de position, la période et l'échange perpétuel entre énergie cinétique et potentielle.",
      theory:
        "La force de rappel de Hooke F = -kx crée un échange continu entre énergie cinétique et potentielle élastique.",
      difficulty: "Débutant–Intermédiaire",
    },
    "circuit-ohm-lab": {
      title: "Circuits Électriques & Loi d'Ohm",
      shortTitle: "Circuits & Loi d'Ohm",
      category: "Électricité & Magnétisme",
      badge: "Courant Fluide",
      summary:
        "Construisez un circuit en série ou en parallèle avec deux résistances et observez la vitesse du flux d'électrons en direct.",
      theory:
        "Une batterie applique une tension qui propulse les charges. En série, le courant est unique ; en parallèle, les courants se divisent.",
      difficulty: "Débutant",
    },
    "incline-forces-lab": {
      title: "Lois de Newton, Forces & Plan Incliné",
      shortTitle: "Forces & Plan Incliné",
      category: "Mécanique Classique & Forces",
      badge: "Bilan des Forces",
      summary:
        "Inclinez un plan, ajustez le frottement et appliquez une force. Observez chaque vecteur et comment la 2e loi de Newton gouverne le mouvement.",
      theory:
        "Sur une pente, la gravité se décompose en force normale et force de glissement. Le frottement s'oppose au mouvement selon f ≤ μN.",
      difficulty: "Débutant–Intermédiaire",
    },
  },

  ar: {
    "vedic-square-3d": {
      title: "المربع الفيدي ثلاثي الأبعاد — الهندسة التناظرية",
      shortTitle: "المربع الفيدي 3D",
      category: "نظرية الأعداد والهندسة المتناظرة",
      badge: "محرك 3D الرائد",
      summary:
        "استكشف الحساب المعياري (mod 9)، وجدول الجذور الرقمية، وتناظرات انعكاس مجموع التسعة، وتطبيقات طوبولوجيا الموجات التوافقية ثلاثية الأبعاد.",
      theory:
        "يعود أصل المربع الفيدي إلى الرياضيات الهندية القديمة والفنون الهندسية الإسلامية؛ وهو جدول ضرب 9×9 يتم فيه اختزال كل ناتج إلى جذره الرقمي عبر جمع خاناته تكرارياً. إبراز رقم معين يكشف عن تناظرات هندسية فريدة تحكمها الحسابات بترديد 9.",
      difficulty: "جميع المستويات",
    },
    "calculus-fourier-lab": {
      title: "مختبر التفاضل والتكامل وتوافقيات فورييه",
      shortTitle: "التفاضل وفورييه",
      category: "التفاضل، الدوال والتحليل الرياضي",
      badge: "تحليل تفاعلي",
      summary:
        "تصور المشتقات، وخطوط المماس، ودرجة الانحناء، وتكامل مجموع ريمان مقابل طرق سيمبسون الدقيقة، مع تركيب موجات فورييه التوافقية.",
      theory:
        "يربط حساب التفاضل والتكامل بين معدلات التغير اللحظية والتراكم الإجمالي للمساحات عبر المبرهنة الأساسية في التفاضل والتكامل.",
      difficulty: "متوسط",
    },
    "chaos-attractor-3d": {
      title: "جاذب لورينز الغريب والفوضى ثلاثية الأبعاد",
      shortTitle: "جاذب الفوضى 3D",
      category: "الأنظمة الديناميكية والطوبولوجيا",
      badge: "حلول RK4 ثلاثية الأبعاد",
      summary:
        "حاكِ الفوضى الحتمية في فضاء الطور ثلاثي الأبعاد باستخدام تكامل رونج-كوتا من الرتبة الرابعة عبر جواذب لورينز وروسلر وتوماس.",
      theory:
        "اكتشفه إدوارد لورينز عام 1963، ويوضح أن المعادلات الحتمية اللاخطية يمكن أن تُظهر حساسية فائقة للشروط الابتدائية (أثر الفراشة). المسارات لا تتقاطع ولا تتكرر أبداً.",
      difficulty: "متقدم",
    },
    "probability-monte-carlo": {
      title: "مختبر الاحتمالات، لوحة غالتون ومونت كارلو",
      shortTitle: "الاحتمالات ومونت كارلو",
      category: "الاحتمالات والإحصاء العشوائي",
      badge: "محرك احتمالي",
      summary:
        "قارن تجارب لوحة غالتون الواقعية بالتوزيع ذي الحدين والتوزيع الطبيعي مع تقدير قيمة π بطريقة مونت كارلو الحية.",
      theory:
        "تُثبت لوحة السير فرانسيس غالتون مبرهنة النهاية المركزية: الخيارات الثنائية المستقلة تتراكم لتتحول إلى منحنى الجرس الطبيعي المتناظر.",
      difficulty: "مبتدئ–متوسط",
    },
    "projectile-ballistics": {
      title: "حركة المقذوفات ومقاومة الهواء الأيروديناميكية",
      shortTitle: "المقذوفات ومقاومة الهواء",
      category: "الميكانيكا الكلاسيكية وعلم الحركة",
      badge: "حركيات RK4",
      summary:
        "قارن مسارات الحركة الحقيقية مع مقاومة الهواء بالمسار المكافئ المثالي في الفراغ عبر جاذبيات كوكبية مختلفة مع تتبع الطاقة الميكانيكية.",
      theory:
        "في الفراغ تتبع المقذوفات مساراً قطعياً متناظراً بزاوية قصوى 45°. أما في الغلاف الجوي الحقيقي، فإن مقاومة الهواء تبدد الطاقة وتخفض المدى والارتفاع.",
      difficulty: "جميع المستويات",
    },
    "double-pendulum-lab": {
      title: "البندول المزدوج المقترن والفوضى اللاغرانجية",
      shortTitle: "البندول المزدوج",
      category: "الميكانيكا التحليلية والاهتزازات",
      badge: "لاغرانجي RK4",
      summary:
        "راقب انتقال الطاقة، والأنماط الطبيعية اللاخطية، والمسارات الفوضوية في فضاء الطور لبندولين مقترنين يتم حلهما بمعادلات أويلر-لاغرانج.",
      theory:
        "البندول المزدوج هو النموذج الكلاسيكي لنظام ذي درجتي حرية تصبح حركته فوضوية وحساسة تماماً بمجرد تجاوز طاقة حركية معينة.",
      difficulty: "متوسط–متقدم",
    },
    "orbital-gravity-3d": {
      title: "مختبر الجاذبية الكونية والميكانيكا المدارية 3D",
      shortTitle: "الميكانيكا المدارية 3D",
      category: "الفيزياء الفلكية والجاذبية",
      badge: "محرك كوني ثلاثي الأبعاد",
      summary:
        "حاكِ مدارات الكواكب والأقمار الاصطناعية ثلاثية الأبعاد وفق قانون الجاذبية العام لنيوتن، ومعادلة فيس-فيفا، وقوانين كبلر الفلكية.",
      theory:
        "تحت تأثير قوة الجاذبية المركزية التي تتناسب عكسياً مع مربع المسافة، تدور الأجسام في مدارات بيضاوية مع انحفاظ كامل للزخم الزاوي.",
      difficulty: "جميع المستويات",
    },
    "wave-interference-3d": {
      title: "تراكب وتداخل الموجات ثلاثي الأبعاد",
      shortTitle: "تداخل الموجات 3D",
      category: "الموجات، الصوتيات والطور الكمي",
      badge: "سطح موجي 3D",
      summary:
        "تصور تراكب موجات مصدرين نقطيين، والتعزيز البنّاء، وخطوط العقد الهدّامة، مع قياس شدة أهداب التداخل على كاشف المسافة.",
      theory:
        "أثبتت تجربة توماس يونغ الطبيعة الموجية للضوء؛ فعندما تلتقي قمة مع قمة يحدث تداخل بنّاء معزز، وعندما تلتقي قمة بقاع يحدث إلغاء هدّام.",
      difficulty: "متوسط",
    },
    "optics-refraction-lens": {
      title: "البصريات الهندسية: قانون سنيل والعدسات الرقيقة",
      shortTitle: "البصريات والانكسار",
      category: "البصريات والكهرومغناطيسية",
      badge: "تتبع الأشعة",
      summary:
        "تتبع مسار أشعة الليزر في الانكسار، والزاوية الحرجة للانعكاس الكلي الداخلي (TIR)، ومسار الأشعة الرئيسية عبر العدسات المجمعة والمفرقة.",
      theory:
        "ينص مبدأ فيرما على أن الضوء يسلك المسار الذي يستغرق أقل زمن ممكن، مما يؤدي إلى انحناء الشعاع نحو العمود المقام في الأوساط الأكثر كثافة.",
      difficulty: "جميع المستويات",
    },
    "thermodynamics-gas-lab": {
      title: "النظرية الحركية للغازات وتوزيع ماكسويل-بولتزمان",
      shortTitle: "الديناميكا الحرارية الحركية",
      category: "الديناميكا الحرارية والميكانيكا الإحصائية",
      badge: "غرفة الجزيئات",
      summary:
        "حاكِ التصادمات المرنة للجزيئات في مكبس متغير الحجم وحلل الضغط (PV=nRT)، والسرعة الجذرية المتوسطة، ومنحنيات توزيع السرعات.",
      theory:
        "تربط النظرية الحركية بين الحركة الميكانيكية المجهرية للجزيئات والضغط ودرجة الحرارة العيانية؛ حيث ينشأ الضغط من تصادم الجزيئات بجدران الوعاء.",
      difficulty: "متوسط",
    },
    "function-grapher": {
      title: "راسم الدوال الرياضية — شاهد كل معادلة تنبض بالحياة",
      shortTitle: "راسم الدوال",
      category: "الجبر، الدوال والرسوم البيانية",
      badge: "رسوم متحركة",
      summary:
        "اختر عائلة دوال (خطية، تربيعية، أسية، لوغاريتمية، جيبية…) وتلاعب بمعاملاتها لتشاهد المنحنى ونقاط التقاطع والمماس يتحرك في الحال.",
      theory:
        "تحول الدالة كل مدخل x إلى مخرج y. تغيير المعاملات يمدد المنحنى أو يعكسه أو يزيحه، ويوضح خط المماس مفهوم المشتقة اللحظية في التفاضل.",
      difficulty: "جميع المستويات",
    },
    "unit-circle-trig": {
      title: "دائرة الوحدة وحساب المثلثات",
      shortTitle: "دائرة الوحدة",
      category: "حساب المثلثات والهندسة",
      badge: "دائرة متحركة",
      summary:
        "أدر نقطة حول دائرة نصف قطرها 1 وشاهد دالتي الجيب وجيب التمام تنبسطان إلى موجات حية، مع إثبات أن sin² + cos² = 1 دوماً.",
      theory:
        "جيب التمام هو الإحداثي الأفقي والجيب هو الإحداثي الرأسي للنقطة على دائرة الوحدة. تضمن مبرهنة فيثاغورس تطابق sin²θ + cos²θ = 1 عند أي زاوية.",
      difficulty: "مبتدئ",
    },
    "spring-oscillator": {
      title: "منظومة الكتلة والنابض والحركة التوافقية البسيطة",
      shortTitle: "النابض والاهتزاز",
      category: "الاهتزازات والموجات",
      badge: "مذبذب حي",
      summary:
        "اسحب كتلة متصلة بنابض وشاهد منحنى الموضع مع الزمن، والزمن الدوري، والتبادل المستمر بين طاقة الحركة وطاقة الوضع المرونية.",
      theory:
        "ينص قانون هوك F = -kx على أن قوة الإرجاع تتناسب مع الاستطالة، مما يولد حركة توافقية تتبادل فيها الطاقة باستمرار بين الحركة والمرونة.",
      difficulty: "مبتدئ–متوسط",
    },
    "circuit-ohm-lab": {
      title: "الدوائر الكهربائية وقانون أوم",
      shortTitle: "الدوائر وقانون أوم",
      category: "الكهرباء والمغناطيسية",
      badge: "تيار متحرك",
      summary:
        "صمم دائرة كهربائية على التوالي أو التوازي مع مقاومتين، وشاهد الإلكترونات تتدفق وتتسارع أو تتباطأ فور تعديل الجهد والمقاومة.",
      theory:
        "تولد البطارية فرق جهد يدفع الشحنات الكهربائية. في التوصيل على التوالي يسري نفس التيار في كل جزء، بينما يتفرع التيار في التوصيل على التوازي.",
      difficulty: "مبتدئ",
    },
    "incline-forces-lab": {
      title: "قوانين نيوتن للحركة، القوى والمستوى المائل",
      shortTitle: "القوى والمستوى المائل",
      category: "الميكانيكا الكلاسيكية وديناميكا القوى",
      badge: "مخطط الجسم الحر",
      summary:
        "أمِل السطح، وغيّر معامل الاحتكاك، وادفع الجسم. شاهد كل سهم قوة وكيف يحسم قانون نيوتن الثاني تسارع الحركة وحالتها.",
      theory:
        "على السطح المائل تتحلل الجاذبية إلى مركبة ضغط عمودية ومركبة انزلاق موازية للسطح، ويقاوم الاحتكاك الانزلاق حتى تتفوق القوة المحصلة.",
      difficulty: "مبتدئ–متوسط",
    },
  },
};

export const TELEMETRY_TRANSLATIONS = {
  fr: {
    "Height of curve at your point": "Hauteur de la courbe au point x₀",
    "Slope at your point": "Pente au point x₀",
    "How sharply it bends": "Courbure de la courbe",
    "Area (rectangles estimate)": "Aire (estimation par rectangles)",
    "Area (precise value)": "Aire (valeur exacte)",
    "Estimate error": "Erreur d'estimation",
    "Chaotic system": "Système chaotique",
    "Calm spots (left/right)": "Points d'équilibre (gauche/droite)",
    "Calm spot height": "Hauteur du point d'équilibre",
    "How fast paths squeeze together": "Taux de contraction de phase",
    "Top speed of the point": "Vitesse maximale du point",
    "Path length computed": "Nombre de points calculés",
    "Expected average slot": "Moyenne théorique",
    "Measured average slot": "Moyenne empirique",
    "Expected spread": "Écart-type théorique",
    "Measured spread": "Écart-type empirique",
    "Our estimate of π": "Estimation de π",
    "How far off from π": "Écart par rapport à π",
    "Distance flown (with air)": "Distance parcourue (avec air)",
    "Distance flown (no air)": "Distance parcourue (sans air)",
    "Highest point": "Point culminant (hauteur max)",
    "Time in the air": "Temps de vol",
    "Speed on landing": "Vitesse à l'impact",
    "Energy lost to air": "Énergie dissipée dans l'air",
    "Upper Rod L₁ / m₁": "Tige supérieure L₁ / m₁",
    "Lower Rod L₂ / m₂": "Tige inférieure L₂ / m₂",
    "Time of one gentle swing": "Période aux petites oscillations",
    "Release Angles": "Angles de lâcher",
    "Gravity Field": "Champ de pesanteur",
    "Regime": "Régime dynamique",
    "Length of one year": "Période orbitale (1 an)",
    "Closest to the star": "Périastre (au plus près)",
    "Farthest from the star": "Apoastre (au plus loin)",
    "Fastest speed (closest)": "Vitesse max (périastre)",
    "Slowest speed (farthest)": "Vitesse min (apoastre)",
    "Orbit energy": "Énergie orbitale spécifique",
    "How tightly packed waves are": "Nombre d'onde k",
    "Oscillation rate": "Pulsation angulaire ω",
    "Wave travel speed": "Vitesse de propagation",
    "Number of big-wave bands": "Ordres d'interférence constructive",
    "Calm lines": "Lignes nodales d'annulation",
    "Source gap ÷ wavelength": "Rapport séparation / longueur d'onde",
    "Bent angle inside": "Angle de réfraction θ₂",
    "Angle where light gets trapped": "Angle critique (TIR)",
    "Glare-free angle": "Angle de Brewster",
    "Where the image forms": "Position de l'image dᵢ",
    "Image size vs object": "Grandissement M",
    "Light speed in material": "Vitesse de la lumière dans le milieu",
    "Pressure": "Pression",
    "Pressure (atm)": "Pression (atm)",
    "Typical molecule speed": "Vitesse quadratique moyenne v_rms",
    "Average molecule speed": "Vitesse moyenne des molécules",
    "Heat energy stored": "Énergie interne U",
    "Disorder change": "Variation d'entropie ΔS",
    "Height at your point": "Hauteur au point x₀",
    "Crosses the y-axis at": "Intersection axe y (ordonnée)",
    "Crosses the x-axis at": "Racines (intersection axe x)",
    "Going…": "Tendance",
    "Roots found": "Racines trouvées",
    "Discriminant (b²−4ac)": "Discriminant (b²−4ac)",
    "Angle (radians)": "Angle (radians)",
    "sin θ (height)": "sin θ (hauteur)",
    "cos θ (width)": "cos θ (largeur)",
    "tan θ (sin ÷ cos)": "tan θ (sin ÷ cos)",
    "sin² + cos²": "sin² + cos²",
    "Quadrant": "Quadrant",
    "Time for one swing": "Période d'oscillation T",
    "Swings per second": "Fréquence f",
    "Natural speed ω₀": "Pulsation propre ω₀",
    "Top speed": "Vitesse maximale",
    "Starting energy": "Énergie initiale totale",
    "Friction type": "Type d'amortissement",
    "Total resistance": "Résistance totale équivalente",
    "Total current": "Courant total I",
    "Current through R₁": "Courant dans R₁",
    "Current through R₂": "Courant dans R₂",
    "Voltage across R₁ / R₂": "Tension R₁ / R₂",
    "Total power": "Puissance totale P",
    "Ramp pushes back (normal)": "Réaction normale du plan N",
    "Pull down the slope": "Composante parallèle du poids",
    "What happens": "État du mouvement",
  },
  ar: {
    "Height of curve at your point": "ارتفاع المنحنى عند النقطة المحددة",
    "Slope at your point": "ميل المنحنى عند النقطة المحددة",
    "How sharply it bends": "درجة انحناء المنحنى",
    "Area (rectangles estimate)": "المساحة (تقدير المستطيلات)",
    "Area (precise value)": "المساحة (القيمة الدقيقة)",
    "Estimate error": "نسبة خطأ التقدير",
    "Chaotic system": "النظام الفوضوي",
    "Calm spots (left/right)": "نقاط الاتزان (يسار/يمين)",
    "Calm spot height": "ارتفاع نقطة الاتزان",
    "How fast paths squeeze together": "معدل انكماش فضاء الطور",
    "Top speed of the point": "أقصى سرعة للنقطة",
    "Path length computed": "عدد النقاط المحسوبة",
    "Expected average slot": "المتوسط النظري المتوقع",
    "Measured average slot": "المتوسط التجريبي المقاس",
    "Expected spread": "الانحراف المعياري النظري",
    "Measured spread": "الانحراف المعياري التجريبي",
    "Our estimate of π": "تقديرنا لقيمة π",
    "How far off from π": "مقدار الانحراف عن قيمة π",
    "Distance flown (with air)": "المدى المقطوع (مع مقاومة الهواء)",
    "Distance flown (no air)": "المدى المقطوع (في الفراغ)",
    "Highest point": "أقصى ارتفاع وصل إليه المقذوف",
    "Time in the air": "زمن التحليق في الهواء",
    "Speed on landing": "السرعة لحظة الاصطدام",
    "Energy lost to air": "الطاقة المبددة في مقاومة الهواء",
    "Upper Rod L₁ / m₁": "القضيب العلوي L₁ / m₁",
    "Lower Rod L₂ / m₂": "القضيب السفلي L₂ / m₂",
    "Time of one gentle swing": "زمن التأرجح الخفيف",
    "Release Angles": "زوايا الإفلات الابتدائية",
    "Gravity Field": "مجال الجاذبية",
    "Regime": "نمط الحركة",
    "Length of one year": "طول السنة المدارية",
    "Closest to the star": "الحضيض المداري (الأقرب للنجم)",
    "Farthest from the star": "الأوج المداري (الأبعد عن النجم)",
    "Fastest speed (closest)": "السرعة القصوى عند الحضيض",
    "Slowest speed (farthest)": "أدنى سرعة عند الأوج",
    "Orbit energy": "طاقة المدار النوعية",
    "How tightly packed waves are": "العدد الموجي k",
    "Oscillation rate": "التردد الزاوي ω",
    "Wave travel speed": "سرعة انتشار الموجة",
    "Number of big-wave bands": "رتب التداخل البنّاء",
    "Calm lines": "خطوط العقد الهدّامة",
    "Source gap ÷ wavelength": "المسافة بين المصدرين ÷ الطول الموجي",
    "Bent angle inside": "زاوية الانكسار الداخلية",
    "Angle where light gets trapped": "الزاوية الحرجة (الانعكاس الكلي)",
    "Glare-free angle": "زاوية بروستر للاستقطاب",
    "Where the image forms": "موضع تكوّن الصورة",
    "Image size vs object": "معامل التكبير",
    "Light speed in material": "سرعة الضوء داخل الوسط",
    "Pressure": "الضغط",
    "Pressure (atm)": "الضغط الجوي (atm)",
    "Typical molecule speed": "السرعة الجذرية المتوسطة v_rms",
    "Average molecule speed": "متوسط سرعة الجزيئات",
    "Heat energy stored": "الطاقة الداخلية المخزونة",
    "Disorder change": "التغير في الإنتروبيا (العشوائية)",
    "Height at your point": "الارتفاع عند النقطة المحددة",
    "Crosses the y-axis at": "نقطة التقاطع مع محور الصادات",
    "Crosses the x-axis at": "الجذور (التقاطع مع محور السينات)",
    "Going…": "الاتجاه",
    "Roots found": "عدد الجذور الموجودة",
    "Discriminant (b²−4ac)": "المميّز (b²−4ac)",
    "Angle (radians)": "الزاوية (بالراديان)",
    "sin θ (height)": "جيب الزاوية sin θ (الارتفاع)",
    "cos θ (width)": "جيب تمام الزاوية cos θ (العرض)",
    "tan θ (sin ÷ cos)": "ظل الزاوية tan θ",
    "sin² + cos²": "متطابقة sin² + cos²",
    "Quadrant": "الربع الدائري",
    "Time for one swing": "الزمن الدوري للتأرجح",
    "Swings per second": "التردد (اهتزازة/ثانية)",
    "Natural speed ω₀": "التردد الطبيعي ω₀",
    "Top speed": "السرعة القصوى",
    "Starting energy": "الطاقة الابتدائية",
    "Friction type": "نوع التخميد والخماد",
    "Total resistance": "المقاومة المكافئة الكلية",
    "Total current": "شدة التيار الكلية",
    "Current through R₁": "التيار المار في R₁",
    "Current through R₂": "التيار المار في R₂",
    "Voltage across R₁ / R₂": "فرق الجهد عبر R₁ / R₂",
    "Total power": "القدرة الكهربائية الإجمالية",
    "Ramp pushes back (normal)": "رد الفعل العمودي للسطح",
    "Pull down the slope": "مركبة الوزن الموازية للمنحدر",
    "What happens": "حالة الحركة",
  },
};

/**
 * Returns localized simulation title, category, summary, theory and difficulty
 */
export function getLocalizedSimulation(sim, lang = "en") {
  if (lang === "en" || !sim) return sim;
  const trans = SIMULATION_TRANSLATIONS[lang]?.[sim.id];
  if (!trans) return sim;

  return {
    ...sim,
    title: trans.title || sim.title,
    shortTitle: trans.shortTitle || sim.shortTitle,
    category: trans.category || sim.category,
    summary: trans.summary || sim.summary,
    theory: trans.theory || sim.theory,
    difficulty: trans.difficulty || sim.difficulty,
  };
}

/**
 * Returns localized telemetry label if translation exists
 */
export function getLocalizedTelemetryLabel(label, lang = "en") {
  if (lang === "en") return label;
  return TELEMETRY_TRANSLATIONS[lang]?.[label] || label;
}

export const PRESET_TRANSLATIONS = {
  fr: {
    "Monad ↔ Octad Cycle (1↔8)": "Cycle Monade ↔ Octade (1↔8)",
    "Dyad ↔ Heptad Star (2↔7)": "Étoile Dyade ↔ Heptade (2↔7)",
    "Tesla Flux Triad (3↔6)": "Triade de Flux de Tesla (3↔6)",
    "Ennead Horizon (9)": "Horizon de l'Ennéade (9)",
    "Damped Harmonic Wave": "Onde Harmonique Amortie",
    "Fourier Square Synthesis": "Synthèse Carrée de Fourier",
    "Gaussian Wave Packet": "Paquet d'Ondes Gaussien",
    "Cubic Polynomial Extrema": "Extrémums d'un Polynôme Cubique",
    "Lorenz Butterfly Chaos": "Papillon Chaotique de Lorenz",
    "Rössler Folded Band": "Ruban Replié de Rössler",
    "Thomas Symmetric Labyrinth": "Labyrinthe Symétrique de Thomas",
    "Hyperchaotic High-Prandtl": "Régime Hyperchaotique",
    "Galton 12-Tier Quincunx": "Planche de Galton à 12 Niveaux",
    "Binomial n=20 Convergence": "Convergence Binomiale n=20",
    "Monte Carlo π (10k Drops)": "Monte Carlo π (10k Tirages)",
    "High-Altitude Vacuum Arc": "Tir en Cloche sous Vide",
    "High-Drag Cannonball": "Boulet avec Forte Traînée",
    "Lunar Artillery Trajectory": "Trajectoire d'Artillerie Lunaire",
    "Martian Low-Atmosphere Launch": "Tir dans la Faible Atmosphère Martienne",
    "Inner Terrestrial Orbit (Earth-like)": "Orbite Terrestre Intérieure",
    "Highly Eccentric Comet Orbit": "Orbite Cométaire Très Excentrique",
    "Circular Keplerian Baseline": "Orbite Circulaire Képlérienne",
    "Sub-Escape Parabolic Approach": "Approche Parabolique sous-vitesse de libération",
    "Young's Double-Slit Optical Analog": "Analogue Optique des Fentes d'Young",
    "High-Frequency Acoustic Grid": "Grille Acoustique Haute Fréquence",
    "Long-Wavelength Coherent Ripples": "Ondulations Cohérentes Longue Longueur d'Onde",
    "Single Source Pure Circular Wave": "Onde Circulaire Pure Source Unique",
    "Snell Crown Glass Refraction": "Réfraction Verre Crown (Snell)",
    "Total Internal Reflection (TIR Diamond)": "Réflexion Totale Interne (Diamant)",
    "Biconvex Converging Magnifier": "Loupe Convergente Biconvexe",
    "Brewster Polarization Window": "Fenêtre de Polarisation de Brewster",
    "Quasi-Static Isothermal Expansion": "Détente Isotherme Quasi-Statique",
    "Isochoric Pressurization": "Pressurisation Isochore",
    "Cryogenic High-Density State": "État Cryogénique Haute Densité",
    "High-Temperature Rarefied Gas": "Gaz Raréfié Haute Température",
    "Standard Parabola": "Parabole Standard",
    "Cubic Inflexion": "Inflexion Cubique",
    "Harmonic Sine": "Sinusoïde Harmonique",
    "Asymptotic Hyperbola": "Hyperbole Asymptotique",
    "First Quadrant (45°)": "Premier quadrant (45°)",
    "Equilateral (60°)": "Équilatéral (60°)",
    "Orthogonal (90°)": "Orthogonal (90°)",
    "Golden Triangle (30°)": "Angle 30°",
    "Simple Undamped SHM": "Mouvement Harmonique Non Amorti",
    "Critically Damped Shock Absorber": "Amortisseur Critique",
    "Underdamped Oscillation": "Oscillation Sous-Amortie",
    "Overdamped Slow Return": "Retour Lent Sur-Amorti",
    "Simple Flashlight Loop": "Circuit Lampe Torche Simple",
    "Series Voltage Divider": "Diviseur de Tension en Série",
    "Parallel Current Branching": "Dérivation de Courant en Parallèle",
    "High-Resistance Low-Current": "Forte Résistance & Faible Courant",
    "Smooth Ice Slide": "Glissade sur Glace Sans Frottement",
    "Steep Incline with Kinetic Friction": "Pente Raide avec Frottement Cinétique",
    "Critical Static Angle (Threshold of Motion)": "Angle Critique de Glissement",
    "Gentle Slope (Static Equilibrium)": "Pente Douce (Équilibre Statique)",
  },
  ar: {
    "Monad ↔ Octad Cycle (1↔8)": "دورة الأحادية والثمانية (1↔8)",
    "Dyad ↔ Heptad Star (2↔7)": "نجمة الثنائية والسباعية (2↔7)",
    "Tesla Flux Triad (3↔6)": "ثالوث تدفق تسلا (3↔6)",
    "Ennead Horizon (9)": "أفق التساعية (9)",
    "Damped Harmonic Wave": "موجة توافقية متخامدة",
    "Fourier Square Synthesis": "تركيب فورييه الموجي المربع",
    "Gaussian Wave Packet": "حزمة موجية غاوسية",
    "Cubic Polynomial Extrema": "قيم قصوى لكثير حدود تكعيبي",
    "Lorenz Butterfly Chaos": "فوضى لورنز (فراشة لورنز)",
    "Rössler Folded Band": "شريط روسلر المنثني",
    "Thomas Symmetric Labyrinth": "متاهة توماس المتناظرة",
    "Hyperchaotic High-Prandtl": "نظام فائق الفوضى براندتل عالي",
    "Galton 12-Tier Quincunx": "لوحة غالتون ذات 12 صفاً",
    "Binomial n=20 Convergence": "تقارب ذو الحدين n=20",
    "Monte Carlo π (10k Drops)": "مونت كارلو لتقدير π (10 آلاف عينة)",
    "High-Altitude Vacuum Arc": "قوس باليستي عالي الارتفاع في الفراغ",
    "High-Drag Cannonball": "قذيفة مدفعية مع مقاومة هواء عالية",
    "Lunar Artillery Trajectory": "مسار مدفعية على سطح القمر",
    "Martian Low-Atmosphere Launch": "إطلاق في الغلاف الجوي المريخي الرقيق",
    "Inner Terrestrial Orbit (Earth-like)": "مدار أرضي داخلي شبيه بالأرض",
    "Highly Eccentric Comet Orbit": "مدار مذنّب عالي الإهليلجية",
    "Circular Keplerian Baseline": "مدار كبلري دائري متزن",
    "Sub-Escape Parabolic Approach": "اقتراب مكافئ دون سرعة الإفلات",
    "Young's Double-Slit Optical Analog": "نظير تجربة شقي يونغ الضوئية",
    "High-Frequency Acoustic Grid": "شبكة صوتية عالية التردد",
    "Long-Wavelength Coherent Ripples": "تموجات متماسكة طويلة الموجة",
    "Single Source Pure Circular Wave": "موجة دائرية نقية من مصدر أحادي",
    "Snell Crown Glass Refraction": "انكسار سنيل في زجاج التاج",
    "Total Internal Reflection (TIR Diamond)": "الانعكاس الكلي الداخلي (الماس)",
    "Biconvex Converging Magnifier": "عدسة محدبة مجمعة مكبرة",
    "Brewster Polarization Window": "نافذة استقطاب بروستر",
    "Quasi-Static Isothermal Expansion": "تمدد أيزوثيرمي شبه مستقر",
    "Isochoric Pressurization": "رفع ضغط أيزوكوري (ثابت الحجم)",
    "Cryogenic High-Density State": "حالة مبردة عالية الكثافة",
    "High-Temperature Rarefied Gas": "غاز مخلخل عالي الحرارة",
    "Standard Parabola": "قطع مكافئ قياسي",
    "Cubic Inflexion": "نقطة انقلاب تكعيبية",
    "Harmonic Sine": "دالة جيبية توافقية",
    "Asymptotic Hyperbola": "قطع زائد تقاربي",
    "First Quadrant (45°)": "الربع الأول (45°)",
    "Equilateral (60°)": "مثلث متساوي الأضلاع (60°)",
    "Orthogonal (90°)": "تعامد قائم (90°)",
    "Golden Triangle (30°)": "الزاوية 30°",
    "Simple Undamped SHM": "حركة توافقية بسيطة غير متخامدة",
    "Critically Damped Shock Absorber": "تخميد حرج لامتصاص الصدمات",
    "Underdamped Oscillation": "تذبذب ضعيف التخميد",
    "Overdamped Slow Return": "عودة بطيئة شديدة التخميد",
    "Simple Flashlight Loop": "دائرة مصباح يدوي بسيطة",
    "Series Voltage Divider": "مجزئ الجهد على التوالي",
    "Parallel Current Branching": "تفرع التيار على التوازي",
    "High-Resistance Low-Current": "مقاومة عالية وتيار منخفض",
    "Smooth Ice Slide": "انزلاق على جليد أملس",
    "Steep Incline with Kinetic Friction": "منحدر حاد مع احتكاك حركي",
    "Critical Static Angle (Threshold of Motion)": "الزاوية الحرجة لبدء الانزلاق",
    "Gentle Slope (Static Equilibrium)": "منحدر هادئ (اتزان سكوني)",
  },
};

export const PARAM_CONTROL_TRANSLATIONS = {
  fr: {
    "Wave Amplitude (A)": "Amplitude de l'onde (A)",
    "Angular Frequency (ω)": "Fréquence angulaire (ω)",
    "Decay / Envelope (γ)": "Amortissement / Enveloppe (γ)",
    "Tangent Point (x₀)": "Point de tangence (x₀)",
    "Integral Lower Bound (a)": "Borne inférieure (a)",
    "Integral Upper Bound (b)": "Borne supérieure (b)",
    "Riemann Partitions (N)": "Subdivisions de Riemann (N)",
    "Prandtl Number (σ)": "Nombre de Prandtl (σ)",
    "Rayleigh Number (ρ)": "Nombre de Rayleigh (ρ)",
    "Geometric Factor (β)": "Facteur géométrique (β)",
    "Time Step (dt)": "Pas temporel (dt)",
    "Tails / Dropped (N)": "Nombre de billes (N)",
    "Binomial Trials (n)": "Épreuves binomiales (n)",
    "Success Probability (p)": "Probabilité de succès (p)",
    "Launch Angle (θ)": "Angle de tir (θ)",
    "Initial Velocity (v₀)": "Vitesse initiale (v₀)",
    "Launch Altitude (y₀)": "Altitude de départ (y₀)",
    "Gravity Field (g)": "Champ de pesanteur (g)",
    "Drag Coefficient (Cd)": "Coefficient de traînée (Cd)",
    "Air Density (ρ)": "Masse volumique de l'air (ρ)",
    "Projectile Mass (m)": "Masse du projectile (m)",
    "Projectile Radius (r)": "Rayon du projectile (r)",
    "Upper Rod Length (L₁)": "Longueur tige 1 (L₁)",
    "Lower Rod Length (L₂)": "Longueur tige 2 (L₂)",
    "Upper Bob Mass (m₁)": "Masse bob 1 (m₁)",
    "Lower Bob Mass (m₂)": "Masse bob 2 (m₂)",
    "Initial Angle θ₁": "Angle initial θ₁",
    "Initial Angle θ₂": "Angle initial θ₂",
    "Orbital Semi-Major Axis (a)": "Demi-grand axe (a)",
    "Orbital Eccentricity (e)": "Excentricité orbitale (e)",
    "Central Star Mass (M)": "Masse étoile centrale (M)",
    "Orbital Inclination (i)": "Inclinaison orbitale (i)",
    "True Anomaly (ν)": "Anomalie vraie (ν)",
    "Wavelength (λ)": "Longueur d'onde (λ)",
    "Source Separation (d)": "Écart entre sources (d)",
    "Phase Shift (Δφ)": "Déphasage (Δφ)",
    "Incident Angle (θ₁)": "Angle d'incidence (θ₁)",
    "Medium 1 Refractive Index (n₁)": "Indice milieu 1 (n₁)",
    "Medium 2 Refractive Index (n₂)": "Indice milieu 2 (n₂)",
    "Lens Focal Length (f)": "Distance focale (f)",
    "Object Distance (do)": "Distance de l'objet (do)",
    "Temperature (T)": "Température (T)",
    "Volume (V)": "Volume (V)",
    "Number of Moles (n)": "Quantité de matière (n)",
    "Quadratic / High-Order (a)": "Coefficient degré 2 (a)",
    "Linear Slope (b)": "Pente linéaire (b)",
    "Constant Offset (c)": "Constante (c)",
    "Inspect Point (x₀)": "Point d'inspection (x₀)",
    "Rotation Angle (θ)": "Angle de rotation (θ)",
    "Block Mass (m)": "Masse du bloc (m)",
    "Spring Constant (k)": "Raideur du ressort (k)",
    "Damping Coefficient (b)": "Coefficient d'amortissement (b)",
    "Source Voltage (V)": "Tension de source (V)",
    "Resistor 1 (R₁)": "Résistance 1 (R₁)",
    "Resistor 2 (R₂)": "Résistance 2 (R₂)",
    "Incline Angle (θ)": "Angle de la pente (θ)",
    "Static Friction (μs)": "Frottement statique (μs)",
    "Kinetic Friction (μk)": "Frottement cinétique (μk)",
  },
  ar: {
    "Wave Amplitude (A)": "سعة الموجة (A)",
    "Angular Frequency (ω)": "التردد الزاوي (ω)",
    "Decay / Envelope (γ)": "معامل التضاؤل (γ)",
    "Tangent Point (x₀)": "نقطة التماس (x₀)",
    "Integral Lower Bound (a)": "الحد السفلي للتكامل (a)",
    "Integral Upper Bound (b)": "الحد العلوي للتكامل (b)",
    "Riemann Partitions (N)": "تقسيمات ريمان (N)",
    "Prandtl Number (σ)": "رقم براندتل (σ)",
    "Rayleigh Number (ρ)": "رقم رايلي (ρ)",
    "Geometric Factor (β)": "المعامل الهندسي (β)",
    "Time Step (dt)": "الخطوة الزمنية (dt)",
    "Tails / Dropped (N)": "عدد الكرات المسقطة (N)",
    "Binomial Trials (n)": "تجارب ذي الحدين (n)",
    "Success Probability (p)": "احتمال النجاح (p)",
    "Launch Angle (θ)": "زاوية الإطلاق (θ)",
    "Initial Velocity (v₀)": "السرعة الابتدائية (v₀)",
    "Launch Altitude (y₀)": "ارتفاع الإطلاق (y₀)",
    "Gravity Field (g)": "تسارع الجاذبية (g)",
    "Drag Coefficient (Cd)": "معامل مقاومة الهواء (Cd)",
    "Air Density (ρ)": "كثافة الهواء (ρ)",
    "Projectile Mass (m)": "كتلة المقذوف (m)",
    "Projectile Radius (r)": "نصف قطر المقذوف (r)",
    "Upper Rod Length (L₁)": "طول القضيب العلوي (L₁)",
    "Lower Rod Length (L₂)": "طول القضيب السفلي (L₂)",
    "Upper Bob Mass (m₁)": "كتلة الثقل العلوي (m₁)",
    "Lower Bob Mass (m₂)": "كتلة الثقل السفلي (m₂)",
    "Initial Angle θ₁": "الزاوية الابتدائية θ₁",
    "Initial Angle θ₂": "الزاوية الابتدائية θ₂",
    "Orbital Semi-Major Axis (a)": "نصف المحور الأكبر (a)",
    "Orbital Eccentricity (e)": "الانحراف المداري (e)",
    "Central Star Mass (M)": "كتلة النجم المركزي (M)",
    "Orbital Inclination (i)": "الميل المداري (i)",
    "True Anomaly (ν)": "الزاوية الحقيقية (ν)",
    "Wavelength (λ)": "الطول الموجي (λ)",
    "Source Separation (d)": "المسافة بين المصدرين (d)",
    "Phase Shift (Δφ)": "فرق الطور (Δφ)",
    "Incident Angle (θ₁)": "زاوية السقوط (θ₁)",
    "Medium 1 Refractive Index (n₁)": "معامل انكسار الوسط الأول (n₁)",
    "Medium 2 Refractive Index (n₂)": "معامل انكسار الوسط الثاني (n₂)",
    "Lens Focal Length (f)": "البعد البؤري للعدسة (f)",
    "Object Distance (do)": "بعد الجسم عن العدسة (do)",
    "Temperature (T)": "درجة الحرارة (T)",
    "Volume (V)": "الحجم (V)",
    "Number of Moles (n)": "عدد المولات (n)",
    "Quadratic / High-Order (a)": "معامل الدرجة الثانية (a)",
    "Linear Slope (b)": "الميل الخطي (b)",
    "Constant Offset (c)": "الحد الثابت (c)",
    "Inspect Point (x₀)": "نقطة الفحص (x₀)",
    "Rotation Angle (θ)": "زاوية الدوران (θ)",
    "Block Mass (m)": "كتلة الجسم (m)",
    "Spring Constant (k)": "ثابت صلابة النابض (k)",
    "Damping Coefficient (b)": "معامل التخميد (b)",
    "Source Voltage (V)": "جهد المصدر (V)",
    "Resistor 1 (R₁)": "المقاومة الأولى (R₁)",
    "Resistor 2 (R₂)": "المقاومة الثانية (R₂)",
    "Incline Angle (θ)": "زاوية المنحدر (θ)",
    "Static Friction (μs)": "معامل الاحتكاك السكوني (μs)",
    "Kinetic Friction (μk)": "معامل الاحتكاك الحركي (μk)",
  },
};

export const VEDIC_THEME_TRANSLATIONS = {
  fr: {
    1: {
      name: "Unité de la Monade",
      symmetryPair: "Symétrie Miroir 1 ↔ 8",
      description: "Forme une hyperbole extérieure expansive et une symétrie diagonale. Jumelé avec 8 comme jumeau géométrique inversé à travers l'axe védique.",
    },
    2: {
      name: "Polarité de la Dyade",
      symmetryPair: "Symétrie Miroir 2 ↔ 7",
      description: "Génère un tissage en étoile hexagonale entrelacée. Sa suite modulaire double à chaque pas (2, 4, 6, 8, 1, 3, 5, 7, 9), reflétant la racine 7.",
    },
    3: {
      name: "Harmonique de la Triade",
      symmetryPair: "Réseau Harmonique 3 ↔ 6",
      description: "Crée un réseau rythmique 3×3 le long des rangées et colonnes 3 et 6. Avec 6 et 9, elle forme la célèbre triade de flux de Tesla.",
    },
    4: {
      name: "Structure de la Tétrade",
      symmetryPair: "Symétrie Miroir 4 ↔ 5",
      description: "Dessine une enceinte octogonale en losange autour du centre du carré. Reflète géométriquement la racine 5 en phase inversée.",
    },
    5: {
      name: "Vortex de la Pentade",
      symmetryPair: "Symétrie Miroir 5 ↔ 4",
      description: "Rayonne un motif d'étoile octogonale orienté vers l'intérieur qui s'entrelace parfaitement avec la racine 4 en parcourant les 9 chiffres.",
    },
    6: {
      name: "Résonance de l'Hexade",
      symmetryPair: "Réseau Harmonique 6 ↔ 3",
      description: "Reflète la Triade (3) aux nœuds harmoniques inverses (6, 3, 9), ancrant la symétrie hexagonale sacrée du champ de multiplication.",
    },
    7: {
      name: "Mystique de l'Heptade",
      symmetryPair: "Symétrie Miroir 7 ↔ 2",
      description: "Trace le polygone étoilé inversé de la racine 2. L'addition des cellules correspondantes des lignes 2 et 7 donne toujours la racine numérique 9.",
    },
    8: {
      name: "Infini de l'Ogdoade",
      symmetryPair: "Symétrie Miroir 8 ↔ 1",
      description: "Forme un losange central croisé concentré — l'inversion spatiale exacte de la frontière extérieure de la racine 1.",
    },
    9: {
      name: "Ennéade Suprême",
      symmetryPair: "Invariant Auto-Duel 9",
      description: "L'horizon invariant des mathématiques védiques. Tout nombre multiplié par 9 se réduit à 9, divisant le carré en quadrants sacrés.",
    },
  },
  ar: {
    1: {
      name: "وحدة الأحادية (Monad)",
      symmetryPair: "تماثل مرآتي 1 ↔ 8",
      description: "يشكّل قطعاً زائداً خارجياً وتماثلاً قطرياً موسعاً، متكاملاً مع الرقم 8 كنظير هندسي معكوس عبر المحور الفيدي.",
    },
    2: {
      name: "قطبية الثنائية (Dyad)",
      symmetryPair: "تماثل مرآتي 2 ↔ 7",
      description: "ينتج نسجاً لنجمة سداسية متشابكة، حيث يتضاعف تسلسله النمطي في كل خطوة ويعكس الجذر 7 تماماً.",
    },
    3: {
      name: "توافقية الثلاثية (Triad)",
      symmetryPair: "شبكة توافقية 3 ↔ 6",
      description: "تخلق شبكة إيقاعية 3×3 عبر الصفوف والأعمدة 3 و6، وتشكل مع 6 و9 ثالوث تدفق تسلا الشهير (3-6-9).",
    },
    4: {
      name: "بنية الرباعية (Tetrad)",
      symmetryPair: "تماثل مرآتي 4 ↔ 5",
      description: "ترسم إطاراً ثماني الأضلاع ماسي حول مركز المربع، لتعكس الجذر 5 بطور هندسي مقلوب.",
    },
    5: {
      name: "دوامة الخماسية (Pentad)",
      symmetryPair: "تماثل مرآتي 5 ↔ 4",
      description: "تشع نمط نجمة ثمانية متجهة نحو الداخل تتداخل بانسجام تام مع الجذر 4 وتمر بجميع الأرقام التسعة.",
    },
    6: {
      name: "رنين السداسية (Hexad)",
      symmetryPair: "شبكة توافقية 6 ↔ 3",
      description: "تعكس الثلاثية (3) عند العقد التوافقية المعكوسة (6، 3، 9) لتثبيت التماثل السداسي لحقل الضرب.",
    },
    7: {
      name: "إشراق السباعية (Heptad)",
      symmetryPair: "تماثل مرآتي 7 ↔ 2",
      description: "تتبع مضلع النجمة المعكوس للجذر 2؛ وجمع خلايا الصف 2 مع الصف 7 يعطي دائماً الجذر الرقمي 9.",
    },
    8: {
      name: "لانهاية الثمانية (Ogdoad)",
      symmetryPair: "تماثل مرآتي 8 ↔ 1",
      description: "تكوّن ماسة قطرية مركزية مركزة تمثل الانعكاس المكاني الصريح لحدود الجذر 1 الخارجية.",
    },
    9: {
      name: "سيادة التساعية (Ennead)",
      symmetryPair: "الثابت الذاتي 9",
      description: "الأفق الثابت للرياضيات الفيدية؛ حاصل ضرب أي عدد في 9 يختزل دائماً إلى 9 ليقسم المربع لأرباع متناظرة.",
    },
  },
};

export const PATTERN_MODE_TRANSLATIONS = {
  fr: {
    constellation: { label: "Constellation", desc: "Toile de proximité harmonique + anneau extérieur" },
    mandala: { label: "Mandala Étoilé", desc: "Rayons radiaux + cordes miroirs symétriques" },
    sequential: { label: "Flux Ondulatoire", desc: "Cheminement séquentiel à travers la matrice" },
    network: { label: "Graphe Complet", desc: "Réseau géométrique intégral point à point" },
  },
  ar: {
    constellation: { label: "كوكبة نجمية", desc: "شبكة تقارب توافقي وحلقة خارجية متوازنة" },
    mandala: { label: "ماندالا نجمية", desc: "أشعة نصف قطرية وأوتار تماثل مرآتية" },
    sequential: { label: "تدفق موجي", desc: "مسار متتابع عبر خلايا المصفوفة" },
    network: { label: "شبكة كاملة", desc: "روابط هندسية شاملة بين جميع النقاط" },
  },
};

export const WAVE_MODE_TRANSLATIONS = {
  fr: {
    ripple: "Ondulation Radiale",
    harmonic: "Onde Harmonique",
    spiral: "Spirale Vortex",
    static: "Piliers Stables",
  },
  ar: {
    ripple: "تموج دائري",
    harmonic: "موجة توافقية",
    spiral: "دوامة لولبية",
    static: "أعمدة ثابتة",
  },
};

export function getLocalizedPresetName(name, lang = "en") {
  if (lang === "en") return name;
  return PRESET_TRANSLATIONS[lang]?.[name] || name;
}

export function getLocalizedParamLabel(label, lang = "en") {
  if (lang === "en") return label;
  return PARAM_CONTROL_TRANSLATIONS[lang]?.[label] || label;
}

export function getLocalizedVedicTheme(theme, lang = "en") {
  if (lang === "en" || !theme) return theme;
  const trans = VEDIC_THEME_TRANSLATIONS[lang]?.[theme.number];
  if (!trans) return theme;
  return {
    ...theme,
    name: trans.name || theme.name,
    symmetryPair: trans.symmetryPair || theme.symmetryPair,
    description: trans.description || theme.description,
  };
}

export function getLocalizedPatternMode(mode, lang = "en") {
  if (lang === "en" || !mode) return mode;
  const trans = PATTERN_MODE_TRANSLATIONS[lang]?.[mode.id];
  if (!trans) return mode;
  return {
    ...mode,
    label: trans.label || mode.label,
    desc: trans.desc || mode.desc,
  };
}

export function getLocalizedWaveMode(mode, lang = "en") {
  if (lang === "en" || !mode) return mode;
  const label = WAVE_MODE_TRANSLATIONS[lang]?.[mode.id];
  if (!label) return mode;
  return {
    ...mode,
    label,
  };
}
