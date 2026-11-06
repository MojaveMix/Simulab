// Additional simulations added for the lesson-search feature:
// metadata (for the registry) + pure compute helpers (for telemetry and rendering).

const G = 9.81;

/* ------------------------------------------------------------------ */
/*  Function Grapher                                                  */
/* ------------------------------------------------------------------ */

const fmt = (v, d = 2) => {
  const r = Math.round(v * 10 ** d) / 10 ** d;
  return Object.is(r, -0) ? "0" : String(r);
};
const sgn = (v, d = 2) => (v < 0 ? `- ${fmt(-v, d)}` : `+ ${fmt(v, d)}`);

export const FUNCTION_TYPES = {
  linear: {
    label: "Linear",
    f: (p, x) => p.a * x + p.b,
    text: (p) => `y = ${fmt(p.a)}x ${sgn(p.b)}`,
    controls: [
      ["a", "Slope (a)", -5, 5, 0.1],
      ["b", "Y-intercept (b)", -6, 6, 0.1],
    ],
  },
  quadratic: {
    label: "Quadratic",
    f: (p, x) => p.a * x * x + p.b * x + p.c,
    text: (p) => `y = ${fmt(p.a)}x² ${sgn(p.b)}x ${sgn(p.c)}`,
    controls: [
      ["a", "Opening (a)", -3, 3, 0.1],
      ["b", "Tilt (b)", -6, 6, 0.1],
      ["c", "Y-intercept (c)", -6, 6, 0.1],
    ],
  },
  cubic: {
    label: "Cubic",
    f: (p, x) => p.a * x ** 3 + p.b * x * x + p.c * x + p.d,
    text: (p) => `y = ${fmt(p.a)}x³ ${sgn(p.b)}x² ${sgn(p.c)}x ${sgn(p.d)}`,
    controls: [
      ["a", "Cubic term (a)", -1, 1, 0.05],
      ["b", "Square term (b)", -3, 3, 0.1],
      ["c", "Linear term (c)", -6, 6, 0.1],
      ["d", "Constant (d)", -6, 6, 0.1],
    ],
  },
  exponential: {
    label: "Exponential",
    f: (p, x) => p.a * Math.exp(p.b * x) + p.c,
    text: (p) => `y = ${fmt(p.a)}·e^(${fmt(p.b)}x) ${sgn(p.c)}`,
    controls: [
      ["a", "Start size (a)", -4, 4, 0.1],
      ["b", "Growth rate (b)", -1.5, 1.5, 0.05],
      ["c", "Vertical shift (c)", -5, 5, 0.1],
    ],
  },
  log: {
    label: "Logarithm",
    f: (p, x) => (x - p.b > 0 ? p.a * Math.log(x - p.b) + p.c : NaN),
    text: (p) => `y = ${fmt(p.a)}·ln(x ${sgn(-p.b)}) ${sgn(p.c)}`,
    controls: [
      ["a", "Stretch (a)", -4, 4, 0.1],
      ["b", "Horizontal shift (b)", -5, 5, 0.1],
      ["c", "Vertical shift (c)", -5, 5, 0.1],
    ],
  },
  sine: {
    label: "Sine",
    f: (p, x) => p.a * Math.sin(p.b * x + p.c) + p.d,
    text: (p) => `y = ${fmt(p.a)}·sin(${fmt(p.b)}x ${sgn(p.c)}) ${sgn(p.d)}`,
    controls: [
      ["a", "Amplitude (a)", -4, 4, 0.1],
      ["b", "Frequency (b)", 0.2, 4, 0.1],
      ["c", "Phase shift (c)", -3.14, 3.14, 0.05],
      ["d", "Vertical shift (d)", -4, 4, 0.1],
    ],
  },
  cosine: {
    label: "Cosine",
    f: (p, x) => p.a * Math.cos(p.b * x + p.c) + p.d,
    text: (p) => `y = ${fmt(p.a)}·cos(${fmt(p.b)}x ${sgn(p.c)}) ${sgn(p.d)}`,
    controls: [
      ["a", "Amplitude (a)", -4, 4, 0.1],
      ["b", "Frequency (b)", 0.2, 4, 0.1],
      ["c", "Phase shift (c)", -3.14, 3.14, 0.05],
      ["d", "Vertical shift (d)", -4, 4, 0.1],
    ],
  },
  tangent: {
    label: "Tangent",
    f: (p, x) => p.a * Math.tan(p.b * x + p.c) + p.d,
    text: (p) => `y = ${fmt(p.a)}·tan(${fmt(p.b)}x ${sgn(p.c)}) ${sgn(p.d)}`,
    controls: [
      ["a", "Stretch (a)", -3, 3, 0.1],
      ["b", "Frequency (b)", 0.2, 3, 0.1],
      ["c", "Phase shift (c)", -3.14, 3.14, 0.05],
      ["d", "Vertical shift (d)", -4, 4, 0.1],
    ],
  },
  abs: {
    label: "Absolute value",
    f: (p, x) => p.a * Math.abs(x - p.b) + p.c,
    text: (p) => `y = ${fmt(p.a)}·|x ${sgn(-p.b)}| ${sgn(p.c)}`,
    controls: [
      ["a", "Steepness (a)", -3, 3, 0.1],
      ["b", "Corner x (b)", -6, 6, 0.1],
      ["c", "Corner y (c)", -6, 6, 0.1],
    ],
  },
  sqrt: {
    label: "Square root",
    f: (p, x) => (x - p.b >= 0 ? p.a * Math.sqrt(x - p.b) + p.c : NaN),
    text: (p) => `y = ${fmt(p.a)}·√(x ${sgn(-p.b)}) ${sgn(p.c)}`,
    controls: [
      ["a", "Stretch (a)", -4, 4, 0.1],
      ["b", "Start x (b)", -6, 6, 0.1],
      ["c", "Start y (c)", -6, 6, 0.1],
    ],
  },
  reciprocal: {
    label: "Rational 1/x",
    f: (p, x) => (Math.abs(x - p.b) < 1e-9 ? NaN : p.a / (x - p.b) + p.c),
    text: (p) => `y = ${fmt(p.a)} / (x ${sgn(-p.b)}) ${sgn(p.c)}`,
    controls: [
      ["a", "Numerator (a)", -6, 6, 0.1],
      ["b", "Vertical asymptote (b)", -6, 6, 0.1],
      ["c", "Horizontal asymptote (c)", -5, 5, 0.1],
    ],
  },
  gaussian: {
    label: "Bell curve",
    f: (p, x) => p.a * Math.exp(-((x - p.b) ** 2) / (2 * Math.max(0.2, p.c) ** 2)) + p.d,
    text: (p) => `y = ${fmt(p.a)}·e^(−(x ${sgn(-p.b)})² / ${fmt(2 * Math.max(0.2, p.c) ** 2)}) ${sgn(p.d)}`,
    controls: [
      ["a", "Height (a)", -5, 5, 0.1],
      ["b", "Center (b)", -6, 6, 0.1],
      ["c", "Width (σ)", 0.3, 4, 0.1],
      ["d", "Vertical shift (d)", -4, 4, 0.1],
    ],
  },
};

export function evalFunction(params, x) {
  const t = FUNCTION_TYPES[params.fn] || FUNCTION_TYPES.quadratic;
  return t.f(params, x);
}

function findRoots(params, lo = -10, hi = 10, n = 800) {
  const roots = [];
  let px = lo;
  let py = evalFunction(params, px);
  for (let i = 1; i <= n; i++) {
    const x = lo + ((hi - lo) * i) / n;
    const y = evalFunction(params, x);
    if (Number.isFinite(py) && Number.isFinite(y) && py * y <= 0 && !(py === 0 && y === 0)) {
      let a = px;
      let b = x;
      for (let k = 0; k < 40; k++) {
        const m = (a + b) / 2;
        const fm = evalFunction(params, m);
        if (evalFunction(params, a) * fm <= 0) b = m;
        else a = m;
      }
      const r = (a + b) / 2;
      if (Math.abs(evalFunction(params, r)) < 1e-3 && !roots.some((q) => Math.abs(q - r) < 1e-2)) {
        roots.push(r);
      }
    }
    px = x;
    py = y;
  }
  return roots;
}

export function computeFunctionGrapher(params) {
  const h = 1e-4;
  const x0 = params.x0 ?? 1;
  const y0 = evalFunction(params, x0);
  const slope = (evalFunction(params, x0 + h) - evalFunction(params, x0 - h)) / (2 * h);
  const yInt = evalFunction(params, 0);
  const roots = findRoots(params);
  let discriminant = null;
  if (params.fn === "quadratic") discriminant = params.b ** 2 - 4 * params.a * params.c;
  return { x0, y0, slope, yInt, roots, discriminant };
}

/* ------------------------------------------------------------------ */
/*  Unit circle                                                       */
/* ------------------------------------------------------------------ */

export function computeUnitCircle(params) {
  const rad = ((params.angleDeg ?? 45) * Math.PI) / 180;
  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const t = Math.abs(c) < 1e-9 ? NaN : s / c;
  const quadrant = (() => {
    const d = ((params.angleDeg % 360) + 360) % 360;
    if (d % 90 === 0) return "On an axis";
    return ["I", "II", "III", "IV"][Math.floor(d / 90)];
  })();
  return { rad, sin: s, cos: c, tan: t, identity: s * s + c * c, quadrant };
}

/* ------------------------------------------------------------------ */
/*  Spring-mass oscillator                                            */
/* ------------------------------------------------------------------ */

export function computeSpring(params) {
  const m = params.mass;
  const k = params.stiffness;
  const b = params.damping;
  const w0 = Math.sqrt(k / m);
  const gamma = b / (2 * m);
  const zeta = b / (2 * Math.sqrt(k * m));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  const regime = zeta === 0 ? "No damping (forever)" : zeta < 1 ? "Underdamped (fades out)" : zeta === 1 ? "Critically damped" : "Overdamped (slow return)";
  const A = params.amplitude;
  const position = (t) => {
    if (zeta < 1) return A * Math.exp(-gamma * t) * Math.cos(wd * t);
    if (Math.abs(zeta - 1) < 1e-6) return A * Math.exp(-gamma * t) * (1 + gamma * t);
    const root = Math.sqrt(gamma * gamma - w0 * w0);
    const r1 = -gamma + root;
    const r2 = -gamma - root;
    return (A * (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t))) / (r2 - r1);
  };
  const loopTime = gamma > 0 ? Math.min(18, Math.max(5, Math.log(60) / gamma)) : Math.max(8, (2 * Math.PI / w0) * 3);
  return {
    w0,
    period: (2 * Math.PI) / w0,
    frequency: w0 / (2 * Math.PI),
    zeta,
    regime,
    energy: 0.5 * k * A * A,
    maxSpeed: A * w0,
    loopTime,
    position,
  };
}

/* ------------------------------------------------------------------ */
/*  Circuits                                                          */
/* ------------------------------------------------------------------ */

export function computeCircuit(params) {
  const V = params.voltage;
  const r1 = params.r1;
  const r2 = params.r2;
  const parallel = params.mode === "parallel";
  const rEq = parallel ? (r1 * r2) / (r1 + r2) : r1 + r2;
  const I = V / rEq;
  const i1 = parallel ? V / r1 : I;
  const i2 = parallel ? V / r2 : I;
  const v1 = parallel ? V : I * r1;
  const v2 = parallel ? V : I * r2;
  return { parallel, rEq, I, i1, i2, v1, v2, power: V * I, p1: v1 * i1, p2: v2 * i2 };
}

/* ------------------------------------------------------------------ */
/*  Inclined plane / Newton's laws                                    */
/* ------------------------------------------------------------------ */

export function computeIncline(params) {
  const th = (params.angleDeg * Math.PI) / 180;
  const m = params.mass;
  const mu = params.friction;
  const F = params.applied;
  const W = m * G;
  const N = W * Math.cos(th);
  const along = W * Math.sin(th);
  const net0 = F - along; // positive = up the slope
  const maxFriction = mu * N;
  let accel = 0;
  let frictionForce = Math.abs(net0) <= maxFriction ? -net0 : -Math.sign(net0) * maxFriction;
  let status = "Stays still: friction holds it";
  if (Math.abs(net0) > maxFriction) {
    accel = (net0 - Math.sign(net0) * maxFriction) / m;
    status = accel > 0 ? "Accelerates up the slope" : "Slides down the slope";
  }
  return { th, W, N, along, F, frictionForce, accel, maxFriction, status, netForce: m * accel };
}

/* ------------------------------------------------------------------ */
/*  Registry entries                                                  */
/* ------------------------------------------------------------------ */

export const EXTRA_SIMULATIONS = [
  {
    id: "function-grapher",
    title: "Function Grapher — See Any Equation Come Alive",
    shortTitle: "Function Grapher",
    domain: "mathematics",
    category: "Algebra, Functions & Graphs",
    badge: "Live Graphs",
    accentColor: "#FACC15",
    renderType: "2D Animated Grapher",
    difficulty: "All Levels",
    summary:
      "Pick a function family (line, parabola, sine, exponential, log…) and drag its numbers to watch the graph, roots, slope and tangent line change instantly.",
    formulas: [
      {
        name: "Slope of a curve (derivative)",
        latex: "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0+h) - f(x_0)}{h}",
        desc: "The steepness of the graph at one exact point — the orange tangent line.",
      },
      {
        name: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        desc: "Where a parabola crosses the x-axis. The part under the root is the discriminant.",
      },
      {
        name: "Graph transformations",
        latex: "y = a \\cdot f(b(x - h)) + k",
        desc: "Stretch, squeeze, slide and flip any function using a few numbers.",
      },
    ],
    theory:
      "Every function turns an input x into an output y. Drawing all the (x, y) pairs gives its graph. Changing the coefficients stretches, flips or slides the picture — and the tangent line shows how fast the output changes at any chosen point, which is the core idea of calculus.",
    defaultParams: { fn: "quadratic", a: 1, b: 0, c: -2, d: 0, x0: 1 },
    getParamControls: (params) => {
      const t = FUNCTION_TYPES[params.fn] || FUNCTION_TYPES.quadratic;
      return [
        ...t.controls.map(([key, label, min, max, step]) => ({ key, label, min, max, step, unit: "" })),
        { key: "x0", label: "Tangent point (x₀)", min: -7, max: 7, step: 0.1, unit: "" },
      ];
    },
    presets: [
      { name: "Straight line y = 2x + 1", params: { fn: "linear", a: 2, b: 1, c: 0, d: 0, x0: 1 } },
      { name: "Parabola with two roots", params: { fn: "quadratic", a: 1, b: 0, c: -4, d: 0, x0: 1 } },
      { name: "Sine wave", params: { fn: "sine", a: 2, b: 1, c: 0, d: 0, x0: 0.5 } },
      { name: "Exponential growth", params: { fn: "exponential", a: 1, b: 0.5, c: 0, d: 0, x0: 1 } },
    ],
  },
  {
    id: "unit-circle-trig",
    title: "Unit Circle & Trigonometry",
    shortTitle: "Unit Circle",
    domain: "mathematics",
    category: "Trigonometry & Geometry",
    badge: "Animated Circle",
    accentColor: "#F472B6",
    renderType: "2D Animated Unit Circle",
    difficulty: "Beginner",
    summary:
      "Spin a point around the unit circle and watch sine and cosine unroll into waves, with a live right triangle proving sin² + cos² = 1.",
    formulas: [
      {
        name: "Sine and cosine on the circle",
        latex: "(\\cos\\theta,\\ \\sin\\theta) \\text{ is the point on a circle of radius } 1",
        desc: "Cosine is how far right the point is; sine is how high it is.",
      },
      {
        name: "Pythagorean identity",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
        desc: "The right triangle inside the circle always has hypotenuse 1.",
      },
      {
        name: "Degrees and radians",
        latex: "\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\cdot \\frac{\\pi}{180}",
        desc: "A full turn is 360° = 2π radians.",
      },
    ],
    theory:
      "Trigonometry starts with a point travelling around a circle of radius 1. Its height is sin θ and its width is cos θ. Plot those against the angle and you get the familiar sine and cosine waves. Because the point stays on the circle, the Pythagorean theorem gives sin²θ + cos²θ = 1 at every angle.",
    defaultParams: { angleDeg: 40, speed: 0.6 },
    paramControls: [
      { key: "angleDeg", label: "Angle (θ)", min: 0, max: 360, step: 1, unit: "°" },
      { key: "speed", label: "Spin speed (0 = stop)", min: 0, max: 2.5, step: 0.1, unit: "rad/s" },
    ],
    presets: [
      { name: "30° — the 1/2 angle", params: { angleDeg: 30, speed: 0 } },
      { name: "45° — equal sides", params: { angleDeg: 45, speed: 0 } },
      { name: "90° — straight up", params: { angleDeg: 90, speed: 0 } },
      { name: "Keep spinning", params: { speed: 0.8 } },
    ],
  },
  {
    id: "spring-oscillator",
    title: "Spring, Mass & Simple Harmonic Motion",
    shortTitle: "Spring & SHM",
    domain: "physics",
    category: "Oscillations & Waves",
    badge: "Live Oscillator",
    accentColor: "#34D399",
    renderType: "2D Spring + Energy Graph",
    difficulty: "Beginner–Intermediate",
    summary:
      "Pull a mass on a spring and see its position graph, period, and the constant swap between kinetic and spring energy — with optional friction.",
    formulas: [
      {
        name: "Hooke's law",
        latex: "F = -k\\,x",
        desc: "A spring pulls back in proportion to how far it is stretched.",
      },
      {
        name: "Period of a spring",
        latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
        desc: "Heavier mass swings slower; stiffer spring swings faster.",
      },
      {
        name: "Damped motion",
        latex: "x(t) = A\\,e^{-\\gamma t}\\cos(\\omega_d t)",
        desc: "Friction shrinks each swing until the motion dies out.",
      },
    ],
    theory:
      "Simple harmonic motion appears whenever a restoring force grows in proportion to displacement: springs, pendulums at small angles, vibrating atoms. Energy sloshes back and forth between motion (kinetic) and stretch (potential) while the total stays constant — unless friction takes some away each cycle.",
    defaultParams: { mass: 1.5, stiffness: 20, amplitude: 1.2, damping: 0.4 },
    paramControls: [
      { key: "mass", label: "Mass (m)", min: 0.5, max: 6, step: 0.1, unit: "kg" },
      { key: "stiffness", label: "Spring stiffness (k)", min: 4, max: 80, step: 1, unit: "N/m" },
      { key: "amplitude", label: "Starting stretch (A)", min: 0.3, max: 1.6, step: 0.1, unit: "m" },
      { key: "damping", label: "Friction (b)", min: 0, max: 8, step: 0.1, unit: "kg/s" },
    ],
    presets: [
      { name: "Frictionless forever", params: { mass: 1.5, stiffness: 20, amplitude: 1.2, damping: 0 } },
      { name: "Light friction", params: { mass: 1.5, stiffness: 20, amplitude: 1.2, damping: 0.6 } },
      { name: "Critical damping (door closer)", params: { mass: 1, stiffness: 16, amplitude: 1.2, damping: 8 } },
      { name: "Heavy mass, slow swing", params: { mass: 5, stiffness: 8, amplitude: 1.4, damping: 0.1 } },
    ],
  },
  {
    id: "circuit-ohm-lab",
    title: "Electric Circuits & Ohm's Law",
    shortTitle: "Circuits & Ohm",
    domain: "physics",
    category: "Electricity & Magnetism",
    badge: "Flowing Current",
    accentColor: "#FDE047",
    renderType: "2D Animated Circuit",
    difficulty: "Beginner",
    summary:
      "Build a series or parallel circuit with two resistors and watch the electrons speed up or slow down as voltage and resistance change.",
    formulas: [
      {
        name: "Ohm's law",
        latex: "V = I\\,R",
        desc: "Voltage pushes current through a resistance.",
      },
      {
        name: "Resistors in series and parallel",
        latex: "R_{\\text{series}} = R_1 + R_2,\\qquad \\frac{1}{R_{\\text{parallel}}} = \\frac{1}{R_1} + \\frac{1}{R_2}",
        desc: "Series adds up; parallel gives the current extra paths so total resistance falls.",
      },
      {
        name: "Electric power",
        latex: "P = V\\,I = I^2 R",
        desc: "How fast the circuit turns electrical energy into heat or light.",
      },
    ],
    theory:
      "A battery creates a voltage that pushes charge around a loop. A resistor limits how much current flows. In series the same current passes through every part and the voltage is shared; in parallel every branch gets the full voltage and the currents add up.",
    defaultParams: { voltage: 12, r1: 20, r2: 30, mode: "series" },
    paramControls: [
      { key: "voltage", label: "Battery voltage (V)", min: 1, max: 24, step: 1, unit: "V" },
      { key: "r1", label: "Resistor 1 (R₁)", min: 5, max: 100, step: 1, unit: "Ω" },
      { key: "r2", label: "Resistor 2 (R₂)", min: 5, max: 100, step: 1, unit: "Ω" },
    ],
    presets: [
      { name: "Series: 12 V, 20 Ω + 30 Ω", params: { voltage: 12, r1: 20, r2: 30, mode: "series" } },
      { name: "Parallel: 12 V, 20 Ω ‖ 30 Ω", params: { voltage: 12, r1: 20, r2: 30, mode: "parallel" } },
      { name: "Strong battery, tiny resistors", params: { voltage: 24, r1: 8, r2: 10, mode: "parallel" } },
    ],
  },
  {
    id: "incline-forces-lab",
    title: "Newton's Laws, Forces & Inclined Plane",
    shortTitle: "Forces & Incline",
    domain: "physics",
    category: "Classical Mechanics & Forces",
    badge: "Free-Body Diagram",
    accentColor: "#FB923C",
    renderType: "2D Force Arrows + Motion",
    difficulty: "Beginner–Intermediate",
    summary:
      "Tilt a ramp, change the friction and push on the block. See every force arrow and how Newton's second law decides how it moves.",
    formulas: [
      {
        name: "Newton's second law",
        latex: "\\sum F = m\\,a",
        desc: "Net force equals mass times acceleration.",
      },
      {
        name: "Forces on a slope",
        latex: "N = mg\\cos\\theta,\\qquad F_{\\parallel} = mg\\sin\\theta",
        desc: "Gravity splits into a part pressing into the ramp and a part pulling down it.",
      },
      {
        name: "Friction",
        latex: "f_{\\max} = \\mu N",
        desc: "Friction can hold the block still until the pull exceeds μ times the normal force.",
      },
    ],
    theory:
      "Newton's three laws explain motion: objects keep their velocity unless a net force acts (1st), net force produces acceleration F = ma (2nd), and every force has an equal opposite partner (3rd). On a ramp, gravity splits into two parts — one pressing into the surface and one pulling along it — and friction fights the motion.",
    defaultParams: { angleDeg: 30, mass: 5, friction: 0.25, applied: 0 },
    paramControls: [
      { key: "angleDeg", label: "Ramp angle (θ)", min: 0, max: 70, step: 1, unit: "°" },
      { key: "mass", label: "Block mass (m)", min: 1, max: 20, step: 0.5, unit: "kg" },
      { key: "friction", label: "Friction coefficient (μ)", min: 0, max: 1, step: 0.05, unit: "" },
      { key: "applied", label: "Push up the ramp (F)", min: 0, max: 150, step: 1, unit: "N" },
    ],
    presets: [
      { name: "Slippery ice ramp", params: { angleDeg: 30, mass: 5, friction: 0, applied: 0 } },
      { name: "Block barely holds (μ=0.6)", params: { angleDeg: 30, mass: 5, friction: 0.6, applied: 0 } },
      { name: "Pushing it uphill", params: { angleDeg: 25, mass: 5, friction: 0.2, applied: 60 } },
      { name: "Flat floor, gentle push", params: { angleDeg: 0, mass: 5, friction: 0.2, applied: 20 } },
    ],
  },
];
