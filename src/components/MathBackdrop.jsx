import { useEffect, useRef } from "react";

const SYMBOLS = ["∑", "∫", "π", "√", "∞", "θ", "Δ", "λ", "φ", "ψ", "Ω", "∂", "e", "x²", "sin", "cos", "F=ma", "E=mc²", "∇", "ħ", "½", "≈", "∮", "μ"];

/**
 * Animated math-themed hero background: drifting symbols, flowing sine waves
 * and a faint coordinate grid that reacts gently to the mouse.
 */
export default function MathBackdrop({ isLight = false }) {
  const ref = useRef(null);
  const lightRef = useRef(isLight);

  useEffect(() => {
    lightRef.current = isLight;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const particles = Array.from({ length: 34 }, (_, i) => ({
      s: SYMBOLS[i % SYMBOLS.length],
      x: Math.random(),
      y: Math.random(),
      size: 14 + Math.random() * 30,
      speed: 0.01 + Math.random() * 0.025,
      drift: Math.random() * Math.PI * 2,
      depth: 0.3 + Math.random() * 0.9,
      hue: [190, 265, 320, 150, 45][i % 5],
    }));

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
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

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / Math.max(1, r.width);
      mouse.ty = (e.clientY - r.top) / Math.max(1, r.height);
    };
    window.addEventListener("pointermove", onMove);

    const draw = (now) => {
      const t = now / 1000;
      const light = lightRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);

      // coordinate grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = light ? "rgba(15,23,42,0.06)" : "rgba(148,163,184,0.07)";
      const step = 48;
      const ox = (mouse.x - 0.5) * -24;
      const oy = (mouse.y - 0.5) * -24;
      ctx.beginPath();
      for (let x = (ox % step) - step; x < w + step; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (oy % step) - step; y < h + step; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // flowing waves
      const waves = [
        { amp: 36, len: 260, speed: 0.9, y: 0.72, color: light ? "rgba(2,132,199,0.35)" : "rgba(34,211,238,0.35)" },
        { amp: 28, len: 190, speed: -1.2, y: 0.78, color: light ? "rgba(126,34,206,0.3)" : "rgba(168,85,247,0.32)" },
        { amp: 20, len: 340, speed: 0.6, y: 0.84, color: light ? "rgba(219,39,119,0.28)" : "rgba(244,114,182,0.28)" },
      ];
      waves.forEach((wv, i) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = wv.color;
        for (let x = 0; x <= w; x += 6) {
          const y =
            h * wv.y +
            Math.sin((x / wv.len) * Math.PI * 2 + t * wv.speed + i) * wv.amp * (1 + (mouse.y - 0.5) * 0.6) +
            Math.sin((x / (wv.len * 0.37)) * Math.PI * 2 - t * wv.speed * 1.6) * (wv.amp * 0.25);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // floating symbols
      particles.forEach((p) => {
        const py = (((p.y - t * p.speed * p.depth) % 1) + 1) % 1;
        const px = p.x + Math.sin(t * 0.4 + p.drift) * 0.02;
        const x = px * w + (mouse.x - 0.5) * 60 * p.depth;
        const y = py * h + (mouse.y - 0.5) * 40 * p.depth;
        const fade = Math.sin(py * Math.PI);
        ctx.font = `600 ${p.size}px "Cambria Math", "Times New Roman", serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = light
          ? `hsla(${p.hue}, 70%, 38%, ${0.18 * fade * p.depth})`
          : `hsla(${p.hue}, 90%, 72%, ${0.3 * fade * p.depth})`;
        ctx.fillText(p.s, x, y);
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
