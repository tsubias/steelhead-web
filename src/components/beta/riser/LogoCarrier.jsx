import React from "react";

/**
 * LogoCarrier: Precision-engineered industrial telemetry carrier.
 * Replaces the cartoon robot with a heavy-duty machined emblem housing
 * the Steelhead mark. Travels down the structural EMT conduit, latching
 * into floor junction boxes to close electrical circuits.
 *
 * Poses:
 * - 'idle': Resting on the conduit with active telemetry LED
 * - 'climb': Moving/cruising with directional electromagnetic pulse
 * - 'breaker': Roof main service drop latching sequence (rotary snap)
 * - 'connect': Standard floor circuit connection (90° switch actuation + cyan surge)
 * - 'repair': Section 01 fault bridge (sparks/jitter -> firm lock-in)
 * - 'done': Ground floor finale at the Shop service cabinet
 */
export default function LogoCarrier({ pose = "idle" }) {
  return (
    <div className={`carrier-wrapper carrier--${pose}`}>
      <svg
        className="carrier-svg"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Steelhead Power Signal Carrier"
      >
        <defs>
          {/* Machined Titanium Outer Bezel Gradient */}
          <linearGradient id="carrierBezel" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="30%" stopColor="#334155" />
            <stop offset="70%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Inner Recessed Faceplate Radial Gradient */}
          <radialGradient id="carrierFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="75%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#0B132B" />
          </radialGradient>

          {/* Cyan Circuit Energized Glow */}
          <filter id="carrierCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Orange Steelhead Active Pulse */}
          <filter id="carrierOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Electromagnetic Ring / Halo (Animates while traveling or latching) */}
        <circle
          className="carrier-halo"
          cx="22"
          cy="22"
          r="21"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Heavy-Duty Outer Machined Bezel */}
        <circle cx="22" cy="22" r="19.5" fill="url(#carrierBezel)" stroke="#0F172A" strokeWidth="2" />
        <circle cx="22" cy="22" r="17.5" stroke="#94A3B8" strokeWidth="0.8" opacity="0.4" />

        {/* 4 Precision Alignment Notches / Machined Lugs (12, 3, 6, 9 o'clock) */}
        <rect x="21" y="2" width="2" height="3.5" rx="0.5" fill="#CBD5E1" />
        <rect x="21" y="38.5" width="2" height="3.5" rx="0.5" fill="#CBD5E1" />
        <rect x="2" y="21" width="3.5" height="2" rx="0.5" fill="#CBD5E1" />
        <rect x="38.5" y="21" width="3.5" height="2" rx="0.5" fill="#CBD5E1" />

        {/* Recessed Enamel Faceplate */}
        <circle cx="22" cy="22" r="14.5" fill="url(#carrierFace)" stroke="#101828" strokeWidth="1.2" />

        {/* Subtle Internal Circuit Track Ring */}
        <circle cx="22" cy="22" r="13" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Rotating Rotary Switch Assembly (Carries the Steelhead Emblem) */}
        <g className="carrier-rotor">
          {/* Rotary Switch Indicator Bar / Latch */}
          <rect
            className="carrier-rotor-bar"
            x="8.5"
            y="20.5"
            width="27"
            height="3"
            rx="1.5"
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="0.8"
          />

          {/* Central Steelhead Brand Emblem in High-Visibility Safety Orange */}
          <g transform="translate(22, 22) scale(0.36) translate(-33.4, -28.5)">
            <path
              className="carrier-mark"
              d="M19.6051 4.91932L30.7435 12.4812C31.9811 13.3215 32.299 14.9837 31.4588 16.2213C30.6186 17.4589 28.9563 17.7768 27.7187 16.9366L16.5803 9.37467C13.1839 15.2652 14.918 22.8308 20.611 26.6958L21.0235 26.9759C22.2611 27.8161 22.579 29.4784 21.7388 30.716C20.8986 31.9536 19.2363 32.2715 17.9987 31.4312L17.5862 31.1512C11.8932 27.2862 4.22161 28.4662 0.000106602 33.7966L29.6199 53.9057C35.3129 57.7707 42.9845 56.5907 47.206 51.2603L36.0677 43.6984C34.8301 42.8582 34.5121 41.1959 35.3524 39.9583C36.1926 38.7207 37.8548 38.4028 39.0924 39.243L50.2308 46.8049C53.6272 40.9144 51.8931 33.3488 46.2002 29.4838L45.7876 29.2037C44.55 28.3635 44.2321 26.7013 45.0723 25.4637C45.9126 24.2261 47.5748 23.9082 48.8124 24.7484L49.2249 25.0284C54.9179 28.8934 62.5895 27.7134 66.811 22.383L37.1912 2.2739C31.4982 -1.59108 23.8266 -0.41105 19.6051 4.91932Z"
              fill="#F76115"
            />
          </g>
        </g>

        {/* Micro Telemetry Indicator LEDs */}
        <circle className="carrier-led-top" cx="22" cy="10" r="1.5" fill="#38BDF8" />
        <circle className="carrier-led-bot" cx="22" cy="34" r="1.5" fill="#F76115" />

        {/* Mechanical Contact Sparks (Engaged during latching or fault bridging) */}
        <g className="carrier-sparks">
          <circle className="csp-1" cx="37" cy="22" r="1.5" fill="#FDE047" />
          <circle className="csp-2" cx="39" cy="18" r="1.2" fill="#F76115" />
          <circle className="csp-3" cx="38" cy="26" r="1.3" fill="#38BDF8" />
        </g>
      </svg>
    </div>
  );
}
