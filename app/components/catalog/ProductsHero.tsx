"use client";

import { useState, useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import { Sparkles, Workflow, Search } from "lucide-react";

// --- PRODUCTS HERO ---
// Standalone hero: title + standfirst + 3 nav buttons. The title plays one sequence on scroll-into-view
// (replays on re-entry):
//   1. "Discover" — a real optical magnifier: a circular lens travels across the word and the text under
//      the glass is genuinely enlarged (a scaled copy clipped to a moving circle). The rest stays crisp.
//   2. "workflows" — after the scan (WF_DELAY), the word is built by a workflow animation (line draws,
//      nodes light up in sequence, a token travels, letters reveal).
// Lens build: a non-scaled clip layer (screen-space circle) wraps a scaled child whose transform-origin
// tracks the lens centre, so the visible glass ring and the magnified circle stay aligned.
type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

const NAV_BUTTONS: { label: string; target: string; icon: IconType; keyframe: string }[] = [
  { label: "Highlights of our products", target: "highlights", icon: Sparkles, keyframe: "hlpop" },
  { label: "Build workflows", target: "workflow", icon: Workflow, keyframe: "hlwiggle" },
  { label: "Browse products", target: "catalog", icon: Search, keyframe: "hlnudge" },
];

const DISC_WORD = "Discover";
const WF_WORD = "workflows";
const WF_NODES = [0, 33, 66, 100];
const WF_DELAY = 2.05; // seconds — workflows build starts after the Discover lens scan (~2.0s)
const SUB_DELAY = 3.4;  // standfirst fades in after the whole title sequence (~3.3s)
const BTN_DELAY = 3.7;  // nav buttons fade in just after the standfirst

export default function ProductsHero() {
  const [playTitle, setPlayTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // One trigger for the whole hero: title sequence (Discover lens → workflows build), then the
    // standfirst and buttons fade in after it. Replays every time the title scrolls into view.
    const titleObs = new IntersectionObserver(([entry]) => setPlayTitle(entry.isIntersecting), { threshold: 0.6 });
    if (titleRef.current) titleObs.observe(titleRef.current);

    return () => { titleObs.disconnect(); };
  }, []);

  const scrollToId = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="text-center mb-20 md:mb-28 max-w-5xl mx-auto">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hlpop { 0% { transform: scale(1); } 45% { transform: scale(1.3); } 100% { transform: scale(1); } }
        @keyframes hlwiggle { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-14deg); } 75% { transform: rotate(14deg); } }
        @keyframes hlnudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        /* --- Discover optical lens. Single source of truth: --lx (centre) and --lr (radius) are animated
           ONCE on the wrapper; the base hole, the clip circle, the zoom origin and the glass ring all read
           the same two variables, so they can never desync (no flickering / vanishing letters). --lr opens
           from 0 at the ends, so the whole lens grows in and out with no blank-hole glitch. --- */
        @property --lx { syntax: "<length-percentage>"; inherits: true; initial-value: 8%; }
        @property --lr { syntax: "<length>"; inherits: true; initial-value: 0px; }
        @keyframes lensVars {
          0%   { --lx: 8%;  --lr: 0px; }
          12%  { --lx: 8%;  --lr: 0.5em; }
          88%  { --lx: 92%; --lr: 0.5em; }
          100% { --lx: 92%; --lr: 0px; }
        }

        @keyframes wfChar { from { opacity: 0; transform: translateY(0.3em); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wfLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes wfNode { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0); } 60% { opacity: 1; transform: translate(-50%,-50%) scale(1.45); } 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes wfToken { 0% { left: 0%; opacity: 1; } 88% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
      `}} />

      <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-snug tracking-tight mb-8 md:mb-10">
        <span className="block">
          {/* "Discover" — real optical magnifier. Only this wrapper is animated (lensVars); every layer
              below reads --lx/--lr, so they stay perfectly locked together. */}
          <span className="relative inline-block" style={playTitle ? { animation: "lensVars 2s ease-in-out both" } : undefined}>
            {/* base text — crisp, with a hard hole punched under the glass so it never shows double */}
            <span
              className="relative z-10"
              style={{
                WebkitMaskImage: "radial-gradient(circle at var(--lx) 46%, transparent var(--lr), #000 var(--lr))",
                maskImage: "radial-gradient(circle at var(--lx) 46%, transparent var(--lr), #000 var(--lr))",
              }}
            >
              {DISC_WORD}
            </span>

            {/* magnified copy clipped to the moving circle (clip on the non-scaled parent = screen space) */}
            <span
              aria-hidden="true"
              className="absolute inset-0 z-20 pointer-events-none select-none"
              style={{
                clipPath: "circle(var(--lr) at var(--lx) 46%)",
                WebkitClipPath: "circle(var(--lr) at var(--lx) 46%)",
              }}
            >
              <span className="block whitespace-nowrap" style={{ transform: "scale(1.6)", transformOrigin: "var(--lx) 46%" }}>
                {DISC_WORD}
              </span>
            </span>

            {/* glass ring + handle — size/border/handle all derive from --lr, so it vanishes when idle */}
            <span
              aria-hidden="true"
              className="absolute top-[46%] z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: "var(--lx)",
                width: "calc(var(--lr) * 2)",
                height: "calc(var(--lr) * 2)",
                borderStyle: "solid",
                borderColor: "#FF270A",
                borderWidth: "calc(var(--lr) * 0.12)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "calc(var(--lr) * -0.5)",
                  bottom: "calc(var(--lr) * 0.08)",
                  width: "calc(var(--lr) * 0.85)",
                  height: "calc(var(--lr) * 0.26)",
                  background: "#FF270A",
                  borderRadius: "calc(var(--lr) * 0.2)",
                  transform: "rotate(45deg)",
                  transformOrigin: "left center",
                }}
              />
            </span>
          </span>{" "}
          products. Build{" "}

          {/* "workflows" — built by a workflow animation, after the scan */}
          <span className="relative inline-block">
            <span className="relative z-10">
              {WF_WORD.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={playTitle ? { animation: `wfChar 0.45s ease-out ${(WF_DELAY + 0.15 + i * 0.05).toFixed(2)}s both` } : { opacity: 0 }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span className="absolute left-0 right-0 -bottom-1 md:-bottom-1.5 h-2 md:h-3 z-0" aria-hidden="true">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-full bg-[#FF270A]/15 rounded-full" />
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-full bg-[#FF270A] rounded-full origin-left"
                style={playTitle ? { animation: `wfLine 1.0s ease-out ${(WF_DELAY + 0.15).toFixed(2)}s both` } : { transform: "scaleX(0)" }}
              />
              {WF_NODES.map((p, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF270A] ring-2 ring-white"
                  style={playTitle
                    ? { left: `${p}%`, animation: `wfNode 0.4s ease-out ${(WF_DELAY + 0.2 + i * 0.22).toFixed(2)}s both` }
                    : { left: `${p}%`, transform: "translate(-50%,-50%) scale(0)" }}
                />
              ))}
              <span
                className="absolute top-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-white border-2 border-[#FF270A] shadow-sm -translate-x-1/2 -translate-y-1/2"
                style={playTitle ? { animation: `wfToken 1.0s ease-in-out ${(WF_DELAY + 0.15).toFixed(2)}s both` } : { opacity: 0, left: "0%" }}
              />
            </span>
          </span>.
        </span>
        <span className="block">Find the best solution.</span>
      </h2>

      <p
        className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto"
        style={playTitle ? { animation: `fadeUp 0.6s ease-out ${SUB_DELAY}s both` } : { opacity: 0 }}
      >
        Browse our products, build the complete detection workflow for your matrix and target, compare specifications side by side, and download the technical documentation you need — all from one place.
      </p>

      {/* NAV BUTTONS — sequential icon animation on scroll-into-view */}
      <div
        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 mt-16 md:mt-20"
        style={playTitle ? { animation: `fadeUp 0.6s ease-out ${BTN_DELAY}s both` } : { opacity: 0 }}
      >
        {NAV_BUTTONS.map((b, i) => {
          const Icon = b.icon;
          return (
            <button
              key={b.target}
              onClick={() => scrollToId(b.target)}
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full bg-white border border-gray-200 text-[#111111] text-[15px] md:text-base font-bold hover:border-[#FF270A] hover:text-[#FF270A] hover:shadow-[0_10px_40px_rgba(255,39,10,0.10)] transition-all"
            >
              <Icon
                className="w-5 h-5 text-[#FF270A] shrink-0"
                style={playTitle ? { animation: `${b.keyframe} 0.6s ease-in-out ${(BTN_DELAY + 0.35 + i * 0.18).toFixed(2)}s both` } : undefined}
              />
              {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
