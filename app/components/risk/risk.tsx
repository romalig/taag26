"use client";

import { useEffect, useRef, useState } from "react";
import { Info, ChevronDown } from "lucide-react";

/* ============================================================
   Water treatment risk — página del cliente
   Mismo sistema visual que /en/featured (gris #F5F5F7, tarjetas
   blancas, degradado grafito en los números grandes).

   Modelo: cada etapa tiene indicadores microbiológicos con umbral.
   El riesgo se recalcula con cada nuevo resultado de laboratorio.
   "Riesgo" = probabilidad de que el PRÓXIMO resultado supere el umbral.

   ⚠️ DATOS FICTICIOS para revisar el diseño.
   ============================================================ */

// --- Tipos ---
type Indicator = {
  name: string;
  unit: string;
  threshold: number;
  history: number[]; // últimos resultados, el último es el más reciente
  risk: number; // prob. de que el próximo resultado supere el umbral (0–1)
  // estimación del próximo resultado: valor central y rango (p10–p90).
  // Se omite en indicadores de presencia/ausencia (límite "not detected").
  forecast?: { mid: number; low: number; high: number };
};

type Stage = {
  id: string;
  name: string;
  risk: number; // riesgo de la etapa (0–1)
  contribution: number; // aporte al riesgo final (0–1)
  lastSample: string; // ISO yyyy-mm-dd
  indicators: Indicator[];
};

type Flow = {
  id: string;
  site: string;
  name: string;
  finalRisk: number;
  prevRisk: number;
  stages: Stage[]; // la última etapa es la salida del flujo
};

// --- Datos ficticios ---
const LINE2_STAGES: Stage[] = [
  {
    id: "raw",
    name: "Raw water",
    risk: 0.06,
    contribution: 0.08,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 500, history: [210, 160, 240, 190, 220, 180, 170, 180], risk: 0.05, forecast: { mid: 190, low: 120, high: 340 } },
      { name: "Total coliforms", unit: "CFU/100 mL", threshold: 10, history: [2, 4, 1, 3, 5, 2, 3, 3], risk: 0.06, forecast: { mid: 3, low: 1, high: 8 } },
    ],
  },
  {
    id: "multimedia",
    name: "Multimedia filter",
    risk: 0.04,
    contribution: 0.06,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 300, history: [90, 110, 80, 100, 130, 115, 105, 120], risk: 0.04, forecast: { mid: 120, low: 75, high: 220 } },
    ],
  },
  {
    id: "carbon",
    name: "Activated carbon",
    risk: 0.22,
    contribution: 0.58,
    lastSample: "2026-10-22",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 500, history: [140, 180, 210, 260, 300, 340, 390, 420], risk: 0.22, forecast: { mid: 470, low: 320, high: 1900 } },
      { name: "Pseudomonas aeruginosa", unit: "CFU/100 mL", threshold: 1, history: [0, 0, 0, 0, 0, 1, 0, 0], risk: 0.09, forecast: { mid: 0, low: 0, high: 1 } },
    ],
  },
  {
    id: "softener",
    name: "Softener",
    risk: 0.05,
    contribution: 0.1,
    lastSample: "2026-10-20",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 300, history: [70, 85, 60, 95, 80, 75, 100, 90], risk: 0.05, forecast: { mid: 95, low: 60, high: 180 } },
    ],
  },
  {
    id: "ro",
    name: "Reverse osmosis",
    risk: 0.03,
    contribution: 0.09,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 50, history: [5, 9, 4, 7, 6, 10, 8, 8], risk: 0.03, forecast: { mid: 9, low: 5, high: 18 } },
    ],
  },
  {
    id: "uv",
    name: "UV disinfection",
    risk: 0.02,
    contribution: 0.04,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 10, history: [1, 0, 2, 1, 0, 1, 1, 1], risk: 0.02, forecast: { mid: 1, low: 0, high: 4 } },
    ],
  },
  {
    id: "storage",
    name: "Final storage",
    risk: 0.048,
    contribution: 0.05,
    lastSample: "2026-10-22",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 100, history: [12, 15, 10, 18, 22, 19, 25, 22], risk: 0.039, forecast: { mid: 26, low: 15, high: 55 } },
      { name: "Total coliforms", unit: "CFU/100 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.006 },
      { name: "Pseudomonas aeruginosa", unit: "CFU/250 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.011 },
      { name: "E. coli", unit: "CFU/100 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.001 },
    ],
  },
];

const LINE1_STAGES: Stage[] = [
  {
    id: "raw",
    name: "Raw water",
    risk: 0.09,
    contribution: 0.12,
    lastSample: "2026-10-20",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 500, history: [260, 310, 280, 340, 300, 360, 330, 350], risk: 0.09, forecast: { mid: 360, low: 230, high: 620 } },
    ],
  },
  {
    id: "sand",
    name: "Sand filter",
    risk: 0.07,
    contribution: 0.14,
    lastSample: "2026-10-20",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 300, history: [120, 150, 140, 170, 160, 180, 175, 190], risk: 0.07, forecast: { mid: 195, low: 120, high: 360 } },
    ],
  },
  {
    id: "carbon",
    name: "Activated carbon",
    risk: 0.12,
    contribution: 0.31,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 500, history: [220, 260, 240, 300, 280, 330, 310, 340], risk: 0.12, forecast: { mid: 350, low: 220, high: 720 } },
    ],
  },
  {
    id: "uv",
    name: "UV disinfection",
    risk: 0.16,
    contribution: 0.36,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 10, history: [2, 3, 4, 3, 6, 5, 7, 8], risk: 0.16, forecast: { mid: 8, low: 4, high: 19 } },
    ],
  },
  {
    id: "storage",
    name: "Final storage",
    risk: 0.11,
    contribution: 0.07,
    lastSample: "2026-10-21",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 100, history: [30, 42, 38, 51, 47, 60, 58, 66], risk: 0.1, forecast: { mid: 70, low: 40, high: 150 } },
      { name: "Total coliforms", unit: "CFU/100 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.012 },
      { name: "E. coli", unit: "CFU/100 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.002 },
    ],
  },
];

const RINSE_STAGES: Stage[] = [
  {
    id: "ro",
    name: "Reverse osmosis",
    risk: 0.02,
    contribution: 0.3,
    lastSample: "2026-10-22",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 50, history: [4, 6, 3, 5, 4, 6, 5, 4], risk: 0.02, forecast: { mid: 5, low: 2, high: 11 } },
    ],
  },
  {
    id: "uv",
    name: "UV disinfection",
    risk: 0.01,
    contribution: 0.2,
    lastSample: "2026-10-22",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 10, history: [0, 1, 0, 0, 1, 0, 1, 0], risk: 0.01, forecast: { mid: 0, low: 0, high: 2 } },
    ],
  },
  {
    id: "loop",
    name: "Distribution loop",
    risk: 0.03,
    contribution: 0.5,
    lastSample: "2026-10-22",
    indicators: [
      { name: "Heterotrophic plate count", unit: "CFU/mL", threshold: 100, history: [8, 10, 7, 12, 9, 11, 13, 12], risk: 0.03, forecast: { mid: 13, low: 7, high: 26 } },
      { name: "Pseudomonas aeruginosa", unit: "CFU/250 mL", threshold: 0, history: [0, 0, 0, 0, 0, 0, 0, 0], risk: 0.008 },
    ],
  },
];

const FLOWS: Flow[] = [
  { id: "line2", site: "Plant Santiago", name: "Line 2 · Product water", finalRisk: 0.048, prevRisk: 0.039, stages: LINE2_STAGES },
  { id: "line1", site: "Plant Santiago", name: "Line 1 · Product water", finalRisk: 0.11, prevRisk: 0.094, stages: LINE1_STAGES },
  { id: "rinse", site: "Plant Santiago", name: "CIP final rinse water", finalRisk: 0.03, prevRisk: 0.034, stages: RINSE_STAGES },
];

// --- Límites sugeridos (basados en riesgo) ---
// Para cada indicador intermedio, el modelo calcula el mayor resultado que
// mantiene el riesgo del agua final en o bajo el objetivo elegido.
// Clave: "flujo:etapa:indicador". ⚠️ Valores ficticios.
const TARGETS = [0.01, 0.02, 0.05] as const;
type Target = (typeof TARGETS)[number];
type Suggestion = { limits: Record<Target, number>; finalRiskAtLimit: number };

const HPC = "Heterotrophic plate count";
const SUGGESTED: Record<string, Suggestion> = {
  [`line2:raw:${HPC}`]: { limits: { 0.01: 420, 0.02: 520, 0.05: 650 }, finalRiskAtLimit: 0.016 },
  "line2:raw:Total coliforms": { limits: { 0.01: 6, 0.02: 9, 0.05: 14 }, finalRiskAtLimit: 0.022 },
  [`line2:multimedia:${HPC}`]: { limits: { 0.01: 240, 0.02: 310, 0.05: 420 }, finalRiskAtLimit: 0.019 },
  [`line2:carbon:${HPC}`]: { limits: { 0.01: 280, 0.02: 360, 0.05: 520 }, finalRiskAtLimit: 0.047 },
  [`line2:softener:${HPC}`]: { limits: { 0.01: 260, 0.02: 340, 0.05: 450 }, finalRiskAtLimit: 0.013 },
  [`line2:ro:${HPC}`]: { limits: { 0.01: 22, 0.02: 35, 0.05: 60 }, finalRiskAtLimit: 0.028 },
  [`line2:uv:${HPC}`]: { limits: { 0.01: 6, 0.02: 9, 0.05: 15 }, finalRiskAtLimit: 0.021 },
  [`line1:raw:${HPC}`]: { limits: { 0.01: 380, 0.02: 470, 0.05: 600 }, finalRiskAtLimit: 0.025 },
  [`line1:sand:${HPC}`]: { limits: { 0.01: 200, 0.02: 260, 0.05: 350 }, finalRiskAtLimit: 0.03 },
  [`line1:carbon:${HPC}`]: { limits: { 0.01: 300, 0.02: 390, 0.05: 540 }, finalRiskAtLimit: 0.041 },
  [`line1:uv:${HPC}`]: { limits: { 0.01: 4, 0.02: 6, 0.05: 11 }, finalRiskAtLimit: 0.06 },
  [`rinse:ro:${HPC}`]: { limits: { 0.01: 30, 0.02: 45, 0.05: 70 }, finalRiskAtLimit: 0.022 },
  [`rinse:uv:${HPC}`]: { limits: { 0.01: 5, 0.02: 8, 0.05: 13 }, finalRiskAtLimit: 0.02 },
};

// Etapa que más aporta al riesgo final
const topStage = (f: Flow) => [...f.stages].sort((a, b) => b.contribution - a.contribution)[0];

// Fechas de los resultados: muestreo semanal hacia atrás desde la última muestra (ficticio)
const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const parseISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const sampleDates = (lastISO: string, n: number) => {
  const d = parseISO(lastISO);
  return Array.from({ length: n }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() - 7 * (n - 1 - i));
    return fmtDate(x);
  });
};

// --- Niveles (umbrales a acordar con cada cliente) ---
// gradient: mismo degradado vertical del hero (oscuro arriba, claro abajo) teñido por nivel
const LEVELS = [
  {
    max: 0.05,
    label: "Low",
    color: "#16A34A",
    bg: "#16A34A1A",
    gradient: "linear-gradient(180deg, #052E16 0%, #15803D 35%, #6FCF97 100%)",
  },
  {
    max: 0.15,
    label: "Medium",
    color: "#D97706",
    bg: "#D977061A",
    gradient: "linear-gradient(180deg, #431F03 0%, #B45309 35%, #F2B66B 100%)",
  },
  {
    max: 1,
    label: "High",
    color: "#FF270A",
    bg: "#FF270A1A",
    gradient: "linear-gradient(180deg, #4A0A02 0%, #D11F06 35%, #FF8C7A 100%)",
  },
];
const level = (r: number) => LEVELS.find((l) => r < l.max) ?? LEVELS[2];
const pct = (r: number) => `${(r * 100).toFixed(r < 0.01 ? 1 : r < 0.1 ? 1 : 0)}%`;

// Severidad: cuánto podría superar el límite el próximo resultado (usa el extremo alto del rango)
const SEVERITY_MIN_RISK = 0.05; // solo se muestra si la probabilidad es relevante
const severity = (ind: Indicator) => {
  if (!ind.forecast || ind.threshold <= 0 || ind.risk < SEVERITY_MIN_RISK) return null;
  const ratio = ind.forecast.high / ind.threshold;
  if (ratio <= 1) return null;
  return `Up to ${ratio < 10 ? ratio.toFixed(1) : Math.round(ratio)}× limit`;
};

// --- Piezas ---
const Pill = ({ r }: { r: number }) => {
  const l = level(r);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ color: l.color, background: l.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
      {l.label}
    </span>
  );
};

// Mini gráfico: últimos resultados con puntos, línea del umbral y fecha al pasar el cursor
const Sparkline = ({
  values,
  dates,
  threshold,
  unit,
  forecast,
}: {
  values: number[];
  dates: string[];
  threshold: number;
  unit: string;
  forecast?: { mid: number; low: number; high: number };
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const W = 168;
  const H = 44;
  const slots = values.length + (forecast ? 1 : 0); // un espacio extra para la predicción
  const max = Math.max(threshold * 1.15, ...values, forecast?.high ?? 0, 1);
  const x = (i: number) => (i / (slots - 1)) * (W - 10) + 5;
  const y = (v: number) => H - 5 - (v / max) * (H - 10);
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div className="relative shrink-0" onMouseLeave={() => setHover(null)}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block overflow-visible">
        <line x1="0" x2={W} y1={y(threshold)} y2={y(threshold)} stroke="#FF270A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <path d={d} fill="none" stroke="#111111" strokeOpacity="0.35" strokeWidth="1.25" strokeLinejoin="round" />
        {forecast && (() => {
          const fx = x(values.length);
          const fOver = forecast.high > threshold;
          return (
            <g>
              {/* tramo punteado hacia la predicción */}
              <line
                x1={x(values.length - 1)}
                y1={y(values[values.length - 1])}
                x2={fx}
                y2={y(forecast.mid)}
                stroke="#111111"
                strokeOpacity="0.35"
                strokeWidth="1.25"
                strokeDasharray="2 3"
              />
              {/* rango probable del próximo resultado */}
              <rect
                x={fx - 4}
                y={y(forecast.high)}
                width="8"
                height={Math.max(y(forecast.low) - y(forecast.high), 2)}
                rx="4"
                fill={fOver ? "#FF270A" : "#111111"}
                opacity="0.15"
              />
              <circle cx={fx} cy={y(forecast.mid)} r={hover === values.length ? 4 : 3} fill="#fff" stroke="#111111" strokeWidth="1.5" />
              <circle
                cx={fx}
                cy={y(forecast.mid)}
                r="10"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHover(values.length)}
                onClick={() => setHover(values.length)}
              >
                <title>{`Next (predicted) · ${forecast.mid} ${unit}`}</title>
              </circle>
            </g>
          );
        })()}
        {values.map((v, i) => {
          const over = v > threshold;
          const active = hover === i;
          return (
            <g key={i}>
              <circle
                cx={x(i)}
                cy={y(v)}
                r={active ? 4 : 2.75}
                fill={over ? "#FF270A" : "#111111"}
              />
              {/* área de hover/toque más grande que el punto */}
              <circle
                cx={x(i)}
                cy={y(v)}
                r="10"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHover(i)}
                onClick={() => setHover(i)}
              >
                <title>{`${dates[i]} · ${v} ${unit}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#111111] px-2.5 py-1.5 text-xs text-white shadow-sm z-20"
          style={{ left: x(hover) }}
        >
          {hover < values.length ? (
            <>
              <span className="font-medium">{dates[hover]}</span>
              <span className="text-white/60"> · {values[hover]} {unit}</span>
            </>
          ) : (
            forecast && (
              <>
                <span className="font-medium">Next (predicted)</span>
                <span className="text-white/60">
                  {" "}
                  · ≈{forecast.mid} {unit} · range {forecast.low}–{forecast.high}
                </span>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default function WaterRiskPage() {
  const [flowId, setFlowId] = useState<string>(FLOWS[0].id);
  const flow = FLOWS.find((f) => f.id === flowId) ?? FLOWS[0];
  const [selected, setSelected] = useState<string>(topStage(FLOWS[0]).id);
  const [target, setTarget] = useState<Target>(0.01);

  // Tooltip ⓘ: se abre con toque/clic (móvil) o hover (escritorio); se cierra al tocar fuera o con Esc
  const [infoOpen, setInfoOpen] = useState(false);
  const infoRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!infoOpen) return;
    const onDown = (e: PointerEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) setInfoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [infoOpen]);
  const stage = flow.stages.find((s) => s.id === selected) ?? topStage(flow);
  const delta = (flow.finalRisk - flow.prevRisk) * 100;
  const finalLevel = level(flow.finalRisk);
  const isOutlet = stage.id === flow.stages[flow.stages.length - 1].id; // la salida usa la especificación oficial
  const suggestionFor = (name: string) => (isOutlet ? undefined : SUGGESTED[`${flow.id}:${stage.id}:${name}`]);
  const stageHasSuggestions = stage.indicators.some((i) => suggestionFor(i.name));

  // Al cambiar de flujo se abre la etapa que más aporta al riesgo
  const changeFlow = (id: string) => {
    const next = FLOWS.find((f) => f.id === id) ?? FLOWS[0];
    setFlowId(next.id);
    setSelected(topStage(next).id);
  };

  return (
    <main className="bg-white text-[#111111]">
      {/* 1. VEREDICTO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 text-center">
        {/* Selector de flujo */}
        <label className="relative inline-flex">
          <span className="sr-only">Select a treatment flow</span>
          <select
            value={flow.id}
            onChange={(e) => changeFlow(e.target.value)}
            className="appearance-none rounded-full border border-[#111111]/15 bg-white pl-5 pr-11 py-2.5 text-sm font-medium text-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-[#111111] cursor-pointer"
          >
            {FLOWS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.site} · {f.name}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/50"
          />
        </label>
        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight">Final water risk</h1>

        <div className="mt-10 md:mt-12 flex justify-center">
          {/* inline-block + padding derecho: evita que el degradado recorte el "%" */}
          <span
            className="inline-block font-sora font-semibold tracking-tighter leading-none text-[5.5rem] md:text-[8rem] bg-clip-text text-transparent pb-[0.08em] pr-[0.1em] pl-[0.02em]"
            style={{ backgroundImage: finalLevel.gradient }}
          >
            {pct(flow.finalRisk)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Pill r={flow.finalRisk} />
          <span className="text-[#111111]/60">
            {delta >= 0 ? "↑" : "↓"} {Math.abs(delta).toFixed(1)} pts vs. previous result
          </span>
        </div>

        <p className="mt-6 text-base md:text-lg text-[#111111]/60 max-w-[460px] mx-auto [text-wrap:balance]">
          probability that the next final water result exceeds specification
        </p>

        <p className="mt-8 text-base md:text-lg">
          Main driver: <span className="font-semibold">{topStage(flow).name}</span>
        </p>
      </section>

      {/* 2. PANEL ÚNICO: flujo → especificaciones de la etapa */}
      <section className="px-3 md:px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1280px] rounded-[2rem] md:rounded-[3rem] bg-[#F5F5F7] px-5 py-14 sm:px-10 md:px-16 md:py-20">
          {/* 2.1 Flujo */}
          <h2 className="text-center font-sora font-bold tracking-tight text-3xl md:text-4xl">Treatment flow</h2>
          <div className="mt-3 flex items-center justify-center gap-2 text-[#111111]/60">
            <p>Select a stage to see its results.</p>
            <span ref={infoRef} className="group relative inline-flex">
              <button
                type="button"
                aria-label="What do these percentages mean?"
                aria-expanded={infoOpen}
                aria-describedby="flow-info"
                onClick={() => setInfoOpen((o) => !o)}
                className="inline-flex p-2 -m-2 text-[#111111]/40 hover:text-[#111111] focus-visible:text-[#111111] outline-none"
              >
                <Info className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <span
                id="flow-info"
                role="tooltip"
                className={`absolute top-full z-30 mt-3 -right-3 md:right-auto md:left-1/2 md:-translate-x-1/2 w-[min(300px,calc(100vw-48px))] rounded-2xl bg-[#111111] p-4 text-left text-[13px] leading-relaxed text-white/80 shadow-lg transition-opacity ${
                  infoOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible md:group-focus-within:opacity-100 md:group-focus-within:visible"
                }`}
              >
                <span className="block">
                  <span className="font-semibold text-white">Stage risk (%)</span>: probability that the next result at
                  this stage exceeds its limit.
                </span>
                <span className="block mt-2">
                  <span className="font-semibold text-white">% of final</span>: how much this stage contributes to the risk
                  of the final water exceeding specification.
                </span>
                <span className="block mt-2">
                  <span className="font-semibold text-white">Next ≈ and shaded bar</span>: predicted value and likely range
                  of the next result. &ldquo;Up to N× limit&rdquo; shows how far it could exceed the limit.
                </span>
                <span className="block mt-2">
                  <span className="font-semibold text-white">Suggested limit</span>: the highest result at this stage that
                  keeps the final water risk at or below the selected target.
                </span>
              </span>
            </span>
          </div>

          <ol className="relative mt-12 md:mt-16 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
            {/* la línea va del centro del primer círculo al centro del último */}
            <span
              aria-hidden
              className="hidden md:block absolute top-[22px] h-px bg-[#111111]/15"
              style={{ left: `${50 / flow.stages.length}%`, right: `${50 / flow.stages.length}%` }}
            />
            <span aria-hidden className="md:hidden absolute left-[27px] top-6 bottom-6 w-px bg-[#111111]/15" />
            {flow.stages.map((s, i) => {
              const l = level(s.risk);
              const active = s.id === selected;
              return (
                <li key={s.id} className="relative md:flex-1">
                  <button
                    onClick={() => setSelected(s.id)}
                    aria-pressed={active}
                    className={`w-full flex md:flex-col items-center gap-4 md:gap-3 rounded-2xl px-3 py-3 md:p-0 text-left md:text-center outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      active ? "bg-white md:bg-transparent" : ""
                    }`}
                  >
                    <span
                      className={`relative z-10 shrink-0 flex items-center justify-center w-[30px] h-[30px] md:w-11 md:h-11 rounded-full bg-white ${
                        active ? "ring-2 ring-[#111111]" : ""
                      }`}
                    >
                      <span className="text-sm md:text-base font-semibold tabular-nums" style={{ color: l.color }}>{i + 1}</span>
                    </span>
                    <span className="flex-1 md:flex-none">
                      <span className={`block text-[15px] leading-snug ${active ? "font-semibold" : "font-medium"}`}>
                        {s.name}
                      </span>
                    </span>
                    <span className="text-right md:text-center">
                      <span className="block text-xl md:text-2xl font-semibold tracking-tight tabular-nums" style={{ color: l.color }}>
                        {pct(s.risk)}
                      </span>
                      <span className="block text-xs text-[#111111]/45 tabular-nums">{pct(s.contribution)} of final</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* 2.2 Especificaciones y predicciones de la etapa seleccionada */}
          <div className="mt-12 md:mt-16 rounded-[1.75rem] bg-white p-7 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm text-[#111111]/45">Last sample {fmtDate(parseISO(stage.lastSample))}</p>
                <h3 className="mt-1 font-sora font-bold tracking-tight text-2xl md:text-3xl">{stage.name}</h3>
                <p className="mt-2 text-[#111111]/60">Probability that the next result exceeds each limit.</p>
                {stageHasSuggestions && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#111111]/60">
                    <span>Suggested limits for a final water risk of</span>
                    <span className="inline-flex rounded-full bg-[#F5F5F7] p-1">
                      {TARGETS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTarget(t)}
                          aria-pressed={target === t}
                          className={`rounded-full px-3 py-1 text-sm font-medium tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                            target === t ? "bg-white text-[#111111] shadow-sm" : "text-[#111111]/50"
                          }`}
                        >
                          {t * 100}%
                        </button>
                      ))}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-sm text-[#111111]/45">Stage risk</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums" style={{ color: level(stage.risk).color }}>
                    {pct(stage.risk)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#111111]/45">% of final</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">{pct(stage.contribution)}</p>
                </div>
              </div>
            </div>

            <ul className="mt-8 border-t border-[#111111]/10">
              {stage.indicators.map((ind) => {
                const last = ind.history[ind.history.length - 1];
                const over = last > ind.threshold;
                const sev = severity(ind);
                return (
                  <li
                    key={ind.name}
                    className="grid grid-cols-[1fr_auto] md:grid-cols-[1.5fr_1fr_auto_120px] items-center gap-x-6 gap-y-3 py-5 border-b border-[#111111]/10"
                  >
                    <div>
                      <p className="font-medium">{ind.name}</p>
                      <p className="text-sm text-[#111111]/45">
                        Limit {ind.threshold === 0 ? "not detected" : `${ind.threshold} ${ind.unit}`}
                      </p>
                      {(() => {
                        const sug = suggestionFor(ind.name);
                        if (!sug) return null;
                        const v = sug.limits[target];
                        const stricter = v < ind.threshold;
                        return (
                          <p className="mt-0.5 text-sm">
                            <span className="text-[#111111]/45">Suggested </span>
                            <span className="font-semibold tabular-nums">
                              {v} {ind.unit}
                            </span>
                            {v !== ind.threshold && (
                              <span className={`ml-1.5 text-xs font-medium ${stricter ? "text-[#FF270A]" : "text-[#16A34A]"}`}>
                                {stricter ? "↓ stricter" : "↑ room to relax"}
                              </span>
                            )}
                            <span className="block text-xs text-[#111111]/45">
                              Current limit allows {pct(sug.finalRiskAtLimit)} final risk
                            </span>
                          </p>
                        );
                      })()}
                    </div>
                    <div className="hidden md:block tabular-nums">
                      <p className={over ? "text-[#FF270A] font-semibold" : ""}>
                        {last} <span className="text-sm text-[#111111]/45 font-normal">{ind.unit}</span>
                      </p>
                      {ind.forecast && (
                        <p className="text-sm text-[#111111]/45">Next ≈ {ind.forecast.mid}</p>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <Sparkline values={ind.history} dates={sampleDates(stage.lastSample, ind.history.length)} threshold={ind.threshold} unit={ind.unit} forecast={ind.forecast} />
                    </div>
                    <div className="text-right">
                      <p
                        className="text-xl font-semibold tracking-tight tabular-nums"
                        style={{ color: level(ind.risk).color }}
                      >
                        {pct(ind.risk)}
                      </p>
                      {sev && <p className="text-xs font-medium text-[#FF270A] whitespace-nowrap">{sev}</p>}
                    </div>
                    {/* móvil: último resultado + minigráfico en una segunda línea */}
                    <div className="md:hidden col-span-2 flex items-center justify-between gap-4">
                      <p className={`tabular-nums text-sm ${over ? "text-[#FF270A] font-semibold" : ""}`}>
                        Last {last} <span className="text-[#111111]/45 font-normal">{ind.unit}</span>
                        {ind.forecast && <span className="block text-[#111111]/45 font-normal">Next ≈ {ind.forecast.mid}</span>}
                      </p>
                      <Sparkline values={ind.history} dates={sampleDates(stage.lastSample, ind.history.length)} threshold={ind.threshold} unit={ind.unit} forecast={ind.forecast} />
                    </div>
                  </li>
                );
              })}
            </ul>
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
