// Central Simulation Registry for SimuLab — Interactive Mathematics & Physics Platform

import { EXTRA_SIMULATIONS } from "./extraSimulations";

export const LAB_DOMAINS = [
  { id: "all", label: "All Laboratories", icon: "⚛️" },
  { id: "mathematics", label: "Mathematics Lab", icon: "📐" },
  { id: "physics", label: "Physics Lab", icon: "🔭" },
];

const BASE_CATALOG = [
  {
    id: "vedic-square-3d",
    title: "Vedic Square 3D — Sacred Geometry",
    shortTitle: "Vedic Square 3D",
    domain: "mathematics",
    category: "Number Theory & Sacred Geometry",
    badge: "Flagship 3D Engine",
    accentColor: "#A855F7",
    renderType: "3D WebGL + 2D Matrix",
    difficulty: "All Levels",
    summary:
      "Explore modular arithmetic (mod 9), digital root multiplication tables, 9-sum complementary mirror symmetries, and 3D harmonic wave topologies.",
    formulas: [
      {
        name: "Digital Root Congruence",
        latex: "dr(n) = 1 + ((n - 1) \\bmod 9), \\quad n \\in \\mathbb{Z}^+",
        desc: "Maps any positive integer product r × c onto the cyclic ring {1..9}.",
      },
      {
        name: "9-Sum Complement Reflection",
        latex: "dr(r \\cdot c) + dr((9 - r) \\cdot c) \\equiv 9 \\pmod 9",
        desc: "Paired digital roots (1↔8, 2↔7, 3↔6, 4↔5) form inverted geometric reflections.",
      },
      {
        name: "3D Harmonic Pillar Wave",
        latex: "h(x,z,t) = h_0 + A \\sin(\\omega t - k\\sqrt{x^2 + z^2})",
        desc: "Real-time radial, harmonic, and spiral wave modulation across 81 pillars.",
      },
    ],
    theory:
      "Originating in ancient Indian mathematics and Islamic geometric art, the Vedic Square is a 9×9 multiplication table where every product is reduced to its single-digit digital root by iteratively summing its digits. Highlighting all occurrences of a specific digit (1–9) reveals remarkable geometric symmetries—hyperbolas, stars, octagons, and invariant lattices—governed by modular arithmetic modulo 9.",
    defaultParams: {
      number: 5,
      patternMode: "constellation",
      waveMode: "ripple",
      showLines: true,
      showPulses: true,
      showCrystals: true,
      showDual: false,
      lineThickness: 1.1,
      animationSpeed: 1.0,
      elevationScale: 1.0,
    },
    presets: [
      {
        name: "Pentad Vortex (5)",
        params: { number: 5, patternMode: "constellation", showDual: false, waveMode: "ripple" },
      },
      {
        name: "Dyad ↔ Heptad Star (2↔7)",
        params: { number: 2, patternMode: "mandala", showDual: true, waveMode: "harmonic" },
      },
      {
        name: "Tesla Flux Triad (3↔6)",
        params: { number: 3, patternMode: "network", showDual: true, waveMode: "spiral" },
      },
      {
        name: "Ennead Horizon (9)",
        params: { number: 9, patternMode: "constellation", showDual: false, waveMode: "ripple" },
      },
    ],
  },
  {
    id: "calculus-fourier-lab",
    title: "Calculus & Fourier Harmonics Lab",
    shortTitle: "Calculus & Fourier",
    domain: "mathematics",
    category: "Calculus, Functions & Analysis",
    badge: "Interactive Analysis",
    accentColor: "#06B6D4",
    renderType: "2D Interactive Plotter",
    difficulty: "Intermediate",
    summary:
      "Visualize derivatives, tangent lines, curvature, Riemann sum integration vs. exact Simpson quadratures, and Fourier harmonic wave synthesis.",
    formulas: [
      {
        name: "Instantaneous Derivative & Tangent",
        latex: "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0+h) - f(x_0-h)}{2h}, \\quad y = f(x_0) + f'(x_0)(x - x_0)",
        desc: "Slope of the tangent line and instantaneous rate of change at x₀.",
      },
      {
        name: "Definite Riemann & Simpson Integral",
        latex: "\\int_a^b f(x)\\,dx \\approx \\sum_{i=1}^N f(x_i^*)\\,\\Delta x",
        desc: "Signed area under the curve approximated by midpoint rectangles vs. exact quadrature.",
      },
      {
        name: "Fourier Odd-Harmonic Series",
        latex: "f(x) = \\frac{4A}{\\pi} \\sum_{k=1}^{N} \\frac{\\sin((2k-1)x + \\phi)}{2k-1}",
        desc: "Superposition of sinusoidal harmonics converging to a square wave.",
      },
    ],
    theory:
      "Differential and integral calculus unite local rates of change with global accumulation via the Fundamental Theorem of Calculus. By adjusting the number of Riemann subdivisions N or synthesizing odd harmonics in a Fourier series, you can directly observe numerical convergence, truncation error, and local differential curvature.",
    defaultParams: {
      presetId: "damped_sine",
      amplitude: 2.2,
      frequency: 1.5,
      damping: 0.22,
      phase: 0.0,
      x0: 0.8,
      integralLower: -3.0,
      integralUpper: 3.0,
      riemannSubdivisions: 24,
      customExpr: "2 * sin(1.5 * x) * cos(0.5 * x)",
    },
    paramControls: [
      { key: "amplitude", label: "Wave Amplitude (A)", min: 0.5, max: 4.0, step: 0.1, unit: "" },
      { key: "frequency", label: "Angular Frequency (ω)", min: 0.4, max: 4.0, step: 0.1, unit: "rad" },
      { key: "damping", label: "Decay / Envelope (γ)", min: 0.0, max: 0.9, step: 0.02, unit: "" },
      { key: "x0", label: "Tangent Point (x₀)", min: -5.0, max: 5.0, step: 0.1, unit: "" },
      { key: "integralLower", label: "Integral Lower Bound (a)", min: -5.5, max: 0.0, step: 0.25, unit: "" },
      { key: "integralUpper", label: "Integral Upper Bound (b)", min: 0.0, max: 5.5, step: 0.25, unit: "" },
      { key: "riemannSubdivisions", label: "Riemann Partitions (N)", min: 4, max: 80, step: 2, unit: "bins" },
    ],
    presets: [
      {
        name: "Damped Harmonic Wave",
        params: { presetId: "damped_sine", amplitude: 2.4, frequency: 1.6, damping: 0.22, x0: 0.8, riemannSubdivisions: 24 },
      },
      {
        name: "Fourier Square Synthesis",
        params: { presetId: "fourier_square", amplitude: 2.0, frequency: 2.0, damping: 0.0, x0: 0.5, riemannSubdivisions: 40 },
      },
      {
        name: "Gaussian Wave Packet",
        params: { presetId: "gaussian_wave", amplitude: 2.8, frequency: 2.5, damping: 0.3, x0: 0.3, riemannSubdivisions: 32 },
      },
      {
        name: "Cubic Polynomial Extrema",
        params: { presetId: "polynomial", amplitude: 1.5, frequency: 1.3, damping: 0.1, x0: -1.2, riemannSubdivisions: 20 },
      },
    ],
  },
  {
    id: "chaos-attractor-3d",
    title: "Lorenz Strange Attractor & 3D Chaos",
    shortTitle: "3D Chaos Attractor",
    domain: "mathematics",
    category: "Dynamical Systems & Topology",
    badge: "3D RK4 Solver",
    accentColor: "#F43F5E",
    renderType: "3D WebGL Phase Space",
    difficulty: "Advanced",
    summary:
      "Simulate deterministic chaos in 3D phase space using 4th-order Runge-Kutta integration across Lorenz, Rössler, and Thomas strange attractors.",
    formulas: [
      {
        name: "Lorenz Convection System",
        latex: "\\frac{dx}{dt} = \\sigma(y-x), \\quad \\frac{dy}{dt} = x(\\rho-z)-y, \\quad \\frac{dz}{dt} = xy - \\beta z",
        desc: "Coupled nonlinear ODEs modeling atmospheric thermal convection.",
      },
      {
        name: "Phase Volume Contraction (Lie Derivative)",
        latex: "\\nabla \\cdot \\mathbf{F} = \\frac{\\partial \\dot{x}}{\\partial x} + \\frac{\\partial \\dot{y}}{\\partial y} + \\frac{\\partial \\dot{z}}{\\partial z} = -(\\sigma + 1 + \\beta) < 0",
        desc: "Dissipative phase-space contraction onto a zero-volume fractal strange attractor.",
      },
    ],
    theory:
      "Discovered by Edward Lorenz in 1963 while modeling atmospheric convection, the Lorenz attractor demonstrates that deterministic nonlinear differential equations can exhibit extreme sensitivity to initial conditions ('the Butterfly Effect'). Trajectories never intersect nor repeat, orbiting two unstable fixed-point equilibria forever on a fractal manifold of Hausdorff dimension ≈ 2.06.",
    defaultParams: {
      system: "lorenz",
      sigma: 10.0,
      rho: 28.0,
      beta: 2.667,
      steps: 1800,
      animationSpeed: 1.0,
    },
    paramControls: [
      { key: "sigma", label: "Prandtl Number (σ)", min: 2.0, max: 22.0, step: 0.5, unit: "" },
      { key: "rho", label: "Rayleigh Number (ρ)", min: 8.0, max: 55.0, step: 0.5, unit: "" },
      { key: "beta", label: "Geometric Factor (β)", min: 0.5, max: 5.0, step: 0.1, unit: "" },
      { key: "steps", label: "Trajectory Horizon", min: 600, max: 2800, step: 100, unit: "pts" },
      { key: "animationSpeed", label: "Phase Flow Speed", min: 0.2, max: 2.5, step: 0.1, unit: "×" },
    ],
    presets: [
      {
        name: "Classic Lorenz Butterfly",
        params: { system: "lorenz", sigma: 10.0, rho: 28.0, beta: 2.667, steps: 1800 },
      },
      {
        name: "High-Rayleigh Turbulence (ρ=45)",
        params: { system: "lorenz", sigma: 12.0, rho: 45.0, beta: 3.0, steps: 2200 },
      },
      {
        name: "Rössler Folded Band",
        params: { system: "rossler", sigma: 10.0, rho: 24.0, beta: 2.0, steps: 2000 },
      },
      {
        name: "Thomas Cyclic Labyrinth",
        params: { system: "thomas", sigma: 10.0, rho: 28.0, beta: 2.6, steps: 2200 },
      },
    ],
  },
  {
    id: "probability-monte-carlo",
    title: "Monte Carlo & Galton Probability Lab",
    shortTitle: "Probability & Monte Carlo",
    domain: "mathematics",
    category: "Probability & Stochastic Statistics",
    badge: "Stochastic Engine",
    accentColor: "#10B981",
    renderType: "Statistical Visualizer",
    difficulty: "Beginner–Intermediate",
    summary:
      "Compare empirical Galton board trials against exact Binomial & Gaussian distributions alongside live Monte Carlo π estimation.",
    formulas: [
      {
        name: "Binomial Probability Mass",
        latex: "P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}",
        desc: "Exact probability of k rightward deflections across n peg rows.",
      },
      {
        name: "Central Limit Moments",
        latex: "\\mu = np, \\quad \\sigma^2 = np(1-p), \\quad \\sigma = \\sqrt{np(1-p)}",
        desc: "As n and N grow, the discrete Binomial distribution converges to a Gaussian bell curve.",
      },
      {
        name: "Monte Carlo Quadrature for π",
        latex: "\\hat{\\pi} = 4 \\cdot \\frac{N_{\\text{inside}}(x^2 + y^2 \\le 1)}{N_{\\text{total}}}",
        desc: "Stochastic area ratio with convergence error scaling as O(1/√N).",
      },
    ],
    theory:
      "Sir Francis Galton's bean machine (quincunx) visually demonstrates the Central Limit Theorem: independent binary choices accumulate into a Binomial distribution that approaches the normal Gaussian bell curve. Simultaneously, Monte Carlo sampling illustrates how random numbers can solve deterministic geometric integrals.",
    defaultParams: {
      rows: 12,
      probRight: 0.5,
      samples: 900,
      seed: 42,
    },
    paramControls: [
      { key: "rows", label: "Galton Peg Rows (n)", min: 4, max: 18, step: 1, unit: "rows" },
      { key: "probRight", label: "Right Bias Probability (p)", min: 0.15, max: 0.85, step: 0.05, unit: "" },
      { key: "samples", label: "Sample Trials (N)", min: 100, max: 4000, step: 100, unit: "trials" },
      { key: "seed", label: "Random Seed", min: 1, max: 200, step: 1, unit: "#" },
    ],
    presets: [
      {
        name: "Symmetric Gaussian Bell (p=0.5)",
        params: { rows: 12, probRight: 0.5, samples: 1200, seed: 42 },
      },
      {
        name: "Right-Skewed Binomial (p=0.75)",
        params: { rows: 14, probRight: 0.75, samples: 1500, seed: 77 },
      },
      {
        name: "High-Sample Convergence (N=4000)",
        params: { rows: 16, probRight: 0.5, samples: 4000, seed: 101 },
      },
    ],
  },
  {
    id: "projectile-ballistics",
    title: "Ballistic Projectile & Aerodynamic Drag",
    shortTitle: "Projectile & Drag",
    domain: "physics",
    category: "Classical Mechanics & Kinematics",
    badge: "Kinematics RK4",
    accentColor: "#F59E0B",
    renderType: "2D Trajectory + Energy",
    difficulty: "All Levels",
    summary:
      "Compare real aerodynamic drag trajectories against ideal vacuum parabolas across planetary gravities while tracking kinetic and potential energy.",
    formulas: [
      {
        name: "Newtonian Equations with Quadratic Drag",
        latex: "m\\frac{d\\mathbf{v}}{dt} = m\\mathbf{g} - \\frac{1}{2}\\rho C_d A |\\mathbf{v}|\\mathbf{v}",
        desc: "Coupled velocity differential equations accounting for air resistance.",
      },
      {
        name: "Ideal Vacuum Range & Apex",
        latex: "R_{\\text{vac}} = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H_{\\max} = h_0 + \\frac{v_0^2 \\sin^2\\theta}{2g}",
        desc: "Closed-form parabolic kinematics in the absence of atmospheric drag.",
      },
      {
        name: "Mechanical Energy Balance",
        latex: "E(t) = \\frac{1}{2}mv^2 + mgy = E_0 - W_{\\text{drag}}",
        desc: "Total mechanical energy decays monotonically when drag coefficient k > 0.",
      },
    ],
    theory:
      "In a vacuum, projectile motion follows a symmetric parabola where 45° maximizes horizontal range. In a real atmosphere, quadratic aerodynamic drag opposes the velocity vector, foreshortening the range, lowering the apex, creating an asymmetric descent, and converting mechanical energy into thermal dissipation.",
    defaultParams: {
      velocity: 45,
      angleDeg: 45,
      gravity: 9.81,
      mass: 4.0,
      dragCoeff: 0.02,
      initialHeight: 0,
    },
    paramControls: [
      { key: "velocity", label: "Launch Velocity (v₀)", min: 10, max: 90, step: 1, unit: "m/s" },
      { key: "angleDeg", label: "Launch Angle (θ)", min: 10, max: 85, step: 1, unit: "°" },
      { key: "gravity", label: "Gravity (g)", min: 1.6, max: 25.0, step: 0.1, unit: "m/s²" },
      { key: "mass", label: "Projectile Mass (m)", min: 0.5, max: 20.0, step: 0.5, unit: "kg" },
      { key: "dragCoeff", label: "Drag Factor (k)", min: 0.0, max: 0.12, step: 0.005, unit: "kg/m" },
      { key: "initialHeight", label: "Launch Elevation (h₀)", min: 0, max: 40, step: 2, unit: "m" },
    ],
    presets: [
      {
        name: "Earth Standard (g=9.81 m/s²)",
        params: { velocity: 45, angleDeg: 45, gravity: 9.81, mass: 4.0, dragCoeff: 0.02, initialHeight: 0 },
      },
      {
        name: "Lunar Vacuum Launch (g=1.62 m/s²)",
        params: { velocity: 35, angleDeg: 42, gravity: 1.62, mass: 5.0, dragCoeff: 0.0, initialHeight: 0 },
      },
      {
        name: "Mars Ballistics (g=3.72 m/s²)",
        params: { velocity: 40, angleDeg: 48, gravity: 3.72, mass: 3.5, dragCoeff: 0.005, initialHeight: 10 },
      },
      {
        name: "High-Drag Cannonball",
        params: { velocity: 65, angleDeg: 55, gravity: 9.81, mass: 2.0, dragCoeff: 0.08, initialHeight: 15 },
      },
    ],
  },
  {
    id: "double-pendulum-lab",
    title: "Coupled Double Pendulum & Lagrangian Chaos",
    shortTitle: "Double Pendulum",
    domain: "physics",
    category: "Analytical Mechanics & Oscillations",
    badge: "Lagrangian RK4",
    accentColor: "#EC4899",
    renderType: "Real-Time Physics + Phase Portrait",
    difficulty: "Intermediate–Advanced",
    summary:
      "Observe energy transfer, nonlinear normal modes, and chaotic phase-space trajectories in a coupled double pendulum solved via Euler-Lagrange equations.",
    formulas: [
      {
        name: "System Lagrangian",
        latex: "\\mathcal{L} = T - V = \\frac{1}{2}(m_1+m_2)L_1^2\\dot{\\theta}_1^2 + \\frac{1}{2}m_2 L_2^2\\dot{\\theta}_2^2 + m_2 L_1 L_2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2) - V(\\theta_1,\\theta_2)",
        desc: "Difference between total translational kinetic energy T and gravitational potential V.",
      },
      {
        name: "Small-Angle Harmonic Period",
        latex: "T_0 \\approx 2\\pi\\sqrt{\\frac{L_1}{g}}",
        desc: "At low amplitudes, oscillations are quasi-periodic normal modes; at high energy, motion becomes chaotic.",
      },
    ],
    theory:
      "The double pendulum is a paradigmatic example of a simple mechanical system with two degrees of freedom (θ₁, θ₂) whose Euler-Lagrange equations are strongly coupled nonlinear ODEs. At low initial angles, motion consists of predictable Lissajous-like normal modes; above a critical energy threshold, the phase portrait fractures into chaos.",
    defaultParams: {
      length1: 2.0,
      length2: 1.6,
      mass1: 2.2,
      mass2: 1.6,
      gravity: 9.81,
      damping: 0.008,
      initialAngle1Deg: 115,
      initialAngle2Deg: 140,
    },
    paramControls: [
      { key: "length1", label: "Upper Rod Length (L₁)", min: 0.8, max: 3.0, step: 0.1, unit: "m" },
      { key: "length2", label: "Lower Rod Length (L₂)", min: 0.8, max: 3.0, step: 0.1, unit: "m" },
      { key: "mass1", label: "Upper Bob Mass (m₁)", min: 0.5, max: 6.0, step: 0.2, unit: "kg" },
      { key: "mass2", label: "Lower Bob Mass (m₂)", min: 0.5, max: 6.0, step: 0.2, unit: "kg" },
      { key: "gravity", label: "Gravitational Field (g)", min: 1.6, max: 24.8, step: 0.2, unit: "m/s²" },
      { key: "damping", label: "Pivot Friction (b)", min: 0.0, max: 0.08, step: 0.002, unit: "s⁻¹" },
      { key: "initialAngle1Deg", label: "Release Angle θ₁", min: 15, max: 175, step: 5, unit: "°" },
      { key: "initialAngle2Deg", label: "Release Angle θ₂", min: 15, max: 175, step: 5, unit: "°" },
    ],
    presets: [
      {
        name: "High-Energy Chaotic Flip",
        params: { length1: 2.0, length2: 1.6, mass1: 2.2, mass2: 1.6, gravity: 9.81, damping: 0.005, initialAngle1Deg: 125, initialAngle2Deg: 150 },
      },
      {
        name: "Small-Angle Normal Mode",
        params: { length1: 2.0, length2: 2.0, mass1: 2.0, mass2: 2.0, gravity: 9.81, damping: 0.002, initialAngle1Deg: 25, initialAngle2Deg: 25 },
      },
      {
        name: "Heavy Core Whip (m₁ ≫ m₂)",
        params: { length1: 2.2, length2: 1.4, mass1: 5.5, mass2: 0.8, gravity: 9.81, damping: 0.006, initialAngle1Deg: 100, initialAngle2Deg: 45 },
      },
    ],
  },
  {
    id: "orbital-gravity-3d",
    title: "Keplerian 3D Orbital & Gravitational Lab",
    shortTitle: "3D Orbital Mechanics",
    domain: "physics",
    category: "Astrophysics & Gravitation",
    badge: "3D Celestial Engine",
    accentColor: "#3B82F6",
    renderType: "3D WebGL Celestial Scene",
    difficulty: "All Levels",
    summary:
      "Simulate 3D planetary & satellite orbits governed by Newton's Law of Universal Gravitation, the Vis-Viva equation, and Kepler's Laws.",
    formulas: [
      {
        name: "Vis-Viva Orbital Velocity",
        latex: "v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)",
        desc: "Relates orbital speed v at radius r to semi-major axis a and stellar mass M.",
      },
      {
        name: "Kepler's Third Harmonic Law",
        latex: "T = 2\\pi\\sqrt{\\frac{a^3}{GM}}, \\quad r(\\nu) = \\frac{a(1 - e^2)}{1 + e\\cos\\nu}",
        desc: "Orbital period squared scales with the cube of the semi-major axis.",
      },
    ],
    theory:
      "Under an inverse-square central gravitational force F = -GMm/r², bound trajectories form conic ellipses with the central star at one focus. As a planet sweeps toward periapsis (closest approach), gravitational potential energy converts into kinetic energy, accelerating the body in strict accordance with conservation of angular momentum L = m r × v.",
    defaultParams: {
      starMass: 1.0,
      semiMajorAxis: 4.5,
      eccentricity: 0.38,
      inclinationDeg: 16,
      animationSpeed: 1.0,
    },
    paramControls: [
      { key: "starMass", label: "Central Star Mass (M)", min: 0.4, max: 3.5, step: 0.1, unit: "M☉" },
      { key: "semiMajorAxis", label: "Semi-Major Axis (a)", min: 2.2, max: 7.5, step: 0.1, unit: "AU" },
      { key: "eccentricity", label: "Orbital Eccentricity (e)", min: 0.0, max: 0.82, step: 0.02, unit: "" },
      { key: "inclinationDeg", label: "3D Orbital Tilt (i)", min: 0, max: 60, step: 2, unit: "°" },
      { key: "animationSpeed", label: "Simulation Speed", min: 0.2, max: 2.5, step: 0.1, unit: "×" },
    ],
    presets: [
      {
        name: "Elliptical Exoplanet (e=0.38)",
        params: { starMass: 1.0, semiMajorAxis: 4.5, eccentricity: 0.38, inclinationDeg: 16, animationSpeed: 1.0 },
      },
      {
        name: "Circular Planetary Orbit (e=0.02)",
        params: { starMass: 1.0, semiMajorAxis: 4.0, eccentricity: 0.02, inclinationDeg: 5, animationSpeed: 1.0 },
      },
      {
        name: "Halley-Style Comet (e=0.78)",
        params: { starMass: 1.4, semiMajorAxis: 5.8, eccentricity: 0.78, inclinationDeg: 34, animationSpeed: 1.3 },
      },
    ],
  },
  {
    id: "wave-interference-3d",
    title: "Wave Superposition & Interference 3D",
    shortTitle: "3D Wave Interference",
    domain: "physics",
    category: "Waves, Acoustics & Quantum Phase",
    badge: "3D Wave Surface",
    accentColor: "#00F5A0",
    renderType: "3D WebGL Ripple Tank + Detector",
    difficulty: "Intermediate",
    summary:
      "Visualize two-source wave superposition, constructive crest amplification, nodal lines of destructive cancellation, and detector fringe intensity.",
    formulas: [
      {
        name: "Two-Source Wave Superposition",
        latex: "\\Psi(x,z,t) = A e^{-\\gamma r_1}\\sin(kr_1 - \\omega t) + A e^{-\\gamma r_2}\\sin(kr_2 - \\omega t + \\phi)",
        desc: "Total wave displacement equals the algebraic sum of individual coherent wavefields.",
      },
      {
        name: "Constructive & Destructive Fringe Condition",
        latex: "\\Delta r = |r_2 - r_1| = m\\lambda \\;(\\text{maxima}), \\quad \\Delta r = \\left(m + \\tfrac{1}{2}\\right)\\lambda \\;(\\text{nodes})",
        desc: "Path-length difference determines phase alignment at any point in space.",
      },
    ],
    theory:
      "Thomas Young's double-source interference experiment proved the wave nature of light and sound. When two coherent spherical waves overlap, points where crests meet crests experience constructive amplification (antinodal fringes), while points where crests meet troughs undergo destructive cancellation (nodal lines).",
    defaultParams: {
      wavelength: 1.6,
      sourceSeparation: 3.6,
      frequency: 1.4,
      amplitude: 0.9,
      phaseShiftDeg: 0,
      damping: 0.04,
    },
    paramControls: [
      { key: "wavelength", label: "Wavelength (λ)", min: 0.7, max: 3.2, step: 0.1, unit: "m" },
      { key: "sourceSeparation", label: "Source Separation (d)", min: 0.0, max: 6.5, step: 0.2, unit: "m" },
      { key: "frequency", label: "Wave Frequency (f)", min: 0.4, max: 3.0, step: 0.1, unit: "Hz" },
      { key: "amplitude", label: "Source Amplitude (A)", min: 0.3, max: 1.6, step: 0.1, unit: "" },
      { key: "phaseShiftDeg", label: "Relative Phase (φ)", min: 0, max: 180, step: 15, unit: "°" },
    ],
    presets: [
      {
        name: "Classic Young Double-Source",
        params: { wavelength: 1.5, sourceSeparation: 3.6, frequency: 1.4, amplitude: 0.9, phaseShiftDeg: 0 },
      },
      {
        name: "Anti-Phase Dipole (φ=180°)",
        params: { wavelength: 1.6, sourceSeparation: 3.2, frequency: 1.5, amplitude: 1.0, phaseShiftDeg: 180 },
      },
      {
        name: "High-Frequency Fine Fringes",
        params: { wavelength: 0.9, sourceSeparation: 4.8, frequency: 2.0, amplitude: 0.8, phaseShiftDeg: 0 },
      },
    ],
  },
  {
    id: "optics-refraction-lens",
    title: "Geometric Optics: Snell's Law & Thin Lens",
    shortTitle: "Optics & Refraction",
    domain: "physics",
    category: "Optics & Electromagnetism",
    badge: "Ray Tracer",
    accentColor: "#38BDF8",
    renderType: "Interactive Ray Diagram",
    difficulty: "All Levels",
    summary:
      "Trace laser refraction, Fresnel reflection, Total Internal Reflection (TIR) critical angles, and principal rays through converging/diverging lenses.",
    formulas: [
      {
        name: "Snell-Descartes Law of Refraction",
        latex: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2, \\quad \\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right)",
        desc: "Relates incident and refracted ray angles to phase velocities v = c/n.",
      },
      {
        name: "Gaussian Thin Lens Equation",
        latex: "\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}, \\quad M = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}",
        desc: "Determines real or virtual image position d_i and lateral magnification M.",
      },
    ],
    theory:
      "Fermat's Principle of Least Time dictates that light bends toward the normal when entering a denser optical medium (n₂ > n₁) and away from the normal when entering a rarer medium (n₁ > n₂). Exceeding the critical angle θc triggers 100% Total Internal Reflection—the physical foundation of fiber optics and diamond brilliance.",
    defaultParams: {
      n1: 1.0,
      n2: 1.52,
      incidentAngleDeg: 38,
      focalLength: 2.4,
      objectDistance: 4.5,
      objectHeight: 1.4,
    },
    paramControls: [
      { key: "n1", label: "Medium 1 Index (n₁)", min: 1.0, max: 2.42, step: 0.02, unit: "" },
      { key: "n2", label: "Medium 2 Index (n₂)", min: 1.0, max: 2.42, step: 0.02, unit: "" },
      { key: "incidentAngleDeg", label: "Incident Angle (θ₁)", min: 0, max: 85, step: 1, unit: "°" },
      { key: "focalLength", label: "Lens Focal Length (f)", min: 1.0, max: 4.5, step: 0.1, unit: "m" },
      { key: "objectDistance", label: "Object Distance (d₀)", min: 1.2, max: 8.0, step: 0.2, unit: "m" },
    ],
    presets: [
      {
        name: "Air → Crown Glass (n=1.52)",
        params: { n1: 1.0, n2: 1.52, incidentAngleDeg: 40, focalLength: 2.4, objectDistance: 4.6 },
      },
      {
        name: "Water → Air Total Internal Reflection",
        params: { n1: 1.33, n2: 1.0, incidentAngleDeg: 55, focalLength: 2.2, objectDistance: 3.8 },
      },
      {
        name: "Diamond High Dispersion (n=2.42)",
        params: { n1: 1.0, n2: 2.42, incidentAngleDeg: 52, focalLength: 1.8, objectDistance: 4.2 },
      },
    ],
  },
  {
    id: "thermodynamics-gas-lab",
    title: "Maxwell-Boltzmann & Ideal Gas Kinetic Lab",
    shortTitle: "Kinetic Thermodynamics",
    domain: "physics",
    category: "Thermodynamics & Statistical Mechanics",
    badge: "Kinetic Chamber",
    accentColor: "#FB7185",
    renderType: "Particle Chamber + Distribution",
    difficulty: "Intermediate",
    summary:
      "Simulate elastic molecular collisions in a variable-volume piston chamber while analyzing pressure (PV=nRT), RMS speed, and Maxwell-Boltzmann curves.",
    formulas: [
      {
        name: "Ideal Gas Equation of State",
        latex: "PV = nRT = Nk_B T, \\quad U = \\frac{3}{2}nRT",
        desc: "Macroscopic pressure P arises from microscopic momentum transfer to container walls.",
      },
      {
        name: "Maxwell-Boltzmann Speeds",
        latex: "v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}, \\quad \\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}}",
        desc: "Characteristic molecular speeds depend on temperature T and molar mass M.",
      },
    ],
    theory:
      "Kinetic theory bridges microscopic particle mechanics and macroscopic thermodynamics. Heating a gas or selecting a lighter molecule (such as Helium vs. Argon) shifts and broadens the Maxwell-Boltzmann speed distribution toward higher velocities, increasing wall collision frequency and macroscopic pressure.",
    defaultParams: {
      temperatureK: 300,
      volumeL: 10.0,
      moles: 1.5,
      molarMassG: 4.0,
    },
    paramControls: [
      { key: "temperatureK", label: "Absolute Temperature (T)", min: 80, max: 1000, step: 10, unit: "K" },
      { key: "volumeL", label: "Chamber Volume (V)", min: 3.0, max: 25.0, step: 0.5, unit: "L" },
      { key: "moles", label: "Gas Amount (n)", min: 0.4, max: 4.0, step: 0.1, unit: "mol" },
      { key: "molarMassG", label: "Molar Mass (M)", min: 2.0, max: 44.0, step: 2.0, unit: "g/mol" },
    ],
    presets: [
      {
        name: "Helium @ Room Temp (300K, 4 g/mol)",
        params: { temperatureK: 300, volumeL: 10.0, moles: 1.5, molarMassG: 4.0 },
      },
      {
        name: "Superheated Nitrogen (800K, 28 g/mol)",
        params: { temperatureK: 800, volumeL: 8.0, moles: 2.0, molarMassG: 28.0 },
      },
      {
        name: "Cryogenic Argon Compression (120K, 40 g/mol)",
        params: { temperatureK: 120, volumeL: 4.5, moles: 2.5, molarMassG: 40.0 },
      },
    ],
  },
];

export const SIMULATION_CATALOG = [...BASE_CATALOG, ...EXTRA_SIMULATIONS];

export function getSimulationById(id) {
  return SIMULATION_CATALOG.find((s) => s.id === id) || SIMULATION_CATALOG[0];
}
