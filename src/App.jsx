import { useState, useMemo, useCallback, useEffect } from "react";
import VedicLogo from "./components/VedicLogo";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import VedicSquareSim from "./simulations/VedicSquareSim";
import UniversalSimRunner from "./simulations/UniversalSimRunner";
import SimulationLibrary from "./components/SimulationLibrary";
import AISimulationStudio from "./components/AISimulationStudio";
import { BeginnerGuideCard, FormulaCards } from "./components/EducationPanels";
import {
  SIMULATION_CATALOG,
  getSimulationById,
} from "./engine/simulationRegistry";

export default function App() {
  // Default to the welcoming Landing Page; Vedic Square 3D is the flagship default workspace simulation
  const [activeSimId, setActiveSimId] = useState("vedic-square-3d");
  const [activeView, setActiveView] = useState("home"); // "home" | "workspace" | "library" | "math-lab" | "physics-lab"
  const [showAIStudio, setShowAIStudio] = useState(false);
  const [externalParams, setExternalParams] = useState(null);
  const [lastBlueprint, setLastBlueprint] = useState(null);

  // Dark & Light theme state (persisted in localStorage)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("simulab-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    try {
      localStorage.setItem("simulab-theme", theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const currentSimulation = useMemo(
    () => getSimulationById(activeSimId),
    [activeSimId]
  );

  const handleSelectSimulation = useCallback((simId, customParams = null) => {
    setActiveSimId(simId);
    setExternalParams(
      customParams ? { ...customParams, _ts: Date.now() } : null
    );
    setActiveView("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLaunchBlueprint = useCallback((blueprint) => {
    if (!blueprint) return;
    setLastBlueprint(blueprint);
    setActiveSimId(blueprint.simulationId);
    setExternalParams({ ...blueprint.params, _ts: Date.now() });
    setActiveView("workspace");
    setShowAIStudio(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOpenAIStudio = useCallback(() => {
    setShowAIStudio((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen bg-[#05050a] bg-cosmic-grid text-slate-100 relative overflow-x-hidden transition-colors duration-300 ${
        isLight ? "light-theme" : "dark-theme"
      }`}
      style={{ "--active-color": currentSimulation.accentColor }}
    >
      {/* Ambient Radial Aura */}
      <div
        className={`pointer-events-none fixed top-[-180px] left-1/2 -translate-x-1/2 w-[920px] h-[420px] rounded-full blur-[150px] transition-colors duration-700 ${
          isLight ? "opacity-15" : "opacity-25"
        }`}
        style={{ backgroundColor: currentSimulation.accentColor }}
      />

      {/* Professional Sticky Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        activeSimId={activeSimId}
        currentSimulation={currentSimulation}
        onNavigateView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSelectSimulation={handleSelectSimulation}
        onOpenAIStudio={handleOpenAIStudio}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        {/* Workspace Sub-Toolbar: Only displayed when actively running an experiment */}
        {activeView === "workspace" && (
          <div className="mb-6 p-3 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: `${currentSimulation.accentColor}25`,
                  color: currentSimulation.accentColor,
                  border: `1px solid ${currentSimulation.accentColor}40`,
                }}
              >
                {currentSimulation.domain === "mathematics" ? "∑" : "⚛"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {currentSimulation.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400">
                    {currentSimulation.domain} • {currentSimulation.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Manipulate real-time parameters below to observe instantaneous recalculations.
                </p>
              </div>
            </div>

            {/* Quick Simulation Carousel in Workspace */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0 hidden sm:inline">
                Switch Lab:
              </span>
              {SIMULATION_CATALOG.map((sim) => {
                const isSelected = activeSimId === sim.id;
                return (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => handleSelectSimulation(sim.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-purple-500/25 text-white border-purple-400 shadow-sm"
                        : "bg-slate-950/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: sim.accentColor }}
                    />
                    <span>{sim.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapsible AI-Powered Simulation Generator Studio */}
        {showAIStudio && (
          <div className="mb-6">
            <AISimulationStudio
              onLaunchBlueprint={handleLaunchBlueprint}
              lastBlueprint={lastBlueprint}
            />
          </div>
        )}

        {/* Active AI Blueprint Banner (when an AI-generated experiment is active) */}
        {lastBlueprint &&
          activeView === "workspace" &&
          lastBlueprint.simulationId === activeSimId && (
            <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-cyan-400/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <span>✨ Active AI-Synthesized Experiment</span>
                  <span>•</span>
                  <span>Prompt: &ldquo;{lastBlueprint.prompt}&rdquo;</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  <strong className="text-amber-300">Hypothesis:</strong>{" "}
                  {lastBlueprint.hypothesis}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLastBlueprint(null)}
                className="text-xs text-slate-400 hover:text-white self-start md:self-center shrink-0"
              >
                Dismiss ✕
              </button>
            </div>
          )}

        {/* Main Content View Switcher */}
        {activeView === "home" && (
          <LandingPage
            onSelectSimulation={handleSelectSimulation}
            onNavigateView={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenAIStudio={handleOpenAIStudio}
            onLaunchBlueprint={handleLaunchBlueprint}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        {activeView === "library" && (
          <SimulationLibrary
            key="lib-all"
            activeSimId={activeSimId}
            onSelectSimulation={handleSelectSimulation}
            initialDomain="all"
          />
        )}

        {activeView === "math-lab" && (
          <SimulationLibrary
            key="lib-math"
            activeSimId={activeSimId}
            onSelectSimulation={handleSelectSimulation}
            initialDomain="mathematics"
          />
        )}

        {activeView === "physics-lab" && (
          <SimulationLibrary
            key="lib-physics"
            activeSimId={activeSimId}
            onSelectSimulation={handleSelectSimulation}
            initialDomain="physics"
          />
        )}

        {activeView === "workspace" && (
          <>
            {activeSimId === "vedic-square-3d" ? (
              <div className="space-y-6">
                <VedicSquareSim
                  key={`vedic-${externalParams?._ts || 0}`}
                  externalParams={externalParams}
                />

                {/* Beginner guide & textbook-style math for Vedic Square */}
                <BeginnerGuideCard
                  simId="vedic-square-3d"
                  accentColor={currentSimulation.accentColor}
                />

                <FormulaCards
                  formulas={currentSimulation.formulas}
                  title="The math behind it"
                  columns={3}
                />

                <div className="space-y-6">
                  <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                        The story behind it
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {currentSimulation.theory}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      {currentSimulation.presets.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() =>
                            setExternalParams({
                              ...preset.params,
                              _ts: Date.now(),
                            })
                          }
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-950/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <UniversalSimRunner
                key={`${currentSimulation.id}-${externalParams?._ts || 0}`}
                simulation={currentSimulation}
                externalParams={externalParams}
              />
            )}
          </>
        )}

        {/* Custom Creator Footer (Preserved from Vedic Square Project) */}
        <footer className="mt-10 pt-6 border-t border-white/10">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <VedicLogo
                primaryColor={currentSimulation.accentColor}
                secondaryColor="#38BDF8"
                number={9}
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Created by</span>
                  <a
                    href="https://badr-moujahid.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-white/30 underline-offset-4 hover:text-cyan-300 transition-colors"
                    style={{ color: currentSimulation.accentColor }}
                  >
                    Badr Moujahid
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  SimuLab — Interactive Mathematics &amp; Physics Simulation Platform (feat. Vedic Square 3D)
                </p>
              </div>
            </div>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://badr-moujahid.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Portfolio</span>
              </a>

              <a
                href="https://github.com/MojaveMix"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-white/30 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4 text-slate-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/badr-moujahid-54a118286/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-sky-400/50 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4 text-sky-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:badermouj@gmail.com"
                className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-pink-400/50 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4 text-pink-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>badermouj@gmail.com</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
