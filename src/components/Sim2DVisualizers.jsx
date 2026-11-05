import { useState, useEffect, useRef } from "react";
import { stepDoublePendulum } from "../engine/physicsModels";

/**
 * 1. Calculus, Derivative, Tangent & Riemann Integral Interactive SVG Visualizer
 */
export function CalculusPlotter2D({ data, params, onChangeParam }) {
  const width = 760;
  const height = 420;
  const xMin = -6;
  const xMax = 6;
  const yMin = -4.2;
  const yMax = 4.2;

  const toX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const toY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const mainPath = data.curvePoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.y).toFixed(1)}`)
    .join(" ");

  const derivPath = data.curvePoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.df * 0.5).toFixed(1)}`)
    .join(" ");

  // Tangent line segment around x0
  const x0 = data.x0;
  const y0 = data.y0;
  const slope = data.derivative;
  const tanX1 = x0 - 1.8;
  const tanY1 = y0 - slope * 1.8;
  const tanX2 = x0 + 1.8;
  const tanY2 = y0 + slope * 1.8;

  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * (xMax - xMin) + xMin;
    const clamped = Math.max(-5, Math.min(5, Math.round(clickX * 10) / 10));
    if (onChangeParam) onChangeParam("x0", clamped);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#05070e] select-none">
      {/* Function Preset & Custom Expression Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 z-10">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "damped_sine", label: "Damped Sine" },
            { id: "fourier_square", label: "Fourier Square" },
            { id: "gaussian_wave", label: "Gaussian Packet" },
            { id: "polynomial", label: "Cubic Polynomial" },
            { id: "rational_resonance", label: "Lorentzian Peak" },
            { id: "custom", label: "Custom f(x)" },
          ].map((fn) => (
            <button
              key={fn.id}
              type="button"
              onClick={() => onChangeParam && onChangeParam("presetId", fn.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                params.presetId === fn.id
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                  : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {fn.label}
            </button>
          ))}
        </div>

        {params.presetId === "custom" && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-300">f(x) =</span>
            <input
              type="text"
              value={params.customExpr || ""}
              onChange={(e) => onChangeParam && onChangeParam("customExpr", e.target.value)}
              placeholder="e.g. 2 * sin(x) + cos(2*x)"
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-mono text-white focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Interactive SVG Coordinate Plane */}
      <div className="relative flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950/90">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          onClick={handleSvgClick}
          className="w-full h-full cursor-crosshair"
        >
          {/* Coordinate Grid */}
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((gx) => (
            <g key={`gx-${gx}`}>
              <line
                x1={toX(gx)}
                y1={0}
                x2={toX(gx)}
                y2={height}
                stroke={gx === 0 ? "#475569" : "#1e293b"}
                strokeWidth={gx === 0 ? 1.6 : 1}
              />
              <text
                x={toX(gx) + 4}
                y={toY(0) + 14}
                fill="#64748b"
                fontSize="10"
                fontFamily="monospace"
              >
                {gx}
              </text>
            </g>
          ))}
          {[-3, -2, -1, 0, 1, 2, 3].map((gy) => (
            <g key={`gy-${gy}`}>
              <line
                x1={0}
                y1={toY(gy)}
                x2={width}
                y2={toY(gy)}
                stroke={gy === 0 ? "#475569" : "#1e293b"}
                strokeWidth={gy === 0 ? 1.6 : 1}
              />
              {gy !== 0 && (
                <text
                  x={toX(0) + 6}
                  y={toY(gy) - 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {gy}
                </text>
              )}
            </g>
          ))}

          {/* Riemann Integration Rectangles */}
          {data.riemannRects.map((rect, idx) => {
            const rx = toX(rect.x);
            const rw = toX(rect.x + rect.width) - rx;
            const yZero = toY(0);
            const yVal = toY(rect.height);
            const top = Math.min(yZero, yVal);
            const h = Math.abs(yZero - yVal);
            const isPositive = rect.height >= 0;
            return (
              <rect
                key={idx}
                x={rx}
                y={top}
                width={Math.max(1, rw - 0.5)}
                height={h}
                fill={isPositive ? "rgba(6, 182, 212, 0.24)" : "rgba(244, 63, 94, 0.24)"}
                stroke={isPositive ? "#06B6D4" : "#F43F5E"}
                strokeWidth="0.7"
              />
            );
          })}

          {/* Scaled First Derivative Curve f'(x) */}
          <path
            d={derivPath}
            fill="none"
            stroke="#A855F7"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            opacity="0.75"
          />

          {/* Main Function Curve f(x) */}
          <path d={mainPath} fill="none" stroke="#22D3EE" strokeWidth="3" />

          {/* Tangent Line at x0 */}
          <line
            x1={toX(tanX1)}
            y1={toY(tanY1)}
            x2={toX(tanX2)}
            y2={toY(tanY2)}
            stroke="#FBBF24"
            strokeWidth="2.2"
          />
          <circle
            cx={toX(x0)}
            cy={toY(y0)}
            r="6"
            fill="#FBBF24"
            stroke="#020617"
            strokeWidth="2"
          />
        </svg>

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10">
          <span className="text-cyan-300">■ Cyan: f(x) &amp; Riemann Area</span>
          <span className="text-amber-300">
            ● Tangent @ x₀={x0.toFixed(2)}: f&apos;(x₀)={data.derivative.toFixed(3)}
          </span>
          <span className="text-purple-300">--- Purple: 0.5·f&apos;(x)</span>
          <span className="text-slate-400">Click anywhere on graph to move x₀</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Probability, Galton Binomial Board & Monte Carlo Pi Visualizer
 */
export function ProbabilityMonteCarlo2D({ data }) {
  const maxProb = Math.max(
    0.05,
    ...data.bins.map((b) => Math.max(b.empiricalProb, b.theoreticalProb))
  );

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 bg-[#05070e]">
      {/* Left 7 Cols: Galton Binomial vs Gaussian Distribution */}
      <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-bold text-white">
              Galton Board Binomial Convergence
            </h4>
            <p className="text-xs text-slate-400">
              Empirical Bars vs. Exact Binomial P(X=k) Markers
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            μ = {data.empiricalMean.toFixed(2)} (Theor: {data.theoreticalMean.toFixed(2)})
          </span>
        </div>

        <div className="flex items-end gap-1.5 h-64 pt-6 pb-2 px-2 border-b border-white/10">
          {data.bins.map((bin) => {
            const empHeight = Math.round((bin.empiricalProb / maxProb) * 100);
            const theoHeight = Math.round((bin.theoreticalProb / maxProb) * 100);
            return (
              <div
                key={bin.k}
                className="flex-1 h-full flex flex-col items-center justify-end relative group"
                title={`k=${bin.k}: Empirical ${(bin.empiricalProb * 100).toFixed(1)}% (${bin.count}) | Theoretical ${(bin.theoreticalProb * 100).toFixed(1)}%`}
              >
                {/* Theoretical Marker Line */}
                <div
                  className="w-full h-1 bg-amber-400 rounded-full absolute z-20 pointer-events-none"
                  style={{ bottom: `calc(${theoHeight}% + 18px)` }}
                />
                {/* Empirical Bar */}
                <div
                  className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-300 group-hover:brightness-125"
                  style={{ height: `${empHeight}%` }}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {bin.k}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
          <span className="text-emerald-400">█ Empirical Galton Bins</span>
          <span className="text-amber-400">━ Exact Binomial Formula</span>
          <span>σ = {data.empiricalStdDev.toFixed(3)}</span>
        </div>
      </div>

      {/* Right 5 Cols: Monte Carlo Unit Circle Quadrature for Pi */}
      <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-bold text-white">Monte Carlo π Quadrature</h4>
            <p className="text-xs text-slate-400">Unit Circle x² + y² ≤ 1</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            π ≈ {data.piEstimate.toFixed(4)}
          </span>
        </div>

        <svg
          viewBox="-1.05 -1.05 2.1 2.1"
          className="w-56 h-56 rounded-xl bg-slate-900 border border-white/15"
        >
          <rect
            x="-1"
            y="-1"
            width="2"
            height="2"
            fill="none"
            stroke="#334155"
            strokeWidth="0.02"
          />
          <circle
            cx="0"
            cy="0"
            r="1"
            fill="rgba(6, 182, 212, 0.08)"
            stroke="#22D3EE"
            strokeWidth="0.025"
          />
          {data.monteCarloPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="0.022"
              fill={pt.inside ? "#10B981" : "#F43F5E"}
              opacity="0.85"
            />
          ))}
        </svg>

        <div className="w-full text-center text-xs font-mono text-slate-400 mt-2">
          Absolute Error |π - π̂| ={" "}
          <strong className="text-white">{data.piError.toFixed(4)}</strong>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Ballistic Projectile Motion & Aerodynamic Drag Interactive Visualizer
 */
export function ProjectileBallistics2D({ data, isPlaying }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setStepIdx((prev) => (prev + 2) % Math.max(1, data.trajectory.length));
    }, 28);
    return () => clearInterval(timer);
  }, [isPlaying, data.trajectory.length]);

  const width = 760;
  const height = 380;
  const padX = 52;
  const padY = 42;

  const maxX = Math.max(20, data.vacuumRange * 1.08, data.range * 1.08);
  const maxY = Math.max(15, data.vacuumMaxHeight * 1.15, data.maxHeight * 1.15);

  const toX = (x) => padX + (x / maxX) * (width - padX * 1.6);
  const toY = (y) => height - padY - (y / maxY) * (height - padY * 1.8);

  const dragPath = data.trajectory
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.y).toFixed(1)}`)
    .join(" ");

  const vacPath = data.vacuumPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.y).toFixed(1)}`)
    .join(" ");

  const activePt =
    data.trajectory[Math.min(stepIdx, data.trajectory.length - 1)] ||
    data.trajectory[0] || { x: 0, y: 0, vx: 0, vy: 0, kineticEnergy: 0, potentialEnergy: 0 };

  const totalE0 = Math.max(1, data.initialEnergy);
  const kePct = Math.min(100, Math.round((activePt.kineticEnergy / totalE0) * 100));
  const pePct = Math.min(100, Math.round((activePt.potentialEnergy / totalE0) * 100));
  const lossPct = Math.max(0, 100 - kePct - pePct);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#05070e]">
      <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 bg-slate-950/90">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Ground Plane */}
          <line
            x1={padX}
            y1={toY(0)}
            x2={width - 20}
            y2={toY(0)}
            stroke="#334155"
            strokeWidth="2"
          />
          <line
            x1={padX}
            y1={20}
            x2={padX}
            y2={toY(0)}
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Distance Grid Markers */}
          {[0.25, 0.5, 0.75, 1.0].map((frac) => {
            const xVal = maxX * frac;
            return (
              <g key={frac}>
                <line
                  x1={toX(xVal)}
                  y1={20}
                  x2={toX(xVal)}
                  y2={toY(0)}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text
                  x={toX(xVal)}
                  y={toY(0) + 18}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {xVal.toFixed(0)}m
                </text>
              </g>
            );
          })}

          {/* Ideal Vacuum Parabola */}
          <path
            d={vacPath}
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Real Aerodynamic Drag Trajectory */}
          <path d={dragPath} fill="none" stroke="#F59E0B" strokeWidth="3.5" />

          {/* Animated Projectile & Velocity Vectors */}
          <g transform={`translate(${toX(activePt.x)}, ${toY(activePt.y)})`}>
            {/* vx vector */}
            <line
              x1="0"
              y1="0"
              x2={activePt.vx * 0.9}
              y2="0"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            {/* vy vector */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={-activePt.vy * 0.9}
              stroke="#10B981"
              strokeWidth="2"
            />
            <circle r="7" fill="#FBBF24" stroke="#ffffff" strokeWidth="2" />
          </g>
        </svg>

        {/* Live Energy Conservation Bar */}
        <div className="absolute top-3 right-3 w-64 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs space-y-1.5">
          <div className="flex justify-between font-mono text-[11px] text-slate-300">
            <span>t = {activePt.t?.toFixed(2)}s</span>
            <span>v = {activePt.speed?.toFixed(1)} m/s</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
            <div
              style={{ width: `${kePct}%` }}
              className="bg-amber-400 transition-all duration-75"
              title="Kinetic Energy"
            />
            <div
              style={{ width: `${pePct}%` }}
              className="bg-cyan-400 transition-all duration-75"
              title="Potential Energy"
            />
            <div
              style={{ width: `${lossPct}%` }}
              className="bg-rose-500 transition-all duration-75"
              title="Thermal Drag Dissipation"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span className="text-amber-300">KE {kePct}%</span>
            <span className="text-cyan-300">PE {pePct}%</span>
            <span className="text-rose-400">Drag {lossPct}%</span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-3 text-xs font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10">
          <span className="text-amber-400">━ Real Drag Trajectory ({data.range.toFixed(1)}m)</span>
          <span className="text-slate-400">--- Ideal Vacuum ({data.vacuumRange.toFixed(1)}m)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Nonlinear Coupled Double Pendulum + Phase Portrait Visualizer
 */
export function DoublePendulum2D({ params, isPlaying }) {
  const [simState, setSimState] = useState(() => {
    const th1 = ((params.initialAngle1Deg || 115) * Math.PI) / 180;
    const th2 = ((params.initialAngle2Deg || 140) * Math.PI) / 180;
    const init = stepDoublePendulum(
      { theta1: th1, omega1: 0, theta2: th2, omega2: 0 },
      params,
      0.001
    );
    return {
      ...init,
      trail: [{ x: init.x2, y: init.y2 }],
      phaseTrail: [{ th: init.theta1, om: init.omega1 }],
    };
  });

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setSimState((prev) => {
        const next = stepDoublePendulum(prev, params, 0.02);
        const trail = [...prev.trail.slice(-110), { x: next.x2, y: next.y2 }];
        const phaseTrail = [
          ...prev.phaseTrail.slice(-110),
          { th: Math.atan2(Math.sin(next.theta1), Math.cos(next.theta1)), om: next.omega1 },
        ];
        return { ...next, trail, phaseTrail };
      });
    }, 20);
    return () => clearInterval(timer);
  }, [isPlaying, params]);

  const scale = 52;
  const cx = 220;
  const cy = 175;

  const trailPoints = simState.trail
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(cx + p.x * scale).toFixed(1)} ${(cy - p.y * scale).toFixed(1)}`)
    .join(" ");

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 bg-[#05070e]">
      {/* Left 7 Cols: Physical Double Pendulum */}
      <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 440 380" className="w-full h-full">
          <circle cx={cx} cy={cy} r="165" fill="none" stroke="#1e293b" strokeDasharray="4 4" />
          {/* Chaotic Tip Trajectory Ribbon */}
          {simState.trail.length > 2 && (
            <path d={trailPoints} fill="none" stroke="#EC4899" strokeWidth="2.2" opacity="0.8" />
          )}
          {/* Upper Rod L1 */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + simState.x1 * scale}
            y2={cy - simState.y1 * scale}
            stroke="#e2e8f0"
            strokeWidth="3.5"
          />
          {/* Lower Rod L2 */}
          <line
            x1={cx + simState.x1 * scale}
            y1={cy - simState.y1 * scale}
            x2={cx + simState.x2 * scale}
            y2={cy - simState.y2 * scale}
            stroke="#38BDF8"
            strokeWidth="3"
          />
          {/* Pivot */}
          <circle cx={cx} cy={cy} r="5" fill="#94a3b8" />
          {/* Bob 1 */}
          <circle
            cx={cx + simState.x1 * scale}
            cy={cy - simState.y1 * scale}
            r={6 + (params.mass1 || 2) * 1.5}
            fill="#F43F5E"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Bob 2 */}
          <circle
            cx={cx + simState.x2 * scale}
            cy={cy - simState.y2 * scale}
            r={6 + (params.mass2 || 1.5) * 1.5}
            fill="#22D3EE"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Right 5 Cols: Phase Portrait (theta1 vs omega1) & Energy */}
      <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">Phase Space Portrait (θ₁ vs ω₁)</h4>
          <p className="text-xs text-slate-400">Attractor orbit in canonical coordinates</p>
        </div>

        <svg viewBox="-120 -120 240 240" className="w-full h-56 bg-slate-900/90 rounded-xl border border-white/10 my-2">
          <line x1="-120" y1="0" x2="120" y2="0" stroke="#334155" />
          <line x1="0" y1="-120" x2="0" y2="120" stroke="#334155" />
          {simState.phaseTrail.length > 2 && (
            <path
              d={simState.phaseTrail
                .map(
                  (pt, i) =>
                    `${i === 0 ? "M" : "L"} ${(pt.th * 32).toFixed(1)} ${(-pt.om * 12).toFixed(1)}`
                )
                .join(" ")}
              fill="none"
              stroke="#A855F7"
              strokeWidth="2"
            />
          )}
        </svg>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
            <span className="text-slate-400 block">Kinetic T:</span>
            <strong className="text-amber-300">{simState.kinetic.toFixed(1)} J</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-white/5">
            <span className="text-slate-400 block">Potential V:</span>
            <strong className="text-cyan-300">{simState.potential.toFixed(1)} J</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Geometric Optics: Snell's Law Refraction & Thin Lens Ray Tracer
 */
export function OpticsRayTracer2D({ data }) {
  const cx = 180;
  const cy = 170;
  const rayLen = 135;

  const incRad = (data.incidentAngleDeg * Math.PI) / 180;
  // Incident ray starts in top-left quadrant (Medium 1, y < cy)
  const incX = cx - rayLen * Math.sin(incRad);
  const incY = cy - rayLen * Math.cos(incRad);

  // Reflected ray goes to top-right quadrant
  const refX = cx + rayLen * Math.sin(incRad);
  const refY = cy - rayLen * Math.cos(incRad);

  // Refracted ray in bottom-right quadrant (Medium 2, y > cy) if not TIR
  const refrRad = data.refractedAngleDeg !== null ? (data.refractedAngleDeg * Math.PI) / 180 : 0;
  const refrX = cx + rayLen * Math.sin(refrRad);
  const refrY = cy + rayLen * Math.cos(refrRad);

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 bg-[#05070e]">
      {/* Left 6 Cols: Snell's Law Interface */}
      <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Snell&apos;s Law Boundary</h4>
            <p className="text-xs text-slate-400">
              n₁ = {data.n1.toFixed(2)} → n₂ = {data.n2.toFixed(2)}
            </p>
          </div>
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded border ${
              data.isTotalInternalReflection
                ? "bg-rose-500/20 border-rose-400 text-rose-200"
                : "bg-cyan-500/20 border-cyan-400 text-cyan-200"
            }`}
          >
            {data.isTotalInternalReflection
              ? "100% Total Internal Reflection!"
              : `θ₂ = ${data.refractedAngleDeg.toFixed(1)}°`}
          </span>
        </div>

        <svg viewBox="0 0 360 340" className="w-full h-64 rounded-xl overflow-hidden border border-white/10 my-2">
          {/* Medium 1 (Top) */}
          <rect x="0" y="0" width="360" height={cy} fill="#090d16" />
          {/* Medium 2 (Bottom) */}
          <rect x="0" y={cy} width="360" height={340 - cy} fill="#0f1f38" />
          {/* Interface Boundary & Normal */}
          <line x1="0" y1={cy} x2="360" y2={cy} stroke="#38BDF8" strokeWidth="1.5" />
          <line x1={cx} y1="15" x2={cx} y2="325" stroke="#64748b" strokeDasharray="4 4" />

          {/* Incident Laser Beam */}
          <line x1={incX} y1={incY} x2={cx} y2={cy} stroke="#F43F5E" strokeWidth="3.5" />
          {/* Fresnel / TIR Reflected Beam */}
          <line
            x1={cx}
            y1={cy}
            x2={refX}
            y2={refY}
            stroke="#F43F5E"
            strokeWidth={data.isTotalInternalReflection ? "3.5" : "1.8"}
            opacity={data.isTotalInternalReflection ? "1" : "0.55"}
          />
          {/* Refracted Beam */}
          {!data.isTotalInternalReflection && (
            <line x1={cx} y1={cy} x2={refrX} y2={refrY} stroke="#22D3EE" strokeWidth="3.2" />
          )}
          <circle cx={cx} cy={cy} r="4" fill="#ffffff" />
        </svg>

        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Reflectance: {(data.reflectance * 100).toFixed(1)}%</span>
          <span>Transmittance: {(data.transmittance * 100).toFixed(1)}%</span>
          {data.criticalAngleDeg && <span>θc = {data.criticalAngleDeg.toFixed(1)}°</span>}
        </div>
      </div>

      {/* Right 6 Cols: Gaussian Thin Lens Ray Bench */}
      <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Gaussian Thin Lens Bench</h4>
            <p className="text-xs text-slate-400">1/f = 1/d₀ + 1/dᵢ Principal Ray Tracing</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/15 text-purple-200 border border-purple-400/40">
            M = {Number.isFinite(data.magnification) ? `${data.magnification.toFixed(2)}×` : "∞"}
          </span>
        </div>

        <svg viewBox="-180 -110 360 220" className="w-full h-64 bg-[#090d16] rounded-xl border border-white/10 my-2">
          {/* Optical Axis */}
          <line x1="-180" y1="0" x2="180" y2="0" stroke="#475569" />
          {/* Converging Lens at x=0 */}
          <ellipse cx="0" cy="0" rx="8" ry="82" fill="rgba(56, 189, 248, 0.18)" stroke="#38BDF8" strokeWidth="2" />
          {/* Focal Points -F and +F */}
          <circle cx={-data.focalLength * 18} cy="0" r="3.5" fill="#FBBF24" />
          <circle cx={data.focalLength * 18} cy="0" r="3.5" fill="#FBBF24" />

          {/* Object Arrow at -d0 */}
          {(() => {
            const ox = -data.objectDistance * 18;
            const oy = -data.objectHeight * 28;
            const ix = Number.isFinite(data.imageDistance)
              ? Math.max(-165, Math.min(165, data.imageDistance * 18))
              : 160;
            const iy = -data.imageHeight * 28;
            return (
              <g>
                {/* Object */}
                <line x1={ox} y1="0" x2={ox} y2={oy} stroke="#10B981" strokeWidth="3.5" />
                <circle cx={ox} cy={oy} r="4" fill="#10B981" />
                {/* Parallel Ray -> Focal Point */}
                <line x1={ox} y1={oy} x2="0" y2={oy} stroke="#FBBF24" strokeWidth="1.4" />
                <line x1="0" y1={oy} x2={ix} y2={iy} stroke="#FBBF24" strokeWidth="1.4" />
                {/* Chief Ray through Center (0,0) */}
                <line x1={ox} y1={oy} x2={ix} y2={iy} stroke="#A855F7" strokeWidth="1.4" />
                {/* Image Arrow */}
                <line
                  x1={ix}
                  y1="0"
                  x2={ix}
                  y2={iy}
                  stroke="#EC4899"
                  strokeWidth="3.5"
                  strokeDasharray={data.isRealImage ? undefined : "4 3"}
                />
                <circle cx={ix} cy={iy} r="4" fill="#EC4899" />
              </g>
            );
          })()}
        </svg>

        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span className="text-emerald-400">■ Object d₀ = {data.objectDistance.toFixed(1)}m</span>
          <span className="text-pink-400">
            ■ {data.isRealImage ? "Real" : "Virtual"} Image dᵢ ={" "}
            {Number.isFinite(data.imageDistance) ? `${data.imageDistance.toFixed(2)}m` : "∞"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Ideal Gas Law & Maxwell-Boltzmann Kinetic Thermodynamics Visualizer
 */
export function ThermodynamicsGas2D({ data, params, isPlaying }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize particles when moleschange
  useEffect(() => {
    const count = Math.min(90, Math.max(16, Math.round((params.moles || 1.5) * 28)));
    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (i * 2.39996) % (Math.PI * 2);
      return {
        x: 0.15 + ((i * 0.618) % 0.7),
        y: 0.15 + ((i * 0.382) % 0.7),
        vx: Math.cos(angle),
        vy: Math.sin(angle),
      };
    });
  }, [params.moles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let animId;

    const speedFactor = Math.max(0.003, Math.min(0.025, data.vRms / 95000));

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Variable piston ceiling based on volumeL (3..25L)
      const volFrac = Math.max(0.28, Math.min(0.92, (params.volumeL || 10) / 25));
      const boxTop = h * (1 - volFrac);

      // Piston Head
      ctx.fillStyle = "#334155";
      ctx.fillRect(10, boxTop - 12, w - 20, 12);
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(10, boxTop, w - 20, h - boxTop - 8);

      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (isPlaying) {
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          if (p.x < 0.06) {
            p.x = 0.06;
            p.vx = Math.abs(p.vx);
          } else if (p.x > 0.94) {
            p.x = 0.94;
            p.vx = -Math.abs(p.vx);
          }

          const minY = (boxTop + 10) / h;
          if (p.y < minY) {
            p.y = minY;
            p.vy = Math.abs(p.vy);
          } else if (p.y > 0.94) {
            p.y = 0.94;
            p.vy = -Math.abs(p.vy);
          }
        }

        const px = p.x * w;
        const py = p.y * h;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = params.temperatureK > 550 ? "#FB7185" : params.temperatureK < 200 ? "#38BDF8" : "#34D399";
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [data.vRms, params.volumeL, params.temperatureK, isPlaying]);

  const maxD = Math.max(0.01, ...data.distribution.map((d) => d.probDensity));
  const distPath = data.distribution
    .map((d, i) => {
      const x = (i / (data.distribution.length - 1)) * 340;
      const y = 210 - (d.probDensity / maxD) * 180;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 bg-[#05070e]">
      {/* Left 6 Cols: Kinetic Gas Piston Chamber */}
      <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-bold text-white">Variable-Volume Piston Chamber</h4>
            <p className="text-xs text-slate-400">Elastic Thermal Collisions (PV = nRT)</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/20 text-rose-200 border border-rose-500/30">
            P = {data.pressureKPa.toFixed(1)} kPa ({data.pressureAtm.toFixed(2)} atm)
          </span>
        </div>

        <canvas
          ref={canvasRef}
          width={360}
          height={250}
          className="w-full h-60 bg-[#090d16] rounded-xl border border-white/10"
        />

        <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
          <span>Internal Energy U = {(data.internalEnergyJ / 1000).toFixed(2)} kJ</span>
          <span>ΔS = {data.deltaEntropy.toFixed(1)} J/K</span>
        </div>
      </div>

      {/* Right 6 Cols: Maxwell-Boltzmann Distribution */}
      <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-bold text-white">Maxwell-Boltzmann Speed Curve</h4>
            <p className="text-xs text-slate-400">Molecular velocity probability density f(v)</p>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            v_rms = {data.vRms.toFixed(0)} m/s
          </span>
        </div>

        <svg viewBox="0 0 360 230" className="w-full h-60 bg-[#090d16] rounded-xl border border-white/10 p-2">
          <line x1="10" y1="210" x2="350" y2="210" stroke="#334155" strokeWidth="1.5" />
          <path d={`${distPath} L 340 210 L 0 210 Z`} fill="rgba(251, 113, 133, 0.18)" />
          <path d={distPath} fill="none" stroke="#FB7185" strokeWidth="3" />
          {/* v_rms vertical marker */}
          {(() => {
            const rmsX = Math.min(340, (data.vRms / 3200) * 340);
            return (
              <g>
                <line x1={rmsX} y1="20" x2={rmsX} y2="210" stroke="#22D3EE" strokeDasharray="4 3" strokeWidth="1.8" />
                <text x={Math.min(285, rmsX + 6)} y="36" fill="#22D3EE" fontSize="11" fontFamily="monospace">
                  v_rms ({data.vRms.toFixed(0)} m/s)
                </text>
              </g>
            );
          })()}
        </svg>

        <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
          <span>v_mp: {data.vMostProbable.toFixed(0)} m/s</span>
          <span>v_avg: {data.vMean.toFixed(0)} m/s</span>
          <span className="text-cyan-300">v_rms: {data.vRms.toFixed(0)} m/s</span>
        </div>
      </div>
    </div>
  );
}
