import React, { useState, useEffect } from "react";
import { useFloorPower } from "./riser/riserContext";

const STEPS = [
  {
    num: "STEP 01",
    title: "Connect Calendar",
    desc: "Google Calendar sync",
  },
  {
    num: "STEP 02",
    title: "Set Preferences",
    desc: "Work type, location, etc.",
  },
  {
    num: "STEP 03",
    title: "Live Test Call",
    desc: "Verify voice & booking",
  },
  {
    num: "STEP 04",
    title: "Pocket Phone",
    desc: "Steelhead online",
    isFinal: true,
  },
];

export default function NextStepSection() {
  const status = useFloorPower();
  const isLit = status === "lit";
  const [litStepIndex, setLitStepIndex] = useState(-1);
  const [isCharged, setIsCharged] = useState(false);

  useEffect(() => {
    if (!isLit) {
      setLitStepIndex(-1);
      setIsCharged(false);
      return;
    }

    // Sequence Choreography:
    // 1. t = 0s: Caution ribbon begins barber-pole scroll
    // 2. 2s delay after caution ribbon before step sequence starts:
    const t0 = setTimeout(() => setLitStepIndex(0), 2000);
    const t1 = setTimeout(() => setLitStepIndex(1), 2330);
    const t2 = setTimeout(() => setLitStepIndex(2), 2660);
    const t3 = setTimeout(() => setLitStepIndex(3), 2990);

    // 3. 1s delay after final step tile before CTA button energizes:
    const tCta = setTimeout(() => setIsCharged(true), 4000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tCta);
    };
  }, [isLit]);

  return (
    <section className="mb-12">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#F76115] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F76115]">
          SECTION 05 // BEGIN WITH STEELHEAD
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
      </div>

      <div className="bg-white border-3 border-[#F76115] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Caution Ribbon (Barber-Pole Animated when Floor is Lit) */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isLit ? "caution-ribbon-active" : ""
          }`}
          style={{
            background:
              "repeating-linear-gradient(45deg, #F76115, #F76115 12px, #101828 12px, #101828 24px)",
          }}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
            In-Person Setup
          </h2>
          <span className="font-mono text-xs text-[#F76115] font-black bg-[#FFF3ED] px-3 py-1 rounded-md border border-[#F76115]/50 uppercase shadow-sm">
            SETUP: 15 MINUTES
          </span>
        </div>

        {/* Verbatim Copy with Paragraph Break */}
        <div className="text-[#252B37] text-base sm:text-lg font-medium leading-relaxed mb-6 space-y-3">
          <p>
            If you’re ready to give Steelhead a run, let Thomas know.
          </p>
          <p>
            We&apos;ll connect your calendar, set your preferences, and test call forwarding. Once it’s set, you put your phone in your pocket and get back to work.
          </p>
        </div>

        {/* 4-Step Visual Checklist (2s delay after ribbon, then 0.33s intervals) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {STEPS.map((step, idx) => {
            const isStepLit = litStepIndex >= idx;
            const isFinal = step.isFinal;

            let containerStyle =
              "bg-[#FAF7F2] border-2 border-[#E6DBC2] shadow-sm";
            let tagStyle = "text-[#717680]";
            let titleStyle = "text-[#334155]";
            let descStyle = "text-[#535862]";

            if (isStepLit) {
              if (isFinal) {
                containerStyle =
                  "bg-emerald-50/80 border-2 border-emerald-500 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500/30 scale-[1.01]";
                tagStyle = "text-emerald-700 font-black";
                titleStyle = "text-[#101828] font-extrabold";
                descStyle = "text-emerald-900 font-bold";
              } else {
                containerStyle =
                  "bg-white border-2 border-[#F76115]/60 shadow-md shadow-[#F76115]/10 ring-1 ring-[#F76115]/20 scale-[1.01]";
                tagStyle = "text-[#F76115] font-black";
                titleStyle = "text-[#101828] font-extrabold";
                descStyle = "text-[#252B37] font-medium";
              }
            }

            return (
              <div
                key={step.num}
                className={`rounded-xl p-3.5 transition-all duration-300 ease-out ${containerStyle}`}
              >
                <div
                  className={`text-[10px] font-mono uppercase mb-1 transition-colors duration-300 flex items-center justify-between ${tagStyle}`}
                >
                  <span>{step.num}</span>
                  {isFinal && isStepLit && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <div
                  className={`text-base transition-colors duration-300 ${titleStyle}`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs mt-1 transition-colors duration-300 lg:whitespace-nowrap ${descStyle}`}
                >
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons for Contacting Thomas (Electric Jolt at ~4.0s) */}
        <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
          <a
            href="mailto:support@steelhead.ai?subject=Steelhead%20Closed%20Beta%20Field%20Setup"
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-base text-center tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2 ${
              isCharged
                ? "bg-[#F76115] hover:bg-[#E8490E] text-white border-[#F76115] shadow-xl shadow-[#F76115]/30 cta-jolt"
                : "bg-white hover:bg-[#FFF3ED] text-[#F76115] border-[#F76115] shadow-sm"
            }`}
          >
            <span>✉</span> Contact Thomas for Setup
          </a>
          <a
            href="tel:5415550123"
            className={`py-3.5 px-6 rounded-xl font-mono text-sm font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2 ${
              isCharged
                ? "bg-[#066AAD] hover:bg-[#004D7D] text-white border-[#066AAD] shadow-md shadow-[#066AAD]/25"
                : "bg-white hover:bg-[#F0F7FD] text-[#066AAD] border-[#066AAD]/70 shadow-sm"
            }`}
          >
            <span>📞</span> Call Direct
          </a>
        </div>
      </div>
    </section>
  );
}
