import { useEffect, useMemo, useRef, useState } from "react";
import MathBackdrop from "./MathBackdrop";
import LessonSearch from "./LessonSearch";
import {
  MathCompassIcon,
  AtomPhysicsIcon,
  SparklesAIIcon,
  ArrowRightIcon,
  GridLibraryIcon,
  LightbulbIcon,
  HeartIcon,
} from "./Icons";
import { SIMULATION_CATALOG } from "../engine/simulationRegistry";
import { getBeginnerGuide } from "../engine/beginnerGuides";
import { LESSONS, getPopularLessons, getLessonTitle, getLessonBlurb } from "../engine/lessonSearch";
import { useLanguage } from "../i18n/LanguageContext";
import { getLocalizedSimulation } from "../i18n/simulationsI18n";

const FORMULAS = [
  "E = mc²", "∫ f(x) dx", "F = m·a", "sin²θ + cos²θ = 1", "PV = nRT", "V = I·R", "e^{iπ} + 1 = 0",
  "d/dx xⁿ = n·xⁿ⁻¹", "n₁ sin θ₁ = n₂ sin θ₂", "T = 2π√(m/k)", "x = (−b ± √(b²−4ac)) / 2a", "a² + b² = c²",
  "T² ∝ a³", "σ = √(Σ(x−μ)²/N)", "ΔS ≥ 0", "∇·E = ρ/ε₀",
];

function useCountUp(target, active) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1200);
      setV(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return v;
}

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Stat({ value, suffix = "", label, color }) {
  const [ref, seen] = useInView();
  const n = useCountUp(value, seen);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color }}>
        {n}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

/** Animated mini illustrations (pure SVG/CSS) */
function MiniWave() {
  return (
    <svg viewBox="0 0 300 110" className="w-full h-28" aria-hidden="true">
      <defs>
        <linearGradient id="mw" x1="0" x2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <line x1="0" y1="55" x2="300" y2="55" stroke="currentColor" strokeOpacity="0.2" />
      <path className="wave-a" fill="none" stroke="url(#mw)" strokeWidth="3" strokeLinecap="round" d="M0 55 Q 37 0 75 55 T 150 55 T 225 55 T 300 55 T 375 55 T 450 55" />
      <path className="wave-b" fill="none" stroke="#f472b6" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" d="M0 55 Q 25 15 50 55 T 100 55 T 150 55 T 200 55 T 250 55 T 300 55 T 350 55 T 400 55" />
    </svg>
  );
}

function MiniOrbit() {
  return (
    <svg viewBox="0 0 300 110" className="w-full h-28" aria-hidden="true">
      <ellipse cx="150" cy="55" rx="120" ry="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 5" />
      <ellipse cx="150" cy="55" rx="70" ry="24" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 5" />
      <circle cx="150" cy="55" r="9" fill="#fbbf24" className="sun-glow" />
      <g className="orbit-a">
        <circle cx="270" cy="55" r="6" fill="#38bdf8" />
      </g>
      <g className="orbit-b">
        <circle cx="220" cy="55" r="4" fill="#f472b6" />
      </g>
    </svg>
  );
}

export default function LandingPage({
  onSelectSimulation,
  onNavigateView,
  onOpenAIStudio,
  onOpenLesson,
  onOpenDonate,
  theme,
}) {
  const { lang, t } = useLanguage();
  const [lessonFilter, setLessonFilter] = useState("all");
  const isLight = theme === "light";
  const popular = useMemo(() => getPopularLessons().slice(0, 8), []);
  const mathCount = LESSONS.filter((l) => l.domain === "mathematics").length;
  const physCount = LESSONS.filter((l) => l.domain === "physics").length;

  const shownLessons = useMemo(
    () => (lessonFilter === "all" ? LESSONS : LESSONS.filter((l) => l.domain === lessonFilter)),
    [lessonFilter]
  );

  const steps = [
    { n: "1", title: t("landing.step1Title"), text: t("landing.step1Desc"), color: "#22d3ee" },
    { n: "2", title: t("landing.step2Title"), text: t("landing.step2Desc"), color: "#a78bfa" },
    { n: "3", title: t("landing.step3Title"), text: t("landing.step3Desc"), color: "#f472b6" },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* ===================== HERO ===================== */}
      <section className="relative -mt-2 rounded-[2rem] border border-white/10 overflow-visible hero-surface">
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
          <div className="hero-aurora" />
          <MathBackdrop isLight={isLight} />
        </div>

        <div className="relative z-10 px-5 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24 text-center max-w-4xl mx-auto space-y-7">
          <div className="fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-semibold text-cyan-200 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {t("landing.heroBadge", {
                count: LESSONS.length,
                simCount: SIMULATION_CATALOG.length,
              })}
            </span>
          </div>

          <h1 className="fade-up delay-1 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            {t("landing.heroTitle1")}
            <br />
            <span className="gradient-text">{t("landing.heroTitle2")}</span>
          </h1>

          <p className="fade-up delay-2 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("landing.heroSubtitle")}
          </p>

          <div className="fade-up delay-3 max-w-2xl mx-auto relative z-30">
            <LessonSearch onOpenLesson={onOpenLesson} onAskAI={onOpenAIStudio} />
          </div>

          <div className="fade-up delay-4 flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mr-1">
              {t("landing.popular")}
            </span>
            {popular.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onOpenLesson(l)}
                className={`chip px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur cursor-pointer ${
                  l.domain === "mathematics"
                    ? "bg-purple-500/10 border-purple-400/25 text-purple-200 hover:bg-purple-500/25"
                    : "bg-cyan-500/10 border-cyan-400/25 text-cyan-200 hover:bg-cyan-500/25"
                }`}
              >
                {getLessonTitle(l, lang)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FORMULA MARQUEE ===================== */}
      <div className="marquee-mask overflow-hidden -my-8" aria-hidden="true">
        <div className="marquee-track flex gap-10 w-max text-lg sm:text-2xl font-semibold text-slate-500 font-serif italic">
          {[...FORMULAS, ...FORMULAS].map((f, i) => (
            <span key={i} className="whitespace-nowrap">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="space-y-10">
        <Reveal className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {t("landing.howItWorks")}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("landing.howItWorksTitle")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="step-card h-full rounded-3xl border border-white/10 bg-slate-900/60 p-7 space-y-4 relative overflow-hidden text-start">
                <div
                  className="absolute -end-6 -top-8 text-[9rem] font-black leading-none select-none opacity-[0.06]"
                  style={{ color: s.color }}
                >
                  {s.n}
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black"
                  style={{
                    background: `${s.color}22`,
                    color: s.color,
                    border: `1px solid ${s.color}55`,
                  }}
                >
                  {s.n}
                </div>
                <h3 className="text-xl font-extrabold text-white">{s.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== TWO LABS ===================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Reveal>
          <div
            className={`lab-card h-full rounded-3xl border p-7 sm:p-9 space-y-5 flex flex-col text-start ${
              isLight
                ? "border-purple-200/90 bg-gradient-to-br from-purple-50/90 via-white to-white shadow-xl shadow-purple-500/[0.06]"
                : "border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-slate-900/60 to-slate-900/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-400/30 text-purple-300">
                <MathCompassIcon className="w-3.5 h-3.5" /> {t("landing.mathDepartment")}
              </span>
              <span className="text-xs font-mono text-slate-400">{mathCount} {t("landing.lessonsIndexed")}</span>
            </div>
            <div className="text-purple-300">
              <MiniWave />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t("landing.mathCardSubtitle")}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed flex-1">
              {t("landing.mathCardDesc")}
            </p>
            <button
              type="button"
              onClick={() => onNavigateView("math-lab")}
              className={`self-start px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isLight
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 keep-white"
                  : "bg-purple-600/25 hover:bg-purple-600 text-purple-100 border border-purple-400/30"
              }`}
            >
              <span>{t("landing.exploreMath")}</span> <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div
            className={`lab-card h-full rounded-3xl border p-7 sm:p-9 space-y-5 flex flex-col text-start ${
              isLight
                ? "border-cyan-200/90 bg-gradient-to-br from-cyan-50/90 via-white to-white shadow-xl shadow-cyan-500/[0.06]"
                : "border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/60 to-slate-900/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                <AtomPhysicsIcon className="w-3.5 h-3.5" /> {t("landing.physicsDepartment")}
              </span>
              <span className="text-xs font-mono text-slate-400">{physCount} {t("landing.lessonsIndexed")}</span>
            </div>
            <div className="text-cyan-300">
              <MiniOrbit />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t("landing.physicsCardSubtitle")}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed flex-1">
              {t("landing.physicsCardDesc")}
            </p>
            <button
              type="button"
              onClick={() => onNavigateView("physics-lab")}
              className={`self-start px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isLight
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20 keep-white"
                  : "bg-cyan-600/25 hover:bg-cyan-600 text-cyan-100 border border-cyan-400/30"
              }`}
            >
              <span>{t("landing.explorePhysics")}</span> <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat
          value={LESSONS.length}
          suffix="+"
          label={t("landing.lessonsIndexed")}
          color="#22d3ee"
        />
        <Stat
          value={SIMULATION_CATALOG.length}
          label={t("landing.interactiveSims")}
          color="#a78bfa"
        />
        <Stat value={mathCount} label={t("landing.mathTopics")} color="#f472b6" />
        <Stat value={physCount} label={t("landing.physicsTopics")} color="#34d399" />
      </section>

      {/* ===================== LESSON DIRECTORY ===================== */}
      <section className="space-y-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              {t("landing.lessonIndex")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              {t("landing.browseAndClick")}
            </h2>
          </div>
          <div className="flex gap-2">
            {[
              { id: "all", label: t("landing.allFilter", { count: LESSONS.length }) },
              { id: "mathematics", label: t("landing.mathFilter", { count: mathCount }) },
              { id: "physics", label: t("landing.physicsFilter", { count: physCount }) },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLessonFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  lessonFilter === tab.id
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold"
                    : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2.5">
          {shownLessons.map((l) => {
            const isMath = l.domain === "mathematics";
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onOpenLesson(l)}
                title={getLessonBlurb(l, lang)}
                className={`chip px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold border cursor-pointer flex items-center gap-2 ${
                  isMath
                    ? "bg-purple-500/[0.07] border-purple-400/20 text-slate-200 hover:border-purple-400/60 hover:bg-purple-500/20"
                    : "bg-cyan-500/[0.07] border-cyan-400/20 text-slate-200 hover:border-cyan-400/60 hover:bg-cyan-500/20"
                }`}
              >
                <span className={isMath ? "text-purple-300" : "text-cyan-300"}>
                  {isMath ? "∑" : "⚛"}
                </span>
                <span>{getLessonTitle(l, lang)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================== SIMULATION CATALOG ===================== */}
      <section className="space-y-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 flex items-center gap-2">
              <GridLibraryIcon className="w-3.5 h-3.5" /> {t("landing.simulationsSection")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              {t("landing.everyLabReady")}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateView("library")}
            className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 flex items-center gap-2 cursor-pointer"
          >
            <span>{t("landing.openFullLibrary")}</span> <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SIMULATION_CATALOG.map((baseSim, i) => {
            const sim = getLocalizedSimulation(baseSim, lang);
            const guide = getBeginnerGuide(sim.id, lang);
            const isMath = sim.domain === "mathematics";
            return (
              <Reveal key={sim.id} delay={(i % 3) * 90}>
                <div
                  className="sim-card group h-full rounded-2xl p-5 bg-slate-900/70 backdrop-blur-xl border border-white/10 flex flex-col justify-between text-start"
                  style={{ "--accent": sim.accentColor }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                        style={{
                          color: sim.accentColor,
                          borderColor: `${sim.accentColor}55`,
                          backgroundColor: `${sim.accentColor}15`,
                        }}
                      >
                        {isMath ? (
                          <MathCompassIcon className="w-3 h-3" />
                        ) : (
                          <AtomPhysicsIcon className="w-3 h-3" />
                        )}
                        <span>{isMath ? t("nav.mathematics") : t("nav.physics")}</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{sim.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {sim.title}
                    </h3>
                    {guide && (
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-cyan-200">
                        <LightbulbIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{guide.hook}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                      {sim.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{sim.badge}</span>
                    <button
                      type="button"
                      onClick={() => onSelectSimulation(sim.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{t("landing.launch")}</span> <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <Reveal>
        <section className="relative rounded-[2rem] overflow-hidden border border-white/15 hero-surface text-center px-6 py-14 sm:py-20 space-y-6">
          <div className="hero-aurora opacity-70" />
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t("landing.cantFindLesson")} <span className="gradient-text">{t("landing.aiStudioPitch")}</span>
            </h2>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAIStudio}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-purple-500/25 hover:brightness-110 inline-flex items-center gap-2.5 cursor-pointer glow-pulse"
              >
                <SparklesAIIcon className="w-4 h-4" /> <span>{t("landing.openAIStudio")}</span>
              </button>
              {onOpenDonate && (
                <button
                  type="button"
                  onClick={onOpenDonate}
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 hover:text-white border border-rose-400/40 inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-500/10"
                >
                  <HeartIcon className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>{t("nav.donate")}</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
