import React, { useState, useEffect } from "react";
import { useFloorPower } from "./riser/riserContext";

export default function JobTicketHeader() {
  const floorPower = useFloorPower();
  const isLit = floorPower === "lit";
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (isLit) {
      // Stage 1: Active engages on breaker throw
      const t1 = setTimeout(() => setActiveStage(1), 100);
      // Stage 2: Card 1 powers up (700ms delay after Active engages)
      const t2 = setTimeout(() => setActiveStage(2), 800);
      // Stage 3: Card 2 powers up
      const t3 = setTimeout(() => setActiveStage(3), 1050);
      // Stage 4: Card 3 powers up ($0 pop)
      const t4 = setTimeout(() => setActiveStage(4), 1300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setActiveStage(0);
    }
  }, [isLit]);

  return (
    <header className="relative w-full mb-8 pt-2 sm:pt-4">
      {/* Heavy-Duty Machined Aluminum Clipboard Clip */}
      <div className="flex justify-center -mb-3 relative z-20 px-4">
        <div className="w-full max-w-[280px] sm:max-w-sm bg-gradient-to-b from-[#4A5568] via-[#2D3748] to-[#1A202C] border-2 border-[#718096] rounded-t-xl px-4 sm:px-6 py-2.5 shadow-xl flex items-center justify-between gap-2 sm:gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A202C] border border-[#CBD5E0] shadow-inner shrink-0" />
          <div className="h-1 sm:h-1.5 flex-1 bg-gradient-to-r from-[#A0AEC0] via-[#E2E8F0] to-[#A0AEC0] rounded-full border border-[#718096]" />
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#E2E8F0] uppercase font-bold select-none shrink-0">
            JOB TICKET // NO. 2026-Q4
          </span>
          <div className="h-1 sm:h-1.5 flex-1 bg-gradient-to-r from-[#A0AEC0] via-[#E2E8F0] to-[#A0AEC0] rounded-full border border-[#718096]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A202C] border border-[#CBD5E0] shadow-inner shrink-0" />
        </div>
      </div>

      {/* Main Ticket Work Order Sheet (Crisp White Card with Brand Blue Framing) */}
      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Prominent Brand Blue Top Anchor Bar (matching app header) */}
        <div className="-mx-5 -mt-5 sm:-mx-7 sm:-mt-7 mb-5 bg-[#066AAD] px-5 sm:px-7 py-3 text-white flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#004D7D]">
          <div className="flex items-center gap-2.5">
            <img
              src="/steelhead-logo.svg"
              alt="Steelhead"
              className="w-6 h-6 object-contain brightness-0 invert"
            />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
              INFORMATION SHEET
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-medium text-blue-100">
            <span>SITE: OREGON</span>
            <span>•</span>
            {activeStage >= 1 ? (
              <span className="bg-emerald-950/60 border border-emerald-400/70 px-2.5 py-0.5 rounded text-white font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(52,211,153,0.5)] transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block shadow-[0_0_6px_#34d399]" />
                ACTIVE
              </span>
            ) : (
              <span className="bg-black/30 border border-white/15 px-2.5 py-0.5 rounded text-blue-200/80 font-bold flex items-center gap-1.5 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block" />
                STANDBY
              </span>
            )}
          </div>
        </div>

        {/* Industrial Ticket Header Badge */}
        <div className="flex items-center pb-4 border-b border-[#E6DBC2]">
          <div className="inline-flex items-center gap-2 bg-[#FFF3ED] border-2 border-[#F76115] text-[#F76115] px-3 py-1.5 rounded-md text-xs sm:text-sm font-mono font-bold tracking-wider uppercase leading-snug shadow-sm">
            <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
              activeStage >= 1 ? "bg-[#F76115] shadow-[0_0_8px_#F76115]" : "bg-slate-400/50"
            }`} />
            <span>FIELD TEST // CLOSED BETA</span>
          </div>
        </div>

        {/* Project Title & Program Access Badge */}
        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#101828] tracking-tight leading-snug whitespace-nowrap">
              Steelhead AI
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#535862] mt-1 tracking-tight">
              Never miss a job lead again.
            </p>
          </div>

          <a
            href="mailto:support@steelhead.ai?subject=Steelhead%20Closed%20Beta%20Invite"
            className="inline-flex items-center self-start md:self-auto bg-[#FAF7F2] hover:bg-[#FFF3ED] border-2 border-[#E6DBC2] hover:border-[#F76115] rounded-xl px-4 py-2.5 shadow-sm transition-all group cursor-pointer"
            title="Email Thomas regarding beta access"
          >
            <div className="text-left md:text-right font-mono">
              <div className="text-[10px] text-[#717680] uppercase tracking-wider font-semibold">
                PROGRAM ACCESS
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#F76115] flex items-center gap-1.5 md:justify-end">
                <span>✉</span>
                <span>INVITE ONLY</span>
              </div>
            </div>
          </a>
        </div>

        {/* 3-Column Ticket Specification Grid with Staggered Power-Up */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-[#E6DBC2]">
          {/* Card 1: Category */}
          <div className={`border rounded-xl p-3.5 shadow-sm transition-all duration-300 ${
            activeStage >= 2
              ? "bg-white border-[#066AAD]/60 shadow-[0_2px_10px_rgba(6,106,173,0.12)] -translate-y-0.5"
              : "bg-[#FAF7F2] border-[#E6DBC2]"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <div className={`text-[10px] font-mono uppercase tracking-wider font-bold transition-colors ${
                activeStage >= 2 ? "text-[#066AAD]" : "text-[#717680]"
              }`}>
                CATEGORY
              </div>
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeStage >= 2 ? "bg-[#066AAD] shadow-[0_0_5px_#066AAD]" : "bg-slate-300"
              }`} />
            </div>
            <div className="text-sm sm:text-base font-bold text-[#101828]">
              AI Voice Assistant
            </div>
          </div>

          {/* Card 2: Made For */}
          <div className={`border rounded-xl p-3.5 shadow-sm transition-all duration-300 ${
            activeStage >= 3
              ? "bg-white border-[#066AAD]/60 shadow-[0_2px_10px_rgba(6,106,173,0.12)] -translate-y-0.5"
              : "bg-[#FAF7F2] border-[#E6DBC2]"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <div className={`text-[10px] font-mono uppercase tracking-wider font-bold transition-colors ${
                activeStage >= 3 ? "text-[#066AAD]" : "text-[#717680]"
              }`}>
                MADE FOR
              </div>
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeStage >= 3 ? "bg-[#066AAD] shadow-[0_0_5px_#066AAD]" : "bg-slate-300"
              }`} />
            </div>
            <div className="text-sm sm:text-base font-bold text-[#101828]">
              Solo Contractors
            </div>
          </div>

          {/* Card 3: Cost To Tester */}
          <div className={`border rounded-xl p-3.5 shadow-sm transition-all duration-300 ${
            activeStage >= 4
              ? "bg-white border-emerald-500/70 shadow-[0_2px_12px_rgba(16,185,129,0.2)] -translate-y-0.5"
              : "bg-[#FAF7F2] border-[#E6DBC2]"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <div className={`text-[10px] font-mono uppercase tracking-wider font-bold transition-colors ${
                activeStage >= 4 ? "text-emerald-700" : "text-[#717680]"
              }`}>
                COST TO TESTER
              </div>
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeStage >= 4 ? "bg-emerald-500 shadow-[0_0_6px_#10B981]" : "bg-slate-300"
              }`} />
            </div>
            <div className="text-sm sm:text-base font-bold text-[#101828] flex items-baseline">
              <span className={`text-lg font-black transition-all duration-300 ${
                activeStage >= 4
                  ? "text-emerald-600 scale-110 drop-shadow-xs"
                  : "text-emerald-800 scale-100"
              }`}>
                $0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
