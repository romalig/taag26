"use client";

import { useTranslations } from "next-intl";

export default function IndustrialHero() {
  const t = useTranslations("Pages.Labs");

  return (
    <section className="pt-40 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
      
      <style jsx>{`
        @keyframes fill-up-reveal {
          /* Movemos solo la capa 1 (colores) hacia arriba, la capa 2 (gris) se queda en 0% 0% */
          0% { background-position: 0% 0%, 0% 0%; }
          100% { background-position: 0% 100%, 0% 0%; }
        }
        .text-liquid-animate {
          background-image: 
            /* Capa 1 (Movible): Mitad invisible, Mitad de color */
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 50%,
              #3b82f6 50%,
              #8b5cf6 75%,
              #FF270A 100%
            ),
            /* Capa 2 (Estática): Mitad invisible, Mitad gris */
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 50%,
              #9ca3af 50%,
              #9ca3af 100%
            );
          
          /* La capa de color mide el doble (200%) para poder subir, la gris mide lo normal (100%) */
          background-size: 100% 200%, 100% 100%;
          background-position: 0% 0%, 0% 0%;
          background-repeat: no-repeat, no-repeat;
          
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          
          animation: fill-up-reveal 4s ease-out 1s forwards;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

      {/* FIX MOBILE: 
         - Eliminado 'break-words' y 'hyphens-auto' para que no corte palabras.
         - El <br> ahora tiene 'hidden md:block' para que en celular el texto fluya solo.
         - Ajustado el leading (interlineado) para móvil.
      */}
      <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-[#111111] mb-12 md:mb-18 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto">
        {t("titleA")} <br className="hidden md:block" />
        {/* Aquí se aplica la clase con la nueva animación */}
        <span className="text-liquid-animate inline-block pt-2">{t("titleB")}</span>
      </h1>

      <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-6">
        {t("body")}
      </p>
    </section>
  );
}
