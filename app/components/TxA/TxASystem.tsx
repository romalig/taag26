"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TxASystem() {
  return (
    <div className="relative w-full bg-[#f3f4f6] -mt-px py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative">
        
        {/* 1. LOGO TxA ANIMADO */}
        {/* initial={{ y: 200 }}: Lo tira al fondo, totalmente detrás del bloque de texto */}
        <motion.div 
          initial={{ y: 200 }} 
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Curva de animación muy elegante
          viewport={{ once: false, amount: 0.1 }} // once: false repite la animación. amount: 0.1 la dispara rápido.
          className="relative w-24 h-24 md:w-32 md:h-32 z-10"
        >
          <Image
            src="/LogoTxANB.png"
            alt="TAAG Xpert Assistant Logo"
            fill
            className="object-contain drop-shadow-sm"
            priority
          />
        </motion.div>

        {/* 2. CONTENEDOR DE TEXTO (LA MÁSCARA) */}
        {/* pt-10 actúa como el espacio entre el logo y el texto, pero al ser parte de este div con bg-[#f3f4f6], 
            se convierte en una pared sólida que oculta el logo hasta que sube. */}
        <div className="relative z-20 bg-[#f3f4f6] w-[120%] pt-10 flex flex-col items-center">
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] mb-16 font-sora tracking-tight leading-tight">
            TAAG Xpert Assistant. <br className="hidden md:block"/>
            <span className="text-gray-400">Your AI-powered ecosystem.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto px-8">
            TxA is a complete AI ecosystem built to manage your entire microbiology operation. 
            From digital field sampling and predictive algorithms that optimize your operations, 
            to automated, real-time result analysis, TxA connects every dot.
          </p>

        </div>

      </div>

      <style jsx>{`
        .font-sora { 
          font-family: var(--font-sora), sans-serif; 
        }
      `}</style>
    </div>
  );
}