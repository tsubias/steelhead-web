import React, { useState } from "react";

/**
 * Industrial 2-Position Rotary Dial Selector (Pure SVG + CSS)
 * - 60-degree rotation between Position 1 (-30°) and Position 2 (+30°)
 * - Industrial brushed stainless faceplate with corner hex/Phillips hardware
 * - Heavy-duty matte black bakelite pointer knob with chrome collar and central screw
 * - Zero external assets (pure vector, <3KB payload, pin-sharp on mobile Retina)
 */
export default function RotaryDial({
  position = 0, // 0 for Position A (-30°), 1 for Position B (+30°)
  onToggle,
  labelA = "VERIZON (CDMA)",
  labelB = "AT&T / T-MOBILE (GSM)",
  className = "",
}) {
  // If uncontrolled, support local state
  const [internalPos, setInternalPos] = useState(0);
  const activePos = position !== undefined ? position : internalPos;

  const handleClick = () => {
    const nextPos = activePos === 0 ? 1 : 0;
    if (onToggle) {
      onToggle(nextPos);
    } else {
      setInternalPos(nextPos);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      handleClick();
    }
  };

  // 60-degree swing between -30° (Position A) and +30° (Position B)
  const angle = activePos === 0 ? -30 : 30;

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* Interactive Dial SVG Canvas */}
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={activePos === 1}
        aria-label={`Rotary selector: ${activePos === 0 ? labelA : labelB}`}
        className="group relative mx-auto shrink-0 cursor-pointer outline-none focus:outline-none border-0 rounded-2xl transition-transform active:scale-[0.98]"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-xl"
          aria-hidden="true"
        >
          <defs>
            {/* Soft ambient shadow behind escutcheon plate */}
            <filter id="dial-plate-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
            </filter>

            {/* Heavy 3D cast shadow underneath rotating knob */}
            <filter id="knob-cast-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.6" />
            </filter>

            {/* Brushed Stainless Steel Faceplate Gradient */}
            <linearGradient id="metal-faceplate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="25%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#F1F5F9" />
              <stop offset="75%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            {/* Outer Escutcheon Bevel Border */}
            <linearGradient id="beveled-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Polished Chrome Collar Ring Gradient */}
            <linearGradient id="chrome-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#94A3B8" />
              <stop offset="45%" stopColor="#F8FAFC" />
              <stop offset="70%" stopColor="#475569" />
              <stop offset="90%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Matte Bakelite / Industrial Plastic Knob Body Gradient */}
            <radialGradient id="knob-body-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1E293B" />
              <stop offset="85%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Tapered Pointer Arm Top Chamfer Gradient */}
            <linearGradient id="knob-pointer-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="35%" stopColor="#475569" />
              <stop offset="65%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Central Screw Metal Gradient */}
            <linearGradient id="screw-head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="40%" stopColor="#94A3B8" />
              <stop offset="80%" stopColor="#475569" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          {/* ========================================================
              1. INDUSTRIAL ESCUTCHEON / FACEPLATE
              ======================================================== */}
          {/* Outer plate border with metallic bevel */}
          <rect
            x="14"
            y="14"
            width="172"
            height="172"
            rx="18"
            fill="url(#beveled-border)"
            filter="url(#dial-plate-shadow)"
          />
          {/* Main brushed metal plate */}
          <rect
            x="16.5"
            y="16.5"
            width="167"
            height="167"
            rx="16"
            fill="url(#metal-faceplate)"
          />

          {/* Brushed Stainless Grain Simulation (Subtle Horizontal Hairlines) */}
          {[28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168].map((y) => (
            <line
              key={y}
              x1="22"
              y1={y}
              x2="178"
              y2={y}
              stroke="#FFFFFF"
              strokeWidth="0.4"
              strokeOpacity="0.45"
            />
          ))}

          {/* Engraved inner track border */}
          <rect
            x="24"
            y="24"
            width="152"
            height="152"
            rx="12"
            fill="none"
            stroke="#475569"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />

          {/* 4 Corner Screws (Phillips Hardware) */}
          {[
            [26, 26],
            [174, 26],
            [26, 174],
            [174, 174],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <circle r="4.2" fill="url(#screw-head)" stroke="#475569" strokeWidth="0.6" />
              <line x1="-2.4" y1="-2.4" x2="2.4" y2="2.4" stroke="#334155" strokeWidth="0.8" />
              <line x1="2.4" y1="-2.4" x2="-2.4" y2="2.4" stroke="#334155" strokeWidth="0.8" />
            </g>
          ))}

          {/* ========================================================
              2. DETENT INDEX MARKINGS (-30° and +30° from Vertical)
              ======================================================== */}
          {/* Arc Guide Track */}
          <path
            d="M 67.5 43.7 A 65 65 0 0 1 132.5 43.7"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            strokeOpacity="0.4"
          />

          {/* Left Detent Mark (-30°, CDMA) */}
          <g transform="translate(100, 100) rotate(-30)">
            <line
              x1="0"
              y1="-60"
              x2="0"
              y2="-72"
              stroke={activePos === 0 ? "#066AAD" : "#64748B"}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* LED indicator pip */}
            <circle
              cx="0"
              cy="-80"
              r="3.2"
              fill={activePos === 0 ? "#066AAD" : "#94A3B8"}
              className="transition-colors duration-300"
            />
            {activePos === 0 && (
              <circle
                cx="0"
                cy="-80"
                r="6.5"
                fill="#38BDF8"
                opacity="0.45"
              />
            )}
          </g>

          {/* Right Detent Mark (+30°, GSM) */}
          <g transform="translate(100, 100) rotate(30)">
            <line
              x1="0"
              y1="-60"
              x2="0"
              y2="-72"
              stroke={activePos === 1 ? "#F76115" : "#64748B"}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* LED indicator pip */}
            <circle
              cx="0"
              cy="-80"
              r="3.2"
              fill={activePos === 1 ? "#F76115" : "#94A3B8"}
              className="transition-colors duration-300"
            />
            {activePos === 1 && (
              <circle
                cx="0"
                cy="-80"
                r="6.5"
                fill="#F76115"
                opacity="0.4"
              />
            )}
          </g>

          {/* Position Indices Text */}
          <text
            x="50"
            y="42"
            textAnchor="middle"
            className="font-mono text-[9.5px] font-black tracking-wider transition-colors duration-300 select-none"
            fill={activePos === 0 ? "#066AAD" : "#64748B"}
          >
            CDMA
          </text>
          <text
            x="150"
            y="42"
            textAnchor="middle"
            className="font-mono text-[9.5px] font-black tracking-wider transition-colors duration-300 select-none"
            fill={activePos === 1 ? "#F76115" : "#64748B"}
          >
            GSM
          </text>

          {/* ========================================================
              3. RECESSED DIAL WELL & CHROME BEZEL COLLAR
              ======================================================== */}
          {/* Outer Chrome Collar Rim */}
          <circle cx="100" cy="100" r="50" fill="url(#chrome-ring)" stroke="#334155" strokeWidth="1" />
          {/* Inner Recessed Well (Shadow Depth) */}
          <circle cx="100" cy="100" r="44" fill="#0A0F1D" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="41" fill="#0F172A" />

          {/* ========================================================
              4. ROTATING BAKELITE POINTER KNOB (60° Mechanized Swing)
              ======================================================== */}
          <g
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${angle}deg)`,
              transition: "transform 0.24s cubic-bezier(0.34, 1.4, 0.64, 1)",
            }}
            filter="url(#knob-cast-shadow)"
          >
            {/* Knob Circular Base Hub */}
            <circle
              cx="100"
              cy="100"
              r="34"
              fill="url(#knob-body-grad)"
              stroke="#0A0E17"
              strokeWidth="2"
            />
            {/* Grip Ridges on Hub */}
            <circle
              cx="100"
              cy="100"
              r="30"
              fill="none"
              stroke="#334155"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              strokeOpacity="0.5"
            />

            {/* Industrial Molded Cam Lever Handle (Continuous body: Pointer Nose + Tail Grip) */}
            {/* Lever Shadow Underlay */}
            <path
              d="M 91 38 Q 100 34 109 38 L 112 100 L 108 152 Q 100 156 92 152 L 88 100 Z"
              fill="#090D16"
            />
            {/* Main Chamfered Lever Surface */}
            <path
              d="M 92 39 Q 100 35 108 39 L 111 100 L 107 151 Q 100 155 93 151 L 89 100 Z"
              fill="url(#knob-pointer-top)"
              stroke="#475569"
              strokeWidth="0.75"
            />

            {/* High-Contrast White Index Alignment Stripe on Pointer Nose */}
            <rect
              x="98"
              y="42"
              width="4"
              height="18"
              rx="1.5"
              fill="#FFFFFF"
              filter="drop-shadow(0 0 1px rgba(0,0,0,0.6))"
            />

            {/* Center Phillips Fastener Screw */}
            <circle
              cx="100"
              cy="100"
              r="7.5"
              fill="url(#screw-head)"
              stroke="#1E293B"
              strokeWidth="1"
            />
            {/* Phillips Head Cross Slots */}
            <line x1="95.5" y1="100" x2="104.5" y2="100" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="100" y1="95.5" x2="100" y2="104.5" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
      </button>

      {/* Subdued Status Cue */}
      <div className="mt-2 text-center h-5 w-full flex items-center justify-center">
        <span
          className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
            activePos === 0 ? "text-[#38BDF8]" : "text-[#F76115]"
          }`}
        >
          {activePos === 0 ? labelA : labelB}
        </span>
      </div>
    </div>
  );
}
