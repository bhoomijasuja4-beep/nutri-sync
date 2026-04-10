"use client";

import { useState } from "react";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-white z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90 opacity-90" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 text-sm">
        <a
          href="#pricing"
          className="shrink-0 rounded-full bg-white/20 px-4 py-1 text-[13px] font-bold text-white transition-all hover:bg-white/30 hover:scale-105"
        >
          Start Free →
        </a>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="hidden sm:inline text-white/90 text-[13px] font-medium">
            No credit card required.
          </span>
          <span className="text-white text-[14px] sm:text-[15px] font-bold truncate">
            New users get their first week absolutely FREE!
          </span>
          <span className="animate-bounce-slow text-base">🎁</span>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors hover:text-white hover:bg-white/10"
          aria-label="Close banner"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
