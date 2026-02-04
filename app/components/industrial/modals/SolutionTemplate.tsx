"use client";

import { useState } from "react";
import { CheckCircle2, FlaskConical, Download, Mail, ArrowRightLeft, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import DatasheetDocument from "./DatasheetDocument";
import { SolutionContent } from "./types";

export default function SolutionTemplate({ data }: { data: SolutionContent }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!data) return null;

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const blob = await pdf(<DatasheetDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // DETECCIÓN DE MÓVIL: En celular abrimos pestaña, en PC descargamos.
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
         window.open(url, '_blank');
      } else {
         const link = document.createElement('a');
         link.href = url;
         link.download = `${data.title.replace(/\s+/g, "_")}_Datasheet.pdf`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
      
      setTimeout(() => URL.revokeObjectURL(url), 2000);

    } catch (error) {
      console.error("PDF Error:", error);
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
          <div className="flex flex-wrap gap-3 mb-10">
            {data.chips.map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-b border-gray-100 pb-12">
          <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Targets</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">{data.techSpecs.targets}</span>
          </div>
          <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">LOD</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">{data.techSpecs.lod}</span>
          </div>
          <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Matrices</span>
              <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">{data.techSpecs.matrices}</span>
          </div>
          <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Time</span>
              <span className="block text-lg md:text-xl font-bold text-[#FF270A] leading-tight">{data.techSpecs.time}</span>
          </div>
        </div>

        {/* Description & Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-[#111111] mb-4">Description</h3>
              {data.description.map((p, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed text-base mb-6 last:mb-0">{p}</p>
              ))}
          </div>
          <div className="md:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-4">Key Advantages</h3>
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

        {/* Specs Modal (Resumen) */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#111111] mb-6">Technical Specifications</h3>
          <div className="border-t border-gray-200">
             {[
               { label: "Technology", value: data.techSpecs.technology },
               { label: "Detection Chemistry", value: data.techSpecs.chemistry },
               { label: "Channels Needed", value: data.techSpecs.channels },
               { label: "Storage", value: data.techSpecs.storage },
               { label: "Shelf Life", value: data.techSpecs.shelfLife },
             ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-4 border-b border-gray-100">
                   <div className="text-sm font-semibold text-gray-500">{row.label}</div>
                   <div className="md:col-span-2 text-sm font-medium text-[#111111]">{row.value}</div>
                </div>
             ))}
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#111111] mb-2">Order Information</h3>
          <p className="text-sm text-gray-500 mb-6">Select the appropriate kit size.</p>
          
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-4 pr-4 w-[18%]">Cat. Number</th>
                      <th className="py-4 px-4 w-[22%]">Name</th>
                      <th className="py-4 px-4 w-[15%]">Size</th>
                      <th className="py-4 px-4 w-[15%]">Format</th>
                      <th className="py-4 pl-4 w-[30%]">Description</th>
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
             <ArrowRightLeft className="w-3 h-3" /> Swipe left to view all columns
          </p>
        </div>

        {/* Supplies */}
        {data.supplies && data.supplies.length > 0 && (
            <div className="mb-16">
              <h4 className="text-lg font-bold text-[#111111] mb-6 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-gray-400" /> Additional Supplies
              </h4>
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
                    <thead>
                      <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <th className="py-4 pr-4 w-[18%]">Cat. Number</th>
                          <th className="py-4 px-4 w-[22%]">Name</th>
                          <th className="py-4 px-4 w-[15%]">Size</th>
                          <th className="py-4 px-4 w-[15%]">Format</th>
                          <th className="py-4 pl-4 w-[30%]">Description</th>
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
                  <ArrowRightLeft className="w-3 h-3" /> Swipe left to view all columns
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
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-gray-500 group-hover:text-[#111111] transition-colors" />
                Download Datasheet (PDF)
              </>
            )}
         </button>
         <button className="flex-1 py-4 px-6 bg-[#111111] hover:bg-[#FF270A] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg">
            <Mail className="w-4 h-4" />
            Contact Sales Team
         </button>
      </div>
    </div>
  );
}