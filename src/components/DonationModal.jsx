import { useState, useEffect, useId } from "react";
import {
  HeartIcon,
  CoffeeIcon,
  CreditCardIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
  CloseIcon,
} from "./Icons";
import { DONATION_CONFIG, buildPaymentUrl } from "../config/donationConfig";
import { useLanguage } from "../i18n/LanguageContext";

export default function DonationModal({ isOpen, onClose }) {
  const { t, isRTL } = useLanguage();
  const customInputId = useId();

  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("buymeacoffee");
  const [copiedSymbol, setCopiedSymbol] = useState(null);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAmount = isCustom
    ? Math.max(1, parseFloat(customAmount) || 0)
    : selectedAmount;

  const handleCopyWallet = (symbol, address) => {
    try {
      navigator.clipboard.writeText(address);
      setCopiedSymbol(symbol);
      setTimeout(() => setCopiedSymbol(null), 2500);
    } catch {
      // fallback
    }
  };

  const paymentMethods = [
    {
      id: "buymeacoffee",
      name: "Buy Me a Coffee",
      tagline: t("donate.methodBmacDesc"),
      badge: "Cards, Apple Pay, Google Pay",
      icon: CoffeeIcon,
      accentColor: "#F59E0B",
      url: DONATION_CONFIG.buyMeACoffee.url,
      enabled: DONATION_CONFIG.buyMeACoffee.enabled,
    },
    {
      id: "paypal",
      name: "PayPal.me",
      tagline: t("donate.methodPaypalDesc"),
      badge: "Instant Transfer",
      icon: CreditCardIcon,
      accentColor: "#38BDF8",
      url: buildPaymentUrl("paypal", currentAmount),
      enabled: DONATION_CONFIG.paypal.enabled,
    },
    {
      id: "stripe",
      name: "Stripe",
      tagline: t("donate.methodStripeDesc"),
      badge: "Direct Credit Card",
      icon: CreditCardIcon,
      accentColor: "#6366F1",
      url: DONATION_CONFIG.stripe.url,
      enabled: DONATION_CONFIG.stripe.enabled,
    },
    {
      id: "kofi",
      name: "Ko-fi",
      tagline: t("donate.methodKofiDesc"),
      badge: "0% Platform Fee",
      icon: HeartIcon,
      accentColor: "#EC4899",
      url: DONATION_CONFIG.kofi.url,
      enabled: DONATION_CONFIG.kofi.enabled,
    },
    {
      id: "github",
      name: "GitHub Sponsors",
      tagline: t("donate.methodGithubDesc"),
      badge: "Open Source Support",
      icon: ExternalLinkIcon,
      accentColor: "#A855F7",
      url: DONATION_CONFIG.githubSponsors.url,
      enabled: DONATION_CONFIG.githubSponsors.enabled,
    },
  ];

  const handleProceed = () => {
    const url = buildPaymentUrl(selectedMethod, currentAmount);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c1020] to-[#070913] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 fade-up text-start">
        {/* Ambient background aura */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-rose-500/20 rounded-full blur-3xl" />

        {/* Modal Header */}
        <div className="relative p-6 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/25 to-pink-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-lg shadow-rose-500/15">
              <HeartIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t("donate.modalTitle")}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 border border-rose-400/30 text-rose-300">
                  {t("donate.openSourceBadge")}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {t("donate.modalSubtitle")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto custom-scroll">
          {/* Step 1: Contribution Amount Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. {t("donate.selectAmount")}
              </span>
              <span className="text-xs font-mono font-bold text-rose-300">
                ${currentAmount} USD
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {DONATION_CONFIG.presetAmounts.map((amt) => {
                const isSelected = !isCustom && selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105"
                        : "bg-slate-900/70 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    ${amt}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  isCustom
                    ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105"
                    : "bg-slate-900/70 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {t("donate.custom")}
              </button>
            </div>

            {isCustom && (
              <div className="mt-2.5 flex items-center gap-2">
                <label htmlFor={customInputId} className="sr-only">
                  {t("donate.customAmountLabel")}
                </label>
                <div className="relative flex-1">
                  <span className="absolute start-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-bold">
                    $
                  </span>
                  <input
                    id={customInputId}
                    type="number"
                    min="1"
                    step="1"
                    placeholder={t("donate.customAmountPlaceholder")}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    autoFocus
                    className="w-full ps-7 pe-3 py-2 rounded-xl bg-slate-950 border border-rose-400/50 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <span className="text-xs text-slate-400 font-mono">USD</span>
              </div>
            )}
          </div>

          {/* Step 2: Payment Platform Selector */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              2. {t("donate.chooseMethod")}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex items-center gap-3.5 relative ${
                      isSelected
                        ? "bg-white/[0.08] text-white border-white/30 shadow-md ring-1 ring-white/30"
                        : "bg-slate-950/60 border-white/5 text-slate-300 hover:bg-slate-850 hover:text-white hover:border-white/15"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${m.accentColor}18`,
                        borderColor: `${m.accentColor}40`,
                        color: m.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">
                          {m.name}
                        </span>
                        {isSelected && (
                          <span className="text-xs text-rose-400 font-bold shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {m.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Donate Action Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:via-pink-700 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-rose-500/20 hover:shadow-rose-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartIcon className="w-4 h-4 fill-white" />
                <span>
                  {t("donate.proceedTo", {
                    method:
                      paymentMethods.find((m) => m.id === selectedMethod)?.name ||
                      "Payment",
                    amount: currentAmount,
                  })}
                </span>
                <ExternalLinkIcon className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                🔒 {t("donate.securityNote")}
              </p>
            </div>
          </div>

          {/* Step 3: Cryptocurrency Wallets Option */}
          {DONATION_CONFIG.crypto.enabled && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("donate.cryptoTitle")}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {t("donate.oneClickCopy")}
                </span>
              </div>

              <div className="space-y-2">
                {DONATION_CONFIG.crypto.wallets.map((w) => {
                  const isCopied = copiedSymbol === w.symbol;
                  return (
                    <div
                      key={w.symbol}
                      className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="px-2 py-0.5 rounded-lg bg-white/10 font-bold font-mono text-cyan-300 shrink-0">
                          {w.symbol}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[10px] text-slate-400 font-mono">
                            {w.network}
                          </div>
                          <div className="font-mono text-[11px] text-slate-200 truncate select-all">
                            {w.address}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyWallet(w.symbol, w.address)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                          isCopied
                            ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                            : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t("donate.copied")}</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            <span>{t("donate.copyAddress")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Why Donate Value Props */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <span className="text-xs font-bold text-white block">
              💡 {t("donate.whyDonate")}
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>{t("donate.whyPoint1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>{t("donate.whyPoint2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>{t("donate.whyPoint3")}</span>
              </li>
            </ul>
          </div>

          {/* Creator Configuration Notice (Collapsible) */}
          <div className="pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowConfigGuide((v) => !v)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between w-full cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <span>⚙️</span>
                <span>{t("donate.creatorNoticeTitle")}</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                {showConfigGuide ? "−" : "+"}
              </span>
            </button>

            {showConfigGuide && (
              <div className="mt-2 p-3.5 rounded-xl bg-slate-950 border border-cyan-400/30 text-xs text-slate-300 space-y-2">
                <p>{t("donate.creatorNoticeBody")}</p>
                <div className="font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-white/10 text-cyan-300 overflow-x-auto">
                  src/config/donationConfig.js
                </div>
                <p className="text-[11px] text-slate-400">
                  {t("donate.creatorNoticeTip")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-7 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>{t("donate.thankYou")}</span>
          <span className="font-semibold text-slate-300">
            {DONATION_CONFIG.recipientName}
          </span>
        </div>
      </div>
    </div>
  );
}
