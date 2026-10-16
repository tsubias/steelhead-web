import React from "react";
import { Link } from "react-router-dom";

export default function BetaFooter() {
  return (
    <footer className="relative w-full pt-8 pb-14 border-t-2 border-[#D6C39B] text-center mt-6">
      <div className="flex flex-col items-center gap-4">
        {/* Brand mark */}
        <div className="flex items-center gap-2.5">
          <img
            src="/steelhead-logo.svg"
            alt="Steelhead"
            className="w-6 h-6 object-contain"
          />
          <span className="text-base font-extrabold text-[#101828] tracking-tight">
            Steelhead AI • Built for the Solo Trade
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#535862]">
          <Link
            to="/terms"
            className="hover:text-[#066AAD] underline underline-offset-4 decoration-[#D6C39B] hover:decoration-[#066AAD] transition-colors"
          >
            Terms of Use
          </Link>
          <span className="text-[#D6C39B]">•</span>
          <Link
            to="/privacy"
            className="hover:text-[#066AAD] underline underline-offset-4 decoration-[#D6C39B] hover:decoration-[#066AAD] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Support */}
        <div className="text-sm text-[#414651] font-medium">
          Need help:{" "}
          <a
            href="mailto:support@steelhead.ai"
            className="text-[#066AAD] hover:text-[#004D7D] font-bold font-mono underline"
          >
            support@steelhead.ai
          </a>{" "}
          or call Thomas.
        </div>

        {/* Copyright notice */}
        <div className="text-[11px] font-mono text-[#717680] pt-2 font-bold tracking-wider uppercase">
          © {new Date().getFullYear()} Steelhead AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
