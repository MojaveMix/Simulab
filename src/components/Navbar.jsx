import { useState, useRef, useEffect } from "react";
import VedicLogo from "./VedicLogo";
import {
  HomeIcon,
  LabFlaskIcon,
  MathCompassIcon,
  AtomPhysicsIcon,
  GridLibraryIcon,
  SparklesAIIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "./Icons";
import { SIMULATION_CATALOG } from "../engine/simulationRegistry";

export default function Navbar({
  activeView,
  activeSimId,
  currentSimulation,
  onNavigateView,
  onSelectSimulation,
  onOpenAIStudio,
  theme,
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simDropdownOpen, setSimDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLight = theme === "light";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSimDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "math-lab", label: "Mathematics", icon: MathCompassIcon },
    { id: "physics-lab", label: "Physics", icon: AtomPhysicsIcon },
    { id: "library", label: "Laboratories", icon: GridLibraryIcon, count: 10 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b transition-colors duration-300 backdrop-blur-xl bg-[#05050a]/85 border-white/[0.08] light-nav">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onNavigateView("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            title="SimuLab — Home"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <VedicLogo
                primaryColor={currentSimulation?.accentColor || "#A855F7"}
                secondaryColor="#38BDF8"
                number={activeSimId === "vedic-square-3d" ? 9 : "∑"}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  SimuLab
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                  Platform 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight hidden md:block">
                Interactive Science &amp; Simulation Engine
              </p>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-white/[0.06] text-xs font-semibold"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateView(item.id)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/[0.12] text-white shadow-sm border border-white/[0.12]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.count && (
                  <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-[10px] font-mono text-slate-300">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Simulation Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setSimDropdownOpen(!simDropdownOpen)}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                simDropdownOpen || activeView === "workspace"
                  ? "text-cyan-300 bg-cyan-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <LabFlaskIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulations</span>
              <ChevronDownIcon
                className={`w-3 h-3 transition-transform ${simDropdownOpen ? "rotate-180 text-cyan-300" : ""}`}
              />
            </button>

            {simDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl p-2 z-50 text-left space-y-1 light-nav-menu">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select a Scientific Simulation
                </div>
                <div className="max-h-80 overflow-y-auto space-y-1 pr-1 custom-scroll">
                  {SIMULATION_CATALOG.map((sim) => {
                    const isSelected = activeSimId === sim.id && activeView === "workspace";
                    return (
                      <button
                        key={sim.id}
                        type="button"
                        onClick={() => {
                          onSelectSimulation(sim.id);
                          setSimDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-purple-500/20 text-white border border-purple-400/40"
                            : "hover:bg-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold truncate">{sim.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {sim.category}
                          </div>
                        </div>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: sim.accentColor }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Generator Link */}
          <button
            type="button"
            onClick={onOpenAIStudio}
            className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <SparklesAIIcon className="w-3.5 h-3.5" />
            <span>AI Studio</span>
          </button>
        </nav>

        {/* Right CTA & Utility Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Quick Launch Workspace Button */}
          <button
            type="button"
            onClick={() => onNavigateView("workspace")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              activeView === "workspace"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20"
                : "bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.12]"
            }`}
          >
            <LabFlaskIcon className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">
              {activeView === "workspace" ? "Active Lab" : "Open Lab"}
            </span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Dark or Light Mode"
            title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
            className="w-9 h-9 rounded-xl border border-white/[0.1] bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          >
            {isLight ? (
              <MoonIcon className="w-4 h-4 text-purple-400" />
            ) : (
              <SunIcon className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-9 h-9 rounded-xl border border-white/[0.1] bg-slate-900/60 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5 text-white" />
            ) : (
              <MenuIcon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#090d16] px-4 py-4 space-y-3 light-nav-menu">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigateView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold text-left transition-all ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                      : "bg-slate-900 text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex gap-2">
            <button
              type="button"
              onClick={() => {
                onNavigateView("workspace");
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <LabFlaskIcon className="w-4 h-4" />
              <span>Enter Active Lab</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenAIStudio();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold flex items-center justify-center gap-2"
            >
              <SparklesAIIcon className="w-4 h-4" />
              <span>AI Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
