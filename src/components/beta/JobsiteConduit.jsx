import React, { useState } from "react";
import SteelheadRunner from "./SteelheadRunner";

/**
 * JobsiteConduit
 * An authentic EMT electrical conduit & raceway system connecting sections
 * down the page, acting as the narrative spine for the Steelhead Runner.
 */

/**
 * Straight Vertical Conduit Bridge between sections
 */
export function ConduitSectionBridge({
  height = 56,
  label = null,
  active = true,
  className = "",
}) {
  return (
    <div
      className={`relative w-full flex items-center justify-center my-3 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center" style={{ height: `${height}px` }}>
        {/* Metal Conduit Pipe */}
        <div className="w-2.5 h-full bg-[#E2D4B7] border-x border-[#94713E] relative flex items-center justify-center shadow-inner">
          {/* Inner Glowing Current Flow */}
          {active && (
            <div className="w-1 h-full bg-[#066AAD] rounded-full opacity-90 overflow-hidden relative shadow-[0_0_6px_rgba(6,106,173,0.8)]">
              <div
                className="absolute inset-0 bg-sky-200/80 animate-conduit"
                style={{ height: "200%" }}
              />
            </div>
          )}
        </div>

        {/* Compression Couplings */}
        <div className="absolute top-0 w-4 h-2 bg-[#FAF7F2] border border-[#7D5F30] rounded-sm shadow-sm" />
        <div className="absolute bottom-0 w-4 h-2 bg-[#FAF7F2] border border-[#7D5F30] rounded-sm shadow-sm" />

        {/* Unistrut Wall Mounting Bracket */}
        <div className="absolute top-1/2 -translate-y-1/2 w-6 h-2.5 bg-[#D6C39B] border border-[#94713E] rounded flex items-center justify-between px-0.5 shadow-sm">
          <div className="w-1 h-1 rounded-full bg-[#101828]" />
          <div className="w-1 h-1 rounded-full bg-[#101828]" />
        </div>

        {/* Optional Technical Conduit Stencil */}
        {label && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#FAF7F2] border border-[#D6C39B] px-2 py-0.5 rounded text-[8.5px] font-mono text-[#066AAD] font-bold tracking-wider shadow-sm">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ConduitOffsetBridge
 * Routes EMT conduit across desktop staggered sections (left-to-right or right-to-left).
 * On mobile, collapses gracefully to a clean vertical pipe.
 */
export function ConduitOffsetBridge({
  direction = "left-to-right", // 'left-to-right' | 'right-to-left'
  label = null,
  active = true,
  className = "",
}) {
  const isLeftToRight = direction === "left-to-right";

  return (
    <div
      className={`relative w-full my-3 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Mobile: Clean straight conduit pipe (< 1024px) */}
      <div className="lg:hidden">
        <ConduitSectionBridge height={48} label={label} active={active} />
      </div>

      {/* Desktop: Authentic EMT Offset Bend (>= 1024px) */}
      <div className="hidden lg:flex flex-col items-center relative w-full max-w-2xl h-16">
        <svg
          viewBox="0 0 400 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Conduit Outer Casing */}
          <path
            d={
              isLeftToRight
                ? "M 160 0 L 160 16 C 160 36, 240 28, 240 48 L 240 64"
                : "M 240 0 L 240 16 C 240 36, 160 28, 160 48 L 160 64"
            }
            stroke="#E2D4B7"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={
              isLeftToRight
                ? "M 160 0 L 160 16 C 160 36, 240 28, 240 48 L 240 64"
                : "M 240 0 L 240 16 C 240 36, 160 28, 160 48 L 160 64"
            }
            stroke="#94713E"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-40"
          />

          {/* Inner Glowing Current Flow */}
          {active && (
            <path
              d={
                isLeftToRight
                  ? "M 160 0 L 160 16 C 160 36, 240 28, 240 48 L 240 64"
                  : "M 240 0 L 240 16 C 240 36, 160 28, 160 48 L 160 64"
              }
              stroke="#066AAD"
              strokeWidth="3.5"
              strokeDasharray="8 4"
              className="animate-current-flow"
            />
          )}

          {/* Compression Fittings / Unions */}
          <rect
            x={isLeftToRight ? "152" : "232"}
            y="2"
            width="16"
            height="8"
            rx="1.5"
            fill="#FAF7F2"
            stroke="#7D5F30"
            strokeWidth="1.5"
          />
          <rect
            x={isLeftToRight ? "232" : "152"}
            y="54"
            width="16"
            height="8"
            rx="1.5"
            fill="#FAF7F2"
            stroke="#7D5F30"
            strokeWidth="1.5"
          />

          {/* Mid-point Unistrut Wall Strap */}
          <rect
            x="185"
            y="27"
            width="30"
            height="10"
            rx="2"
            fill="#D6C39B"
            stroke="#94713E"
            strokeWidth="1.5"
          />
          <circle cx="191" cy="32" r="2" fill="#101828" />
          <circle cx="209" cy="32" r="2" fill="#101828" />
        </svg>

        {/* Technical Specification Badge */}
        {label && (
          <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#FAF7F2] border border-[#D6C39B] px-2.5 py-0.5 rounded text-[8.5px] font-mono text-[#066AAD] font-bold tracking-wider shadow-sm pointer-events-auto">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * HazardBypassRelay
 * Wraps the ANSI Warning plate with an active electrical short circuit perimeter.
 * The SINGLE Steelhead Runner is stationed right at the NEMA Terminal Relay Box.
 * Features an interactive tool holster: contractors can tap Wrench, Spec (Clipboard), or Test Call (Phone).
 * Once wired, a bright Brand Blue energized conduit powers down to the Backstop section.
 */
export function HazardBypassRelay({ children }) {
  const [activeTool, setActiveTool] = useState("wrench"); // 'wrench' | 'clipboard' | 'phone'

  const getRunnerBadge = () => {
    switch (activeTool) {
      case "wrench":
        return "RUNNER: BYPASSING MISSED CALL FAULT";
      case "clipboard":
        return "RUNNER: VERIFYING JOB ORDER SPECS";
      case "phone":
        return "RUNNER: TEST CALL DIALED & CONFIRMED";
      default:
        return "RUNNER ON DUTY";
    }
  };

  const getRunnerPose = () => {
    switch (activeTool) {
      case "wrench":
        return "wrench-wiring";
      case "clipboard":
        return "clipboard";
      case "phone":
        return "phone-ready";
      default:
        return "wrench-wiring";
    }
  };

  return (
    <div className="relative w-full mb-4">
      {/* 1. Faulty Circuit Frame with Flickering Wire (Around Caution Plate only) */}
      <div className="relative rounded-2xl p-1 sm:p-1.5 transition-all duration-300">
        <div
          className="absolute inset-0 rounded-2xl border-2 border-dashed pointer-events-none z-10 animate-electric-fault"
          style={{ borderColor: "#F76115" }}
        />
        <div className="relative z-20">{children}</div>
      </div>

      {/* 2. THE STEELHEAD RUNNER WORKSTATION & NEMA BYPASS RELAY */}
      <div className="relative mt-4 mb-2 flex flex-col sm:flex-row items-center sm:items-end justify-between px-2 sm:px-6 z-30 gap-3 pointer-events-auto">
        {/* Interactive Tool Holster Bar */}
        <div className="bg-[#101828] border border-[#374151] rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold text-[#F76115] uppercase tracking-wider hidden sm:inline">
            RUNNER TOOL:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTool("wrench")}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeTool === "wrench"
                  ? "bg-[#F76115] text-white shadow-sm ring-1 ring-white/50"
                  : "bg-[#1E293B] text-zinc-300 hover:text-white hover:bg-[#334155]"
              }`}
              title="Wrench: Fix fault at bypass terminal"
            >
              <span>🔧</span>
              <span>Wrench</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool("clipboard")}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeTool === "clipboard"
                  ? "bg-[#066AAD] text-white shadow-sm ring-1 ring-white/50"
                  : "bg-[#1E293B] text-zinc-300 hover:text-white hover:bg-[#334155]"
              }`}
              title="Clipboard: Review job specifications"
            >
              <span>📋</span>
              <span>Spec</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool("phone")}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeTool === "phone"
                  ? "bg-emerald-600 text-white shadow-sm ring-1 ring-white/50"
                  : "bg-[#1E293B] text-zinc-300 hover:text-white hover:bg-[#334155]"
              }`}
              title="Phone: Live test call confirmed"
            >
              <span>📱</span>
              <span>Test Call</span>
            </button>
          </div>
        </div>

        {/* Station Unit: Runner on left reaching wrench directly into Relay on right */}
        <div className="flex items-end space-x-2">
          {/* THE SINGLE STEELHEAD RUNNER */}
          <SteelheadRunner
            pose={getRunnerPose()}
            badge={getRunnerBadge()}
            className="-mb-2"
          />

          {/* Industrial NEMA Terminal Pull Box */}
          <div className="relative w-20 h-16 bg-[#1E293B] border-2 border-[#101828] rounded-lg p-1.5 shadow-xl flex flex-col justify-between">
            {/* Terminal screw knockouts */}
            <div className="flex justify-between items-center">
              <span className="w-2 h-2 rounded-full bg-[#D6C39B] border border-black/40" />
              <span className="text-[8px] font-mono font-black text-[#F76115] tracking-tight">
                RELAY-01
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D6C39B] border border-black/40" />
            </div>

            {/* Live Status LED */}
            <div className="flex items-center space-x-1.5 font-mono text-[7.5px] text-white">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTool === "wrench"
                    ? "bg-[#066AAD] animate-ping"
                    : activeTool === "phone"
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-[#F76115]"
                }`}
              />
              <span className="text-zinc-200 font-bold uppercase truncate">
                {activeTool === "wrench"
                  ? "BYPASS LOCKED"
                  : activeTool === "phone"
                  ? "CALL TEST OK"
                  : "SPEC LOGGED"}
              </span>
            </div>

            {/* Output Conduit Connector */}
            <div className="absolute -bottom-2.5 left-8 w-4 h-3 bg-[#94A3B8] border border-[#101828] rounded-b" />
          </div>
        </div>
      </div>


      {/* Blue Energized Conduit leading down into Solution Section */}
      <div className="w-full flex flex-col items-center my-2 pointer-events-none select-none">
        <div className="relative h-14 flex flex-col items-center">
          <div className="w-3 h-full bg-[#E2D4B7] border-x border-[#94713E] relative flex items-center justify-center">
            {/* Blue energized stream */}
            <div className="w-1.5 h-full bg-[#066AAD] rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(6,106,173,0.9)]">
              <div
                className="absolute inset-0 bg-white/70 animate-conduit"
                style={{ height: "200%" }}
              />
            </div>
          </div>

          {/* Conduit label badge */}
          <div className="absolute -right-28 sm:-right-32 top-3.5 bg-[#EBF5FB] border border-[#066AAD] text-[#066AAD] font-mono text-[8.5px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#066AAD] animate-ping" />
            <span>⚡ BACKSTOP ENERGIZED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BackstopGlowWrapper
 * Wraps the Solution Architecture section, giving it an authentic illuminated
 * Brand Blue power border and terminal intake coupling.
 */
export function BackstopGlowWrapper({ children }) {
  return (
    <div className="relative w-full">
      {/* Top Intake Terminal Coupling */}
      <div className="flex justify-center -mb-2 relative z-20">
        <div className="w-10 h-3 bg-[#FAF7F2] border-2 border-[#066AAD] rounded-t-md shadow-sm flex items-center justify-center">
          <div className="w-3 h-1 bg-[#066AAD] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Solution Card with Active Blue Energized Glow */}
      <div className="relative rounded-2xl ring-2 ring-[#066AAD]/25 shadow-[0_0_24px_rgba(6,106,173,0.14)] transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

/**
 * TerminalGroundClamp
 * At the bottom of the page, grounds the conduit into the building earth.
 */
export function TerminalGroundClamp({ className = "" }) {
  return (
    <div className={`flex flex-col items-center my-4 pointer-events-none select-none ${className}`}>
      <div className="w-2.5 h-8 bg-[#E2D4B7] border-x border-[#94713E] relative flex items-center justify-center">
        <div className="w-1 h-full bg-[#066AAD] opacity-80" />
      </div>
      <div className="w-8 h-3 bg-[#FAF7F2] border border-[#7D5F30] rounded-sm flex items-center justify-around px-1 shadow-sm">
        <div className="w-1 h-1 rounded-full bg-[#101828]" />
        <span className="text-[7.5px] font-mono font-bold text-[#101828]">GND</span>
        <div className="w-1 h-1 rounded-full bg-[#101828]" />
      </div>
      {/* Earth Ground Symbol */}
      <div className="flex flex-col items-center mt-1 space-y-0.5">
        <div className="w-4 h-[1.5px] bg-[#717680]" />
        <div className="w-2.5 h-[1.5px] bg-[#717680]" />
        <div className="w-1.5 h-[1.5px] bg-[#717680]" />
      </div>
    </div>
  );
}
