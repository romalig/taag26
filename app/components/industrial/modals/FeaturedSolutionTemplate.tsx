"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Timer, Activity, Zap, Mail, CheckCircle2, ArrowRightLeft, Loader2, WifiOff } from "lucide-react";
import { useModal } from "../ModalProvider";
import { useCTA } from "../../CTAProvider";
import { getKitSolutionByTitle } from "@/app/lib/products-api";
import SolutionTemplate from "./SolutionTemplate";
import type { SolutionContent } from "./types";

export default function FeaturedSolutionTemplate({ data }: { data: any }) {
  const { closeModal, openModal } = useModal();
  const { openMeeting } = useCTA();
  const [loadingTitle, setLoadingTitle] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, SolutionContent>>({});
  const promiseRef = useRef<Record<string, Promise<SolutionContent | null>>>({});

  // Silently prefetch all Elevia product datasheets on mount
  useEffect(() => {
    const titles: string[] = [];
    data?.eleviaProducts?.main?.forEach((p: { apiTitle?: string }) => { if (p.apiTitle) titles.push(p.apiTitle); });
    data?.eleviaProducts?.upcoming?.forEach((p: { apiTitle?: string }) => { if (p.apiTitle) titles.push(p.apiTitle); });
    titles.forEach((title) => {
      const p = getKitSolutionByTitle(title)
        .then((d) => { if (d) cacheRef.current[title] = d; return d; })
        .catch(() => null);
      promiseRef.current[title] = p;
    });
  }, [data]);

  const handleLearnMore = (apiTitle: string) => {
    if (!apiTitle) return;
    const cached = cacheRef.current[apiTitle];
    if (cached) {
      openModal(<SolutionTemplate data={cached} />);
      return;
    }
    setErrorTitle(null);
    setLoadingTitle(apiTitle);
    const p =
      promiseRef.current[apiTitle] ??
      getKitSolutionByTitle(apiTitle).then((d) => {
        if (d) cacheRef.current[apiTitle] = d;
        return d;
      });
    p.then((solution) => {
        if (solution) openModal(<SolutionTemplate data={solution} />);
        else setErrorTitle(apiTitle);
      })
      .catch(() => setErrorTitle(apiTitle))
      .finally(() => setLoadingTitle((cur) => (cur === apiTitle ? null : cur)));
  };

  if (!data) return null;

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
      <div className={`px-8 md:px-12 pt-16 md:pt-24 bg-white w-full ${data.hasAigorBanner ? 'pb-12 md:pb-20' : 'pb-4 md:pb-8'}`}>
        <div className="max-w-5xl mx-auto w-full">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs md:text-sm mb-6 block">
               Featured Solution
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
               {data.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
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

                <div className="relative mb-16 z-10 flex flex-col items-center">
                   <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-[#FF270A] rounded-[1.5rem] blur-xl opacity-60"></div>
                   <div className="relative w-40 h-40 md:w-52 md:h-52 bg-[#0a0a0a] rounded-[1.5rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
                      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                        AiGOR
                      </h2>
                      <span className="mt-3 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF270A]">
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
      <div className={`px-8 md:px-12 pb-12 md:pb-20 bg-white w-full ${data.hasAigorBanner ? 'pt-16 md:pt-24' : 'pt-4 md:pt-8'}`}>
        <div className="max-w-5xl mx-auto w-full">
          
          {/* SOLUTION OVERVIEW */}
          <div className="mb-20 w-full">
             <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
               Solution Overview
             </h3>
             <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
               {data.description}
             </p>
          </div>

          {/* PRODUCTO MULTIPLEX */}
          {data.preventiveProduct && (
             <div className="mb-24 w-full">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4">
                  {data.preventiveProduct.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-4xl">
                   {data.preventiveProduct.desc}
                </p>
                <div className="bg-[#121212] rounded-[2rem] p-8 md:p-12 border border-black relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                   <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF270A]/10 blur-[100px] rounded-full pointer-events-none"></div>
                   
                   <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                         <h4 className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                            <Zap className="w-5 h-5" /> {data.preventiveProduct.list1Title || "Pathogens Detected"}
                         </h4>
                         <ul className="space-y-4">
                            {data.preventiveProduct.list1.map((item: string, i: number) => (
                               <li key={i} className="flex items-start gap-3 text-white md:text-lg font-medium">
                                  <CheckCircle2 className="w-6 h-6 text-[#FF270A] shrink-0" /> {item}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                         <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                            <Activity className="w-5 h-5" /> {data.preventiveProduct.list2Title || "Indicators Detected"}
                         </h4>
                         <ul className="space-y-4">
                            {data.preventiveProduct.list2.map((item: string, i: number) => (
                               <li key={i} className="flex items-start gap-3 text-white md:text-lg font-medium">
                                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" /> {item}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* ELEVIA PRODUCTS */}
          {data.eleviaProducts && (
             <div className="mb-24 w-full">
                <div className="mb-10 max-w-4xl">
                   <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
                     Welcome to the future.<br/>Meet Elevia Products.
                   </h3>
                   <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                     {data.eleviaProducts.intro}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                   {/* Tarjetas Principales */}
                   {data.eleviaProducts.main.map((prod: any, i: number) => (
                     <div key={i} className="md:col-span-3 bg-[#121212] rounded-[2rem] relative flex flex-col overflow-hidden min-h-[400px] border border-black">
                        <div className="relative w-full h-[220px] md:h-[260px] z-0 pointer-events-none shrink-0">
                           <Image src={prod.image} alt={prod.title} fill className="object-cover object-center opacity-100" />
                           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col flex-1 p-8 pt-4 md:p-10 md:pt-4">
                           <h3 className="text-2xl font-bold text-white tracking-tight mb-3">{prod.title}</h3>
                           <p className="text-white/80 text-sm leading-relaxed mb-8">{prod.desc}</p>
                           
                           {/* BOTÓN LEARN MORE INTEGRADO */}
                           <div className="mt-auto pt-6 border-t border-white/10">
                              <button
                                onClick={() => handleLearnMore(prod.apiTitle)}
                                disabled={loadingTitle === prod.apiTitle || errorTitle === prod.apiTitle}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] hover:text-white/70 transition-colors group disabled:opacity-60"
                              >
                                {loadingTitle === prod.apiTitle
                                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                                  : errorTitle === prod.apiTitle
                                  ? <><WifiOff className="w-4 h-4" /> Unavailable</>
                                  : <>Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" /></>}
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}

                   {/* Tarjetas Secundarias (Upcoming) */}
                   {data.eleviaProducts.upcoming && data.eleviaProducts.upcoming.map((prod: any, i: number) => (
                     <div key={i} className="md:col-span-2 bg-[#121212] rounded-[2rem] p-8 h-[260px] md:h-[280px] relative flex flex-col justify-between border border-black">
                        <div>
                           <h3 className="text-xl font-bold text-white mb-4">{prod.title}</h3>
                           <p className="text-sm text-white/80 leading-relaxed mb-4">{prod.desc}</p>
                        </div>
                        <div className="mt-auto flex flex-col items-start gap-4">
                           
                           {/* CONDICIONAL: Solo mostrar el botón "Learn More" en la primera tarjeta (índice 0) */}
                           {i === 0 && prod.apiTitle && (
                             <button
                               onClick={() => handleLearnMore(prod.apiTitle)}
                               disabled={loadingTitle === prod.apiTitle || errorTitle === prod.apiTitle}
                               className="inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] hover:text-white/70 transition-colors group disabled:opacity-60"
                             >
                               {loadingTitle === prod.apiTitle
                                 ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                                 : errorTitle === prod.apiTitle
                                 ? <><WifiOff className="w-4 h-4" /> Unavailable</>
                                 : <>Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" /></>}
                             </button>
                           )}

                           {/* CONDICIONAL: Solo mostrar "LAUNCH 2Q 2026" en las demás tarjetas (índice mayor a 0) */}
                           {i > 0 && prod.launch && (
                             <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                               {prod.launch}
                             </span>
                           )}

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

          {/* VALIDATED MATRICES & AOAC LOGO */}
          {data.matrices && data.matrices.length > 0 && (
             <div className="mb-16 w-full pt-8 border-t border-gray-100">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                  Validated Matrices
                </h3>
                <div className="flex flex-wrap gap-3 mb-10">
                   {data.matrices.map((mat: string, i: number) => (
                      <span key={i} className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm">
                         {mat}
                      </span>
                   ))}
                </div>
                {/* Logo AOAC — oculto temporalmente
                {data.aoacLogo && (
                   <div className="relative w-32 h-16 opacity-90">
                      <Image src={data.aoacLogo} alt="AOAC Validated" fill className="object-contain object-left" />
                   </div>
                )}
                */}
             </div>
          )}

          {/* TABLA DINÁMICA DE COMPARACIÓN */}
          {data.table && (
             <div className="mb-24 w-full">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                  {data.table.title}
                </h3>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-4 pr-4 w-[25%]"></th>
                        <th className="py-4 px-4 w-[37.5%]">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#111111] text-sm tracking-wide">{data.table.col1.title}</span>
                            {data.table.col1.image && (
                              <div className="relative w-16 h-6 shrink-0">
                                 <Image src={data.table.col1.image} alt="Col 1 Logo" fill className="object-contain object-left" />
                              </div>
                            )}
                          </div>
                        </th>
                        <th className="py-4 pl-4 w-[37.5%]">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#111111] text-sm tracking-wide">{data.table.col2.title}</span>
                            {data.table.col2.image && (
                              <div className="relative w-20 h-6 shrink-0">
                                 <Image src={data.table.col2.image} alt="Col 2 Logo" fill className="object-contain object-left" />
                              </div>
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.table.rows.map((row: any, i: number) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-5 pr-4 font-bold text-[#111111] text-sm">{row.feature}</td>
                          <td className="py-5 px-4 text-gray-600 text-sm leading-relaxed">{row.col1}</td>
                          <td className="py-5 pl-4 text-gray-600 text-sm leading-relaxed">{row.col2}</td>
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

          {/* ORDERING INFORMATION */}
          {data.orderingInfo && data.orderingInfo.length > 0 && (
             <div className="mb-6 w-full pt-8 border-t border-gray-100">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                  Ordering Information
                </h3>
                <div className="overflow-x-auto pb-4">
                  <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                      <tr className="border-b-2 border-[#111111]">
                        <th className="py-4 pr-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[12%]">Cat. No</th>
                        <th className="py-4 px-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[25%]">Product</th>
                        <th className="py-4 px-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[12%]">Size</th>
                        <th className="py-4 px-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[12%]">Format</th>
                        <th className="py-4 pl-4 font-bold text-[#111111] text-[10px] uppercase tracking-widest w-[39%]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orderingInfo.map((item: any, i: number) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-4 pr-4 text-gray-500 text-sm font-mono">{item.catNo}</td>
                          <td className="py-4 px-4 font-bold text-[#111111] text-sm">{item.product}</td>
                          <td className="py-4 px-4 text-gray-600 text-sm">{item.size}</td>
                          <td className="py-4 px-4 text-gray-600 text-sm">{item.format}</td>
                          <td className="py-4 pl-4 text-gray-600 text-sm leading-relaxed">{item.description}</td>
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
      </div>

      {/* === 5. NUEVA SECCIÓN: TxA (Full-Width Gris) === */}
      {data.txaSection && (
         <div className="w-full bg-[#F4F4F5] py-20 md:py-28 px-8 md:px-12 relative flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
               <div className="relative w-48 h-20 md:w-56 md:h-24 mb-10">
                  <Image src={data.txaSection.logo} alt="TxA Logo" fill className="object-contain" />
               </div>
               
               <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mb-8">
                 {data.txaSection.title}
               </h3>
               
               <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-12 max-w-4xl whitespace-pre-line">
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

      {/* === 6. BOTÓN FINAL (Contacto) === */}
      <div className="p-8 md:p-12 flex justify-end items-center bg-white">
         <button 
           onClick={openMeeting}
           className="w-full md:w-auto py-4 px-8 bg-[#111111] hover:bg-[#FF270A] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
         >
            <Mail className="w-5 h-5" />
            Contact Us
         </button>
      </div>

    </div>
  );
}