"use client";

import { useEffect, useRef, useState } from "react";

export default function FinancialSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Animación dinámica al hacer scroll (In y Out)
  useEffect(() => {
    const currentRef = sectionRef.current;
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timeoutId = setTimeout(() => {
            setAnimate(true);
          }, 1000);
        } else {
          clearTimeout(timeoutId);
          setAnimate(false);
        }
      },
      { threshold: 0.2 } 
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearTimeout(timeoutId); 
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#F5F5F7] text-[#111111] border-t border-gray-200">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl">
           <div>
              <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 md:mb-4 block">
                ROI ANALYSIS
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
                Economic Impact:<br /> Slashing operational costs by <span className="text-[#FF270A]">€228k.</span>
              </h2>
           </div>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-16 items-center">
          
          {/* 1. VISUALIZACIÓN DEL GRÁFICO */}
          <div className="w-full lg:w-1/2 flex flex-col relative">
             
             {/* Título del Eje Y */}
             <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 md:mb-6 ml-8 md:ml-14 shrink-0">
                Thousands € / year
             </div>

             {/* Área Principal del Gráfico: Altura fija en móvil para que los porcentajes funcionen */}
             <div className="relative w-full h-[260px] sm:h-[350px] lg:flex-1 lg:h-auto flex pt-2 md:pt-4">
                
                {/* Columna de Números del Eje Y */}
                <div className="w-8 md:w-14 shrink-0 flex flex-col justify-between pb-6 md:pb-8 text-[10px] md:text-sm font-semibold text-gray-400 text-right pr-2 md:pr-4 z-20 bg-white">
                  <span>600</span>
                  <span>500</span>
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>

                {/* Área de las Barras y Líneas */}
                <div className="flex-1 relative flex items-end justify-around pb-6 md:pb-8 border-l border-gray-100 h-full">
                  
                  {/* Líneas de fondo */}
                  <div className="absolute inset-0 flex flex-col justify-between pb-6 md:pb-8 pointer-events-none z-0">
                    {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                        <div key={i} className="w-full border-t border-gray-100 h-0"></div>
                    ))}
                  </div>

                  {/* BARRA 1: AiGOR */}
                  <div 
                    className="relative w-16 sm:w-20 md:w-32 flex flex-col-reverse z-10 mt-auto shadow-md rounded-t-sm md:rounded-t-md transition-[height] duration-1000 ease-out overflow-hidden"
                    style={{ height: animate ? '53%' : '0%' }}
                  >
                     <div className="w-full h-[26.4%] bg-[#FF270A] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-base">
                        <span className={`transition-opacity duration-700 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>E</span>
                     </div>
                     <div className="w-full h-[73.6%] bg-gray-600 rounded-t-sm md:rounded-t-md flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-base p-1 text-center leading-tight">
                        <span className={`transition-opacity duration-700 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>A x B x D</span>
                     </div>
                  </div>

                  {/* BARRA 2: External Testing */}
                  <div 
                    className="relative w-16 sm:w-20 md:w-32 bg-gray-600 rounded-t-sm md:rounded-t-md flex items-center justify-center text-white font-bold text-[10px] sm:text-xs md:text-base shadow-md z-10 mt-auto transition-[height] duration-1000 ease-out overflow-hidden p-1 text-center leading-tight"
                    style={{ height: animate ? '91%' : '0%' }}
                  >
                     <span className={`transition-opacity duration-700 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>A x B x C</span>
                  </div>

                </div>
             </div>

             {/* Eje X Etiquetas */}
             <div className="flex justify-around mt-3 ml-8 md:ml-14 text-center">
                <div className="w-16 sm:w-20 md:w-32 text-[9px] sm:text-xs md:text-sm font-semibold text-[#111111] leading-tight">
                    Internal testing (AiGOR)
                </div>
                <div className="w-16 sm:w-20 md:w-32 text-[9px] sm:text-xs md:text-sm font-semibold text-[#111111] leading-tight">
                    External testing
                </div>
             </div>

             {/* Leyenda y Notas (Desktop) */}
             <div className="flex flex-col gap-6 mt-8 md:mt-12 pl-8 md:pl-14 shrink-0">
                
                {/* Leyenda */}
                <div className="flex justify-center md:justify-start gap-6 md:gap-8">
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-600"></span>
                     <span className="text-xs md:text-sm font-semibold text-gray-700">Testing cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FF270A]"></span>
                     <span className="text-xs md:text-sm font-semibold text-gray-700">Lab HHRR cost</span>
                  </div>
                </div>

                {/* NOTAS LEGALES (VISIBLES SOLO EN DESKTOP) */}
                <div className="hidden lg:block space-y-3 text-[10px] text-gray-400 font-medium leading-relaxed max-w-lg mt-4">
                   <p>* Based on average market pricing for outsourced environmental Salmonella PCR and Enterobacteriaceae in Europe. Actual costs may vary by region, provider, and testing volume.</p>
                   <p>** AiGOR testing cost includes all reagents required for one complete test (from sampling to result). Pricing may vary depending on testing volume, contract terms, and other operational factors. Prices are subject to change at any time at our sole discretion.</p>
                   <p>*** Estimated annual cost for a full-time analyst, including salary, benefits, and overhead. Actual figures may vary based on region, experience level, and employment conditions.</p>
                </div>
             </div>
          </div>

          {/* 2. TEXTO DESCRIPTIVO (Cost Calculation Breakdown) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-10 pb-4 lg:pb-12">
             <div>
                 <h4 className="text-base md:text-xl font-black text-[#111111] mb-6 md:mb-8 uppercase tracking-widest">
                   Cost Calculation Breakdown
                 </h4>
                 
                 <ul className="space-y-4 md:space-y-6">
                   <li className="flex gap-3 md:gap-4 items-start">
                     <span className="font-bold text-base md:text-lg text-[#111111] shrink-0 w-5 md:w-6">A.</span>
                     <span className="text-gray-700 font-medium text-sm md:text-base">300 samples/week</span>
                   </li>
                   <li className="flex gap-3 md:gap-4 items-start">
                     <span className="font-bold text-base md:text-lg text-[#111111] shrink-0 w-5 md:w-6">B.</span>
                     <span className="text-gray-700 font-medium text-sm md:text-base">52 weeks/year</span>
                   </li>
                   <li className="flex gap-3 md:gap-4 items-start">
                     <span className="font-bold text-base md:text-lg text-[#111111] shrink-0 w-5 md:w-6">C.</span>
                     <span className="text-gray-700 font-medium text-sm md:text-base">External PCR testing for Salmonella spp. and Enterobacteriaceae:<br/><span className="font-bold text-[#111111]">€35/sample*</span></span>
                   </li>
                   <li className="flex gap-3 md:gap-4 items-start">
                     <span className="font-bold text-base md:text-lg text-[#111111] shrink-0 w-5 md:w-6">D.</span>
                     <span className="text-gray-700 font-medium text-sm md:text-base">AiGOR testing cost for Salmonella spp. and Enterobacteriaceae:<br/><span className="font-bold text-[#111111]">€15/sample**</span></span>
                   </li>
                   <li className="flex gap-3 md:gap-4 items-start">
                     <span className="font-bold text-base md:text-lg text-[#111111] shrink-0 w-5 md:w-6">E.</span>
                     <span className="text-gray-700 font-medium text-sm md:text-base">Cost of analyst for internal testing:<br/><span className="font-bold text-[#111111]">€84,000/year***</span></span>
                   </li>
                 </ul>
             </div>

             <div className="mt-10 md:mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-[#111111] mb-2">
                  €228,000
                </h3>
                <p className="text-[#FF270A] font-bold text-xs md:text-sm uppercase tracking-widest">
                  savings per year/plant
                </p>
             </div>

             {/* NOTAS LEGALES (VISIBLES SOLO EN MÓVIL AL FINAL DE LA SECCIÓN) */}
             <div className="lg:hidden mt-10 pt-8 border-t border-gray-100 space-y-3 text-[9px] sm:text-[10px] text-gray-400 font-medium leading-relaxed">
                <p>* Based on average market pricing for outsourced environmental Salmonella PCR and Enterobacteriaceae in Europe. Actual costs may vary by region, provider, and testing volume.</p>
                <p>** AiGOR testing cost includes all reagents required for one complete test (from sampling to result). Pricing may vary depending on testing volume, contract terms, and other operational factors. Prices are subject to change at any time at our sole discretion.</p>
                <p>*** Estimated annual cost for a full-time analyst, including salary, benefits, and overhead. Actual figures may vary based on region, experience level, and employment conditions.</p>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}