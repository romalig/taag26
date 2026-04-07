"use client";

import { ArrowRight, Check, Clock, Microscope, ExternalLink } from "lucide-react";
import { DifyCard } from "@/app/types/dify";

interface ProductCardProps {
  card: DifyCard;
  theme?: "dark" | "light";
  /** AI-generated explanation to show as description (used in light theme) */
  description?: string;
}

export function ProductCard({ card, theme = "dark", description }: ProductCardProps) {
  /* ------------------------------------------------------------------ */
  /* LIGHT — hero card matching the design mockup                        */
  /* ------------------------------------------------------------------ */
  if (theme === "light") {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col gap-8">
        {/* Top row: badge + ID */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-[#FF270A]/10 border border-[#FF270A]/15 px-3 py-1.5 rounded-full">
            <div className="w-5 h-5 rounded-full bg-[#FF270A] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-[#111111] uppercase tracking-widest">
              Match Found
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
            ID: {card.id}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight tracking-tight">
          {card.name}
        </h3>

        {/* AI description (prop) or product's own description as fallback */}
        {(description || card.productDescription) && (
          <div className="border-l-4 border-[#FF270A] pl-5">
            <p className="text-gray-500 text-base leading-relaxed">
              {description || card.productDescription}
            </p>
          </div>
        )}

        {/* Meta chips — only rendered when at least one value is present */}
        {(card.technology || card.timeToResult || card.category) && (
          <div className="flex flex-wrap gap-3">
            {card.technology && (
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <Microscope className="w-3.5 h-3.5 shrink-0" />
                {card.technology}
              </div>
            )}
            {card.timeToResult && (
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {card.timeToResult}
              </div>
            )}
            {card.category && (
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider font-mono">
                {card.category}
              </div>
            )}
          </div>
        )}

        {/* CTA — navigate to /industrial with search pre-filled */}
        {card.name && (
          <a
            href={`/industrial?search=${encodeURIComponent(card.name)}`}
            className="self-start inline-flex items-center gap-2.5 bg-[#FF270A] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#cc1f07] transition-colors shadow-md shadow-[#FF270A]/20"
          >
            View Solution
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* DARK — compact card for inside chat                                 */
  /* ------------------------------------------------------------------ */
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2.5 border bg-white/10 border-white/15 hover:bg-white/15 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono px-2 py-0.5 rounded-full bg-white/15 text-white/70">
            {card.category}
          </span>
          <h4 className="mt-1.5 font-semibold text-sm leading-snug text-white">
            {card.name}
          </h4>
        </div>
        {card.canonicalUrl && (
          <a
            href={card.canonicalUrl}
            className="shrink-0 p-1.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
            aria-label={`View ${card.name}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3">
        {card.technology && (
          <div className="flex items-center gap-1 text-xs text-white/60">
            <Microscope className="w-3 h-3 shrink-0" />
            <span>{card.technology}</span>
          </div>
        )}
        {card.timeToResult && (
          <div className="flex items-center gap-1 text-xs text-white/60">
            <Clock className="w-3 h-3 shrink-0" />
            <span>{card.timeToResult}</span>
          </div>
        )}
      </div>

      {/* Deliverables */}
      {card.deliverables && card.deliverables.length > 0 && (
        <ul className="flex flex-col gap-1">
          {card.deliverables.slice(0, 3).map((d, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-xs leading-snug text-white/70">
              <span className="mt-1 w-1 h-1 rounded-full shrink-0 bg-white/40" />
              {d}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {card.canonicalUrl && (
        <a
          href={card.canonicalUrl}
          className="mt-1 text-xs font-semibold flex items-center gap-1 w-fit text-white/80 hover:text-white transition-colors"
        >
          View solution
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
