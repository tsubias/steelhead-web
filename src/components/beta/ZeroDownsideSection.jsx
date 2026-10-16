import React from "react";
import { useFloorPower } from "./riser/riserContext";

export default function ZeroDownsideSection() {
  const status = useFloorPower();
  const isLit = status === "lit";

  const points = [
    {
      title: "Keep your phone number",
      desc: "The number on your truck, signs, and website is untouched.",
    },
    {
      title: "Your phone rings first",
      desc: "Steelhead only steps in when you let it ring out.",
    },
    {
      title: "No captive numbers",
      desc: "No lock-in. We use your carrier's standard call forwarding. Turn it off in seconds anytime.",
    },
    {
      title: "No software bloat",
      desc: "Built strictly for solos. No big shop bloat, no payment processing cuts, and zero hidden fees.",
    },
  ];

  return (
    <section className="mb-12">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#066AAD] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#066AAD]">
          SECTION 02 // ZERO DOWNSIDE
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
          Steelhead only adds to your business. There’s nothing to lose.
        </h2>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((pt, idx) => {
          const delayMs = idx * 330;
          return (
            <div
              key={idx}
              className={`bg-white border-2 rounded-2xl p-5 hover:border-[#066AAD] transition-all duration-500 shadow-md flex flex-col justify-between ${
                isLit ? "border-[#D6C39B]" : "border-[#E6DBC2]"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#101828]">
                    {pt.title}
                  </h3>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-400 ease-out ${
                      isLit
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 shadow-xs scale-100 ring-2 ring-emerald-500/20"
                        : "bg-[#FAF7F2] border-emerald-600/55 scale-95"
                    }`}
                    style={{
                      transitionDelay: isLit ? `${delayMs}ms` : "0ms",
                    }}
                  >
                    <svg
                      className={`w-3.5 h-3.5 fill-current transition-all duration-300 ease-out transform ${
                        isLit ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                      style={{
                        transitionDelay: isLit ? `${delayMs + 50}ms` : "0ms",
                      }}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-[#414651] font-medium leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
