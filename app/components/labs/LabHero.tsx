"use client";

export default function IndustrialHero() {
  return (
    <section className="pt-40 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
      
      {/* INYECCIÓN CSS: LLENADO VERTICAL RECTO */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fill-up {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .text-liquid-animate {
          /* Arriba es gris, abajo están tus colores */
          background-image: linear-gradient(
            to bottom,
            #9ca3af 0%,
            #9ca3af 45%,
            #3b82f6 55%,
            #8b5cf6 75%,
            #FF270A 100%
          );
          background-size: 100% 300%;
          background-position: 0% 0%; /* Empieza mostrando solo la parte gris */
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: fill-up 6s ease-out forwards; /* 4 segundos, termina y se queda ahí */
        }
      `}} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

      {/* FIX MOBILE: 
         - Eliminado 'break-words' y 'hyphens-auto' para que no corte palabras.
         - El <br> ahora tiene 'hidden md:block' para que en celular el texto fluya solo.
         - Ajustado el leading (interlineado) para móvil.
      */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
        Your lab <br className="hidden md:block" />
        {/* Aquí se aplica la clase con la nueva animación */}
        <span className="text-liquid-animate inline-block pt-2">Fully optimized.</span>
      </h1>

      <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-6">
        Unleash the true potential of your facility. Our specialized experts redesign your microbiological processes to drive unprecedented productivity, operational agility, and massive cost savings.
      </p>
    </section>
  );
}