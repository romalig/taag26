"use client";

export default function IndustrialHero() {
  return (
    <section className="pt-40 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

      {/* FIX MOBILE: 
         - Eliminado 'break-words' y 'hyphens-auto' para que no corte palabras.
         - El <br> ahora tiene 'hidden md:block' para que en celular el texto fluya solo.
         - Ajustado el leading (interlineado) para móvil.
      */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
        The Next Generation of <br className="hidden md:block" />
        {/* El span mantiene el color gris pero fluye con el texto */}
        <span className="text-gray-400 inline-block">Microbiological Solutions.</span>
      </h1>

      <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-6">
        Explore microbiological solutions for multiplex and ultra-fast detection to accelerate decisions, reduce risk, and improve productivity.
      </p>
    </section>
  );
}