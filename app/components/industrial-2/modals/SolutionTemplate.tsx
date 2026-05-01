"use client";

import { useState } from "react";
import { CheckCircle2, FlaskConical, Download, Mail, ArrowRightLeft, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import DatasheetDocument from "./DatasheetDocument";
import { SolutionContent } from "./types";
import { hasDisplayValue } from "@/app/lib/spec-values";
import InlineFormattedText from "@/app/components/shared/InlineFormattedText";
import { useCTA } from "@/app/components/CTAProvider";
import { useTranslations } from "next-intl";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function SolutionTemplate({ data }: { data: SolutionContent }) {
  const tm = useTranslations("Industrial.DatasheetModal");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { openMeeting } = useCTA();
  const showSensitivity = hasDisplayValue(data.techSpecs.sensitivity);
  const showTargetType = hasDisplayValue(data.targetType);

  if (!data) return null;

  const handleDownloadPDF = async () => {
    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      alert(tm("allowPopups"));
      return;
    }

    newWindow.document.write(
      `<html>
        <head><title>${escapeHtml(tm("loadingPdfTitle"))}</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#f4f4f5; font-family:sans-serif; color:#555;">
           <div style="text-align:center;">
             <div style="margin-bottom:10px; font-weight:bold;">${escapeHtml(tm("generatingDatasheetHtml"))}</div>
             <div style="font-size:12px;">${escapeHtml(tm("pleaseWait"))}</div>
           </div>
        </body>
      </html>`
    );

    setIsGeneratingPdf(true);

    try {
      const blob = await pdf(<DatasheetDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);

      newWindow.location.href = url;

      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (error) {
      console.error("PDF Error:", error);
      newWindow.close();
      alert(tm("pdfError"));
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden">
      
      <div className="p-8 md:p-12 pb-16 bg-white">
        
        {/* Header */}
        <div className="max-w-4xl pr-16 md:pr-0">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
            {data.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10">
            {data.chips.map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                {tech}
              </span>
            ))}
            {showTargetType && (
              <span className="text-2xl md:text-[2.1rem] font-medium tracking-tight text-[#111111] leading-none md:ml-6">
                {data.targetType}
              </span>
            )}
          </div>
        </div>

        {/* Metrics: row1 Targets | Main industries | Sensitivity (one row md+); row2 Matrices | Time */}
        <div className="space-y-8 mb-12 border-b border-gray-100 pb-12">
          <div
            className={`grid grid-cols-1 gap-6 ${
              showSensitivity ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tm("targets")}</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">
                <InlineFormattedText value={data.techSpecs.targets} />
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tm("mainIndustries")}</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">
                {data.mainIndustries.join(", ")}
              </span>
            </div>
            {showSensitivity ? (
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tm("sensitivity")}</span>
                <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">
                  <InlineFormattedText value={data.techSpecs.sensitivity} />
                </span>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tm("matricesLabel")}</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">
                <InlineFormattedText value={data.techSpecs.matrices} />
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tm("time")}</span>
              <span className="block text-lg md:text-xl font-bold text-[#FF270A] leading-tight">
                <InlineFormattedText value={data.techSpecs.time} />
              </span>
            </div>
          </div>
        </div>

        {/* Description & Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-[#111111] mb-4">{tm("descriptionHeading")}</h3>
              {data.description.map((p, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed text-base mb-6 last:mb-0">{p}</p>
              ))}
          </div>
          <div className="md:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-4">{tm("keyAdvantages")}</h3>
              <ul className="space-y-3">
                {data.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#FF270A] mt-0.5 shrink-0" />
                      <span>{adv}</span>
                  </li>
                ))}
              </ul>
          </div>
        </div>

        {/* Specs Modal */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#111111] mb-6">{tm("technicalSpecifications")}</h3>
          <div className="border-t border-gray-200">
             {[
               { label: tm("technology"), value: data.techSpecs.technology },
               { label: tm("detectionChemistry"), value: data.techSpecs.chemistry },
               { label: tm("channelsNeeded"), value: data.techSpecs.channels },
               { label: tm("storageShort"), value: data.techSpecs.storage },
               { label: tm("shelfLife"), value: data.techSpecs.shelfLife },
             ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-4 border-b border-gray-100">
                   <div className="text-sm font-semibold text-gray-500">{row.label}</div>
                   <div className="md:col-span-2 text-sm font-medium text-[#111111]"><InlineFormattedText value={row.value} /></div>
                </div>
             ))}
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#111111] mb-2">{tm("orderInformation")}</h3>
          <p className="text-sm text-gray-500 mb-6">{tm("selectKitSize")}</p>
          
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-4 pr-4 w-[18%]">{tm("catNumber")}</th>
                      <th className="py-4 px-4 w-[22%]">{tm("name")}</th>
                      <th className="py-4 px-4 w-[15%]">{tm("size")}</th>
                      <th className="py-4 px-4 w-[15%]">{tm("format")}</th>
                      <th className="py-4 pl-4 w-[30%]">{tm("description")}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.pcrKits.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 pr-4 font-mono text-[#FF270A] font-medium truncate">{row.cat}</td>
                        <td className="py-4 px-4 font-bold text-[#111111] truncate">{row.name}</td>
                        <td className="py-4 px-4 font-medium text-gray-600 truncate">{row.size}</td>
                        <td className="py-4 px-4 text-gray-600 truncate">{row.format}</td>
                        <td className="py-4 pl-4 text-gray-600">{row.desc}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
          </div>
          <p className="md:hidden text-xs text-gray-400 flex items-center gap-1.5 mt-2 pl-1">
             <ArrowRightLeft className="w-3 h-3" /> {tm("swipeForColumns")}
          </p>
        </div>

        {/* Supplies */}
        {data.supplies && data.supplies.length > 0 && (
            <div className="mb-16">
              <h4 className="text-lg font-bold text-[#111111] mb-6 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-gray-400" /> {tm("additionalSupplies")}
              </h4>
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
                    <thead>
                      <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <th className="py-4 pr-4 w-[18%]">{tm("catNumber")}</th>
                          <th className="py-4 px-4 w-[22%]">{tm("product")}</th>
                          <th className="py-4 px-4 w-[15%]">{tm("size")}</th>
                          <th className="py-4 px-4 w-[15%]">{tm("format")}</th>
                          <th className="py-4 pl-4 w-[30%]">{tm("description")}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {data.supplies.map((row, i) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-4 pr-4 font-mono text-[#FF270A] font-medium truncate">{row.cat}</td>
                            <td className="py-4 px-4 font-bold text-[#111111] truncate">{row.name}</td>
                            <td className="py-4 px-4 font-medium text-gray-600 truncate">{row.size}</td>
                            <td className="py-4 px-4 text-gray-600 truncate">{row.format}</td>
                            <td className="py-4 pl-4 text-gray-600">{row.desc}</td>
                          </tr>
                      ))}
                    </tbody>
                </table>
              </div>
              <p className="md:hidden text-xs text-gray-400 flex items-center gap-1.5 mt-2 pl-1">
                  <ArrowRightLeft className="w-3 h-3" /> {tm("swipeForColumns")}
              </p>
            </div>
        )}

      </div>

      <div className="p-8 md:p-12 pt-0 flex flex-col md:flex-row gap-4">
         <button 
           onClick={handleDownloadPDF}
           disabled={isGeneratingPdf}
           className="flex-1 py-4 px-6 bg-[#F4F4F5] hover:bg-[#E4E4E5] text-[#111111] rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
         >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" /> {tm("generatingPdf")}
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-gray-500 group-hover:text-[#111111] transition-colors" />
                {tm("viewDatasheetPdf")}
              </>
            )}
         </button>
         <button
           type="button"
           onClick={openMeeting}
           className="flex-1 py-4 px-6 bg-[#111111] hover:bg-[#FF270A] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
         >
            <Mail className="w-4 h-4" />
            {tm("contactSalesTeam")}
         </button>
      </div>
    </div>
  );
}
