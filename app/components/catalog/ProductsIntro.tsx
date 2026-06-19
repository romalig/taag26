"use client";

import { useState, useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import {
  ShieldCheck, Timer, TrendingUp, Dna, Layers, DollarSign, Zap,
  BrainCircuit, RefreshCw, CalendarClock, Sparkles, Boxes,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductsHero from "./ProductsHero";

// --- PRODUCT ECOSYSTEM (customer-facing) ---
// Header (title + standfirst + 3 nav buttons) sits outside the grey card. The word "workflows" in
// the title is built by a small workflow animation (line draws, nodes light up in sequence, a token
// travels through) that replays whenever the title scrolls into view. The grey card matches the
// Workflow / Catalog width and holds the heading + 5 cards (links keyed by id, so order is free).
type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;
type Highlight = { icon: IconType; title: string; subtitle: string };
type ProductFeature = {
  id: string;
  title: string;
  description: string;
  href?: string;
  badge?: string;
  badgeColor?: string;
  highlights?: Highlight[];
  icon?: IconType;
};

const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: "elevia",
    badge: "Same-Day Results",
    badgeColor: "text-gray-800",
    title: "Elevia Line",
    description:
      "Get answers the same day. Powered by AiGOR RNA technology, Elevia kits detect down to 1 CFU without or with a short enrichment.",
    href: "/aigor",
    highlights: [
      { icon: Timer, title: "Results as fast as 3 hours", subtitle: "Skip the long enrichment steps." },
      { icon: TrendingUp, title: "10,000x higher sensitivity", subtitle: "Compared to traditional real-time PCR." },
      { icon: Dna, title: "RNA detection", subtitle: "Targeting active cells." },
    ],
  },
  {
    id: "pcr",
    badge: "Multiplex Detection",
    badgeColor: "text-blue-600",
    title: "Multiplex PCR Kits",
    description:
      "Detect several pathogens in a single workflow. Our Ampliora and Specio kits deliver fast, simple, cost-effecitve and efficient PCR results.",
    href: "/industrial",
    highlights: [
      { icon: Layers, title: "Multiple targets, one reaction", subtitle: "Several pathogens at once." },
      { icon: DollarSign, title: "Lowest cost per reaction", subtitle: "Best value per sample." },
      { icon: Zap, title: "Simplest workflow", subtitle: "Standardized, ready-to-use." },
    ],
  },
  {
    id: "txa",
    badge: "Digital & Automated",
    badgeColor: "text-purple-600",
    title: "TxA Ecosystem",
    description:
      "Run your testing digitally. TxA uses AI to tie your samples, results and reports into one platform.",
    href: "/TxA",
    highlights: [
      { icon: BrainCircuit, title: "AI-powered insights", subtitle: "From data to decisions." },
      { icon: RefreshCw, title: "Automated results", subtitle: "No manual interpretation or transcription." },
      { icon: ShieldCheck, title: "Lab management & QA system", subtitle: "Traceable and audit-ready." },
    ],
  },
  {
    id: "mila",
    badge: "Custom Panels",
    badgeColor: "text-[#FF270A]",
    title: "MILA",
    description:
      "Need to detect something specific? MILA, our AI design engine, builds custom multiplex panels for your targets in weeks.",
    href: "/customized",
    highlights: [
      { icon: CalendarClock, title: "Custom panels in weeks", subtitle: "From target to validated kit." },
      { icon: Sparkles, title: "AI-designed kits", subtitle: "Optimized primers & probes." },
      { icon: Boxes, title: "High multiplex panels", subtitle: "Many targets, one test." },
    ],
  },
  {
    id: "support",
    title: "Expert support, end to end",
    description:
      "You're never on your own. From method selection and validation to onboarding and troubleshooting, our specialists and standardized workflows make sure every result is one you can rely on.",
    icon: ShieldCheck,
  },
];

export default function ProductsIntro() {
  const [isLineVisible, setIsLineVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isScrollingDown = useRef(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      isScrollingDown.current = window.scrollY > lastScrollY.current;
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const threshold = window.innerWidth < 768 ? 0.20 : 0.25;
    const cardObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { if (isScrollingDown.current) setIsLineVisible(true); }
        else setIsLineVisible(false);
      },
      { threshold }
    );
    if (cardRef.current) cardObs.observe(cardRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cardObs.disconnect();
    };
  }, []);

  return (
    <section id="products" className="bg-white pt-24 pb-32 md:pt-32 md:pb-28 overflow-hidden relative">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expandLine { 0% { transform: scaleX(0.01); } 100% { transform: scaleX(1); } }
        @keyframes fadeLine { 0% { opacity: 0; } 10% { opacity: 1; } 70% { opacity: 0.8; } 100% { opacity: 0; } }
        .animate-line-glow {
            animation: expandLine 2s cubic-bezier(0.16, 1, 0.3, 1) forwards, fadeLine 2s linear forwards;
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(0.8); opacity: 0.5; }
        }
        .animate-pulse-ring { animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        <ProductsHero />

        {/* GREY CARD — same width as Workflow / Catalog; glow-line fires on arrival */}
        <div id="highlights" ref={cardRef} className="relative">

          {isLineVisible && (
            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[90%] h-[20px] pointer-events-none z-0">
                <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[20px] opacity-0 animate-line-glow origin-center" />
                <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-[#FF270A] via-[#8b5cf6] to-[#3b82f6] blur-[4px] opacity-0 animate-line-glow origin-center" />
            </div>
          )}

          <div className="relative z-10 w-full bg-[#F4F4F5] rounded-[2rem] md:rounded-[3rem] overflow-hidden pt-20 md:pt-28 pb-32 flex flex-col items-center">

            <div
              className="absolute inset-0 opacity-[0.03] z-0 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#111 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-20 w-[92%] md:w-full md:px-16 mx-auto">

              {/* GREY-CARD HEADING */}
              <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4 md:px-0">
                <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-3 block">
                  PRODUCT HIGHLIGHTS
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight tracking-tight">
                  What Sets Our Products Apart
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
                {PRODUCT_FEATURES.map((solution) => {

                  // --- SUPPORT CARD (full-width, horizontal, faded image) ---
                  if (solution.id === "support") {
                    const IconComponent = solution.icon;
                    return (
                      <div key={solution.id} className="md:col-span-2 bg-white rounded-[2.5rem] px-8 pb-10 pt-[220px] md:p-10 flex flex-col md:flex-row items-center relative overflow-hidden min-h-[280px]">

                          {/* FADED BACKGROUND IMAGE (mobile - top) */}
                          <div className="absolute left-0 top-0 w-full h-[260px] z-0 pointer-events-none md:hidden rounded-t-[2.5rem] overflow-hidden">
                              <Image
                                  src="/support3.png"
                                  alt="TAAG Support Team Mobile"
                                  fill
                                  className="object-cover object-top"
                                  style={{
                                      WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                      maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                  }}
                              />
                          </div>

                          {/* FADED BACKGROUND IMAGE (desktop - right) */}
                          <div className="absolute right-0 top-0 bottom-0 w-[45%] h-full z-0 pointer-events-none hidden md:block rounded-r-[2.5rem] overflow-hidden">
                              <Image
                                  src="/support3.png"
                                  alt="TAAG Support Team"
                                  fill
                                  className="object-cover object-center"
                                  style={{
                                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 45%)',
                                      maskImage: 'linear-gradient(to right, transparent 0%, black 45%)'
                                  }}
                              />
                          </div>

                          {/* CONTENT */}
                          <div className="flex flex-col md:flex-row items-center gap-8 relative z-20 max-w-2xl text-center md:text-left">

                              {/* ICON WITH CONCENTRIC GREEN RINGS */}
                              <div className="relative flex items-center justify-center shrink-0 w-24 h-24">
                                  <div className="absolute border-[3px] border-green-100/40 w-full h-full rounded-full animate-pulse-ring"></div>
                                  <div className="absolute border-[3px] border-green-200/60 w-20 h-20 rounded-full"></div>
                                  <div className="absolute border-[3px] border-green-300/80 w-16 h-16 rounded-full"></div>

                                  {IconComponent && (
                                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center relative z-10 shadow-md shadow-green-600/30">
                                          <IconComponent className="w-6 h-6 text-white" />
                                      </div>
                                  )}
                              </div>

                              <div className="w-full">
                                  <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-3 leading-tight tracking-tight md:max-w-[400px]">
                                     {solution.title}
                                  </h3>
                                  <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal mb-6 md:max-w-[400px]">
                                     {solution.description}
                                  </p>

                              </div>
                          </div>
                      </div>
                    );
                  }

                  // --- ADVANTAGE CARDS (Apple-style minimal) ---
                  return (
                    <div key={solution.id} className="md:col-span-1 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center justify-start text-center relative h-auto min-h-[400px]">

                        {/* 0. TOP BADGE (ADVANTAGE) */}
                        {solution.badge && (
                           <span className={`text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.15em] mb-2 ${solution.badgeColor}`}>
                             {solution.badge}
                           </span>
                        )}

                        {/* 1. Small central image */}
                        <div className="mb-6 flex items-center justify-center h-12">
                           {solution.id === 'pcr' && (
                              <div className="flex items-center justify-center -space-x-1.5 opacity-90">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mix-blend-multiply"></div>
                                <div className="w-4 h-4 rounded-full bg-purple-500 mix-blend-multiply"></div>
                                <div className="w-4 h-4 rounded-full bg-[#FF270A] mix-blend-multiply"></div>
                              </div>
                           )}
                           {solution.id === 'elevia' && (
                              <div className="flex items-center justify-center">
                                <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400">
                                  AiGOR
                                </span>
                              </div>
                           )}
                           {solution.id === 'txa' && (
                              <Image src="/LogoTxANB.png" alt="TxA Logo" width={45} height={45} className="object-contain" />
                           )}
                           {solution.id === 'mila' && (
                              <Image src="/logo_mila.png" alt="MILA Logo" width={42} height={42} className="object-contain" />
                           )}
                        </div>

                        {/* 2. Title */}
                        <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-4 leading-tight tracking-tight">
                           {solution.title}
                        </h3>

                        {/* 3. Benefit-focused copy */}
                        <p className="text-[#111111] text-sm md:text-base leading-relaxed font-normal mb-6 max-w-[380px]">
                           {solution.description}
                        </p>

                        {/* 3b. Top 3 highlights — icon + title + subtitle, stacked */}
                        {solution.highlights && solution.highlights.length > 0 && (
                          <div className="w-full max-w-[380px] flex flex-col gap-5 mb-8">
                            {solution.highlights.map((h, i) => {
                              const Hi = h.icon;
                              return (
                                <div key={i} className="flex flex-col items-center text-center">
                                  <Hi className="w-6 h-6 text-[#FF270A] mb-2" />
                                  <p className="text-sm md:text-[15px] font-bold text-[#111111] leading-tight mb-0.5">{h.title}</p>
                                  <p className="text-xs md:text-[13px] text-gray-500 font-normal leading-snug">{h.subtitle}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 4. Apple-style link */}
                        <Link
                          href={solution.href ?? "#"}
                          className="mt-auto text-[14px] md:text-[15px] text-[#0066cc] hover:underline font-medium flex items-center justify-center transition-colors"
                        >
                          Learn more about {solution.title.replace('.', '')} <span className="text-[10px] ml-1 translate-y-[0.5px] font-bold">&gt;</span>
                        </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
