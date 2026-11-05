import { useState, useMemo } from "react";
import VedicLogo from "./VedicLogo";
import MathFormula from "./MathFormula";
import LandingHero3D from "./LandingHero3D";
import {
  Cube3DIcon,
  MathCompassIcon,
  AtomPhysicsIcon,
  SparklesAIIcon,
  SlidersIcon,
  BookOpenIcon,
  ArrowRightIcon,
  OrbitIcon,
  WaveSineIcon,
  GridLibraryIcon,
  LightbulbIcon,
  CheckCircleIcon,
  LayersIcon,
  CpuIcon,
  GraduationCapIcon,
  LabFlaskIcon,
} from "./Icons";
import { SIMULATION_CATALOG } from "../engine/simulationRegistry";
import { getBeginnerGuide } from "../engine/beginnerGuides";
import { NUMBER_THEMES } from "../utils/vedicMath";
import { AI_EXAMPLE_PROMPTS, generateSimulationFromPrompt } from "../engine/aiSimulationEngine";

const HERO_3D_MODES = [
  {
    id: "sacred",
    label: "Sacred Torus & Harmonics",
    subtitle: "Vedic mod-9 crystal lattice & 3D harmonic wave field",
    simId: "vedic-square-3d",
    icon: Cube3DIcon,
  },
  {
    id: "orbital",
    label: "Keplerian Gravitational Field",
    subtitle: "Multi-body celestial mechanics & Vis-Viva velocity",
    simId: "orbital-gravity-3d",
    icon: OrbitIcon,
  },
  {
    id: "chaos",
    label: "Lorenz Strange Attractor",
    subtitle: "RK4 deterministic chaos & phase space contraction",
    simId: "chaos-attractor-3d",
    icon: WaveSineIcon,
  },
];

const AUDIENCE_CARDS = [
  {
    title: "For Students & Learners",
    desc: "Build genuine spatial intuition before exams. Manipulate variables, test 'what-if' edge cases, and see how physical laws operate beyond flat textbook sketches.",
    icon: GraduationCapIcon,
    accent: "#38BDF8",
    bullets: ["Intuitive real-time sliders", "Step-by-step math breakdowns", "Zero technical setup required"],
  },
  {
    title: "For Educators & Institutions",
    desc: "Transform classroom lectures with captivating, interactive 60 FPS simulations that answer questions visually and verify theoretical proofs dynamically.",
    icon: BookOpenIcon,
    accent: "#A855F7",
    bullets: ["Classroom demonstration mode", "Validated SI units & equations", "Clean projector-ready visuals"],
  },
  {
    title: "For Researchers & Explorers",
    desc: "Investigate non-linear dynamical systems, Lagrangian double pendulums, modular arithmetic topologies, and stochastic Monte Carlo convergence directly in browser.",
    icon: CpuIcon,
    accent: "#10B981",
    bullets: ["4th-Order Runge-Kutta ODEs", "Client-side high-precision math", "Exportable parameter states"],
  },
];

export default function LandingPage({
  onSelectSimulation,
  onNavigateView,
  onOpenAIStudio,
  onLaunchBlueprint,
}) {
  const [heroMode, setHeroMode] = useState("sacred");
  const [previewDigit, setPreviewDigit] = useState(5);
  const [catalogFilter, setCatalogFilter] = useState("all");

  const activeTheme = NUMBER_THEMES[previewDigit - 1] || NUMBER_THEMES[4];
  const twinTheme = NUMBER_THEMES[activeTheme.complement - 1] || NUMBER_THEMES[3];

  const activeHeroMeta =
    HERO_3D_MODES.find((m) => m.id === heroMode) || HERO_3D_MODES[0];

  const filteredSimulations = useMemo(() => {
    if (catalogFilter === "all") return SIMULATION_CATALOG;
    return SIMULATION_CATALOG.filter((s) => s.domain === catalogFilter);
  }, [catalogFilter]);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* =====================================================================
          1. HERO SECTION: EXECUTIVE INTRO & INTERACTIVE THREE.JS VIEWPORT
         ===================================================================== */}
      <section className="relative pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Solution Proposition & Primary CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SimuLab • Interactive Scientific Laboratory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Where Abstract Formulas Become{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-indigo-400">
                Interactive Reality.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Traditional STEM education traps learners in static 2D textbook pages and memorized equations.{" "}
              <strong className="text-white font-semibold">SimuLab</strong> solves this by turning complex mathematics and physics models into living virtual experiments—allowing you to manipulate parameters, observe real-time consequences, and build genuine spatial intuition.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectSimulation("vedic-square-3d")}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white shadow-xl shadow-purple-500/20 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Cube3DIcon className="w-4 h-4" />
                <span>Launch Vedic Square 3D</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateView("library")}
                className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-cyan-400/40 flex items-center gap-2 transition-all cursor-pointer"
              >
                <GridLibraryIcon className="w-4 h-4 text-cyan-400" />
                <span>Explore All 10 Labs</span>
              </button>

              <button
                type="button"
                onClick={onOpenAIStudio}
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <SparklesAIIcon className="w-4 h-4" />
                <span>AI Prompt Studio</span>
              </button>
            </div>

            {/* Core Architectural Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">10+</div>
                <div className="text-[11px] text-slate-400">Validated Labs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400">60 FPS</div>
                <div className="text-[11px] text-slate-400">WebGL 3D Engine</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-purple-400">RK4 / ODE</div>
                <div className="text-[11px] text-slate-400">Numerical Solvers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">Client-Side</div>
                <div className="text-[11px] text-slate-400">Zero Setup Needed</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Hardware-Framed Three.js Interactive Stage */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/[0.12] bg-[#090d16] shadow-2xl overflow-hidden relative group">
              {/* Top Viewport Header */}
              <div className="px-5 py-3.5 border-b border-white/[0.08] bg-[#0c101d] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: activeTheme.color,
                      boxShadow: `0 0 8px ${activeTheme.color}`,
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      {activeHeroMeta.label}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Live Three.js Computational Viewport
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectSimulation(
                      activeHeroMeta.simId,
                      heroMode === "sacred" ? { number: previewDigit } : null
                    )
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-white border border-white/15 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Open Full Lab</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </button>
              </div>

              {/* Three.js Interactive WebGL Stage */}
              <div className="sim-viewport-dark relative h-[380px] sm:h-[420px] bg-[#05070e] overflow-hidden">
                <LandingHero3D
                  mode={heroMode}
                  harmonicDigit={previewDigit}
                  primaryColor={activeTheme.color}
                  secondaryColor={twinTheme.color}
                />

                {/* Sub-stage Switcher Controls */}
                <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 max-w-sm">
                  {HERO_3D_MODES.map((m) => {
                    const Icon = m.icon;
                    const isActive = heroMode === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setHeroMode(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md ${
                          isActive
                            ? "bg-cyan-500/25 border border-cyan-400 text-white shadow-md"
                            : "bg-slate-950/70 border border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className="w-3 h-3 text-cyan-400" />
                        <span>{m.label.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Harmonic Digit Selector (for Sacred Mode) */}
                {heroMode === "sacred" && (
                  <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-300">
                      Root:
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setPreviewDigit(n)}
                          className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            previewDigit === n
                              ? "text-white ring-2 ring-white scale-110"
                              : "bg-slate-900 text-slate-400 hover:text-white"
                          }`}
                          style={{
                            backgroundColor:
                              previewDigit === n
                                ? NUMBER_THEMES[n - 1].color
                                : undefined,
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      Orbit / Drag
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Quick Descriptor */}
              <div className="px-5 py-3 bg-[#0c101d] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span className="truncate">{activeHeroMeta.subtitle}</span>
                <span className="font-mono text-cyan-300 shrink-0">60 FPS WebGL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. WHAT OUR SOLUTION DOES: BRIDGING THEORY & INTUITION
         ===================================================================== */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-semibold">
            <LayersIcon className="w-3.5 h-3.5" />
            <span>The SimuLab Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Solve the Core Pain Points of STEM Education
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Memorizing formulas without understanding their physical or geometric meaning leads to fragile knowledge. SimuLab replaces rote recitation with direct, hands-on scientific discovery.
          </p>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-400/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
              <SlidersIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Dynamic Real-Time Manipulation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every simulation includes live sliders for gravity, mass, launch angle, damping, temperature, and wavelength. Change a parameter and watch trajectories, phase portraits, and energy graphs recalculate instantaneously.
            </p>
            <div className="pt-2 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              <span>Immediate visual feedback</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-purple-400/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300">
              <BookOpenIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Textbook Math Explained in Plain Words
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Equations are printed in real textbook typesetting (KaTeX) rather than cryptic programming code. Each formula is paired with a plain-language symbol legend explaining what every letter (<MathFormula inline formula={"v_{\\mathrm{rms}}, \\theta, k, P"} />) physically represents.
            </p>
            <div className="pt-2 text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              <span>Demystified mathematical symbols</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-400/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300">
              <SparklesAIIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Natural Language AI Experiment Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Describe an experiment in conversational English—such as firing a ball on the Moon or refracting light through diamond. Our mathematical engine interprets your prompt, assigns validated physical constants, and launches a ready-to-run lab.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              <span>Prompt-to-simulation generation</span>
            </div>
            {onLaunchBlueprint && (
              <div className="pt-1 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Instant AI Launch:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {AI_EXAMPLE_PROMPTS.slice(0, 2).map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() =>
                        onLaunchBlueprint(generateSimulationFromPrompt(sample.prompt))
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/25 text-emerald-300 hover:text-white transition-all text-left cursor-pointer"
                      title={`Run AI simulation: ${sample.prompt}`}
                    >
                      ⚡ {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. DUAL LABORATORIES SHOWCASE: MATHEMATICS & PHYSICS
         ===================================================================== */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <LabFlaskIcon className="w-3.5 h-3.5" />
              <span>Virtual Departments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Two Specialized Computational Laboratories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Dive into pure number theory and calculus, or investigate physical kinematics, celestial gravity, and thermodynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department 1: Visual Mathematics */}
          <div className="rounded-3xl border border-white/[0.1] bg-slate-900/60 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-400/30 text-purple-300">
                  <MathCompassIcon className="w-3.5 h-3.5" />
                  <span>Mathematics Laboratory</span>
                </span>
                <span className="text-xs font-mono text-slate-400">4 Active Solvers</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Geometry, Number Theory &amp; Dynamical Chaos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore modular arithmetic modulo 9 in 3D sacred geometry, drag tangent lines on dynamic functions, orbit fractal strange attractors, and drop thousands of Galton balls to estimate <MathFormula inline formula={"\\pi"} />.
              </p>

              {/* Module List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { title: "Vedic Square 3D", desc: "Modular mod-9 sacred symmetry & crystal towers", id: "vedic-square-3d" },
                  { title: "Calculus & Fourier", desc: "Tangents, Riemann sums vs Simpson quadrature", id: "calculus-fourier-lab" },
                  { title: "Lorenz Strange Attractor", desc: "RK4 deterministic chaos & 3D butterfly paths", id: "chaos-attractor-3d" },
                  { title: "Monte Carlo & Probability", desc: "Galton bell curve & unit circle quadrature", id: "probability-monte-carlo" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSimulation(item.id)}
                    className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-white/5 hover:border-purple-400/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateView("math-lab")}
              className="w-full py-3 rounded-xl text-xs font-bold bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Mathematics Experiments</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Department 2: Real-Time Physics */}
          <div className="rounded-3xl border border-white/[0.1] bg-slate-900/60 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                  <AtomPhysicsIcon className="w-3.5 h-3.5" />
                  <span>Physics Laboratory</span>
                </span>
                <span className="text-xs font-mono text-slate-400">6 Active Solvers</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Mechanics, Celestial Gravity &amp; Thermodynamics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Simulate aerodynamic drag across planetary gravities, trace laser rays through prisms, observe constructive ripple tank fringes, and compress molecular gases in a variable-volume piston.
              </p>

              {/* Module List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { title: "Ballistic Projectiles", desc: "Quadratic aerodynamic drag vs ideal vacuum", id: "projectile-ballistics" },
                  { title: "Double Pendulum", desc: "Coupled Lagrangian dynamics & phase portraits", id: "double-pendulum-lab" },
                  { title: "3D Orbital Mechanics", desc: "Kepler's laws, eccentric orbits & Vis-Viva speed", id: "orbital-gravity-3d" },
                  { title: "Wave Superposition", desc: "Two-source ripple tank & nodal cancellation", id: "wave-interference-3d" },
                  { title: "Geometric Optics", desc: "Snell's law, Total Internal Reflection & lenses", id: "optics-refraction-lens" },
                  { title: "Kinetic Gas Lab", desc: "Maxwell-Boltzmann distribution & PV=nRT", id: "thermodynamics-gas-lab" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSimulation(item.id)}
                    className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-white/5 hover:border-cyan-400/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateView("physics-lab")}
              className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Physics Experiments</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WHO SIMULAB IS FOR: STUDENTS, EDUCATORS, RESEARCHERS
         ===================================================================== */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
            <GraduationCapIcon className="w-3.5 h-3.5" />
            <span>Target Audiences</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored for Every Stage of Scientific Discovery
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether preparing for competitive examinations, leading a university laboratory session, or researching complex mathematical symmetries, SimuLab adapts to your depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUDIENCE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 space-y-4 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div className="space-y-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${card.accent}15`,
                      borderColor: `${card.accent}30`,
                      color: card.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs text-slate-400">
                  {card.bullets.map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. INTERACTIVE DIRECTORY & INSTANT LAUNCHER
         ===================================================================== */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <GridLibraryIcon className="w-3.5 h-3.5" />
              <span>Full Simulation Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Select and Launch Any Experiment
            </h2>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Labs (10)", icon: GridLibraryIcon },
              { id: "mathematics", label: "Mathematics (4)", icon: MathCompassIcon },
              { id: "physics", label: "Physics (6)", icon: AtomPhysicsIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = catalogFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCatalogFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md"
                      : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredSimulations.map((sim) => {
            const guide = getBeginnerGuide(sim.id);
            const isMath = sim.domain === "mathematics";
            return (
              <div
                key={sim.id}
                className="group rounded-2xl p-5 bg-slate-900/75 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-xl flex flex-col justify-between transition-all"
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
                      <span>{isMath ? "Mathematics" : "Physics"}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {sim.renderType}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {sim.title}
                  </h3>

                  {guide && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-cyan-200">
                      <LightbulbIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{guide.hook}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2">
                    {sim.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Difficulty: <strong className="text-slate-200">{sim.difficulty}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectSimulation(sim.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Launch</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          6. EXECUTIVE CALL TO ACTION BANNER
         ===================================================================== */}
      <section className="rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-br from-purple-950/40 via-slate-900/80 to-cyan-950/40 backdrop-blur-2xl shadow-2xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
            <SparklesAIIcon className="w-3.5 h-3.5" />
            <span>Ready to Experiment?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Step Inside the SimuLab Virtual Laboratory
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Choose an experiment or describe your scenario in plain English. Observe the beauty of physics and mathematics rendered in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onSelectSimulation("vedic-square-3d")}
            className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <Cube3DIcon className="w-4 h-4" />
            <span>Launch Flagship Simulation</span>
          </button>
          <button
            type="button"
            onClick={onOpenAIStudio}
            className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-950/80 hover:bg-slate-800 text-cyan-300 border border-white/15 flex items-center gap-2 cursor-pointer"
          >
            <SparklesAIIcon className="w-4 h-4" />
            <span>Ask AI to Generate a Model</span>
          </button>
        </div>
      </section>
    </div>
  );
}
