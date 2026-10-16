import React from "react";
import { useFloorPower } from "./riser/riserContext";

/**
 * Floor 07: Job Spec Hazard Warning Plate
 * Represents the customer missed call problem.
 * Starts dormant (dead), actively faults (sparks/jitters) when Runner arrives,
 * and clears to lit/green when Runner completes repair.
 */
export function JobSpecWarning() {
  const status = useFloorPower(); // 'dead' | 'fault' | 'lit'

  return (
    <div className="w-full">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#066AAD] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#066AAD]">
          SECTION 01 // PROBLEM
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
        <span className="text-[10px] font-mono text-[#717680] uppercase">
          [JOB LEADS]
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-4">
        Missed Calls
      </h2>

      {/* Intro Spec Block */}
      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-5 sm:p-6 mb-6 text-[#101828] text-base sm:text-lg leading-relaxed shadow-md space-y-3">
        <p className="font-medium text-[#252B37]">
          When your phone rings, it might be your next job. But if your hands are full—under a sink, on a ladder, installing a window, etc.—you can’t answer.
        </p>
        <p className="font-medium text-[#252B37]">
          You are your business, and when you can’t answer, <strong className="font-extrabold text-[#F76115]">you risk losing work</strong>.
        </p>
      </div>

      {/* ANSI Standard Machine Caution Plate */}
      <div className={`hazard-plate-box bg-[#1A202C] border-4 rounded-2xl p-4 sm:p-6 relative shadow-2xl overflow-hidden transition-all duration-300 ${
        status === "fault"
          ? "border-[#EF4444]"
          : status === "lit"
          ? "border-[#10B981]"
          : "border-[#F76115]"
      }`}>
        {/* Corner Rivet Accents */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#4A5568] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#4A5568]" />
        </div>
        <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#4A5568] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#4A5568]" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#4A5568] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#4A5568]" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-[#E2E8F0] border-2 border-[#4A5568] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#4A5568]" />
        </div>

        {/* ANSI Header Stripe */}
        <div className={`text-white px-4 py-2 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 shadow-md transition-colors ${
          status === "fault" ? "bg-[#EF4444]" : status === "lit" ? "bg-[#066AAD]" : "bg-[#F76115]"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="bg-black text-white w-6 h-6 rounded flex items-center justify-center font-black text-sm">
              ▲
            </div>
            <span className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase">
              WARNING // MISSED CALL HAZARD
            </span>
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 px-2.5 py-1 rounded text-white font-bold self-start sm:self-auto flex items-center gap-1.5">
            {status === "fault" && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping" />
                <span>⚡ FAULT DETECTED</span>
              </>
            )}
            {status === "lit" && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>✓ FAULT CLEARED</span>
              </>
            )}
            {status === "dead" && <span>ANSI Z535 SPEC</span>}
          </span>
        </div>

        {/* 3 Metric Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
          {/* Metric 1 */}
          <div className="bg-[#10141D] border-2 border-zinc-700 rounded-xl p-4 flex flex-col shadow-inner">
            <div className="flex items-center justify-between mb-1 pb-1.5 border-b border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-[#F76115] uppercase tracking-wider">
                STAT 01 // MISS RATE
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">33%</span>
            </div>
            <div className="h-14 sm:h-16 flex items-center">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                1 <span className="text-xl text-[#F76115] font-normal">in</span> 3
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-200 leading-snug pt-1">
              Contractor calls go unanswered.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#10141D] border-2 border-zinc-700 rounded-xl p-4 flex flex-col shadow-inner">
            <div className="flex items-center justify-between mb-1 pb-1.5 border-b border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-[#F76115] uppercase tracking-wider">
                STAT 02 // SELECTION
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">RANK #1</span>
            </div>
            <div className="h-14 sm:h-16 flex items-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38BDF8] font-mono tracking-tight">
                FIRST <span className="text-base sm:text-lg lg:text-xl text-white font-normal">ANSWER</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-200 leading-snug pt-1">
              Most homeowners hire the first contractor who answers.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="bg-[#10141D] border-2 border-zinc-700 rounded-xl p-4 flex flex-col shadow-inner">
            <div className="flex items-center justify-between mb-1 pb-1.5 border-b border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-[#F76115] uppercase tracking-wider">
                STAT 03 // VOICEMAIL
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">1 in 2</span>
            </div>
            <div className="h-14 sm:h-16 flex items-center">
              <div className="text-3xl sm:text-4xl font-black text-[#F76115] font-mono tracking-tight">
                50% <span className="text-xl text-white font-normal">DROP</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-zinc-200 leading-snug pt-1">
              Voicemail doesn't cut it: 50% hang up and call the next guy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Floor 06: Backstop Solution Architecture
 * Sequentially illuminates steps 01 -> 02 -> 03 when Runner connects branch power.
 */
export function JobSpecBackstop() {
  const status = useFloorPower(); // 'dead' | 'fault' | 'lit'
  const isLit = status === "lit";

  return (
    <div className="w-full">
      <div className={`backstop-box bg-white border-2 rounded-2xl p-5 sm:p-7 shadow-lg mb-6 transition-all duration-400 ${
        isLit ? "border-[#066AAD] ring-2 ring-[#066AAD]/30" : "border-[#066AAD]/40"
      }`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-[#066AAD] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLit ? "bg-[#066AAD] animate-ping" : "bg-[#94A3B8]"}`} />
              <span>SOLUTION // AI BACKSTOP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#101828] tracking-tight">
              Steelhead is a 24/7 backstop for the calls you miss.
            </h3>
          </div>
          <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase border transition-colors ${
            isLit
              ? "bg-[#EBF5FB] text-[#066AAD] border-[#066AAD]"
              : "bg-[#F8FAFC] text-[#64748B] border-[#CBD5E1]"
          }`}>
            {isLit ? "BACKSTOP ONLINE" : "BACKSTOP OFFLINE"}
          </span>
        </div>

        {/* 3 Step Flow Blocks */}
        <div className="space-y-4">
          {/* Step 1: If you pick up */}
          <div className="backstop-step backstop-step-1 bg-[#FAF7F2] border-2 border-[#E6DBC2] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
            <div className={`shrink-0 w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-xs shadow-sm transition-colors ${
              isLit
                ? "bg-emerald-500 text-white border border-emerald-600"
                : "bg-emerald-100 border border-emerald-300 text-emerald-800"
            }`}>
              01
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#101828] mb-1">
                If you pick up:
              </h4>
              <p className="text-sm sm:text-base text-[#414651] font-medium">
                Nothing changes. You talk to your customer like always.
              </p>
            </div>
          </div>

          {/* Step 2: If you can't pick up */}
          <div className="backstop-step backstop-step-2 bg-[#FAF7F2] border-2 border-[#F76115] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start relative shadow-md">
            <div className={`shrink-0 w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-xs shadow-sm transition-colors ${
              isLit
                ? "bg-[#F76115] text-white border border-[#D94F0C]"
                : "bg-[#FFF3ED] border border-[#F76115] text-[#F76115]"
            }`}>
              02
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-base font-bold text-[#101828]">
                  If you can’t pick up:
                </h4>
                {/* Desktop badge top-right */}
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#F76115] bg-[#FFF3ED] text-[#F76115] text-xs font-mono font-bold shadow-sm">
                  <span>⏱</span> 30 min travel buffer
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#414651] font-medium leading-relaxed">
                Steelhead answers for you in a natural, conversational voice. It answers basic service questions, factors in your schedule and travel time, and books an estimate directly to your Google Calendar.
              </p>
              {/* Mobile badge at bottom of panel */}
              <div className="mt-3 flex sm:hidden justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#F76115] bg-[#FFF3ED] text-[#F76115] text-xs font-mono font-bold shadow-sm">
                  <span>⏱</span> 30 min travel buffer
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: If they don't want to book */}
          <div className="backstop-step backstop-step-3 bg-[#FAF7F2] border-2 border-[#E6DBC2] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
            <div className={`shrink-0 w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-xs shadow-sm transition-colors ${
              isLit
                ? "bg-[#066AAD] text-white border border-[#004D7D]"
                : "bg-sky-100 border border-sky-300 text-[#066AAD]"
            }`}>
              03
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#101828] mb-1">
                If they don’t want to book:
              </h4>
              <p className="text-sm sm:text-base text-[#414651] font-medium">
                Steelhead takes a message and gives you a summary, callback number, and transcript.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          IN-TRUCK VIEW // PRODUCT SCREENSHOT & ZERO-OVERHEAD MANIFESTO
          ========================================================================= */}
      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-5 sm:p-7 shadow-xl overflow-hidden mt-6">
        {/* Card Header Spec Tag */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#E6DBC2]">
          <span className="w-2 h-2 rounded-full bg-[#066AAD]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#066AAD]">
            NO OVERHEAD // IN-CAB OFFICE
          </span>
        </div>

        {/* -----------------------------------------------------------------
            MOBILE LAYOUT (Phone First, followed by 3 Punchy Statements)
            ----------------------------------------------------------------- */}
        <div className="block md:hidden">
          {/* Phone Frame First */}
          <div className="relative mx-auto w-full max-w-[270px]">
            <div className="relative bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] p-2.5 rounded-[2.5rem] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.15)] border-2 border-slate-600/70">
              {/* Dynamic Island Pill */}
              <div className="w-20 h-4 bg-[#0F172A] rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2 z-20 border border-slate-800 shadow-sm" />
              {/* Screen Container */}
              <div className="rounded-[2rem] overflow-hidden bg-black relative aspect-[1170/2532] border border-slate-900 shadow-inner">
                <img
                  src="/images/product-home-screen.png"
                  alt="Steelhead contractor mobile interface showing scheduled jobs with travel buffer"
                  className="w-full h-full object-cover select-none"
                  loading="eager"
                  decoding="sync"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3 Short Punchy Statements Directly Below */}
          <div className="mt-6 pt-5 border-t border-[#E6DBC2] space-y-3">
            <div className="flex items-center gap-3 text-[#101828] font-black text-base">
              <span className="text-xl">🔨</span>
              <span>No laptops.</span>
            </div>
            <div className="flex items-center gap-3 text-[#101828] font-black text-base">
              <span className="text-xl">📋</span>
              <span>No endless forms to fill out.</span>
            </div>
            <div className="flex items-center gap-3 text-[#101828] font-black text-base">
              <span className="text-xl">⚙️</span>
              <span>No changing how you run your business.</span>
            </div>

            {/* Strongly Formatted Bottom Line */}
            <div className="bg-[#FFF3ED] border-2 border-[#F76115] rounded-xl p-4 mt-5 text-[#101828] shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">⚡</span>
                <p className="text-sm font-black text-[#101828] leading-snug">
                  Steelhead catches the jobs you might otherwise miss.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            DESKTOP LAYOUT (Side-by-Side: 3 Expanded Paragraphs + Phone Mockup)
            ----------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 3 Structured Paragraphs + Bottom Line */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            {/* Paragraph 1: No laptops */}
            <div className="bg-[#FAF7F2] border border-[#E6DBC2] rounded-xl p-4 shadow-xs space-y-1">
              <h4 className="text-base font-black text-[#101828] flex items-center gap-2">
                <span>🔨</span> No laptops.
              </h4>
              <p className="text-sm text-[#414651] font-medium leading-relaxed pl-6">
                No going home for 8pm data entry. Everything lives on your phone and goes where you go.
              </p>
            </div>

            {/* Paragraph 2: No endless forms */}
            <div className="bg-[#FAF7F2] border border-[#E6DBC2] rounded-xl p-4 shadow-xs space-y-1">
              <h4 className="text-base font-black text-[#101828] flex items-center gap-2">
                <span>📋</span> No endless forms to fill out.
              </h4>
              <p className="text-sm text-[#414651] font-medium leading-relaxed pl-6">
                Caller names, numbers, addresses and requests are all captured by Steelhead. You just read and go.
              </p>
            </div>

            {/* Paragraph 3: No changing how you run your business */}
            <div className="bg-[#FAF7F2] border border-[#E6DBC2] rounded-xl p-4 shadow-xs space-y-1">
              <h4 className="text-base font-black text-[#101828] flex items-center gap-2">
                <span>⚙️</span> No changing how you run your business.
              </h4>
              <p className="text-sm text-[#414651] font-medium leading-relaxed pl-6">
                Your same phone. Your same number. Your same calendar. You control your schedule.
              </p>
            </div>

            {/* Strongly Formatted Bottom Line */}
            <div className="bg-[#FFF3ED] border-2 border-[#F76115] rounded-xl p-4 shadow-sm flex items-center gap-3.5">
              <span className="text-2xl shrink-0">⚡</span>
              <p className="text-base font-black text-[#101828] leading-snug">
                Steelhead catches the jobs you might otherwise miss.
              </p>
            </div>
          </div>

          {/* Right Column: Phone Mockup Frame */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[270px]">
              <div className="relative bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] p-2.5 sm:p-3 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.15)] border-2 border-slate-600/70">
                {/* Dynamic Island Pill */}
                <div className="w-20 h-4 bg-[#0F172A] rounded-full mx-auto absolute top-4 sm:top-4.5 left-1/2 -translate-x-1/2 z-20 border border-slate-800 shadow-sm" />
                {/* Screen Display Container */}
                <div className="rounded-[2rem] overflow-hidden bg-black relative aspect-[1170/2532] border border-slate-900 shadow-inner">
                  <img
                    src="/images/product-home-screen.png"
                    alt="Steelhead contractor mobile interface showing scheduled jobs with travel buffer"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                    decoding="sync"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Combined default export for backward compatibility
 */
export default function JobSpecSection() {
  return (
    <section className="mb-12">
      <JobSpecWarning />
      <div className="my-6" />
      <JobSpecBackstop />
    </section>
  );
}
