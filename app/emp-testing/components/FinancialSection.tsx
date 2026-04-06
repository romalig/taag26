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
          // Entra a la vista: Espera 1 segundo y levanta las barras
          timeoutId = setTimeout(() => {
            setAnimate(true);
          }, 1000);
        } else {
          // Sale de la vista: Cancela la espera (si el usuario pasó muy rápido) y resetea las barras
          clearTimeout(timeoutId);
          setAnimate(false);
        }
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la sección es visible en pantalla
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearTimeout(timeoutId); // Limpieza de seguridad
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F5F5F7] text-[#111111] border-t border-gray-200">
      
      {/* Contenedor alineado con el Header */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-5xl">
           <div>
              <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-4 block">
                ROI ANALYSIS
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
                Economic Impact:<br /> Slashing operational costs by <span className="text-[#FF270A]">€228k.</span>
              </h2>
           </div>
        </div>

        {/* Contenedor Principal (Sin sombra y con lg:items-stretch) */}
        <div className="bg-white p-6 md:p-12 lg:p-16 rounded-[2.5rem] border border-gray-100 flex flex-col lg:flex-row lg:items-stretch gap-16 items-center">
          
          {/* 1. VISUALIZACIÓN DEL GRÁFICO */}
          <div className="w-full lg:w-1/2 flex flex-col relative">
             
             {/* Título del Eje Y */}
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 ml-10 md:ml-14 shrink-0">
                Thousands € / year
             </div>

             {/* Área Principal del Gráfico */}
             <div className="relative flex-1 w-full flex pt-4">
                
                {/* Columna de Números del Eje Y */}
                <div className="w-10 md:w-14 shrink-0 flex flex-col justify-between pb-8 text-xs md:text-sm font-semibold text-gray-400 text-right pr-4 z-20 bg-white">
                  <span>600</span>
                  <span>500</span>
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>

                {/* Área de las Barras y Líneas */}
                <div className="flex-1 relative flex items-end justify-around pb-8 border-l border-gray-100 h-full">
                  
                  {/* Líneas de fondo */}
                  <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none z-0">
                    {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                        <div key={i} className="w-full border-t border-gray-100 h-0"></div>
                    ))}
                  </div>

                  {/* BARRA 1: AiGOR (Animando el 'height' de 0 a 53%) */}
                  <div 
                    className="relative w-20 md:w-32 flex flex-col-reverse z-10 mt-auto shadow-md rounded-t-md transition-[height] duration-1000 ease-out overflow-hidden"
                    style={{ height: animate ? '53%' : '0%' }}
                  >
                     <div className="w-full h-[26.4%] bg-[#FF270A] flex items-center justify-center text-white font-bold text-sm md:text-base">
                        <span className={`transition-opacity duration-700 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>E</span>
                     </div>
                     <div className="w-full h-[73.6%] bg-gray-600 rounded-t-md flex items-center justify-center text-white font-bold text-sm md:text-base">
                        <span className={`transition-opacity duration-700 delay-700 text-center leading-tight ${animate ? 'opacity-100' : 'opacity-0'}`}>A x B x D</span>
                     </div>
                  </div>

                  {/* BARRA 2: External Testing (Animando el 'height' de 0 a 91%) */}
                  <div 
                    className="relative w-20 md:w-32 bg-gray-600 rounded-t-md flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md z-10 mt-auto transition-[height] duration-1000 ease-out overflow-hidden"
                    style={{ height: animate ? '91%' : '0%' }}
                  >
                     <span className={`transition-opacity duration-700 delay-700 text-center leading-tight ${animate ? 'opacity-100' : 'opacity-0'}`}>A x B x C</span>
                  </div>

                </div>
             </div>

             {/* Eje X Etiquetas */}
             <div className="flex justify-around mt-3 ml-10 md:ml-14 text-center">
                <div className="w-20 md:w-32 text-xs md:text-sm font-semibold text-[#111111] leading-tight">
                    Internal testing (AiGOR)
                </div>
                <div className="w-20 md:w-32 text-xs md:text-sm font-semibold text-[#111111] leading-tight">
                    External testing
                </div>
             </div>

             {/* Leyenda y Notas (Alineadas a la izquierda) */}
             <div className="flex flex-col gap-6 mt-12 pl-10 md:pl-14 shrink-0">
                
                {/* Leyenda */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                     <span className="w-4 h-4 rounded-full bg-gray-600"></span>
                     <span className="text-sm font-semibold text-gray-700">Testing cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-4 h-4 rounded-full bg-[#FF270A]"></span>
                     <span className="text-sm font-semibold text-gray-700">Lab HHRR cost</span>
                  </div>
                </div>

                {/* NOTAS LEGALES */}
                <div className="space-y-3 text-[10px] text-gray-400 font-medium leading-relaxed max-w-lg">
                   <p>* Based on average market pricing for outsourced environmental Salmonella PCR and Enterobacteriaceae in Europe. Actual costs may vary by region, provider, and testing volume.</p>
                   <p>** AiGOR testing cost includes all reagents required for one complete test (from sampling to result). Pricing may vary depending on testing volume, contract terms, and other operational factors. Prices are subject to change at any time at our sole discretion.</p>
                   <p>*** Estimated annual cost for a full-time analyst, including salary, benefits, and overhead. Actual figures may vary based on region, experience level, and employment conditions.</p>
                </div>
             </div>
          </div>

          {/* 2. TEXTO DESCRIPTIVO (Cost Calculation Breakdown) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between h-full pt-10 lg:pt-0 lg:pl-10 pb-12">
             <div>
                 <h4 className="text-lg md:text-xl font-black text-[#111111] mb-8 uppercase tracking-widest">
                   Cost Calculation Breakdown
                 </h4>
                 
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start">
                     <span className="font-bold text-lg text-[#111111] shrink-0 w-6">A.</span>
                     <span className="text-gray-700 font-medium text-base">300 samples/week</span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="font-bold text-lg text-[#111111] shrink-0 w-6">B.</span>
                     <span className="text-gray-700 font-medium text-base">52 weeks/year</span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="font-bold text-lg text-[#111111] shrink-0 w-6">C.</span>
                     <span className="text-gray-700 font-medium text-base">External PCR testing for Salmonella spp. and Enterobacteriaceae:<br/><span className="font-bold text-[#111111]">€35/sample*</span></span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="font-bold text-lg text-[#111111] shrink-0 w-6">D.</span>
                     <span className="text-gray-700 font-medium text-base">AiGOR testing cost for Salmonella spp. and Enterobacteriaceae:<br/><span className="font-bold text-[#111111]">€15/sample**</span></span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="font-bold text-lg text-[#111111] shrink-0 w-6">E.</span>
                     <span className="text-gray-700 font-medium text-base">Cost of analyst for internal testing:<br/><span className="font-bold text-[#111111]">€84,000/year***</span></span>
                   </li>
                 </ul>
             </div>

             <div className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-[#111111] mb-2">
                  €228,000
                </h3>
                <p className="text-[#FF270A] font-bold text-sm uppercase tracking-widest">
                  savings per year/plant
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}