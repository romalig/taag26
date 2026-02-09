"use client";

import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-10 overflow-hidden">
      
      {/* Contenedor del mismo ancho que la sección anterior (1200px) */}
      <div className="max-w-[1200px] mx-auto relative z-10 font-sora">

        {/* HALO SUTIL: 
            -inset-[2px]: Sobresale apenas 2 pixeles.
            opacity-40: Muy transparente.
            blur-md: Suavizado.
        */}
        <div className="absolute -inset-[3px] bg-aurora-vibrant rounded-[2.5rem] blur-lg opacity-30 -z-10"></div>

        {/* TARJETA BLANCA: 
            Disposición Flex Horizontal (md:flex-row) para reducir la altura.
            Sin sombras, sin bordes.
        */}
        <div className="bg-white rounded-[2.5rem] px-8 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">

            {/* TEXTO (Izquierda) */}
            <div className="text-center md:text-left max-w-3xl">
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">
                  Ready to launch?
                </h2>
                <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                  Start using ready-to-deploy kits developed with the power of MILA.
                </p>
            </div>

            {/* BOTÓN (Derecha) */}
            <div className="flex-shrink-0">
                <button className="group bg-[#111111] text-white text-base font-bold px-8 py-4 rounded-full flex items-center gap-3 hover:bg-gray-900 transition-transform active:scale-95">
                    Contact Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>

      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }

        .bg-aurora-vibrant {
          background: linear-gradient(
            90deg, 
            #D92408, 
            #7e22ce, 
            #db2777,
            #f59e0b
          );
          background-size: 200% 200%;
          animation: auroraMove 10s ease infinite alternate;
        }

        @keyframes auroraMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}