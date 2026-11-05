import MathFormula from "./MathFormula";
import { FORMULA_LEGENDS } from "../engine/formulaLegends";
import { getBeginnerGuide } from "../engine/beginnerGuides";
import { LightbulbIcon, EyeIcon, SlidersIcon } from "./Icons";

/** Friendly "Start here" card: what this is, what you see, what to try. */
export function BeginnerGuideCard({ simId, accentColor = "#22d3ee" }) {
  const guide = getBeginnerGuide(simId);
  if (!guide) return null;

  return (
    <section
      aria-label="Beginner guide"
      className="bg-gradient-to-br from-slate-900/80 to-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border shadow-xl"
      style={{ borderColor: `${accentColor}55` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <LightbulbIcon className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-bold text-white">New here? Start with this</h3>
      </div>
      <p className="text-sm font-semibold" style={{ color: accentColor }}>
        {guide.hook}
      </p>
      <p className="text-sm text-slate-300 leading-relaxed mt-2">{guide.what}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <EyeIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>What you are seeing</span>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-300 list-disc list-inside leading-relaxed">
            {guide.see.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <SlidersIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Try this</span>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-300 list-disc list-inside leading-relaxed">
            {guide.tryThis.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Textbook-style equations, each with a plain-words explanation and a symbol legend. */
export function FormulaCards({ formulas, title = "The math behind it", columns = 1 }) {
  return (
    <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">{title}</h3>
        <span className="text-[11px] text-slate-400">Read the words first, the equation second</span>
      </div>

      <div
        className={`grid gap-3 ${
          columns === 3 ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {formulas.map((f) => {
          const legend = FORMULA_LEGENDS[f.name];
          return (
            <article
              key={f.name}
              className="p-4 rounded-xl bg-slate-950/80 border border-white/10"
            >
              <h4 className="text-sm font-bold text-white">{f.name}</h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">{f.desc}</p>

              <div className="mt-3 px-3 py-3 rounded-lg bg-slate-900/90 border border-white/5 overflow-x-auto text-center text-white text-[1.05rem]">
                <MathFormula latex={f.latex} display />
              </div>

              {legend && (
                <details className="mt-3 group" open>
                  <summary className="cursor-pointer text-xs font-semibold text-cyan-300 select-none">
                    What do the letters mean?
                  </summary>
                  <dl className="mt-2 space-y-1.5">
                    {legend.map(([sym, meaning]) => (
                      <div key={sym} className="flex items-baseline gap-3 text-sm">
                        <dt className="min-w-[4.5rem] text-right text-cyan-200 shrink-0">
                          <MathFormula latex={sym} />
                        </dt>
                        <dd className="text-slate-300 leading-snug">{meaning}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
