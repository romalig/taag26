"use client";

import { useState } from "react";
import { Globe, X, ChevronDown } from "lucide-react";

import WhereWeAreHero from "./WhereWeAreHero";
import LocalSupportIntro from "./LocalSupportIntro";
import LocalCarousel from "./LocalCarousel";
import SupportTeamSection from "./SupportTeamSection";

import { TRANSLATIONS } from "./data/translations";
import { generateMockNews, generateMockTeam } from "./data/mockData";

// =========================================================
// 1. IMPORTACIÓN DE DATOS REALES
// =========================================================
import usaEnNews from "./data/local-news/usa_en.json";

// =========================================================
// 2. LISTA DE HUBS (Configuración de Países Principales)
// =========================================================
const SUPPORTED_HUBS = [
  {
    id: "USA", name: "United States", glowColors: ["bg-blue-600", "bg-white", "bg-red-600"],
    languages: [
      { 
        label: "English", 
        code: "en", 
        translatedName: "United States", 
        news: usaEnNews, // <--- Conectado a tu archivo real
        team: generateMockTeam("NorthAm Distribution", "Sarah Jenkins", "usa-sales@taag.com", true) 
      },
      { 
        label: "Español", 
        code: "es", 
        translatedName: "Estados Unidos", 
        news: generateMockNews("Estados Unidos"), 
        team: generateMockTeam("NorthAm Distribution", "Sarah Jenkins", "usa-sales@taag.com", true) 
      }
    ]
  },
  {
    id: "Belgium", name: "Belgium", glowColors: ["bg-black", "bg-yellow-500", "bg-red-600"],
    languages: [
      { label: "Français", code: "fr", translatedName: "Belgique", news: generateMockNews("Belgique"), team: generateMockTeam("EuroDist", "Jean Pierre", "europe@taag.com") },
      { label: "Nederlands", code: "nl", translatedName: "België", news: generateMockNews("België"), team: generateMockTeam("EuroDist", "Jan Jansen", "europe@taag.com") },
      { label: "English", code: "en", translatedName: "Belgium", news: generateMockNews("Belgium"), team: generateMockTeam("EuroDist", "Jean Pierre", "europe@taag.com") }
    ]
  },
  {
    id: "Mexico", name: "Mexico", glowColors: ["bg-green-600", "bg-white", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "México", news: generateMockNews("México"), team: generateMockTeam("CTR Scientific", "Ruben Arturo Manuel", "ruben.manuel@ctr.com.mx") }]
  },
  {
    id: "Chile", name: "Chile", glowColors: ["bg-blue-700", "bg-white", "bg-[#FF270A]"],
    languages: [{ label: "Español", code: "es", translatedName: "Chile", news: generateMockNews("Chile"), team: generateMockTeam("TAAG Direct", "Equipo Comercial", "ventas@taag.com") }]
  }
];

// =========================================================
// 3. LISTA DE PARTNERS (Distribuidores Locales)
// =========================================================
const SUPPORTED_PARTNERS = [
  { 
    id: "Brazil", name: "Brazil", glowColors: ["bg-green-500", "bg-yellow-400", "bg-blue-600"],
    languages: [{ label: "Português", code: "pt", translatedName: "Brasil", news: generateMockNews("Brasil"), team: generateMockTeam("Diag-labor", "Fernanda", "cientifico@diag-labor.com.br") }] 
  },
  { 
    id: "Colombia", name: "Colombia", glowColors: ["bg-yellow-400", "bg-blue-600", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "Colombia", news: generateMockNews("Colombia"), team: generateMockTeam("Quios", "Jose", "colombia@colombia.com") }] 
  },
  { 
    id: "CostaRica", name: "Costa Rica", glowColors: ["bg-blue-700", "bg-white", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "Costa Rica", news: generateMockNews("Costa Rica"), team: generateMockTeam("Dixx Lab", "Francisto Soto", "operations@dixxlab.com") }] 
  },
  { 
    id: "Ecuador", name: "Ecuador", glowColors: ["bg-yellow-400", "bg-blue-700", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "Ecuador", news: generateMockNews("Ecuador"), team: generateMockTeam("Inhesol", "Victor Campos", "inhesol@hotmail.com") }] 
  },
  { 
    id: "Egypt", name: "Egypt", glowColors: ["bg-red-600", "bg-white", "bg-black"],
    languages: [
      { label: "English", code: "en", translatedName: "Egypt", news: generateMockNews("Egypt"), team: generateMockTeam("Innolab Solutions", "Dr. Ahmed", "ahmed@innolabsolutions.ae") },
      { label: "العربية", code: "ar", translatedName: "مصر", news: generateMockNews("مصر"), team: generateMockTeam("Innolab Solutions", "Dr. Ahmed", "ahmed@innolabsolutions.ae") }
    ] 
  },
  { 
    id: "Jordan", name: "Jordan", glowColors: ["bg-black", "bg-white", "bg-green-600"],
    languages: [
      { label: "English", code: "en", translatedName: "Jordan", news: generateMockNews("Jordan"), team: generateMockTeam("Genetics Company", "Omar Lafi", "omar.lafi@genetics-jo.com") },
      { label: "العربية", code: "ar", translatedName: "الأردن", news: generateMockNews("الأردن"), team: generateMockTeam("Genetics Company", "Omar Lafi", "omar.lafi@genetics-jo.com") }
    ] 
  },
  { 
    id: "Kuwait", name: "Kuwait", glowColors: ["bg-green-600", "bg-white", "bg-red-600"],
    languages: [
      { label: "English", code: "en", translatedName: "Kuwait", news: generateMockNews("Kuwait"), team: generateMockTeam("Homaizi diagnostics", "Mohammed Dardiri", "m.dardiri@homaizidiagnostics.com") },
      { label: "العربية", code: "ar", translatedName: "الكويت", news: generateMockNews("الكويت"), team: generateMockTeam("Homaizi diagnostics", "Mohammed Dardiri", "m.dardiri@homaizidiagnostics.com") }
    ] 
  },
  { 
    id: "Panama", name: "Panama", glowColors: ["bg-blue-600", "bg-white", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "Panamá", news: generateMockNews("Panamá"), team: generateMockTeam("Scientific Instruments S.A.", "Delba Villalobos", "dvillalobos@scientific-centroamerica.com") }] 
  },
  { 
    id: "Peru", name: "Peru", glowColors: ["bg-red-600", "bg-white", "bg-red-600"],
    languages: [{ label: "Español", code: "es", translatedName: "Perú", news: generateMockNews("Perú"), team: generateMockTeam("Lemix Data", "Gabriela Hernandez", "gabriela.hernandez@lemixdata.com") }] 
  }
];

export default function WhereWeAre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState(SUPPORTED_HUBS[0]);
  const [activeLanguage, setActiveLanguage] = useState(SUPPORTED_HUBS[0].languages[0]);

  const t = TRANSLATIONS[activeLanguage.label] || TRANSLATIONS["English"];
  const currentCountryName = activeLanguage.translatedName || activeRegion.name;

  const handleSelect = (region: any, lang: any) => {
    setActiveRegion(region);
    setActiveLanguage(lang);
    setIsModalOpen(false);
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-clip">
      <WhereWeAreHero />
      <LocalSupportIntro />

      <div className="relative w-full pb-32 flex flex-col items-center">
        
        {/* Glow Lines Header - Z-20: Bajo el Nav pero sobre el contenido */}
        <div key={`sticky-${activeRegion.id}`} className="sticky top-[56px] md:top-[60px] z-20 w-full h-0 transform-gpu">
          <div className="absolute top-0 inset-x-0 h-4 bg-white z-0"></div>
          <div className="absolute top-[1px] inset-x-0 flex flex-row h-4 opacity-50 blur-[6px] pointer-events-none z-10">
            {activeRegion.glowColors.map((color: string, i: number) => <div key={i} className={`flex-1 ${color}`}></div>)}
          </div>
          <div className="absolute top-0 inset-x-0 flex flex-row h-[3px] w-full opacity-100 z-20">
            {activeRegion.glowColors.map((color: string, i: number) => <div key={i} className={`flex-1 ${color} ${color === 'bg-white' ? 'shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : ''}`}></div>)}
          </div>
        </div>

        {/* Global Selector Button - Z-30: Sobre la línea, bajo el Nav global */}
        <div className="relative -mt-4 md:-mt-7 z-30 transform-gpu flex justify-center w-full">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 md:gap-4 px-6 py-2.5 md:px-10 md:py-4 bg-white rounded-full border border-gray-200 transition-all hover:bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] group">
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#FF270A]" />
            <span className="text-sm md:text-xl font-bold text-[#111111]">
              {currentCountryName} — {activeLanguage.label}
            </span>
            <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-[#FF270A] transition-colors" />
          </button>
        </div>

        {/* Content - Z-10 */}
        <div className="relative z-10 w-full mt-16 md:mt-24">
          <LocalCarousel title={`${t.featuredSolutions} ${currentCountryName}`} items={activeLanguage.news} t={t} />
          
          <div className="max-w-7xl mx-auto px-6">
            <SupportTeamSection teamData={activeLanguage.team} countryName={currentCountryName} t={t} />
          </div>
        </div>
      </div>

      {/* MODAL SELECTOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-8 h-8 text-[#111111]" />
            </button>

            <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-16 tracking-tight">Select your region</h2>

            <div className="mb-20">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
                {t.hubsTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
                {SUPPORTED_HUBS.map((region) => (
                  <div key={region.id} className="flex flex-col border-l-2 border-[#FF270A] pl-6 py-1">
                    <h4 className="text-xl font-black text-[#111111] mb-3 uppercase tracking-tight">{region.name}</h4>
                    <div className="flex flex-col gap-2">
                      {region.languages.map((lang) => (
                        <button key={lang.code} onClick={() => handleSelect(region, lang)} className={`text-left text-sm font-bold transition-colors w-fit ${activeRegion.id === region.id && activeLanguage.code === lang.code ? 'text-[#FF270A] underline underline-offset-4' : 'text-gray-500 hover:text-[#FF270A]'}`}>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
                {t.partnersTitle}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
                {SUPPORTED_PARTNERS.map((region) => (
                  <div key={region.id} className="flex flex-col">
                    <h4 className="text-base font-bold text-gray-800 mb-2">{region.name}</h4>
                    <div className="flex flex-col gap-1">
                      {region.languages.map((lang) => (
                        <button key={lang.code} onClick={() => handleSelect(region, lang)} className={`text-left text-sm font-medium transition-colors w-fit ${activeRegion.id === region.id && activeLanguage.code === lang.code ? 'text-[#FF270A] font-bold' : 'text-gray-500 hover:text-[#FF270A]'}`}>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 pt-10 border-t border-gray-100">
               <p className="text-gray-400 font-medium">
                 {t.dontSeeCountry} <a href="mailto:global@taag.com" className="text-[#FF270A] hover:underline">{t.contactGlobal}</a>
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}