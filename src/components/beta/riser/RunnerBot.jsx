import React from "react";

/**
 * RunnerBot: small autonomous maintenance robot.
 * Rigid limbs (no elbows/knees), pivots only at shoulders and hips.
 * pose: idle | climb | breaker | repair | connect | done
 */
export default function RunnerBot({ pose = "idle" }) {
  return (
    <svg
      className={`runner-svg runner--${pose}`}
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Legs (rigid, pivot at hips) */}
      <g className="rb-leg-l">
        <rect x="13.5" y="40" width="5" height="11" rx="2" fill="#CBD5E1" stroke="#101828" strokeWidth="1.2" />
        <rect x="12" y="50" width="8" height="4" rx="1.5" fill="#1E293B" stroke="#101828" strokeWidth="1.2" />
      </g>
      <g className="rb-leg-r">
        <rect x="21.5" y="40" width="5" height="11" rx="2" fill="#CBD5E1" stroke="#101828" strokeWidth="1.2" />
        <rect x="20" y="50" width="8" height="4" rx="1.5" fill="#1E293B" stroke="#101828" strokeWidth="1.2" />
      </g>

      {/* Torso */}
      <rect x="11" y="25" width="18" height="15" rx="3" fill="#066AAD" stroke="#101828" strokeWidth="1.4" />
      <rect x="15" y="28" width="10" height="6" rx="1" fill="#0B3B5E" />
      <circle className="rb-chest" cx="20" cy="31" r="1.7" fill="#38BDF8" />
      <line x1="12.5" y1="37.5" x2="27.5" y2="37.5" stroke="#FFF3ED" strokeWidth="1.6" strokeDasharray="3 2" />

      {/* Arms (rigid, pivot at shoulders) */}
      <g className="rb-arm-l">
        <rect x="6.5" y="25" width="5" height="14" rx="2.5" fill="#CBD5E1" stroke="#101828" strokeWidth="1.2" />
        <circle cx="9" cy="40" r="2.4" fill="#F76115" stroke="#101828" strokeWidth="1" />
      </g>
      <g className="rb-arm-r">
        <rect x="28.5" y="25" width="5" height="14" rx="2.5" fill="#CBD5E1" stroke="#101828" strokeWidth="1.2" />
        <circle cx="31" cy="40" r="2.4" fill="#F76115" stroke="#101828" strokeWidth="1" />
        {/* Hand tool, only shown while working */}
        <g className="rb-tool">
          <line x1="31" y1="41" x2="31" y2="47" stroke="#F76115" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="31" y1="47" x2="31" y2="50" stroke="#E2E8F0" strokeWidth="1.3" strokeLinecap="round" />
          <g className="rb-spark">
            <path d="M31 48 L32.2 51 L35 52 L32.2 53 L31 56 L29.8 53 L27 52 L29.8 51 Z" fill="#FDE047" />
          </g>
        </g>
      </g>

      {/* Head */}
      <g className="rb-head">
        <rect x="9" y="15" width="2" height="5" rx="1" fill="#475569" />
        <rect x="29" y="15" width="2" height="5" rx="1" fill="#475569" />
        <rect x="11" y="12.5" width="18" height="10" rx="3" fill="#1E293B" stroke="#101828" strokeWidth="1.4" />
        <rect className="rb-eye" x="14" y="15.5" width="12" height="3.2" rx="1.6" fill="#38BDF8" />
        <rect x="18" y="22.5" width="4" height="2.5" fill="#475569" />
        {/* Hard hat */}
        <path d="M10 11.5 C10 3 30 3 30 11.5 Z" fill="#F76115" stroke="#101828" strokeWidth="1.4" />
        <rect x="8" y="10.8" width="24" height="2.6" rx="1.3" fill="#101828" />
        <circle className="rb-beacon" cx="20" cy="4.6" r="1.5" fill="#FDE047" />
      </g>
    </svg>
  );
}
