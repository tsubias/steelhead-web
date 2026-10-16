import React, { useEffect } from "react";
import BlueprintBackground from "../components/beta/BlueprintBackground";
import JobTicketHeader from "../components/beta/JobTicketHeader";
import { JobSpecWarning, JobSpecBackstop } from "../components/beta/JobSpecSection";
import ZeroDownsideSection from "../components/beta/ZeroDownsideSection";
import CarrierSwitcher from "../components/beta/CarrierSwitcher";
import ToolLocker from "../components/beta/ToolLocker";
import WhoBuiltThisSection from "../components/beta/WhoBuiltThisSection";
import NextStepSection from "../components/beta/NextStepSection";
import BetaFooter from "../components/beta/BetaFooter";
import PowerRiser from "../components/beta/riser/PowerRiser";
import Floor from "../components/beta/riser/Floor";
import ShopFront from "../components/beta/riser/ShopFront";

export default function Beta() {
  useEffect(() => {
    document.title = "Beta Field Specification // Steelhead AI";

    // Prevent search engine crawlers from indexing this private/invite-only beta page
    let metaRobots = document.querySelector('meta[name="robots"]');
    let created = false;
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
      created = true;
    }
    const previousContent = metaRobots.getAttribute("content");
    metaRobots.setAttribute("content", "noindex, nofollow");

    return () => {
      if (created) {
        metaRobots.remove();
      } else if (previousContent) {
        metaRobots.setAttribute("content", previousContent);
      } else {
        metaRobots.removeAttribute("content");
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F3EEE1] text-[#101828] flex flex-col items-center selection:bg-[#F76115] selection:text-white relative overflow-x-hidden">
      {/* Global Fixed Layer: Warm Gray Sand Canvas with 48px CAD Grid & Millimeter Dots */}
      <BlueprintBackground />

      {/* Main Raceway & Building Elevation Container */}
      <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-8 relative z-10">
        <PowerRiser>
          {/* ======================================================== */}
          {/* ROOF: JOB TICKET HEADER (Service Drop & Main Breaker)    */}
          {/* ======================================================== */}
          <Floor id="ticket">
            <JobTicketHeader />
          </Floor>

          {/* ======================================================== */}
          {/* FL 07: THE JOB SPEC // HAZARD (Warning & Lead Loss Short) */}
          {/* ======================================================== */}
          <Floor id="warning">
            <JobSpecWarning />
          </Floor>

          {/* ======================================================== */}
          {/* FL 06: THE JOB SPEC // BACKSTOP (Sequential Power-Up)     */}
          {/* ======================================================== */}
          <Floor id="backstop">
            <JobSpecBackstop />
          </Floor>

          {/* ======================================================== */}
          {/* FL 05: ZERO DOWNSIDE (Platform / Foundation Pillars)      */}
          {/* ======================================================== */}
          <Floor id="zero">
            <ZeroDownsideSection />
          </Floor>

          {/* ======================================================== */}
          {/* FL 04: CARRIER SWITCHER (Heavy-Duty Rotary Network Dial)  */}
          {/* ======================================================== */}
          <Floor id="carrier">
            <CarrierSwitcher />
          </Floor>

          {/* ======================================================== */}
          {/* FL 03: TOOL LOCKER (Stacked Tool Chest Compartments)     */}
          {/* ======================================================== */}
          <Floor id="locker">
            <ToolLocker />
          </Floor>

          {/* ======================================================== */}
          {/* FL 02: WHO BUILT THIS & WHY (Pacific Northwest Shop Log) */}
          {/* ======================================================== */}
          <Floor id="who">
            <WhoBuiltThisSection />
          </Floor>

          {/* ======================================================== */}
          {/* FL 01: NEXT STEP (In-Person 15-Minute Setup Run)         */}
          {/* ======================================================== */}
          <Floor id="next">
            <NextStepSection />
          </Floor>

          {/* ======================================================== */}
          {/* GND: GROUND FLOOR FINALE (Your Shop, Open for Calls)      */}
          {/* ======================================================== */}
          <Floor id="ground">
            <ShopFront />
          </Floor>
        </PowerRiser>

        {/* Footer */}
        <div className="w-full max-w-4xl mx-auto mt-6">
          <BetaFooter />
        </div>
      </main>
    </div>
  );
}
