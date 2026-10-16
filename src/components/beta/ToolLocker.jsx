import React, { useState, useEffect, useRef } from "react";
import { useFloorPower } from "./riser/riserContext";

// Heavy-duty ball-bearing slide rail that flanks the drawer interior when extended
function SlideRail({ side }) {
  return (
    <div
      className={`w-4 sm:w-5.5 shrink-0 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 border-${
        side === "left" ? "r" : "l"
      } border-slate-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(0,0,0,0.45)] flex flex-col items-center justify-between py-4 select-none z-10`}
      title="Heavy-Duty Ball-Bearing Slide"
    >
      {/* Top Slide Stop Rivet */}
      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-700 border border-slate-900 shadow-inner" />

      {/* Center Slide Channel with Ball Bearings */}
      <div className="w-1.5 sm:w-2 flex-1 my-2.5 bg-slate-800/90 rounded-full py-2 flex flex-col justify-around items-center shadow-inner">
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-sm" />
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-sm" />
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-sm" />
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-sm hidden sm:block" />
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-sm hidden sm:block" />
      </div>

      {/* Bottom Slide Detent Rivet */}
      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-700 border border-slate-900 shadow-inner" />
    </div>
  );
}

export default function ToolLocker() {
  // Start with all drawers closed until the Runner reaches this floor
  const [openDrawer, setOpenDrawer] = useState(null);
  const floorPower = useFloorPower();
  const hasAnimatedRef = useRef(false);
  const userInteractedRef = useRef(false);

  // Runner connection animation: opens the first drawer when Floor 03 is powered
  useEffect(() => {
    if (floorPower === "lit" && !hasAnimatedRef.current && !userInteractedRef.current) {
      hasAnimatedRef.current = true;
      const timer = setTimeout(() => {
        if (!userInteractedRef.current) {
          setOpenDrawer("drawer1");
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [floorPower]);

  const toggleDrawer = (drawerKey) => {
    userInteractedRef.current = true;
    setOpenDrawer((prev) => (prev === drawerKey ? null : drawerKey));
  };

  return (
    <section className="mb-12" id="beta-drawers">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#066AAD] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#066AAD]">
          SECTION 03 // THE BETA TEST
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
        <span className="text-[10px] font-mono text-[#717680] uppercase">
          [HOW IT WORKS]
        </span>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
          Your Participation
        </h2>
      </div>

      {/* Intro Copy Block */}
      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-5 sm:p-6 mb-6 text-[#101828] text-base sm:text-lg leading-relaxed shadow-md space-y-3">
        <p className="font-medium text-[#252B37]">
          We’re building Steelhead and testing it ourselves. But that’s practice, not game time.
        </p>
        <p className="font-medium text-[#252B37]">
          We want to put Steelhead on the field with you before a public launch.
        </p>
      </div>

      {/* =========================================================================
          MODULAR JOB-BOX / TOOL CHEST CHASSIS
          ========================================================================= */}
      <div className="bg-[#131822] border-2 border-slate-700/80 rounded-2xl shadow-xl overflow-hidden relative">
        {/* Cabinet Top Header Bar */}
        <div className="relative border-b border-slate-700/80 bg-[#141a24] px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F76115] shadow-[0_0_6px_#F76115] shrink-0" />
            <span className="font-bold tracking-wider text-slate-200 uppercase text-[11px] sm:text-xs">
              STEELHEAD CLOSED BETA
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span className="text-emerald-400 tracking-wider">
              ACTIVE
            </span>
          </div>
        </div>

        {/* STACKED DRAWERS CONTAINER */}
        <div className="divide-y divide-slate-800/80">
          {/* =========================================================================
              DRAWER 01: [Logistics]
              ========================================================================= */}
          <div>
            {/* Drawer Pull Button */}
            <button
              type="button"
              onClick={() => toggleDrawer("drawer1")}
              className={`w-full text-left transition-all cursor-pointer flex flex-col group ${
                openDrawer === "drawer1"
                  ? "bg-[#1b2330] border-l-4 border-l-[#F76115]"
                  : "bg-[#131822] hover:bg-[#161e2b] border-l-4 border-l-transparent"
              }`}
            >
              {/* Extruded Brushed Aluminum Lip Handle */}
              <div className="w-full h-3 sm:h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t border-white/70 border-b border-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.35)] flex items-center justify-between px-3">
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-12 sm:w-20 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
              </div>

              {/* Drawer Faceplate Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Stamped Metal Drawer Number Badge */}
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-inner transition-all ${
                    openDrawer === "drawer1"
                      ? "bg-black/60 border-orange-500 text-[#F76115] shadow-[0_0_10px_rgba(247,97,21,0.35)]"
                      : "bg-[#066AAD]/15 border-[#066AAD]/60 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/25"
                  }`}>
                    <span className="font-mono text-xs font-black">01</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                        Parameters
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                      Logistics
                    </h3>
                  </div>
                </div>

                {/* Drawer State Latch Indicator */}
                <div className="flex items-center gap-2 shrink-0 ml-2 sm:ml-3">
                  <span className={`hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider ${
                    openDrawer === "drawer1" ? "text-[#F76115]" : "text-sky-400"
                  }`}>
                    {openDrawer === "drawer1" ? "[OPEN]" : "[CLOSED]"}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-mono transition-transform duration-200 ${
                      openDrawer === "drawer1"
                        ? "border-orange-500 text-[#F76115] bg-black/60 rotate-180 shadow-[0_0_8px_rgba(247,97,21,0.35)]"
                        : "border-[#066AAD]/60 bg-[#066AAD]/15 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/30"
                    }`}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </button>

            {/* Drawer Interior: Textured Bed with Side Slide Rails & Kaizen Foam Cutouts */}
            {openDrawer === "drawer1" && (
              <div className="bg-[#090c12] border-t-2 border-slate-900 flex relative overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.85)]">
                {/* Left Ball-Bearing Slide Rail */}
                <SlideRail side="left" />

                {/* Center Drawer Bed with Diamond Plate Floor */}
                <div className="flex-1 p-3.5 sm:p-5 relative overflow-hidden">
                  {/* Diamond Plate Tread Texture on Drawer Floor */}
                  <div 
                    className="absolute inset-0 opacity-[0.20] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(ellipse at 50% 50%, #94a3b8 1.4px, transparent 1.4px), radial-gradient(ellipse at 0% 0%, #94a3b8 1.4px, transparent 1.4px)`,
                      backgroundSize: `16px 16px`,
                      backgroundPosition: `0 0, 8px 8px`,
                    }}
                  />

                  <div className="relative z-10 space-y-3">
                    {/* Grid of Recessed Cutout Pockets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* COST */}
                      <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                        <div className="text-[10px] font-mono text-emerald-400 font-black uppercase tracking-wider mb-1">
                          COST
                        </div>
                        <div className="text-base font-extrabold text-white">
                          $0. We cover all the expenses.
                        </div>
                      </div>

                      {/* TIMELINE */}
                      <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                        <div className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-wider mb-1">
                          TIMELINE
                        </div>
                        <div className="text-base font-extrabold text-white">
                          Planned 2 to 3 months.
                        </div>
                      </div>

                      {/* DEVICES */}
                      <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                        <div className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-wider mb-1">
                          DEVICES
                        </div>
                        <div className="text-base font-extrabold text-white">
                          iPhone and Android.
                        </div>
                      </div>

                      {/* CALENDAR */}
                      <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                        <div className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-wider mb-1">
                          CALENDAR
                        </div>
                        <div className="text-base font-extrabold text-white">
                          Google Calendar for now.
                        </div>
                      </div>
                    </div>

                    {/* Setup Protocol Full-Width Pocket */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        15m
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-emerald-400 font-black uppercase tracking-wider mb-0.5">
                          SETUP
                        </div>
                        <div className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                          Access is limited, invite only. In-person setup with Thomas takes 15 minutes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Ball-Bearing Slide Rail */}
                <SlideRail side="right" />
              </div>
            )}
          </div>

          {/* =========================================================================
              DRAWER 02: [Privacy & Your Data]
              ========================================================================= */}
          <div>
            {/* Drawer Pull Button */}
            <button
              type="button"
              onClick={() => toggleDrawer("drawer2")}
              className={`w-full text-left transition-all cursor-pointer flex flex-col group ${
                openDrawer === "drawer2"
                  ? "bg-[#1b2330] border-l-4 border-l-[#F76115]"
                  : "bg-[#131822] hover:bg-[#161e2b] border-l-4 border-l-transparent"
              }`}
            >
              {/* Extruded Brushed Aluminum Lip Handle */}
              <div className="w-full h-3 sm:h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t border-white/70 border-b border-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.35)] flex items-center justify-between px-3">
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-12 sm:w-20 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
              </div>

              {/* Drawer Faceplate Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Stamped Metal Drawer Number Badge */}
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-inner transition-all ${
                    openDrawer === "drawer2"
                      ? "bg-black/60 border-orange-500 text-[#F76115] shadow-[0_0_10px_rgba(247,97,21,0.35)]"
                      : "bg-[#066AAD]/15 border-[#066AAD]/60 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/25"
                  }`}>
                    <span className="font-mono text-xs font-black">02</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                        Data Integrity
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                      Privacy &amp; Your Data
                    </h3>
                  </div>
                </div>

                {/* Drawer State Latch Indicator */}
                <div className="flex items-center gap-2 shrink-0 ml-2 sm:ml-3">
                  <span className={`hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider ${
                    openDrawer === "drawer2" ? "text-[#F76115]" : "text-sky-400"
                  }`}>
                    {openDrawer === "drawer2" ? "[OPEN]" : "[CLOSED]"}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-mono transition-transform duration-200 ${
                      openDrawer === "drawer2"
                        ? "border-orange-500 text-[#F76115] bg-black/60 rotate-180 shadow-[0_0_8px_rgba(247,97,21,0.35)]"
                        : "border-[#066AAD]/60 bg-[#066AAD]/15 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/30"
                    }`}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </button>

            {/* Drawer Interior: Textured Bed with Side Slide Rails & Kaizen Foam Cutouts */}
            {openDrawer === "drawer2" && (
              <div className="bg-[#090c12] border-t-2 border-slate-900 flex relative overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.85)]">
                {/* Left Ball-Bearing Slide Rail */}
                <SlideRail side="left" />

                {/* Center Drawer Bed with Diamond Plate Floor */}
                <div className="flex-1 p-3.5 sm:p-5 relative overflow-hidden">
                  {/* Diamond Plate Tread Texture on Drawer Floor */}
                  <div 
                    className="absolute inset-0 opacity-[0.20] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(ellipse at 50% 50%, #94a3b8 1.4px, transparent 1.4px), radial-gradient(ellipse at 0% 0%, #94a3b8 1.4px, transparent 1.4px)`,
                      backgroundSize: `16px 16px`,
                      backgroundPosition: `0 0, 8px 8px`,
                    }}
                  />

                  <div className="relative z-10 space-y-3">
                    {/* CALENDAR SECURITY */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                      <div className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-wider mb-1">
                        CALENDAR SECURITY
                      </div>
                      <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        Steelhead’s system only accesses your calendar to view availability, book estimates, or adjust appointments it scheduled.
                      </p>
                    </div>

                    {/* ZERO DATA SALES */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                      <div className="text-[10px] font-mono text-sky-400 font-black uppercase tracking-wider mb-1">
                        ZERO DATA SALES
                      </div>
                      <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        We will never sell, rent, or share your data with marketers. Period.
                      </p>
                    </div>

                    {/* OUR VISIBILITY */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors hover:border-slate-500">
                      <div className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-wider mb-1">
                        OUR VISIBILITY
                      </div>
                      <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        We (Thomas &amp; Luke) only see system analytics like how many calls are handled per day, call duration, etc.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Ball-Bearing Slide Rail */}
                <SlideRail side="right" />
              </div>
            )}
          </div>

          {/* =========================================================================
              DRAWER 03: [What We Need From You]
              ========================================================================= */}
          <div>
            {/* Drawer Pull Button */}
            <button
              type="button"
              onClick={() => toggleDrawer("drawer3")}
              className={`w-full text-left transition-all cursor-pointer flex flex-col group ${
                openDrawer === "drawer3"
                  ? "bg-[#1b2330] border-l-4 border-l-[#F76115]"
                  : "bg-[#131822] hover:bg-[#161e2b] border-l-4 border-l-transparent"
              }`}
            >
              {/* Extruded Brushed Aluminum Lip Handle */}
              <div className="w-full h-3 sm:h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t border-white/70 border-b border-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.35)] flex items-center justify-between px-3">
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-12 sm:w-20 bg-slate-400/80 rounded-full" />
                <div className="h-[2px] w-8 sm:w-12 bg-slate-400/80 rounded-full" />
              </div>

              {/* Drawer Faceplate Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Stamped Metal Drawer Number Badge */}
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-inner transition-all ${
                    openDrawer === "drawer3"
                      ? "bg-black/60 border-orange-500 text-[#F76115] shadow-[0_0_10px_rgba(247,97,21,0.35)]"
                      : "bg-[#066AAD]/15 border-[#066AAD]/60 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/25"
                  }`}>
                    <span className="font-mono text-xs font-black">03</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                        Feedback
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                      What We Need From You
                    </h3>
                  </div>
                </div>

                {/* Drawer State Latch Indicator */}
                <div className="flex items-center gap-2 shrink-0 ml-2 sm:ml-3">
                  <span className={`hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider ${
                    openDrawer === "drawer3" ? "text-[#F76115]" : "text-sky-400"
                  }`}>
                    {openDrawer === "drawer3" ? "[OPEN]" : "[CLOSED]"}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-mono transition-transform duration-200 ${
                      openDrawer === "drawer3"
                        ? "border-orange-500 text-[#F76115] bg-black/60 rotate-180 shadow-[0_0_8px_rgba(247,97,21,0.35)]"
                        : "border-[#066AAD]/60 bg-[#066AAD]/15 text-sky-400 group-hover:border-sky-400 group-hover:bg-[#066AAD]/30"
                    }`}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </button>

            {/* Drawer Interior: Textured Bed with Side Slide Rails & Kaizen Foam Cutouts */}
            {openDrawer === "drawer3" && (
              <div className="bg-[#090c12] border-t-2 border-slate-900 flex relative overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.85)]">
                {/* Left Ball-Bearing Slide Rail */}
                <SlideRail side="left" />

                {/* Center Drawer Bed with Diamond Plate Floor */}
                <div className="flex-1 p-3.5 sm:p-5 relative overflow-hidden">
                  {/* Diamond Plate Tread Texture on Drawer Floor */}
                  <div 
                    className="absolute inset-0 opacity-[0.20] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(ellipse at 50% 50%, #94a3b8 1.4px, transparent 1.4px), radial-gradient(ellipse at 0% 0%, #94a3b8 1.4px, transparent 1.4px)`,
                      backgroundSize: `16px 16px`,
                      backgroundPosition: `0 0, 8px 8px`,
                    }}
                  />

                  <div className="relative z-10 space-y-3">
                    {/* Task A */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-start gap-3.5 transition-colors hover:border-slate-500">
                      <div className="w-7 h-7 rounded-lg bg-amber-950/40 text-amber-400 font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                        A
                      </div>
                      <div className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        <strong className="text-white font-extrabold">Run your business like normal.</strong> Let Steelhead catch the calls you can't.
                      </div>
                    </div>

                    {/* Task B */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-start gap-3.5 transition-colors hover:border-slate-500">
                      <div className="w-7 h-7 rounded-lg bg-amber-950/40 text-amber-400 font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                        B
                      </div>
                      <div className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        <strong className="text-white font-extrabold">Honest feedback.</strong> What’s good and bad? What do you wish it did?
                      </div>
                    </div>

                    {/* Task C */}
                    <div className="bg-[#131924] border border-slate-600/70 rounded-xl p-3.5 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-start gap-3.5 transition-colors hover:border-slate-500">
                      <div className="w-7 h-7 rounded-lg bg-amber-950/40 text-amber-400 font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                        C
                      </div>
                      <div className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                        <strong className="text-white font-extrabold">Customer reactions.</strong> Tell us what, if anything, your callers say about Steelhead.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Ball-Bearing Slide Rail */}
                <SlideRail side="right" />
              </div>
            )}
          </div>
        </div>

        {/* Locker Bottom Plate */}
        <div className="bg-[#0e1219] border-t border-slate-800 px-5 py-2.5 text-center text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
          <span>STEELHEAD // USA</span>
          <svg className="w-4 h-2.5 rounded-[1px] shadow-sm shrink-0" viewBox="0 0 19 10" aria-label="USA Flag">
            <rect width="19" height="10" fill="#B22234" />
            <rect y="0.77" width="19" height="0.77" fill="#fff" />
            <rect y="2.31" width="19" height="0.77" fill="#fff" />
            <rect y="3.85" width="19" height="0.77" fill="#fff" />
            <rect y="5.38" width="19" height="0.77" fill="#fff" />
            <rect y="6.92" width="19" height="0.77" fill="#fff" />
            <rect y="8.46" width="19" height="0.77" fill="#fff" />
            <rect width="7.6" height="5.38" fill="#3C3B6E" />
            <circle cx="1.9" cy="1.35" r="0.45" fill="#fff" />
            <circle cx="3.8" cy="1.35" r="0.45" fill="#fff" />
            <circle cx="5.7" cy="1.35" r="0.45" fill="#fff" />
            <circle cx="2.85" cy="2.69" r="0.45" fill="#fff" />
            <circle cx="4.75" cy="2.69" r="0.45" fill="#fff" />
            <circle cx="1.9" cy="4.03" r="0.45" fill="#fff" />
            <circle cx="3.8" cy="4.03" r="0.45" fill="#fff" />
            <circle cx="5.7" cy="4.03" r="0.45" fill="#fff" />
          </svg>
        </div>
      </div>
    </section>
  );
}
