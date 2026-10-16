import React from "react";
import { useFloorPower } from "./riserContext";

/**
 * ShopFront: the ground-floor finale. A small shop elevation whose sign, window and
 * entry lamp switch on when the Runner connects the last feed.
 */
export default function ShopFront() {
  const status = useFloorPower();
  const lit = status === "lit";

  return (
    <div className={`shop ${lit ? "shop--lit" : ""}`}>
      <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your shop, open for calls">
        {/* Ground */}
        <line x1="0" y1="150" x2="300" y2="150" stroke="#101828" strokeWidth="2" />

        {/* Light cone from the entry lamp */}
        <polygon className="shop-cone" points="180,96 206,96 232,150 154,150" fill="#FDE68A" />

        {/* Building */}
        <rect x="14" y="58" width="272" height="92" fill="#EFE6D0" stroke="#101828" strokeWidth="2" />
        <rect x="8" y="48" width="284" height="12" fill="#D6C39B" stroke="#101828" strokeWidth="2" />

        {/* Sign */}
        <rect x="88" y="64" width="124" height="26" rx="3" fill="#101828" />
        <text className="shop-sign" x="150" y="82" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="800" letterSpacing="2">
          YOUR SHOP
        </text>

        {/* Bay door */}
        <rect x="40" y="96" width="76" height="54" fill="#CBD5E1" stroke="#101828" strokeWidth="1.8" />
        {[104, 112, 120, 128, 136, 144].map((y) => (
          <line key={y} x1="40" y1={y} x2="116" y2={y} stroke="#94A3B8" strokeWidth="1" />
        ))}

        {/* Service panel on the left wall, where the branch feeds in */}
        <line x1="0" y1="112" x2="16" y2="112" stroke="#8C95A1" strokeWidth="5" />
        <line className="shop-feed" x1="0" y1="112" x2="16" y2="112" stroke="#38BDF8" strokeWidth="2" />
        <rect x="16" y="98" width="18" height="28" rx="2" fill="#1E293B" stroke="#101828" strokeWidth="1.6" />
        <circle className="shop-panel-lamp" cx="25" cy="106" r="2.4" />
        <text x="25" y="119" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5.5" fontWeight="700" fill="#CBD5E1">SVC</text>

        {/* Entry door */}
        <rect x="176" y="96" width="34" height="54" fill="#A16B3A" stroke="#101828" strokeWidth="1.8" />
        <circle cx="203" cy="124" r="1.8" fill="#FDE68A" stroke="#101828" strokeWidth="0.8" />

        {/* Gooseneck lamp over the door */}
        <path d="M193 90 L193 86 Q193 82 198 83" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle className="shop-lamp" cx="198" cy="84" r="3" />

        {/* Window with OPEN sign */}
        <rect className="shop-window" x="222" y="98" width="52" height="34" fill="#64748B" stroke="#101828" strokeWidth="1.8" />
        <line x1="248" y1="98" x2="248" y2="132" stroke="#101828" strokeWidth="1" opacity="0.4" />
        <text className="shop-open" x="248" y="120" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="800" letterSpacing="1.5">
          OPEN
        </text>
      </svg>
      <div className="shop-caption">GND // STEELHEAD</div>
    </div>
  );
}
