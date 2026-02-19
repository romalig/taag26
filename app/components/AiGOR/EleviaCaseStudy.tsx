"use client";

export default function EleviaCaseStudy() {
  return (
    // Ajustamos el padding superior para que respire un poco pero siga viéndose como la misma sección
    <section className="w-full bg-[#121212] pt-8 md:pt-16 pb-32 flex flex-col items-center relative overflow-hidden">
      
      {/* Contenedor principal alineado EXACTAMENTE igual que el "Learn more" (px-4 md:px-8) */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Contenido alineado a la izquierda sin márgenes extra para lograr la línea vertical perfecta */}
        <div className="max-w-[1000px] w-full flex flex-col items-start relative z-10">
          
          {/* TÍTULO REVOLUCIONARIO CON NUEVO GLOW TIPO "LENS FLARE" HORIZONTAL */}
          <div className="relative mb-8 w-full max-w-4xl">
            
            {/* --- INICIO DEL NUEVO GLOW --- */}
            {/* Glow tecnológico basado en la imagen adjunta: gradiente Azul -> Fucsia -> Naranja */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[100%] h-[120%] -z-10 pointer-events-none scale-x-110">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-fuchsia-500 to-orange-500 blur-[60px] md:blur-[80px] opacity-70 mix-blend-screen transform-gpu"></div>
            </div>
            {/* --- FIN DEL NUEVO GLOW --- */}
            
            {/* Título con TAMAÑO EXACTO al de Elevia.tsx */}
            <h2 className="relative text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05] drop-shadow-sm">
              The end of outsourcing. <br />
              The future is in-house.
            </h2>
          </div>
          
          {/* MENSAJE CLAVE: Cero Riesgo */}
          <p className="text-xl md:text-2xl text-white max-w-3xl leading-relaxed mb-4 font-semibold">
            For the first time, in-house EMP analysis is completely safe.
          </p>
          
          {/* Párrafo descriptivo con el dolor (48-72hrs) y la solución */}
          <p className="text-base md:text-lg text-[#a1a1a6] max-w-4xl leading-relaxed mb-20 font-medium">
            Elevia carries <strong className="text-white">zero risk of cross-contamination</strong> in your facility. Thanks to our zero (or ultra-short) enrichment technology and proprietary protocols that completely inactivate the sample before processing, you can confidently and securely bring your environmental monitoring in-house. <strong className="text-white">You no longer need to wait 48-72 hours for third-party results—gain absolute control of your facility today.</strong>
          </p>

          {/* CUADRÍCULA DE 6 VENTAJAS */}
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

        </div>
      </div>
    </section>
  );
}