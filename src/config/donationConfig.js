// Configuration for real donations and financial support for SimuLab.
// To receive real donations, simply replace the usernames/URLs below with your own!

export const DONATION_CONFIG = {
  // Your creator name shown in the donation dialog
  recipientName: "Badr Moujahid",

  // 1. Buy Me a Coffee (Most popular for open-source: accepts credit cards, Apple Pay, Google Pay)
  // Create your free account at: https://www.buymeacoffee.com
  buyMeACoffee: {
    enabled: true,
    username: "badrmoujahid",
    url: "https://buymeacoffee.com/badrmoujahid",
  },

  // 2. PayPal.me (Direct instant PayPal transfer worldwide with custom amounts)
  // Create your free link at: https://www.paypal.me
  paypal: {
    enabled: true,
    username: "BadrMoujahid",
    url: "https://paypal.me/BadrMoujahid",
  },

  // 3. Ko-fi (0% fee platform for creators: supports one-time & monthly tips)
  // Create your free page at: https://ko-fi.com
  kofi: {
    enabled: true,
    username: "badrmoujahid",
    url: "https://ko-fi.com/badrmoujahid",
  },

  // 4. GitHub Sponsors (Directly through GitHub for developers & open source contributors)
  // Enable at: https://github.com/sponsors
  githubSponsors: {
    enabled: true,
    username: "MojaveMix",
    url: "https://github.com/sponsors/MojaveMix",
  },

  // 5. Stripe Payment Link (Direct credit/debit card checkout hosted securely by Stripe)
  // Create a Payment Link with 0 code in your Stripe Dashboard: https://dashboard.stripe.com/payment-links
  stripe: {
    enabled: true,
    url: "https://donate.stripe.com/", // Replace with your live Stripe Payment Link
  },

  // 6. Direct Cryptocurrency Wallets (Bitcoin, Ethereum, USDT)
  crypto: {
    enabled: true,
    wallets: [
      {
        symbol: "USDT",
        network: "TRC-20 (Tron)",
        address: "TYDzsYUbAZ7Qp8kK3Yk9c8h2aWzE4x1Qpm",
      },
      {
        symbol: "ETH",
        network: "Ethereum (ERC-20)",
        address: "0x71C5eB8a5F84988e404bA3A9a9E405a18EB9B42B",
      },
      {
        symbol: "BTC",
        network: "Bitcoin",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      },
    ],
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
    case "buymeacoffee": {
      const base = DONATION_CONFIG.buyMeACoffee.url.replace(/\/+$/, "");
      return base;
    }
    case "kofi": {
      const base = DONATION_CONFIG.kofi.url.replace(/\/+$/, "");
      return base;
    }
    case "github": {
      return DONATION_CONFIG.githubSponsors.url;
    }
    case "stripe": {
      return DONATION_CONFIG.stripe.url;
    }
    default:
      return DONATION_CONFIG.buyMeACoffee.url;
  }
}
