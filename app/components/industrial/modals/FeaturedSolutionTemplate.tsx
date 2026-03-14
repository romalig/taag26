"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Loader2, ArrowRight, Timer, Activity, Zap, Mail } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import BrochureDocument from "./BrochureDocument";
import { useModal } from "../ModalProvider";
import { useCTA } from "../../CTAProvider"; // <-- Importamos tu hook de Contacto

export default function FeaturedSolutionTemplate({ data }: { data: any }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { closeModal } = useModal();
  const { openMeeting } = useCTA(); // <-- Lo iniciamos

  if (!data) return null;

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const blob = await pdf(<BrochureDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      const safeName = data.title.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `TAAG_Brochure_${safeName}.pdf`; 
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
      
      {/* 1. HERO IMAGE */}
      <div className="relative w-full h-[250px] md:h-[350px] bg-[#111111]">
         {data.heroImage && (
            <Image 
              src={data.heroImage} 
              alt={data.title} 
              fill 
              className="object-cover object-center opacity-90" 
              priority
            />
         )}
      </div>

      {/* 2. TÍTULO Y BAJADA */}
      <div className="px-8 md:px-12 pt-16 pb-12 md:pt-24 md:pb-20 bg-white w-full">
        <div className="max-w-5xl mx-auto w-full">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs md:text-sm mb-6 block">
               Featured Solution
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
               {data.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
               {data.subtitle}
            </p>
        </div>
      </div>
      
      {/* === 3. SECCIÓN: BANNER AiGOR === */}
      {data.hasAigorBanner && (
         <div className="w-full bg-[#0a0a0a] py-16 md:py-24 px-8 md:px-12 relative overflow-hidden flex flex-col items-center text-center shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FF270A]/15 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                <div className="relative z-10 mb-14 text-center w-full max-w-3xl mx-auto flex flex-col items-center">
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#d9467c] mb-4">
                     Powered by AiGOR
                   </span>
                   <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                     Bypassing biological limits through advanced RNA-based detection.
                   </h3>
                </div>

                <div className="relative mb-20 z-10 flex flex-col items-center">
                   <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-[#FF270A] rounded-[2.5rem] blur-xl opacity-60"></div>
                   <div className="relative w-64 h-64 md:w-[300px] md:h-[300px] bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-10 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
                      <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                        AiGOR
                      </h2>
                      <span className="mt-5 text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#FF270A]">
                        RNA TECHNOLOGY
                      </span>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 w-full z-10 mb-12">
                  <div className="flex flex-col items-center text-center">
                    <Timer className="w-8 h-8 md:w-10 md:h-10 text-white mb-5" strokeWidth={1.5} />
                    <p className="text-sm text-white/70 leading-relaxed max-w-[160px]"><span className="font-bold text-white block mb-1">Results in 3 hours.</span> Skip long enrichments.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Activity className="w-8 h-8 md:w-10 md:h-10 text-white mb-5" strokeWidth={1.5} />
                    <p className="text-sm text-white/70 leading-relaxed max-w-[160px]"><span className="font-bold text-white block mb-1">1 CFU/sample.</span> Maximum precision.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-white mb-5" strokeWidth={1.5} />
                    <p className="text-sm text-white/70 leading-relaxed max-w-[160px]"><span className="font-bold text-white block mb-1">10,000x sensitivity.</span> vs. real-time PCR.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-8 md:h-10 mb-5">
                      <span className="text-base md:text-lg font-bold text-white tracking-widest uppercase">RNA</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed max-w-[160px]"><span className="font-bold text-white block mb-1">RNA detection.</span> Targets active cells.</p>
                  </div>
                </div>

                <Link 
                  href="/aigor" 
                  onClick={closeModal}
                  className="inline-flex items-center gap-3 text-sm md:text-base font-semibold text-white hover:text-[#FF270A] transition-colors z-10 py-2"
                >
                  Explore AiGOR Technology <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
         </div>
      )}

      {/* === 4. RESTO DEL CONTENIDO === */}
      <div className="p-8 md:p-12 bg-white w-full">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* SOLUTION OVERVIEW */}
          <div className="mb-20 w-full pt-6">
             <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
               Solution Overview
             </h3>
             <p className="text-gray-600 text-base md:text-lg leading-relaxed">
               {data.description}
             </p>
          </div>

          {/* ELEVIA PRODUCTS */}
          {data.eleviaProducts && (
             <div className="mb-24 w-full">
                <div className="mb-10 max-w-3xl">
                   <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4">
                     Welcome to the future.<br/>Meet Elevia Products.
                   </h3>
                   <p className="text-lg text-gray-600 leading-relaxed font-medium">
                     {data.eleviaProducts.intro}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                   {data.eleviaProducts.main.map((prod: any, i: number) => (
                     <div key={i} className="md:col-span-3 bg-[#121212] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[400px] border border-black">
                        <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
                           <Image src={prod.image} alt={prod.title} fill className="object-cover object-center opacity-100" />
                           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col flex-1 p-8 pt-4 md:p-10 md:pt-4">
                           <h3 className="text-2xl font-bold text-white tracking-tight mb-3">{prod.title}</h3>
                           <p className="text-white/80 font-medium text-sm leading-relaxed">{prod.desc}</p>
                        </div>
                     </div>
                   ))}

                   {data.eleviaProducts.upcoming.map((prod: any, i: number) => (
                     <div key={i} className="md:col-span-2 bg-[#121212] rounded-[2rem] p-8 h-[260px] md:h-[280px] relative flex flex-col justify-between border border-black">
                        <div>
                           <h3 className="text-xl font-bold text-white mb-4">{prod.title}</h3>
                           <p className="text-sm text-white/80 leading-relaxed">{prod.desc}</p>
                        </div>
                        <div className="mt-auto">
                           <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                             {prod.launch}
                           </span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          )}

          {/* KEY ADVANTAGES */}
          <div className="mb-24 w-full">
             <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
               Key Advantages
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.advantages.map((adv: string, i: number) => {
                   const [title, ...rest] = adv.split(":");
                   const description = rest.join(":");
                   return (
                     <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#FF270A] mt-2.5 shrink-0"></div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          <span className="font-bold text-[#111111] text-base block mb-1">{title}{description ? ":" : ""}</span> 
                          {description}
                        </p>
                     </div>
                   );
                })}
             </div>
          </div>

          {/* TABLA DE PROTOCOLOS */}
          {data.protocolsTable && (
             <div className="mb-10 w-full">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                  Protocol zero vs. Protocol xpress: the right strategy for every situation
                </h3>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-4 pr-4 w-[25%]"></th>
                        <th className="py-4 px-4 w-[37.5%]">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#111111] text-sm tracking-wide">PROTOCOL ZERO</span>
                            <div className="relative w-16 h-6 shrink-0">
                               <Image src="/zero_logo.png" alt="Zero Logo" fill className="object-contain object-left" />
                            </div>
                          </div>
                        </th>
                        <th className="py-4 pl-4 w-[37.5%]">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#111111] text-sm tracking-wide">PROTOCOL XPRESS</span>
                            <div className="relative w-20 h-6 shrink-0">
                               <Image src="/xpress_logo.png" alt="Xpress Logo" fill className="object-contain object-left" />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.protocolsTable.map((row: any, i: number) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-5 pr-4 font-bold text-[#111111] text-sm">{row.feature}</td>
                          <td className="py-5 px-4 text-gray-600 text-sm leading-relaxed">{row.zero}</td>
                          <td className="py-5 pl-4 text-gray-600 text-sm leading-relaxed">{row.xpress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

        </div> 
      </div>

      {/* === 5. NUEVA SECCIÓN: TxA (Full-Width Gris con títulos corregidos) === */}
      {data.txaSection && (
         <div className="w-full bg-[#F4F4F5] py-20 md:py-28 px-8 md:px-12 relative flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
               {/* 2. Logo TxA un POCO más grande */}
               <div className="relative w-48 h-20 md:w-56 md:h-24 mb-10">
                  <Image src={data.txaSection.logo} alt="TxA Logo" fill className="object-contain" />
               </div>
               
               {/* 3. Título con formato corregido (estilo Elevia) */}
               <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                 {data.txaSection.title}
               </h3>
               
               <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12 max-w-3xl whitespace-pre-line">
                 {data.txaSection.desc}
               </p>

               <Link 
                 href={data.txaSection.linkHref} 
                 onClick={closeModal}
                 className="inline-flex items-center gap-3 text-sm md:text-base font-semibold text-[#111111] hover:text-[#FF270A] transition-colors"
               >
                 {data.txaSection.linkText} <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
         </div>
      )}

      {/* === 6. BOTONES FINALES (Contacto y Descarga) === */}
      <div className="p-8 md:p-12 flex flex-col md:flex-row justify-end items-center gap-4 bg-white">
         <button 
           onClick={openMeeting}
           className="w-full md:w-auto py-4 px-8 bg-white border border-gray-200 text-[#111111] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
         >
            <Mail className="w-5 h-5 text-gray-500" />
            Contact Sales
         </button>

         <button 
           onClick={handleDownloadPDF}
           disabled={isGeneratingPdf}
           className="w-full md:w-auto py-4 px-8 bg-[#111111] hover:bg-[#FF270A] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
         >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white/70" /> Generating Brochure...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Brochure (PDF)
              </>
            )}
         </button>
      </div>

    </div>
  );
}