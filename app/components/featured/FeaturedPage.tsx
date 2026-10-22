"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* ============================================================
   Página "All featured solutions" (/en/featured)
   1. Hero centrado (título en dos tonos + bajada)
   2. Panel gris estilo Apple: título a la izquierda y grilla de
      tarjetas blancas, con mucho aire.
   ============================================================ */

// --- Paleta y tipografía (mismo sistema que FeaturedSolutions.tsx) ---
const SLATE_GRADIENT = "linear-gradient(180deg, #050608 0%, #39414C 30%, #A3AEBB 100%)";
const AIGOR_GRADIENT = "linear-gradient(100deg, #FF270A 0%, #c22c98 38%, #9333EA 68%, #2563EB 100%)";
const HERO = "font-sora font-semibold tracking-tighter leading-[0.95] text-[2.75rem] md:text-[3.5rem]";

// --- Animación "AiGOR orbit" ---
// 1) El círculo central aparece, crece un poco y se asienta.
// 2) Los anillos de puntos salen girando desde el centro, uno tras otro.
// 3) Los anillos siguen girando lentamente.
// Se reinicia cada vez que el panel entra en pantalla, se pausa fuera de
// pantalla y queda estática con "reducir movimiento".
const ORBIT_COLORS: [number, number, number][] = [
  [255, 39, 10], // rojo TAAG
  [194, 44, 152], // magenta
  [147, 51, 234], // violeta
  [37, 99, 235], // azul
];
const RINGS = [
  { r: 0.34, n: 10, size: 3 },
  { r: 0.54, n: 12, size: 4.5 },
  { r: 0.76, n: 14, size: 6.5 },
  { r: 1.0, n: 16, size: 8.5 },
  { r: 1.28, n: 18, size: 10.5 },
  { r: 1.6, n: 20, size: 12.5 },
  { r: 1.95, n: 22, size: 14.5 },
];
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

// Color según el ángulo: recorre la paleta AiGOR alrededor del círculo
const orbitColor = (angle: number) => {
  const u = (((angle / (Math.PI * 2)) % 1) + 1) % 1;
  const x = u * ORBIT_COLORS.length;
  const i = Math.floor(x) % ORBIT_COLORS.length;
  const j = (i + 1) % ORBIT_COLORS.length;
  const f = x - Math.floor(x);
  const a = ORBIT_COLORS[i];
  const b = ORBIT_COLORS[j];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f].map((v) => v | 0);
};

// Escala del círculo central: 0.6 → 1.15 → 1
const coreScale = (t: number) => {
  if (t < 600) return 0.6 + 0.55 * easeOut(t / 600);
  if (t < 1000) return 1.15 - 0.15 * easeInOut((t - 600) / 400);
  return 1;
};

// Cuánto se extiende la animación por detrás de las tarjetas (px)
const OVERLAP_MOBILE = 80;
const OVERLAP_DESKTOP = 150;

const InnovationField = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const logoEl = logoRef.current;
    if (!wrap || !canvas || !logoEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let overlap = 0;
    let raf = 0;
    let running = false; // hay un ciclo de dibujo activo
    let started = false; // la secuencia ya arrancó (el título apareció)
    let inView = false; // el área de la animación está en pantalla
    let t0 = 0;
    let lastT = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      overlap = w < 768 ? OVERLAP_MOBILE : OVERLAP_DESKTOP;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      lastT = t;
      ctx.clearRect(0, 0, w, h);
      if (t < 0) {
        logoEl.style.opacity = "0"; // aún no arranca: lienzo vacío
        return;
      }

      const visibleH = h - overlap; // zona sobre las tarjetas
      const cx = w / 2;
      const cy = visibleH / 2;
      const unit = visibleH * 0.5;
      const s = t / 1000;
      const density = w < 768 ? 0.6 : 1; // menos puntos en el celular

      // Anillos de puntos (los de abajo pasan por detrás de las tarjetas)
      RINGS.forEach((ring, ri) => {
        const start = 700 + ri * 130;
        const p = reduce ? 1 : clamp01((t - start) / 1400);
        if (p <= 0) return;
        const e = easeOut(p);
        const dir = ri % 2 === 0 ? 1 : -1;
        const spinIn = (1 - e) * 1.6 * dir;
        const drift = s * 0.06 * dir;
        const radius = unit * ring.r * e;
        const offset = ri * 0.32;
        const count = Math.max(6, Math.round(ring.n * density));
        for (let k = 0; k < count; k++) {
          const ang = (k / count) * Math.PI * 2 + offset + spinIn + drift;
          const x = cx + Math.cos(ang) * radius;
          const y = cy + Math.sin(ang) * radius;
          const [r, g, b] = orbitColor(ang + Math.PI / 2);
          ctx.beginPath();
          ctx.arc(x, y, ring.size * (0.4 + 0.6 * e), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.72 * e})`;
          ctx.fill();
        }
      });

      // Círculo central con degradado AiGOR + logo G
      const scale = reduce ? 1 : coreScale(t);
      const alpha = reduce ? 1 : clamp01(t / 300);
      const R = unit * 0.27 * scale;
      ctx.globalAlpha = alpha;
      const grad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      grad.addColorStop(0, "#FF270A");
      grad.addColorStop(0.38, "#c22c98");
      grad.addColorStop(0.68, "#9333EA");
      grad.addColorStop(1, "#2563EB");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Logo G como <img> HTML sobre el canvas: el navegador lo dibuja nítido
      const box = R * 1.1; // el logo ocupa ~55% del diámetro
      logoEl.style.width = `${box}px`;
      logoEl.style.height = `${box}px`;
      logoEl.style.left = `${cx - box / 2}px`;
      logoEl.style.top = `${cy - box / 2}px`;
      logoEl.style.opacity = `${alpha}`;
    };

    const loop = (now: number) => {
      draw(now - t0);
      if (running) raf = requestAnimationFrame(loop);
    };
    const run = () => {
      if (running || reduce || !started || !inView) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(-1);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(lastT);
    });
    ro.observe(wrap);

    // 1) La secuencia arranca (y se reinicia) cada vez que aparece el título
    // Arranca cuando la animación completa está a la vista; al salir del
    // todo de pantalla se rearma para reiniciarse en la próxima entrada.
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (!inView) {
          pause();
          started = false;
          draw(-1);
          return;
        }
        if (!started && e.intersectionRatio >= 0.95) {
          started = true;
          t0 = performance.now();
          if (reduce) draw(10000);
        }
        run();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.95, 1] }
    );
    io.observe(wrap);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="relative -mx-5 sm:-mx-10 md:mx-0 mt-12 md:mt-16"
      style={{
        height: "var(--orbit-h)",
        // Desvanecido arriba y abajo: los puntos aparecen y se pierden en los bordes
        maskImage: "linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <Image
        ref={logoRef}
        src="/G.png"
        alt=""
        width={512}
        height={512}
        unoptimized
        draggable={false}
        className="absolute object-contain pointer-events-none select-none"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

// --- Piezas tipográficas ---
const Caption = ({ children }: { children: ReactNode }) => (
  <p className="text-[15px] md:text-base leading-snug font-bold text-[#111111] max-w-[260px] mx-auto [text-wrap:balance]">
    {children}
  </p>
);

const Support = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 mx-auto max-w-[240px] text-[15px] text-[#111111]/55 [text-wrap:balance]">{children}</p>
);

const SlateHero = ({ children }: { children: ReactNode }) => (
  <p className={HERO}>
    <span
      className="bg-clip-text text-transparent [box-decoration-break:clone] [-webkit-box-decoration-break:clone] pb-[0.12em] pr-[0.04em]"
      style={{ backgroundImage: SLATE_GRADIENT }}
    >
      {children}
    </span>
  </p>
);

const Big = ({ value, unit, aigor = false }: { value: string; unit?: string; aigor?: boolean }) => (
  <div
    className={`inline-flex ${aigor ? "items-baseline font-bold" : "items-start pb-[0.08em]"} ${HERO} bg-clip-text text-transparent`}
    style={{ backgroundImage: aigor ? AIGOR_GRADIENT : SLATE_GRADIENT }}
  >
    <span>{value}</span>
    {unit && (
      <span className={`text-xl md:text-2xl tracking-tight ${aigor ? "ml-1 pr-[0.05em]" : "mt-1 ml-1.5"}`}>{unit}</span>
    )}
  </div>
);

const AigorLogo = () => (
  <div
    role="img"
    aria-label="AiGOR RNA Technology"
    className="p-[4px] rounded-[1.3rem]"
    style={{ background: "linear-gradient(135deg, #FF270A 0%, #c22c98 45%, #9333EA 75%, #2563EB 100%)" }}
  >
    <div className="w-24 h-24 rounded-[calc(1.3rem-4px)] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <span className="font-sora font-extrabold tracking-tighter leading-none text-[1.5rem] text-white">AiGOR</span>
      <span className="mt-1.5 font-sora font-bold uppercase tracking-[0.16em] text-[6px] text-[#FF270A]">
        RNA Technology
      </span>
    </div>
  </div>
);

// --- Tarjeta blanca de la grilla (estilo Apple: título arriba, mensaje al centro) ---
const GridCard = ({
  href,
  caption,
  className = "",
  children,
}: {
  href: string;
  caption?: ReactNode;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col rounded-[1.75rem] bg-white px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 min-h-[520px] md:min-h-[560px] text-center text-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#111111] ${className}`}
    >
      {caption && <div className="shrink-0">{caption}</div>}
      <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-12">
        {children}
      </div>
      <span
        aria-hidden
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F7] group-hover:bg-[#111111] group-hover:text-white"
      >
        <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </span>
    </Link>
  );
};

// --- Contenido ---
const spoilageTargets = [
  "100+ acidophilic bacteria",
  "Preservative-resistant yeasts",
  "Brettanomyces spp.",
  "100+ yeasts & molds",
];

const CARDS: { id: string; node: ReactNode }[] = [
  {
    id: "aigor",
    node: (
      <GridCard href="/en/aigor" caption={<div className="flex justify-center"><AigorLogo /></div>}>
        <SlateHero>Ultra-fast</SlateHero>
        <Support>Pathogen results within the same shift</Support>
      </GridCard>
    ),
  },
  {
    id: "elevia",
    node: (
      <GridCard
        href="/en/aigor/elevia11"
        className="md:col-span-2"
        caption={<Caption>Elevia 1.1 Salmonella kit</Caption>}
      >
        <p className="mb-5 text-[15px] md:text-base text-[#111111]/60">Salmonella results in</p>
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          <div className="flex flex-col items-center">
            <Big value="3–6" unit="h" aigor />
            <Support>in environmental samples</Support>
          </div>
          <div className="hidden sm:block self-center w-px h-20 bg-[#111111]/10" />
          <div className="flex flex-col items-center">
            <Big value="7–10" unit="h" aigor />
            <Support>in finished product</Support>
          </div>
        </div>
        <Image
          src="/aoac_elevia11.png"
          alt="AOAC Performance Tested Method certification"
          width={160}
          height={64}
          className="mt-10 h-14 md:h-16 w-auto"
        />
      </GridCard>
    ),
  },
  {
    id: "shrimp",
    node: (
      <GridCard href="/en/aigor/elevia11/shrimp" caption={<Caption>New matrix validated: Shrimp</Caption>}>
        <SlateHero>
          Same
          <br />
          shift
        </SlateHero>
        <Support>Salmonella results before the shift ends</Support>
        <span aria-hidden className="mt-7 text-4xl leading-none select-none">🦐</span>
      </GridCard>
    ),
  },
  {
    id: "ampliora",
    node: (
      <GridCard href="/en/industrial/ampliora47" caption={<Caption>Fast & broad spoilage testing</Caption>}>
        <Big value="4" unit="in 1" />
        <Support>Fast detection of main spoilage threats in one PCR reaction</Support>
        <ul className="mt-7 w-full max-w-[240px] flex flex-col gap-2">
          {spoilageTargets.map((t) => (
            <li
              key={t}
              className="rounded-full bg-white border border-[#FF270A] px-4 py-1 text-[13px] font-medium whitespace-nowrap"
            >
              {t}
            </li>
          ))}
        </ul>
      </GridCard>
    ),
  },
  {
    id: "lab",
    node: (
      <GridCard href="/en/LabNetwork/labservices" caption={<Caption>The future of laboratory services</Caption>}>
        <SlateHero>Same-day</SlateHero>
        <Support>results for pathogens</Support>
        <div className="my-8 h-[2px] w-full max-w-[200px] rounded-full" style={{ background: AIGOR_GRADIENT }} />
        <SlateHero>AI-powered</SlateHero>
        <Support>data analysis</Support>
      </GridCard>
    ),
  },
];

export default function FeaturedPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO — mismos espacios que IndustrialHero */}
      <section className="pt-40 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
          What’s new in <br className="hidden md:block" />
          <span className="text-gray-400 inline-block">Microbiological Solutions.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-6">
          New products, newly validated matrices, software features and services, all in one place.
        </p>
      </section>

      {/* 2. PANEL GRIS ESTILO APPLE */}
      <section className="px-3 md:px-6 pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#F5F5F7] px-5 pt-16 pb-24 sm:px-10 md:px-20 md:pt-24 md:pb-32">
          {/* Trama de puntos sutil, igual que la sección de referencia */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#111 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF270A] mb-4">Featured solutions</p>
            <h2 className="font-sora font-bold tracking-tight leading-[1.1] text-4xl md:text-5xl text-[#111111] [text-wrap:balance]">
              This is what the future looks like.
            </h2>
          </div>

          {/* Alto = zona visible + parte que queda detrás de las tarjetas */}
          <div className="[--orbit-h:340px] md:[--orbit-h:550px]">
            <InnovationField />
          </div>

          <div className="relative z-10 -mt-[80px] md:-mt-[150px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense] gap-4 md:gap-6">
            {CARDS.map((c) => (
              <div key={c.id} className="contents">
                {c.node}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </main>
  );
}
