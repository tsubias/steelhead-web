import React, { useState, useEffect, useRef } from "react";
import RotaryDial from "./RotaryDial";
import { useFloorPower } from "./riser/riserContext";

export default function CarrierSwitcher() {
  const [activeNetwork, setActiveNetwork] = useState("verizon"); // 'verizon' or 'att'
  const [showUsMobileHelper, setShowUsMobileHelper] = useState(false);
  const floorPower = useFloorPower();
  const hasAnimatedRef = useRef(false);
  const userInteractedRef = useRef(false);

  // Runner Connection Animation: Dial quickly checks CDMA -> GSM -> CDMA
  useEffect(() => {
    if (floorPower === "lit" && !hasAnimatedRef.current && !userInteractedRef.current) {
      hasAnimatedRef.current = true;

      // 0.2s initial delay, rotate to GSM, hold 450ms, then rotate back to CDMA
      const t1 = setTimeout(() => {
        if (!userInteractedRef.current) {
          setActiveNetwork("att");
        }
      }, 200);

      const t2 = setTimeout(() => {
        if (!userInteractedRef.current) {
          setActiveNetwork("verizon");
        }
      }, 650);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [floorPower]);

  const handleToggle = (posOrNet) => {
    userInteractedRef.current = true;
    if (typeof posOrNet === "number") {
      setActiveNetwork(posOrNet === 0 ? "verizon" : "att");
    } else {
      setActiveNetwork(posOrNet);
    }
  };

  return (
    <section className="mb-12" id="carrier-forwarding">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#066AAD] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#066AAD]">
          INSTRUCTION // CALL FORWARDING
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
      </div>

      {/* Main Switcher Card */}
      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Title and Subtext */}
        <div className="mb-6">
          <div className="inline-block bg-[#EBF5FB] border border-[#066AAD]/40 text-[#066AAD] text-[11px] font-mono font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2">
            USER GUIDE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight mb-2">
            Send Missed Calls to Steelhead
          </h2>
          <div className="text-sm sm:text-base text-[#414651] font-medium leading-relaxed max-w-2xl space-y-1.5">
            <p>Your phone rings first.</p>
            <p>If you don't answer, your carrier forwards the call to your unique Steelhead number.</p>
            <p>Here's how to set it up.</p>
          </div>
        </div>

        {/* =========================================================================
            ANALOG ROTARY SELECTOR / HARDWARE CONTROLLER CHASSIS
            ========================================================================= */}
        <div id="carrier-chassis-top" className="bg-[#1A202C] border-4 border-[#2D3748] rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl relative">
          {/* Chassis Corner Rivets */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E0] border border-[#4A5568] shadow-inner" />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E0] border border-[#4A5568] shadow-inner" />
          <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E0] border border-[#4A5568] shadow-inner" />
          <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E0] border border-[#4A5568] shadow-inner" />

          {/* Rotary Control Header */}
          <div className="flex items-center pb-3 mb-5 border-b border-[#2D3748] px-3 sm:px-1">
            <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              SELECT CARRIER NETWORK
            </span>
          </div>

          {/* Controller Body: Dial on Left, Single Active Network Panel on Right (Stacked on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Left: The Rotary Dial */}
            <div className="md:col-span-5 flex flex-col items-center justify-center py-2 sm:py-3 bg-[#10141D] rounded-xl border border-[#2D3748]/80 shadow-inner">
              <RotaryDial
                position={activeNetwork === "verizon" ? 0 : 1}
                onToggle={(pos) => handleToggle(pos)}
                labelA="VERIZON (CDMA)"
                labelB="AT&T / T-MOBILE (GSM)"
              />
            </div>

            {/* Right: The Single Active Network Selected Panel */}
            <div className="md:col-span-7 flex flex-col justify-center">
              {activeNetwork === "verizon" ? (
                /* ACTIVE PANEL: Verizon (CDMA / WARP) - Steelhead Brand Blue */
                <button
                  key="verizon-panel"
                  type="button"
                  onClick={() => handleToggle("att")}
                  title="Click to switch to GSM network"
                  className="analog-panel-flip w-full min-h-[248px] sm:min-h-[170px] p-4 sm:p-5 rounded-xl border-2 border-[#066AAD] bg-[#2D3748] shadow-lg shadow-[#066AAD]/25 ring-1 ring-[#066AAD] text-left transition-all cursor-pointer hover:bg-[#344054] group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#066AAD] shadow-[0_0_8px_#38BDF8] animate-pulse" />
                      <span className="font-mono text-xs font-black text-[#38BDF8] tracking-wide">
                        CDMA / WARP
                      </span>
                    </div>

                    <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
                      Verizon Network
                    </div>
                    <div className="text-xs sm:text-sm text-[#CBD5E0] mt-1 font-medium leading-relaxed min-h-[72px] sm:min-h-[40px]">
                      Verizon • Visible • Xfinity Mobile • US Mobile Warp
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#4A5568]/60 flex items-center justify-between text-[11px] font-mono text-[#A0AEC0]">
                    <span>Turn dial or click to switch</span>
                    <span className="text-[#F76115] font-bold group-hover:translate-x-0.5 transition-transform">
                      SWITCH TO GSM ➔
                    </span>
                  </div>
                </button>
              ) : (
                /* ACTIVE PANEL: AT&T / T-Mobile (GSM / LIGHTSPEED) - Steelhead Brand Orange */
                <button
                  key="att-panel"
                  type="button"
                  onClick={() => handleToggle("verizon")}
                  title="Click to switch to CDMA network"
                  className="analog-panel-flip w-full min-h-[248px] sm:min-h-[170px] p-4 sm:p-5 rounded-xl border-2 border-[#F76115] bg-[#2D3748] shadow-lg shadow-[#F76115]/25 ring-1 ring-[#F76115] text-left transition-all cursor-pointer hover:bg-[#344054] group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F76115] shadow-[0_0_8px_#F76115] animate-pulse" />
                      <span className="font-mono text-xs font-black text-[#F76115] tracking-wide">
                        GSM / LIGHTSPEED
                      </span>
                    </div>

                    <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
                      AT&amp;T / T-Mobile Network
                    </div>
                    <div className="text-xs sm:text-sm text-[#CBD5E0] mt-1 font-medium leading-relaxed min-h-[72px] sm:min-h-[40px]">
                      AT&amp;T • T-Mobile • Cricket • Mint Mobile • Google Fi • US Mobile Light Speed
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#4A5568]/60 flex items-center justify-between text-[11px] font-mono text-[#A0AEC0]">
                    <span>Turn dial or click to switch</span>
                    <span className="text-[#38BDF8] font-bold group-hover:translate-x-0.5 transition-transform">
                      SWITCH TO CDMA ➔
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MECHANICAL INSPECTION VIEWPORT WINDOW
            ========================================================================= */}
        <div id="carrier-instructions-viewport" className="bg-[#10141D] border-4 border-[#2D3748] rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          {/* Viewport Top Bezel: Network title on line 1, Carriers below on line 2, Muted phone visual top right */}
          <div className="flex items-start justify-between gap-3 pb-3 mb-5 border-b border-zinc-800">
            <div className="flex-1 min-w-0">
              {/* Line 1: Indicator dot + Network Title */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 shrink-0 ${
                    activeNetwork === "verizon"
                      ? "bg-[#066AAD] shadow-[0_0_8px_#38BDF8]"
                      : "bg-[#F76115] shadow-[0_0_8px_#F76115]"
                  }`}
                />
                <span className="font-mono text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                  {activeNetwork === "verizon" ? "VERIZON NETWORK" : "AT&T / T-MOBILE NETWORK"}
                </span>
              </div>

              {/* Line 2: Carriers list below the title */}
              <div className="mt-1 text-[11px] sm:text-xs font-mono text-zinc-400 min-h-[54px] sm:min-h-[20px] leading-relaxed">
                <span className="text-zinc-500 font-bold uppercase tracking-wider mr-1.5">CARRIERS:</span>
                <span>
                  {activeNetwork === "verizon"
                    ? "Verizon, Visible, Xfinity Mobile, US Mobile Warp"
                    : "AT&T, T-Mobile, Cricket, Mint Mobile, Google Fi, US Mobile Light Speed"}
                </span>
              </div>
            </div>

            {/* Top Right: Clean Muted Phone Hardware Visual */}
            <div
              className="shrink-0 w-8 h-8 rounded-lg bg-black/40 border border-zinc-800 text-zinc-400 flex items-center justify-center select-none"
              title="Conditional Call Forwarding"
            >
              <svg
                className="w-4 h-4 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </div>

          {/* Viewport Interior Content */}
          <div key={activeNetwork} className="analog-panel-flip">
            {activeNetwork === "verizon" ? (
              /* PANEL A: Verizon Network */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Turn On Box */}
                <div className="bg-[#0A0D14] border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-inner min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        ● TURN ON FORWARDING
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 mb-2 font-medium">
                      Dial code:
                    </div>
                    <div className="bg-black border border-zinc-700/80 rounded-lg p-2.5 sm:p-3 font-mono text-sm sm:text-lg font-black tracking-wider mb-2 flex items-center gap-1 sm:gap-1.5 select-all">
                      <span className="text-emerald-400 font-black">*71</span>
                      <span className="text-zinc-500 font-semibold text-[10px] sm:text-sm tracking-normal whitespace-nowrap">
                        [YOUR STEELHEAD NUMBER]
                      </span>
                    </div>
                  </div>

                  <div className="w-full py-2 px-3 bg-[#161B26] text-zinc-400 rounded-lg font-mono text-[11px] font-medium border border-zinc-800 flex items-center gap-2">
                    <span className="text-emerald-500/80 text-xs">●</span>
                    <span>Copy/paste instructions given on setup.</span>
                  </div>
                </div>

                {/* Turn Off Box */}
                <div className="bg-[#0A0D14] border-2 border-zinc-700 rounded-xl p-4 flex flex-col justify-between shadow-inner min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                        ○ TURN OFF FORWARDING
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 mb-2 font-medium">
                      Dial code:
                    </div>
                    <div className="bg-black border border-zinc-700/80 rounded-lg p-2.5 sm:p-3 font-mono text-sm sm:text-lg font-black text-zinc-200 tracking-wider mb-2 flex items-center select-all">
                      <span>*73</span>
                    </div>
                  </div>

                  <div className="w-full py-2 px-3 bg-[#161B26] text-zinc-400 rounded-lg font-mono text-[11px] font-medium border border-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-500 text-xs">○</span>
                    <span>Restores default voicemail function.</span>
                  </div>
                </div>
              </div>
            ) : (
              /* PANEL B: AT&T / T-Mobile Network */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Turn On Box */}
                <div className="bg-[#0A0D14] border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-inner min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        ● TURN ON FORWARDING
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 mb-2 font-medium">
                      Dial code:
                    </div>
                    <div className="bg-black border border-zinc-700/80 rounded-lg p-2.5 sm:p-3 font-mono text-sm sm:text-lg font-black tracking-wider mb-2 flex items-center gap-1 sm:gap-1.5 select-all">
                      <span className="text-emerald-400 font-black">**61*</span>
                      <span className="text-zinc-500 font-semibold text-[10px] sm:text-sm tracking-normal whitespace-nowrap">
                        [YOUR STEELHEAD NUMBER]
                      </span>
                      <span className="text-emerald-400 font-black">#</span>
                    </div>
                  </div>

                  <div className="w-full py-2 px-3 bg-[#161B26] text-zinc-400 rounded-lg font-mono text-[11px] font-medium border border-zinc-800 flex items-center gap-2">
                    <span className="text-emerald-500/80 text-xs">●</span>
                    <span>Copy/paste instructions given on setup.</span>
                  </div>
                </div>

                {/* Turn Off Box */}
                <div className="bg-[#0A0D14] border-2 border-zinc-700 rounded-xl p-4 flex flex-col justify-between shadow-inner min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                        ○ TURN OFF FORWARDING
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 mb-2 font-medium">
                      Dial code:
                    </div>
                    <div className="bg-black border border-zinc-700/80 rounded-lg p-2.5 sm:p-3 font-mono text-sm sm:text-lg font-black text-zinc-200 tracking-wider mb-2 flex items-center select-all">
                      <span>##61#</span>
                    </div>
                  </div>

                  <div className="w-full py-2 px-3 bg-[#161B26] text-zinc-400 rounded-lg font-mono text-[11px] font-medium border border-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-500 text-xs">○</span>
                    <span>Restores default voicemail function.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Helper: How to tell which US Mobile network you're on */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowUsMobileHelper(!showUsMobileHelper)}
            className="w-full py-3 px-4 bg-[#FAF7F2] hover:bg-[#E6DBC2]/50 border-2 border-[#D6C39B] rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer shadow-sm"
          >
            <span className="text-xs sm:text-sm font-mono font-bold text-[#101828] flex items-center gap-2">
              <span className="text-[#F76115] text-base">ℹ</span>
              How to tell which US Mobile network you're on
            </span>
            <span className="text-[#066AAD] font-mono text-xs font-bold">
              {showUsMobileHelper ? "▲ HIDE" : "▼ SHOW"}
            </span>
          </button>

          {showUsMobileHelper && (
            <div className="mt-2.5 p-4 sm:p-5 bg-white border-2 border-[#D6C39B] rounded-xl text-xs sm:text-sm text-[#414651] space-y-2.5 shadow-md">
              <p className="font-bold text-[#101828]">
                US Mobile operates on multiple underlying networks. Here’s how to tell which one you’re on:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-[#414651] font-medium">
                <li>
                  <strong className="text-[#101828]">In the US Mobile app:</strong> Open your line and look for{" "}
                  <strong className="text-[#066AAD]">Warp (Verizon)</strong> or{" "}
                  <strong className="text-[#F76115]">Light Speed (GSM / T-Mobile)</strong>.
                </li>
                <li>
                  <strong className="text-[#101828]">In your phone’s settings:</strong> Check for your Carrier information under Cellular / About.
                </li>
                <li>
                  <strong className="text-[#101828]">SIM card color:</strong> Black = Verizon, White = T-Mobile, Red = AT&amp;T.
                </li>
                <li>
                  <strong className="text-[#101828]">Worst case:</strong> Try one and test it.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
