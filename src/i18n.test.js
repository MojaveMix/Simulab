import { describe, it, expect } from "vitest";
import { TRANSLATIONS } from "./i18n/translations";
import {
  SIMULATION_TRANSLATIONS,
  TELEMETRY_TRANSLATIONS,
  getLocalizedSimulation,
  getLocalizedTelemetryLabel,
  getLocalizedPresetName,
  getLocalizedParamLabel,
  getLocalizedVedicTheme,
} from "./i18n/simulationsI18n";
import { SIMULATION_CATALOG } from "./engine/simulationRegistry";
import {
  searchLessons,
  getLessonTitle,
  getLessonBlurb,
  getLessonTopic,
  LESSONS,
} from "./engine/lessonSearch";

describe("i18n translations dictionary", () => {
  it("has translations for en, fr, and ar", () => {
    expect(TRANSLATIONS.en).toBeDefined();
    expect(TRANSLATIONS.fr).toBeDefined();
    expect(TRANSLATIONS.ar).toBeDefined();
  });

  it("all primary sections exist across all languages", () => {
    const requiredSections = [
      "nav",
      "landing",
      "search",
      "workspace",
      "library",
      "aiStudio",
      "education",
      "vedic",
      "footer",
    ];

    ["en", "fr", "ar"].forEach((lang) => {
      requiredSections.forEach((section) => {
        expect(TRANSLATIONS[lang][section], `Missing section ${section} in ${lang}`).toBeDefined();
      });
    });
  });

  it("verifies nav labels are non-empty strings", () => {
    ["en", "fr", "ar"].forEach((lang) => {
      const nav = TRANSLATIONS[lang].nav;
      expect(nav.home.length).toBeGreaterThan(0);
      expect(nav.mathematics.length).toBeGreaterThan(0);
      expect(nav.physics.length).toBeGreaterThan(0);
      expect(nav.aiStudio.length).toBeGreaterThan(0);
      expect(nav.searchLessons.length).toBeGreaterThan(0);
    });
  });
});

describe("simulation localization metadata", () => {
  it("all 15 simulations in catalog have French & Arabic metadata", () => {
    SIMULATION_CATALOG.forEach((sim) => {
      const frSim = getLocalizedSimulation(sim, "fr");
      const arSim = getLocalizedSimulation(sim, "ar");

      expect(frSim.title).toBeDefined();
      expect(frSim.category).toBeDefined();
      expect(frSim.summary).toBeDefined();

      expect(arSim.title).toBeDefined();
      expect(arSim.category).toBeDefined();
      expect(arSim.summary).toBeDefined();

      // Ensure they are not default English when translation exists
      expect(SIMULATION_TRANSLATIONS.fr[sim.id]).toBeDefined();
      expect(SIMULATION_TRANSLATIONS.ar[sim.id]).toBeDefined();
    });
  });

  it("translates telemetry labels into French and Arabic", () => {
    expect(getLocalizedTelemetryLabel("Time in the air", "fr")).toBe("Temps de vol");
    expect(getLocalizedTelemetryLabel("Time in the air", "ar")).toBe("زمن التحليق في الهواء");

    expect(getLocalizedTelemetryLabel("Pressure", "fr")).toBe("Pression");
    expect(getLocalizedTelemetryLabel("Pressure", "ar")).toBe("الضغط");
  });

  it("translates preset and parameter labels", () => {
    expect(getLocalizedPresetName("Damped Harmonic Wave", "fr")).toBe("Onde Harmonique Amortie");
    expect(getLocalizedPresetName("Damped Harmonic Wave", "ar")).toBe("موجة توافقية متخامدة");

    expect(getLocalizedParamLabel("Launch Angle (θ)", "fr")).toBe("Angle de tir (θ)");
    expect(getLocalizedParamLabel("Launch Angle (θ)", "ar")).toBe("زاوية الإطلاق (θ)");
  });

  it("translates Vedic themes", () => {
    const rawTheme = { number: 1, name: "Monad Unity", symmetryPair: "1 ↔ 8 Mirror Symmetry", description: "test" };
    const frTheme = getLocalizedVedicTheme(rawTheme, "fr");
    const arTheme = getLocalizedVedicTheme(rawTheme, "ar");

    expect(frTheme.name).toBe("Unité de la Monade");
    expect(arTheme.name).toBe("وحدة الأحادية (Monad)");
  });
});

describe("multi-lingual lesson search and helpers", () => {
  const top = (q) => searchLessons(q, 1)[0]?.lesson;

  it("finds lessons by Arabic queries", () => {
    const resDeriv = top("مشتقات");
    expect(resDeriv).toBeDefined();
    expect(resDeriv.simId).toBe("calculus-fourier-lab");

    const resOhm = top("قانون أوم");
    expect(resOhm).toBeDefined();
    expect(resOhm.simId).toBe("circuit-ohm-lab");

    const resNewton = top("قوانين نيوتن");
    expect(resNewton).toBeDefined();
    expect(resNewton.simId).toBe("incline-forces-lab");

    const resKepler = top("كبلر");
    expect(resKepler).toBeDefined();
    expect(resKepler.simId).toBe("orbital-gravity-3d");
  });

  it("finds lessons by French queries", () => {
    const resDeriv = top("dérivée");
    expect(resDeriv).toBeDefined();
    expect(resDeriv.simId).toBe("calculus-fourier-lab");

    const resOhm = top("loi d'ohm");
    expect(resOhm).toBeDefined();
    expect(resOhm.simId).toBe("circuit-ohm-lab");

    const resWave = top("interférence");
    expect(resWave).toBeDefined();
    expect(resWave.simId).toBe("wave-interference-3d");
  });

  it("getLessonTitle and getLessonBlurb return localized text", () => {
    const lesson = LESSONS[0]; // calculus lesson
    expect(getLessonTitle(lesson, "en")).toBe(lesson.title);
    expect(getLessonTitle(lesson, "fr")).toBe(lesson.title_fr);
    expect(getLessonTitle(lesson, "ar")).toBe(lesson.title_ar);

    expect(getLessonBlurb(lesson, "en")).toBe(lesson.blurb);
    expect(getLessonBlurb(lesson, "fr")).toBe(lesson.blurb_fr);
    expect(getLessonBlurb(lesson, "ar")).toBe(lesson.blurb_ar);
  });
});
