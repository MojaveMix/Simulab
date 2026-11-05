// AI-Powered Natural Language to Validated Scientific Simulation Generator
import { getSimulationById } from "./simulationRegistry";

export const AI_EXAMPLE_PROMPTS = [
  {
    label: "Mars Ballistic Launch",
    prompt: "Launch a 6 kg projectile at 52 degrees with 55 m/s velocity on Mars from a 12m cliff with low atmospheric drag.",
    domain: "physics",
  },
  {
    label: "Vedic 3↔6 Tesla Triad",
    prompt: "Visualize the Vedic Square 3D sacred geometry for digital root 3 with 9-complement dual symmetry in Star Mandala mode and spiral waves.",
    domain: "mathematics",
  },
  {
    label: "Water-to-Air Total Internal Reflection",
    prompt: "Shine a laser beam from water (n=1.33) into air (n=1.0) at a 58 degree incident angle to observe Total Internal Reflection.",
    domain: "physics",
  },
  {
    label: "High-Rayleigh Lorenz Chaos",
    prompt: "Simulate a chaotic 3D Lorenz strange attractor with Rayleigh number rho = 42 and Prandtl sigma = 12.",
    domain: "mathematics",
  },
  {
    label: "Superheated Helium Gas Chamber",
    prompt: "Heat 2.5 moles of Helium gas to 750 Kelvin inside a compressed 6 Liter chamber and inspect the Maxwell-Boltzmann speed distribution.",
    domain: "physics",
  },
  {
    label: "Fourier Square Wave Integration",
    prompt: "Synthesize a Fourier square wave with amplitude 2.5 and frequency 2.2, and integrate from -4 to 4 with 48 Riemann partitions.",
    domain: "mathematics",
  },
  {
    label: "Comet High-Eccentricity Orbit",
    prompt: "Simulate a high-eccentricity comet orbit (e = 0.74) around a 1.6 solar mass star tilted at 28 degrees.",
    domain: "physics",
  },
  {
    label: "Young Double-Source Wave Fringes",
    prompt: "Create two coherent wave sources separated by 4.4m with wavelength 1.1m and a 90 degree phase shift.",
    domain: "physics",
  },
];

/**
 * Helper to extract a number near a keyword or unit in natural language text
 */
function extractNumberByPattern(text, regex, fallback) {
  const match = text.match(regex);
  if (match && match[1] !== undefined) {
    const val = parseFloat(match[1]);
    if (Number.isFinite(val)) return val;
  }
  return fallback;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Transforms a natural-language experiment description into a validated SimuLab simulation configuration.
 */
export function generateSimulationFromPrompt(rawPrompt) {
  const prompt = (rawPrompt || "").trim();
  const lower = prompt.toLowerCase();

  if (!prompt) {
    return null;
  }

  const extractedEntities = [];

  // 1. Detect domain & best matching validated model
  let simulationId = "projectile-ballistics";

  if (
    /\b(vedic|digital root|sacred geometry|mandala|mod 9|modulo 9|ennead|triad|monad|octagram)\b/i.test(
      lower
    )
  ) {
    simulationId = "vedic-square-3d";
  } else if (
    /\b(lorenz|attractor|rossler|rössler|thomas|butterfly effect|strange attractor|prandtl|rayleigh)\b/i.test(
      lower
    )
  ) {
    simulationId = "chaos-attractor-3d";
  } else if (
    /\b(galton|monte carlo|binomial|probability|bell curve|gaussian|quincunx|random trial|estimate pi)\b/i.test(
      lower
    )
  ) {
    simulationId = "probability-monte-carlo";
  } else if (
    /\b(calculus|derivative|integral|riemann|fourier|tangent|simpson|polynomial|sin\(|cos\(|f\(x\))\b/i.test(
      lower
    )
  ) {
    simulationId = "calculus-fourier-lab";
  } else if (
    /\b(snell|refract|reflection|lens|optics|laser|critical angle|prism|diamond|glass|focal)\b/i.test(
      lower
    )
  ) {
    simulationId = "optics-refraction-lens";
  } else if (
    /\b(gas|thermodynamic|kelvin|boltzmann|moles|pressure|piston|helium|argon|nitrogen|entropy|pv\s*=\s*nrt)\b/i.test(
      lower
    )
  ) {
    simulationId = "thermodynamics-gas-lab";
  } else if (
    /\b(orbit|kepler|planet|satellite|comet|star|periapsis|apoapsis|eccentricity|solar|astrophysics)\b/i.test(
      lower
    )
  ) {
    simulationId = "orbital-gravity-3d";
  } else if (
    /\b(wave|interference|superposition|slit|wavelength|fringe|acoustic|ripple tank|nodal|doppler)\b/i.test(
      lower
    )
  ) {
    simulationId = "wave-interference-3d";
  } else if (
    /\b(pendulum|lagrangian|bob|oscillat|coupled|harmonic oscillator)\b/i.test(
      lower
    )
  ) {
    simulationId = "double-pendulum-lab";
  } else if (
    /\b(projectile|cannon|ballistic|launch|throw|trajectory|drag|parabola|velocity|gravity|mars|moon)\b/i.test(
      lower
    )
  ) {
    simulationId = "projectile-ballistics";
  }

  const baseSim = getSimulationById(simulationId);
  const params = { ...baseSim.defaultParams };
  let customTitle = `AI Experiment: ${baseSim.shortTitle}`;
  let hypothesis = "";
  const reasoningSteps = [];

  // 2. Model-specific parameter extraction & validation
  if (simulationId === "vedic-square-3d") {
    const rootMatch = lower.match(/\b(?:root|number|digit)\s*([1-9])\b/) || lower.match(/\b([1-9])\b/);
    if (rootMatch) {
      params.number = clamp(parseInt(rootMatch[1], 10), 1, 9);
      extractedEntities.push(`Digital Root = ${params.number}`);
    }
    if (/\b(dual|complement|twin|mirror|pair|↔)\b/.test(lower)) {
      params.showDual = true;
      extractedEntities.push("9-Complement Dual Symmetry = Enabled");
    }
    if (/\bmandala\b/.test(lower)) {
      params.patternMode = "mandala";
      extractedEntities.push("Topology = Star Mandala");
    } else if (/\b(network|full|graph)\b/.test(lower)) {
      params.patternMode = "network";
      extractedEntities.push("Topology = Full Graph");
    } else if (/\b(sequential|flow)\b/.test(lower)) {
      params.patternMode = "sequential";
      extractedEntities.push("Topology = Sequential Wave Flow");
    }
    if (/\bspiral\b/.test(lower)) {
      params.waveMode = "spiral";
      extractedEntities.push("3D Wave = Vortex Spiral");
    } else if (/\bharmonic\b/.test(lower)) {
      params.waveMode = "harmonic";
      extractedEntities.push("3D Wave = Harmonic Standing Wave");
    }
    customTitle = `AI Vedic Synthesis — Root ${params.number} (${params.patternMode})`;
    reasoningSteps.push(
      `Mapped request to the 9×9 Vedic Square modular arithmetic engine (mod 9).`,
      `Configured active digital root ${params.number} with ${params.patternMode} connection geometry and ${params.waveMode} pillar oscillation.`
    );
    hypothesis = `Cells where (row × col) ≡ ${params.number} (mod 9) will form a symmetric ${params.patternMode} geometric lattice with complement root ${9 - params.number || 9}.`;
  } else if (simulationId === "projectile-ballistics") {
    // Detect planetary gravity environment
    if (/\bmoon|lunar\b/.test(lower)) {
      params.gravity = 1.62;
      params.dragCoeff = 0.0;
      extractedEntities.push("Environment = Moon (g = 1.62 m/s², Vacuum)");
    } else if (/\bmars|martian\b/.test(lower)) {
      params.gravity = 3.72;
      params.dragCoeff = 0.005;
      extractedEntities.push("Environment = Mars (g = 3.72 m/s², Thin CO₂ Atmosphere)");
    } else if (/\bjupiter|jovian\b/.test(lower)) {
      params.gravity = 24.79;
      extractedEntities.push("Environment = Jupiter (g = 24.79 m/s²)");
    } else if (/\bvacuum|no drag|zero drag\b/.test(lower)) {
      params.dragCoeff = 0.0;
      extractedEntities.push("Atmosphere = Ideal Vacuum (k = 0)");
    }

    const v = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:m\/s|mps|meters per second)/, null);
    if (v !== null) {
      params.velocity = clamp(v, 10, 90);
      extractedEntities.push(`Launch Velocity v₀ = ${params.velocity} m/s`);
    }
    const ang = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:deg|degrees|°)/, null);
    if (ang !== null) {
      params.angleDeg = clamp(ang, 10, 85);
      extractedEntities.push(`Launch Angle θ = ${params.angleDeg}°`);
    }
    const m = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:kg|kilograms)/, null);
    if (m !== null) {
      params.mass = clamp(m, 0.5, 20);
      extractedEntities.push(`Projectile Mass m = ${params.mass} kg`);
    }
    const h = extractNumberByPattern(lower, /(?:from|cliff|height|elevation)\s*(?:of\s*|a\s*)?(\d+(?:\.\d+)?)\s*m\b/, null);
    if (h !== null) {
      params.initialHeight = clamp(h, 0, 40);
      extractedEntities.push(`Initial Elevation h₀ = ${params.initialHeight} m`);
    }

    customTitle = `AI Ballistics — ${params.velocity} m/s @ ${params.angleDeg}° (g=${params.gravity} m/s²)`;
    reasoningSteps.push(
      `Selected Newtonian 2D Ballistic Kinematics solver with quadratic aerodynamic drag.`,
      `Applied gravitational acceleration g = ${params.gravity} m/s², launch speed v₀ = ${params.velocity} m/s, and angle θ = ${params.angleDeg}°.`
    );
    hypothesis =
      params.dragCoeff > 0
        ? `Aerodynamic drag (k = ${params.dragCoeff}) will foreshorten horizontal range compared to the ideal vacuum parabola and dissipate mechanical energy.`
        : `In the absence of drag, total mechanical energy E = K + U remains strictly constant throughout the parabolic flight.`;
  } else if (simulationId === "optics-refraction-lens") {
    if (/\bwater\b.*?\bair\b/.test(lower)) {
      params.n1 = 1.33;
      params.n2 = 1.0;
      extractedEntities.push("Media = Water (1.33) → Air (1.00)");
    } else if (/\bdiamond\b/.test(lower)) {
      params.n1 = 1.0;
      params.n2 = 2.42;
      extractedEntities.push("Media = Air (1.00) → Diamond (2.42)");
    } else if (/\bglass\b/.test(lower)) {
      params.n1 = 1.0;
      params.n2 = 1.52;
      extractedEntities.push("Media = Air (1.00) → Crown Glass (1.52)");
    }

    const n1Match = extractNumberByPattern(lower, /n1\s*=\s*(\d+(?:\.\d+)?)/, null);
    const n2Match = extractNumberByPattern(lower, /n2\s*=\s*(\d+(?:\.\d+)?)/, null);
    if (n1Match !== null) params.n1 = clamp(n1Match, 1.0, 2.42);
    if (n2Match !== null) params.n2 = clamp(n2Match, 1.0, 2.42);

    const ang = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:deg|degrees|°)/, null);
    if (ang !== null) {
      params.incidentAngleDeg = clamp(ang, 0, 85);
      extractedEntities.push(`Incident Angle θ₁ = ${params.incidentAngleDeg}°`);
    }

    customTitle = `AI Optics — n₁=${params.n1} → n₂=${params.n2} @ θ₁=${params.incidentAngleDeg}°`;
    reasoningSteps.push(
      `Configured Snell-Descartes refraction & Fresnel reflectance solver + Gaussian Thin Lens ray tracer.`,
      `Evaluated phase velocity ratio v₁/v₂ = n₂/n₁ = ${(params.n2 / params.n1).toFixed(2)}.`
    );
    hypothesis =
      params.n1 > params.n2
        ? `Because n₁ > n₂, incident angles exceeding θc = ${((Math.asin(params.n2 / params.n1) * 180) / Math.PI).toFixed(1)}° will trigger 100% Total Internal Reflection.`
        : `The ray will bend toward the normal inside the denser medium (n₂ = ${params.n2}).`;
  } else if (simulationId === "thermodynamics-gas-lab") {
    if (/\bhelium\b/.test(lower)) {
      params.molarMassG = 4.0;
      extractedEntities.push("Gas = Helium (4 g/mol)");
    } else if (/\bnitrogen\b/.test(lower)) {
      params.molarMassG = 28.0;
      extractedEntities.push("Gas = Nitrogen N₂ (28 g/mol)");
    } else if (/\bargon\b/.test(lower)) {
      params.molarMassG = 40.0;
      extractedEntities.push("Gas = Argon (40 g/mol)");
    } else if (/\bcarbon dioxide|co2\b/.test(lower)) {
      params.molarMassG = 44.0;
      extractedEntities.push("Gas = CO₂ (44 g/mol)");
    }

    const temp = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:k|kelvin)\b/, null);
    if (temp !== null) {
      params.temperatureK = clamp(temp, 80, 1000);
      extractedEntities.push(`Temperature T = ${params.temperatureK} K`);
    }
    const vol = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:l|liter|liters|litre)\b/, null);
    if (vol !== null) {
      params.volumeL = clamp(vol, 3, 25);
      extractedEntities.push(`Volume V = ${params.volumeL} L`);
    }
    const mol = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:mol|moles)\b/, null);
    if (mol !== null) {
      params.moles = clamp(mol, 0.4, 4.0);
      extractedEntities.push(`Moles n = ${params.moles} mol`);
    }

    customTitle = `AI Kinetic Gas — T=${params.temperatureK}K, V=${params.volumeL}L (M=${params.molarMassG} g/mol)`;
    reasoningSteps.push(
      `Initialized Ideal Gas (PV = nRT) & Maxwell-Boltzmann molecular speed distribution solver.`,
      `Computed root-mean-square thermal speed from T = ${params.temperatureK} K and molar mass M = ${params.molarMassG} g/mol.`
    );
    hypothesis = `At ${params.temperatureK} K in a ${params.volumeL} L container, molecular wall collisions will generate a macroscopic pressure of ${((params.moles * 8.3145 * params.temperatureK) / params.volumeL).toFixed(1)} kPa.`;
  } else if (simulationId === "chaos-attractor-3d") {
    if (/\brossler|rössler\b/.test(lower)) {
      params.system = "rossler";
      extractedEntities.push("System = Rössler Attractor");
    } else if (/\bthomas\b/.test(lower)) {
      params.system = "thomas";
      extractedEntities.push("System = Thomas Cyclic Attractor");
    } else {
      params.system = "lorenz";
      extractedEntities.push("System = Lorenz Attractor");
    }

    const rho = extractNumberByPattern(lower, /(?:rho|rayleigh)\s*=?\s*(\d+(?:\.\d+)?)/, null);
    if (rho !== null) {
      params.rho = clamp(rho, 8, 55);
      extractedEntities.push(`Rayleigh ρ = ${params.rho}`);
    }
    const sigma = extractNumberByPattern(lower, /(?:sigma|prandtl)\s*=?\s*(\d+(?:\.\d+)?)/, null);
    if (sigma !== null) {
      params.sigma = clamp(sigma, 2, 22);
      extractedEntities.push(`Prandtl σ = ${params.sigma}`);
    }
    customTitle = `AI 3D Chaos — ${params.system.toUpperCase()} (σ=${params.sigma}, ρ=${params.rho})`;
    reasoningSteps.push(
      `Integrated coupled 3D nonlinear ODEs using 4th-order Runge-Kutta (RK4).`,
      `Phase space volume contracts at rate ∇·F = -${(params.sigma + 1 + params.beta).toFixed(2)} onto the strange attractor manifold.`
    );
    hypothesis = `Trajectories will orbit two symmetric saddle-focus lobes without ever intersecting or repeating.`;
  } else if (simulationId === "calculus-fourier-lab") {
    if (/\bfourier|square\b/.test(lower)) {
      params.presetId = "fourier_square";
      extractedEntities.push("Function = Fourier Odd-Harmonic Square Wave");
    } else if (/\bgaussian\b/.test(lower)) {
      params.presetId = "gaussian_wave";
      extractedEntities.push("Function = Gaussian Wave Packet");
    } else if (/\bpolynomial|cubic\b/.test(lower)) {
      params.presetId = "polynomial";
      extractedEntities.push("Function = Cubic Polynomial");
    }

    const amp = extractNumberByPattern(lower, /amplitude\s*=?\s*(\d+(?:\.\d+)?)/, null);
    if (amp !== null) params.amplitude = clamp(amp, 0.5, 4.0);
    const freq = extractNumberByPattern(lower, /frequency\s*=?\s*(\d+(?:\.\d+)?)/, null);
    if (freq !== null) params.frequency = clamp(freq, 0.4, 4.0);
    const parts = extractNumberByPattern(lower, /(\d+)\s*(?:riemann|partitions|bins|rectangles)/, null);
    if (parts !== null) params.riemannSubdivisions = clamp(parts, 4, 80);

    customTitle = `AI Calculus & Harmonics — ${params.presetId.replace("_", " ")} (N=${params.riemannSubdivisions})`;
    reasoningSteps.push(
      `Configured numerical differentiation (central difference) and Simpson 1/3 vs. Midpoint Riemann quadrature.`,
      `Subdivided integration domain [${params.integralLower}, ${params.integralUpper}] into N = ${params.riemannSubdivisions} partitions.`
    );
    hypothesis = `Increasing Riemann partitions N reduces quadrature truncation error relative to exact Simpson integration at rate O(1/N²).`;
  } else if (simulationId === "orbital-gravity-3d") {
    const ecc = extractNumberByPattern(lower, /(?:e|eccentricity)\s*=?\s*(0\.\d+)/, null);
    if (ecc !== null) {
      params.eccentricity = clamp(ecc, 0, 0.82);
      extractedEntities.push(`Eccentricity e = ${params.eccentricity}`);
    } else if (/\bcomet|high-eccentricity|elliptical\b/.test(lower)) {
      params.eccentricity = 0.72;
      extractedEntities.push("Orbit Type = High-Eccentricity Comet (e = 0.72)");
    } else if (/\bcircular\b/.test(lower)) {
      params.eccentricity = 0.01;
      extractedEntities.push("Orbit Type = Circular (e = 0.01)");
    }
    const mass = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:solar|star mass|m☉)/, null);
    if (mass !== null) {
      params.starMass = clamp(mass, 0.4, 3.5);
      extractedEntities.push(`Stellar Mass M = ${params.starMass} M☉`);
    }
    const tilt = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:deg|degrees|°)/, null);
    if (tilt !== null) {
      params.inclinationDeg = clamp(tilt, 0, 60);
      extractedEntities.push(`Orbital Inclination i = ${params.inclinationDeg}°`);
    }

    customTitle = `AI 3D Kepler Orbit — e=${params.eccentricity}, M=${params.starMass} M☉`;
    reasoningSteps.push(
      `Solved Keplerian 3D conic section and Vis-Viva velocity profile under central gravitational potential.`,
      `Computed periapsis r_p = ${(params.semiMajorAxis * (1 - params.eccentricity)).toFixed(2)} AU and apoapsis r_a = ${(params.semiMajorAxis * (1 + params.eccentricity)).toFixed(2)} AU.`
    );
    hypothesis = `By Kepler's 2nd Law (equal areas in equal times), orbital speed peaks at periapsis and reaches its minimum at apoapsis.`;
  } else if (simulationId === "wave-interference-3d") {
    const sep = extractNumberByPattern(lower, /(?:separated by|separation|d\s*=)\s*(\d+(?:\.\d+)?)/, null);
    if (sep !== null) {
      params.sourceSeparation = clamp(sep, 0, 6.5);
      extractedEntities.push(`Source Separation d = ${params.sourceSeparation} m`);
    }
    const wl = extractNumberByPattern(lower, /(?:wavelength|lambda)\s*=?\s*(\d+(?:\.\d+)?)/, null);
    if (wl !== null) {
      params.wavelength = clamp(wl, 0.7, 3.2);
      extractedEntities.push(`Wavelength λ = ${params.wavelength} m`);
    }
    const ph = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*(?:deg|degrees|°)/, null);
    if (ph !== null) {
      params.phaseShiftDeg = clamp(ph, 0, 180);
      extractedEntities.push(`Phase Shift φ = ${params.phaseShiftDeg}°`);
    }
    customTitle = `AI Wave Superposition — d=${params.sourceSeparation}m, λ=${params.wavelength}m`;
    reasoningSteps.push(
      `Synthesized 3D coherent two-source wavefield Ψ₁ + Ψ₂ with wave number k = ${((2 * Math.PI) / params.wavelength).toFixed(2)} rad/m.`,
      `Calculated constructive fringe orders up to m = ${Math.floor(params.sourceSeparation / params.wavelength)}.`
    );
    hypothesis = `Hyperbolic nodal lines of destructive cancellation form wherever path difference |r₂ - r₁| equals (m + ½)λ.`;
  } else if (simulationId === "double-pendulum-lab") {
    const l1 = extractNumberByPattern(lower, /(\d+(?:\.\d+)?)\s*m\b/, null);
    if (l1 !== null) {
      params.length1 = clamp(l1, 0.8, 3.0);
      extractedEntities.push(`Rod Length L₁ = ${params.length1} m`);
    }
    if (/\blow gravity|moon\b/.test(lower)) {
      params.gravity = 1.62;
      extractedEntities.push("Gravity = Lunar (1.62 m/s²)");
    }
    customTitle = `AI Coupled Double Pendulum (L₁=${params.length1}m, g=${params.gravity} m/s²)`;
    reasoningSteps.push(
      `Formulated coupled nonlinear Euler-Lagrange equations of motion integrated with 4th-order Runge-Kutta.`,
      `Tracked angular phase portrait (θ₁, ω₁) and instantaneous kinetic/potential energy exchange.`
    );
    hypothesis = `High initial release angles induce chaotic angular momentum transfer between the upper and lower bobs.`;
  } else if (simulationId === "probability-monte-carlo") {
    const nRows = extractNumberByPattern(lower, /(\d+)\s*(?:rows|pegs)/, null);
    if (nRows !== null) params.rows = clamp(nRows, 4, 18);
    const nSamples = extractNumberByPattern(lower, /(\d+)\s*(?:samples|trials|balls|points)/, null);
    if (nSamples !== null) params.samples = clamp(nSamples, 100, 4000);
    customTitle = `AI Stochastic Lab — n=${params.rows} Rows, N=${params.samples} Trials`;
    reasoningSteps.push(
      `Configured Binomial distribution P(k) = C(n,k) p^k (1-p)^(n-k) alongside Monte Carlo circle quadrature.`
    );
    hypothesis = `As sample count N = ${params.samples} increases, empirical bin frequencies converge to the exact Binomial distribution.`;
  }

  if (extractedEntities.length === 0) {
    extractedEntities.push(`Model = ${baseSim.shortTitle}`, "Validated Default Parameters Applied");
  }

  return {
    simulationId,
    title: customTitle,
    prompt,
    params,
    extractedEntities,
    reasoningSteps,
    hypothesis,
    timestamp: new Date().toLocaleTimeString(),
  };
}
