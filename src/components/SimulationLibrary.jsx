import { useState, useMemo } from "react";
import { LAB_DOMAINS, SIMULATION_CATALOG } from "../engine/simulationRegistry";
import { getBeginnerGuide } from "../engine/beginnerGuides";
import {
  GridLibraryIcon,
  MathCompassIcon,
  AtomPhysicsIcon,
  LightbulbIcon,
  ArrowRightIcon,
  SearchIcon,
} from "./Icons";

export default function SimulationLibrary({
  activeSimId,
  onSelectSimulation,
  initialDomain = "all",
}) {
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSimulations = useMemo(() => {
    return SIMULATION_CATALOG.filter((sim) => {
      const matchesDomain =
        selectedDomain === "all" || sim.domain === selectedDomain;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesDomain;
      return (
        matchesDomain &&
        (sim.title.toLowerCase().includes(q) ||
          sim.category.toLowerCase().includes(q) ||
          sim.summary.toLowerCase().includes(q))
      );
    });
  }, [selectedDomain, searchQuery]);

  const mathCount = useMemo(
    () => SIMULATION_CATALOG.filter((s) => s.domain === "mathematics").length,
    []
  );
  const physicsCount = useMemo(
    () => SIMULATION_CATALOG.filter((s) => s.domain === "physics").length,
    []
  );

  return (
    <div className="space-y-6">
      {/* Library Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/75 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {LAB_DOMAINS.map((dom) => {
            const isSelected = selectedDomain === dom.id;
            const count =
              dom.id === "all"
                ? SIMULATION_CATALOG.length
                : dom.id === "mathematics"
                ? mathCount
                : physicsCount;
            const DomIcon =
              dom.id === "all"
                ? GridLibraryIcon
                : dom.id === "mathematics"
                ? MathCompassIcon
                : AtomPhysicsIcon;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => setSelectedDomain(dom.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                  isSelected
                    ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <DomIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{dom.label}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <SearchIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search simulations, formulas, topics..."
            aria-label="Search simulations"
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950/90 border border-white/15 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Simulation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSimulations.map((sim) => {
          const isCurrent = sim.id === activeSimId;
          const isMath = sim.domain === "mathematics";
          return (
            <div
              key={sim.id}
              className={`group rounded-2xl p-5 bg-slate-900/75 backdrop-blur-xl border transition-all flex flex-col justify-between ${
                isCurrent
                  ? "border-cyan-400/70 ring-1 ring-cyan-400/40 shadow-2xl"
                  : "border-white/10 hover:border-white/25 shadow-xl"
              }`}
            >
              <div>
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
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

                {/* Title & Category */}
                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {sim.title}
                </h3>
                <div className="text-xs font-medium text-cyan-400/90 mt-0.5">
                  {sim.category}
                </div>

                <p className="text-xs text-slate-300/90 mt-2.5 leading-relaxed">
                  {sim.summary}
                </p>

                {/* Plain-language hook instead of raw equation text */}
                {getBeginnerGuide(sim.id) && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/90 border border-white/5 text-xs text-cyan-200 flex items-start gap-2">
                    <LightbulbIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{getBeginnerGuide(sim.id).hook}</span>
                  </div>
                )}
              </div>

              {/* Card Footer & Launch Button */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Level: <strong className="text-slate-200">{sim.difficulty}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onSelectSimulation(sim.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-emerald-500/20 border border-emerald-400/60 text-emerald-200"
                      : "bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white"
                  }`}
                >
                  <span>{isCurrent ? "Active in Lab" : "Launch Simulation"}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
