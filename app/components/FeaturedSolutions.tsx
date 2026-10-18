"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// --- Hook: aparece una sola vez al entrar en pantalla ---
const useReveal = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

// --- Contenedor común de tarjeta: contenido centrado, pie con logo opcional + flecha ---
const Card = ({
  href,
  footer,
  decoration,
  alignTop = false,
  dark = false,
  className = "",
  children,
}: {
  href: string;
  footer?: ReactNode;
  decoration?: ReactNode;
  alignTop?: boolean; // título fijo arriba (alinea títulos entre tarjetas)
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  const { ref, visible } = useReveal();
  return (
    <Link
      href={href}
      ref={ref}
      data-card
      className={`group snap-center shrink-0 relative overflow-hidden rounded-[2rem] p-8 md:p-12 flex flex-col gap-8 h-[600px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#111111] ${dark ? "bg-[#111111] text-white" : "bg-white text-[#111111]"} ${className}`}
    >
      {decoration}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center ${alignTop ? "justify-start pt-2 md:pt-4" : "justify-center"} text-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {children}
      </div>
      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>{footer}</div>
        <span
          aria-hidden
          className={`w-11 h-11 rounded-full flex items-center justify-center ${dark ? "bg-white/10 text-white group-hover:bg-white group-hover:text-[#111111]" : "bg-[#F5F5F7] text-[#111111] group-hover:bg-[#111111] group-hover:text-white"}`}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
};

// --- Sistema tipográfico común: contexto → mensaje grande → apoyo ---
const HERO =
  "font-sora font-semibold tracking-tighter leading-[0.95] text-[3rem] sm:text-[4.5rem] md:text-[5.5rem]";

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-9 md:mb-10 text-base md:text-lg font-medium">{children}</p>
);

const Support = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 text-base md:text-lg opacity-60">{children}</p>
);

// gradient: rojo → violeta → azul sobre número + unidad; la unidad baja a la línea base
// Degradado grafito vertical (estilo Apple): oscuro arriba, gris pizarra abajo
const SLATE_GRADIENT = "linear-gradient(180deg, #1A1E24 0%, #434B56 50%, #8A95A3 100%)";

// Degradado AiGOR oficial (mismo que --aigor-gradient en la landing de Elevia)
const RANGE_GRADIENT = "linear-gradient(100deg, #FF270A 0%, #c22c98 38%, #9333EA 68%, #2563EB 100%)";

const Big = ({ value, unit, gradient = false }: { value: string; unit?: string; gradient?: boolean }) =>
  gradient ? (
    <div
      className={`inline-flex items-baseline ${HERO} font-bold bg-clip-text text-transparent`}
      style={{ backgroundImage: RANGE_GRADIENT }}
    >
      <span>{value}</span>
      {unit && <span className="text-2xl md:text-3xl tracking-tight ml-1 pr-[0.05em]">{unit}</span>}
    </div>
  ) : (
    <div
      className={`inline-flex items-start ${HERO} bg-clip-text text-transparent pb-[0.08em]`}
      style={{ backgroundImage: SLATE_GRADIENT }}
    >
      <span>{value}</span>
      {unit && <span className="text-2xl md:text-3xl tracking-tight mt-1 md:mt-2 ml-1.5">{unit}</span>}
    </div>
  );

// --- Logo AiGOR: cuadro negro con borde en degradado AiGOR ---
const AigorLogo = ({ className = "" }: { className?: string }) => (
  <div
    role="img"
    aria-label="AiGOR RNA Technology"
    className={`p-[4px] rounded-[1.4rem] md:rounded-[1.6rem] ${className}`}
    style={{ background: "linear-gradient(135deg, #FF270A 0%, #c22c98 45%, #9333EA 75%, #2563EB 100%)" }}
  >
    <div className="w-[7.5rem] h-[7.5rem] md:w-36 md:h-36 rounded-[calc(1.4rem-4px)] md:rounded-[calc(1.6rem-4px)] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <span className="font-sora font-extrabold tracking-tighter leading-none text-[2rem] md:text-[2.4rem] text-white">
        AiGOR
      </span>
      <span className="mt-2 font-sora font-bold uppercase tracking-[0.18em] text-[7.5px] md:text-[9px] text-[#FF270A]">
        RNA Technology
      </span>
    </div>
  </div>
);

// Mensaje grande con degradado grafito. El span con box-decoration-clone
// repite el degradado en cada línea (ej. "Same / shift."), como en la referencia.
const GradientHero = ({ children }: { children: ReactNode }) => (
  <p className={HERO}>
    <span
      className="bg-clip-text text-transparent [box-decoration-break:clone] [-webkit-box-decoration-break:clone] pb-[0.12em] pr-[0.04em]"
      style={{ backgroundImage: SLATE_GRADIENT }}
    >
      {children}
    </span>
  </p>
);

export default function FeaturedSolutions() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isScrolling = useRef(false);

  const checkScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Anchos distintos: avanza tarjeta por tarjeta según su posición real
  const scroll = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el || isScrolling.current) return;
    isScrolling.current = true;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const center = el.scrollLeft + el.clientWidth / 2;
    const centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    let current = 0;
    centers.forEach((c, i) => {
      if (Math.abs(c - center) < Math.abs(centers[current] - center)) current = i;
    });
    const target = Math.min(Math.max(current + (direction === "right" ? 1 : -1), 0), cards.length - 1);
    const card = cards[target];
    el.scrollTo({
      left: target === 0 ? 0 : card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2,
      behavior: "smooth",
    });
    setTimeout(() => {
      isScrolling.current = false;
      checkScroll();
    }, 500);
  };

  const edgePadding = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";
  const btn =
    "w-12 h-12 md:w-14 md:h-14 bg-gray-400/20 backdrop-blur-md border border-gray-400/20 rounded-full flex items-center justify-center text-gray-600 transition-opacity duration-300";

  const spoilageTargets = [
    "100+ acidophilic bacteria",
    "Preservative-resistant yeasts",
    "Brettanomyces spp.",
    "100+ yeasts & molds",
  ];

  return (
    <section className="bg-[#F5F5F7] pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111111] font-sora tracking-tight leading-[1.1]">
            Featured solutions
          </h2>
          <Link
            href="/solutions" /* TODO: URL real */
            className="shrink-0 inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-[#111111] hover:underline underline-offset-4 outline-none focus-visible:underline"
          >
            All solutions <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>

      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-28 md:pb-16 no-scrollbar"
          style={{ paddingLeft: edgePadding, paddingRight: edgePadding }}
        >
          {/* 0 — AiGOR */}
          <Card href="/technology/aigor" /* TODO: URL real */ className="w-[85vw] md:w-[560px]">
            <AigorLogo className="mb-8 md:mb-10" />
            <GradientHero>Ultra-fast.</GradientHero>
            <Support>Results within the same shift.</Support>
          </Card>

          {/* 1 — ELEVIA 1.1 (ancha) */}
          <Card
            href="/products/elevia-1-1" /* TODO: URL real */
            className="w-[85vw] md:w-[720px]"
          >
            <Eyebrow>Salmonella results in</Eyebrow>
            <div className="flex flex-wrap items-end justify-center gap-x-12 gap-y-6">
              <div>
                <Big value="3–6" unit="h" gradient />
                <Support>in environmental samples</Support>
              </div>
              <div className="hidden sm:block w-px h-28 bg-[#111111]/10" />
              <div>
                <Big value="7–10" unit="h" gradient />
                <Support>in finished product</Support>
              </div>
            </div>
            <Image
              src="/aoac_elevia11.png"
              alt="AOAC Performance Tested Method certification"
              width={160}
              height={64}
              className="mt-10 md:mt-12 h-12 md:h-16 w-auto"
            />
          </Card>

          {/* 2 — CAMARÓN */}
          <Card href="/solutions/seafood" /* TODO: URL real */ alignTop className="w-[85vw] md:w-[440px]">
            <Eyebrow>Salmonella testing in shrimp</Eyebrow>
            <GradientHero>
              Same
              <br />
              shift.
            </GradientHero>
            <Support>Results before the shift ends.</Support>
            <span aria-hidden className="mt-6 text-5xl md:text-6xl leading-none select-none">🦐</span>
          </Card>

          {/* 3 — SPOILAGE */}
          <Card href="/solutions/beverage-spoilage" /* TODO: URL real */ alignTop className="w-[85vw] md:w-[480px]">
            <Eyebrow>Beverage spoilage testing</Eyebrow>
            <Big value="4" unit="in 1" />
            <Support>spoilage threats in one PCR reaction</Support>
            <ul className="mt-8 w-full max-w-[300px] flex flex-col gap-2">
              {spoilageTargets.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-white border-[1.5px] border-[#FF270A] px-4 py-2 text-sm font-semibold text-[#111111] text-center whitespace-nowrap"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          {/* 4 — LABORATORY SERVICES (ancha) */}
          <Card href="/laboratory-services" /* TODO: URL real */ alignTop className="w-[85vw] md:w-[620px]">
            <Eyebrow>The future of laboratory services</Eyebrow>
            <div>
              <GradientHero>Same-day</GradientHero>
              <Support>results for pathogens</Support>
            </div>
            <div className="my-8 md:my-10 h-[2px] w-full max-w-[320px] rounded-full" style={{ background: RANGE_GRADIENT }} />
            <div>
              <GradientHero>AI-powered</GradientHero>
              <Support>data analysis</Support>
            </div>
          </Card>
          <div className="shrink-0 w-[1px]" />
        </div>

        {/* Botones escritorio */}
        <button aria-label="Previous" onClick={() => scroll("left")}
          className={`hidden md:flex absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 z-30 ${btn} ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button aria-label="Next" onClick={() => scroll("right")}
          className={`hidden md:flex absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 z-30 ${btn} ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Botones celular */}
        <div className="flex md:hidden absolute bottom-6 right-6 z-30 gap-3">
          <button aria-label="Previous" onClick={() => scroll("left")}
            className={`${btn} ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button aria-label="Next" onClick={() => scroll("right")}
            className={`${btn} ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
