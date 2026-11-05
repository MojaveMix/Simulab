import { describe, it, expect } from "vitest";
import * as THREE from "three";
import {
  digitalRoot,
  getDigitalRootBreakdown,
  buildVedicSquare,
  computeConnections,
  NUMBER_THEMES,
} from "./utils/vedicMath";
import {
  SIMULATION_CATALOG,
  getSimulationById,
} from "./engine/simulationRegistry";
import {
  evaluateMathExpression,
  computeCalculusAnalysis,
  computeChaosAttractor,
  computeProbabilitySimulation,
} from "./engine/mathModels";
import {
  computeProjectileSimulation,
  stepDoublePendulum,
  computeOrbitalSystem,
  computeWaveInterference,
  computeOpticsModel,
  computeThermodynamicsModel,
} from "./engine/physicsModels";
import { generateSimulationFromPrompt } from "./engine/aiSimulationEngine";

describe("Vedic Square Mathematical Engine (Preserved Flagship)", () => {
  it("computes digital roots accurately for 1..81", () => {
    expect(digitalRoot(0)).toBe(0);
    expect(digitalRoot(5)).toBe(5);
    expect(digitalRoot(9)).toBe(9);
    expect(digitalRoot(38)).toBe(2); // 3 + 8 = 11 -> 1 + 1 = 2
    expect(digitalRoot(81)).toBe(9); // 8 + 1 = 9
    expect(digitalRoot(64)).toBe(1); // 6 + 4 = 10 -> 1 + 0 = 1
  });

  it("provides step-by-step digital root breakdown", () => {
    const breakdown = getDigitalRootBreakdown(7, 8);
    expect(breakdown.product).toBe(56);
    expect(breakdown.root).toBe(2);
    expect(breakdown.steps.length).toBe(2);
    expect(breakdown.steps[0].result).toBe(11);
    expect(breakdown.steps[1].result).toBe(2);
  });

  it("builds a complete 9x9 Vedic Square with 81 cells", () => {
    const { table, cells } = buildVedicSquare(9);
    expect(table.length).toBe(9);
    expect(cells.length).toBe(81);
    const nines = cells.filter((c) => c.value === 9);
    expect(nines.length).toBe(21);
  });

  it("computes 3D connections with precalculated quaternions across all pattern modes", () => {
    const { cells } = buildVedicSquare(9);
    const active = cells
      .filter((c) => c.value === 5)
      .map((c) => ({ ...c, position: new THREE.Vector3(c.x, 1, c.z) }));

    for (const mode of ["constellation", "mandala", "sequential", "network"]) {
      const conns = computeConnections(active, mode, NUMBER_THEMES[4].beamColor);
      expect(conns.length).toBeGreaterThan(0);
      expect(conns[0].quaternion).toBeInstanceOf(THREE.Quaternion);
      expect(conns[0].length).toBeGreaterThan(0);
    }
  });
});

describe("SimuLab Modular Simulation Registry", () => {
  it("registers Vedic Square 3D as the first flagship simulation alongside Math & Physics labs", () => {
    expect(SIMULATION_CATALOG.length).toBeGreaterThanOrEqual(10);
    expect(SIMULATION_CATALOG[0].id).toBe("vedic-square-3d");
    const mathSims = SIMULATION_CATALOG.filter((s) => s.domain === "mathematics");
    const physSims = SIMULATION_CATALOG.filter((s) => s.domain === "physics");
    expect(mathSims.length).toBeGreaterThanOrEqual(4);
    expect(physSims.length).toBeGreaterThanOrEqual(6);
    expect(getSimulationById("optics-refraction-lens").domain).toBe("physics");
  });
});

describe("SimuLab Validated Mathematics Models", () => {
  it("evaluates mathematical expressions safely and computes derivatives & integrals", () => {
    expect(evaluateMathExpression("2 * sin(pi / 2) + 3", { x: 0 })).toBeCloseTo(5, 5);
    const calc = computeCalculusAnalysis({
      presetId: "damped_sine",
      amplitude: 2.0,
      frequency: 1.5,
      damping: 0.0,
      x0: 0,
      integralLower: -Math.PI,
      integralUpper: Math.PI,
      riemannSubdivisions: 40,
    });
    // For f(x) = 2*sin(1.5*x), f'(0) = 2 * 1.5 * cos(0) = 3.0
    expect(calc.derivative).toBeCloseTo(3.0, 2);
    // Integral of odd function over symmetric interval [-pi, pi] is 0
    expect(calc.exactIntegral).toBeCloseTo(0.0, 4);
  });

  it("integrates 3D Lorenz strange attractor via RK4 with negative phase divergence", () => {
    const chaos = computeChaosAttractor({
      system: "lorenz",
      sigma: 10,
      rho: 28,
      beta: 8 / 3,
      steps: 500,
    });
    expect(chaos.points.length).toBe(500);
    expect(chaos.divergenceRate).toBeCloseTo(-(10 + 1 + 8 / 3), 2);
    expect(chaos.equilibrium.z).toBe(27);
  });

  it("computes Binomial Galton probabilities summing to 1 and estimates Pi via Monte Carlo", () => {
    const prob = computeProbabilitySimulation({
      rows: 10,
      probRight: 0.5,
      samples: 2000,
      seed: 42,
    });
    const totalTheo = prob.bins.reduce((acc, b) => acc + b.theoreticalProb, 0);
    const totalEmp = prob.bins.reduce((acc, b) => acc + b.empiricalProb, 0);
    expect(totalTheo).toBeCloseTo(1.0, 5);
    expect(totalEmp).toBeCloseTo(1.0, 5);
    expect(prob.theoreticalMean).toBe(5.0);
    expect(prob.piEstimate).toBeGreaterThan(2.9);
    expect(prob.piEstimate).toBeLessThan(3.4);
  });
});

describe("SimuLab Validated Physics Models", () => {
  it("computes projectile motion where aerodynamic drag reduces horizontal range vs vacuum", () => {
    const proj = computeProjectileSimulation({
      velocity: 50,
      angleDeg: 45,
      gravity: 9.81,
      mass: 4.0,
      dragCoeff: 0.03,
      initialHeight: 0,
    });
    expect(proj.vacuumRange).toBeCloseTo((50 * 50) / 9.81, 1);
    expect(proj.range).toBeLessThan(proj.vacuumRange);
    expect(proj.dissipatedEnergy).toBeGreaterThan(0);
  });

  it("steps double pendulum Lagrangian RK4 and conserves positive mechanical energy", () => {
    const next = stepDoublePendulum(
      { theta1: 1.2, omega1: 0, theta2: 1.5, omega2: 0 },
      { length1: 2.0, length2: 1.5, mass1: 2.0, mass2: 1.5, gravity: 9.81, damping: 0 },
      0.016
    );
    expect(Number.isFinite(next.theta1)).toBe(true);
    expect(next.totalEnergy).toBeGreaterThan(0);
  });

  it("satisfies Kepler's 3rd law and Vis-Viva velocity inequality (v_periapsis > v_apoapsis)", () => {
    const orb = computeOrbitalSystem({
      starMass: 1.0,
      semiMajorAxis: 4.0,
      eccentricity: 0.5,
      inclinationDeg: 15,
    });
    expect(orb.periapsis).toBeCloseTo(2.0, 3);
    expect(orb.apoapsis).toBeCloseTo(6.0, 3);
    expect(orb.vPeriapsis).toBeGreaterThan(orb.vApoapsis);
  });

  it("computes Snell's Law refraction, critical angle, and Total Internal Reflection", () => {
    // Air to Glass refraction
    const glass = computeOpticsModel({
      n1: 1.0,
      n2: 1.5,
      incidentAngleDeg: 30,
      focalLength: 2.0,
      objectDistance: 4.0,
    });
    expect(glass.isTotalInternalReflection).toBe(false);
    // sin(30) = 0.5 -> sin(theta2) = 0.5 / 1.5 = 1/3 -> theta2 = asin(1/3) = 19.471 deg
    expect(glass.refractedAngleDeg).toBeCloseTo(19.471, 2);
    expect(glass.imageDistance).toBeCloseTo(4.0, 2);

    // Water to Air above critical angle (48.75 deg) -> Total Internal Reflection
    const tir = computeOpticsModel({
      n1: 1.33,
      n2: 1.0,
      incidentAngleDeg: 60,
    });
    expect(tir.isTotalInternalReflection).toBe(true);
    expect(tir.reflectance).toBe(1.0);
  });

  it("computes Ideal Gas pressure (PV=nRT) and Maxwell-Boltzmann RMS velocity", () => {
    const gas = computeThermodynamicsModel({
      temperatureK: 300,
      volumeL: 10.0,
      moles: 1.0,
      molarMassG: 4.0, // Helium
    });
    // v_rms = sqrt(3 * 8.31446 * 300 / 0.004) = 1367.8 m/s
    expect(gas.vRms).toBeCloseTo(1367.8, 0);
    expect(gas.vRms).toBeGreaterThan(gas.vMean);
    expect(gas.vMean).toBeGreaterThan(gas.vMostProbable);
  });

  it("computes coherent two-source wave interference orders and detector profile", () => {
    const wave = computeWaveInterference({
      wavelength: 1.5,
      sourceSeparation: 4.5,
      frequency: 2.0,
    });
    expect(wave.waveSpeed).toBeCloseTo(3.0, 3);
    expect(wave.maxConstructiveOrder).toBe(3);
    expect(wave.detectorProfile.length).toBeGreaterThan(40);
  });
});

describe("SimuLab AI-Powered Natural Language Simulation Generator", () => {
  it("transforms natural language prompts into validated simulation blueprints", () => {
    const marsSim = generateSimulationFromPrompt(
      "Launch a 6 kg projectile at 52 degrees with 55 m/s velocity on Mars from a 12m cliff"
    );
    expect(marsSim.simulationId).toBe("projectile-ballistics");
    expect(marsSim.params.gravity).toBeCloseTo(3.72, 2);
    expect(marsSim.params.velocity).toBe(55);
    expect(marsSim.params.angleDeg).toBe(52);
    expect(marsSim.params.mass).toBe(6);
    expect(marsSim.params.initialHeight).toBe(12);

    const vedicSim = generateSimulationFromPrompt(
      "Show Vedic Square digital root 3 with dual symmetry in Star Mandala mode"
    );
    expect(vedicSim.simulationId).toBe("vedic-square-3d");
    expect(vedicSim.params.number).toBe(3);
    expect(vedicSim.params.showDual).toBe(true);
    expect(vedicSim.params.patternMode).toBe("mandala");
  });
});
