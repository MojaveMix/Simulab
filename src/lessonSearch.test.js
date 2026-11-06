import { describe, it, expect } from "vitest";
import { LESSONS, searchLessons } from "./engine/lessonSearch";
import { SIMULATION_CATALOG, getSimulationById } from "./engine/simulationRegistry";
import {
  computeFunctionGrapher,
  computeUnitCircle,
  computeSpring,
  computeCircuit,
  computeIncline,
} from "./engine/extraSimulations";

describe("lessons.json", () => {
  it("every lesson points at a real simulation with unique id", () => {
    const ids = new Set();
    LESSONS.forEach((l) => {
      expect(ids.has(l.id)).toBe(false);
      ids.add(l.id);
      expect(SIMULATION_CATALOG.some((s) => s.id === l.simId)).toBe(true);
      expect(["mathematics", "physics"]).toContain(l.domain);
    });
  });
});

describe("searchLessons", () => {
  const top = (q) => searchLessons(q, 1)[0]?.lesson;

  it("finds lessons by name, alias, typo and French", () => {
    expect(top("derivatives").simId).toBe("calculus-fourier-lab");
    expect(top("quadratic").simId).toBe("function-grapher");
    expect(top("Newton's second law").simId).toBe("incline-forces-lab");
    expect(top("ohm").simId).toBe("circuit-ohm-lab");
    expect(top("pendulm").simId).toBe("double-pendulum-lab");
    expect(top("dérivée").simId).toBe("calculus-fourier-lab");
    expect(top("kepler").simId).toBe("orbital-gravity-3d");
    expect(top("pythagoras").simId).toBe("unit-circle-trig");
  });

  it("returns nothing for gibberish and empty input", () => {
    expect(searchLessons("")).toEqual([]);
    expect(searchLessons("zzzqqq")).toEqual([]);
  });
});

describe("new simulation models", () => {
  it("function grapher finds parabola roots and slope", () => {
    const r = computeFunctionGrapher({ fn: "quadratic", a: 1, b: 0, c: -4, d: 0, x0: 1 });
    expect(r.roots.map((x) => Math.round(x))).toEqual([-2, 2]);
    expect(r.slope).toBeCloseTo(2, 3);
    expect(r.discriminant).toBe(16);
  });

  it("unit circle respects sin²+cos²=1", () => {
    expect(computeUnitCircle({ angleDeg: 123 }).identity).toBeCloseTo(1, 10);
  });

  it("spring period matches 2π√(m/k)", () => {
    const s = computeSpring({ mass: 2, stiffness: 8, amplitude: 1, damping: 0 });
    expect(s.period).toBeCloseTo(2 * Math.PI * Math.sqrt(2 / 8), 8);
    expect(s.position(0)).toBeCloseTo(1, 8);
  });

  it("circuit obeys Ohm's law", () => {
    const s = computeCircuit({ voltage: 12, r1: 20, r2: 30, mode: "series" });
    expect(s.I).toBeCloseTo(12 / 50, 8);
    const p = computeCircuit({ voltage: 12, r1: 20, r2: 30, mode: "parallel" });
    expect(p.rEq).toBeCloseTo(12, 8);
  });

  it("incline friction holds or slides", () => {
    expect(computeIncline({ angleDeg: 30, mass: 5, friction: 0.8, applied: 0 }).accel).toBe(0);
    expect(computeIncline({ angleDeg: 30, mass: 5, friction: 0, applied: 0 }).accel).toBeCloseTo(-4.905, 3);
  });

  it("registry still starts with the flagship and contains new sims", () => {
    expect(SIMULATION_CATALOG[0].id).toBe("vedic-square-3d");
    expect(getSimulationById("spring-oscillator").id).toBe("spring-oscillator");
  });
});
