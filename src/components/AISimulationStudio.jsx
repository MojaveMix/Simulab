import { useState } from "react";
import {
  AI_EXAMPLE_PROMPTS,
  generateSimulationFromPrompt,
} from "../engine/aiSimulationEngine";
import { getSimulationById } from "../engine/simulationRegistry";
import { SparklesAIIcon, ArrowRightIcon } from "./Icons";

export default function AISimulationStudio({
  onLaunchBlueprint,
  lastBlueprint,
}) {
  const [promptText, setPromptText] = useState("");
  const [previewBlueprint, setPreviewBlueprint] = useState(lastBlueprint || null);

  const handleSynthesize = (e) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    const blueprint = generateSimulationFromPrompt(promptText);
    if (blueprint) {
      setPreviewBlueprint(blueprint);
    }
  };

  const handleQuickExample = (examplePrompt) => {
    setPromptText(examplePrompt);
    const blueprint = generateSimulationFromPrompt(examplePrompt);
    if (blueprint) {
      setPreviewBlueprint(blueprint);
    }
  };

  const targetSim = previewBlueprint
    ? getSimulationById(previewBlueprint.simulationId)
    : null;

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-cyan-500/30 shadow-2xl space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300">
              <SparklesAIIcon className="w-3.5 h-3.5" />
              <span>AI Scientific Synthesizer</span>
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Natural Language → Validated Simulation Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Describe any mathematical model or physics experiment in plain English. SimuLab extracts physical constants, boundary conditions, and launches a validated numerical solver.
          </p>
        </div>
      </div>

      {/* Natural Language Prompt Input Form */}
      <form onSubmit={handleSynthesize} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g., Launch a 5 kg projectile at 50 degrees with 48 m/s on Mars from a 10m cliff..."
            aria-label="Describe an experiment in natural language"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950/90 border border-white/15 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <SparklesAIIcon className="w-4 h-4" />
            <span>Generate Simulation</span>
          </button>
        </div>

        {/* Quick Example Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Try Prompt:
          </span>
          {AI_EXAMPLE_PROMPTS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleQuickExample(item.prompt)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </form>

      {/* AI Generated Blueprint Preview & Launch Card */}
      {previewBlueprint && targetSim && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-400/40 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                  Validated Scientific Model Matched: {targetSim.title}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {previewBlueprint.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onLaunchBlueprint(previewBlueprint)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <span>Launch Interactive Experiment</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Extracted Parameters & Physical Constants */}
          <div className="flex flex-wrap gap-2">
            {previewBlueprint.extractedEntities.map((entity, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/15 border border-cyan-400/30 text-cyan-200"
              >
                {entity}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-1">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                AI Model Formulation
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 leading-relaxed">
                {previewBlueprint.reasoningSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-1">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                Testable Scientific Hypothesis
              </div>
              <p className="text-slate-300 leading-relaxed">
                {previewBlueprint.hypothesis}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
