import { useEffect, useRef } from "react";
import {
  FUNCTION_TYPES,
  evalFunction,
  computeCircuit,
  computeIncline,
  computeSpring,
} from "../engine/extraSimulations";

/**
 * Full-size canvas that calls draw(ctx, w, h, t, dt) every animation frame.
 * `t` is the running time in seconds (frozen while paused).
 */
function AutoCanvas({ draw, isPlaying = true }) {
  const canvasRef = useRef(null);
  const drawRef = useRef(draw);
  const playRef = useRef(isPlaying);

  useEffect(() => {
    drawRef.current = draw;
    playRef.current = isPlaying;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now) => {
      const dt = playRef.current ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, t, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const label = (ctx, text, x, y, color = "#cbd5e1", size = 12, align = "left", weight = "600") => {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px Inter, system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
};

const arrow = (ctx, x1, y1, x2, y2, color, width = 3) => {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(ang - 0.4), y2 - 10 * Math.sin(ang - 0.4));
  ctx.lineTo(x2 - 10 * Math.cos(ang + 0.4), y2 - 10 * Math.sin(ang + 0.4));
  ctx.closePath();
  ctx.fill();
};

const glowBg = (ctx, w, h, c1 = "#0b1020", c2 = "#05070e") => {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
};

/* ------------------------------------------------------------------ */
/*  Function grapher                                                  */
/* ------------------------------------------------------------------ */

export function FunctionGrapher2D({ data, params, isPlaying, onChangeParam }) {
  const draw = (ctx, w, h, t) => {
    glowBg(ctx, w, h);
    const unit = w / 16;
    const cx = w / 2;
    const cy = h / 2;
    const X = (x) => cx + x * unit;
    const Y = (y) => cy - y * unit;

    // grid
    ctx.lineWidth = 1;
    for (let i = -Math.ceil(cx / unit); i <= Math.ceil(cx / unit); i++) {
      ctx.strokeStyle = i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(X(i), 0);
      ctx.lineTo(X(i), h);
      ctx.stroke();
      if (i !== 0 && i % 2 === 0) label(ctx, String(i), X(i), cy + 12, "#64748b", 10, "center");
    }
    for (let j = -Math.ceil(cy / unit); j <= Math.ceil(cy / unit); j++) {
      ctx.strokeStyle = j === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(0, Y(j));
      ctx.lineTo(w, Y(j));
      ctx.stroke();
      if (j !== 0 && j % 2 === 0) label(ctx, String(j), cx - 12, Y(j), "#64748b", 10, "center");
    }

    // the curve, drawn left-to-right with a glowing tip
    const xMin = -cx / unit;
    const xMax = cx / unit;
    const reveal = Math.min(1, t / 1.2);
    const stop = xMin + (xMax - xMin) * reveal;
    const steps = Math.floor(w);
    ctx.save();
    ctx.shadowColor = "#FACC15";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = "#FACC15";
    ctx.lineWidth = 3;
    ctx.beginPath();
    let pen = false;
    let prevY = 0;
    let tip = null;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      if (x > stop) break;
      const y = evalFunction(params, x);
      const py = Y(y);
      if (!Number.isFinite(y) || py < -h || py > 2 * h || (pen && Math.abs(py - prevY) > h * 0.9)) {
        pen = false;
        prevY = py;
        continue;
      }
      if (!pen) {
        ctx.moveTo(X(x), py);
        pen = true;
      } else ctx.lineTo(X(x), py);
      prevY = py;
      tip = [X(x), py];
    }
    ctx.stroke();
    ctx.restore();
    if (tip && reveal < 1) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // roots
    data.roots.forEach((r) => {
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(X(r), Y(0), 5, 0, Math.PI * 2);
      ctx.fill();
      label(ctx, `x=${r.toFixed(2)}`, X(r), Y(0) + 18, "#34d399", 11, "center");
    });

    // y-intercept
    if (Number.isFinite(data.yInt) && Math.abs(data.yInt) < cy / unit) {
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(X(0), Y(data.yInt), 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // tangent line + moving point
    if (Number.isFinite(data.y0) && Math.abs(data.slope) < 1e4) {
      const span = 3.5;
      ctx.strokeStyle = "#fb923c";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(X(data.x0 - span), Y(data.y0 - data.slope * span));
      ctx.lineTo(X(data.x0 + span), Y(data.y0 + data.slope * span));
      ctx.stroke();
      ctx.setLineDash([]);
      const pulse = 7 + Math.sin(t * 4) * 2;
      ctx.fillStyle = "rgba(251,146,60,0.25)";
      ctx.beginPath();
      ctx.arc(X(data.x0), Y(data.y0), pulse + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.arc(X(data.x0), Y(data.y0), 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // equation HUD
    const type = FUNCTION_TYPES[params.fn] || FUNCTION_TYPES.quadratic;
    ctx.fillStyle = "rgba(2,6,23,0.75)";
    ctx.beginPath();
    ctx.roundRect(w - 16 - 340, h - 16 - 34, 340, 34, 10);
    ctx.fill();
    label(ctx, type.text(params), w - 28, h - 33, "#fde68a", 14, "right", "700");
  };

  return (
    <>
      <AutoCanvas draw={draw} isPlaying={isPlaying} />
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap gap-1.5">
        {Object.entries(FUNCTION_TYPES).map(([id, f]) => {
          const defaults = { a: 1, b: 0, c: 0, d: 0 };
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                const next = {
                  quadratic: { a: 1, b: 0, c: -2, d: 0 },
                  linear: { a: 1, b: 0, c: 0, d: 0 },
                  cubic: { a: 0.2, b: 0, c: -1, d: 0 },
                  exponential: { a: 1, b: 0.5, c: 0, d: 0 },
                  log: { a: 2, b: 0, c: 0, d: 0 },
                  sine: { a: 2, b: 1, c: 0, d: 0 },
                  cosine: { a: 2, b: 1, c: 0, d: 0 },
                  tangent: { a: 1, b: 1, c: 0, d: 0 },
                  abs: { a: 1, b: 0, c: 0, d: 0 },
                  sqrt: { a: 2, b: 0, c: 0, d: 0 },
                  reciprocal: { a: 2, b: 0, c: 0, d: 0 },
                  gaussian: { a: 4, b: 0, c: 1.2, d: 0 },
                }[id] || defaults;
                Object.entries({ fn: id, ...next }).forEach(([k, v]) => onChangeParam(k, v));
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border backdrop-blur-md cursor-pointer transition-all ${
                params.fn === id
                  ? "bg-yellow-400/25 border-yellow-300 text-white"
                  : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Unit circle                                                       */
/* ------------------------------------------------------------------ */

export function UnitCircle2D({ params, isPlaying }) {
  const state = useRef({ angle: ((params.angleDeg ?? 40) * Math.PI) / 180, last: params.angleDeg });

  const draw = (ctx, w, h, t, dt) => {
    const s = state.current;
    if (s.last !== params.angleDeg) {
      s.angle = (params.angleDeg * Math.PI) / 180;
      s.last = params.angleDeg;
    } else if (isPlaying && params.speed > 0) {
      s.angle = (s.angle + dt * params.speed) % (Math.PI * 2);
    }
    const th = s.angle;
    glowBg(ctx, w, h);

    const R = Math.min(w * 0.2, h * 0.34);
    const cx = w * 0.27;
    const cy = h * 0.5;

    // axes + circle
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.35, cy);
    ctx.lineTo(cx + R * 1.35, cy);
    ctx.moveTo(cx, cy - R * 1.35);
    ctx.lineTo(cx, cy + R * 1.35);
    ctx.stroke();
    ctx.strokeStyle = "#a5b4fc";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // swept angle arc
    ctx.fillStyle = "rgba(244,114,182,0.15)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R * 0.35, 0, -th, true);
    ctx.closePath();
    ctx.fill();

    const px = cx + R * Math.cos(th);
    const py = cy - R * Math.sin(th);

    // triangle
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#22d3ee";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, cy);
    ctx.stroke();
    ctx.strokeStyle = "#f472b6";
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#f472b6";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const c = Math.cos(th);
    const sn = Math.sin(th);
    label(ctx, `cos θ = ${c.toFixed(3)}`, cx, cy + R * 1.5, "#22d3ee", 13, "center", "700");
    label(ctx, `sin θ = ${sn.toFixed(3)}`, cx, cy + R * 1.5 + 20, "#f472b6", 13, "center", "700");
    label(ctx, `θ = ${((th * 180) / Math.PI).toFixed(0)}° = ${th.toFixed(2)} rad`, cx, cy - R * 1.5, "#fde68a", 13, "center", "700");

    // waves
    const wx0 = w * 0.52;
    const wx1 = w * 0.96;
    const amp = R;
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(wx0, cy);
    ctx.lineTo(wx1, cy);
    ctx.stroke();
    label(ctx, "angle →", wx1, cy + 16, "#64748b", 10, "right");
    const WX = (a) => wx0 + ((wx1 - wx0) * a) / (Math.PI * 2);
    [
      ["#f472b6", Math.sin],
      ["#22d3ee", Math.cos],
    ].forEach(([color, fn]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2;
        const y = cy - amp * fn(a);
        if (i === 0) ctx.moveTo(WX(a), y);
        else ctx.lineTo(WX(a), y);
      }
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(WX(th), cy - amp * fn(th), 5.5, 0, Math.PI * 2);
      ctx.fill();
    });
    // connector from circle to the sine wave
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(244,114,182,0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(WX(th), py);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.moveTo(WX(th), cy);
    ctx.lineTo(WX(th), py);
    ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, "sin", wx1 - 6, cy - amp - 14, "#f472b6", 12, "right", "800");
    label(ctx, "cos", wx1 - 46, cy - amp - 14, "#22d3ee", 12, "right", "800");
    label(ctx, `sin² + cos² = ${(sn * sn + c * c).toFixed(3)}`, (wx0 + wx1) / 2, h - 28, "#a7f3d0", 14, "center", "800");
    // keep the lint happy about the unused time argument while staying frame-based
    void t;
  };

  return <AutoCanvas draw={draw} isPlaying={isPlaying} />;
}

/* ------------------------------------------------------------------ */
/*  Spring oscillator                                                 */
/* ------------------------------------------------------------------ */

export function SpringOscillator2D({ params, isPlaying }) {
  const model = computeSpring(params);

  const draw = (ctx, w, h, t) => {
    glowBg(ctx, w, h);
    const tt = t % model.loopTime;
    const x = model.position(tt);
    const eps = 1e-3;
    const v = (model.position(tt + eps) - model.position(tt - eps)) / (2 * eps);
    const A = params.amplitude;

    // top: spring + mass
    const floorY = h * 0.34;
    const wallX = 40;
    const eqX = w * 0.52;
    const scale = (w * 0.34) / 1.6;
    const bx = eqX + x * scale;
    const bw = 34 + params.mass * 7;
    const bh = 54;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(wallX - 14, floorY - 60, 14, 120);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(wallX, floorY + bh / 2, w - wallX - 30, 6);

    // zig-zag spring
    const sx0 = wallX;
    const sx1 = bx - bw / 2;
    const coils = 14;
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx0, floorY);
    for (let i = 1; i < coils * 2; i++) {
      const px = sx0 + ((sx1 - sx0) * i) / (coils * 2);
      ctx.lineTo(px, floorY + (i % 2 ? -16 : 16));
    }
    ctx.lineTo(sx1, floorY);
    ctx.stroke();

    // equilibrium marker
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(52,211,153,0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(eqX, floorY - 60);
    ctx.lineTo(eqX, floorY + 80);
    ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, "rest position", eqX, floorY - 70, "#34d399", 11, "center");

    // block
    const grad = ctx.createLinearGradient(0, floorY - bh / 2, 0, floorY + bh / 2);
    grad.addColorStop(0, "#34d399");
    grad.addColorStop(1, "#059669");
    ctx.fillStyle = grad;
    ctx.shadowColor = "#34d399";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect(bx - bw / 2, floorY - bh / 2, bw, bh, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    label(ctx, `${params.mass} kg`, bx, floorY, "#022c22", 13, "center", "800");

    // velocity arrow
    if (Math.abs(v) > 0.02) {
      arrow(ctx, bx, floorY - bh / 2 - 14, bx + Math.max(-90, Math.min(90, v * 22)), floorY - bh / 2 - 14, "#fbbf24", 3);
    }

    // bottom: x(t) graph
    const gx0 = 56;
    const gx1 = w * 0.72;
    const gy = h * 0.72;
    const gh = h * 0.17;
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx0, gy);
    ctx.lineTo(gx1, gy);
    ctx.moveTo(gx0, gy - gh - 6);
    ctx.lineTo(gx0, gy + gh + 6);
    ctx.stroke();
    label(ctx, "position over time", gx0, gy - gh - 18, "#94a3b8", 11);
    ctx.strokeStyle = "#34d399";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const time = (i / 240) * model.loopTime;
      const px = gx0 + ((gx1 - gx0) * i) / 240;
      const py = gy - (model.position(time) / 1.6) * gh;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    const cxg = gx0 + ((gx1 - gx0) * tt) / model.loopTime;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cxg, gy - (x / 1.6) * gh, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // energy bars
    const ke = 0.5 * params.mass * v * v;
    const pe = 0.5 * params.stiffness * x * x;
    const eMax = 0.5 * params.stiffness * A * A || 1;
    const bxE = w * 0.78;
    const barW = 34;
    const barH = h * 0.3;
    const baseY = h * 0.88;
    [
      ["Motion", ke, "#fbbf24"],
      ["Spring", pe, "#38bdf8"],
    ].forEach(([name, val, color], i) => {
      const x0 = bxE + i * 70;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(x0, baseY - barH, barW, barH);
      ctx.fillStyle = color;
      const hh = Math.min(barH, (val / eMax) * barH);
      ctx.fillRect(x0, baseY - hh, barW, hh);
      label(ctx, name, x0 + barW / 2, baseY + 14, "#94a3b8", 11, "center");
    });
    label(ctx, "energy", bxE + 52, baseY - barH - 14, "#94a3b8", 11, "center");
  };

  return <AutoCanvas draw={draw} isPlaying={isPlaying} />;
}

/* ------------------------------------------------------------------ */
/*  Circuit                                                           */
/* ------------------------------------------------------------------ */

function pointAlong(poly, s) {
  const lens = [];
  let total = 0;
  for (let i = 0; i < poly.length - 1; i++) {
    const l = Math.hypot(poly[i + 1][0] - poly[i][0], poly[i + 1][1] - poly[i][1]);
    lens.push(l);
    total += l;
  }
  let d = (((s % 1) + 1) % 1) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const f = d / lens[i];
      return [poly[i][0] + (poly[i + 1][0] - poly[i][0]) * f, poly[i][1] + (poly[i + 1][1] - poly[i][1]) * f];
    }
    d -= lens[i];
  }
  return poly[poly.length - 1];
}

export function CircuitLab2D({ params, isPlaying, onChangeParam }) {
  const model = computeCircuit(params);
  const phase = useRef([0, 0]);

  const draw = (ctx, w, h, t, dt) => {
    glowBg(ctx, w, h);
    const L = w * 0.12;
    const Rr = w * 0.88;
    const T = h * 0.22;
    const B = h * 0.78;
    const parallel = model.parallel;

    // geometry
    const bx = L;
    const rx1 = parallel ? w * 0.45 : w * 0.4;
    const rx2 = parallel ? w * 0.72 : w * 0.66;

    // wires
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(bx, T);
    ctx.lineTo(parallel ? rx2 : Rr, T);
    ctx.moveTo(bx, B);
    ctx.lineTo(parallel ? rx2 : Rr, B);
    if (!parallel) {
      ctx.moveTo(Rr, T);
      ctx.lineTo(Rr, B);
    } else {
      ctx.moveTo(rx1, T);
      ctx.lineTo(rx1, B);
      ctx.moveTo(rx2, T);
      ctx.lineTo(rx2, B);
    }
    ctx.stroke();

    // resistor boxes
    const box = (x, y, vertical, name, ohms, color) => {
      ctx.fillStyle = "#0f172a";
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (vertical) ctx.roundRect(x - 20, y - 36, 40, 72, 8);
      else ctx.roundRect(x - 36, y - 20, 72, 40, 8);
      ctx.fill();
      ctx.stroke();
      label(ctx, name, x, y - 7, color, 12, "center", "800");
      label(ctx, `${ohms} Ω`, x, y + 9, "#e2e8f0", 11, "center");
    };
    if (parallel) {
      box(rx1, (T + B) / 2, true, "R₁", params.r1, "#fb923c");
      box(rx2, (T + B) / 2, true, "R₂", params.r2, "#a78bfa");
    } else {
      box(rx1, T, false, "R₁", params.r1, "#fb923c");
      box(rx2, T, false, "R₂", params.r2, "#a78bfa");
    }

    // battery
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(bx - 26, (T + B) / 2 - 36, 52, 72);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(bx - 22, (T + B) / 2 - 12, 44, 5);
    ctx.fillRect(bx - 12, (T + B) / 2 + 8, 24, 5);
    label(ctx, "+", bx + 36, (T + B) / 2 - 14, "#facc15", 18, "left", "800");
    label(ctx, `${params.voltage} V`, bx, B + 34, "#fde047", 14, "center", "800");

    // electrons
    const loops = parallel
      ? [
          { poly: [[bx, (T + B) / 2], [bx, T], [rx1, T], [rx1, B], [bx, B], [bx, (T + B) / 2]], cur: model.i1, color: "#fb923c" },
          { poly: [[bx, (T + B) / 2], [bx, T], [rx2, T], [rx2, B], [bx, B], [bx, (T + B) / 2]], cur: model.i2, color: "#a78bfa" },
        ]
      : [{ poly: [[bx, (T + B) / 2], [bx, T], [Rr, T], [Rr, B], [bx, B], [bx, (T + B) / 2]], cur: model.I, color: "#fde047" }];
    loops.forEach((lp, li) => {
      phase.current[li] = (phase.current[li] + dt * Math.min(0.9, lp.cur * 0.32)) % 1;
      const count = Math.max(8, Math.min(40, Math.round(8 + lp.cur * 12)));
      for (let i = 0; i < count; i++) {
        const [ex, ey] = pointAlong(lp.poly, phase.current[li] + i / count);
        ctx.fillStyle = lp.color;
        ctx.shadowColor = lp.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ex, ey, 3.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    });

    // meters
    label(ctx, `Total current  I = ${model.I.toFixed(2)} A`, w / 2, h * 0.07, "#fde047", 15, "center", "800");
    label(ctx, `Total resistance  R = ${model.rEq.toFixed(1)} Ω`, w / 2, h * 0.07 + 22, "#cbd5e1", 12, "center");
    void t;
  };

  return (
    <>
      <AutoCanvas draw={draw} isPlaying={isPlaying} />
      <div className="absolute top-3 left-3 z-20 flex gap-1.5">
        {["series", "parallel"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChangeParam("mode", m)}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold border capitalize backdrop-blur-md cursor-pointer ${
              params.mode === m
                ? "bg-yellow-400/25 border-yellow-300 text-white"
                : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Incline plane                                                     */
/* ------------------------------------------------------------------ */

export function InclineForces2D({ params, isPlaying }) {
  const m = computeIncline(params);

  const draw = (ctx, w, h, t) => {
    glowBg(ctx, w, h);
    const th = m.th;
    const slopeLen = Math.min(w * 0.7 / Math.max(Math.cos(th), 0.35), h * 0.62 / Math.max(Math.sin(th), 0.05), w * 0.7);
    const x0 = w * 0.12;
    const yBase = h * 0.82;
    const x1 = x0 + slopeLen * Math.cos(th);
    const y1 = yBase - slopeLen * Math.sin(th);

    // ramp
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x0, yBase);
    ctx.lineTo(x1, yBase);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (th > 0.03) {
      ctx.strokeStyle = "#fb923c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x0, yBase, 46, 0, -th, true);
      ctx.stroke();
      label(ctx, `${params.angleDeg}°`, x0 + 64, yBase - 12, "#fb923c", 13, "left", "800");
    }

    // motion along slope (looping)
    const dist = slopeLen * 0.62;
    let s = slopeLen * 0.5;
    if (Math.abs(m.accel) > 1e-6) {
      const goingUp = m.accel > 0;
      const start = goingUp ? slopeLen * 0.12 : slopeLen * 0.88;
      const scale = 22; // px per metre
      const travel = (goingUp ? 1 : -1) * dist;
      const tFull = Math.sqrt((2 * Math.abs(travel)) / (scale * Math.abs(m.accel)));
      const cycle = tFull + 0.9;
      const tt = t % cycle;
      s = start + 0.5 * m.accel * scale * Math.min(tt, tFull) ** 2;
    }
    s = Math.max(slopeLen * 0.08, Math.min(slopeLen * 0.92, s));

    const ux = Math.cos(th);
    const uy = -Math.sin(th);
    const nx = -Math.sin(th);
    const ny = -Math.cos(th);
    const bw = 42 + params.mass * 1.2;
    const bh = 34;
    const px = x0 + ux * s + nx * (bh / 2 + 1);
    const py = yBase + uy * s + ny * (bh / 2 + 1);

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-th);
    ctx.fillStyle = "#fb923c";
    ctx.shadowColor = "#fb923c";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
    ctx.fill();
    ctx.restore();
    label(ctx, `${params.mass} kg`, px, py, "#431407", 12, "center", "800");

    // force arrows
    const k = 70 / Math.max(m.W, 1);
    const cap = (v) => Math.max(-150, Math.min(150, v));
    arrow(ctx, px, py, px, py + cap(m.W * k), "#ef4444");
    label(ctx, "weight", px + 8, py + cap(m.W * k) + 4, "#fca5a5", 11);
    arrow(ctx, px, py, px + nx * cap(m.N * k), py + ny * cap(m.N * k), "#38bdf8");
    label(ctx, "normal", px + nx * cap(m.N * k) - 36, py + ny * cap(m.N * k) - 8, "#7dd3fc", 11);
    if (Math.abs(m.frictionForce) > 0.05) {
      const f = cap(m.frictionForce * k);
      arrow(ctx, px, py + 8, px + ux * f, py + 8 + uy * f, "#a3e635");
      label(ctx, "friction", px + ux * f, py + 22 + uy * f, "#bef264", 11, "center");
    }
    if (m.F > 0.05) {
      const f = cap(m.F * k);
      arrow(ctx, px, py - 8, px + ux * f, py - 8 + uy * f, "#fbbf24");
      label(ctx, "push", px + ux * f - 4, py - 22 + uy * f, "#fde68a", 11, "center");
    }

    // HUD
    ctx.fillStyle = "rgba(2,6,23,0.75)";
    ctx.beginPath();
    ctx.roundRect(w - 270, 16, 254, 62, 10);
    ctx.fill();
    label(ctx, m.status, w - 258, 36, "#fde68a", 12, "left", "800");
    label(ctx, `acceleration = ${m.accel.toFixed(2)} m/s²`, w - 258, 58, "#e2e8f0", 12);
  };

  return <AutoCanvas draw={draw} isPlaying={isPlaying} />;
}
