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
  SearchIcon,
  GlobeIcon,
  HeartIcon,
} from "./Icons";
import { SIMULATION_CATALOG } from "../engine/simulationRegistry";
import { useLanguage } from "../i18n/LanguageContext";
import { getLocalizedSimulation } from "../i18n/simulationsI18n";

export default function Navbar({
  activeView,
  activeSimId,
  currentSimulation,
  onNavigateView,
  onSelectSimulation,
  onOpenAIStudio,
  onOpenSearch,
  onOpenDonate,
  theme,
  onToggleTheme,
}) {
  const { lang, setLang, t, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSimsOpen, setMobileSimsOpen] = useState(false);
  const [simDropdownOpen, setSimDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const isLight = theme === "light";
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Close dropdowns & mobile drawer on outside click, Escape key, or desktop resize
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSimDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSimDropdownOpen(false);
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { id: "home", label: t("nav.home"), icon: HomeIcon },
    { id: "math-lab", label: t("nav.mathematics"), icon: MathCompassIcon },
    { id: "physics-lab", label: t("nav.physics"), icon: AtomPhysicsIcon },
    {
      id: "library",
      label: t("nav.laboratories"),
      icon: GridLibraryIcon,
      count: SIMULATION_CATALOG.length,
    },
  ];

  const utilityBtnClass = isLight
    ? "border-slate-200/90 bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 hover:text-slate-950"
    : "border-white/[0.1] bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white";

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 backdrop-blur-xl light-nav ${
        isLight
          ? "bg-white/95 border-slate-200/90 text-slate-900 shadow-sm shadow-slate-900/[0.04]"
          : "bg-[#05050a]/90 border-white/[0.08] text-slate-100"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => {
              onNavigateView("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            title="SimuLab"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <VedicLogo
                primaryColor={currentSimulation?.accentColor || "#A855F7"}
                secondaryColor="#38BDF8"
                number={activeSimId === "vedic-square-3d" ? 9 : "∑"}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg font-black tracking-tight whitespace-nowrap transition-colors ${
                    isLight
                      ? "text-slate-900 group-hover:text-cyan-600"
                      : "text-white group-hover:text-cyan-400"
                  }`}
                >
                  SimuLab
                </span>
                <span
                  className={`hidden 2xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap border ${
                    isLight
                      ? "bg-cyan-50 border-cyan-300/80 text-cyan-700"
                      : "bg-cyan-500/10 border-cyan-400/20 text-cyan-300"
                  }`}
                >
                  {t("nav.platformVersion")}
                </span>
              </div>
              <p
                className={`text-[11px] tracking-tight hidden 2xl:block truncate max-w-[200px] ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {t("nav.brandSubtitle")}
              </p>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className={`hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-2xl border text-xs font-semibold shrink-0 ${
            isLight
              ? "bg-slate-100/90 border-slate-200/90"
              : "bg-slate-900/60 border-white/[0.06]"
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateView(item.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? isLight
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/90"
                      : "bg-white/[0.12] text-white shadow-sm border border-white/[0.12]"
                    : isLight
                    ? "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  className={`hidden xl:block w-3.5 h-3.5 shrink-0 ${
                    isActive
                      ? isLight
                        ? "text-cyan-600"
                        : "text-cyan-400"
                      : isLight
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
                {item.count && (
                  <span
                    className={`hidden 2xl:inline-block px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      isLight
                        ? "bg-slate-200/80 text-slate-700"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
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
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                simDropdownOpen || activeView === "workspace"
                  ? isLight
                    ? "text-cyan-700 bg-cyan-50 border border-cyan-200"
                    : "text-cyan-300 bg-cyan-500/10"
                  : isLight
                  ? "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <LabFlaskIcon
                className={`hidden xl:block w-3.5 h-3.5 shrink-0 ${
                  isLight ? "text-cyan-600" : "text-cyan-400"
                }`}
              />
              <span>{t("nav.simulations")}</span>
              <ChevronDownIcon
                className={`w-3 h-3 shrink-0 transition-transform ${
                  simDropdownOpen
                    ? isLight
                      ? "rotate-180 text-cyan-700"
                      : "rotate-180 text-cyan-300"
                    : ""
                }`}
              />
            </button>

            {simDropdownOpen && (
              <div
                className={`absolute top-full left-0 mt-2 w-80 rounded-2xl border shadow-2xl p-2 z-50 text-left space-y-1 light-nav-menu ${
                  isLight
                    ? "bg-white border-slate-200 shadow-slate-900/15"
                    : "bg-[#090d16] border-white/10"
                }`}
              >
                <div
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t("nav.selectSimulation")}
                </div>
                <div className="max-h-80 overflow-y-auto space-y-1 pr-1 custom-scroll">
                  {SIMULATION_CATALOG.map((baseSim) => {
                    const sim = getLocalizedSimulation(baseSim, lang);
                    const isSelected =
                      activeSimId === sim.id && activeView === "workspace";
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
                            ? isLight
                              ? "bg-purple-50 text-purple-950 border border-purple-300"
                              : "bg-purple-500/20 text-white border border-purple-400/40"
                            : isLight
                            ? "hover:bg-slate-100 text-slate-700 hover:text-slate-950"
                            : "hover:bg-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold truncate">
                            {sim.title}
                          </div>
                          <div
                            className={`text-[10px] truncate ${
                              isLight ? "text-slate-500" : "text-slate-400"
                            }`}
                          >
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
            className={`px-2.5 xl:px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              isLight
                ? "text-cyan-700 hover:text-cyan-950 hover:bg-cyan-50"
                : "text-cyan-300 hover:text-white hover:bg-cyan-500/10"
            }`}
          >
            <SparklesAIIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{t("nav.aiStudio")}</span>
          </button>
        </nav>

        {/* Right CTA & Utility Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Lesson search (Ctrl+K) */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t("nav.searchLessons")}
            title={`${t("nav.searchLessons")} (${t("nav.searchKbd")})`}
            className={`h-9 w-9 2xl:w-auto 2xl:px-3 rounded-xl border flex items-center justify-center gap-2 text-xs transition-all cursor-pointer shrink-0 ${utilityBtnClass}`}
          >
            <SearchIcon
              className={`w-4 h-4 shrink-0 ${
                isLight ? "text-cyan-600" : "text-cyan-400"
              }`}
            />
            <span
              className={`hidden 2xl:inline whitespace-nowrap ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {t("nav.searchLessons")}
            </span>
            <kbd
              className={`hidden 2xl:inline px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isLight
                  ? "bg-slate-200/90 text-slate-700"
                  : "bg-white/10 text-slate-300"
              }`}
            >
              {t("nav.searchKbd")}
            </kbd>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label={t("nav.language")}
              title={t("nav.language")}
              className={`h-9 w-[64px] px-2 rounded-xl border flex items-center justify-center gap-1 text-xs transition-all cursor-pointer shrink-0 ${utilityBtnClass}`}
            >
              <GlobeIcon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isLight ? "text-cyan-600" : "text-cyan-400"
                }`}
              />
              <span className="text-xs font-bold">{currentLang.short}</span>
              <ChevronDownIcon
                className={`w-3 h-3 shrink-0 transition-transform ${
                  isLight ? "text-slate-500" : "text-slate-400"
                } ${langDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langDropdownOpen && (
              <div
                className={`absolute top-full right-0 mt-2 w-40 rounded-2xl border shadow-2xl p-1.5 z-50 text-left space-y-1 light-nav-menu ${
                  isLight
                    ? "bg-white border-slate-200 shadow-slate-900/15"
                    : "bg-[#090d16] border-white/10"
                }`}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      lang === l.code
                        ? isLight
                          ? "bg-cyan-50 text-cyan-800 border border-cyan-300"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : isLight
                        ? "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {lang === l.code && (
                      <span
                        className={`text-xs font-bold ${
                          isLight ? "text-cyan-600" : "text-cyan-400"
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donate / Support Us Button */}
          <button
            type="button"
            onClick={onOpenDonate}
            aria-label={t("nav.donate")}
            title={t("nav.donate")}
            className={`hidden md:flex h-9 w-9 xl:w-auto xl:px-3 rounded-xl border items-center justify-center gap-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 shadow-sm group ${
              isLight
                ? "border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 shadow-rose-500/5"
                : "border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white shadow-rose-500/10"
            }`}
          >
            <HeartIcon
              className={`w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform ${
                isLight ? "text-rose-500 fill-rose-500/20" : "text-rose-400"
              }`}
            />
            <span className="hidden xl:inline">{t("nav.donate")}</span>
          </button>

          {/* Quick Launch Workspace Button */}
          <button
            type="button"
            onClick={() => onNavigateView("workspace")}
            className={`hidden md:flex h-9 px-3 rounded-xl text-xs font-bold items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 shadow-md ${
              activeView === "workspace"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20 keep-white"
                : isLight
                ? "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 keep-white"
                : "bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.12]"
            }`}
          >
            <LabFlaskIcon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
            <span>
              {activeView === "workspace" ? t("nav.activeLab") : t("nav.openLab")}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? t("nav.switchDark") : t("nav.switchLight")}
            title={isLight ? t("nav.switchDark") : t("nav.switchLight")}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isLight
                ? "border-amber-200 bg-amber-50/80 hover:bg-amber-100 text-slate-800"
                : "border-white/[0.1] bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white"
            }`}
          >
            {isLight ? (
              <MoonIcon className="w-4 h-4 text-indigo-600" />
            ) : (
              <SunIcon className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${utilityBtnClass}`}
          >
            {mobileMenuOpen ? (
              <CloseIcon
                className={`w-5 h-5 ${isLight ? "text-slate-900" : "text-white"}`}
              />
            ) : (
              <MenuIcon
                className={`w-5 h-5 ${isLight ? "text-slate-900" : "text-white"}`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Floating Mobile & Tablet Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 z-50 border-b px-4 py-4 space-y-3 max-h-[calc(100dvh-4rem)] overflow-y-auto light-nav-menu ${
            isLight
              ? "border-slate-200 bg-white/98 text-slate-900 shadow-2xl shadow-slate-900/15"
              : "border-white/[0.08] bg-[#090d16]/98 text-slate-100 shadow-2xl shadow-black/80"
          }`}
        >
          {/* Mobile Quick Search Bar */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                : "bg-slate-900/90 border-white/10 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <SearchIcon
                className={`w-4 h-4 ${
                  isLight ? "text-cyan-600" : "text-cyan-400"
                }`}
              />
              <span>{t("nav.searchLessons")}</span>
            </span>
            <kbd
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isLight
                  ? "bg-slate-200 text-slate-700"
                  : "bg-white/10 text-slate-300"
              }`}
            >
              {t("nav.searchKbd")}
            </kbd>
          </button>

          {/* Primary Navigation Links */}
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
                  className={`p-3 rounded-xl flex items-center justify-between gap-2 text-xs font-bold text-left transition-all cursor-pointer border ${
                    isActive
                      ? isLight
                        ? "bg-cyan-50 text-cyan-900 border-cyan-300"
                        : "bg-cyan-500/20 text-cyan-200 border-cyan-400/30"
                      : isLight
                      ? "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                      : "bg-slate-900 text-slate-300 border-white/5 hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isLight ? "text-cyan-600" : "text-cyan-400"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.count && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                        isLight
                          ? "bg-slate-200 text-slate-700"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Accordion: Quick Simulation Selector */}
          <div
            className={`rounded-xl border overflow-hidden ${
              isLight
                ? "border-slate-200 bg-slate-50/70"
                : "border-white/10 bg-slate-900/60"
            }`}
          >
            <button
              type="button"
              onClick={() => setMobileSimsOpen((v) => !v)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-bold cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LabFlaskIcon
                  className={`w-4 h-4 ${
                    isLight ? "text-cyan-600" : "text-cyan-400"
                  }`}
                />
                <span>
                  {t("nav.simulations")} ({SIMULATION_CATALOG.length})
                </span>
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  mobileSimsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileSimsOpen && (
              <div
                className={`px-2 pb-2 pt-1 border-t max-h-60 overflow-y-auto space-y-1 ${
                  isLight ? "border-slate-200" : "border-white/10"
                }`}
              >
                {SIMULATION_CATALOG.map((baseSim) => {
                  const sim = getLocalizedSimulation(baseSim, lang);
                  const isSelected =
                    activeSimId === sim.id && activeView === "workspace";
                  return (
                    <button
                      key={sim.id}
                      type="button"
                      onClick={() => {
                        onSelectSimulation(sim.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full p-2 rounded-lg flex items-center justify-between text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? isLight
                            ? "bg-purple-100 text-purple-950 font-bold"
                            : "bg-purple-500/25 text-white font-bold"
                          : isLight
                          ? "text-slate-700 hover:bg-slate-200/70"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span className="truncate pr-2">{sim.title}</span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: sim.accentColor }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                onNavigateView("workspace");
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md keep-white"
            >
              <LabFlaskIcon className="w-4 h-4" />
              <span>{t("nav.enterActiveLab")}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenAIStudio();
                setMobileMenuOpen(false);
              }}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                isLight
                  ? "bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100"
                  : "bg-cyan-500/20 border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/30"
              }`}
            >
              <SparklesAIIcon className="w-4 h-4" />
              <span>{t("nav.aiStudio")}</span>
            </button>
          </div>

          {/* Mobile Donate Button */}
          <button
            type="button"
            onClick={() => {
              onOpenDonate();
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              isLight
                ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                : "bg-gradient-to-r from-rose-500/20 to-purple-500/20 border-rose-500/30 text-rose-200"
            }`}
          >
            <HeartIcon className="w-4 h-4 text-rose-500" />
            <span>{t("nav.donate")}</span>
          </button>

          {/* Mobile Theme & Language Preferences Row */}
          <div
            className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
              isLight ? "border-slate-200" : "border-white/[0.08]"
            }`}
          >
            {/* Theme Switcher Pill */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                  : "bg-slate-900 border-white/10 text-slate-200 hover:bg-slate-800"
              }`}
            >
              {isLight ? (
                <>
                  <MoonIcon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t("nav.switchDark")}</span>
                </>
              ) : (
                <>
                  <SunIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("nav.switchLight")}</span>
                </>
              )}
            </button>

            {/* Language Selector Pills */}
            <div className="flex items-center gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    lang === l.code
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-black"
                      : isLight
                      ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                      : "bg-slate-900 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  {l.flag} {l.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
