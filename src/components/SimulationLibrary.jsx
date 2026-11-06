import { useState, useMemo } from "react";
import { SIMULATION_CATALOG } from "../engine/simulationRegistry";
import { getBeginnerGuide } from "../engine/beginnerGuides";
import {
  GridLibraryIcon,
  MathCompassIcon,
  AtomPhysicsIcon,
  LightbulbIcon,
  ArrowRightIcon,
  SearchIcon,
} from "./Icons";
import { useLanguage } from "../i18n/LanguageContext";
import { getLocalizedSimulation } from "../i18n/simulationsI18n";

export default function SimulationLibrary({
  activeSimId,
  onSelectSimulation,
  initialDomain = "all",
}) {
  const { lang, t } = useLanguage();
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [searchQuery, setSearchQuery] = useState("");

  const domains = [
    { id: "all", label: t("library.allLabs"), icon: GridLibraryIcon },
    { id: "mathematics", label: t("library.mathLab"), icon: MathCompassIcon },
    { id: "physics", label: t("library.physicsLab"), icon: AtomPhysicsIcon },
  ];

  const mathCount = useMemo(
    () => SIMULATION_CATALOG.filter((s) => s.domain === "mathematics").length,
    []
  );
  const physicsCount = useMemo(
    () => SIMULATION_CATALOG.filter((s) => s.domain === "physics").length,
    []
  );

  const filteredSimulations = useMemo(() => {
    return SIMULATION_CATALOG.filter((baseSim) => {
      const matchesDomain =
        selectedDomain === "all" || baseSim.domain === selectedDomain;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesDomain;

      const sim = getLocalizedSimulation(baseSim, lang);
      return (
        matchesDomain &&
        (sim.title.toLowerCase().includes(q) ||
          baseSim.title.toLowerCase().includes(q) ||
          sim.category.toLowerCase().includes(q) ||
          sim.summary.toLowerCase().includes(q))
      );
    });
  }, [selectedDomain, searchQuery, lang]);

  return (
    <div className="space-y-6 text-start">
      {/* Library Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/75 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {domains.map((dom) => {
            const isSelected = selectedDomain === dom.id;
            const count =
              dom.id === "all"
                ? SIMULATION_CATALOG.length
                : dom.id === "mathematics"
                ? mathCount
                : physicsCount;
            const DomIcon = dom.icon;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => setSelectedDomain(dom.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
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
          <SearchIcon className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("library.searchPlaceholder")}
            aria-label={t("library.searchPlaceholder")}
            className="w-full ps-9 pe-3.5 py-2 rounded-xl bg-slate-950/90 border border-white/15 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Simulation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSimulations.map((baseSim) => {
          const sim = getLocalizedSimulation(baseSim, lang);
          const guide = getBeginnerGuide(sim.id, lang);
          const isSelected = activeSimId === sim.id;
          const isMath = sim.domain === "mathematics";

          return (
            <div
              key={sim.id}
              className={`group rounded-2xl p-5 bg-slate-900/75 backdrop-blur-xl border flex flex-col justify-between transition-all ${
                isSelected
                  ? "border-cyan-400/80 shadow-2xl shadow-cyan-500/15"
                  : "border-white/10 hover:border-white/25 shadow-xl"
              }`}
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

                  <span className="text-[11px] font-mono text-slate-400">
                    {sim.renderType}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {sim.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {sim.category}
                  </p>
                </div>

                {guide && (
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-cyan-200">
                    <LightbulbIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{guide.hook}</span>
                  </div>
                )}

                <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                  {sim.summary}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {t("library.difficulty")}: <strong className="text-slate-200">{sim.difficulty}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => onSelectSimulation(sim.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white"
                  }`}
                >
                  <span>{isSelected ? t("library.active") : t("landing.launch")}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSimulations.length === 0 && (
        <div className="rounded-2xl p-10 bg-slate-900/60 border border-white/10 text-center space-y-3">
          <p className="text-sm text-slate-300">
            {t("library.noResults")} <strong className="text-white">“{searchQuery}”</strong>.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            {t("library.clearSearch")}
          </button>
        </div>
      )}
    </div>
  );
}
