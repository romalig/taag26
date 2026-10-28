"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  BadgeCheck,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CirclePause,
  CircleSlash,
  Eye,
  Pause,
  Pencil,
  Play,
  Power,
  PowerOff,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";

/* ============================================================
   Process flows — MAQUETA (datos ficticios, sin backend).
   Ciclo de vida: Draft → Training (⇄ Paused) → Ready → Active ⇄ Inactive.
   Un flujo solo se puede activar cuando todas sus etapas están entrenadas.
   ============================================================ */

type Status = "draft" | "training" | "paused" | "ready" | "active" | "inactive";

type Analysis = { name: string; unit: string; limit: string; frequency: string };

type Flow = {
  id: string;
  name: string;
  description: string;
  line: string;
  plant: string;
  status: Status;
  created: string; // ISO yyyy-mm-dd
  stages: string[];
  trained: number; // etapas con entrenamiento completo
};

// ⚠️ DATOS FICTICIOS
const FLOWS: Flow[] = [
  {
    id: "optimo",
    name: "Flujo Óptimo",
    description: "Product water from wells to carbon filtration.",
    line: "Line 4",
    plant: "Insurgentes",
    status: "active",
    created: "2026-09-30",
    trained: 9,
    stages: [
      "Pozos",
      "Filtros Declorinadores",
      "Filtros Desalcalinizadores",
      "Desgasificador",
      "Filtros Desnitrificadores",
      "Filtros Carbón",
      "Filtros Pulidores",
      "Antes de lámpara UV",
      "Después de lámpara UV",
    ],
  },
  {
    id: "uv-l4",
    name: "Después de la lámpara UV L-4 a L-7",
    description: "Full treatment feeding bottling lines 4 to 7.",
    line: "Lines 4–7",
    plant: "Insurgentes",
    status: "training",
    created: "2026-10-02",
    trained: 9,
    stages: [
      "Pozos",
      "Cloración",
      "Filtros Declorinadores",
      "Filtros Desalcalinizadores",
      "Desgasificador",
      "Filtros Desnitrificadores",
      "Filtros Carbón",
      "Ablandadores",
      "Ósmosis inversa",
      "Filtros Pulidores",
      "Tanque de agua tratada",
      "Antes de lámpara UV",
      "Lámpara UV",
      "Después de lámpara UV",
      "Llenadoras L-4 a L-7",
    ],
  },
  {
    id: "uv-l1",
    name: "Después de la lámpara UV L-1 a L-3",
    description: "Same treatment, feeding bottling lines 1 to 3.",
    line: "Lines 1–3",
    plant: "Insurgentes",
    status: "ready",
    created: "2026-10-05",
    trained: 15,
    stages: [
      "Pozos",
      "Cloración",
      "Filtros Declorinadores",
      "Filtros Desalcalinizadores",
      "Desgasificador",
      "Filtros Desnitrificadores",
      "Filtros Carbón",
      "Ablandadores",
      "Ósmosis inversa",
      "Filtros Pulidores",
      "Tanque de agua tratada",
      "Antes de lámpara UV",
      "Lámpara UV",
      "Después de lámpara UV",
      "Llenadoras L-1 a L-3",
    ],
  },
  {
    id: "cip",
    name: "CIP final rinse",
    description: "Rinse water used after cleaning in place.",
    line: "Line 2",
    plant: "Guadalupe",
    status: "active",
    created: "2026-08-14",
    trained: 3,
    stages: ["Ósmosis inversa", "Lámpara UV", "Loop de distribución"],
  },
  {
    id: "prueba",
    name: "Prueba",
    description: "Test flow for the bottling area.",
    line: "Line 1",
    plant: "Guadalupe",
    status: "draft",
    created: "2026-10-18",
    trained: 0,
    stages: ["Llenadora", "Taponadora", "Producto terminado"],
  },
  {
    id: "syrup",
    name: "Syrup room water",
    description: "Water used to prepare simple syrup.",
    line: "Syrup room",
    plant: "Insurgentes",
    status: "inactive",
    created: "2026-06-03",
    trained: 3,
    stages: ["Tanque de agua tratada", "Filtro 1 µm", "Tanque de jarabe"],
  },
  {
    id: "boiler",
    name: "Boiler feed water",
    description: "Softened water feeding the boilers.",
    line: "Utilities",
    plant: "Guadalupe",
    status: "paused",
    created: "2026-09-12",
    trained: 1,
    stages: ["Ablandadores", "Desaireador", "Tanque de alimentación", "Caldera"],
  },
];

// Entrenamiento: resultados necesarios por etapa y resultados reunidos (ficticio)
const RESULTS_NEEDED = 30;
const stageResults = (f: Flow, i: number) => {
  if (i < f.trained) return RESULTS_NEEDED;
  if (f.status === "draft") return 0;
  return Math.max(0, 24 - (i - f.trained) * 6);
};

// ⚠️ Análisis ficticios por etapa (en la versión real vienen de la configuración del flujo)
const analysesFor = (stage: string, i: number, total: number): Analysis[] => {
  if (i === total - 1) {
    return [
      { name: "Heterotrophic plate count", unit: "CFU/mL", limit: "≤ 100", frequency: "Daily" },
      { name: "Total coliforms", unit: "CFU/100 mL", limit: "Not detected", frequency: "Daily" },
      { name: "E. coli", unit: "CFU/100 mL", limit: "Not detected", frequency: "Daily" },
      { name: "Pseudomonas aeruginosa", unit: "CFU/250 mL", limit: "Not detected", frequency: "Weekly" },
    ];
  }
  if (/uv/i.test(stage)) {
    return [{ name: "Heterotrophic plate count", unit: "CFU/mL", limit: "≤ 10", frequency: "Twice a week" }];
  }
  const list: Analysis[] = [
    { name: "Heterotrophic plate count", unit: "CFU/mL", limit: i < total / 3 ? "≤ 500" : "≤ 300", frequency: "Weekly" },
  ];
  if (i === 0) list.push({ name: "Total coliforms", unit: "CFU/100 mL", limit: "≤ 10", frequency: "Weekly" });
  if (/carb/i.test(stage))
    list.push({ name: "Pseudomonas aeruginosa", unit: "CFU/100 mL", limit: "≤ 1", frequency: "Weekly" });
  return list;
};

// --- Utilidades ---
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const ico = "w-[18px] h-[18px]";
const STATUS: Record<Status, { label: string; color: string; icon: ReactNode }> = {
  draft: { label: "Draft", color: "#8A95A3", icon: <CircleDashed className={`${ico} text-[#8A95A3]`} strokeWidth={2} /> },
  training: { label: "Training", color: "#2563EB", icon: <CircleDot className={`${ico} text-[#2563EB]`} strokeWidth={2} /> },
  paused: { label: "Training paused", color: "#D97706", icon: <CirclePause className={`${ico} text-[#D97706]`} strokeWidth={2} /> },
  ready: { label: "Ready to activate", color: "#111111", icon: <BadgeCheck className={`${ico} text-[#111111]`} strokeWidth={2} /> },
  active: { label: "Active", color: "#16A34A", icon: <CircleCheck className={`${ico} text-[#16A34A]`} strokeWidth={2} /> },
  inactive: { label: "Inactive", color: "#8A95A3", icon: <CircleSlash className={`${ico} text-[#8A95A3]`} strokeWidth={2} /> },
};

const StatusPill = ({ s }: { s: Status }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
    style={{ color: STATUS[s].color, background: `${STATUS[s].color}1A` }}
  >
    <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[s].color }} />
    {STATUS[s].label}
  </span>
);

// Indicador de entrenamiento: etapas entrenadas / total
const TrainingBar = ({ f, wide = false }: { f: Flow; wide?: boolean }) => {
  const n = f.stages.length;
  const done = f.trained === n;
  const color = done ? "#16A34A" : f.status === "paused" ? "#D97706" : f.status === "training" ? "#2563EB" : "#8A95A3";
  return (
    <div className={wide ? "w-full" : "w-[120px]"}>
      <p className="text-sm tabular-nums">
        <span className="font-medium">{f.trained}</span>
        <span className="text-[#111111]/45">/{n} {wide ? "stages trained" : ""}</span>
      </p>
      <div className="mt-1.5 h-1 rounded-full bg-[#111111]/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(f.trained / n) * 100}%`, background: color }} />
      </div>
    </div>
  );
};

type SortKey = "status" | "name" | "line" | "plant" | "training" | "created";
type Sort = { key: SortKey; dir: "asc" | "desc" };
const STATUS_ORDER: Record<Status, number> = { active: 0, ready: 1, training: 2, paused: 3, draft: 4, inactive: 5 };

const IconButton = ({
  label,
  onClick,
  children,
  tone = "default",
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: "default" | "danger";
  disabled?: boolean;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    disabled={disabled}
    className={`w-9 h-9 rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#111111] disabled:opacity-25 disabled:cursor-not-allowed ${
      tone === "danger"
        ? "text-[#111111]/50 enabled:hover:bg-[#FF270A]/10 enabled:hover:text-[#C81E00]"
        : "text-[#111111]/50 enabled:hover:bg-[#111111]/[0.06] enabled:hover:text-[#111111]"
    }`}
  >
    {children}
  </button>
);

const SortHeader = ({
  k,
  sort,
  onSort,
  children,
  className = "",
}: {
  k: SortKey;
  sort: Sort;
  onSort: (k: SortKey) => void;
  children: ReactNode;
  className?: string;
}) => {
  const active = sort.key === k;
  const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th scope="col" aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className={className}>
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] outline-none focus-visible:underline ${
          active ? "text-[#111111]" : "text-[#111111]/45 hover:text-[#111111]"
        }`}
      >
        {children}
        <Icon className={`w-3.5 h-3.5 ${active ? "" : "opacity-50"}`} strokeWidth={2} />
      </button>
    </th>
  );
};

// --- Modal: la X y el pie quedan fijos; solo el contenido hace scroll ---
const Modal = ({
  onClose,
  label,
  size = "md",
  footer,
  children,
}: {
  onClose: () => void;
  label: string;
  size?: "md" | "lg";
  footer?: ReactNode;
  children: ReactNode;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeFn = useRef(onClose);
  useEffect(() => {
    closeFn.current = onClose;
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFn.current();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-[#111111]/30 backdrop-blur-[2px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative flex flex-col w-full ${
          size === "lg" ? "max-w-[1040px]" : "max-w-[680px]"
        } max-h-[92vh] overflow-hidden rounded-[1.75rem] bg-white shadow-2xl`}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 backdrop-blur text-[#111111]/50 hover:bg-[#111111]/[0.06] hover:text-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>
        <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
        {footer && <div className="shrink-0 border-t border-[#111111]/10 bg-white px-6 py-5 md:px-10">{footer}</div>}
      </div>
    </div>
  );
};

// --- Diagrama del flujo: puntos negros numerados; clicables si se pasa onSelect ---
const FlowDiagram = ({
  stages,
  orientation = "horizontal",
  compact = false,
  selected,
  onSelect,
  trained,
}: {
  stages: string[];
  orientation?: "horizontal" | "vertical";
  compact?: boolean;
  selected?: number;
  onSelect?: (i: number) => void;
  trained?: number; // si se indica: entrenadas en negro, pendientes con borde punteado
}) => {
  const dot = compact ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  const renderStage = (i: number, children: ReactNode) =>
    onSelect ? (
      <button
        type="button"
        onClick={() => onSelect(i)}
        aria-pressed={selected === i}
        className="group/stage w-full flex flex-col items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
      >
        {children}
      </button>
    ) : (
      <div className="w-full flex flex-col items-center">{children}</div>
    );

  const renderDot = (i: number) => (
    <span
      className={`relative z-10 shrink-0 ${dot} rounded-full font-semibold flex items-center justify-center tabular-nums ${
        trained !== undefined && i >= trained
          ? "bg-white text-[#111111]/60 border-[1.5px] border-dashed border-[#111111]/40"
          : "bg-[#111111] text-white"
      } ${
        selected === i
          ? "ring-2 ring-[#111111] ring-offset-[3px]"
          : "group-hover/stage:ring-2 group-hover/stage:ring-[#111111]/20 group-hover/stage:ring-offset-[3px]"
      }`}
    >
      {i + 1}
    </span>
  );

  if (orientation === "vertical") {
    return (
      <ol className="relative mx-auto max-w-[420px]">
        <span aria-hidden className="absolute left-[19px] top-5 bottom-5 border-l border-dashed border-[#111111]/25" />
        {stages.map((s, i) => (
          <li key={i} className="relative py-2">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={selected === i}
                className="group/stage w-full flex items-center gap-4 text-left rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                {renderDot(i)}
                <span className={`text-[15px] ${selected === i ? "font-semibold" : "font-medium"}`}>{s}</span>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {renderDot(i)}
                <span className="text-[15px] font-medium">{s}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    );
  }

  // Horizontal en grilla: la línea punteada se corta al final de cada fila
  const grid = compact ? "grid-cols-3 sm:grid-cols-4 gap-y-6" : "grid-cols-3 md:grid-cols-5 gap-y-10";
  const half = compact ? 16 : 20; // radio del punto, para que la línea parta y termine en su borde
  return (
    <ol className={`grid ${grid}`}>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        const endA = (i + 1) % 3 === 0;
        const endB = (i + 1) % (compact ? 4 : 5) === 0;
        const hideA = endA ? (compact ? "max-sm:hidden" : "max-md:hidden") : "";
        const hideB = endB ? (compact ? "sm:hidden" : "md:hidden") : "";
        return (
          <li key={i} className="relative min-w-0 px-1.5 text-center">
            {!last && (
              <span
                aria-hidden
                className={`absolute border-t border-dashed border-[#111111]/25 ${hideA} ${hideB}`}
                style={{ top: half, left: `calc(50% + ${half + 6}px)`, right: `calc(-50% + ${half + 6}px)` }}
              />
            )}
            {renderStage(
              i,
              <>
                {renderDot(i)}
                <span
                className={`mt-2.5 max-w-full leading-snug break-words [text-wrap:balance] ${compact ? "text-xs" : "text-[13px] md:text-sm"} ${
                  selected === i ? "font-semibold" : "font-medium"
                }`}
              >
                  {s}
                </span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
};

// Resumen del flujo (mismos datos que la tabla) — usado en ver / desactivar / eliminar
const FlowMeta = ({ f }: { f: Flow }) => (
  <p className="text-sm text-[#111111]/60">
    {f.line} · {f.plant} · {f.stages.length} stages · Created {fmtDate(f.created)}
  </p>
);

type ConfirmKind = "delete" | "deactivate" | "activate" | "startTraining" | "pauseTraining" | "resumeTraining";
type Confirm = { kind: ConfirmKind; flow: Flow } | null;

export default function FlowsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [sort, setSort] = useState<Sort>({ key: "created", dir: "desc" });
  const [viewing, setViewing] = useState<Flow | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [confirm, setConfirm] = useState<Confirm>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = FLOWS.filter(
      (f) =>
        (statusFilter === "all" || f.status === statusFilter) &&
        (!q || `${f.name} ${f.description} ${f.line} ${f.plant}`.toLowerCase().includes(q))
    );
    const val = (f: Flow): string | number => {
      switch (sort.key) {
        case "status":
          return STATUS_ORDER[f.status];
        case "name":
          return f.name.toLowerCase();
        case "line":
          return f.line.toLowerCase();
        case "plant":
          return f.plant.toLowerCase();
        case "training":
          return f.trained / f.stages.length;
        default:
          return f.created;
      }
    };
    return [...filtered].sort((a, b) => {
      const A = val(a);
      const B = val(b);
      const r = A < B ? -1 : A > B ? 1 : 0;
      return sort.dir === "asc" ? r : -r;
    });
  }, [query, statusFilter, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "created" ? "desc" : "asc" }
    );

  const counts = Object.fromEntries(
    (Object.keys(STATUS) as Status[]).map((st) => [st, FLOWS.filter((f) => f.status === st).length])
  ) as Record<Status, number>;

  const open = (f: Flow) => {
    setViewing(f);
    setStageIdx(0);
  };
  const ask = (kind: NonNullable<Confirm>["kind"], flow: Flow) => {
    setConfirm({ kind, flow });
  };

  // Acción de activar / desactivar según el estado
  // Acción principal según el estado (entrenar / pausar / reanudar / activar / desactivar)
  const PRIMARY: Record<Status, { kind: ConfirmKind; label: string; icon: ReactNode } | null> = {
    draft: { kind: "startTraining", label: "Start training", icon: <Play className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
    training: { kind: "pauseTraining", label: "Pause training", icon: <Pause className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
    paused: { kind: "resumeTraining", label: "Resume training", icon: <Play className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
    ready: { kind: "activate", label: "Activate", icon: <Power className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
    active: { kind: "deactivate", label: "Deactivate", icon: <PowerOff className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
    inactive: { kind: "activate", label: "Activate", icon: <Power className="w-[18px] h-[18px]" strokeWidth={1.75} /> },
  };
  const toggleButton = (f: Flow) => {
    const p = PRIMARY[f.status];
    if (!p) return null;
    return (
      <IconButton label={`${p.label} · ${f.name}`} onClick={() => ask(p.kind, f)}>
        {p.icon}
      </IconButton>
    );
  };

  const actions = (f: Flow) => (
    <div className="flex justify-end gap-0.5">
      <IconButton label={`View ${f.name}`} onClick={() => open(f)}>
        <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </IconButton>
      {toggleButton(f)}
      <IconButton label={`Delete ${f.name}`} onClick={() => ask("delete", f)} tone="danger">
        <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </IconButton>
    </div>
  );

  const mobileSorts: [SortKey, string][] = [
    ["created", "Created"],
    ["name", "Name"],
    ["line", "Line"],
    ["plant", "Plant"],
    ["training", "Trained"],
  ];

  const viewingStage = viewing ? viewing.stages[stageIdx] : "";
  const viewingAnalyses = viewing ? analysesFor(viewingStage, stageIdx, viewing.stages.length) : [];

  return (
    <main className="bg-white text-[#111111]">
      {/* Encabezado */}
      <section className="px-6 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="mx-auto max-w-[1120px] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Process flows</h1>
            <p className="mt-4 text-base md:text-lg text-[#111111]/60 leading-relaxed [text-wrap:balance]">
              Map each process in your plant, stage by stage, in the order it happens. See the full path at a glance
              and track every stage over time.
            </p>
          </div>
          <button
            type="button"
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2} /> New flow
          </button>
        </div>
      </section>

      {/* Lista */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1120px]">
          {/* Filtro por estado (con conteo) + búsqueda */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none]">
              {(["all", ...(Object.keys(STATUS) as Status[]).filter((st) => counts[st] > 0)] as (Status | "all")[]).map((s) => {
                const active = statusFilter === s;
                const n = s === "all" ? FLOWS.length : counts[s];
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    aria-pressed={active}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      active ? "bg-[#111111] text-white" : "bg-[#F5F5F7] text-[#111111]/60 hover:text-[#111111]"
                    }`}
                  >
                    {s !== "all" && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[s].color }} />
                    )}
                    {s === "all" ? "All" : STATUS[s].label}
                    <span className={`tabular-nums ${active ? "text-white/60" : "text-[#111111]/40"}`}>{n}</span>
                  </button>
                );
              })}
            </div>
            <label className="relative block lg:w-[260px]">
              <span className="sr-only">Search flows</span>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/40"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-full bg-[#F5F5F7] pl-11 pr-5 py-2.5 text-sm placeholder:text-[#111111]/40 outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              />
            </label>
          </div>

          {/* Escritorio: tabla ordenable */}
          <table className="hidden md:table mt-8 w-full text-left border-t border-[#111111]/10">
            <thead>
              <tr className="border-b border-[#111111]/10 [&>th]:py-4 [&>th]:font-normal">
                <SortHeader k="status" sort={sort} onSort={toggleSort} className="w-[56px]">
                  <span className="sr-only">Status</span>
                </SortHeader>
                <SortHeader k="name" sort={sort} onSort={toggleSort}>
                  Flow
                </SortHeader>
                <SortHeader k="line" sort={sort} onSort={toggleSort} className="w-[130px]">
                  Line
                </SortHeader>
                <SortHeader k="plant" sort={sort} onSort={toggleSort} className="w-[130px]">
                  Plant
                </SortHeader>
                <SortHeader k="training" sort={sort} onSort={toggleSort} className="w-[150px]">
                  Trained
                </SortHeader>
                <SortHeader k="created" sort={sort} onSort={toggleSort} className="w-[132px]">
                  Created
                </SortHeader>
                <th scope="col" className="w-[124px]">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.id} className="border-b border-[#111111]/10 align-middle [&>td]:py-5">
                  <td>
                    <span title={STATUS[f.status].label} className="inline-flex">
                      {STATUS[f.status].icon}
                    </span>
                  </td>
                  <td className="pr-6">
                    <button
                      type="button"
                      onClick={() => open(f)}
                      className={`text-left font-medium hover:underline underline-offset-4 decoration-[#111111]/25 outline-none focus-visible:underline ${
                        f.status === "inactive" ? "text-[#111111]/45" : ""
                      }`}
                    >
                      {f.name}
                    </button>
                    <p className="mt-0.5 text-sm text-[#111111]/45 line-clamp-1">{f.description}</p>
                  </td>
                  <td className="text-sm text-[#111111]/70 pr-4">{f.line}</td>
                  <td className="text-sm text-[#111111]/70 pr-4">{f.plant}</td>
                  <td className="pr-4">
                    <TrainingBar f={f} />
                  </td>
                  <td className="text-sm text-[#111111]/70 tabular-nums">{fmtDate(f.created)}</td>
                  <td>
                    {actions(f)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Móvil: lista + orden por píldoras */}
          <div className="md:hidden mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/45">Sort by</p>
            <div className="flex gap-2 overflow-x-auto pb-3 -mx-6 px-6 [scrollbar-width:none]">
              {mobileSorts.map(([k, label]) => {
                const active = sort.key === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleSort(k)}
                    className={`shrink-0 inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium ${
                      active ? "bg-[#111111] text-white" : "bg-[#F5F5F7] text-[#111111]/60"
                    }`}
                  >
                    {label}
                    {active &&
                      (sort.dir === "asc" ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
                  </button>
                );
              })}
            </div>
            <ul className="border-t border-[#111111]/10">
              {rows.map((f) => (
                <li key={f.id} className="py-4 border-b border-[#111111]/10">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">{STATUS[f.status].icon}</span>
                    <button type="button" onClick={() => open(f)} className="flex-1 min-w-0 text-left">
                      <p className={`font-medium ${f.status === "inactive" ? "text-[#111111]/45" : ""}`}>{f.name}</p>
                      <p className="text-sm text-[#111111]/45 line-clamp-1">{f.description}</p>
                      <p className="mt-1 text-xs text-[#111111]/45 tabular-nums">
                        {f.line} · {f.plant} · {f.trained}/{f.stages.length} stages trained · {fmtDate(f.created)}
                      </p>
                    </button>
                  </div>
                  <div className="mt-2 pl-7">
                    <div className="-ml-2.5 flex">
                      {actions(f)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {rows.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#111111]/60">No flows match your filters.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                }}
                className="mt-3 text-sm font-medium underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Modal: ver flujo ---------- */}
      {viewing && (
        <Modal
          onClose={() => setViewing(null)}
          label={`Process flow ${viewing.name}`}
          size="lg"
          footer={
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#111111]/45">Select a stage to see its analyses and specifications.</p>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setViewing(null)}
                  className="rounded-full px-5 py-2.5 text-sm font-medium bg-[#F5F5F7]"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111111]"
                >
                  <Pencil className="w-4 h-4" strokeWidth={1.75} /> Edit flow
                </button>
              </div>
            </div>
          }
        >
          <div className="px-6 pt-12 pb-10 md:px-14 md:pt-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#111111]/45">Process flow</p>
            <h2 className="mt-3 px-8 font-sora font-bold tracking-tight text-2xl md:text-4xl [text-wrap:balance]">
              {viewing.name}
            </h2>
            <p className="mt-2 text-[#111111]/60">{viewing.description}</p>
            <div className="mt-4 flex justify-center">
              <StatusPill s={viewing.status} />
            </div>
            <div className="mt-4">
              <FlowMeta f={viewing} />
            </div>
            <div className="mt-5 mx-auto max-w-[280px] text-left">
              <TrainingBar f={viewing} wide />
            </div>

            <div className="mt-8 inline-flex rounded-full bg-[#F5F5F7] p-1">
              {(["horizontal", "vertical"] as const).map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={orientation === o}
                  onClick={() => setOrientation(o)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
                    orientation === o ? "bg-white text-[#111111] shadow-sm" : "text-[#111111]/50"
                  }`}
                >
                  {o === "horizontal" ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                  {o}
                </button>
              ))}
            </div>

            {/* Horizontal: detalle debajo. Vertical: detalle a la derecha (debajo en móvil) */}
            <div
              className={`mt-10 text-left ${
                orientation === "vertical" ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10 md:items-start" : ""
              }`}
            >
              <FlowDiagram stages={viewing.stages} orientation={orientation} selected={stageIdx} onSelect={setStageIdx} trained={viewing.trained} />
              <div className={orientation === "vertical" ? "mt-10 md:mt-0 md:sticky md:top-0" : "mt-12"}>
                <div className="text-left rounded-[1.5rem] bg-[#F5F5F7] p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#111111]/45">Stage {stageIdx + 1}</p>
              <h3 className="mt-1 font-sora font-bold tracking-tight text-xl md:text-2xl">{viewingStage}</h3>
              {(() => {
                const got = stageResults(viewing, stageIdx);
                const done = got >= RESULTS_NEEDED;
                return (
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    <div className="h-1 w-24 rounded-full bg-[#111111]/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(got / RESULTS_NEEDED) * 100}%`, background: done ? "#16A34A" : "#2563EB" }}
                      />
                    </div>
                    <span className={done ? "text-[#15803D] font-medium" : "text-[#111111]/60"}>
                      {done ? "Trained" : `Training · ${got} of ${RESULTS_NEEDED} results`}
                    </span>
                  </div>
                );
              })()}
              <ul className="mt-5 border-t border-[#111111]/10">
                {viewingAnalyses.map((a) => (
                  <li
                    key={a.name}
                    className="grid grid-cols-[1fr_auto] md:grid-cols-[1.6fr_1fr_1fr] gap-x-6 gap-y-1 py-3.5 border-b border-[#111111]/10 text-sm"
                  >
                    <span className="font-medium">{a.name}</span>
                    <span className="text-right md:text-left tabular-nums">
                      {a.limit} {a.limit.startsWith("≤") && <span className="text-[#111111]/45">{a.unit}</span>}
                      {!a.limit.startsWith("≤") && <span className="text-[#111111]/45"> in {a.unit.replace("CFU/", "")}</span>}
                    </span>
                    <span className="col-span-2 md:col-span-1 text-[#111111]/45">{a.frequency}</span>
                  </li>
                ))}
              </ul>
            </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------- Modales de confirmación: desactivar / activar / eliminar ---------- */}
      {confirm &&
        (() => {
          const f = confirm.flow;
          const isDelete = confirm.kind === "delete";
          const pending = f.stages.length - f.trained;
          const copy: Record<ConfirmKind, { title: string; body: string; cta: string }> = {
            startTraining: {
              title: "Start training?",
              body: `The system collects lab results for each stage and trains its model as data arrives. Each stage needs about ${RESULTS_NEEDED} results. You can activate the flow once all ${f.stages.length} stages are trained.`,
              cta: "Start training",
            },
            pauseTraining: {
              title: "Pause training?",
              body: `New results stop being used for training. Everything collected so far is kept: ${f.trained} of ${f.stages.length} stages are already trained. You can resume at any time.`,
              cta: "Pause training",
            },
            resumeTraining: {
              title: "Resume training?",
              body: `Training picks up where it left off. ${pending} ${pending === 1 ? "stage still needs" : "stages still need"} data before the flow can be activated.`,
              cta: "Resume training",
            },
            delete: {
              title: "Delete this flow?",
              body: `This permanently removes the flow, its ${f.stages.length} stages and all of their history. This can’t be undone.`,
              cta: "Delete flow",
            },
            deactivate: {
              title: "Deactivate this flow?",
              body: "It stops receiving new results and predictions. Its stages and history are kept, and you can activate it again at any time.",
              cta: "Deactivate",
            },
            activate: {
              title: "Activate this flow?",
              body:
                f.status === "ready"
                  ? "All stages are trained. From now on the flow predicts risk with every new lab result."
                  : "It starts receiving new results and predicting risk again, using the stages below.",
              cta: "Activate",
            },
          };
          const c = copy[confirm.kind];
          const KindIcon =
            confirm.kind === "delete"
              ? TriangleAlert
              : confirm.kind === "pauseTraining"
                ? Pause
                : confirm.kind === "deactivate"
                  ? PowerOff
                  : confirm.kind === "activate"
                    ? Power
                    : Play;

          return (
            <Modal
              onClose={() => setConfirm(null)}
              label={c.title}
              footer={
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setConfirm(null)}
                    className="rounded-full px-5 py-2.5 text-sm font-medium bg-[#F5F5F7]"
                  >
                    Cancel
                  </button>
                  {isDelete && (f.status === "active" || f.status === "training") && (
                    <button
                      type="button"
                      onClick={() => ask(f.status === "active" ? "deactivate" : "pauseTraining", f)}
                      className="rounded-full px-5 py-2.5 text-sm font-medium border border-[#111111]/15"
                    >
                      {f.status === "active" ? "Deactivate instead" : "Pause training instead"}
                    </button>
                  )}
                  <button
                    type="button"
                    className={`rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:opacity-30 disabled:cursor-not-allowed ${
                      isDelete ? "bg-[#C81E00]" : "bg-[#111111]"
                    }`}
                  >
                    {c.cta}
                  </button>
                </div>
              }
            >
              <div className="px-6 pt-10 pb-8 md:px-10 md:pt-12">
                <span
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDelete ? "bg-[#FF270A]/10 text-[#C81E00]" : "bg-[#111111]/[0.06] text-[#111111]"
                  }`}
                >
                  <KindIcon className="w-6 h-6" strokeWidth={1.75} />
                </span>
                <h2 className="mt-5 font-sora font-bold tracking-tight text-2xl">{c.title}</h2>
                <p className="mt-2 text-[#111111]/60 leading-relaxed">{c.body}</p>

                {/* Resumen del flujo con sus etapas */}
                <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{f.name}</p>
                    <StatusPill s={f.status} />
                  </div>
                  <div className="mt-1">
                    <FlowMeta f={f} />
                  </div>
                  <div className="mt-4">
                    <TrainingBar f={f} wide />
                  </div>
                  <div className="mt-6">
                    <FlowDiagram stages={f.stages} compact trained={f.trained} />
                  </div>
                </div>

              </div>
            </Modal>
          );
        })()}

      <style jsx global>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
