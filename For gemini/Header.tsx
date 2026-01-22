"use client";

import { useCTA } from "./CTAProvider";

export default function Header() {
  const { openMeeting } = useCTA();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-[18px] font-extrabold tracking-tight text-[var(--taag-red)]">
          TAAG
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-black/70">
          <a href="#industrial" className="hover:text-black">
            Industrial microbiology
          </a>
          <a href="#custom" className="hover:text-black">
            Customized molecular solutions
          </a>
          <a href="#digital" className="hover:text-black">
            Digital transformation
          </a>
          <a href="#hubs" className="hover:text-black">
            Hubs
          </a>
          <a href="#resources" className="hover:text-black">
            Resources
          </a>
          <a href="#about" className="hover:text-black">
            About
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <div className="text-xs font-semibold text-black/60">
            EN | ES
          </div>

          <button
            onClick={openMeeting}
            className="px-4 py-2 text-[11px] font-extrabold tracking-widest uppercase bg-[var(--taag-red)] text-white"
          >
            Book a Meeting
          </button>
        </div>
      </div>
    </header>
  );
}