import { describe, it, expect } from "vitest";
import { DONATION_CONFIG, buildPaymentUrl } from "./config/donationConfig";
import { TRANSLATIONS } from "./i18n/translations";

describe("donation configuration and URL builder", () => {
  it("has valid creator recipient name and methods", () => {
    expect(DONATION_CONFIG.recipientName).toBe("Badr Moujahid");
    expect(DONATION_CONFIG.buyMeACoffee.enabled).toBe(true);
    expect(DONATION_CONFIG.paypal.enabled).toBe(true);
    expect(DONATION_CONFIG.kofi.enabled).toBe(true);
    expect(DONATION_CONFIG.githubSponsors.enabled).toBe(true);
    expect(DONATION_CONFIG.stripe.enabled).toBe(true);
    expect(DONATION_CONFIG.crypto.enabled).toBe(true);
    expect(DONATION_CONFIG.presetAmounts).toEqual([3, 5, 10, 25, 50]);
  });

  it("builds correct payment URLs with custom amounts", () => {
    const paypalUrl = buildPaymentUrl("paypal", 15);
    expect(paypalUrl).toContain("paypal.me/BadrMoujahid/15USD");

    const bmacUrl = buildPaymentUrl("buymeacoffee", 25);
    expect(bmacUrl).toContain("buymeacoffee.com/badrmoujahid");

    const kofiUrl = buildPaymentUrl("kofi", 10);
    expect(kofiUrl).toContain("ko-fi.com/badrmoujahid");

    const githubUrl = buildPaymentUrl("github", 5);
    expect(githubUrl).toContain("github.com/sponsors/MojaveMix");
  });

  it("provides valid crypto wallet addresses", () => {
    expect(DONATION_CONFIG.crypto.wallets.length).toBeGreaterThanOrEqual(3);
    const symbols = DONATION_CONFIG.crypto.wallets.map((w) => w.symbol);
    expect(symbols).toContain("USDT");
    expect(symbols).toContain("ETH");
    expect(symbols).toContain("BTC");
  });
});

describe("donation i18n translations", () => {
  it("has all required donation translation keys for en, fr, and ar", () => {
    const requiredKeys = [
      "button",
      "modalTitle",
      "openSourceBadge",
      "modalSubtitle",
      "selectAmount",
      "custom",
      "chooseMethod",
      "proceedTo",
      "securityNote",
      "cryptoTitle",
      "copyAddress",
      "copied",
      "whyDonate",
      "thankYou",
    ];

    ["en", "fr", "ar"].forEach((lang) => {
      const donateSection = TRANSLATIONS[lang].donate;
      expect(donateSection, `Missing donate section in ${lang}`).toBeDefined();

      requiredKeys.forEach((key) => {
        expect(
          donateSection[key],
          `Missing donate.${key} in ${lang}`
        ).toBeDefined();
        expect(donateSection[key].length).toBeGreaterThan(0);
      });
    });
  });

  it("has donate button label in nav and footer for all languages", () => {
    ["en", "fr", "ar"].forEach((lang) => {
      expect(TRANSLATIONS[lang].nav.donate).toBeDefined();
      expect(TRANSLATIONS[lang].nav.donate.length).toBeGreaterThan(0);

      expect(TRANSLATIONS[lang].footer.donate).toBeDefined();
      expect(TRANSLATIONS[lang].footer.donate.length).toBeGreaterThan(0);
    });
  });
});
