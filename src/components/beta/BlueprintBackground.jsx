import React from "react";

/**
 * Clean, tranquil drafting canvas background.
 * Just the Gray Sand canvas (#F3EEE1) with the CAD drafting grid and fine millimeter registration dots.
 * Zero background illustrations, zero text collisions.
 */
export default function BlueprintBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 48px Drafting Grid */}
      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #D6C39B 1px, transparent 1px),
            linear-gradient(to bottom, #D6C39B 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 16px Millimeter Registration Dots */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #B89057 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Subtle Corner Registration Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#A38350] opacity-40">
        + 00.00 / 00.00
      </div>
      <div className="absolute top-4 right-4 font-mono text-[9px] text-[#A38350] opacity-40">
        + 100.00 / 00.00
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#A38350] opacity-40">
        + 00.00 / 100.00
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#A38350] opacity-40">
        + 100.00 / 100.00
      </div>
    </div>
  );
}
