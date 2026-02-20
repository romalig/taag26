"use client";

export default function EleviaCaseStudy() {
  return (
    // Ajustamos el padding superior para que respire un poco pero siga viéndose como la misma sección
    <section className="w-full bg-[#121212] pt-16 md:pt-18 pb-32 flex flex-col items-center relative overflow-hidden">
      
      {/* Contenedor principal alineado EXACTAMENTE a 1200px y px-4 para igualar Elevia.tsx */}
      <div className="w-full max-w-[1200px] mx-auto px-4">
        
        {/* Contenido alineado a la izquierda. Se eliminó el límite de 1000px para que la grilla ocupe los 1200px */}
        <div className="w-full flex flex-col items-start relative z-10">
          
          {/* TÍTULO REVOLUCIONARIO CON GLOW PEGADO AL TEXTO */}
          <div className="relative mb-14 w-full max-w-4xl">
            
            {/* --- INICIO DEL NUEVO GLOW --- */}
            {/* Un solo contenedor muy bajito de altura para que no sobresalga mucho hacia arriba/abajo */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[75%] md:w-[75%] h-[90px] md:h-[120px] -z-10 pointer-events-none">
                {/* Gradiente lineal único que asegura una transición de color 100% sutil e integrada */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-[#FF270A] blur-[20px] md:blur-[30px] opacity-90 mix-blend-screen rounded-full"></div>
            </div>
            {/* --- FIN DEL NUEVO GLOW --- */}
            
            {/* Título con TAMAÑO EXACTO al de Elevia.tsx */}
            <h2 className="relative text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05] drop-shadow-sm">
              The end of outsourcing. <br />
              The future is in-house.
            </h2>
          </div>
          
          {/* MENSAJE CLAVE: Cero Riesgo */}
          
          {/* Párrafo descriptivo con el dolor (48-72hrs) y la solución */}
          <p className="text-base md:text-lg text-[#a1a1a6] max-w-4xl leading-relaxed mb-20 font-medium">
            Elevia carries <strong className="text-white">zero risk of cross-contamination</strong> in your facility. Thanks to our zero (or ultra-short) enrichment technology and proprietary protocols that completely inactivate the sample before processing, you can confidently and securely bring your environmental monitoring in-house. You no longer need to wait 48-72 hours for third-party results—gain absolute control of your facility today.
          </p>

          {/* CUADRÍCULA DE 6 VENTAJAS (Ahora se expandirá libremente a lo ancho de los 1200px) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 w-full">
            
            {/* Dato 1: Tiempo de resultados */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Results in just</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  3hrs
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[220px]">
                turnaround time for immediate decision-making and same-day corrective actions.
              </span>
            </div>

            {/* Dato 2: Ahorro de costos ($228k) */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Annual savings of</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  $228k
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                per plant by dramatically reducing external laboratory fees and shipping costs.
              </span>
            </div>

            {/* Dato 3: TxA (Control del lab) */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Powered by</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  TxA
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                which takes absolute control of the lab workflow, allowing any analyst to run Elevia with zero prior expertise.
              </span>
            </div>

            {/* Dato 4: Equipos Normales (NUEVO) */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Equipment required</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  Standard
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                laboratory instruments. Elevia runs seamlessly on the PCR equipment you likely already have, requiring zero specialized hardware.
              </span>
            </div>

            {/* Dato 5: Operational Agility */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Operational agility</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  Same-day
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[250px]">
                corrective actions drastically reduce production downtime and optimize resource allocation.
              </span>
            </div>

            {/* Dato 6: Enhanced Food Safety */}
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">Enhanced food safety</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  Proactive
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                early detection of contamination hotspots prevents large-scale holds and protects your brand.
              </span>
            </div>

          </div>

          {/* ENLACES CTA: Learn more / Contact us (Movidos debajo de las ventajas) */}
          <div className="flex items-center gap-8 mt-20">
            <a href="#" className="inline-flex items-center gap-1.5 text-base md:text-lg text-white hover:text-white/70 transition-colors font-medium group">
              Learn more
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 text-base md:text-lg text-white hover:text-white/70 transition-colors font-medium group">
              Contact us
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}