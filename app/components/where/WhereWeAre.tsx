"use client";

import { useState } from "react";
import { Globe, X, ChevronDown, Box, Microscope, Users, Brain, Dna } from "lucide-react";

// --- BASE DE DATOS DE PAÍSES E IDIOMAS ---
const COUNTRY_DATA: Record<string, { name: string; languages: string[]; flagColors: string }> = {
  // HUBS
  USA: { name: "United States", languages: ["English", "Español"], flagColors: "from-blue-600 via-purple-500 to-red-600" },
  Mexico: { name: "México", languages: ["Español"], flagColors: "from-emerald-600 via-white to-red-600" },
  Chile: { name: "Chile", languages: ["Español"], flagColors: "from-blue-600 via-white to-red-600" },
  Belgium: { name: "Belgium", languages: ["English", "Français", "Nederlands"], flagColors: "from-gray-800 via-yellow-400 to-red-600" },
  
  // AMERICAS
  Brazil: { name: "Brasil", languages: ["Português", "English"], flagColors: "from-emerald-500 via-yellow-400 to-blue-500" },
  Argentina: { name: "Argentina", languages: ["Español"], flagColors: "from-blue-400 via-white to-blue-400" },
  Colombia: { name: "Colombia", languages: ["Español"], flagColors: "from-yellow-400 via-blue-600 to-red-600" },
  Peru: { name: "Perú", languages: ["Español"], flagColors: "from-red-600 via-white to-red-600" },
  
  // EUROPE
  Spain: { name: "España", languages: ["Español", "English"], flagColors: "from-red-600 via-yellow-400 to-red-600" },
  France: { name: "France", languages: ["Français", "English"], flagColors: "from-blue-600 via-white to-red-600" },
  Germany: { name: "Deutschland", languages: ["Deutsch", "English"], flagColors: "from-gray-800 via-red-600 to-yellow-400" },
  Italy: { name: "Italia", languages: ["Italiano", "English"], flagColors: "from-emerald-600 via-white to-red-600" },
  
  // ASIA PACIFIC
  Japan: { name: "Japan", languages: ["日本語", "English"], flagColors: "from-white via-red-600 to-white" },
  Australia: { name: "Australia", languages: ["English"], flagColors: "from-blue-800 via-white to-red-600" },
  SouthKorea: { name: "South Korea", languages: ["한국어", "English"], flagColors: "from-white via-blue-600 to-red-600" },
  India: { name: "India", languages: ["English", "हिन्दी"], flagColors: "from-orange-500 via-white to-emerald-600" },
  
  // MIDDLE EAST & AFRICA
  UAE: { name: "UAE", languages: ["English", "العربية"], flagColors: "from-emerald-600 via-white to-gray-800" },
  SouthAfrica: { name: "South Africa", languages: ["English"], flagColors: "from-emerald-600 via-yellow-400 to-blue-600" },
  SaudiArabia: { name: "Saudi Arabia", languages: ["العربية", "English"], flagColors: "from-emerald-700 via-emerald-600 to-emerald-700" },
  Egypt: { name: "Egypt", languages: ["العربية", "English"], flagColors: "from-red-600 via-white to-gray-800" },

  // REST OF WORLD
  Rest: { name: "Rest of the world", languages: ["English", "Español"], flagColors: "from-gray-300 via-gray-400 to-gray-300" }
};

const REGIONS = [
  { title: "Americas", keys: ["Brazil", "Argentina", "Colombia", "Peru"] },
  { title: "Europe", keys: ["Spain", "France", "Germany", "Italy"] },
  { title: "Asia Pacific", keys: ["Japan", "Australia", "SouthKorea", "India"] },
  { title: "Middle East & Africa", keys: ["UAE", "SouthAfrica", "SaudiArabia", "Egypt"] }
];

export default function WhereWeAre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSelect = (countryKey: string, lang: string) => {
    setSelectedCountry(countryKey);
    setSelectedLanguage(lang);
    setIsModalOpen(false);
  };

  const currentData = COUNTRY_DATA[selectedCountry];

  return (
    <section className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-[1000px] mx-auto px-6 text-center mb-16 md:mb-24 relative z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight mb-6">
          Global Science. <br className="md:hidden" /> Local Impact.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
        </p>
      </div>

      {/* 2. GRAN CONTENEDOR GRIS */}
      <div className="relative z-20 w-full max-w-7xl mx-auto md:px-6">
        <div className="bg-[#F4F4F5] rounded-none md:rounded-[3rem] pt-16 md:pt-24 pb-20 px-4 md:px-12 lg:px-16 w-full">
          
          {/* A. TEXTO EXPLICATIVO DE SOPORTE */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
              LOCAL SUPPORT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
              How we support your lab locally.
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed font-normal">
              Throughout your entire implementation process, you will be fully backed by expert technical and scientific support, working seamlessly alongside dedicated, on-the-ground assistance to ensure your facility succeeds every step of the way.
            </p>
          </div>

          {/* B. 3 ICONOS MINIMALISTAS (Equilibrados en tamaño y texto) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto mb-24">
            
            {/* Concepto 1: TAAG Hubs (Cerebro limpio) */}
            <div className="flex flex-col items-center text-center">
              <Brain className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">TAAG Hubs</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Friendly, expert scientific guidance for method selection, custom molecular developments, and seamless technical troubleshooting to keep your lab at peak performance.
              </p>
            </div>

            {/* Concepto 2: Local Partner (Usuarios) */}
            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Local Partners</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated day-to-day commercial assistance, smooth kit implementation, fluid communication, and fast on-the-ground logistics tailored to your facility's unique needs.
              </p>
            </div>

            {/* Concepto 3: Partner Labs (ADN) */}
            <div className="flex flex-col items-center text-center">
              <Dna className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Partner Labs</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accessible local laboratory services utilizing TAAG's advanced kits and proprietary software to deliver highly reliable and ultra-fast results near you.
              </p>
            </div>

          </div>

          {/* C. SELECTOR Y TARJETA BLANCA */}
          <div className="flex flex-col items-center w-full">
            
            {/* Botón Selector (Sin bordes en lo absoluto) */}
            <div className="flex flex-col items-center justify-center mb-10 w-full relative z-20">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Select your region
              </span>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-50 transition-all group"
              >
                <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#111111] transition-colors" />
                <span className="text-base font-semibold text-[#111111]">
                  {currentData.name} — {selectedLanguage}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#111111] transition-colors" />
              </button>
            </div>

            {/* Tarjeta Blanca Dinámica (Sin bordes) */}
            <div className="relative w-full bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden min-h-[500px]">
              
              {/* GLOW SUTIL SUPERIOR */}
              <div key={selectedCountry} className="absolute top-0 left-0 right-0 z-0 pointer-events-none animate-in fade-in duration-500">
                  <div className={`absolute top-1 left-0 right-0 h-[8px] bg-gradient-to-r ${currentData.flagColors} blur-[6px] opacity-60`} />
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentData.flagColors} opacity-100`} />
              </div>

              <div className="relative z-10 p-6 pt-16 md:p-12 md:pt-20">
                
                <div className="flex flex-col items-center mb-16 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-3">
                    TAAG {currentData.name}
                  </h2>
                  <p className="text-gray-500 font-medium">How can we help your facility today?</p>
                </div>

                {/* Secciones: Kits y Servicios */}
                <div className="flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto">
                  
                  {/* KITS */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 pb-4">
                      <Box className="w-6 h-6 text-[#111111]" />
                      <h3 className="text-xl md:text-2xl font-bold text-[#111111]">In-house Kits</h3>
                    </div>
                    {/* Contenedor temporal (Fondo liso, sin bordes) */}
                    <div className="bg-[#F9FAFB] rounded-2xl p-8 text-center min-h-[150px] flex items-center justify-center">
                      <p className="text-gray-400 font-medium max-w-md mx-auto">
                        [ Aquí irá el flujo dinámico de KITS para {currentData.name} en {selectedLanguage} ]
                      </p>
                    </div>
                  </div>

                  {/* LAB SERVICES */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 pb-4">
                      <Microscope className="w-6 h-6 text-[#111111]" />
                      <h3 className="text-xl md:text-2xl font-bold text-[#111111]">Lab Services</h3>
                    </div>
                    {/* Contenedor temporal (Fondo liso, sin bordes) */}
                    <div className="bg-[#F9FAFB] rounded-2xl p-8 text-center min-h-[150px] flex items-center justify-center">
                      <p className="text-gray-400 font-medium max-w-md mx-auto">
                        [ Aquí irá el flujo dinámico de SERVICIOS para {currentData.name} en {selectedLanguage} ]
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MODAL SELECTOR ESTILO TESLA                            */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-8 h-8 text-[#111111]" />
            </button>

            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-16">Select your region</h2>

            {/* SECCIÓN HUBS */}
            <div className="mb-16">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8">
                TAAG Hubs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {["USA", "Mexico", "Belgium", "Chile"].map((key) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xl font-bold text-[#111111] mb-2">{COUNTRY_DATA[key].name}</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {COUNTRY_DATA[key].languages.map((lang) => (
                        <button 
                          key={lang} 
                          onClick={() => handleSelect(key, lang)}
                          className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN PARTNERS POR CONTINENTE */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8">
                Partner Labs & Distributors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {REGIONS.map((region) => (
                  <div key={region.title} className="flex flex-col gap-6">
                    <h4 className="text-sm font-bold text-[#111111]">{region.title}</h4>
                    {region.keys.map((key) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-base font-semibold text-gray-800 mb-1">{COUNTRY_DATA[key].name}</span>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {COUNTRY_DATA[key].languages.map((lang) => (
                            <button 
                              key={lang} 
                              onClick={() => handleSelect(key, lang)}
                              className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* REST OF THE WORLD */}
              <div className="mt-12 pt-8">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-800 mb-1">{COUNTRY_DATA["Rest"].name}</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {COUNTRY_DATA["Rest"].languages.map((lang) => (
                      <button 
                        key={lang} 
                        onClick={() => handleSelect("Rest", lang)}
                        className="text-sm text-gray-500 hover:text-[#FF270A] hover:underline transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}