"use client";

import { ChevronDown } from "lucide-react"; 

export default function CustomizedMolecularHero() {
  
  // Función para hacer scroll a la siguiente sección
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-white flex flex-col justify-end items-center">
      
      {/* ================= 1. FONDO VIBRANTE ================= */}
      <div className="absolute inset-0 z-0 bg-aurora-vibrant animate-super-flow" />
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

      {/* ================= 2. SVG MAESTRO (Texto Curvo + Colina) ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-end">
         <svg 
            viewBox="0 0 1440 900" 
            className="w-full h-full" 
            preserveAspectRatio="xMidYMax slice"
         >
            <defs>
               {/* AJUSTE DE POSICIÓN:
                  Subimos el centro Y de 1550 a 1400. 
                  Esto eleva el arco y el texto curvo, dando más aire abajo.
               */}

               {/* RUTA DEL TEXTO (Radio = 1180px, Centro Y = 1400) */}
               <path
                 id="perfectArc"
                 d="M 720, 1400
                    m -1180, 0
                    a 1180,1180 0 0,1 2360,0"
                 fill="none"
               />
            </defs>
            
            {/* TEXTO CURVO */}
            <text className="text-[40px] md:text-[55px] lg:text-[65px] font-bold uppercase fill-white/90 font-sora tracking-widest drop-shadow-sm">
              <textPath 
                href="#perfectArc" 
                startOffset="50%" 
                textAnchor="middle" 
                // @ts-ignore: 'side' es válido en SVG pero TS a veces no lo reconoce
                side="right"              >
                 Ai-Designed Assays • Ai-Designed Assays • Ai-Designed Assays •
                 <animate 
                   attributeName="startOffset" 
                   from="50%" 
                   to="35%" 
                   dur="30s" 
                   repeatCount="indefinite" 
                   calcMode="linear"
                 />
              </textPath>
            </text>

            {/* LA COLINA BLANCA (Radio = 1100px, Centro Y = 1400) */}
            <path
              d="M 720, 1400
                 m -1100, 0
                 a 1100,1100 0 0,1 2200,0
                 z" 
              fill="#FFFFFF"
            />
         </svg>
      </div>

      {/* ================= 3. TÍTULO Y CTA (ESTILO INDUSTRIAL HERO) ================= */}
      {/* - pb-20 md:pb-32: Aumentamos el padding inferior para centrar el texto en el nuevo espacio blanco más grande.
         - pointer-events-none en el contenedor padre, pointer-events-auto en el hijo para que el botón funcione.
      */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-20 md:pb-12 px-6 text-center pointer-events-none">
          
          <div className="pointer-events-auto animate-fadeInUp max-w-5xl mx-auto">
            
            {/* Título Principal con Gradiente Oscuro (Estilo Industrial Hero) */}
            {/* Usamos un gradiente sutil de negro a gris oscuro para dar textura */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-8 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
        Imagine your dream molecular <br className="hidden md:block" />
        {/* El span mantiene el color gris pero fluye con el texto */}
        <span className="text-gray-400 inline-block">microbiological assay.</span>
      </h1>
            <span className="text-sm md:text-base text-[#111111]/70 font-bold uppercase tracking-[0.2em] mb-6 block font-sora">
                Now start using it.
            </span>
            {/* Flecha Clickeable */}
            <div className="flex justify-center">
                <button 
                    onClick={handleScrollDown}
                    className="group p-2 hover:bg-black/5 rounded-full transition-all cursor-pointer"
                    aria-label="Scroll down"
                >
                    <ChevronDown className="w-10 h-10 md:w-12 md:h-12 animate-bounce text-[#111111] group-hover:text-black/70 transition-colors" />
                </button>
            </div>
          </div>

      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .bg-aurora-vibrant {
          background: linear-gradient(
            115deg, 
            #D92408, /* Rojo TAAG */
            #7e22ce, /* Morado */
            #f59e0b, /* Naranja */
            #db2777, /* Rosa */
            #D92408
          );
          background-size: 300% 300%;
        }

        .animate-super-flow {
          animation: gradientPulse 12s ease infinite alternate;
        }

        @keyframes gradientPulse {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards 0.2s;
            opacity: 0;
        }
        
        .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}