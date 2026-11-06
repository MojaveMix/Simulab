import { useEffect, useMemo, useRef, useState } from "react";
import {
  searchLessons,
  getPopularLessons,
  getLessonTitle,
  getLessonTopic,
} from "../engine/lessonSearch";
import { getSimulationById } from "../engine/simulationRegistry";
import { ArrowRightIcon, SparklesAIIcon } from "./Icons";
import { useLanguage } from "../i18n/LanguageContext";
import { getLocalizedSimulation } from "../i18n/simulationsI18n";

function useTypewriter(hints, active) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active || !hints || hints.length === 0) return undefined;
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const full = hints[word % hints.length];
      char += deleting ? -1 : 1;
      setText(full.slice(0, char));
      let delay = deleting ? 28 : 70;
      if (!deleting && char === full.length) {
        deleting = true;
        delay = 1300;
      } else if (deleting && char === 0) {
        deleting = false;
        word += 1;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [active, hints]);
  return text;
}

/**
 * Type any math or physics lesson name in English, French, or Arabic; Enter (or a click) opens its simulation directly.
 */
export default function LessonSearch({ onOpenLesson, onAskAI, autoFocus = false, size = "lg" }) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const typeHints = useMemo(() => {
    const list = t("search.typeHints");
    return Array.isArray(list) ? list : ["Quadratic functions", "Derivatives", "Newton's laws"];
  }, [t]);

  const typed = useTypewriter(typeHints, !query && !focused);

  const results = useMemo(() => {
    if (!query.trim()) return getPopularLessons().map((lesson) => ({ lesson, score: 0 }));
    return searchLessons(query, 7);
  }, [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const open = (lesson) => {
    setFocused(false);
    setQuery("");
    onOpenLesson(lesson);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(results.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[highlight] || results[0];
      if (pick) open(pick.lesson);
    } else if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const showPanel = focused || autoFocus;
  const noResults = query.trim() && results.length === 0;
  const big = size === "lg";

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className={`lesson-search-box flex items-center gap-3 rounded-2xl border bg-slate-900/80 backdrop-blur-xl transition-all ${
          focused
            ? "border-cyan-400/70 shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_20px_60px_-15px_rgba(34,211,238,0.4)]"
            : "border-white/15"
        } ${big ? "px-5 py-4" : "px-4 py-3"}`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`${big ? "w-6 h-6" : "w-5 h-5"} text-cyan-300 shrink-0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <div className="relative flex-1 min-w-0">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onFocus={() => setFocused(true)}
            onKeyDown={onKeyDown}
            aria-label={t("search.placeholder")}
            className={`w-full bg-transparent outline-none text-white placeholder-transparent ${
              big ? "text-base sm:text-lg" : "text-sm"
            } font-medium`}
            placeholder={t("search.placeholder")}
          />
          {!query && (
            <div
              className={`pointer-events-none absolute inset-0 flex items-center text-slate-400 ${
                big ? "text-base sm:text-lg" : "text-sm"
              }`}
            >
              <span className="truncate">
                {focused ? (
                  t("search.focusedPlaceholder")
                ) : (
                  <>
                    {t("search.tryPrefix")}{" "}
                    <span className="text-slate-200">{typed}</span>
                    <span className="caret-blink" />
                  </>
                )}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            const pick = results[highlight] || results[0];
            if (pick) open(pick.lesson);
          }}
          className="shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:brightness-110 flex items-center gap-2 cursor-pointer"
        >
          <span>{t("search.simulateBtn")}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      {showPanel && (
        <div className="lesson-search-panel absolute left-0 right-0 top-full mt-2 z-40 rounded-2xl border border-white/10 bg-[#0a0f1d]/95 backdrop-blur-2xl shadow-2xl p-2 text-start fade-up">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {query.trim() ? t("search.matchingLessons") : t("search.popularLessons")}
          </div>
          {noResults ? (
            <div className="p-4 text-sm text-slate-300 space-y-3">
              <p>
                {t("search.noResultsLead")}{" "}
                <strong className="text-white">“{query}”</strong>{" "}
                {t("search.noResultsTail")}
              </p>
              {onAskAI && (
                <button
                  type="button"
                  onClick={() => onAskAI(query)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <SparklesAIIcon className="w-4 h-4" />
                  {t("search.askAIToBuild")}
                </button>
              )}
            </div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto custom-scroll space-y-0.5">
              {results.map(({ lesson }, i) => {
                const baseSim = getSimulationById(lesson.simId);
                const sim = getLocalizedSimulation(baseSim, lang);
                const isMath = lesson.domain === "mathematics";
                const displayTitle = getLessonTitle(lesson, lang);
                const displayTopic = getLessonTopic(lesson.topic, lang);
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => open(lesson)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-colors cursor-pointer ${
                        i === highlight ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-base font-black"
                        style={{
                          backgroundColor: `${sim.accentColor}22`,
                          color: sim.accentColor,
                          border: `1px solid ${sim.accentColor}44`,
                        }}
                      >
                        {isMath ? "∑" : "⚛"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white truncate">
                          {displayTitle}
                        </span>
                        <span className="block text-[11px] text-slate-400 truncate">
                          {isMath ? t("nav.mathematics") : t("nav.physics")} · {displayTopic} → {sim.shortTitle}
                        </span>
                      </span>
                      <ArrowRightIcon
                        className={`w-4 h-4 shrink-0 ${
                          i === highlight ? "text-cyan-300" : "text-slate-600"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
