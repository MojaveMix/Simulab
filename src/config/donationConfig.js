// Configuration for real donations and financial support for SimuLab.

export const DONATION_CONFIG = {
  // Creator name shown in the donation dialog
  recipientName: "Badr MOUJAHID",

  // 1. PayPal.me (Direct instant PayPal transfer worldwide with custom amounts)
  paypal: {
    enabled: true,
    username: "badermouj",
    url: "https://paypal.me/badermouj",
  },

  // 2. Ko-fi (0% fee platform for creators: supports one-time & monthly tips)
  kofi: {
    enabled: true,
    username: "badrmoujahid",
    url: "https://ko-fi.com/badrmoujahid",
  },

  // Preset amounts in USD
  presetAmounts: [3, 5, 10, 25, 50],
};

/**
 * Builds the direct target payment link based on selected method and amount.
 */
export function buildPaymentUrl(methodId, amount) {
  const safeAmount = Math.max(1, Number(amount) || 5);

  switch (methodId) {
    case "paypal": {
      const base = DONATION_CONFIG.paypal.url.replace(/\/+$/, "");
      return `${base}/${safeAmount}USD`;
    }
    case "kofi": {
      const base = DONATION_CONFIG.kofi.url.replace(/\/+$/, "");
      return base;
    }
    default: {
      const base = DONATION_CONFIG.paypal.url.replace(/\/+$/, "");
      return `${base}/${safeAmount}USD`;
    }
  }
}
