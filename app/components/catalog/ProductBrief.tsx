"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  FileText, Mail, Timer, Activity, Zap, Download, Loader2,
  Target, Shield, Layers, Droplet, Thermometer, Check, FlaskConical, Dna,
  type LucideIcon,
} from "lucide-react";
import type { ProductPresentation, KeyAdvantage } from "./workflowData";

// Maps the brochure icon key → a lucide icon for the web. PDF uses /icon/<key>.png.
// Keep keys in sync with HIGHLIGHT_ICON_KEYS in data/brochures.ts.
const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  timer: Timer, target: Target, zap: Zap, rna: Dna, shield: Shield,
  layers: Layers, droplet: Droplet, thermometer: Thermometer,
  activity: Activity, check: Check, flask: FlaskConical, dna: Dna,
};

// ── Brief data shapes ───────────────────────────────────────────────
export interface BriefRow {
  feature: string | null;
  taag: string | null;
  leadingPcr: string | null;
  traditional: string | null;
  businessImpact: string | null;
}
export interface BriefTechDetail { label: string; value: string; note: string; icon: string | null }
export interface BriefRelated { stage: string; name: string; cat: string; note: string; format: string | null; size: string | null }
export interface BriefHighlight { icon: string; title: string; subtitle: string; pdfText?: string }
export interface ValueBriefData {
  name: string;
  description: string | null;
  keyAdvantages: KeyAdvantage[];
  features: string[];
  techDetails: BriefTechDetail[];
  relatedProducts: BriefRelated[];
  presentations: ProductPresentation[];
  // For combined (parallel-media) briefs: formats grouped by product, shown as
  // "Product A title + its formats, then Product B title + its formats".
  formatGroups?: { name: string; presentations: ProductPresentation[] }[];
  specs: { time: string; sensitivity: string; technology: string } | null;
  detects: string | null;
  detectedList?: string[] | null;
  descriptionIsCustom?: boolean;
  highlights: BriefHighlight[];
  plant: { title: string; body: string }[];
  lab: { title: string; body: string }[];
  comparisonRows: BriefRow[];
  isAigor: boolean;
  isPcr: boolean;
  category?: string | null;     // non-PCR brief header (e.g. "Growth Medium")
  productLine?: string | null;  // non-PCR brief header (e.g. "Augmentis")
  heroImage: string | null;
  kitImage: string;
  // Optional short copy for the PDF (falls back to plant/lab if absent).
  pdfPlant?: { title: string; body: string }[];
  pdfLab?: { title: string; body: string }[];
  pdfDescription?: string;
}

export default function ProductBrief({
  data,
  onRequestQuote,
}: {
  data: ValueBriefData;
  onRequestQuote?: () => void;   // optional: contexts without a quote flow (e.g. the catalog) omit it
}) {
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">("idle");
  const [zoom, setZoom] = useState(false);

  // Generates the PDF only when the user clicks — react-pdf and the document
  // component are imported dynamically so they never load with the modal itself.
  const handleDownloadPdf = async () => {
    try {
      setPdfState("loading");
      const [{ pdf }, { default: ProductBriefDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ProductBriefDocument"),
      ]);
      const blob = await pdf(<ProductBriefDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name.replace(/\s+/g, "-").toLowerCase()}-brochure.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPdfState("idle");
    } catch (e) {
      console.error("PDF generation failed", e);
      setPdfState("error");
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden">
      
      {/* UI PRINCIPAL */}
      <div className="w-full bg-white pb-8">
        
        {/* HERO IMAGE — only for PCR kits; non-PCR products (consumables) have no hero */}
        {data.isPcr && (
          <div className="relative w-full h-[220px] md:h-[320px] bg-[#111111]">
            <img
              src={data.heroImage ?? "/foods2.png"}
              alt="hero_img"
              className="w-full h-full object-cover object-center opacity-90"
              onError={(e) => { const t = e.currentTarget; if (!t.src.endsWith("/foods2.png")) t.src = "/foods2.png"; }}
            />
          </div>
        )}

        {/* TITLE BLOCK */}
        <div className="px-8 md:px-12 pt-12 md:pt-16 pb-2 bg-white w-full">
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">
              {!data.isPcr && (data.category || data.productLine)
                ? [data.category, data.productLine].filter(Boolean).join(" · ")
                : "Product Value Brief"}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4">{data.name}</h2>
            {data.detectedList && data.detectedList.length ? (
              <div className="mb-4">
                <p className="text-sm md:text-base font-bold text-[#111111] mb-1">Detected microorganisms:</p>
                <ul className="list-disc pl-5 space-y-0.5 marker:text-[#FF270A]">
                  {data.detectedList.map((m, i) => (
                    <li key={i} className="text-sm md:text-base font-bold text-[#FF270A]">{m}</li>
                  ))}
                </ul>
              </div>
            ) : (
              data.detects && <p className="text-sm md:text-base font-bold text-[#FF270A] mb-4">Detects: {data.detects}</p>
            )}
            {data.description && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{data.description}</p>
            )}
          </div>
        </div>

        {/* AiGOR BANNER */}
        {data.isAigor && (
          <div className="w-full bg-[#0a0a0a] my-8 py-14 md:py-20 px-8 md:px-12 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FF270A]/15 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center relative z-10">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#d9467c] mb-4">Powered by AiGOR</span>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-snug mb-14">Bypassing biological limits through advanced RNA-based detection.</h3>
              
              <div className="relative mb-16 z-10 flex flex-col items-center">
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-[#FF270A] rounded-[1.5rem] blur-xl opacity-60"></div>
                 <div className="relative w-40 h-40 md:w-52 md:h-52 bg-[#0a0a0a] rounded-[1.5rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">AiGOR</h2>
                    <span className="mt-3 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF270A]">RNA TECHNOLOGY</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full">
                {(data.highlights ?? []).map((h, i) => {
                  const Icon = HIGHLIGHT_ICONS[h.icon] ?? Activity;
                  return (
                    <div key={i} className="flex flex-col items-center text-center">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-4" strokeWidth={1.5} />
                      <p className="text-sm text-white/70 leading-relaxed"><span className="font-bold text-white block mb-1">{h.title}.</span> {h.subtitle}.</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="px-8 md:px-12 py-10 md:py-12 bg-white w-full">
          <div className="flex flex-col gap-16 max-w-5xl mx-auto w-full">

            {/* KEY FEATURES — non-PCR products lead with their feature list */}
            {!data.isPcr && data.features.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">Key features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl">
                      <Check className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <p className="text-sm md:text-base text-gray-700 font-medium leading-snug">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HIGHLIGHTS (non-AiGOR kits show them here; AiGOR kits show them in the banner) */}
            {!data.isAigor && (data.highlights ?? []).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(data.highlights ?? []).map((h, i) => {
                  const Icon = HIGHLIGHT_ICONS[h.icon] ?? Activity;
                  return (
                    <div key={i} className="flex flex-col items-center text-center p-5 bg-gray-50 rounded-2xl">
                      <Icon className="w-7 h-7 md:w-9 md:h-9 text-[#FF270A] mb-3" strokeWidth={1.5} />
                      <p className="text-sm font-black text-[#111111] leading-tight mb-1">{h.title}</p>
                      <p className="text-[11px] text-gray-500 font-medium leading-snug">{h.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 1. WHAT IT MEANS FOR YOUR PLANT */}
            {data.plant.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-2">What it means for your plant</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium mb-8">The production impact — fewer stoppages, lower outbreak risk, leaner inventory.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.plant.map((b, i) => (
                    <div key={i} className="p-6 bg-[#FF270A]/5 border border-[#FF270A]/15 rounded-2xl">
                      <p className="text-base font-black text-[#111111] leading-tight mb-2">{b.title}</p>
                      <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. WHAT IT MEANS FOR THE LAB */}
            {data.lab.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-2">What it means for your lab</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium mb-8">The technical edge your team works with every day.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.lab.map((b, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-base font-black text-[#111111] leading-tight mb-2">{b.title}</p>
                      <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. HEAD-TO-HEAD COMPARISON */}
            {data.comparisonRows.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">How it compares</h3>
                <div className="rounded-2xl overflow-hidden border border-gray-100 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 font-black text-[#111111] uppercase tracking-widest text-[9px]">Feature</th>
                        <th className="px-4 py-3 font-black text-[#FF270A] uppercase tracking-widest text-[9px] text-center">TAAG</th>
                        <th className="text-left px-4 py-3 font-black text-[#111111] uppercase tracking-widest text-[9px]">Business Impact</th>
                        <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest text-[9px] text-center">Leading PCR</th>
                        <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest text-[9px] text-center">Traditional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.comparisonRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-4 py-3 font-semibold text-[#111111] align-top">{row.feature}</td>
                          <td className="px-4 py-3 text-center font-bold text-[#111111] align-top">{row.taag ?? "—"}</td>
                          <td className="px-4 py-3 text-[#FF270A] font-medium align-top leading-snug min-w-[180px]">{row.businessImpact ?? "—"}</td>
                          <td className="px-4 py-3 text-center text-gray-400 font-medium align-top">{row.leadingPcr ?? "—"}</td>
                          <td className="px-4 py-3 text-center text-gray-400 font-medium align-top">{row.traditional ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. TECHNICAL DETAILS */}
            {data.techDetails.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.techDetails.map((d, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-1.5">
                        {d.icon === "datasheet" && <FileText className="w-4 h-4 text-[#FF270A] shrink-0" />}
                        <span className="text-base font-bold text-[#111111] leading-tight">{d.label}</span>
                        {d.value === "AOAC" && <img src="/AOAC.png" alt="AOAC certified" className="h-7 w-auto shrink-0" />}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FORMATS — grouped by product for combined (parallel-media) briefs, else flat */}
            {(data.formatGroups?.length || data.presentations.length > 0) && (() => {
              const specChips = (pr: ProductPresentation) => [
                pr.shelfLifeMonths && pr.shelfLifeMonths !== "-" ? `Shelf life: ${pr.shelfLifeMonths} mo` : null,
                pr.storeTemp && pr.storeTemp !== "-" ? `Storage: ${pr.storeTemp}` : null,
                typeof pr.isReadyToUse === "boolean" ? (pr.isReadyToUse ? "Ready to use" : "Requires preparation") : null,
                pr.incubationTimeH && pr.incubationTimeH !== "-" ? `Incubation: ${pr.incubationTimeH.replace(/\n/g, " · ")} h` : null,
              ].filter(Boolean) as string[];
              const renderRow = (pr: ProductPresentation, label: string, key: number) => {
                const specs = specChips(pr);
                return (
                  <div key={key} className="flex items-start justify-between p-5 bg-gray-50 rounded-2xl gap-4 flex-1">
                    <div className="min-w-0">
                      <span className="text-sm md:text-base font-bold text-[#111111] block">{label}</span>
                      <span className="text-xs md:text-sm text-gray-500 font-medium">{[pr.format, pr.size].filter(Boolean).join(" · ") || "—"}</span>
                      {pr.kitContent && <span className="text-xs text-gray-400 font-medium block mt-0.5">{pr.kitContent}</span>}
                      {!data.isPcr && specs.length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                          {specs.map((s, j) => (
                            <span key={j} className="text-[10px] md:text-xs text-gray-500 font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#FF270A] tracking-[0.1em] shrink-0">Cat #{pr.catalogCode ?? "null"}</span>
                  </div>
                );
              };
              return (
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">Formats &amp; products</h3>
                  {data.formatGroups?.length ? (
                    <div className="flex flex-col gap-8">
                      {data.formatGroups.map((grp, gi) => (
                        <div key={gi}>
                          <h4 className="text-base md:text-lg font-bold text-[#111111] mb-3">{grp.name}</h4>
                          <div className="flex flex-col gap-2">
                            {grp.presentations.map((pr, i) => renderRow(pr, grp.name, i))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                      <div className="md:col-span-2 flex flex-col gap-2 h-full">
                        {data.presentations.map((pr, i) => renderRow(pr, data.name, i))}
                      </div>
                      <div className={data.isPcr ? "rounded-2xl overflow-hidden h-56" : "h-56 flex items-center justify-center"}>
                        <img
                          src={data.kitImage}
                          alt={data.name}
                          onClick={() => setZoom(true)}
                          className={
                            data.isPcr
                              ? "w-full h-full object-cover cursor-zoom-in"
                              : "max-h-56 max-w-full rounded-2xl object-contain cursor-zoom-in"
                          }
                          onError={(e) => { const t = e.currentTarget; if (!t.src.endsWith("/kit-placeholder.png")) t.src = "/kit-placeholder.png"; }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 6. RELATED PRODUCTS */}
            {data.relatedProducts.length > 0 && (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight mb-2">Related Products</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium mb-6">The accompanying products that complete this workflow.</p>
                <div className="flex flex-col gap-2">
                  {data.relatedProducts.map((r, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 shrink-0 w-24 pt-1">{r.stage}</span>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm md:text-base font-bold text-[#111111] leading-tight">{r.name}</span>
                          <span className="text-xs font-mono font-bold text-gray-500 tracking-[0.1em] shrink-0">Cat #{r.cat}</span>
                        </div>
                        {r.note && <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 leading-relaxed">{r.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TxA SECTION */}
        {data.isPcr && (
          <div className="w-full bg-gray-50 border-t border-gray-100 py-20 md:py-28 px-8 md:px-12 flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div className="relative w-48 h-20 md:w-56 md:h-24 mb-10">
                 <img src="/LogoTxANB.png" alt="TxA Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">Connect this kit to the TxA platform</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl whitespace-pre-line">
                Every result feeds TxA — TAAG&apos;s LIMS + AI platform — for automated interpretation, predictive environmental monitoring and real-time dashboards across your plant.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER CONTROLS */}
      <div className="p-8 md:p-12 bg-white border-t border-gray-100 rounded-b-[2.5rem] w-full">
         <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-4">
            
            {/* BOTÓN DESCARGAR PDF — genera on-demand al hacer clic */}
            <button
              onClick={handleDownloadPdf}
              disabled={pdfState === "loading"}
              className="flex-1 py-4 px-6 bg-white border-2 border-gray-200 text-[#111111] hover:border-[#111111] rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {pdfState === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</>
              ) : pdfState === "error" ? (
                <><Download className="w-4 h-4" /> Retry download</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF</>
              )}
            </button>

            {onRequestQuote && (
              <button 
                onClick={onRequestQuote} 
                className="flex-1 py-4 px-6 bg-[#111111] hover:bg-[#FF270A] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Mail className="w-4 h-4" /> Request Quote
              </button>
            )}
         </div>
      </div>

      {zoom && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <img
            src={data.kitImage}
            alt={data.name}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onError={(e) => { const t = e.currentTarget; if (!t.src.endsWith("/kit-placeholder.png")) t.src = "/kit-placeholder.png"; }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}