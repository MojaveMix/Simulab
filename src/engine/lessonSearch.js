// Lesson search: type a lesson name (English, French, or Arabic) -> get the simulation that teaches it.
import lessonData from "../data/lessons.json";
import { SIMULATION_CATALOG } from "./simulationRegistry";

export const LESSONS = lessonData.lessons;

const STOP = new Set([
  "the", "of", "a", "an", "and", "in", "on", "for", "to", "is", "what", "how", "lesson", "lessons",
  "simulation", "simulations", "chapter", "about", "explain", "show", "me",
  "le", "la", "les", "de", "des", "du", "et", "un", "une", "cours", "sur",
  "في", "من", "عن", "على", "الى", "إلى", "درس", "شرح", "محاكاة", "ما", "هو", "هي", "كيف", "مع",
]);

export function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]s\b/g, "")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}=+\-*/^²³ ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const tokens = (text) =>
  normalize(text)
    .split(" ")
    .filter((t) => t && !STOP.has(t));

function levenshtein(a, b, max = 2) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

// Sim-level entries so that searching for an existing simulation's own name still works.
const SIM_ENTRIES = SIMULATION_CATALOG.map((sim) => ({
  id: `sim-${sim.id}`,
  title: sim.shortTitle,
  domain: sim.domain,
  topic: sim.category,
  aliases: [sim.title, sim.category],
  simId: sim.id,
  params: null,
  blurb: sim.summary,
  isSimEntry: true,
}));

const INDEX = [...LESSONS, ...SIM_ENTRIES].map((lesson) => {
  const allNames = [
    lesson.title,
    lesson.title_fr,
    lesson.title_ar,
    ...(lesson.aliases || []),
  ].filter(Boolean);

  const names = allNames.map(normalize);
  return {
    lesson,
    names,
    nameTokens: names.map((n) => n.split(" ").filter((t) => t && !STOP.has(t))),
    allTokens: new Set([
      ...names.flatMap((n) => n.split(" ")),
      ...tokens(lesson.topic || ""),
      ...tokens(lesson.blurb || ""),
      ...tokens(lesson.blurb_fr || ""),
      ...tokens(lesson.blurb_ar || ""),
    ]),
  };
});

function scoreEntry(entry, q, qTokens) {
  let best = 0;
  entry.names.forEach((name, i) => {
    if (!name) return;
    if (name === q) best = Math.max(best, i === 0 ? 100 : 96);
    else if (name.startsWith(q) && q.length >= 2) best = Math.max(best, 88);
    else if (q.length >= 3 && name.includes(q)) best = Math.max(best, 78);
    else if (name.length >= 3 && q.includes(name)) best = Math.max(best, 70);

    const nt = entry.nameTokens[i];
    if (!nt || !nt.length || !qTokens.length) return;
    let hits = 0;
    qTokens.forEach((qt) => {
      if (nt.some((t) => t === qt)) hits += 1;
      else if (qt.length >= 3 && nt.some((t) => t.startsWith(qt) || (t.length >= 4 && qt.startsWith(t)))) hits += 0.8;
      else if (qt.length >= 4 && nt.some((t) => t.length >= 4 && levenshtein(qt, t, qt.length > 6 ? 2 : 1) <= (qt.length > 6 ? 2 : 1))) hits += 0.65;
    });
    const coverage = hits / qTokens.length;
    const precision = hits / nt.length;
    best = Math.max(best, Math.round(60 * coverage * (0.55 + 0.45 * Math.min(1, precision * 1.5))));
  });

  if (best < 30 && qTokens.length) {
    const hits = qTokens.filter((t) => entry.allTokens.has(t)).length;
    best = Math.max(best, Math.round(26 * (hits / qTokens.length)));
  }
  if (entry.lesson.isSimEntry) best -= 4;
  return best;
}

/** Returns up to `limit` lessons that best match the query, most relevant first. */
export function searchLessons(query, limit = 6) {
  const q = normalize(query);
  if (!q) return [];
  const qTokens = tokens(query);
  return INDEX.map((entry) => ({ lesson: entry.lesson, score: scoreEntry(entry, q, qTokens) }))
    .filter((r) => r.score >= 22)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Resolve a lesson into the data the app needs to open it. */
export function getLessonLaunch(lesson) {
  return { simId: lesson.simId, params: lesson.params || null };
}

export function getLessonTitle(lesson, lang = "en") {
  if (lang === "fr" && lesson.title_fr) return lesson.title_fr;
  if (lang === "ar" && lesson.title_ar) return lesson.title_ar;
  return lesson.title;
}

export function getLessonBlurb(lesson, lang = "en") {
  if (lang === "fr" && lesson.blurb_fr) return lesson.blurb_fr;
  if (lang === "ar" && lesson.blurb_ar) return lesson.blurb_ar;
  return lesson.blurb;
}

const TOPIC_TRANSLATIONS = {
  fr: {
    "Number Theory": "Théorie des Nombres",
    Arithmetic: "Arithmétique",
    Algebra: "Algèbre",
    Trigonometry: "Trigonométrie",
    Geometry: "Géométrie",
    Calculus: "Calcul Différentiel & Intégral",
    Analysis: "Analyse Mathématique",
    Statistics: "Statistiques & Probabilités",
    Chaos: "Théorie du Chaos",
    Mechanics: "Mécanique",
    Oscillations: "Oscillations & Ondes",
    Electricity: "Électricité",
    Astronomy: "Astronomie & Gravitation",
    Waves: "Ondes & Acoustique",
    Optics: "Optique",
    Thermodynamics: "Thermodynamique",
  },
  ar: {
    "Number Theory": "نظرية الأعداد",
    Arithmetic: "الحساب",
    Algebra: "الجبر",
    Trigonometry: "حساب المثلثات",
    Geometry: "الهندسة",
    Calculus: "التفاضل والتكامل",
    Analysis: "التحليل الرياضي",
    Statistics: "الإحصاء والاحتمالات",
    Chaos: "نظرية الفوضى",
    Mechanics: "الميكانيكا الكلاسيكية",
    Oscillations: "الاهتزازات والموجات",
    Electricity: "الكهرباء",
    Astronomy: "علم الفلك والجاذبية",
    Waves: "الموجات والصوتيات",
    Optics: "البصريات",
    Thermodynamics: "الديناميكا الحرارية",
  },
};

export function getLessonTopic(topic, lang = "en") {
  return TOPIC_TRANSLATIONS[lang]?.[topic] || topic;
}

export const POPULAR_LESSON_IDS = [
  "quadratic-functions",
  "derivatives",
  "unit-circle",
  "projectile-motion",
  "ohms-law",
  "newtons-laws",
  "keplers-laws",
  "lorenz-attractor",
  "simple-harmonic-motion",
  "refraction",
  "normal-distribution",
  "ideal-gas-law",
];

export function getPopularLessons() {
  return POPULAR_LESSON_IDS.map((id) => LESSONS.find((l) => l.id === id)).filter(Boolean);
}
