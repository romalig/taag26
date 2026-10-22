"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";

/* ============================================================
   "What's new" — va bajo FeaturedPage.
   Filtro de texto por tipo + acordeón por solución. Al abrir una
   fila se listan sus novedades: productos, matrices validadas,
   funciones de software, servicios y actualizaciones.

   ⚠️ DATOS FICTICIOS para revisar el diseño. NO publicar.
   ============================================================ */

type Kind = "product" | "matrix" | "software" | "service" | "update";

const FILTERS: { value: Kind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "product", label: "Products" },
  { value: "matrix", label: "Matrices" },
  { value: "software", label: "Software" },
  { value: "service", label: "Services" },
  { value: "update", label: "Updates" },
];

const KIND_LABEL: Record<Kind, string> = {
  product: "Product",
  matrix: "Matrix",
  software: "Software",
  service: "Service",
  update: "Update",
};

type Item = { date: string; title: string; kind: Kind; href?: string };
type Group = { id: string; name: string; line: string; items: Item[] };

// ⚠️ PLACEHOLDER — reemplazar por novedades reales
const GROUPS: Group[] = [
  {
    id: "elevia11",
    name: "Elevia 1.1 Salmonella",
    line: "Pathogen detection",
    items: [
      { date: "Oct 2026", title: "New matrix validated: raw and cooked shrimp", kind: "matrix", href: "/en/aigor/elevia11/shrimp" },
      { date: "Sep 2026", title: "New matrix validated: environmental sponges", kind: "matrix" },
      { date: "Aug 2026", title: "Shorter enrichment protocol for finished product", kind: "update" },
    ],
  },
  {
    id: "ampliora47",
    name: "Ampliora 4.7",
    line: "Beverage spoilage",
    items: [
      { date: "Oct 2026", title: "Launch: four spoilage groups in one PCR reaction", kind: "product", href: "/en/industrial/ampliora47" },
      { date: "Sep 2026", title: "Brettanomyces spp. added to the panel", kind: "update" },
    ],
  },
  {
    id: "txa",
    name: "TxA",
    line: "Digital platform",
    items: [
      { date: "Oct 2026", title: "AI trend alerts across plants", kind: "software" },
      { date: "Sep 2026", title: "Automatic certificate of analysis download", kind: "software" },
      { date: "Jul 2026", title: "Results on mobile", kind: "software" },
    ],
  },
  {
    id: "labservices",
    name: "Laboratory Services",
    line: "Testing network",
    items: [
      { date: "Oct 2026", title: "Same-day pathogen results", kind: "service", href: "/en/LabNetwork/labservices" },
      { date: "Aug 2026", title: "Genomic identification of unknown isolates", kind: "service" },
    ],
  },
  {
    id: "nascence",
    name: "Nascence",
    line: "Custom assay development",
    items: [{ date: "Sep 2026", title: "Faster assay design with Mila", kind: "update" }],
  },
];

export default function SolutionsCatalog() {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Filtra las novedades dentro de cada grupo; oculta grupos vacíos
  const groups = useMemo(
    () =>
      GROUPS.map((g) => ({ ...g, items: filter === "all" ? g.items : g.items.filter((i) => i.kind === filter) })).filter(
        (g) => g.items.length > 0
      ),
    [filter]
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="bg-white px-6 pt-8 pb-28 md:pb-40">
      <div className="mx-auto max-w-[880px]">
        <h2 className="font-sora font-semibold tracking-tight leading-[1.08] text-[2rem] md:text-5xl text-[#111111]">
          All updates.
        </h2>

        {/* Filtro: solo texto */}
        <nav aria-label="Filter updates" className="mt-8 md:mt-10 flex gap-6 md:gap-8 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`shrink-0 pb-1 text-[15px] md:text-base border-b outline-none focus-visible:underline ${
                  active
                    ? "text-[#111111] font-medium border-[#111111]"
                    : "text-[#111111]/45 border-transparent hover:text-[#111111]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </nav>

        {/* Acordeón */}
        <ul className="mt-8 md:mt-10 border-t border-[#111111]/10">
          {groups.map((g) => {
            const isOpen = open.has(g.id);
            const panelId = `panel-${g.id}`;
            return (
              <li key={g.id} className="border-b border-[#111111]/10">
                <button
                  onClick={() => toggle(g.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left outline-none focus-visible:bg-[#F5F5F7]"
                >
                  <span>
                    <span className="block text-lg md:text-xl font-medium text-[#111111]">{g.name}</span>
                    <span className="block mt-0.5 text-sm text-[#111111]/45">
                      {g.line} · {g.items.length} new
                    </span>
                  </span>
                  <Plus
                    aria-hidden
                    strokeWidth={1.5}
                    className={`shrink-0 w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-[#111111]" : "text-[#111111]/35 group-hover:text-[#111111]"
                    }`}
                  />
                </button>

                {/* Panel: transición de altura con grid-rows (sin medir alturas) */}
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="pb-6 md:pb-8">
                      {g.items.map((i) => {
                        const row = (
                          <>
                            <span className="text-sm text-[#111111]/45 tabular-nums">{i.date}</span>
                            <span className="text-[15px] md:text-base text-[#111111]">
                              {i.title}
                              {i.href && (
                                <ArrowUpRight
                                  aria-hidden
                                  className="inline-block ml-1 -mt-0.5 w-4 h-4 text-[#111111]/40 group-hover/item:text-[#111111]"
                                  strokeWidth={1.5}
                                />
                              )}
                            </span>
                            <span className="hidden sm:block text-sm text-[#111111]/45 text-right">{KIND_LABEL[i.kind]}</span>
                          </>
                        );
                        const cls =
                          "grid grid-cols-[80px_1fr] sm:grid-cols-[96px_1fr_88px] gap-x-4 items-baseline py-2.5";
                        return (
                          <li key={i.title}>
                            {i.href ? (
                              <Link href={i.href} className={`group/item ${cls} hover:underline underline-offset-4 decoration-[#111111]/20`}>
                                {row}
                              </Link>
                            ) : (
                              <div className={cls}>{row}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx global>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
