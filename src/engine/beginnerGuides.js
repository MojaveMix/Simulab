// Plain-language guides so anyone can enjoy a simulation without prior math/physics knowledge.

export const BEGINNER_GUIDES = {
  "function-grapher": {
    hook: "Change a few numbers and watch a whole curve bend, flip and slide.",
    what: "A function turns an input x into an output y. This lab draws every pair as a curve so you can see how each number in the equation shapes it.",
    see: [
      "The yellow curve is your function; the green dots are where it crosses the x-axis.",
      "The orange dashed line touches the curve at your chosen point and shows its slope.",
      "The blue dot is where it crosses the y-axis.",
    ],
    tryThis: [
      "Pick “Quadratic” and slide c up and down to move the parabola.",
      "Make a negative and watch the parabola flip upside down.",
      "Switch to “Sine” and change the frequency.",
    ],
  },
  "unit-circle-trig": {
    hook: "Spin a point round a circle and sine and cosine draw themselves.",
    what: "Sine and cosine are just the height and width of a point moving around a circle of radius 1. Unroll that motion and you get waves.",
    see: [
      "The pink line is sine (height); the cyan line is cosine (width).",
      "The two waves on the right trace those values as the angle grows.",
      "The bottom number shows sin² + cos² is always 1.",
    ],
    tryThis: [
      "Set spin speed to 0 and drag the angle slider to 90°.",
      "Find the angles where sine and cosine are equal.",
      "Let it spin and follow the dot along both waves.",
    ],
  },
  "spring-oscillator": {
    hook: "A bouncing spring that never gets tired — until you add friction.",
    what: "A mass on a spring is pulled back and released. Energy keeps swapping between motion and stretch; friction slowly drains it.",
    see: [
      "The green block swings around the dashed rest position.",
      "The graph shows its position over time.",
      "The bars show energy of motion (yellow) and spring stretch (blue).",
    ],
    tryThis: [
      "Set friction to 0 and watch it swing forever.",
      "Make the mass heavier — the swing gets slower.",
      "Raise friction until it stops without bouncing.",
    ],
  },
  "circuit-ohm-lab": {
    hook: "Watch electricity flow faster or slower as you turn the knobs.",
    what: "A battery pushes charge through resistors. More push means more current; more resistance means less.",
    see: [
      "Glowing dots are charges flowing round the loop.",
      "Faster, denser dots mean more current.",
      "Switch between series and parallel to compare.",
    ],
    tryThis: [
      "Double the voltage and see the current double.",
      "Switch to parallel: total resistance falls.",
      "Make one resistor tiny and see most current take that path.",
    ],
  },
  "incline-forces-lab": {
    hook: "See every force on a block and why it slides — or doesn't.",
    what: "Gravity pulls the block down; the ramp pushes back and friction resists sliding. Newton's second law adds the forces up to give acceleration.",
    see: [
      "Red arrow = weight, blue = ramp push, green = friction, yellow = your push.",
      "The orange block moves only if the pull beats friction.",
      "The box in the corner tells you what happens.",
    ],
    tryThis: [
      "Raise the ramp angle until the block starts to slide.",
      "Set friction to 0 for an ice ramp.",
      "Push uphill with the force slider.",
    ],
  },
  "vedic-square-3d": {
    hook: "A multiplication table that secretly draws beautiful stars and patterns.",
    what:
      "Multiply two numbers, then keep adding the digits of the answer until one digit is left (56 → 5+6 = 11 → 1+1 = 2). Do that for every cell of a 9×9 times table and the same digit keeps forming shapes.",
    see: [
      "Each tower is one cell of the times table; the number on top is its single-digit result.",
      "Glowing towers are all cells that share your chosen digit. Beams connect them into a pattern.",
      "Turn on the mirror option to see digit pairs that add up to 9 (like 2 and 7) draw opposite shapes.",
    ],
    tryThis: [
      "Press the number buttons 1–9 and watch the pattern change.",
      "Switch the camera to “Top Mandala” for the cleanest view.",
      "Turn on the 9-Complement mirror and compare 2 with 7.",
    ],
  },
  "calculus-fourier-lab": {
    hook: "See how fast a curve is changing, and measure the area under it.",
    what:
      "Calculus answers two questions: “how steep is this curve right here?” (the yellow line) and “how much area is under it?” (the coloured bars).",
    see: [
      "The blue curve is the function. The yellow line just touches it at your chosen point and shows its slope.",
      "The coloured bars approximate the area under the curve; more bars make it more accurate.",
      "The “Fourier” option builds a square wave out of simple smooth waves added together.",
    ],
    tryThis: [
      "Click anywhere on the graph to move the yellow point.",
      "Raise “Riemann Partitions” and watch the error shrink.",
      "Pick “Fourier Square” and increase the frequency to add more waves.",
    ],
  },
  "chaos-attractor-3d": {
    hook: "The famous “butterfly effect”: tiny changes, wildly different futures.",
    what:
      "A single glowing point moves through 3D space following simple rules. Even though the rules are exact, its path never repeats, and it traces a butterfly-shaped figure.",
    see: [
      "The ribbon is the path the point has travelled; the white ball is where it is now.",
      "It circles two ‘wings’ and jumps between them unpredictably.",
    ],
    tryThis: [
      "Drag to rotate the 3D view and scroll to zoom.",
      "Change the Rayleigh number (ρ) and watch the shape change.",
      "Try the Rössler and Thomas buttons for other chaotic shapes.",
    ],
  },
  "probability-monte-carlo": {
    hook: "Drop balls and throw darts: randomness that reveals order, and even π.",
    what:
      "Drop hundreds of little balls through rows of pins and they always pile up in the same bell-shaped curve. Throw random dots at a square and count how many hit the circle inside: it estimates π.",
    see: [
      "Left: balls falling through pins, piling into slots at the bottom.",
      "The green outline is the bell curve math says you should get.",
      "Right: random dots inside a circle estimating π.",
    ],
    tryThis: [
      "Increase “Sample Trials” and watch the piles smooth into a perfect bell.",
      "Slide “Right Bias” to push the peak left or right.",
      "Watch the π estimate get closer to 3.14159 as trials grow.",
    ],
  },
  "projectile-ballistics": {
    hook: "Throw a ball and see how gravity and air shape its flight.",
    what:
      "Throwing something makes an arc. In a vacuum it’s a smooth, symmetric curve. With air resistance, the ball drops more steeply at the end and loses speed.",
    see: [
      "The dashed blue curve is the flight in a pure vacuum (no air).",
      "The solid yellow curve is the real flight with air resistance.",
      "The bottom bars show how much energy turns into speed vs height vs heat lost to the air.",
    ],
    tryThis: [
      "Set drag to zero to see the pure textbook parabola.",
      "Change gravity to 1.62 (the Moon) and watch it fly three times as far.",
      "Set angle to 45° to get the maximum possible distance.",
    ],
  },
  "double-pendulum-lab": {
    hook: "Two linked pendulums that start simple, then go wildly chaotic.",
    what:
      "Hang one pendulum from the bottom of another and let go. At small swings it bobs peacefully. Let go from high up and the motion becomes impossible to predict, tracing loops and flips.",
    see: [
      "The white/pink trail is the path of the lower tip.",
      "The bottom-right graph is the 'phase portrait' showing how the two angles dance together.",
    ],
    tryThis: [
      "Start with small release angles (around 20°) to see orderly, gentle loops.",
      "Release from 120° or higher to trigger chaotic flips.",
      "Change the mass of the lower bob to see how weight changes the rhythm.",
    ],
  },
  "orbital-gravity-3d": {
    hook: "Fly a planet around a star and watch it speed up as it swoops close.",
    what:
      "Gravity pulls a planet toward its star. It falls around the star in an oval (ellipse). The closer it gets, the faster it whips around.",
    see: [
      "The yellow sphere is the central star; the blue planet leaves a glowing trail.",
      "The planet speeds up near the star and slows down far away.",
    ],
    tryThis: [
      "Raise 'Orbital Eccentricity' to turn the circle into a long, stretched comet oval.",
      "Increase star mass to see the planet orbit faster.",
      "Drag around in 3D to see the orbit from any angle.",
    ],
  },
  "wave-interference-3d": {
    hook: "Drop two pebbles in water and see the waves build each other up or cancel out.",
    what:
      "Two wave sources create ripples. Where crest meets crest, water splashes twice as high (light bands). Where crest meets trough, the water stays flat (calm lines).",
    see: [
      "The 3D surface shows the water ripples.",
      "The detector screen at the back shows bright bands (where waves add) and dark spots (where they cancel).",
    ],
    tryThis: [
      "Move the two sources closer or farther apart and count the bright bands.",
      "Change the wavelength (λ) to see tighter or wider fringes.",
      "Set 'Relative Phase' to 180° to invert the whole pattern.",
    ],
  },
  "optics-refraction-lens": {
    hook: "Shine a laser into glass: watch it bend, bounce, or focus to a point.",
    what:
      "Light slows down inside glass or water, which bends its path (refraction). At steep angles it cannot escape at all (total internal reflection). A curved lens focuses rays to form images.",
    see: [
      "Top: laser beam hitting glass; see the bent beam and the reflected beam.",
      "Bottom: rays passing through a magnifying lens, meeting at the image point.",
    ],
    tryThis: [
      "Increase the incident angle past the red critical angle to see total internal reflection (laser trapped!).",
      "Slide the object closer to the lens to see the image grow bigger.",
      "Change the glass to diamond (n = 2.42) for extreme bending.",
    ],
  },
  "thermodynamics-gas-lab": {
    hook: "Why heating a gas makes pressure rise: tiny molecules bouncing around.",
    what:
      "A gas is billions of tiny molecules flying around and hitting the walls. Heat makes them faster, so they hit harder and more often, which is what pressure is.",
    see: [
      "Left: the dots are gas molecules in a box with a moving lid (piston).",
      "Right: the curve shows how many molecules move at each speed. Hotter gas shifts it to the right.",
    ],
    tryThis: [
      "Raise the temperature and watch the dots turn red and the curve move right.",
      "Squeeze the volume to see pressure rise.",
      "Swap light helium for heavier argon and compare speeds.",
    ],
  },
};

export const BEGINNER_GUIDES_I18N = {
  fr: {
    "function-grapher": {
      hook: "Modifiez quelques chiffres et regardez toute une courbe s'incliner, se retourner ou glisser.",
      what: "Une fonction associe une valeur x à une valeur y. Ce labo trace chaque point sous forme de courbe pour que vous compreniez le rôle de chaque coefficient.",
      see: [
        "La courbe jaune représente la fonction ; les points verts sont les intersections avec l'axe x.",
        "La ligne en pointillés orange touche la courbe au point x₀ et indique sa pente (dérivée).",
        "Le point bleu marque l'ordonnée à l'origine sur l'axe y.",
      ],
      tryThis: [
        "Choisissez « Du second degré » et faites glisser c pour déplacer la parabole verticalement.",
        "Donnez à a une valeur négative et regardez la parabole se renverser.",
        "Passez à « Sinus » et modifiez la fréquence.",
      ],
    },
    "unit-circle-trig": {
      hook: "Faites tourner un point sur un cercle : sinus et cosinus se dessinent d'eux-mêmes.",
      what: "Sinus et cosinus ne sont que la hauteur et la largeur d'un point circulant sur un cercle de rayon 1. Déroulez ce mouvement et vous obtenez des ondes.",
      see: [
        "La ligne rose représente le sinus (hauteur) ; la ligne cyan représente le cosinus (largeur).",
        "Les deux ondes à droite tracent ces valeurs au fur et à mesure que l'angle grandit.",
        "La valeur en bas confirme que sin² + cos² est toujours égal à 1.",
      ],
      tryThis: [
        "Réglez la vitesse sur 0 et déplacez le curseur d'angle à 90°.",
        "Trouvez les angles pour lesquels le sinus et le cosinus sont parfaitement égaux.",
        "Laissez tourner et suivez le point simultanément sur les deux ondes.",
      ],
    },
    "spring-oscillator": {
      hook: "Un ressort oscillant qui ne fatigue jamais — jusqu'à ce qu'on ajoute des frottements.",
      what: "Une masse attachée à un ressort est tirée puis relâchée. L'énergie s'échange continuellement entre vitesse et étirement élastique.",
      see: [
        "Le bloc vert oscille de part et d'autre de sa position d'équilibre en pointillés.",
        "Le graphe du bas affiche sa position en fonction du temps.",
        "Les barres comparent l'énergie cinétique (jaune) et l'énergie potentielle élastique (bleue).",
      ],
      tryThis: [
        "Réglez le frottement à 0 pour voir le ressort osciller indéfiniment.",
        "Augmentez la masse : le rythme des oscillations ralentit.",
        "Augmentez l'amortissement jusqu'à ce que le bloc s'arrête sans rebondir (régime critique).",
      ],
    },
    "circuit-ohm-lab": {
      hook: "Observez le courant électrique s'accélérer ou ralentir en tournant les molettes.",
      what: "Une batterie pousse les charges à travers des résistances. Plus la tension pousse fort, plus le courant est élevé ; plus la résistance est grande, plus le courant faiblit.",
      see: [
        "Les points lumineux figurent les électrons circulant dans le circuit.",
        "Des points plus rapides et denses indiquent un courant électrique plus intense.",
        "Basculez entre le mode série et parallèle pour comparer.",
      ],
      tryThis: [
        "Doublez la tension de la batterie et observez le courant doubler.",
        "Passez en parallèle : la résistance équivalente chute.",
        "Baissez fortement l'une des résistances et voyez l'essentiel du courant emprunter cette voie.",
      ],
    },
    "incline-forces-lab": {
      hook: "Visualisez toutes les forces appliquées sur un bloc et découvrez pourquoi il glisse — ou reste immobile.",
      what: "La gravité tire vers le bas, le plan pousse perpendiculairement et le frottement retient le solide. La 2e loi de Newton fait la somme de ces forces.",
      see: [
        "Flèche rouge = poids, bleue = réaction normale, verte = frottement, jaune = poussée.",
        "Le bloc orange ne bouge que si la force motrice surpasse le frottement maximal.",
        "L'encadré en haut à droite indique l'accélération et l'état du mouvement.",
      ],
      tryThis: [
        "Augmentez l'angle de la pente jusqu'à ce que le bloc commence à glisser.",
        "Réglez le frottement à 0 pour simuler une rampe de glace parfaite.",
        "Poussez vers le haut avec le curseur de force appliquée.",
      ],
    },
    "vedic-square-3d": {
      hook: "Une table de multiplication qui dessine secrètement des étoiles et mandalas réguliers.",
      what: "Multipliez deux nombres et additionnez les chiffres de la réponse jusqu'à obtenir un seul chiffre. Répété sur un tableau 9×9, ce principe révèle des symétries captivantes.",
      see: [
        "Chaque pilier 3D correspond à une cellule de la table ; la hauteur indique sa valeur réduite.",
        "Les piliers lumineux partagent votre chiffre choisi et sont reliés par des rayons laser.",
        "Le mode miroir associe les paires complémentaires dont la somme vaut 9 (comme 2 et 7).",
      ],
      tryThis: [
        "Appuyez sur les chiffres 1 à 9 pour voir les figures changer instantanément.",
        "Basculez la caméra sur « Top Mandala » pour une vue du dessus géométrique parfaite.",
        "Activez le miroir dual et observez l'inversion géométrique entre 1 et 8.",
      ],
    },
  },
  ar: {
    "function-grapher": {
      hook: "غيّر بعض الأرقام وشاهد المنحنى ينحني وينعكس وينزاح بالكامل أمام عينيك.",
      what: "تحول الدالة المدخل x إلى مخرج y. يرسم هذا المختبر كل زوج كنقطة على المنحنى لتفهم التأثير البصري المباشر لكل معامل في المعادلة.",
      see: [
        "المنحنى الأصفر يمثل الدالة؛ النقاط الخضراء هي مواضع التقاطع مع محور السينات (الجذور).",
        "الخط المتقطع البرتقالي يلامس المنحنى عند النقطة المحددة x₀ ويُظهر ميل المماس (المشتقة).",
        "النقطة الزرقاء تمثل نقطة التقاطع مع محور الصادات.",
      ],
      tryThis: [
        "اختر دالة الدرجة الثانية وحرّك المعامل c لمشاهدة القطع المكافئ يرتفع ويهبط.",
        "اجعل المعامل a سالباً وشاهد القطع ينقلب رأساً على عقب.",
        "انتقل إلى دالة الجيب وغيّر التردد.",
      ],
    },
    "unit-circle-trig": {
      hook: "أدر نقطة حول دائرة بسيطة ودع دالتي الجيب وجيب التمام ترسما نفسيهما.",
      what: "الجيب وجيب التمام هما ببساطة ارتفاع وعرض نقطة تدور حول دائرة نصف قطرها 1. وبفرد تلك الحركة الدورانية تتولد الموجات الجيبية.",
      see: [
        "الخط الوردي يمثل الجيب (الارتفاع الرأسي)؛ والخط السماوي يمثل جيب التمام (العرض الأفقي).",
        "الموجتان على اليمين تتبعان تلك القيم المستمرة مع تزايد مقدار الزاوية.",
        "القيمة في الأسفل تثبت أن sin² + cos² = 1 متحققة دوماً عند كل زاوية.",
      ],
      tryThis: [
        "اضبط سرعة الدوران على 0 وحرّك شريط الزاوية إلى 90 درجة.",
        "ابحث عن الزوايا التي يتساوى عندها الجيب مع جيب التمام.",
        "دع النقطة تدور وتابع مسارها المتزامن على الموجتين.",
      ],
    },
    "spring-oscillator": {
      hook: "نابض مهتز لا يتعب أبداً — حتى تضيف إليه قوى الاحتكاك والتخميد.",
      what: "تُسحب كتلة متصلة بنابض وتُترك حرة. تتبادل الطاقة باستمرار بين الحركة (طاقة حركية) والاستطالة (طاقة مرونية)، حتى يمتصها التخميد تدريجياً.",
      see: [
        "الكتلة الخضراء تتأرجح حول موضع السكون والاتزان المتقطع.",
        "الرسم البياني بالأسفل يوضح تغير الموضع بدقة مع مرور الزمن.",
        "الأعمدة تقارن طاقة الحركة (الصفراء) وطاقة وضع النابض (الزرقاء).",
      ],
      tryThis: [
        "اجعل الاحتكاك صفراً وشاهد النابض يتأرجح إلى الأبد دون توقف.",
        "زد من كتلة الجسم ولاحظ كيف يتباطأ زمن الدورة الاهتزازية.",
        "ارفع معامل التخميد حتى يتوقف الجسم بسلاسة دون ارتداد (الخماد الحرج).",
      ],
    },
    "circuit-ohm-lab": {
      hook: "شاهد تدفق الكهرباء يتسارع أو يتباطأ بمجرد تدوير المقابض.",
      what: "تدفع البطارية الشحنات عبر المقاومات. كلما زاد الجهد زاد التيار؛ وكلما زادت المقاومة تعثر تدفق الشحنات وقل التيار.",
      see: [
        "النقاط المضيئة تمثل الإلكترونات المتدفقة داخل حلقة الدائرة.",
        "النقاط الأسرع والأكثر كثافة تعبر عن تيار كهربائي أقوى.",
        "بدل بين التوصيل على التوالي والتوصيل على التوازي للمقارنة المباشرة.",
      ],
      tryThis: [
        "ضاعف جهد البطارية وشاهد شدة التيار تتضاعف في الحال.",
        "انتقل إلى التوصيل على التوازي: ستنخفض المقاومة المكافئة الكلية.",
        "صغّر إحدى المقاومتين جداً وشاهد معظم التيار يسلك هذا المسار الأسهل.",
      ],
    },
    "incline-forces-lab": {
      hook: "شاهد جميع القوى المؤثرة على جسم واكتشف سبب انزلاقه — أو بقائه ساكناً.",
      what: "تسحب الجاذبية الجسم لأسفل، ويدفع السطح للأعلى بقوة عمودية، بينما يقاوم الاحتكاك الانزلاق. يجمع قانون نيوتن الثاني هذه القوى لحساب التسارع.",
      see: [
        "السهم الأحمر = الوزن، الأزرق = القوة العمودية، الأخضر = الاحتكاك، الأصفر = قوة الدفع.",
        "الجسم البرتقالي لا يتحرك إلا إذا تغلبت القوى المحركة على قوة الاحتكاك القصوى.",
        "المربع في الأعلى يوضح تسارع الجسم وحالته الحركية فوراً.",
      ],
      tryThis: [
        "ارفع زاوية ميل المنحدر تدريجياً حتى يبدأ الجسم بالانزلاق التلقائي.",
        "اجعل الاحتكاك صفراً لمحاكاة سطح جليدي أملس تماماً.",
        "ادفع الجسم لأعلى المنحدر باستخدام شريط القوة المطبقة.",
      ],
    },
    "vedic-square-3d": {
      hook: "جدول ضرب يخفي في داخله نجوماً وتناظرات هندسية مقدسة مذهلة.",
      what: "اضرب عددين، ثم اجمع خانات الناتج حتى يتبقى رقم واحد فقط. تكرار ذلك على جدول 9×9 يُظهر أشكالاً وأنماطاً هندسية ساحرة يحكمها الترديد بترديد 9.",
      see: [
        "كل برج ثلاثي الأبعاد يمثل خلية في جدول الضرب، وارتفاعه يمثل جذره الرقمي.",
        "الأبراج المضيئة تشترك في نفس الرقم المختار وترتبط بأشعة ليزر براقة.",
        "خاصية الانعكاس تجمع الأزواج المتكاملة التي مجموعها 9 (مثل 2 مع 7).",
      ],
      tryThis: [
        "انقر على الأرقام من 1 إلى 9 وشاهد النمط الهندسي يتغير فوراً.",
        "حوّل الكاميرا إلى زاوية «ماندالا علوية» للحصول على أوضح رؤية هندسية.",
        "فعّل خيار الانعكاس المزدوج ولاحظ التناظر المتبادل بين الرقمين 1 و 8.",
      ],
    },
  },
};

export function getBeginnerGuide(simId, lang = "en") {
  if (lang !== "en" && BEGINNER_GUIDES_I18N[lang]?.[simId]) {
    return BEGINNER_GUIDES_I18N[lang][simId];
  }
  return BEGINNER_GUIDES[simId] || null;
}
