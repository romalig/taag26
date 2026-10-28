"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleDashed,
  CircleDot,
  GripVertical,
  Plus,
  Search,
  X,
} from "lucide-react";

/* ============================================================
   New / edit flow — MAQUETA (datos ficticios, sin backend).
   Izquierda: etapas en orden; cada etapa define sus análisis y la
   especificación de cada análisis en esa etapa.
   Derecha: datos del flujo + catálogo + guardar (con modales).
   ============================================================ */

type SpecType = "max" | "absent";
type Spec = { analysis: string; type: SpecType; value: string; unit: string };
type Stage = { id: string; name: string; specs: Spec[] };

// ⚠️ Datos ficticios
const PLANTS = ["Insurgentes", "Guadalupe"];
const LINES: Record<string, string[]> = {
  Insurgentes: ["Water treatment", "Lines 1–3", "Lines 4–7", "Syrup room"],
  Guadalupe: ["Water treatment", "Line 1", "Line 2", "CIP"],
};
const CATALOGUE = [
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
  "Lámpara UV",
  "Después de lámpara UV",
  "Llenadoras",
];
const UNITS = ["CFU/mL", "CFU/100 mL", "CFU/250 mL"];

// Catálogo de análisis con su especificación sugerida por defecto
const ANALYSES: { name: string; short: string; type: SpecType; value: string; unit: string }[] = [
  { name: "Heterotrophic plate count", short: "HPC", type: "max", value: "500", unit: "CFU/mL" },
  { name: "Total coliforms", short: "Coliforms", type: "max", value: "10", unit: "CFU/100 mL" },
  { name: "E. coli", short: "E. coli", type: "absent", value: "", unit: "CFU/100 mL" },
  { name: "Pseudomonas aeruginosa", short: "P. aeruginosa", type: "absent", value: "", unit: "CFU/250 mL" },
  { name: "Yeasts & molds", short: "Yeasts & molds", type: "max", value: "10", unit: "CFU/100 mL" },
];
const shortName = (n: string) => ANALYSES.find((a) => a.name === n)?.short ?? n;
const defaultSpec = (n: string): Spec => {
  const a = ANALYSES.find((x) => x.name === n)!;
  return { analysis: a.name, type: a.type, value: a.value, unit: a.unit };
};
const specMissing = (s: Spec) => s.type === "max" && !(Number(s.value) >= 0 && s.value.trim() !== "");
const fmtSpec = (s: Spec) =>
  s.type === "absent" ? `${shortName(s.analysis)} not detected in ${s.unit.replace("CFU/", "")}` : `${shortName(s.analysis)} ≤ ${s.value} ${s.unit}`;

let uid = 0;
const newStage = (name: string, specs?: Spec[]): Stage => ({
  id: `s${++uid}`,
  name,
  specs: specs ?? [defaultSpec("Heterotrophic plate count")],
});

const field =
  "w-full rounded-xl border border-[#111111]/15 bg-white px-4 py-2.5 text-[15px] text-[#111111] placeholder:text-[#111111]/35 outline-none focus-visible:border-[#111111] focus-visible:ring-1 focus-visible:ring-[#111111]";
const label = "block mb-1.5 text-sm font-medium text-[#111111]";

// --- Modal (X y pie fijos; contenido con scroll sin barra) ---
const Modal = ({
  onClose,
  label: aria,
  footer,
  children,
}: {
  onClose: () => void;
  label: string;
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
        aria-label={aria}
        className="relative flex flex-col w-full max-w-[640px] max-h-[92vh] overflow-hidden rounded-[1.75rem] bg-white shadow-2xl"
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

type ModalState = null | "draft" | "train" | "training";

export default function FlowEditorPage() {
  // Datos del flujo
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [plant, setPlant] = useState(PLANTS[0]);
  const [line, setLine] = useState(LINES[PLANTS[0]][0]);

  // Etapas
  const [stages, setStages] = useState<Stage[]>(() => [
    newStage("Pozos", [defaultSpec("Heterotrophic plate count"), defaultSpec("Total coliforms")]),
    newStage("Cloración"),
    newStage("Filtros Carbón", [
      { analysis: "Heterotrophic plate count", type: "max", value: "300", unit: "CFU/mL" },
      { analysis: "Pseudomonas aeruginosa", type: "max", value: "1", unit: "CFU/100 mL" },
    ]),
    newStage("Lámpara UV", [{ analysis: "Heterotrophic plate count", type: "max", value: "10", unit: "CFU/mL" }]),
  ]);
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const inFlow = new Set(stages.map((s) => s.name));
  const q = query.trim().toLowerCase();
  const catalogue = CATALOGUE.filter((c) => !inFlow.has(c) && (!q || c.toLowerCase().includes(q)));
  const canCreateCustom = q.length > 1 && !CATALOGUE.some((c) => c.toLowerCase() === q) && !inFlow.has(query.trim());

  // --- Acciones sobre etapas ---
  const add = (n: string, at?: number) =>
    setStages((s) => {
      const next = [...s];
      next.splice(at ?? next.length, 0, newStage(n));
      return next;
    });
  const remove = (id: string) => setStages((s) => s.filter((x) => x.id !== id));
  const move = (from: number, to: number) =>
    setStages((s) => {
      if (to < 0 || to > s.length || from === to) return s;
      const next = [...s];
      const [item] = next.splice(from, 1);
      next.splice(from < to ? to - 1 : to, 0, item);
      return next;
    });
  const step = (i: number, d: -1 | 1) =>
    setStages((s) => {
      const j = i + d;
      if (j < 0 || j >= s.length) return s;
      const next = [...s];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  // --- Acciones sobre especificaciones ---
  const updateSpecs = (id: string, fn: (specs: Spec[]) => Spec[]) =>
    setStages((s) => s.map((x) => (x.id === id ? { ...x, specs: fn(x.specs) } : x)));
  const addSpec = (id: string, analysis: string) => updateSpecs(id, (sp) => [...sp, defaultSpec(analysis)]);
  const removeSpec = (id: string, analysis: string) => updateSpecs(id, (sp) => sp.filter((x) => x.analysis !== analysis));
  const editSpec = (id: string, analysis: string, patch: Partial<Spec>) =>
    updateSpecs(id, (sp) => sp.map((x) => (x.analysis === analysis ? { ...x, ...patch } : x)));

  // --- Arrastrar ---
  const onDragStart = (e: DragEvent, payload: string) => {
    e.dataTransfer.setData("text/plain", payload);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDrop = (e: DragEvent, at: number) => {
    e.preventDefault();
    setDragOver(null);
    const data = e.dataTransfer.getData("text/plain");
    if (data.startsWith("move:")) move(Number(data.slice(5)), at);
    else if (data.startsWith("add:")) add(data.slice(4), at);
  };
  const allowDrop = (e: DragEvent, at: number) => {
    e.preventDefault();
    setDragOver(at);
  };

  // --- Validación ---
  const checks = useMemo(
    () => [
      { ok: name.trim().length > 0, text: "Flow name" },
      { ok: stages.length >= 2, text: "At least 2 stages" },
      { ok: stages.every((s) => s.specs.length > 0), text: "Every stage has at least one analysis" },
      { ok: stages.every((s) => s.specs.every((sp) => !specMissing(sp))), text: "Every analysis has a limit" },
    ],
    [name, stages]
  );
  const ready = checks.every((c) => c.ok);
  const missing = checks.filter((c) => !c.ok);

  // Resumen del flujo para los modales
  const Summary = (
    <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-5 md:p-6">
      <p className="font-semibold">{name.trim() || "Untitled flow"}</p>
      <p className="mt-0.5 text-sm text-[#111111]/60">
        {line} · {plant} · {stages.length} stages
      </p>
      <ol className="relative mt-5">
        <span aria-hidden className="absolute left-[15px] top-4 bottom-4 border-l border-dashed border-[#111111]/20" />
        {stages.map((s, i) => (
          <li key={s.id} className="relative flex gap-3 py-2">
            <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-[#111111] text-white text-xs font-semibold flex items-center justify-center tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-0.5 text-xs text-[#111111]/55 leading-relaxed">
                {s.specs.length ? (
                  s.specs.map((sp, k) => (
                    <span key={sp.analysis} className={specMissing(sp) ? "text-[#C81E00]" : ""}>
                      {k > 0 && " · "}
                      {specMissing(sp) ? `${shortName(sp.analysis)}: limit missing` : fmtSpec(sp)}
                    </span>
                  ))
                ) : (
                  <span className="text-[#C81E00]">No analyses</span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <main className="bg-white text-[#111111]">
      <section className="px-6 pt-28 md:pt-32 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1180px]">
          {/* Encabezado */}
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#111111]/60 hover:text-[#111111] outline-none focus-visible:underline"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} /> All flows
          </button>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">New flow</h1>
              <p className="mt-3 text-base md:text-lg text-[#111111]/60 [text-wrap:balance]">
                Add the stages of your process in the order they happen, and set the limits for each one.
              </p>
            </div>
            <span className="self-start md:self-auto inline-flex items-center gap-1.5 rounded-full bg-[#D977061A] px-3 py-1 text-xs font-semibold text-[#D97706]">
              <CircleDashed className="w-3.5 h-3.5" strokeWidth={2} /> Draft
            </span>
          </div>

          <div className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            {/* ---------- Izquierda: etapas ---------- */}
            <div className="order-2 lg:order-1 rounded-[2rem] bg-[#F5F5F7] p-5 sm:p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-sora font-bold tracking-tight text-2xl md:text-3xl">Stages</h2>
                <span className="text-sm text-[#111111]/45 tabular-nums">{stages.length} stages</span>
              </div>
              <p className="mt-2 text-sm text-[#111111]/60">
                Drag to reorder. Open a stage to set its analyses and limits.
              </p>

              {stages.length === 0 ? (
                <div
                  onDragOver={(e) => allowDrop(e, 0)}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => onDrop(e, 0)}
                  className={`mt-8 rounded-[1.5rem] border-2 border-dashed px-6 py-16 text-center ${
                    dragOver === 0 ? "border-[#111111] bg-white" : "border-[#111111]/15"
                  }`}
                >
                  <p className="font-medium">No stages yet</p>
                  <p className="mt-1 text-sm text-[#111111]/60">Add them from the catalogue, starting with the first one.</p>
                </div>
              ) : (
                <ol className="relative mt-8">
                  <span
                    aria-hidden
                    className="absolute left-[50px] sm:left-[58px] top-8 bottom-8 border-l border-dashed border-[#111111]/20"
                  />
                  {stages.map((s, i) => {
                    const isOpen = open === s.id;
                    const available = ANALYSES.filter((a) => !s.specs.some((sp) => sp.analysis === a.name));
                    const incomplete = s.specs.length === 0 || s.specs.some(specMissing);
                    return (
                      <li
                        key={s.id}
                        onDragOver={(e) => allowDrop(e, i)}
                        onDragLeave={() => setDragOver(null)}
                        onDrop={(e) => onDrop(e, i)}
                        className="relative py-1.5"
                      >
                        {dragOver === i && (
                          <span aria-hidden className="absolute -top-0.5 left-0 right-0 h-0.5 rounded-full bg-[#111111]" />
                        )}
                        <div
                          draggable={!isOpen}
                          onDragStart={(e) => onDragStart(e, `move:${i}`)}
                          className={`relative rounded-2xl bg-white ${isOpen ? "ring-1 ring-[#111111]/15" : ""}`}
                        >
                          {/* Cabecera de la etapa (cerrada: muestra análisis y límites) */}
                          <div className="flex items-start gap-2 sm:gap-3 px-2 sm:px-3 py-3">
                            <span className="mt-2.5 cursor-grab active:cursor-grabbing text-[#111111]/25" aria-hidden>
                              <GripVertical className="w-4 h-4" />
                            </span>
                            <span className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-[#111111] text-white text-sm font-semibold flex items-center justify-center tabular-nums">
                              {i + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => setOpen(isOpen ? null : s.id)}
                              aria-expanded={isOpen}
                              className="flex-1 min-w-0 flex items-start gap-2 text-left outline-none focus-visible:underline pt-1.5"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block font-medium">{s.name}</span>
                                <span className="mt-1.5 flex flex-wrap gap-1.5">
                                  {s.specs.length === 0 && (
                                    <span className="rounded-full bg-[#FF270A]/10 px-2.5 py-0.5 text-xs font-medium text-[#C81E00]">
                                      No analyses
                                    </span>
                                  )}
                                  {s.specs.map((sp) =>
                                    specMissing(sp) ? (
                                      <span
                                        key={sp.analysis}
                                        className="rounded-full bg-[#FF270A]/10 px-2.5 py-0.5 text-xs font-medium text-[#C81E00]"
                                      >
                                        {shortName(sp.analysis)}: set limit
                                      </span>
                                    ) : (
                                      <span
                                        key={sp.analysis}
                                        className="rounded-full bg-[#F5F5F7] px-2.5 py-0.5 text-xs text-[#111111]/70 tabular-nums"
                                      >
                                        {fmtSpec(sp)}
                                      </span>
                                    )
                                  )}
                                </span>
                              </span>
                              <ChevronDown
                                className={`mt-1 shrink-0 w-4 h-4 text-[#111111]/35 transition-transform ${isOpen ? "rotate-180" : ""} ${
                                  incomplete && !isOpen ? "text-[#C81E00]" : ""
                                }`}
                              />
                            </button>
                            <div className="flex shrink-0">
                              <button
                                type="button"
                                aria-label={`Move ${s.name} up`}
                                disabled={i === 0}
                                onClick={() => step(i, -1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111]/45 enabled:hover:bg-[#111111]/[0.06] disabled:opacity-25"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                aria-label={`Move ${s.name} down`}
                                disabled={i === stages.length - 1}
                                onClick={() => step(i, 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111]/45 enabled:hover:bg-[#111111]/[0.06] disabled:opacity-25"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                aria-label={`Remove ${s.name}`}
                                onClick={() => remove(s.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111]/45 hover:bg-[#FF270A]/10 hover:text-[#C81E00]"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Abierta: editar análisis y especificación */}
                          {isOpen && (
                            <div className="px-4 sm:px-6 pb-6 pt-2 sm:pl-[88px]">
                              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/45">
                                Analyses and limits at this stage
                              </p>

                              <ul className="mt-3 border-t border-[#111111]/10">
                                {s.specs.map((sp) => (
                                  <li key={sp.analysis} className="py-4 border-b border-[#111111]/10">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-sm font-medium">{sp.analysis}</span>
                                      <button
                                        type="button"
                                        aria-label={`Remove ${sp.analysis}`}
                                        onClick={() => removeSpec(s.id, sp.analysis)}
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#111111]/35 hover:bg-[#FF270A]/10 hover:text-[#C81E00]"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>

                                    {/* Especificación: mismos selectores que Plant / Line */}
                                    <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-[1.1fr_0.8fr_1fr] gap-2">
                                      <div className="relative col-span-2 sm:col-span-1">
                                        <select
                                          aria-label={`Limit type for ${sp.analysis}`}
                                          value={sp.type}
                                          onChange={(e) => editSpec(s.id, sp.analysis, { type: e.target.value as SpecType })}
                                          className={`${field} appearance-none pr-9 cursor-pointer`}
                                        >
                                          <option value="max">Maximum (≤)</option>
                                          <option value="absent">Not detected</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/45" />
                                      </div>
                                      {sp.type === "max" ? (
                                        <input
                                          aria-label={`Limit value for ${sp.analysis}`}
                                          inputMode="numeric"
                                          value={sp.value}
                                          onChange={(e) =>
                                            editSpec(s.id, sp.analysis, { value: e.target.value.replace(/[^\d.]/g, "") })
                                          }
                                          placeholder="Limit"
                                          className={`${field} tabular-nums ${
                                            specMissing(sp) ? "border-[#C81E00] ring-1 ring-[#C81E00]/30" : ""
                                          }`}
                                        />
                                      ) : (
                                        <span className="hidden sm:block" />
                                      )}
                                      <div className={`relative ${sp.type === "max" ? "" : "col-span-2 sm:col-span-1"}`}>
                                        <select
                                          aria-label={`Unit for ${sp.analysis}`}
                                          value={sp.unit}
                                          onChange={(e) => editSpec(s.id, sp.analysis, { unit: e.target.value })}
                                          className={`${field} appearance-none pr-9 cursor-pointer`}
                                        >
                                          {UNITS.map((u) => (
                                            <option key={u}>{u}</option>
                                          ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/45" />
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>

                              {available.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {available.map((a) => (
                                    <button
                                      key={a.name}
                                      type="button"
                                      onClick={() => addSpec(s.id, a.name)}
                                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-sm font-medium text-[#111111]/60 hover:text-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                                    >
                                      <Plus className="w-3.5 h-3.5" /> {a.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  <li
                    onDragOver={(e) => allowDrop(e, stages.length)}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => onDrop(e, stages.length)}
                    className={`mt-2 rounded-2xl border-2 border-dashed px-4 py-4 text-center text-sm ${
                      dragOver === stages.length ? "border-[#111111] text-[#111111]" : "border-[#111111]/10 text-[#111111]/40"
                    }`}
                  >
                    Drop a stage here, or add it from the catalogue
                  </li>
                </ol>
              )}
            </div>

            {/* ---------- Derecha ---------- */}
            <aside className="order-1 lg:order-2 lg:sticky lg:top-24 flex flex-col gap-6">
              <div className="rounded-[2rem] border border-[#111111]/10 p-6 md:p-7">
                <h2 className="font-sora font-bold tracking-tight text-xl">Flow details</h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="flow-name" className={label}>
                      Name
                    </label>
                    <input
                      id="flow-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Product water, Line 2"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="flow-desc" className={label}>
                      Description <span className="font-normal text-[#111111]/40">(optional)</span>
                    </label>
                    <input
                      id="flow-desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="One line about what this flow covers"
                      className={field}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="flow-plant" className={label}>
                        Plant
                      </label>
                      <div className="relative">
                        <select
                          id="flow-plant"
                          value={plant}
                          onChange={(e) => {
                            setPlant(e.target.value);
                            setLine(LINES[e.target.value][0]);
                          }}
                          className={`${field} appearance-none pr-9 cursor-pointer`}
                        >
                          {PLANTS.map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/45" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="flow-line" className={label}>
                        Line
                      </label>
                      <div className="relative">
                        <select
                          id="flow-line"
                          value={line}
                          onChange={(e) => setLine(e.target.value)}
                          className={`${field} appearance-none pr-9 cursor-pointer`}
                        >
                          {LINES[plant].map((l) => (
                            <option key={l}>{l}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#111111]/10 p-6 md:p-7">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-sora font-bold tracking-tight text-xl">Stage catalogue</h2>
                  <span className="text-sm text-[#111111]/45 tabular-nums">{catalogue.length}</span>
                </div>
                <p className="mt-1 text-sm text-[#111111]/60">Drag a stage into the flow, or press + to add it at the end.</p>
                <label className="relative mt-4 block">
                  <span className="sr-only">Search stages</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/40" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full rounded-full bg-[#F5F5F7] pl-11 pr-5 py-2.5 text-sm placeholder:text-[#111111]/40 outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                  />
                </label>
                <ul className="mt-3 max-h-[280px] overflow-y-auto no-scrollbar -mx-2">
                  {catalogue.map((c) => (
                    <li key={c}>
                      <div
                        draggable
                        onDragStart={(e) => onDragStart(e, `add:${c}`)}
                        className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-[#F5F5F7] cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 text-[#111111]/20" aria-hidden />
                        <span className="flex-1 text-sm font-medium">{c}</span>
                        <button
                          type="button"
                          aria-label={`Add ${c}`}
                          onClick={() => add(c)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111]/50 hover:bg-[#111111] hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                  {catalogue.length === 0 && !canCreateCustom && (
                    <li className="px-2 py-6 text-center text-sm text-[#111111]/45">No stages match.</li>
                  )}
                </ul>
                {canCreateCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      add(query.trim());
                      setQuery("");
                    }}
                    className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-dashed border-[#111111]/25 px-4 py-2.5 text-sm font-medium hover:border-[#111111]"
                  >
                    <Plus className="w-4 h-4" /> Create stage “{query.trim()}”
                  </button>
                )}
              </div>

              <div className="rounded-[2rem] border border-[#111111]/10 p-6 md:p-7">
                <ul className="space-y-2">
                  {checks.map((c) => (
                    <li key={c.text} className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          c.ok ? "bg-[#16A34A] text-white" : "border border-[#111111]/20"
                        }`}
                      >
                        {c.ok && <Check className="w-3 h-3" strokeWidth={3} />}
                      </span>
                      <span className={c.ok ? "text-[#111111]" : "text-[#111111]/50"}>{c.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModal("draft")}
                    className="flex-1 rounded-full px-4 py-3 text-sm font-medium bg-[#F5F5F7] hover:bg-[#ECECEE]"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() => setModal("train")}
                    className="flex-1 rounded-full px-4 py-3 text-sm font-medium text-white bg-[#111111] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Save & start training
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- Modal: borrador guardado ---------- */}
      {modal === "draft" && (
        <Modal
          onClose={() => setModal(null)}
          label="Draft saved"
          footer={
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setModal(null)} className="rounded-full px-5 py-2.5 text-sm font-medium bg-[#F5F5F7]">
                Keep editing
              </button>
              <button type="button" className="rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111111]">
                Go to all flows
              </button>
            </div>
          }
        >
          <div className="px-6 pt-10 pb-8 md:px-10 md:pt-12">
            <span className="w-12 h-12 rounded-full bg-[#D977061A] text-[#D97706] flex items-center justify-center">
              <CircleDashed className="w-6 h-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 font-sora font-bold tracking-tight text-2xl">Draft saved</h2>
            <p className="mt-2 text-[#111111]/60 leading-relaxed">
              You can finish it later from All flows. Training starts only when you choose to start it.
            </p>
            {missing.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-medium">Still missing to start training</p>
                <ul className="mt-2 space-y-1.5">
                  {missing.map((m) => (
                    <li key={m.text} className="flex items-center gap-2 text-sm text-[#111111]/60">
                      <span className="w-4 h-4 rounded-full border border-[#111111]/20" /> {m.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Summary}
          </div>
        </Modal>
      )}

      {/* ---------- Modal: confirmar inicio de entrenamiento ---------- */}
      {modal === "train" && (
        <Modal
          onClose={() => setModal(null)}
          label="Start training?"
          footer={
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setModal(null)} className="rounded-full px-5 py-2.5 text-sm font-medium bg-[#F5F5F7]">
                Review again
              </button>
              <button
                type="button"
                onClick={() => setModal("training")}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111111]"
              >
                Start training
              </button>
            </div>
          }
        >
          <div className="px-6 pt-10 pb-8 md:px-10 md:pt-12">
            <h2 className="font-sora font-bold tracking-tight text-2xl pr-10">Save and start training?</h2>
            <p className="mt-2 text-[#111111]/60 leading-relaxed">
              The system will collect lab results for each stage and train its model as data arrives. Each stage needs
              about 30 results, so this can take some weeks. You’ll be able to activate the flow once every stage is
              trained.
            </p>
            <p className="mt-3 text-sm text-[#111111]/60 leading-relaxed">
              The limits below define when a result is out of specification. Check them now: changing them later
              restarts training for that stage.
            </p>
            {Summary}
          </div>
        </Modal>
      )}

      {/* ---------- Modal: entrenamiento iniciado ---------- */}
      {modal === "training" && (
        <Modal
          onClose={() => setModal(null)}
          label="Training started"
          footer={
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className="rounded-full px-5 py-2.5 text-sm font-medium bg-[#F5F5F7]">
                View flow
              </button>
              <button type="button" className="rounded-full px-5 py-2.5 text-sm font-medium text-white bg-[#111111]">
                Go to all flows
              </button>
            </div>
          }
        >
          <div className="px-6 pt-10 pb-8 md:px-10 md:pt-12 text-center">
            <span className="mx-auto w-14 h-14 rounded-full bg-[#2563EB1A] text-[#2563EB] flex items-center justify-center">
              <CircleDot className="w-7 h-7" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 font-sora font-bold tracking-tight text-2xl">Training started</h2>
            <p className="mt-2 text-[#111111]/60 leading-relaxed [text-wrap:balance]">
              <span className="font-medium text-[#111111]">{name.trim()}</span> is collecting data for its{" "}
              {stages.length} stages. Follow its progress in All flows. We’ll let you know when it’s ready to activate.
            </p>
          </div>
        </Modal>
      )}

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
