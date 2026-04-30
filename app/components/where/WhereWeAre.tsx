"use client";

import WhereWeAreHero from "./WhereWeAreHero";
import LocalSupportIntro from "./LocalSupportIntro";
import SupportTeamSection from "./SupportTeamSection";
import { TRANSLATIONS } from "./data/translations";

export default function WhereWeAre() {
  // Usamos la traducción en inglés por defecto para el formulario global
  const t = TRANSLATIONS["English"];

  return (
    <div className="min-h-screen bg-white font-sans overflow-clip">
      {/* 1. Hero Section con frases rotativas */}
      <WhereWeAreHero />
      
      {/* 2. Introducción de soporte */}
      <LocalSupportIntro />

      {/* 3. Sección de Contacto (Formulario Negro) */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <SupportTeamSection 
          t={t} 
          countryName="Global" 
          showOnlyForm={true} 
        />
      </div>
    </div>
  );
}
