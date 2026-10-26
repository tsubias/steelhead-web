import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";

/**
 * Format a string of digits into standard US phone format: (xxx) xxx-xxxx
 */
function formatPhoneNumber(value) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Strip non-digit characters for dialing strings
 */
function cleanDigits(value) {
  return (value || "").replace(/\D/g, "");
}

export default function CallForwarding() {
  const [searchParams] = useSearchParams();

  // Mode detection: ?view=app or ?mode=webview
  const isAppView = useMemo(() => {
    const view = searchParams.get("view");
    const mode = searchParams.get("mode");
    return view === "app" || mode === "webview" || searchParams.has("webview");
  }, [searchParams]);

  // Phone number state
  const queryPhone = searchParams.get("phone") || searchParams.get("tel") || "";
  const initialDigits = cleanDigits(queryPhone);
  const [rawPhone, setRawPhone] = useState(initialDigits);
  const [carrier, setCarrier] = useState(() => {
    const qCarrier = (searchParams.get("carrier") || "").toLowerCase();
    if (qCarrier.includes("gsm") || qCarrier.includes("att") || qCarrier.includes("tmobile")) {
      return "gsm";
    }
    return "cdma";
  });

  // Action tab: 'on' (Turn On) | 'off' (Turn Off)
  const [actionType, setActionType] = useState("on");

  const [copiedKey, setCopiedKey] = useState(null);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showUsMobileHelper, setShowUsMobileHelper] = useState(false);
  const [confirmedSetup, setConfirmedSetup] = useState(false);

  // Update page title
  useEffect(() => {
    document.title = "Steelhead AI";
  }, []);

  // Sync if query param changes
  useEffect(() => {
    if (queryPhone) {
      setRawPhone(cleanDigits(queryPhone));
    }
  }, [queryPhone]);

  const formattedPhone = formatPhoneNumber(rawPhone);
  const hasPhone = rawPhone.length >= 10;
  const phonePlaceholder = "[YOUR STEELHEAD NUMBER]";

  // Codes computation
  const codes = useMemo(() => {
    if (carrier === "cdma") {
      return {
        panelTitle: "Call Forwarding (Verizon)",
        networkName: "Verizon Network",
        networkType: "CDMA / WARP",
        carriers: "Verizon, Visible, Xfinity Mobile, US Mobile Warp",
        turnOnCode: hasPhone ? `*71${rawPhone}` : `*71${phonePlaceholder}`,
        turnOnDial: hasPhone ? `tel:*71${rawPhone}` : null,
        turnOffCode: "*73",
        turnOffDial: "tel:*73",
        notes: "Conditional call forwarding (no answer / busy / unreachable).",
      };
    }
    return {
      panelTitle: "Call Forwarding (AT&T / T-Mobile)",
      networkName: "AT&T / T-Mobile Network",
      networkType: "GSM / LIGHTSPEED",
      carriers: "AT&T, T-Mobile, Cricket, Mint, Google Fi, US Mobile Lightspeed",
      turnOnCode: hasPhone ? `**61*${rawPhone}#` : `**61*${phonePlaceholder}#`,
      turnOnDial: hasPhone ? `tel:**61*${rawPhone}%23` : null,
      turnOffCode: "##61#",
      turnOffDial: "tel:%23%2361%23",
      notes: "Forward when unanswered (default ~20 sec ring).",
    };
  }, [carrier, hasPhone, rawPhone]);

  const handleCopy = (text, key) => {
    if (!text || text.includes(phonePlaceholder)) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const handleCompleteSetup = () => {
    setConfirmedSetup(true);

    // 1. React Native WebView bridge
    if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === "function") {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          event: "CALL_FORWARDING_COMPLETED",
          phone: rawPhone,
          carrier,
        })
      );
    }

    // 2. iOS WKWebView messageHandler
    if (window.webkit?.messageHandlers?.steelhead?.postMessage) {
      window.webkit.messageHandlers.steelhead.postMessage({
        event: "CALL_FORWARDING_COMPLETED",
        phone: rawPhone,
        carrier,
      });
    }

    // 3. Android JavascriptInterface
    if (window.SteelheadApp?.onCallForwardingCompleted) {
      window.SteelheadApp.onCallForwardingCompleted();
    }

    // 4. Custom Scheme Fallback
    setTimeout(() => {
      window.location.href = "steelhead://call-forwarding-complete";
    }, 150);
  };

  // =========================================================================
  // VIEW 1: APP / WEBVIEW VIEW (Lean, high-utility, matches Usage tab in-app UI)
  // =========================================================================
  if (isAppView) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] text-[#101828] p-4 sm:p-6 flex flex-col justify-between selection:bg-[#066AAD] selection:text-white">
        <div className="w-full max-w-lg mx-auto">
          {/* Main In-App Card (matches Usage screen card borders and headers) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden">
            {/* Header bar matching Usage 02.PNG */}
            <div className="px-5 py-3.5 bg-[#F0F7FD] border-b border-[#E0EDF6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E0EDF6] text-[#066AAD] flex items-center justify-center font-bold text-sm">
                  📞
                </div>
                <h1 className="text-base font-bold text-[#066AAD] tracking-tight">
                  Forward your calls
                </h1>
              </div>
              {hasPhone && (
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#475569]">
                  {formattedPhone}
                </span>
              )}
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* STEP 1: Carrier Selector */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-bold mb-1.5">
                  1. Select your carrier network
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setCarrier("cdma")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      carrier === "cdma"
                        ? "bg-white text-[#066AAD] shadow-xs border border-[#CBD5E1]"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    Verizon (CDMA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarrier("gsm")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      carrier === "gsm"
                        ? "bg-white text-[#F76115] shadow-xs border border-[#CBD5E1]"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    AT&amp;T / T-Mobile (GSM)
                  </button>
                </div>
                <div className="mt-1.5 text-[11px] text-[#64748B] font-medium leading-relaxed">
                  {codes.carriers}
                </div>
              </div>

              {/* STEP 2: Call Forwarding (Clean hierarchy matching Step 1) */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-bold mb-1.5">
                  2. Call Forwarding
                </label>

                {/* Sub-tabs: Turn On vs Turn Off */}
                <div className="grid grid-cols-2 gap-2 bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0] mb-3">
                  <button
                    type="button"
                    onClick={() => setActionType("on")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      actionType === "on"
                        ? "bg-white text-emerald-700 shadow-xs border border-[#CBD5E1]"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Turn On</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionType("off")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      actionType === "off"
                        ? "bg-white text-[#334155] shadow-xs border border-[#CBD5E1]"
                        : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                    <span>Turn Off</span>
                  </button>
                </div>

                {/* Active Action Container */}
                {actionType === "on" ? (
                  <div className="bg-[#FAF7F2] border-2 border-[#E6DBC2] rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-[#64748B] uppercase tracking-wider">
                        Dial Code
                      </span>
                    </div>

                    <div className="bg-white border border-[#CBD5E1] rounded-lg p-2.5 flex items-center justify-between gap-2 shadow-xs">
                      <span className="font-mono text-base sm:text-lg font-black text-[#0F172A] tracking-wider select-all break-all">
                        {codes.turnOnCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {codes.turnOnDial ? (
                        <a
                          href={codes.turnOnDial}
                          className="py-2.5 px-3 bg-[#066AAD] hover:bg-[#004D7D] text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <span>📞</span> Dial Now
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="py-2.5 px-3 bg-slate-200 text-slate-400 rounded-lg text-xs font-bold text-center cursor-not-allowed"
                        >
                          Enter Number First
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopy(codes.turnOnCode, "on")}
                        disabled={!hasPhone}
                        className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F172A] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{copiedKey === "on" ? "✓" : "📋"}</span>
                        <span>{copiedKey === "on" ? "Copied!" : "Copy Code"}</span>
                      </button>
                    </div>

                    {/* Light emphasis banner for the Call action */}
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-sm shrink-0">
                        📞
                      </span>
                      <span className="leading-snug">
                        Press <strong className="text-emerald-700 font-bold">Call</strong> in your phone dialer to activate forwarding.
                      </span>
                    </div>

                    <p className="text-[11px] text-[#64748B] font-medium text-center pt-0.5">
                      Reminder: test by calling your business number from another phone.
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#FAF7F2] border border-[#E6DBC2] rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-[#64748B] uppercase tracking-wider">
                        Dial Code
                      </span>
                    </div>

                    <div className="bg-white border border-[#CBD5E1] rounded-lg p-2.5 flex items-center justify-between gap-2 shadow-xs">
                      <span className="font-mono text-base font-bold text-[#334155] tracking-wider select-all">
                        {codes.turnOffCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <a
                        href={codes.turnOffDial}
                        className="py-2 px-3 bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#334155] rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>📞</span> Dial Now
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(codes.turnOffCode, "off")}
                        className="py-2 px-3 bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#334155] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>{copiedKey === "off" ? "✓" : "📋"}</span>
                        <span>{copiedKey === "off" ? "Copied!" : "Copy Code"}</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 text-xs font-medium flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                        ℹ
                      </span>
                      <span>
                        Press <strong>Call</strong> to disable forwarding and restore default voicemail.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Troubleshooting Helper */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                  className="w-full text-left text-[11px] font-mono text-[#066AAD] font-bold flex items-center justify-between py-1 cursor-pointer"
                >
                  <span>ℹ Troubleshooting</span>
                  <span>{showTroubleshooting ? "▲" : "▼"}</span>
                </button>
                {showTroubleshooting && (
                  <div className="mt-2 p-3 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-xs text-[#334155] space-y-3">
                    <div>
                      <p className="font-bold text-[#0F172A]">
                        Security warning when trying to dial
                      </p>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                        Apple prevents auto-dialing for security reasons. Fix: tap "Copy Code," open your phone's dialer, paste the code, and hit Dial.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">
                        Call forward succeeds, but voicemail still picks up
                      </p>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                        Your phone's operating system is likely answering the call locally before the carrier network can trigger the forward to Steelhead.
                      </p>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1.5 text-[11px] text-[#475569]">
                        <li>
                          <strong className="text-[#0F172A]">Apple iPhone (Live Voicemail):</strong> Go to your iPhone Settings &gt; Phone &gt; Live Voicemail, and toggle it off.
                        </li>
                        <li>
                          <strong className="text-[#0F172A]">Google Pixel (Call Screen):</strong> Open the Phone app &gt; Settings &gt; Call Screen. Turn off "Automatically screen calls" (or tap into each category and select "Ring phone"). If you see a "Take a message" option in the main Phone settings, turn that off as well.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible US Mobile Helper */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowUsMobileHelper(!showUsMobileHelper)}
                  className="w-full text-left text-[11px] font-mono text-[#066AAD] font-bold flex items-center justify-between py-1 cursor-pointer"
                >
                  <span>ℹ How to identify your US Mobile network</span>
                  <span>{showUsMobileHelper ? "▲" : "▼"}</span>
                </button>
                {showUsMobileHelper && (
                  <div className="mt-2 p-3 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-xs text-[#334155] space-y-1.5">
                    <p className="font-semibold text-[#0F172A]">
                      Check your US Mobile app or SIM:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      <li>
                        <strong>Warp:</strong> Verizon network (Dial <code>*71</code>)
                      </li>
                      <li>
                        <strong>Light Speed:</strong> T-Mobile/GSM network (Dial <code>**61*</code>)
                      </li>
                      <li>
                        SIM color: Black = Verizon, White = T-Mobile.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Modal Confirmation Button (matches Add 30 mins button in Usage tab) */}
            <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={handleCompleteSetup}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-center transition-all cursor-pointer shadow-sm ${
                  confirmedSetup
                    ? "bg-emerald-600 text-white"
                    : "bg-[#066AAD] hover:bg-[#004D7D] text-white active:scale-[0.99]"
                }`}
              >
                {confirmedSetup ? "✓ Setup Confirmed" : "I've Set Up Call Forwarding"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: BROWSER VIEW (General internet visitors, desktop and mobile)
  // =========================================================================
  return (
    <div className="w-full min-h-screen bg-[#F3EEE1] text-[#101828] flex flex-col items-center selection:bg-[#F76115] selection:text-white relative">
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/steelhead-logo.svg"
            alt="Steelhead logo"
            className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-lg text-[#101828] tracking-tight">
            Steelhead AI
          </span>
        </Link>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white border border-[#D6C39B] text-[#535862]">
          USER GUIDE // CALL FORWARDING
        </span>
      </header>

      {/* Main Content Card Container */}
      <main className="w-full max-w-3xl mx-auto px-4 pb-12 flex-1">
        <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-6 sm:p-9 shadow-lg">
          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#101828] tracking-tight leading-tight">
            Send Missed Calls to Steelhead
          </h1>

          {/* Value Prop & Mechanism Prose (Refined per feedback) */}
          <div className="mt-4 space-y-3.5 text-sm sm:text-base text-[#414651] leading-relaxed">
            <p className="font-medium text-[#101828]">
              With Steelhead, you keep your existing business phone number.
            </p>
            <p>
              When your customers call, your phone rings first. Steelhead only picks up if you can’t answer.
            </p>
            <p>
              To make this work, you’ll enable call forwarding on your phone to the number we provide. Once set up, Steelhead will handle your missed calls.
            </p>
          </div>

          {/* 3 Steps Overview */}
          <div className="mt-6 p-4 sm:p-5 bg-[#FAF7F2] border-2 border-[#E6DBC2] rounded-xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#066AAD] mb-2.5">
              Here’s how
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5 font-bold text-[#101828]">
                <span className="w-6 h-6 rounded-full bg-[#066AAD] text-white flex items-center justify-center font-mono text-xs shrink-0">
                  1
                </span>
                <span>Pick your carrier.</span>
              </li>
              <li className="flex items-center gap-2.5 font-bold text-[#101828]">
                <span className="w-6 h-6 rounded-full bg-[#066AAD] text-white flex items-center justify-center font-mono text-xs shrink-0">
                  2
                </span>
                <span>Dial the code.</span>
              </li>
              <li className="flex items-center gap-2.5 font-bold text-[#101828]">
                <span className="w-6 h-6 rounded-full bg-[#066AAD] text-white flex items-center justify-center font-mono text-xs shrink-0">
                  3
                </span>
                <span>Test your line.</span>
              </li>
            </ol>
            <div className="mt-3 pt-3 border-t border-[#E6DBC2] text-xs text-[#535862]">
              Set it once and you won’t have to change it again. Turning it off is just as easy.
            </div>
          </div>

          {/* Phone Number Input Section - Parentheses removed as requested */}
          <div className="mt-8 pt-6 border-t border-[#E6DBC2]">
            <label
              htmlFor="steelhead-phone"
              className="block text-sm font-bold text-[#101828] mb-1"
            >
              Enter your Steelhead number:
            </label>
            <p className="text-xs text-[#535862] mb-3">
              This is the one we give you, not your business phone number.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              <div className="relative flex-1">
                <input
                  id="steelhead-phone"
                  type="tel"
                  placeholder="(xxx) xxx-xxxx"
                  value={formattedPhone}
                  onChange={(e) => setRawPhone(cleanDigits(e.target.value))}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#D6C39B] focus:border-[#066AAD] focus:bg-white rounded-xl font-mono text-base sm:text-lg font-bold text-[#101828] outline-none transition-colors"
                />
                {rawPhone && (
                  <button
                    type="button"
                    onClick={() => setRawPhone("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              {hasPhone ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold shrink-0">
                  <span>✓</span> Number ready
                </div>
              ) : (
                <div className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-2 border border-amber-200 rounded-xl">
                  10 digits required
                </div>
              )}
            </div>
          </div>

          {/* Carrier Selector */}
          <div className="mt-8 pt-6 border-t border-[#E6DBC2]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#101828]">
                Select Carrier Network
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Verizon Card */}
              <button
                type="button"
                onClick={() => setCarrier("cdma")}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  carrier === "cdma"
                    ? "bg-[#066AAD]/5 border-[#066AAD] shadow-sm ring-1 ring-[#066AAD]"
                    : "bg-[#FAF7F2] border-[#E6DBC2] hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[#066AAD]">
                      VERIZON (CDMA)
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        carrier === "cdma" ? "bg-[#066AAD]" : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold text-[#101828]">
                    Verizon Network
                  </div>
                  <div className="text-xs text-[#535862] mt-1">
                    Verizon • Visible • Xfinity Mobile • US Mobile Warp
                  </div>
                </div>
              </button>

              {/* AT&T / T-Mobile Card */}
              <button
                type="button"
                onClick={() => setCarrier("gsm")}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  carrier === "gsm"
                    ? "bg-[#F76115]/5 border-[#F76115] shadow-sm ring-1 ring-[#F76115]"
                    : "bg-[#FAF7F2] border-[#E6DBC2] hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[#F76115]">
                      AT&amp;T / T-MOBILE (GSM)
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        carrier === "gsm" ? "bg-[#F76115]" : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold text-[#101828]">
                    AT&amp;T &amp; T-Mobile Network
                  </div>
                  <div className="text-xs text-[#535862] mt-1">
                    AT&amp;T • T-Mobile • Cricket • Mint • Google Fi • US Mobile Light Speed
                  </div>
                </div>
              </button>
            </div>

            {/* Carrier Codes Display Box with Tabs for Turn On / Turn Off */}
            <div className="bg-[#10141D] text-white rounded-xl p-5 border-2 border-[#2D3748] shadow-inner space-y-4">
              {/* Header inside code box - simplified per feedback */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      carrier === "cdma" ? "bg-[#38BDF8]" : "bg-[#F76115]"
                    }`}
                  />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-300">
                    {codes.panelTitle}
                  </span>
                </div>
              </div>

              {/* Action Tabs inside terminal card */}
              <div className="grid grid-cols-2 gap-2 bg-black/50 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActionType("on")}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    actionType === "on"
                      ? "bg-zinc-800 text-emerald-400 shadow-sm border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>Turn On</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("off")}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    actionType === "off"
                      ? "bg-zinc-800 text-zinc-200 shadow-sm border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  <span>Turn Off</span>
                </button>
              </div>

              {/* ACTIVE CODE CONTENT */}
              {actionType === "on" ? (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Dial Code:
                    </span>
                  </div>

                  <div className="bg-black border border-zinc-700/80 rounded-lg p-3 font-mono text-base sm:text-xl font-black text-emerald-400 tracking-wider flex items-center justify-between gap-2 select-all">
                    <span>{codes.turnOnCode}</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {codes.turnOnDial ? (
                      <a
                        href={codes.turnOnDial}
                        className="flex-1 py-2.5 px-4 bg-[#066AAD] hover:bg-[#004D7D] text-white rounded-lg text-xs font-bold font-mono text-center flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                      >
                        <span>📞</span> Dial Now
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-1 py-2.5 px-4 bg-zinc-800 text-zinc-500 rounded-lg text-xs font-bold font-mono text-center cursor-not-allowed"
                      >
                        Enter 10-digit number above
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopy(codes.turnOnCode, "browser-on")}
                      disabled={!hasPhone}
                      className="py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{copiedKey === "browser-on" ? "✓" : "📋"}</span>
                      <span>{copiedKey === "browser-on" ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>

                  {/* Light emphasis banner */}
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-sm shrink-0">
                      📞
                    </span>
                    <span className="leading-snug">
                      Press <strong className="text-emerald-200 font-bold">Call</strong> in your phone dialer to activate forwarding.
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-mono text-center pt-0.5">
                    Reminder: test by calling your business number from another phone.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Dial Code:
                    </span>
                  </div>

                  <div className="bg-black border border-zinc-700/80 rounded-lg p-3 font-mono text-base sm:text-xl font-bold text-zinc-200 tracking-wider flex items-center justify-between gap-2 select-all">
                    <span>{codes.turnOffCode}</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={codes.turnOffDial}
                      className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-bold font-mono text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>📞</span> Dial Now
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(codes.turnOffCode, "browser-off")}
                      className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>{copiedKey === "browser-off" ? "✓" : "📋"}</span>
                      <span>{copiedKey === "browser-off" ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-700 text-white flex items-center justify-center shrink-0 text-xs">
                      ℹ
                    </span>
                    <span>
                      Press <strong>Call</strong> to disable forwarding and restore default carrier voicemail.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Troubleshooting Helper */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="w-full py-3 px-4 bg-[#FAF7F2] hover:bg-[#E6DBC2]/50 border-2 border-[#D6C39B] rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer shadow-xs"
              >
                <span className="text-xs sm:text-sm font-mono font-bold text-[#101828] flex items-center gap-2">
                  <span className="text-[#F76115] text-base">ℹ</span>
                  Troubleshooting
                </span>
                <span className="text-[#066AAD] font-mono text-xs font-bold">
                  {showTroubleshooting ? "▲ HIDE" : "▼ SHOW"}
                </span>
              </button>

              {showTroubleshooting && (
                <div className="mt-2.5 p-4 sm:p-5 bg-white border-2 border-[#D6C39B] rounded-xl text-xs sm:text-sm text-[#414651] space-y-4 shadow-sm">
                  <div>
                    <h3 className="font-bold text-[#101828] text-sm sm:text-base">
                      Security warning when trying to dial
                    </h3>
                    <p className="mt-1 leading-relaxed text-[#414651]">
                      Apple prevents auto-dialing for security reasons. Fix: tap "Copy Code," open your phone's dialer, paste the code, and hit Dial.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DBC2]">
                    <h3 className="font-bold text-[#101828] text-sm sm:text-base">
                      Call forward succeeds, but voicemail still picks up
                    </h3>
                    <p className="mt-1 leading-relaxed text-[#414651]">
                      Your phone's operating system is likely answering the call locally before the carrier network can trigger the forward to Steelhead.
                    </p>
                    <ul className="mt-2.5 space-y-2 pl-4 list-disc text-[#414651] font-medium text-xs sm:text-sm">
                      <li>
                        <strong className="text-[#101828]">Apple iPhone (Live Voicemail):</strong> Go to your iPhone Settings &gt; Phone &gt; Live Voicemail, and toggle it off.
                      </li>
                      <li>
                        <strong className="text-[#101828]">Google Pixel (Call Screen):</strong> Open the Phone app &gt; Settings &gt; Call Screen. Turn off "Automatically screen calls" (or tap into each category and select "Ring phone"). If you see a "Take a message" option in the main Phone settings, turn that off as well.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible US Mobile Helper */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowUsMobileHelper(!showUsMobileHelper)}
                className="w-full py-3 px-4 bg-[#FAF7F2] hover:bg-[#E6DBC2]/50 border-2 border-[#D6C39B] rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer shadow-xs"
              >
                <span className="text-xs sm:text-sm font-mono font-bold text-[#101828] flex items-center gap-2">
                  <span className="text-[#F76115] text-base">ℹ</span>
                  How to identify your US Mobile network
                </span>
                <span className="text-[#066AAD] font-mono text-xs font-bold">
                  {showUsMobileHelper ? "▲ HIDE" : "▼ SHOW"}
                </span>
              </button>

              {showUsMobileHelper && (
                <div className="mt-2.5 p-4 sm:p-5 bg-white border-2 border-[#D6C39B] rounded-xl text-xs sm:text-sm text-[#414651] space-y-2.5 shadow-sm">
                  <p className="font-bold text-[#101828]">
                    US Mobile operates on multiple underlying networks. Here’s how to tell which one you’re on:
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-[#414651] font-medium text-xs sm:text-sm">
                    <li>
                      <strong className="text-[#101828]">In the US Mobile app:</strong> Open your line and look for{" "}
                      <strong className="text-[#066AAD]">Warp (Verizon)</strong> or{" "}
                      <strong className="text-[#F76115]">Light Speed (GSM / T-Mobile)</strong>.
                    </li>
                    <li>
                      <strong className="text-[#101828]">In your phone’s settings:</strong> Check for your Carrier information under Cellular / About.
                    </li>
                    <li>
                      <strong className="text-[#101828]">SIM card color:</strong> Black = Verizon, White = T-Mobile, Red = AT&amp;T.
                    </li>
                    <li>
                      <strong className="text-[#101828]">Worst case:</strong> Try one and test it.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Standard Footer */}
      <footer className="w-full max-w-3xl mx-auto px-4 py-6 border-t border-[#E6DBC2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#535862] font-mono">
        <div>
          Questions:{" "}
          <a
            href="mailto:support@steelhead.ai?subject=Call%20Forwarding%20Question"
            className="text-[#066AAD] hover:underline font-bold"
          >
            support@steelhead.ai
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Steelhead AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
