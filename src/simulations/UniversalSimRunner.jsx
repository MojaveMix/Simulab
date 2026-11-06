import { useState, useMemo, useCallback } from "react";
import {
  computeCalculusAnalysis,
  computeChaosAttractor,
  computeProbabilitySimulation,
} from "../engine/mathModels";
import {
  computeProjectileSimulation,
  computeOrbitalSystem,
  computeWaveInterference,
  computeOpticsModel,
  computeThermodynamicsModel,
} from "../engine/physicsModels";
import {
  ChaosAttractor3DCanvas,
  OrbitalGravity3DCanvas,
  WaveInterference3DCanvas,
} from "../components/Sim3DScenes";
import {
  CalculusPlotter2D,
  ProbabilityMonteCarlo2D,
  ProjectileBallistics2D,
  DoublePendulum2D,
  OpticsRayTracer2D,
  ThermodynamicsGas2D,
} from "../components/Sim2DVisualizers";
import {
  FunctionGrapher2D,
  UnitCircle2D,
  SpringOscillator2D,
  CircuitLab2D,
  InclineForces2D,
} from "../components/ExtraSimCanvases";
import {
  computeFunctionGrapher,
  computeUnitCircle,
  computeSpring,
  computeCircuit,
  computeIncline,
} from "../engine/extraSimulations";
import { BeginnerGuideCard, FormulaCards } from "../components/EducationPanels";
import { useLanguage } from "../i18n/LanguageContext";
import {
  getLocalizedSimulation,
  getLocalizedTelemetryLabel,
  getLocalizedPresetName,
  getLocalizedParamLabel,
} from "../i18n/simulationsI18n";

export default function UniversalSimRunner({ simulation, externalParams }) {
  const { lang, t } = useLanguage();
  const locSim = useMemo(
    () => getLocalizedSimulation(simulation, lang),
    [simulation, lang]
  );

  const [params, setParams] = useState(() => ({
    ...simulation.defaultParams,
    ...(externalParams || {}),
  }));
  const [isPlaying, setIsPlaying] = useState(true);

  const handleParamChange = useCallback((key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setParams({ ...simulation.defaultParams });
    setIsPlaying(true);
  }, [simulation]);

  // Compute live scientific model data & telemetry readouts
  const { modelData, telemetry } = useMemo(() => {
    switch (simulation.id) {
      case "calculus-fourier-lab": {
        const res = computeCalculusAnalysis(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Height of curve at your point", value: res.y0.toFixed(4) },
            { label: "Slope at your point", value: res.derivative.toFixed(4) },
            { label: "How sharply it bends", value: res.curvature.toFixed(4) },
            { label: "Area (rectangles estimate)", value: res.riemannSum.toFixed(4) },
            { label: "Area (precise value)", value: res.exactIntegral.toFixed(4) },
            { label: "Estimate error", value: res.integrationError.toExponential(2) },
          ],
        };
      }
      case "chaos-attractor-3d": {
        const res = computeChaosAttractor(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Chaotic system", value: (params.system || "lorenz").toUpperCase() },
            { label: "Calm spots (left/right)", value: `±${res.equilibrium.x.toFixed(2)}` },
            { label: "Calm spot height", value: res.equilibrium.z.toFixed(2) },
            { label: "How fast paths squeeze together", value: res.divergenceRate.toFixed(2) },
            { label: "Top speed of the point", value: res.maxSpeed.toFixed(1) },
            { label: "Path length computed", value: `${res.points.length} steps` },
          ],
        };
      }
      case "probability-monte-carlo": {
        const res = computeProbabilitySimulation(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Expected average slot", value: res.theoreticalMean.toFixed(3) },
            { label: "Measured average slot", value: res.empiricalMean.toFixed(3) },
            { label: "Expected spread", value: res.theoreticalStdDev.toFixed(3) },
            { label: "Measured spread", value: res.empiricalStdDev.toFixed(3) },
            { label: "Our estimate of π", value: res.piEstimate.toFixed(5) },
            { label: "How far off from π", value: res.piError.toFixed(5) },
          ],
        };
      }
      case "projectile-ballistics": {
        const res = computeProjectileSimulation(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Distance flown (with air)", value: `${res.range.toFixed(1)} m` },
            { label: "Distance flown (no air)", value: `${res.vacuumRange.toFixed(1)} m` },
            { label: "Highest point", value: `${res.maxHeight.toFixed(1)} m` },
            { label: "Time in the air", value: `${res.flightTime.toFixed(2)} s` },
            { label: "Speed on landing", value: `${res.impactSpeed.toFixed(1)} m/s` },
            { label: "Energy lost to air", value: `${res.dissipatedEnergy.toFixed(0)} J` },
          ],
        };
      }
      case "double-pendulum-lab": {
        const period1 = 2 * Math.PI * Math.sqrt((params.length1 || 2) / (params.gravity || 9.81));
        return {
          modelData: null,
          telemetry: [
            { label: "Upper Rod L₁ / m₁", value: `${params.length1}m / ${params.mass1}kg` },
            { label: "Lower Rod L₂ / m₂", value: `${params.length2}m / ${params.mass2}kg` },
            { label: "Time of one gentle swing", value: `${period1.toFixed(2)} s` },
            { label: "Release Angles", value: `${params.initialAngle1Deg}° / ${params.initialAngle2Deg}°` },
            { label: "Gravity Field", value: `${params.gravity} m/s²` },
            { label: "Regime", value: params.initialAngle1Deg > 75 ? "Chaotic" : "Quasi-Periodic" },
          ],
        };
      }
      case "orbital-gravity-3d": {
        const res = computeOrbitalSystem(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Length of one year", value: `${res.orbitalPeriod.toFixed(2)} yr` },
            { label: "Closest to the star", value: `${res.periapsis.toFixed(2)} AU` },
            { label: "Farthest from the star", value: `${res.apoapsis.toFixed(2)} AU` },
            { label: "Fastest speed (closest)", value: `${res.vPeriapsis.toFixed(2)} AU/yr` },
            { label: "Slowest speed (farthest)", value: `${res.vApoapsis.toFixed(2)} AU/yr` },
            { label: "Orbit energy", value: `${res.specificEnergy.toFixed(2)}` },
          ],
        };
      }
      case "wave-interference-3d": {
        const res = computeWaveInterference(params);
        return {
          modelData: res,
          telemetry: [
            { label: "How tightly packed waves are", value: `${res.k.toFixed(2)} rad/m` },
            { label: "Oscillation rate", value: `${res.omega.toFixed(2)} rad/s` },
            { label: "Wave travel speed", value: `${res.waveSpeed.toFixed(2)} m/s` },
            { label: "Number of big-wave bands", value: `±${res.maxConstructiveOrder}` },
            { label: "Calm lines", value: `${res.totalNodalLines}` },
            { label: "Source gap ÷ wavelength", value: (params.sourceSeparation / params.wavelength).toFixed(2) },
          ],
        };
      }
      case "optics-refraction-lens": {
        const res = computeOpticsModel(params);
        return {
          modelData: res,
          telemetry: [
            {
              label: "Bent angle inside",
              value: res.isTotalInternalReflection ? "TIR (None)" : `${res.refractedAngleDeg.toFixed(1)}°`,
            },
            {
              label: "Angle where light gets trapped",
              value: res.criticalAngleDeg ? `${res.criticalAngleDeg.toFixed(1)}°` : "N/A (n₁ ≤ n₂)",
            },
            { label: "Glare-free angle", value: `${res.brewsterAngleDeg.toFixed(1)}°` },
            { label: "Where the image forms", value: Number.isFinite(res.imageDistance) ? `${res.imageDistance.toFixed(2)} m` : "∞" },
            { label: "Image size vs object", value: Number.isFinite(res.magnification) ? `${res.magnification.toFixed(2)}×` : "∞" },
            { label: "Light speed in material", value: `${(res.speedMedium2 / 1000).toFixed(0)}k km/s` },
          ],
        };
      }
      case "thermodynamics-gas-lab": {
        const res = computeThermodynamicsModel(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Pressure", value: `${res.pressureKPa.toFixed(1)} kPa` },
            { label: "Pressure (atm)", value: `${res.pressureAtm.toFixed(2)} atm` },
            { label: "Typical molecule speed", value: `${res.vRms.toFixed(0)} m/s` },
            { label: "Average molecule speed", value: `${res.vMean.toFixed(0)} m/s` },
            { label: "Heat energy stored", value: `${(res.internalEnergyJ / 1000).toFixed(2)} kJ` },
            { label: "Disorder change", value: `${res.deltaEntropy.toFixed(2)} J/K` },
          ],
        };
      }
      case "function-grapher": {
        const res = computeFunctionGrapher(params);
        const fx = (v) => (Number.isFinite(v) ? v.toFixed(3) : "undefined");
        const rootText = res.roots.length
          ? res.roots.slice(0, 3).map((r) => r.toFixed(2)).join(", ")
          : "none in view";
        return {
          modelData: res,
          telemetry: [
            { label: "Height at your point", value: fx(res.y0) },
            { label: "Slope at your point", value: fx(res.slope) },
            { label: "Crosses the y-axis at", value: fx(res.yInt) },
            { label: "Crosses the x-axis at", value: rootText },
            {
              label: "Going…",
              value: !Number.isFinite(res.slope) ? "—" : Math.abs(res.slope) < 0.01 ? "Flat here" : res.slope > 0 ? "Up ↗" : "Down ↘",
            },
            {
              label: res.discriminant === null ? "Roots found" : "Discriminant (b²−4ac)",
              value: res.discriminant === null ? `${res.roots.length}` : res.discriminant.toFixed(2),
            },
          ],
        };
      }
      case "unit-circle-trig": {
        const res = computeUnitCircle(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Angle (radians)", value: res.rad.toFixed(3) },
            { label: "sin θ (height)", value: res.sin.toFixed(4) },
            { label: "cos θ (width)", value: res.cos.toFixed(4) },
            { label: "tan θ (sin ÷ cos)", value: Number.isFinite(res.tan) ? res.tan.toFixed(4) : "undefined" },
            { label: "sin² + cos²", value: res.identity.toFixed(4) },
            { label: "Quadrant", value: res.quadrant },
          ],
        };
      }
      case "spring-oscillator": {
        const res = computeSpring(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Time for one swing", value: `${res.period.toFixed(2)} s` },
            { label: "Swings per second", value: `${res.frequency.toFixed(2)} Hz` },
            { label: "Natural speed ω₀", value: `${res.w0.toFixed(2)} rad/s` },
            { label: "Top speed", value: `${res.maxSpeed.toFixed(2)} m/s` },
            { label: "Starting energy", value: `${res.energy.toFixed(2)} J` },
            { label: "Friction type", value: res.regime },
          ],
        };
      }
      case "circuit-ohm-lab": {
        const res = computeCircuit(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Total resistance", value: `${res.rEq.toFixed(2)} Ω` },
            { label: "Total current", value: `${res.I.toFixed(3)} A` },
            { label: "Current through R₁", value: `${res.i1.toFixed(3)} A` },
            { label: "Current through R₂", value: `${res.i2.toFixed(3)} A` },
            { label: "Voltage across R₁ / R₂", value: `${res.v1.toFixed(1)} / ${res.v2.toFixed(1)} V` },
            { label: "Total power", value: `${res.power.toFixed(2)} W` },
          ],
        };
      }
      case "incline-forces-lab": {
        const res = computeIncline(params);
        return {
          modelData: res,
          telemetry: [
            { label: "Weight", value: `${res.W.toFixed(1)} N` },
            { label: "Ramp pushes back (normal)", value: `${res.N.toFixed(1)} N` },
            { label: "Pull down the slope", value: `${res.along.toFixed(1)} N` },
            { label: "Friction", value: `${Math.abs(res.frictionForce).toFixed(1)} N` },
            { label: "Acceleration", value: `${res.accel.toFixed(2)} m/s²` },
            { label: "What happens", value: res.status },
          ],
        };
      }
      default:
        return { modelData: null, telemetry: [] };
    }
  }, [simulation.id, params]);

  const controls = simulation.getParamControls
    ? simulation.getParamControls(params)
    : simulation.paramControls;

  return (
    <div className="space-y-6">
      {/* Top Simulation Control & Preset Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-900/75 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: simulation.accentColor,
                boxShadow: `0 0 12px ${simulation.accentColor}`,
              }}
            />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {locSim.title}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-300">
              {locSim.badge || locSim.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{locSim.summary}</p>
        </div>

        {/* Real-Time Transport Controls (Play/Pause & Reset) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              isPlaying
                ? "bg-emerald-500/20 border-emerald-400/60 text-emerald-200"
                : "bg-amber-500/20 border-amber-400/60 text-amber-200"
            }`}
          >
            <span>{isPlaying ? "⏸" : "▶"}</span>
            {isPlaying ? t("workspace.runningPause") : t("workspace.pausedResume")}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-950/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            {t("workspace.resetDefaults")}
          </button>
        </div>
      </div>

      {/* Main 12-Column Laboratory Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Real-Time Parameter Sliders, Presets & Telemetry */}
        <div className="xl:col-span-4 space-y-5">
          {/* Validated Scenario Presets */}
          {simulation.presets && simulation.presets.length > 0 && (
            <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t("workspace.presets")}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {simulation.presets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setParams((prev) => ({ ...prev, ...preset.params }))}
                    className="px-3.5 py-2.5 rounded-xl text-left rtl:text-right text-xs font-semibold bg-slate-950/70 hover:bg-slate-800/80 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{getLocalizedPresetName(preset.name, lang)}</span>
                    <span className="text-cyan-400 text-[11px] rtl:rotate-180 inline-block">
                      {t("workspace.applyPreset")}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Special Attractor Selector for Chaos Lab */}
          {simulation.id === "chaos-attractor-3d" && (
            <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                {t("workspace.nonlinearManifold")}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "lorenz", label: "Lorenz" },
                  { id: "rossler", label: "Rössler" },
                  { id: "thomas", label: "Thomas" },
                ].map((sys) => (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => handleParamChange("system", sys.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      params.system === sys.id
                        ? "bg-rose-500/20 border-rose-400 text-white"
                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {sys.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Real-Time Variable Sliders */}
          {controls && (
            <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {t("workspace.variableControls")}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {t("workspace.liveSolver")}
                </span>
              </div>

              <div className="space-y-3.5">
                {controls.map((ctrl) => {
                  const val = params[ctrl.key] ?? simulation.defaultParams[ctrl.key] ?? 0;
                  return (
                    <div key={ctrl.key}>
                      <div className="flex justify-between text-xs mb-1">
                        <label
                          htmlFor={`slider-${ctrl.key}`}
                          className="text-slate-300 font-medium"
                        >
                          {getLocalizedParamLabel(ctrl.label, lang)}
                        </label>
                        <span className="font-mono text-cyan-300 font-semibold" dir="ltr">
                          {typeof val === "number" ? val.toFixed(ctrl.step < 0.1 ? 2 : ctrl.step < 1 ? 1 : 0) : val}{" "}
                          {ctrl.unit}
                        </span>
                      </div>
                      <input
                        id={`slider-${ctrl.key}`}
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        step={ctrl.step}
                        value={val}
                        onChange={(e) => handleParamChange(ctrl.key, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        dir="ltr"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Live Scientific Telemetry Readouts */}
          <section className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {t("workspace.liveTelemetry")}
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {t("workspace.siUnits")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {telemetry.map((item) => (
                <div
                  key={item.label}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5"
                >
                  <div className="text-[11px] text-slate-400">
                    {getLocalizedTelemetryLabel(item.label, lang)}
                  </div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5" dir="ltr">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 8 Cols: Interactive Visualization Viewport + Educational Formulas */}
        <div className="xl:col-span-8 space-y-6">
          {/* Interactive Simulation Viewport */}
          <div
            className="sim-viewport-dark relative w-full h-[500px] sm:h-[540px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#05070e]"
            style={{
              boxShadow: `0 20px 60px -15px ${simulation.accentColor}22`,
            }}
          >
            {simulation.id === "chaos-attractor-3d" && (
              <ChaosAttractor3DCanvas
                data={modelData}
                params={params}
                isPlaying={isPlaying}
              />
            )}
            {simulation.id === "orbital-gravity-3d" && (
              <OrbitalGravity3DCanvas
                data={modelData}
                params={params}
                isPlaying={isPlaying}
              />
            )}
            {simulation.id === "wave-interference-3d" && (
              <WaveInterference3DCanvas params={params} isPlaying={isPlaying} />
            )}
            {simulation.id === "calculus-fourier-lab" && (
              <CalculusPlotter2D
                data={modelData}
                params={params}
                onChangeParam={handleParamChange}
              />
            )}
            {simulation.id === "probability-monte-carlo" && (
              <ProbabilityMonteCarlo2D data={modelData} />
            )}
            {simulation.id === "projectile-ballistics" && (
              <ProjectileBallistics2D data={modelData} isPlaying={isPlaying} />
            )}
            {simulation.id === "double-pendulum-lab" && (
              <DoublePendulum2D
                key={`${params.initialAngle1Deg}-${params.initialAngle2Deg}-${params.length1}-${params.length2}`}
                params={params}
                isPlaying={isPlaying}
              />
            )}
            {simulation.id === "optics-refraction-lens" && (
              <OpticsRayTracer2D data={modelData} />
            )}
            {simulation.id === "function-grapher" && (
              <FunctionGrapher2D
                data={modelData}
                params={params}
                isPlaying={isPlaying}
                onChangeParam={handleParamChange}
              />
            )}
            {simulation.id === "unit-circle-trig" && (
              <UnitCircle2D params={params} isPlaying={isPlaying} />
            )}
            {simulation.id === "spring-oscillator" && (
              <SpringOscillator2D params={params} isPlaying={isPlaying} />
            )}
            {simulation.id === "circuit-ohm-lab" && (
              <CircuitLab2D params={params} isPlaying={isPlaying} onChangeParam={handleParamChange} />
            )}
            {simulation.id === "incline-forces-lab" && (
              <InclineForces2D params={params} isPlaying={isPlaying} />
            )}
            {simulation.id === "thermodynamics-gas-lab" && (
              <ThermodynamicsGas2D
                data={modelData}
                params={params}
                isPlaying={isPlaying}
              />
            )}
          </div>

          {/* Educational Explanations, Mathematical Models & Governing Equations */}
          <div className="space-y-6">
            <BeginnerGuideCard simId={simulation.id} accentColor={simulation.accentColor} />

            <FormulaCards
              formulas={simulation.formulas}
              title={t("workspace.theMathBehindIt")}
            />

            <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  {t("workspace.theBiggerPicture")}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {locSim.theory}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-white">
                  {t("workspace.categoryAndEngine")}
                </div>
                <div className="flex items-center justify-between">
                  <span>{locSim.category}</span>
                  <span className="font-mono text-cyan-300">{simulation.renderType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
