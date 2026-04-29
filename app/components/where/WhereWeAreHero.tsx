"use client";

import { useState, useEffect } from "react";

// Las frases exactas traducidas
const IMPACT_TRANSLATIONS = [
  "Local impact.",      // English
  "Impacto local.",     // Español / Português
  "تأثير محلي.",        // العربية
  "Impact local.",      // Français
  "Lokale impact."      // Nederlands
];

export default function WhereWeAreHero() {
  const [impactIndex, setImpactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactIndex((prev) => (prev + 1) % IMPACT_TRANSLATIONS.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 text-center bg-white relative z-20">
      <div className="max-w-[1000px] w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight mb-10">
          Global Science. <br />
          <span key={impactIndex} className="block text-gray-400 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2">
            {IMPACT_TRANSLATIONS[impactIndex]}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
        </p>
      </div>
    </section>
  );
}