import React from "react";

/**
 * SteelheadRunner
 * A dedicated, high-craft solo trade mechanic / bot inspired by Luke's carelsen.dev aesthetic.
 * Single character produced with purpose across key milestones on the page.
 *
 * Poses:
 * - "clipboard": Standing on card ledge surveying the work order.
 * - "wrench-wiring": Stationed at the electrical junction box fixing the fault with an insulated wrench.
 * - "switch-toggle": Adjusting jumper cables / telecom switch.
 * - "phone-ready": Holding smartphone with test call verified checkmark, giving thumbs up.
 */
export default function SteelheadRunner({
  pose = "clipboard",
  className = "",
  badge = null,
}) {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Optional contextual label / callout badge */}
      {badge && (
        <div className="mb-1.5 px-2 py-0.5 rounded-full bg-[#101828] text-white text-[9px] font-mono tracking-wider flex items-center space-x-1 shadow-md border border-[#F76115]/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F76115] animate-ping" />
          <span>{badge}</span>
        </div>
      )}

      {/* Runner Character SVG */}
      <div className="relative animate-runner-idle">
        {pose === "clipboard" && <RunnerWithClipboard />}
        {pose === "wrench-wiring" && <RunnerWithWrench />}
        {pose === "switch-toggle" && <RunnerSwitchToggle />}
        {pose === "phone-ready" && <RunnerPhoneReady />}
      </div>
    </div>
  );
}

/**
 * Pose 1: Runner standing on top ledge holding a work order clipboard
 */
function RunnerWithClipboard() {
  return (
    <svg
      width="72"
      height="88"
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      {/* Shadow */}
      <ellipse cx="36" cy="85" rx="18" ry="3" fill="#D6C39B" opacity="0.6" />

      {/* Boots */}
      <rect x="22" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />
      <rect x="39" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />

      {/* Legs / Work Trousers */}
      <path
        d="M25 58 L25 74 M43 58 L43 74"
        stroke="#101828"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Trouser cuffs */}
      <line x1="22" y1="73" x2="28" y2="73" stroke="#D6C39B" strokeWidth="1.5" />
      <line x1="40" y1="73" x2="46" y2="73" stroke="#D6C39B" strokeWidth="1.5" />

      {/* Tool Belt */}
      <rect x="20" y="54" width="32" height="5" rx="1.5" fill="#94713E" stroke="#101828" strokeWidth="1.6" />
      {/* Belt Buckle */}
      <rect x="33" y="53.5" width="6" height="6" rx="1" fill="#D6C39B" stroke="#101828" strokeWidth="1.2" />
      {/* Pouch */}
      <rect x="47" y="56" width="6" height="8" rx="1" fill="#7D5F30" stroke="#101828" strokeWidth="1.4" />

      {/* Torso / Steelhead Blue Work Vest */}
      <path
        d="M24 35 L48 35 L46 54 L26 54 Z"
        fill="#066AAD"
        stroke="#101828"
        strokeWidth="1.8"
      />
      {/* High-Vis Reflective Stripe */}
      <line x1="25" y1="44" x2="47" y2="44" stroke="#FFF3ED" strokeWidth="2" strokeDasharray="3 2" />

      {/* Arms & Left Hand holding Clipboard */}
      {/* Right Arm hanging relaxed */}
      <path
        d="M24 38 L18 50 L20 54"
        stroke="#101828"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Arm holding clipboard forward */}
      <path
        d="M48 38 L54 48 L46 50"
        stroke="#101828"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Clipboard */}
      <g transform="translate(42, 38) rotate(6)">
        {/* Board */}
        <rect x="0" y="0" width="18" height="24" rx="2" fill="#FAF7F2" stroke="#101828" strokeWidth="1.6" />
        {/* Metal Clip */}
        <rect x="5" y="-3" width="8" height="4" rx="1" fill="#94A3B8" stroke="#101828" strokeWidth="1.2" />
        {/* Sheet text lines */}
        <line x1="3" y1="5" x2="15" y2="5" stroke="#066AAD" strokeWidth="1.5" />
        <line x1="3" y1="9" x2="13" y2="9" stroke="#717680" strokeWidth="1.2" />
        <line x1="3" y1="13" x2="15" y2="13" stroke="#717680" strokeWidth="1.2" />
        {/* Checkmark in Orange */}
        <path d="M4 18 L7 20 L13 16" stroke="#F76115" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Head / Neck */}
      <circle cx="36" cy="27" r="9" fill="#F3EEE1" stroke="#101828" strokeWidth="1.8" />
      {/* Visor / Friendly Eye dot */}
      <rect x="36" y="25" width="5" height="3" rx="1" fill="#101828" />

      {/* Hard Hat in Brand Safety Orange (#F76115) */}
      <path
        d="M26 23 C26 14 46 14 46 23 Z"
        fill="#F76115"
        stroke="#101828"
        strokeWidth="1.8"
      />
      {/* Hard Hat Brim */}
      <line x1="24" y1="23" x2="48" y2="23" stroke="#101828" strokeWidth="2.4" strokeLinecap="round" />
      {/* Center Ridge */}
      <path d="M36 14 L36 21" stroke="#FF8A48" strokeWidth="1.8" strokeLinecap="round" />
      {/* Headlamp */}
      <circle cx="36" cy="18" r="2" fill="#FAF7F2" stroke="#101828" strokeWidth="1" />
      <circle cx="36" cy="18" r="0.8" fill="#F76115" />
    </svg>
  );
}

/**
 * Pose 2: Runner kneeling / working with wrench on the electrical junction box
 */
function RunnerWithWrench() {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      {/* Shadow */}
      <ellipse cx="44" cy="84" rx="24" ry="3.5" fill="#D6C39B" opacity="0.6" />

      {/* Kneeling Legs */}
      <rect x="18" y="74" width="12" height="7" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />
      <rect x="42" y="75" width="14" height="7" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />
      {/* Kneeling leg bent */}
      <path
        d="M28 58 L20 68 L24 75 M46 58 L54 68 L48 76"
        stroke="#101828"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tool Belt */}
      <rect x="26" y="54" width="28" height="5" rx="1.5" fill="#94713E" stroke="#101828" strokeWidth="1.6" />
      <rect x="37" y="53.5" width="6" height="6" rx="1" fill="#D6C39B" stroke="#101828" strokeWidth="1.2" />

      {/* Torso leaning forward toward the junction box */}
      <path
        d="M30 36 L52 38 L48 56 L28 54 Z"
        fill="#066AAD"
        stroke="#101828"
        strokeWidth="1.8"
      />
      <line x1="30" y1="46" x2="50" y2="47" stroke="#FFF3ED" strokeWidth="2" strokeDasharray="3 2" />

      {/* Left Hand stabilizing on knee */}
      <path
        d="M32 40 L26 50 L30 62"
        stroke="#101828"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Head leaning forward */}
      <circle cx="44" cy="27" r="9" fill="#F3EEE1" stroke="#101828" strokeWidth="1.8" />
      <rect x="46" y="27" width="5" height="3" rx="1" fill="#101828" />

      {/* Hard Hat */}
      <path
        d="M34 23 C34 14 54 14 54 23 Z"
        fill="#F76115"
        stroke="#101828"
        strokeWidth="1.8"
      />
      <line x1="32" y1="23" x2="56" y2="23" stroke="#101828" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="46" cy="18" r="2" fill="#FAF7F2" stroke="#101828" strokeWidth="1" />
      <circle cx="46" cy="18" r="0.8" fill="#F76115" />

      {/* Right Arm extended holding insulated wrench / multimeter */}
      <path
        d="M48 40 L62 46 L68 44"
        stroke="#101828"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Insulated Wrench / Multimeter with animated crank */}
      <g className="animate-runner-wrench">
        {/* Wrench Handle */}
        <line x1="64" y1="48" x2="78" y2="38" stroke="#F76115" strokeWidth="3" strokeLinecap="round" />
        {/* Wrench Head */}
        <circle cx="80" cy="36" r="3.5" fill="#E2E8F0" stroke="#101828" strokeWidth="1.5" />
        <rect x="79" y="34" width="4" height="4" fill="#FAF7F2" />
        {/* Active wiring spark at terminal tip */}
        <g className="animate-spark" transform="translate(82, 34)">
          <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#F76115" />
          <circle cx="0" cy="0" r="1.5" fill="#FDE047" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Pose 3: Runner standing by Carrier Switcher / Telecom box
 */
function RunnerSwitchToggle() {
  return (
    <svg
      width="72"
      height="88"
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <ellipse cx="36" cy="85" rx="18" ry="3" fill="#D6C39B" opacity="0.6" />

      {/* Boots */}
      <rect x="22" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />
      <rect x="39" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />

      {/* Legs */}
      <path d="M25 58 L25 74 M43 58 L43 74" stroke="#101828" strokeWidth="4" strokeLinecap="round" />

      {/* Tool Belt */}
      <rect x="20" y="54" width="32" height="5" rx="1.5" fill="#94713E" stroke="#101828" strokeWidth="1.6" />
      <rect x="33" y="53.5" width="6" height="6" rx="1" fill="#D6C39B" stroke="#101828" strokeWidth="1.2" />

      {/* Torso */}
      <path d="M24 35 L48 35 L46 54 L26 54 Z" fill="#066AAD" stroke="#101828" strokeWidth="1.8" />
      <line x1="25" y1="44" x2="47" y2="44" stroke="#FFF3ED" strokeWidth="2" strokeDasharray="3 2" />

      {/* Head */}
      <circle cx="36" cy="27" r="9" fill="#F3EEE1" stroke="#101828" strokeWidth="1.8" />
      <rect x="38" y="25" width="5" height="3" rx="1" fill="#101828" />

      {/* Hard Hat */}
      <path d="M26 23 C26 14 46 14 46 23 Z" fill="#F76115" stroke="#101828" strokeWidth="1.8" />
      <line x1="24" y1="23" x2="48" y2="23" stroke="#101828" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="36" cy="18" r="2" fill="#FAF7F2" stroke="#101828" strokeWidth="1" />

      {/* Left arm pointing / adjusting switch */}
      <path d="M48 38 L58 34 L64 36" stroke="#101828" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Hand adjusting dial */}
      <circle cx="65" cy="36" r="2.5" fill="#F76115" />

      {/* Right arm on hip */}
      <path d="M24 38 L16 46 L21 54" stroke="#101828" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pose 4: Runner holding smartphone with test call verified checkmark & thumbs up
 */
function RunnerPhoneReady() {
  return (
    <svg
      width="78"
      height="88"
      viewBox="0 0 78 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <ellipse cx="38" cy="85" rx="18" ry="3" fill="#D6C39B" opacity="0.6" />

      {/* Boots */}
      <rect x="24" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />
      <rect x="41" y="74" width="11" height="8" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.8" />

      {/* Legs */}
      <path d="M27 58 L27 74 M45 58 L45 74" stroke="#101828" strokeWidth="4" strokeLinecap="round" />

      {/* Belt */}
      <rect x="22" y="54" width="32" height="5" rx="1.5" fill="#94713E" stroke="#101828" strokeWidth="1.6" />
      <rect x="35" y="53.5" width="6" height="6" rx="1" fill="#D6C39B" stroke="#101828" strokeWidth="1.2" />

      {/* Torso */}
      <path d="M26 35 L50 35 L48 54 L28 54 Z" fill="#066AAD" stroke="#101828" strokeWidth="1.8" />
      <line x1="27" y1="44" x2="49" y2="44" stroke="#FFF3ED" strokeWidth="2" strokeDasharray="3 2" />

      {/* Head */}
      <circle cx="38" cy="27" r="9" fill="#F3EEE1" stroke="#101828" strokeWidth="1.8" />
      {/* Friendly smiling eye */}
      <path d="M37 26 Q39 28 41 26" stroke="#101828" strokeWidth="1.6" strokeLinecap="round" />

      {/* Hard Hat */}
      <path d="M28 23 C28 14 48 14 48 23 Z" fill="#F76115" stroke="#101828" strokeWidth="1.8" />
      <line x1="26" y1="23" x2="50" y2="23" stroke="#101828" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="38" cy="18" r="2" fill="#FAF7F2" stroke="#101828" strokeWidth="1" />
      <circle cx="38" cy="18" r="0.8" fill="#10B981" />

      {/* Right Hand: Thumbs Up */}
      <path d="M26 38 L16 44 L14 40" stroke="#101828" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 38 L14 33" stroke="#F76115" strokeWidth="3" strokeLinecap="round" />

      {/* Left Hand holding Smartphone with active checkmark */}
      <path d="M50 38 L58 46 L54 50" stroke="#101828" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(54, 34)">
        {/* Smartphone body */}
        <rect x="0" y="0" width="16" height="26" rx="3" fill="#101828" stroke="#101828" strokeWidth="1.4" />
        {/* Screen */}
        <rect x="1.5" y="2" width="13" height="22" rx="1.5" fill="#004D7D" />
        {/* Call verified checkmark */}
        <circle cx="8" cy="11" r="4.5" fill="#10B981" />
        <path d="M6 11 L7.5 12.5 L10.5 9.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Buffer text indicator */}
        <rect x="3" y="17.5" width="10" height="3" rx="1" fill="#F76115" />
      </g>
    </svg>
  );
}
