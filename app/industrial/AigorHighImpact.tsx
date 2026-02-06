"use client";

import Image from "next/image";
import { useRef } from "react";

export default function AigorHighImpact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* --- 1. EL MOTOR DE COLOR FLUIDO (FONDO ANIMADO) --- */}
      {/* Este contenedor tiene 'mix-blend-mode: hard-light' o 'screen' 
         para que los colores se sumen intensamente sobre el negro.
      */}
      <div className="absolute inset-0 pointer-events-none contrast-125 brightness-110">
        <div className="absolute inset-0 mix-blend-screen opacity-80">
          
          {/* Blob Rojo/Naranja (Poder/Calor) */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#FF270A] rounded-full blur-[120px] animate-blob-flow-1" />
          
          {/* Blob Azul/Cian (Ciencia/Datos) */}
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] animate-blob-flow-2" />
          
          {/* Blob Morado (UV/Tecnología) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-700 rounded-full blur-[130px] animate-blob-flow-3" />
        </div>
      </div>

      {/* --- 2. CONTENIDO DE TEXTO (FLOTANDO SOBRE TODO) --- */}
      <div className="relative z-20 text-center px-6 max-w-4xl -mt-20 mb-10">
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">
          UNLEASH <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            HYPER-FAST EMP.
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-white/80 mt-6 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
          The speed of light applied to biosafety. Results in hours, not days.
        </p>
      </div>

      {/* --- 3. EL SUJETO ESTÁTICO (LA "NIÑA DE NEGRO") --- */}
      {/* IMPORTANTE: Reemplaza el src con la imagen de tu dispositivo AiGOR.
          Debe ser un PNG con fondo transparente, preferiblemente oscuro/metálico 
          para que contraste con la luz de atrás.
      */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-[600px] md:max-w-[800px] h-auto flex justify-end flex-col pointer-events-none">
         {/* Placeholder visual para el dispositivo AiGOR */}
         {/* He puesto un "efecto de silueta" temporal. Cuando pongas tu imagen real, quita las clases 'brightness-0 invert' si tu imagen ya es oscura */}
         <div className="relative w-full aspect-square md:aspect-[4/3]">
            {/* Reemplaza '/tu-imagen-aigor.png' por tu archivo real */}
            {/* Usamos un div temporal para simular el objeto oscuro si no tienes la imagen a mano */}
            <div 
              className="w-full h-full bg-gradient-to-t from-black via-[#1a1a1a] to-[#333] mask-image-gradient"
              style={{
                // Esto crea una forma abstracta "tech" para el ejemplo.
                // Reemplázalo con el componente <Image> real.
                clipPath: "polygon(20% 100%, 80% 100%, 90% 40%, 70% 10%, 30% 10%, 10% 40%)"
              }}
            >
                {/* Reflejo sutil en el borde del objeto */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/20 to-purple-500/30 opacity-50 mix-blend-overlay" />
            </div>
            
            {/* EJEMPLO DE CÓMO SERÍA CON IMAGEN REAL (Descomentar y usar): */}
            {/* <Image 
              src="/aigor-device-dark.png" 
              alt="AiGOR Device" 
              fill 
              className="object-contain object-bottom drop-shadow-2xl" 
              priority
            /> 
            */}
         </div>
         {/* Sombra de anclaje al piso */}
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </div>

      {/* --- DEFINICIÓN DE ANIMACIONES FLUIDAS --- */}
      <style jsx>{`
        /* Estas animaciones mueven los blobs en patrones orgánicos, rotando y escalando */
        @keyframes blob-flow-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(150px, -100px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-50px, 150px) scale(0.8) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes blob-flow-2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-150px, 100px) scale(0.9) rotate(-120deg); }
          66% { transform: translate(100px, -100px) scale(1.1) rotate(-240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(-360deg); }
        }
        @keyframes blob-flow-3 {
          0% { transform: translate(0px, 0px) scale(0.8); opacity: 0.6; }
          50% { transform: translate(0px, 50px) scale(1.3); opacity: 1; }
          100% { transform: translate(0px, 0px) scale(0.8); opacity: 0.6; }
        }

        /* Clases de utilidad para las animaciones */
        .animate-blob-flow-1 {
          animation: blob-flow-1 25s infinite linear;
        }
        .animate-blob-flow-2 {
          animation: blob-flow-2 30s infinite linear reverse;
        }
        .animate-blob-flow-3 {
          animation: blob-flow-3 20s infinite ease-in-out;
        }
        
        /* Utilidad para crear la forma del placeholder (borrar si usas imagen real) */
        .mask-image-gradient {
           mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
      `}</style>
    </section>
  );
}