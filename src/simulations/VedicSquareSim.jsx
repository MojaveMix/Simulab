import { useState, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import VedicScene from "../components/VedicScene";
import Matrix2D from "../components/Matrix2D";
import VedicLogo from "../components/VedicLogo";
import {
  NUMBER_THEMES,
  PATTERN_MODES,
  WAVE_MODES,
  buildVedicSquare,
  computeConnections,
  getDigitalRootBreakdown,
} from "../utils/vedicMath";
import { useLanguage } from "../i18n/LanguageContext";
import {
  getLocalizedVedicTheme,
  getLocalizedPatternMode,
  getLocalizedWaveMode,
} from "../i18n/simulationsI18n";

const SYMMETRY_PAIRS = [
  { n: 1 },
  { n: 2 },
  { n: 3 },
  { n: 4 },
  { n: 9 },
];

function getLocalizedSymmetryPairLabel(n, lang) {
  if (lang === "fr") {
    switch (n) {
      case 1: return "1 ↔ 8 Monade";
      case 2: return "2 ↔ 7 Étoile";
      case 3: return "3 ↔ 6 Triade";
      case 4: return "4 ↔ 5 Octogone";
      case 9: return "9 Suprême";
      default: return "";
    }
  }
  if (lang === "ar") {
    switch (n) {
      case 1: return "1 ↔ 8 الأحادية";
      case 2: return "2 ↔ 7 النجمة";
      case 3: return "3 ↔ 6 الثلاثية";
      case 4: return "4 ↔ 5 الثماني";
      case 9: return "9 السيادية";
      default: return "";
    }
  }
  switch (n) {
    case 1: return "1 ↔ 8 Monad";
    case 2: return "2 ↔ 7 Star";
    case 3: return "3 ↔ 6 Triad";
    case 4: return "4 ↔ 5 Octagon";
    case 9: return "9 Supreme";
    default: return "";
  }
}

export default function VedicSquareSim({ externalParams }) {
  const { lang, t } = useLanguage();

  const [number, setNumber] = useState(() => externalParams?.number ?? 5);
  const [patternMode, setPatternMode] = useState(
    () => externalParams?.patternMode ?? "constellation"
  );
  const [waveMode, setWaveMode] = useState(
    () => externalParams?.waveMode ?? "ripple"
  );
  const [showLines, setShowLines] = useState(
    () => externalParams?.showLines ?? true
  );
  const [showPulses, setShowPulses] = useState(
    () => externalParams?.showPulses ?? true
  );
  const [showCrystals, setShowCrystals] = useState(
    () => externalParams?.showCrystals ?? true
  );
  const [showDual, setShowDual] = useState(
    () => externalParams?.showDual ?? false
  );

  const [lineThickness, setLineThickness] = useState(
    () => externalParams?.lineThickness ?? 1.1
  );
  const [animationSpeed, setAnimationSpeed] = useState(
    () => externalParams?.animationSpeed ?? 1.0
  );
  const [elevationScale, setElevationScale] = useState(
    () => externalParams?.elevationScale ?? 1.0
  );

  const [autoCycle, setAutoCycle] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraPreset, setCameraPreset] = useState("isometric");
  const [presetTrigger, setPresetTrigger] = useState(0);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Build 9x9 Vedic Square once
  const { cells } = useMemo(() => buildVedicSquare(9), []);

  const basePrimaryTheme = NUMBER_THEMES[number - 1] || NUMBER_THEMES[4];
  const complementNumber = basePrimaryTheme.complement;
  const baseComplementTheme =
    NUMBER_THEMES[complementNumber - 1] || NUMBER_THEMES[3];

  const primaryTheme = useMemo(
    () => getLocalizedVedicTheme(basePrimaryTheme, lang),
    [basePrimaryTheme, lang]
  );
  const complementTheme = useMemo(
    () => getLocalizedVedicTheme(baseComplementTheme, lang),
    [baseComplementTheme, lang]
  );

  // Auto-cycle through numbers 1..9 when Tour Mode is active
  useEffect(() => {
    if (!autoCycle) return undefined;
    const timer = setInterval(() => {
      setNumber((prev) => (prev % 9) + 1);
    }, 2600);
    return () => clearInterval(timer);
  }, [autoCycle]);

  // Keyboard shortcuts: 1-9 for numbers, Space for auto-cycle, D for dual mode, T for top view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "SELECT"
      )
        return;
      if (e.key >= "1" && e.key <= "9") {
        setNumber(Number(e.key));
      } else if (e.code === "Space") {
        e.preventDefault();
        setAutoCycle((prev) => !prev);
      } else if (e.key.toLowerCase() === "d") {
        setShowDual((prev) => !prev);
      } else if (e.key.toLowerCase() === "t") {
        setCameraPreset((prev) => (prev === "top" ? "isometric" : "top"));
        setPresetTrigger((c) => c + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Collect active cells with elevated 3D anchor coordinates
  const activeCells = useMemo(() => {
    const beamY = 0.85 + elevationScale * 0.28;
    return cells
      .filter((cell) => cell.value === number)
      .map((cell) => ({
        ...cell,
        position: new THREE.Vector3(cell.x, beamY, cell.z),
      }));
  }, [cells, number, elevationScale]);

  // Collect complementary cells when Dual Symmetry mode is active
  const complementCells = useMemo(() => {
    if (!showDual || complementNumber === number) return [];
    const beamY = 0.72 + elevationScale * 0.22;
    return cells
      .filter((cell) => cell.value === complementNumber)
      .map((cell) => ({
        ...cell,
        position: new THREE.Vector3(cell.x, beamY, cell.z),
      }));
  }, [cells, showDual, complementNumber, number, elevationScale]);

  // Precompute 3D + 2D geometric connections
  const connections = useMemo(() => {
    if (!showLines) return [];
    const primaryConns = computeConnections(
      activeCells,
      patternMode,
      primaryTheme.beamColor,
      false
    );
    if (!showDual || complementCells.length === 0) {
      return primaryConns;
    }
    const secondaryConns = computeConnections(
      complementCells,
      patternMode,
      complementTheme.beamColor,
      true
    );
    return [...primaryConns, ...secondaryConns];
  }, [
    showLines,
    activeCells,
    complementCells,
    patternMode,
    primaryTheme,
    complementTheme,
    showDual,
  ]);

  // Formula breakdown for hovered cell or sample active cell
  const formulaBreakdown = useMemo(() => {
    if (hoveredCell) {
      return getDigitalRootBreakdown(hoveredCell.row, hoveredCell.col);
    }
    const sample = activeCells[Math.floor(activeCells.length / 2)] || {
      row: number,
      col: 1,
    };
    return getDigitalRootBreakdown(sample.row, sample.col);
  }, [hoveredCell, activeCells, number]);

  // Sequence of 9 digital roots for row = active number
  const rowSequence = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) =>
        getDigitalRootBreakdown(number, i + 1)
      ),
    [number]
  );

  const handleCameraSelect = useCallback((preset) => {
    setCameraPreset(preset);
    setPresetTrigger((c) => c + 1);
  }, []);

  const handleSelectCell = useCallback((cell) => {
    if (cell && cell.value) {
      setNumber(cell.value);
    }
  }, []);

  const handleReset = useCallback(() => {
    setNumber(5);
    setPatternMode("constellation");
    setWaveMode("ripple");
    setShowLines(true);
    setShowPulses(true);
    setShowCrystals(true);
    setShowDual(false);
    setLineThickness(1.1);
    setAnimationSpeed(1.0);
    setElevationScale(1.0);
    setAutoCycle(false);
    setAutoRotate(false);
    setCameraPreset("isometric");
    setPresetTrigger((c) => c + 1);
  }, []);

  const colorsGradient = useMemo(
    () => NUMBER_THEMES.map((th) => th.color).join(", "),
    []
  );

  const cameraOptions = useMemo(
    () => [
      { id: "isometric", label: t("vedic.camIso") },
      { id: "top", label: t("vedic.camTop") },
      { id: "front", label: t("vedic.camFront") },
      { id: "side", label: t("vedic.camSide") },
    ],
    [t]
  );

  return (
    <div style={{ "--active-color": primaryTheme.color }} className="space-y-6">
      {/* Simulation Sub-Header & Quick Action Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-900/75 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <VedicLogo
            primaryColor={primaryTheme.color}
            secondaryColor={complementTheme.color}
            number={number}
          />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t("vedic.title")}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("vedic.engineBadge")}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t("vedic.subTitle")}
            </p>
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoCycle((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              autoCycle
                ? "bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-lg shadow-amber-500/10"
                : "bg-slate-950/80 border-white/10 text-slate-300 hover:bg-slate-800 hover:border-white/20"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                autoCycle ? "bg-amber-400 animate-ping" : "bg-slate-500"
              }`}
            />
            {autoCycle ? t("vedic.cyclingPause") : t("vedic.autoCycle")}
          </button>

          <button
            type="button"
            onClick={() => setShowDual((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              showDual
                ? "bg-purple-500/20 border-purple-400/60 text-purple-200 shadow-lg shadow-purple-500/10"
                : "bg-slate-950/80 border-white/10 text-slate-300 hover:bg-slate-800 hover:border-white/20"
            }`}
          >
            <span>✦</span>
            {t("vedic.dualSymmetry", { n: number, c: complementNumber })}
          </button>

          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              autoRotate
                ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-200 shadow-lg shadow-cyan-500/10"
                : "bg-slate-950/80 border-white/10 text-slate-300 hover:bg-slate-800 hover:border-white/20"
            }`}
          >
            <span>↻</span>
            {autoRotate ? t("vedic.orbiting") : t("vedic.autoOrbit")}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title={t("vedic.resetTitle")}
          >
            {t("vedic.reset")}
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Control Sidebar (4 columns on xl) */}
        <div className="xl:col-span-4 space-y-5">
          {/* Card 1: Digital Root Selector */}
          <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t("vedic.activeDigitalRoot")}
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  color: primaryTheme.accent,
                  borderColor: `${primaryTheme.color}55`,
                  backgroundColor: `${primaryTheme.color}18`,
                }}
              >
                {primaryTheme.name}
              </span>
            </div>

            {/* Number Display & Range Slider */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-black tracking-tight"
                    style={{ color: primaryTheme.color }}
                  >
                    {number}
                  </span>
                  <span className="text-xs text-slate-400">
                    {primaryTheme.symmetryPair}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {activeCells.length} {t("vedic.nodes")}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="9"
                value={number}
                aria-label="Active Number"
                onChange={(e) => setNumber(parseInt(e.target.value, 10))}
                className="w-full vedic-slider cursor-pointer"
                dir="ltr"
                style={{
                  background: `linear-gradient(to right, ${colorsGradient})`,
                }}
              />
            </div>

            {/* 1-9 Direct Number Buttons */}
            <div className="grid grid-cols-9 gap-1.5 mb-4">
              {NUMBER_THEMES.map((theme) => {
                const isSelected = number === theme.number;
                const isTwin =
                  showDual &&
                  complementNumber === theme.number &&
                  complementNumber !== number;
                return (
                  <button
                    key={theme.number}
                    type="button"
                    onClick={() => setNumber(theme.number)}
                    className={`h-10 rounded-xl font-bold text-sm transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                      isSelected
                        ? "scale-105 text-white shadow-lg ring-2 ring-cyan-400 keep-white"
                        : isTwin
                        ? "text-white ring-1 ring-dashed ring-white/70 keep-white"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                    style={{
                      backgroundColor:
                        isSelected || isTwin ? theme.color : undefined,
                      boxShadow: isSelected
                        ? `0 0 16px ${theme.color}88`
                        : undefined,
                    }}
                  >
                    {theme.number}
                  </button>
                );
              })}
            </div>

            {/* Famous Vedic Mirror Pairs Quick-Select */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[11px] font-medium text-slate-400 mb-2">
                {t("vedic.sacredPairs")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SYMMETRY_PAIRS.map((pair) => {
                  const isPairActive =
                    number === pair.n ||
                    number === NUMBER_THEMES[pair.n - 1].complement;
                  return (
                    <button
                      key={pair.n}
                      type="button"
                      onClick={() => {
                        setNumber(pair.n);
                        if (pair.n !== 9) setShowDual(true);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border cursor-pointer ${
                        isPairActive
                          ? "bg-white/15 border-white/30 text-white"
                          : "bg-slate-800/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {getLocalizedSymmetryPairLabel(pair.n, lang)}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Card 2: Geometry & Animation Engine Controls */}
          <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {t("vedic.geometryEngine")}
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                {connections.length} {t("vedic.beams")}
              </span>
            </div>

            {/* Pattern Topology Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                {t("vedic.connectionTopology")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PATTERN_MODES.map((mode) => {
                  const locMode = getLocalizedPatternMode(mode, lang);
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPatternMode(mode.id)}
                      className={`p-2.5 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                        patternMode === mode.id
                          ? "bg-cyan-500/15 border-cyan-400/60 text-white shadow-md"
                          : "bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                      }`}
                    >
                      <div className="text-xs font-bold">{locMode.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {locMode.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Pillar Wave Mode */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                {t("vedic.pillarWaveMotion")}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {WAVE_MODES.map((wm) => {
                  const locWm = getLocalizedWaveMode(wm, lang);
                  return (
                    <button
                      key={wm.id}
                      type="button"
                      onClick={() => setWaveMode(wm.id)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        waveMode === wm.id
                          ? "bg-white/15 border-white/40 text-white"
                          : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {locWm.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Effect Toggles */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowLines((v) => !v)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  showLines
                    ? "bg-emerald-500/15 border-emerald-400/50 text-emerald-200"
                    : "bg-slate-950/60 border-white/5 text-slate-400"
                }`}
              >
                <span>{t("vedic.connectionLines")}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    showLines ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setShowPulses((v) => !v)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  showPulses && showLines
                    ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-200"
                    : "bg-slate-950/60 border-white/5 text-slate-400"
                }`}
              >
                <span>{t("vedic.photonPulses")}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    showPulses && showLines ? "bg-cyan-400" : "bg-slate-600"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setShowCrystals((v) => !v)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  showCrystals
                    ? "bg-pink-500/15 border-pink-400/50 text-pink-200"
                    : "bg-slate-950/60 border-white/5 text-slate-400"
                }`}
              >
                <span>{t("vedic.nodeCrystals")}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    showCrystals ? "bg-pink-400" : "bg-slate-600"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setShowDual((v) => !v)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  showDual
                    ? "bg-purple-500/15 border-purple-400/50 text-purple-200"
                    : "bg-slate-950/60 border-white/5 text-slate-400"
                }`}
              >
                <span>{t("vedic.nineComplement")}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    showDual ? "bg-purple-400" : "bg-slate-600"
                  }`}
                />
              </button>
            </div>

            {/* Precision Sliders */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t("vedic.beamThickness")}</span>
                  <span className="font-mono text-slate-200" dir="ltr">
                    {lineThickness.toFixed(1)}×
                  </span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.1"
                  value={lineThickness}
                  onChange={(e) => setLineThickness(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  dir="ltr"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t("vedic.animationSpeed")}</span>
                  <span className="font-mono text-slate-200" dir="ltr">
                    {animationSpeed.toFixed(1)}×
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  dir="ltr"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t("vedic.pillarElevation")}</span>
                  <span className="font-mono text-slate-200" dir="ltr">
                    {elevationScale.toFixed(1)}×
                  </span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.0"
                  step="0.1"
                  value={elevationScale}
                  onChange={(e) => setElevationScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  dir="ltr"
                />
              </div>
            </div>
          </section>

          {/* Card 3: Live Digital Root Formula Inspector */}
          <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t("vedic.inspector")}
              </h3>
              <span className="text-[11px] text-cyan-400 font-mono">
                {hoveredCell ? t("vedic.liveHover") : t("vedic.activeSample")}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-sm">
              <div className="flex items-center justify-between text-slate-300">
                <span>
                  {t("vedic.rowColProduct", {
                    row: formulaBreakdown.row,
                    col: formulaBreakdown.col,
                    product: formulaBreakdown.product,
                  })}
                </span>
                <span className="text-slate-400 font-mono" dir="ltr">
                  = {formulaBreakdown.product}
                </span>
              </div>

              {formulaBreakdown.steps.length > 0 ? (
                <div className="mt-2 pt-2 border-t border-white/5 space-y-1 text-xs text-slate-400">
                  {formulaBreakdown.steps.map((step, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {t("vedic.stepN", { step: idx + 1 })} {step.expression}
                      </span>
                      <span className="text-slate-200 font-bold" dir="ltr">
                        = {step.result}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-white/5 text-xs text-slate-500">
                  {t("vedic.singleDigit")}
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {t("vedic.digitalRoot")}
                </span>
                <span
                  className="text-lg font-black px-2.5 py-0.5 rounded-lg"
                  style={{
                    color: NUMBER_THEMES[formulaBreakdown.root - 1].color,
                    backgroundColor: `${
                      NUMBER_THEMES[formulaBreakdown.root - 1].color
                    }20`,
                  }}
                >
                  {formulaBreakdown.root}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Viewport & Analytical Matrix (8 columns on xl) */}
        <div className="xl:col-span-8 space-y-6">
          {/* 3D Interactive Canvas Container */}
          <div
            className="sim-viewport-dark relative w-full h-[560px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#05070e]"
            style={{
              boxShadow: `0 20px 60px -15px ${primaryTheme.color}25`,
            }}
          >
            {/* Top-Left HUD Overlay */}
            <div className="pointer-events-none absolute top-3 left-3 right-3 sm:right-auto sm:top-4 sm:left-4 rtl:sm:left-auto rtl:sm:right-4 z-20 sm:max-w-sm bg-slate-950/75 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: primaryTheme.color,
                    boxShadow: `0 0 10px ${primaryTheme.color}`,
                  }}
                />
                <span className="font-bold text-sm text-white">
                  {primaryTheme.name}
                </span>
                {showDual && complementNumber !== number && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${complementTheme.color}30`,
                      color: complementTheme.accent,
                    }}
                  >
                    + {complementTheme.name}
                  </span>
                )}
              </div>
              <p className="hidden sm:block text-xs text-slate-300/90 mt-1.5 leading-relaxed">
                {primaryTheme.description}
              </p>

              {/* Live Telemetry Pills */}
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/10 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  {t("vedic.activeCells")}{" "}
                  <strong className="text-white">{activeCells.length}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  {t("vedic.connections")}{" "}
                  <strong className="text-white">{connections.length}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  {t("vedic.photons")}{" "}
                  <strong className="text-cyan-300">
                    {showLines && showPulses ? connections.length * 2 : 0}
                  </strong>
                </span>
              </div>
            </div>

            {/* Top-Right Camera Preset Bar */}
            <div className="absolute bottom-14 right-3 sm:bottom-auto sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 rtl:sm:left-4 z-20 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
              {cameraOptions.map((cam) => (
                <button
                  key={cam.id}
                  type="button"
                  onClick={() => handleCameraSelect(cam.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    cameraPreset === cam.id
                      ? "bg-white text-slate-950 shadow"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>

            {/* Bottom Controls Hint Bar */}
            <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span>{t("vedic.controlsHint")}</span>
              <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                {t("vedic.keysHint")}
              </span>
            </div>

            {/* Three.js WebGL Scene */}
            <VedicScene
              cells={cells}
              activeNumber={number}
              complementNumber={complementNumber}
              showDual={showDual}
              showLines={showLines}
              showPulses={showPulses}
              showCrystals={showCrystals}
              primaryTheme={primaryTheme}
              complementTheme={complementTheme}
              connections={connections}
              lineThickness={lineThickness}
              animationSpeed={animationSpeed}
              elevationScale={elevationScale}
              waveMode={waveMode}
              cameraPreset={cameraPreset}
              presetTrigger={presetTrigger}
              autoRotate={autoRotate}
              hoveredCell={hoveredCell}
              onHoverCell={setHoveredCell}
              onSelectCell={handleSelectCell}
            />
          </div>

          {/* Bottom Analytical Row: 2D Interactive Matrix + Harmonic Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 2D Vedic Square Map with SVG Overlay (6 cols) */}
            <div className="md:col-span-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {t("vedic.matrixOverlay")}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t("vedic.matrixHint")}
                  </p>
                </div>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-lg border"
                  style={{
                    color: primaryTheme.accent,
                    borderColor: `${primaryTheme.color}40`,
                    backgroundColor: `${primaryTheme.color}15`,
                  }}
                >
                  {t("vedic.grid9x9")}
                </span>
              </div>

              <Matrix2D
                cells={cells}
                activeNumber={number}
                complementNumber={complementNumber}
                showDual={showDual}
                showLines={showLines}
                primaryTheme={primaryTheme}
                complementTheme={complementTheme}
                connections={connections}
                hoveredCell={hoveredCell}
                onHoverCell={setHoveredCell}
                onSelectCell={handleSelectCell}
              />
            </div>

            {/* Digital Root Wave & Modular Cycle Analysis (6 cols) */}
            <div className="md:col-span-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {t("vedic.harmonicRow", { number })}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {t("vedic.harmonicDesc")}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">
                    {t("vedic.mod9Cycle")}
                  </span>
                </div>

                {/* Bar chart of the 9 digital roots in row `number` */}
                <div className="grid grid-cols-9 gap-2 items-end h-36 pt-6 pb-2 px-3 bg-slate-950/70 rounded-xl border border-white/5">
                  {rowSequence.map((item) => {
                    const heightPct = Math.round((item.root / 9) * 100);
                    const barTheme = NUMBER_THEMES[item.root - 1];
                    return (
                      <div
                        key={item.col}
                        className="flex flex-col items-center h-full justify-end group cursor-pointer"
                        onClick={() => setNumber(item.root)}
                        title={`${number} × ${item.col} = ${item.product} → Digital Root ${item.root}`}
                      >
                        <span className="text-[11px] font-bold text-white mb-1">
                          {item.root}
                        </span>
                        <div
                          className="w-full rounded-t-md transition-all duration-300 group-hover:brightness-125"
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: barTheme.color,
                            boxShadow: `0 0 10px ${barTheme.color}55`,
                          }}
                        />
                        <span className="text-[10px] font-mono text-slate-500 mt-1.5" dir="ltr">
                          ×{item.col}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How to Use / Guide Cards */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {t("vedic.interactiveGuide")}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="font-semibold text-white mb-0.5">
                      {t("vedic.guideStep1Title")}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {t("vedic.guideStep1Desc")}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="font-semibold text-white mb-0.5">
                      {t("vedic.guideStep2Title")}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {t("vedic.guideStep2Desc")}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="font-semibold text-white mb-0.5">
                      {t("vedic.guideStep3Title")}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {t("vedic.guideStep3Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
