import { useState, useEffect, useId } from "react";
import {
  HeartIcon,
  ExternalLinkIcon,
  CloseIcon,
  CheckIcon,
  SparklesAIIcon,
} from "./Icons";
import { DONATION_CONFIG, buildPaymentUrl } from "../config/donationConfig";
import { useLanguage } from "../i18n/LanguageContext";

function PayPalBrandIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.642h6.84c2.87 0 4.86.688 5.753 2.09.826 1.298.972 2.944.452 5.034-.787 3.164-2.893 4.918-6.258 5.214H9.49a.77.77 0 0 0-.758.645l-.95 5.276a.64.64 0 0 1-.706.5z"
        fill="#003087"
      />
      <path
        d="M19.06 7.82c-.038.19-.08.384-.128.582-.94 3.848-3.516 5.176-6.985 5.176H9.99a.855.855 0 0 0-.844.72l-1.12 7.1a.538.538 0 0 0 .532.622h3.732a.75.75 0 0 0 .74-.63l.03-.162.587-3.72.038-.205a.75.75 0 0 1 .74-.63h.466c3.018 0 5.38-1.226 6.07-4.773.288-1.482.14-2.718-.626-3.59a2.99 2.99 0 0 0-1.275-.49z"
        fill="#0070E0"
      />
      <path
        d="M18.18 7.45a6.65 6.65 0 0 0-.822-.182 10.42 10.42 0 0 0-1.656-.12H10.69a.748.748 0 0 0-.738.63L8.88 14.57l-.031.198a.855.855 0 0 1 .844-.72h1.957c3.47 0 6.046-1.328 6.985-5.176.048-.198.09-.392.128-.582a4.34 4.34 0 0 0-.583-.84z"
        fill="#001C64"
      />
    </svg>
  );
}

function KofiBrandIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.2 6.5H18V5.2A1.2 1.2 0 0 0 16.8 4H3.2A1.2 1.2 0 0 0 2 5.2v8.3C2 17.64 5.36 21 9.5 21h1c3.52 0 6.47-2.43 7.28-5.7h2.42c2.1 0 3.8-1.7 3.8-3.8v-1.2c0-2.1-1.7-3.8-3.8-3.8zm1.4 5c0 .77-.63 1.4-1.4 1.4H18V8.9h2.2c.77 0 1.4.63 1.4 1.4v1.2z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 15.8s-3.6-2.2-3.6-4.5c0-1.15.9-2.05 2.02-2.05.68 0 1.28.34 1.58.88.3-.54.9-.88 1.58-.88 1.12 0 2.02.9 2.02 2.05 0 2.3-3.6 4.5-3.6 4.5z"
        fill="#FF5E5B"
      />
    </svg>
  );
}

const AMOUNT_TIERS = {
  3: { emoji: "☕", tag: "Coffee Boost" },
  5: { emoji: "⚡", tag: "Lab Spark" },
  10: { emoji: "🚀", tag: "Popular", featured: true },
  25: { emoji: "🌟", tag: "Patron" },
  50: { emoji: "🏆", tag: "Champion" },
};

export default function DonationModal({ isOpen, onClose, theme }) {
  const { t, isRTL } = useLanguage();
  const customInputId = useId();
  const isLight = theme === "light";

  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("paypal");

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

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal.me",
      handle: `@${DONATION_CONFIG.paypal.username}`,
      tagline: t("donate.methodPaypalDesc"),
      badge: "Instant Transfer",
      icon: PayPalBrandIcon,
      accentColor: "#0070E0",
      glowColor: "#38BDF8",
      buttonGradient:
        "from-[#0070E0] via-[#005ea6] to-[#0284c7] shadow-sky-500/25 hover:shadow-sky-500/40",
      url: buildPaymentUrl("paypal", currentAmount),
    },
    {
      id: "kofi",
      name: "Ko-fi",
      handle: `@${DONATION_CONFIG.kofi.username}`,
      tagline: t("donate.methodKofiDesc"),
      badge: "0% Platform Fee",
      icon: KofiBrandIcon,
      accentColor: "#FF5E5B",
      glowColor: "#F43F5E",
      buttonGradient:
        "from-rose-500 via-pink-600 to-purple-600 shadow-rose-500/25 hover:shadow-rose-500/40",
      url: buildPaymentUrl("kofi", currentAmount),
    },
  ];

  const activePlatform =
    paymentMethods.find((m) => m.id === selectedMethod) || paymentMethods[0];

  const handleProceed = (methodId = selectedMethod) => {
    const url = buildPaymentUrl(methodId, currentAmount);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-xl border rounded-[2rem] shadow-2xl overflow-hidden my-6 fade-up text-start ${
          isLight
            ? "bg-white border-slate-200/90 shadow-slate-900/25"
            : "bg-[#090d18] border-white/15 shadow-black/80"
        }`}
      >
        {/* Custom Top Decorative Banner & Ambient Glow */}
        <div
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[28rem] h-56 rounded-full blur-3xl opacity-30 transition-colors duration-500"
          style={{ backgroundColor: activePlatform.glowColor }}
        />

        {/* Custom Hero Header */}
        <div
          className={`relative px-6 pt-6 pb-5 border-b ${
            isLight
              ? "border-slate-200/80 bg-gradient-to-br from-rose-50/70 via-sky-50/40 to-white"
              : "border-white/10 bg-gradient-to-br from-rose-500/[0.08] via-sky-500/[0.05] to-transparent"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Custom Animated Heart Emblem */}
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/30 keep-white">
                <HeartIcon className="w-6 h-6 fill-white animate-pulse" />
                <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow">
                  ✦
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {t("donate.modalTitle")}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isLight
                        ? "bg-rose-100/80 border-rose-300 text-rose-700"
                        : "bg-rose-500/15 border-rose-400/30 text-rose-300"
                    }`}
                  >
                    <SparklesAIIcon className="w-3 h-3" />
                    <span>{t("donate.openSourceBadge")}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
                  {t("donate.modalSubtitle")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isLight
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-slate-900"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto custom-scroll">
          {/* Step 1: Custom Interactive Contribution Tiers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. {t("donate.selectAmount")}
              </span>
              <div
                className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold border ${
                  isLight
                    ? "bg-slate-900 text-white border-slate-800 keep-white"
                    : "bg-white/10 text-white border-white/15"
                }`}
              >
                ${currentAmount} USD
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {DONATION_CONFIG.presetAmounts.map((amt) => {
                const isSelected = !isCustom && selectedAmount === amt;
                const tier = AMOUNT_TIERS[amt] || { emoji: "💖" };
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`relative py-2.5 px-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? "bg-gradient-to-b from-rose-500 to-pink-600 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-[1.03] keep-white"
                        : isLight
                        ? "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300"
                        : "bg-slate-900/80 border-white/10 text-slate-200 hover:bg-slate-800 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm leading-none">{tier.emoji}</span>
                    <span className="text-xs sm:text-sm font-black tracking-tight">
                      ${amt}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-2.5 px-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  isCustom
                    ? "bg-gradient-to-b from-rose-500 to-pink-600 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-[1.03] keep-white"
                    : isLight
                    ? "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300"
                    : "bg-slate-900/80 border-white/10 text-slate-200 hover:bg-slate-800 hover:border-white/20"
                }`}
              >
                <span className="text-sm leading-none">✨</span>
                <span className="text-xs font-extrabold">
                  {t("donate.custom")}
                </span>
              </button>
            </div>

            {isCustom && (
              <div className="pt-1 flex items-center gap-2">
                <label htmlFor={customInputId} className="sr-only">
                  {t("donate.customAmountLabel")}
                </label>
                <div className="relative flex-1">
                  <span className="absolute start-3.5 top-1/2 -translate-y-1/2 text-sm text-rose-400 font-black">
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
                    className={`w-full ps-8 pe-14 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                      isLight
                        ? "bg-slate-50 border-rose-300 text-slate-900"
                        : "bg-slate-950 border-rose-400/50 text-white"
                    }`}
                  />
                  <span className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono font-bold">
                    USD
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Bespoke Dual Platform Selector (PayPal.me & Ko-fi Only) */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              2. {t("donate.chooseMethod")}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`group p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                      isSelected
                        ? isLight
                          ? "bg-slate-50 border-slate-900 shadow-lg ring-2 ring-slate-900/10"
                          : "bg-slate-900/95 border-white/40 shadow-xl ring-1 ring-white/30"
                        : isLight
                        ? "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
                    }`}
                  >
                    {/* Subtle corner glow when active */}
                    {isSelected && (
                      <div
                        className="pointer-events-none absolute -top-10 -end-10 w-28 h-28 rounded-full blur-2xl opacity-25"
                        style={{ backgroundColor: m.glowColor }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: `${m.accentColor}15`,
                            borderColor: `${m.accentColor}40`,
                            color: m.accentColor,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-white">
                            {m.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {m.handle}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all shrink-0 ${
                          isSelected
                            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 keep-white"
                            : isLight
                            ? "border border-slate-300 text-transparent"
                            : "border border-white/20 text-transparent"
                        }`}
                      >
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1.5 w-full">
                      <p className="text-xs text-slate-300 leading-snug">
                        {m.tagline}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${m.accentColor}18`,
                            color: m.accentColor,
                          }}
                        >
                          {m.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Primary Proceed CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleProceed(selectedMethod)}
                className={`w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r ${activePlatform.buttonGradient} text-white font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:brightness-110 keep-white`}
              >
                <HeartIcon className="w-4 h-4 fill-white" />
                <span>
                  {t("donate.proceedTo", {
                    method: activePlatform.name,
                    amount: currentAmount,
                  })}
                </span>
                <ExternalLinkIcon
                  className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                🔒 {t("donate.securityNote")}
              </p>
            </div>
          </div>

          {/* Why Your Support Matters Card */}
          <div
            className={`p-4 rounded-2xl border space-y-2.5 ${
              isLight
                ? "bg-slate-50 border-slate-200/90"
                : "bg-slate-950/70 border-white/10"
            }`}
          >
            <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>💡</span>
              <span>{t("donate.whyDonate")}</span>
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t("donate.whyPoint1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>{t("donate.whyPoint2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span>{t("donate.whyPoint3")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
            isLight
              ? "bg-slate-50 border-slate-200 text-slate-500"
              : "bg-slate-950/90 border-white/10 text-slate-400"
          }`}
        >
          <span>{t("donate.thankYou")}</span>
          <span className="font-bold text-white">
            {DONATION_CONFIG.recipientName}
          </span>
        </div>
      </div>
    </div>
  );
}
