"use client";

import { useState } from "react";
import { CheckCircle2, FlaskConical, Download, Mail, ArrowRightLeft, Loader2, AlertCircle } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import DatasheetDocument, { type DatasheetPdfLabels } from "./DatasheetDocument";
import { SolutionContent } from "./types";
import { hasDisplayValue } from "@/app/lib/spec-values";
import InlineFormattedText from "@/app/components/shared/InlineFormattedText";
import { useCTA } from "@/app/components/CTAProvider";
import { useTranslations } from "next-intl";

export default function SolutionTemplate({ data }: { data: SolutionContent }) {
  const tm = useTranslations("Industrial.DatasheetModal");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { openMeeting } = useCTA();
  const showSensitivity = hasDisplayValue(data.techSpecs.sensitivity);
  const showTargetType = hasDisplayValue(data.targetType);
  const pdfLabels: DatasheetPdfLabels = {
    technicalDataSheet: tm("technicalDataSheet"),
    targets: tm("targets"),
    mainIndustries: tm("mainIndustries"),
    sensitivity: tm("sensitivity"),
    intendedUse: tm("intendedUse"),
    keyAdvantages: tm("keyAdvantages"),
    principle: tm("principle"),
    industries: tm("industries"),
    limitations: tm("limitations"),
    technicalSpecifications: tm("technicalSpecifications"),
    microorganisms: tm("microorganisms"),
    validatedMatrices: tm("validatedMatrices"),
    time: tm("time"),
    technology: tm("technology"),
    validatedThermocyclers: tm("validatedThermocyclers"),
    detectionChemistry: tm("detectionChemistry"),
    detectionChannel: tm("detectionChannel"),
    storageConditions: tm("storageConditions"),
    temperature: tm("temperature"),
    shelfLife: tm("shelfLife"),
    certifications: tm("certifications"),
    orderInformation: tm("orderInformation"),
    catNo: tm("catNo"),
    name: tm("name"),
    size: tm("size"),
    format: tm("format"),
    kitContent: tm("kitContent"),
    additionalSupplies: tm("additionalSupplies"),
    product: tm("product"),
    description: tm("description"),
    pageOf: (page, total) => tm("pageOf", { page, total }),
  };

  if (!data) return null;

  // ===================================================================
  // NUEVA FUNCIÓN DE DESCARGA DIRECTA (A prueba de bloqueadores)
  // ===================================================================
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    
    try {
      // 1. Generamos el PDF en memoria
      const blob = await pdf(<DatasheetDocument data={data} labels={pdfLabels} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // 2. Creamos un enlace HTML "invisible"
      const link = document.createElement("a");
      link.href = url;
      
      // 3. Le asignamos un nombre al archivo dinámicamente
      const safeName = data.title.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `TAAG_Datasheet_${safeName}.pdf`; 
      
      // 4. Lo agregamos al documento, le hacemos clic y lo eliminamos
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Limpieza de memoria
      setTimeout(() => URL.revokeObjectURL(url), 3000);

    } catch (error) {
      console.error("PDF Error:", error);
      alert(tm("pdfError"));
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden">
      
      <div className="p-6 md:p-12 pb-16 bg-white">
        
        {/* === HEADER === */}
        <div className="mb-6 pt-4">
          <div className="max-w-4xl">
            {/* ETIQUETA ROJA */}
            <div className="mb-4">
              <span className="text-[#FF270A] font-bold uppercase tracking-widest text-[10px] md:text-xs">
                {tm("technicalDataSheet")}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-2">
              {data.title}
            </h2>
            
            {/* VERSIÓN */}
            {data.version && (
              <p className="text-sm font-medium text-gray-400 mt-3 mb-10">{data.version}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-14">
              {data.chips.map((tech) => (
                <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                  {tech}
                </span>
              ))}
              {showTargetType && (
                <span className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                  {data.targetType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* === METRICS: Targets | Main industries | Sensitivity (one row md+) === */}
        <div className="mb-12 border-b border-gray-100 pb-12">
          <div
            className={`grid grid-cols-1 gap-8 ${
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
              <span className="block text-base md:text-lg font-bold text-[#111111] leading-tight">
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
        </div>

        {/* === INTENDED USE & ADVANTAGES === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-[#111111] mb-4">{tm("intendedUse")}</h3>
              {data.intendedUse.map((p, idx) => (
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

        {/* === PRINCIPLE === */}
        <div className="mb-12 border-t border-gray-100 pt-12">
           <h3 className="text-xl font-bold text-[#111111] mb-4">{tm("principle")}</h3>
           <div className="max-w-4xl">
              {data.principle.map((p, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed text-base mb-4 last:mb-0">{p}</p>
              ))}
           </div>
        </div>

        {/* === INDUSTRIES & LIMITATIONS === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
               <h3 className="text-xl font-bold text-[#111111] mb-4">{tm("industries")}</h3>
               <div className="flex flex-wrap gap-2">
                 {data.mainIndustries.map((ind, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-200">{ind}</span>
                 ))}
               </div>
            </div>
            <div className="bg-orange-50/30 rounded-2xl p-6 border border-orange-100/50">
               <h3 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> {tm("limitations")}
               </h3>
               <ul className="space-y-2">
                 {data.limitations.map((lim, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-gray-700 leading-relaxed">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>{lim}</span>
                    </li>
                 ))}
               </ul>
            </div>
        </div>

        {/* === TECHNICAL SPECIFICATIONS === */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#111111] mb-6">{tm("technicalSpecifications")}</h3>
          <div className="border-t border-gray-200">
             {[
               { label: tm("microorganisms"), value: data.techSpecs.targets },
               ...(showSensitivity ? [{ label: tm("sensitivity"), value: data.techSpecs.sensitivity }] : []),
               { label: tm("validatedMatrices"), value: data.techSpecs.matrices },
               { label: tm("time"), value: data.techSpecs.time },
               { label: tm("technology"), value: data.techSpecs.technology },
               { label: tm("validatedThermocyclers"), value: data.techSpecs.thermocyclers },
               { label: tm("detectionChemistry"), value: data.techSpecs.chemistry },
               { label: tm("detectionChannel"), value: data.techSpecs.channels }
             ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 py-4 border-b border-gray-100">
                   <div className="text-sm font-semibold text-gray-500">{row.label}</div>
                   <div className="md:col-span-3 text-sm font-medium text-[#111111] leading-relaxed"><InlineFormattedText value={row.value} /></div>
                </div>
             ))}
          </div>
        </div>

        {/* === STORAGE & CERTIFICATIONS === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
            {/* Storage */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 w-full">
               <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-6">{tm("storageConditions")}</h3>
               <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tm("temperature")}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{data.techSpecs.storage}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tm("shelfLife")}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1 whitespace-pre-line leading-relaxed">{data.techSpecs.shelfLife}</p>
                  </div>
               </div>
            </div>
            
            {/* Certifications */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col justify-center w-full">
               <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-6">{tm("certifications")}</h3>
               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="text-sm font-medium text-gray-700 leading-relaxed flex-1 whitespace-pre-line text-center sm:text-left">
                     {data.techSpecs.certifications}
                  </div>
                  {data.certImage && (
                     <div className="w-32 h-32 md:w-40 md:h-40 relative shrink-0">
                        <img src={data.certImage} alt={tm("certificationImageAlt")} className="w-full h-full object-contain mix-blend-multiply" />
                     </div>
                  )}
               </div>
            </div>
        </div>

        {/* === ORDER INFO (KITS) === */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#111111] mb-6">{tm("orderInformation")}</h3>
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-4 pr-4 w-[15%]">{tm("catNo")}</th>
                      <th className="py-4 px-4 w-[20%]">{tm("name")}</th>
                      <th className="py-4 px-4 w-[15%]">{tm("size")}</th>
                      <th className="py-4 px-4 w-[12%]">{tm("format")}</th>
                      <th className="py-4 pl-4 w-[38%]">{tm("kitContent")}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.pcrKits.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 pr-4 font-mono text-[#FF270A] font-bold">{row.cat}</td>
                        <td className="py-4 px-4 font-bold text-[#111111]">{row.name}</td>
                        <td className="py-4 px-4 font-medium text-gray-600">{row.size}</td>
                        <td className="py-4 px-4 text-gray-600">{row.format}</td>
                        <td className="py-4 pl-4 text-gray-600 leading-relaxed whitespace-pre-line">
                           {row.desc}
                        </td>
                      </tr>
                  ))}
                </tbody>
            </table>
          </div>
          <p className="md:hidden text-xs text-gray-400 flex items-center gap-1.5 mt-2 pl-1">
             <ArrowRightLeft className="w-3 h-3" /> {tm("swipeForColumns")}
          </p>
        </div>

        {/* === ORDER INFO (SUPPLIES) === */}
        {data.supplies && data.supplies.length > 0 && (
            <div className="mb-16">
              <h4 className="text-lg font-bold text-[#111111] mb-6 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-gray-400" /> {tm("additionalSupplies")}
              </h4>
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
                    <thead>
                      <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <th className="py-4 pr-4 w-[15%]">{tm("catNo")}</th>
                          <th className="py-4 px-4 w-[20%]">{tm("product")}</th>
                          <th className="py-4 px-4 w-[15%]">{tm("size")}</th>
                          <th className="py-4 px-4 w-[12%]">{tm("format")}</th>
                          <th className="py-4 pl-4 w-[38%]">{tm("description")}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {data.supplies.map((row, i) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-4 pr-4 font-mono text-[#FF270A] font-bold">{row.cat}</td>
                            <td className="py-4 px-4 font-bold text-[#111111]">{row.name}</td>
                            <td className="py-4 px-4 font-medium text-gray-600">{row.size}</td>
                            <td className="py-4 px-4 text-gray-600">{row.format}</td>
                            <td className="py-4 pl-4 text-gray-600 leading-relaxed whitespace-pre-line">
                               {row.desc}
                            </td>
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

      {/* === BOTONES INFERIORES === */}
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
                {tm("downloadDatasheet")}
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
