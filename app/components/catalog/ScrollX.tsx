"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Minimal, low-noise horizontal-scroll affordance.
 * Wraps any horizontally-scrollable element and shows a small, semi-transparent
 * chevron (with a soft fade) at an edge ONLY when there is more content to scroll
 * that way. Tappable but unobtrusive. Pass the scroll classes via `className`;
 * use `wrapperClassName` for layout/height that the outer relative box needs.
 */
export default function ScrollX({
  children,
  className = "",
  wrapperClassName = "",
}: {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ l: boolean; r: boolean }>({ l: false, r: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdge({ l: scrollLeft > 2, r: scrollLeft + clientWidth < scrollWidth - 2 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      <div ref={ref} className={className}>
        {children}
      </div>

      {/* left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-10 flex items-center justify-start pointer-events-none transition-opacity duration-200 ${edge.l ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <button
          aria-label="Scroll left"
          tabIndex={-1}
          onClick={() => nudge(-1)}
          className="pointer-events-auto relative z-10 ml-0.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-[#111111] shadow-sm flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* right */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-10 flex items-center justify-end pointer-events-none transition-opacity duration-200 ${edge.r ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/70 to-transparent" />
        <button
          aria-label="Scroll right"
          tabIndex={-1}
          onClick={() => nudge(1)}
          className="pointer-events-auto relative z-10 mr-0.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-[#111111] shadow-sm flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
