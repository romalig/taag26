"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CaseStudy = {
  context: string;
  area: string;
  challenge: string;
  impactBig: string;
  impactLabel: string;
  img: string;
  tag: string;
};

export default function CaseStudies() {
  const cases: CaseStudy[] = useMemo(
    () => [
      {
        context: "Global dairy manufacturer",
        area: "Environmental monitoring",
        challenge:
          "Long holds and delayed release decisions from conventional workflows.",
        impactBig: "−72%",
        impactLabel: "Time-to-release",
        img: "https://images.unsplash.com/photo-1582719471384-894fbb16e024?q=80&w=1600&auto=format&fit=crop",
        tag: "Same-shift decisions",
      },
      {
        context: "Multinational beverage producer",
        area: "Spoilage control",
        challenge:
          "Need rapid screening to prevent spoilage-driven downtime and waste.",
        impactBig: "Same-shift",
        impactLabel: "Microbiological decisions",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1600&auto=format&fit=crop",
        tag: "Operational prevention",
      },
      {
        context: "Ingredient manufacturer",
        area: "Customized strain detection",
        challenge:
          "Proprietary strains require matrix- and strain-specific molecular specificity.",
        impactBig: "Weeks",
        impactLabel: "Design → validation cycle",
        img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop",
        tag: "MILA™ custom assays",
      },
      // Add more cases here (the slider will handle it automatically)
      {
        context: "Global food manufacturer",
        area: "Pathogen screening",
        challenge:
          "Need fast screening to reduce product holds and improve release confidence.",
        impactBig: "Hours",
        impactLabel: "Decision turnaround",
        img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1600&auto=format&fit=crop",
        tag: "Release acceleration",
      },
      {
        context: "Co-manufacturing network",
        area: "Multi-site QA",
        challenge:
          "Results scattered across sites made preventive control inconsistent.",
        impactBig: "Program",
        impactLabel: "Preventive control",
        img: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=1600&auto=format&fit=crop",
        tag: "System-level control",
      },
    ],
    []
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  function updateButtons() {
    const el = scrollerRef.current;
    if (!el) return;

    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;

    setCanLeft(left > 4);
    setCanRight(left < max - 4);
  }

  function scrollByCard(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;

    // Scroll roughly one card width (responsive)
    const card = el.querySelector<HTMLElement>("[data-case-card]");
    const step = card ? card.offsetWidth + 24 : 520;

    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateButtons();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    // Keyboard arrows (when section is on screen and scroller exists)
    const onKey = (e: KeyboardEvent) => {
      if (!scrollerRef.current) return;
      if (e.key === "ArrowLeft") scrollByCard("left");
      if (e.key === "ArrowRight") scrollByCard("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="bg-white py-32 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[var(--taag-red)]">
              Real labs. Real impact.
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              Proven outcomes in industrial microbiology.
            </h2>
            <p className="mt-4 text-sm text-black/80">
              Selected examples where TAAG systems improved time-to-decision,
              confidence, and operational control.
            </p>
          </div>

          {/* Controls (desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous case studies"
              onClick={() => scrollByCard("left")}
              disabled={!canLeft}
              className="h-11 w-11 border border-black/10 text-black/70 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black/20"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next case studies"
              onClick={() => scrollByCard("right")}
              disabled={!canRight}
              className="h-11 w-11 border border-black/10 text-black/70 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black/20"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-16">
          <div
            ref={scrollerRef}
            className="
              flex gap-6 overflow-x-auto pb-6
              snap-x snap-mandatory scroll-smooth
              [-ms-overflow-style:none] [scrollbar-width:none]
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* hide scrollbar (webkit) */}
            <style>{`
              div[data-hide-scrollbar]::-webkit-scrollbar { display: none; }
            `}</style>

            {/* padding edges like Ginkgo */}
            <div className="shrink-0 w-2 md:w-6" />

            {cases.map((c) => (
              <article
                key={`${c.context}-${c.tag}`}
                data-case-card
                className="
                  snap-start shrink-0
                  w-[86%] sm:w-[70%] md:w-[520px]
                  group
                "
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-black/10 bg-white">
                  <img
                    src={c.img}
                    alt={`${c.context} lab`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: "grayscale(100%) brightness(0.92) contrast(1.05)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center border border-black/10 bg-white/90 backdrop-blur px-3 py-1">
                      <span className="text-[10px] font-extrabold tracking-[0.28em] uppercase text-black/70">
                        {c.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-7">
                  <div className="text-xs font-semibold text-black/70">
                    {c.context}
                  </div>
                  <div className="mt-1 text-xs text-black/60">{c.area}</div>

                  <div className="mt-5">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-black/50">
                      Challenge
                    </div>
                    <p className="mt-2 text-sm text-black/80 leading-relaxed">
                      {c.challenge}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-6">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-black/50">
                      Impact
                    </div>
                    <div className="mt-3 text-4xl font-extrabold tracking-tight text-black">
                      {c.impactBig}
                    </div>
                    <div className="mt-1 text-sm text-black/80">
                      {c.impactLabel}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="shrink-0 w-2 md:w-6" />
          </div>

          {/* Small hint (mobile) */}
          <div className="md:hidden mt-2 text-xs text-black/45">
            Swipe to explore more case studies →
          </div>
        </div>

        {/* Legal note */}
        <div className="mt-12 border-t border-black/5 pt-8">
          <p className="text-xs text-black/45 max-w-3xl">
            Metrics shown are representative examples. Final performance depends
            on matrix, sampling design, and implementation scope.
          </p>
        </div>
      </div>
    </section>
  );
}