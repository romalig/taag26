"use client";

import { useState, useEffect } from "react";
import { TrendingDown, Clock } from "lucide-react";

export default function EleviaROICalculator() {
  // Estados para los sliders
  const [dailyValue, setDailyValue] = useState<number>(50000);
  const [currentWaitDays, setCurrentWaitDays] = useState<number>(3);

  // Estados para los resultados
  const [freedCapital, setFreedCapital] = useState<number>(0);
  const [warehouseReduction, setWarehouseReduction] = useState<number>(0);

  // Lógica de cálculo
  useEffect(() => {
    const eleviaWaitDays = 0.33; // Elevia entrega resultados en ~8 horas (1/3 de día)
    const daysSaved = Math.max(0, currentWaitDays - eleviaWaitDays);
    
    // Capital liberado
    const calculatedFreedCapital = dailyValue * daysSaved;
    
    // Reducción porcentual de costos de bodega
    const calculatedReduction = (daysSaved / currentWaitDays) * 100;

    setFreedCapital(calculatedFreedCapital);
    setWarehouseReduction(calculatedReduction);
  }, [dailyValue, currentWaitDays]);

  // Formateador de moneda
  const formatCurrency = (value: number, compact = false) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: compact ? 'compact' : 'standard',
    }).format(value);
  };

  return (
    // SECCIÓN CON FONDO NEGRO PURO (bg-black) Y PADDING SUPERIOR REDUCIDO (pt-4 md:pt-8)
    <section className="w-full bg-black pt-4 pb-24 md:pt-8 md:pb-32 flex flex-col items-center relative overflow-hidden">
      
      {/* Inyección de estilos CSS para personalizar los sliders */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Estilos base para el track (la línea) */
        input[type=range] {
            -webkit-appearance: none;
            background: transparent;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%; height: 4px; background: rgba(255, 255, 255, 0.2); border-radius: 2px; transition: background 0.3s;
        }
        input[type=range]:hover::-webkit-slider-runnable-track {
            background: rgba(255, 255, 255, 0.4);
        }
        /* Estilos para el thumb (el botón que se arrastra) */
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #FFFFFF; cursor: grab; margin-top: -10px;
            box-shadow: 0 0 15px rgba(255,255,255,0.3); transition: transform 0.2s, box-shadow 0.2s;
        }
        input[type=range]:active::-webkit-slider-thumb {
            transform: scale(1.1); cursor: grabbing; box-shadow: 0 0 20px rgba(255,255,255,0.5);
        }
        /* Firefox styling support */
        input[type=range]::-moz-range-track { background: rgba(255, 255, 255, 0.2); height: 4px; border-radius: 2px; }
        input[type=range]::-moz-range-thumb { background: #FFFFFF; border: none; height: 24px; width: 24px; border-radius: 50%; box-shadow: 0 0 15px rgba(255,255,255,0.3); }
      `}} />

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* ENCABEZADO MINIMALISTA */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#FF270A] uppercase mb-6 block">
            ROI Calculator
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black text-white tracking-tighter leading-[1.05] mb-6">
            Calculate the value of speed.
          </h2>
          {/* TEXTO BLANCO PURO */}
          <p className="text-lg text-white font-medium leading-relaxed max-w-xl">
            See how much capital you can free up by switching to same-day release with Elevia.
          </p>
        </div>

        {/* TARJETA DE LA CALCULADORA (Totalmente integrada al fondo negro) */}
        <div className="w-full bg-black rounded-[2rem] md:rounded-[3rem] md:px-8 lg:px-12 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* COLUMNA IZQUIERDA: Inputs (Sliders) */}
            <div className="lg:col-span-5 flex flex-col gap-16">
              
              {/* Input 1: Valor Diario */}
              <div className="flex flex-col gap-6 group">
                <div className="flex justify-between items-baseline">
                  {/* TEXTO BLANCO PURO */}
                  <label className="text-white text-sm md:text-base font-bold tracking-wide uppercase">
                    Daily production value
                  </label>
                  <span className="text-[#FF270A] font-black text-2xl md:text-3xl tracking-tight tabular-nums">
                    {formatCurrency(dailyValue, true)}
                  </span>
                </div>
                <div className="relative py-2">
                   <input 
                      type="range" min="5000" max="1000000" step="5000" 
                      value={dailyValue} onChange={(e) => setDailyValue(Number(e.target.value))}
                      className="w-full absolute inset-0 z-10 opacity-0 cursor-pointer" 
                    />
                    <input type="range" min="5000" max="1000000" step="5000" value={dailyValue} readOnly className="w-full relative z-0 pointer-events-none"/>
                </div>
                {/* TEXTO BLANCO PURO */}
                <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-[0.15em]">
                  <span>$5K</span>
                  <span>$1M</span>
                </div>
              </div>

              {/* Input 2: Días de espera */}
              <div className="flex flex-col gap-6 group">
                <div className="flex justify-between items-baseline">
                  {/* TEXTO BLANCO PURO */}
                  <label className="text-white text-sm md:text-base font-bold tracking-wide uppercase">
                    Current wait time
                  </label>
                  <span className="text-[#FF270A] font-black text-2xl md:text-3xl tracking-tight tabular-nums">
                    {currentWaitDays} <span className="text-lg font-bold text-[#FF270A]/80">Days</span>
                  </span>
                </div>
                <div className="relative py-2">
                  <input 
                      type="range" min="1" max="14" step="1" 
                      value={currentWaitDays} onChange={(e) => setCurrentWaitDays(Number(e.target.value))}
                      className="w-full absolute inset-0 z-10 opacity-0 cursor-pointer"
                   />
                   <input type="range" min="1" max="14" step="1" value={currentWaitDays} readOnly className="w-full relative z-0 pointer-events-none"/>
                </div>
                {/* TEXTO BLANCO PURO */}
                <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-[0.15em]">
                  <span>1 Day</span>
                  <span>2 Weeks</span>
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: Resultados */}
            <div className="lg:col-span-7 flex flex-col lg:items-end lg:text-right">
              
              {/* Resultado Principal Gigante */}
              <div className="mb-16 lg:mb-20 w-full">
                 {/* TEXTO BLANCO PURO */}
                 <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase mb-4 block">
                   Total Freed-up Capital
                 </span>
                 <div className="text-[56px] md:text-[80px] lg:text-[100px] font-black text-white tracking-tighter leading-none mb-6 break-words tabular-nums">
                    {formatCurrency(freedCapital)}
                 </div>
                 {/* TEXTO BLANCO PURO */}
                 <p className="text-white text-sm md:text-base font-medium max-w-md lg:ml-auto leading-relaxed">
                   Capital currently tied up in warehouse holds that Elevia can release back into your cash flow immediately.
                 </p>
              </div>

              {/* Grid de Resultados Secundarios */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 w-full">
                
                {/* Secundario 1: Reducción de Costos */}
                <div className="flex flex-col lg:items-end">
                   <span className="flex items-center lg:justify-end gap-2 text-[10px] md:text-xs font-bold tracking-[0.15em] text-emerald-400 uppercase mb-2">
                     <TrendingDown className="w-3 h-3" />
                     Warehouse Cost Reduction
                   </span>
                   <div className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-400 tracking-tighter tabular-nums">
                     {warehouseReduction.toFixed(0)}%
                   </div>
                </div>

                {/* Secundario 2: Tiempo Ganado */}
                <div className="flex flex-col lg:items-end">
                   {/* TEXTO BLANCO PURO */}
                   <span className="flex items-center lg:justify-end gap-2 text-[10px] md:text-xs font-bold tracking-[0.15em] text-white uppercase mb-2">
                     <Clock className="w-3 h-3" />
                     Days Gained per batch
                   </span>
                   <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter tabular-nums">
                     {(Math.max(0, currentWaitDays - 0.33)).toFixed(1)}
                   </div>
                </div>

              </div>

            </div>

          </div>
        </div>
        
        {/* CTA Final: Alineado a la izquierda, flecha blanca y ancho limitado en móvil */}
        <div className="mt-16 lg:mt-24 flex justify-start">
           <a href="#" className="group inline-flex items-center gap-3 text-white hover:text-gray-300 transition-colors font-bold text-sm md:text-base tracking-wide max-w-[260px] md:max-w-none text-left">
             <span>Request a personalized financial analysis for your facility</span>
             <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0 group-hover:translate-x-1 transition-transform text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
           </a>
        </div>

      </div>
    </section>
  );
}