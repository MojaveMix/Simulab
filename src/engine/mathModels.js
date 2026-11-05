// Validated Mathematical Models & Numerical Solvers for SimuLab

/**
 * Safe mathematical expression evaluator for single-variable f(x) and multi-variable f(x, y, t)
 * Supports standard functions: sin, cos, tan, exp, log, sqrt, abs, asin, acos, atan, sinh, cosh, tanh, pow, pi, e
 */
export function evaluateMathExpression(expr, vars = { x: 0, y: 0, t: 0 }) {
  if (!expr || typeof expr !== "string") return 0;
  try {
    const sanitized = expr
      .toLowerCase()
      .replace(/\^/g, "**")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E")
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\blog\b/g, "Math.log")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\babs\b/g, "Math.abs")
      .replace(/\basin\b/g, "Math.asin")
      .replace(/\bacos\b/g, "Math.acos")
      .replace(/\batan\b/g, "Math.atan")
      .replace(/\bsinh\b/g, "Math.sinh")
      .replace(/\bcosh\b/g, "Math.cosh")
      .replace(/\btanh\b/g, "Math.tanh");

    const fn = new Function("x", "y", "t", `return (${sanitized});`);
    const val = fn(vars.x ?? 0, vars.y ?? 0, vars.t ?? 0);
    return Number.isFinite(val) ? val : 0;
  } catch {
    return 0;
  }
}

/**
 * Calculus & Function Analysis Model
 * Computes f(x), first derivative f'(x) (central difference), second derivative f''(x),
 * definite integral via Simpson's 1/3 rule & Riemann sum rectangles, and Fourier/Taylor series approximation.
 */
export function computeCalculusAnalysis({
  presetId = "damped_sine",
  amplitude = 2.0,
  frequency = 1.5,
  damping = 0.25,
  phase = 0,
  x0 = 1.0,
  integralLower = -3.0,
  integralUpper = 3.0,
  riemannSubdivisions = 24,
  customExpr = "",
}) {
  const evalFn = (x) => {
    if (presetId === "custom" && customExpr.trim()) {
      return evaluateMathExpression(customExpr, { x, y: 0, t: phase });
    }
    switch (presetId) {
      case "damped_sine":
        return amplitude * Math.exp(-damping * Math.abs(x)) * Math.sin(frequency * x + phase);
      case "gaussian_wave":
        return amplitude * Math.exp(-0.35 * (damping + 0.2) * x * x) * Math.cos(frequency * x + phase);
      case "polynomial":
        return 0.15 * amplitude * (x * x * x - 3 * frequency * x) + Math.sin(phase);
      case "fourier_square": {
        let sum = 0;
        const harmonics = Math.max(1, Math.round(frequency * 3));
        for (let k = 1; k <= harmonics; k++) {
          const n = 2 * k - 1;
          sum += Math.sin(n * x + phase) / n;
        }
        return (amplitude * 4) / Math.PI * sum;
      }
      case "rational_resonance":
        return (amplitude * Math.cos(frequency * x + phase)) / (1 + (damping + 0.25) * x * x);
      default:
        return amplitude * Math.sin(frequency * x + phase);
    }
  };

  const h = 1e-4;
  const y0 = evalFn(x0);
  const dy = (evalFn(x0 + h) - evalFn(x0 - h)) / (2 * h);
  const d2y = (evalFn(x0 + h) - 2 * y0 + evalFn(x0 - h)) / (h * h);

  // Curvature kappa = |y''| / (1 + (y')^2)^(3/2)
  const curvature = Math.abs(d2y) / Math.pow(1 + dy * dy, 1.5);

  // Sample curve points across [-6, 6]
  const domainMin = -6;
  const domainMax = 6;
  const samples = 240;
  const step = (domainMax - domainMin) / samples;
  const curvePoints = [];

  for (let i = 0; i <= samples; i++) {
    const x = domainMin + i * step;
    const y = evalFn(x);
    const df = (evalFn(x + h) - evalFn(x - h)) / (2 * h);
    curvePoints.push({ x, y, df });
  }

  // Riemann sum & Simpson's rule over [integralLower, integralUpper]
  const a = Math.min(integralLower, integralUpper);
  const b = Math.max(integralLower, integralUpper);
  const nRect = Math.max(2, Math.min(120, Math.round(riemannSubdivisions)));
  const dx = (b - a) / nRect;
  const riemannRects = [];
  let riemannSum = 0;

  for (let i = 0; i < nRect; i++) {
    const xm = a + (i + 0.5) * dx;
    const ym = evalFn(xm);
    riemannSum += ym * dx;
    riemannRects.push({
      x: a + i * dx,
      width: dx,
      height: ym,
      xm,
    });
  }

  // High-accuracy Simpson's 1/3 Rule (N=200)
  const simpsonN = 200;
  const hSimp = (b - a) / simpsonN;
  let simpsonSum = evalFn(a) + evalFn(b);
  for (let i = 1; i < simpsonN; i++) {
    const x = a + i * hSimp;
    simpsonSum += (i % 2 === 0 ? 2 : 4) * evalFn(x);
  }
  const exactIntegral = (hSimp / 3) * simpsonSum;

  return {
    curvePoints,
    riemannRects,
    x0,
    y0,
    derivative: dy,
    secondDerivative: d2y,
    curvature,
    riemannSum,
    exactIntegral,
    integrationError: Math.abs(exactIntegral - riemannSum),
  };
}

/**
 * 3D Lorenz & Strange Attractor Chaos Solver (4th-Order Runge-Kutta)
 * Supports Lorenz, Rossler, and Thomas cyclically symmetric attractors.
 */
export function computeChaosAttractor({
  system = "lorenz",
  sigma = 10.0,
  rho = 28.0,
  beta = 2.667,
  steps = 1800,
  dt = 0.007,
}) {
  const deriv = (x, y, z) => {
    if (system === "rossler") {
      const a = 0.2;
      const b = 0.2;
      const c = Math.max(2.0, rho * 0.25);
      return {
        dx: -y - z,
        dy: x + a * y,
        dz: b + z * (x - c),
      };
    }
    if (system === "thomas") {
      const b = Math.max(0.08, Math.min(0.32, beta * 0.07));
      return {
        dx: Math.sin(y) - b * x,
        dy: Math.sin(z) - b * y,
        dz: Math.sin(x) - b * z,
      };
    }
    // Default Lorenz system
    return {
      dx: sigma * (y - x),
      dy: x * (rho - z) - y,
      dz: x * y - beta * z,
    };
  };

  let x = system === "thomas" ? 1.1 : 0.1;
  let y = system === "thomas" ? 1.1 : 0.0;
  let z = system === "thomas" ? -0.01 : 0.0;

  const points = [];
  let maxSpeed = 0;

  const scale = system === "lorenz" ? 0.18 : system === "rossler" ? 0.35 : 1.65;
  const zOffset = system === "lorenz" ? -25 : system === "rossler" ? -5 : 0;

  for (let i = 0; i < steps; i++) {
    const k1 = deriv(x, y, z);
    const k2 = deriv(
      x + 0.5 * dt * k1.dx,
      y + 0.5 * dt * k1.dy,
      z + 0.5 * dt * k1.dz
    );
    const k3 = deriv(
      x + 0.5 * dt * k2.dx,
      y + 0.5 * dt * k2.dy,
      z + 0.5 * dt * k2.dz
    );
    const k4 = deriv(
      x + dt * k3.dx,
      y + dt * k3.dy,
      z + dt * k3.dz
    );

    x += (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx);
    y += (dt / 6) * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy);
    z += (dt / 6) * (k1.dz + 2 * k2.dz + 2 * k3.dz + k4.dz);

    const speed = Math.hypot(k1.dx, k1.dy, k1.dz);
    if (speed > maxSpeed) maxSpeed = speed;

    points.push({
      x: x * scale,
      y: (z + zOffset) * scale,
      z: y * scale,
      rawX: x,
      rawY: y,
      rawZ: z,
      speed,
    });
  }

  // Approximate fixed-point equilibria for Lorenz: (±sqrt(beta*(rho-1)), ±sqrt(beta*(rho-1)), rho-1)
  const eqCoord = rho > 1 && beta > 0 ? Math.sqrt(beta * (rho - 1)) : 0;

  return {
    points,
    maxSpeed,
    equilibrium: {
      x: eqCoord,
      y: eqCoord,
      z: Math.max(0, rho - 1),
    },
    divergenceRate: -(sigma + 1 + beta), // Phase space volume contraction rate: div F = -(sigma + 1 + beta)
  };
}

/**
 * Probability, Galton Board Binomial Distribution & Monte Carlo Pi Convergence Model
 */
export function computeProbabilitySimulation({
  rows = 12,
  probRight = 0.5,
  samples = 800,
  seed = 42,
}) {
  const n = Math.max(4, Math.min(20, Math.round(rows)));
  const p = Math.max(0.05, Math.min(0.95, probRight));
  const N = Math.max(50, Math.min(5000, Math.round(samples)));

  // Deterministic pseudo-random generator (Mulberry32) so tests and sliders are reproducible
  let state = (seed * 2654435761) >>> 0;
  const rand = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Exact Binomial coefficients & theoretical probabilities
  const factorial = (k) => {
    let r = 1;
    for (let i = 2; i <= k; i++) r *= i;
    return r;
  };
  const nFact = factorial(n);

  const bins = Array.from({ length: n + 1 }, (_, k) => {
    const comb = nFact / (factorial(k) * factorial(n - k));
    const theoreticalProb = comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
    return {
      k,
      count: 0,
      theoreticalProb,
      empiricalProb: 0,
    };
  });

  // Simulate N Galton trials
  let sumK = 0;
  let sumK2 = 0;
  for (let i = 0; i < N; i++) {
    let k = 0;
    for (let step = 0; step < n; step++) {
      if (rand() < p) k++;
    }
    bins[k].count++;
    sumK += k;
    sumK2 += k * k;
  }

  for (let k = 0; k <= n; k++) {
    bins[k].empiricalProb = bins[k].count / N;
  }

  const empiricalMean = sumK / N;
  const empiricalVariance = sumK2 / N - empiricalMean * empiricalMean;
  const theoreticalMean = n * p;
  const theoreticalVariance = n * p * (1 - p);

  // Also run Monte Carlo Pi estimation with N points in [-1, 1]^2
  let insideCircle = 0;
  const monteCarloPoints = [];
  const maxVisualPoints = Math.min(N, 450);

  for (let i = 0; i < N; i++) {
    const x = rand() * 2 - 1;
    const y = rand() * 2 - 1;
    const inside = x * x + y * y <= 1;
    if (inside) insideCircle++;
    if (i < maxVisualPoints) {
      monteCarloPoints.push({ x, y, inside });
    }
  }

  const piEstimate = (4 * insideCircle) / N;

  return {
    bins,
    theoreticalMean,
    theoreticalVariance,
     theoreticalStdDev: Math.sqrt(theoreticalVariance),
    empiricalMean,
    empiricalVariance,
    empiricalStdDev: Math.sqrt(Math.max(0, empiricalVariance)),
    piEstimate,
    piError: Math.abs(Math.PI - piEstimate),
    monteCarloPoints,
  };
}
