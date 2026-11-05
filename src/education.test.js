import { describe, it, expect } from "vitest";
import katex from "katex";
import { SIMULATION_CATALOG } from "./engine/simulationRegistry";
import { FORMULA_LEGENDS } from "./engine/formulaLegends";
import { BEGINNER_GUIDES } from "./engine/beginnerGuides";

describe("Textbook-style math & beginner content", () => {
  const formulas = SIMULATION_CATALOG.flatMap((s) =>
    s.formulas.map((f) => ({ sim: s.id, ...f }))
  );

  it("every registered equation is valid LaTeX that KaTeX typesets without error", () => {
    for (const f of formulas) {
      expect(() =>
        katex.renderToString(f.latex, { throwOnError: true, strict: "ignore" })
      ).not.toThrow();
    }
  });

  it("every equation has a plain-language 'what do the letters mean' legend", () => {
    for (const f of formulas) {
      expect(FORMULA_LEGENDS[f.name], `missing legend: ${f.name}`).toBeTruthy();
    }
  });

  it("every legend symbol is valid LaTeX", () => {
    for (const legend of Object.values(FORMULA_LEGENDS)) {
      for (const [sym] of legend) {
        expect(() =>
          katex.renderToString(sym, { throwOnError: true, strict: "ignore" })
        ).not.toThrow();
      }
    }
  });

  it("every simulation has a beginner guide", () => {
    for (const s of SIMULATION_CATALOG) {
      expect(BEGINNER_GUIDES[s.id], `missing guide: ${s.id}`).toBeTruthy();
    }
  });
});
