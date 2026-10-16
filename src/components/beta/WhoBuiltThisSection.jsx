import React, { useState, useEffect } from "react";
import { useFloorPower } from "./riser/riserContext";

const TERMINAL_TEXT = "Helping with missed calls is only the start. Seriously, ask to see our backlog.";

export default function WhoBuiltThisSection() {
  const status = useFloorPower();
  const isLit = status === "lit";
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!isLit) {
      setTypedCount(0);
      return;
    }

    // 8s reading/scanning delay (calculated from ~144 words in this section at half-scanning pace)
    const timeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setTypedCount(current);
        if (current >= TERMINAL_TEXT.length) {
          clearInterval(interval);
        }
      }, 45); // ~3.5s total typing duration (twice previous speed)

      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isLit]);

  return (
    <section className="mb-12">
      {/* Section Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-1.5 bg-[#066AAD] rounded-full" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#066AAD]">
          SECTION 04 // BUILDERS &amp; ORIGIN
        </span>
        <div className="h-[1px] flex-1 bg-[#D6C39B]" />
        <span className="text-[10px] font-mono text-[#717680] uppercase">
          [PACIFIC NORTHWEST]
        </span>
      </div>

      <div className="bg-white border-2 border-[#D6C39B] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Origin Stamp Badge with 3D Shop Sign Flip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#E6DBC2]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
            Who Built This &amp; Why
          </h2>

          <div className="relative" style={{ perspective: "600px" }}>
            <div
              className="relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transformStyle: "preserve-3d",
                transform: isLit ? "rotateX(0deg)" : "rotateX(-180deg)",
              }}
            >
              {/* Front side (Lit): 🌲 OREGON, USA // SELF-FUNDED */}
              <div
                className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D6C39B] px-3 py-1 rounded-md text-xs font-mono text-[#F76115] font-bold shadow-sm"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span>🌲</span>
                <span>OREGON, USA // SELF-FUNDED</span>
              </div>

              {/* Back side (Unlit): [ LOCATION // FUNDING ] */}
              <div
                className="absolute inset-0 inline-flex items-center justify-center bg-[#F4EFE6] border border-[#D6C39B]/80 px-3 py-1 rounded-md text-xs font-mono text-[#717680] font-bold shadow-xs whitespace-nowrap"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              >
                <span>[ LOCATION // FUNDING ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verbatim Narrative Copy in Crisp Sunlight-Legible Contrast */}
        <div className="space-y-5 text-[#252B37] text-base sm:text-lg leading-relaxed font-normal">
          <p>
            Steelhead isn't funded by venture capital or built by a faceless conglomerate. It’s a US business, based in Oregon, building for US customers.
          </p>

          {/* Callout Highlight Card for Thomas & Luke */}
          <div className="bg-[#FAF7F2] border-l-4 border-[#066AAD] border-y border-r border-[#E6DBC2] rounded-r-xl p-5 my-4 shadow-sm">
            <p className="text-xl font-extrabold text-[#101828] mb-2">
              It’s two guys: Thomas and Luke.
            </p>
            <p className="text-[#414651] text-base font-medium">
              We’ve built software together for over five years. Thomas runs product and marketing. Luke handles software development.
            </p>
          </div>

        {/* Desktop Side-by-Side: Narrative + Call Log Phone Mockup */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
          {/* Left Column: 5 Narrative Paragraphs + Terminal Teletype */}
          <div className="md:col-span-7 space-y-5 text-[#252B37] text-base sm:text-lg leading-relaxed font-normal">
            <p>
              We aren’t building Steelhead from an MBA slide deck.
            </p>
            <p>
              We are building Steelhead because we hire and know solo contractors like you. We appreciate the guy who owns the business, does the work, and stakes his name on the quality.
            </p>
            <p>
              But we also know how hard it is for solo operators to both work and run the business.
            </p>
            <p>
              The big software outfits build solutions for 10-truck fleets with full-time dispatchers, geo-trackers, inventory control, and more. We don’t want the big shops.
            </p>
            <p>
              Steelhead is built exclusively for the solo contractor running his business from the cab of his work truck.
            </p>

            {/* CRT Terminal Teletype with Prompt Block */}
            <div className="bg-[#1A202C] text-[#F76115] border-2 border-zinc-700 rounded-xl p-4 font-mono text-sm sm:text-base font-bold shadow-inner flex items-baseline gap-2 min-h-[58px] mt-6">
              <span className="text-zinc-500 select-none">&gt;</span>
              <div className="flex-1">
                <span>{isLit ? TERMINAL_TEXT.slice(0, typedCount) : ""}</span>
                <span className="inline-block w-2.5 h-4.5 bg-[#F76115] terminal-cursor align-middle ml-1" />
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup Frame (Call History) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[270px]">
              <div className="relative bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] p-2.5 sm:p-3 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.15)] border-2 border-slate-600/70">
                {/* Dynamic Island Pill */}
                <div className="w-20 h-4 bg-[#0F172A] rounded-full mx-auto absolute top-4 sm:top-4.5 left-1/2 -translate-x-1/2 z-20 border border-slate-800 shadow-sm" />
                {/* Screen Display Container */}
                <div className="rounded-[2rem] overflow-hidden bg-black relative aspect-[1170/2532] border border-slate-900 shadow-inner">
                  <img
                    src="/images/product-call-log.png"
                    alt="Steelhead call log showing contractor inquiries and bookings"
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

        {/* Mobile Stack: Narrative -> Phone Mockup -> Terminal Teletype */}
        <div className="block md:hidden space-y-5 text-[#252B37] text-base leading-relaxed font-normal pt-2">
          <p>
            We aren’t building Steelhead from an MBA slide deck.
          </p>
          <p>
            We are building Steelhead because we hire and know solo contractors like you. We appreciate the guy who owns the business, does the work, and stakes his name on the quality.
          </p>
          <p>
            But we also know how hard it is for solo operators to both work and run the business.
          </p>
          <p>
            The big software outfits build solutions for 10-truck fleets with full-time dispatchers, geo-trackers, inventory control, and more. We don’t want the big shops.
          </p>
          <p>
            Steelhead is built exclusively for the solo contractor running his business from the cab of his work truck.
          </p>

          {/* Centered Phone Mockup */}
          <div className="pt-2 pb-2">
            <div className="relative mx-auto w-full max-w-[270px]">
              <div className="relative bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] p-2.5 rounded-[2.5rem] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.15)] border-2 border-slate-600/70">
                {/* Dynamic Island Pill */}
                <div className="w-20 h-4 bg-[#0F172A] rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2 z-20 border border-slate-800 shadow-sm" />
                {/* Screen Container */}
                <div className="rounded-[2rem] overflow-hidden bg-black relative aspect-[1170/2532] border border-slate-900 shadow-inner">
                  <img
                    src="/images/product-call-log.png"
                    alt="Steelhead call log showing contractor inquiries and bookings"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                    decoding="sync"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* CRT Terminal Teletype with Prompt Block */}
          <div className="bg-[#1A202C] text-[#F76115] border-2 border-zinc-700 rounded-xl p-4 font-mono text-sm font-bold shadow-inner flex items-baseline gap-2 min-h-[58px]">
            <span className="text-zinc-500 select-none">&gt;</span>
            <div className="flex-1">
              <span>{isLit ? TERMINAL_TEXT.slice(0, typedCount) : ""}</span>
              <span className="inline-block w-2.5 h-4.5 bg-[#F76115] terminal-cursor align-middle ml-1" />
            </div>
          </div>
        </div>
        </div>

        {/* Stamped Certification Footer */}
        <div className="mt-8 pt-4 border-t border-[#E6DBC2] flex items-center text-xs font-mono text-[#717680] font-bold">
          <span>BUILT FOR THE TRUCK CAB OFFICE</span>
        </div>
      </div>
    </section>
  );
}
