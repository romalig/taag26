"use client";

import { useState } from "react";
import { Globe, X, ChevronDown, Box, Microscope, Activity } from "lucide-react";

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
  
  const [activeTab, setActiveTab] = useState<"kits" | "services" | "software">("kits");

  const handleSelect = (countryKey: string, lang: string) => {
    setSelectedCountry(countryKey);
    setSelectedLanguage(lang);
    setIsModalOpen(false);
  };

  const currentData = COUNTRY_DATA[selectedCountry];

  return (
    <section className="min-h-screen bg-[#F4F4F5] pt-32 pb-24 relative overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-[1000px] mx-auto px-6 text-center mb-12 relative z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight mb-6">
          Global Science. <br className="md:hidden" /> Local Impact.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
        </p>
      </div>

      {/* 2. BOTÓN SELECTOR (Aumentado el margen inferior a mb-24 / md:mb-32 para dar más aire) */}
      <div className="flex flex-col items-center justify-center mb-24 md:mb-32 relative z-20">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
          Select your region
        </span>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 rounded-full transition-colors group"
        >
          <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#111111] transition-colors" />
          <span className="text-base font-semibold text-[#111111]">
            {currentData.name} — {selectedLanguage}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#111111] transition-colors" />
        </button>
      </div>

      {/* 3. TARJETA DE RESULTADO DINÁMICA CON GLOW CONSTANTE */}
      <div className="relative max-w-[1200px] mx-auto px-6 mt-8">
        
        {/* LA LÍNEA DE ENERGÍA (GLOW) SIEMPRE VISIBLE */}
        <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[85%] md:w-[90%] h-[20px] pointer-events-none z-0">
            {/* Glow amplio y difuso */}
            <div className={`absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r ${currentData.flagColors} blur-[20px] opacity-70 transition-colors duration-1000 ease-in-out`} />
            {/* Línea intensa y concentrada */}
            <div className={`absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r ${currentData.flagColors} blur-[4px] opacity-90 transition-colors duration-1000 ease-in-out`} />
        </div>

        {/* LA TARJETA BLANCA (Flat Design Puro) */}
        <div className="relative z-10 w-full bg-white rounded-[2rem] overflow-hidden min-h-[500px]">
          
          <div className="relative z-10 p-8 md:p-12">
            
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-2 transition-all">
                TAAG {currentData.name}
              </h2>
              <p className="text-gray-500 font-medium">How can we help your facility today?</p>
            </div>

            {/* Los 3 Selectores (Completamente Flat) */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12 max-w-3xl mx-auto">
              <button 
                onClick={() => setActiveTab("kits")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-colors ${
                  activeTab === "kits" 
                    ? "bg-[#111111] text-white" 
                    : "bg-gray-100/50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Box className="w-5 h-5" /> In-house Kits
              </button>
              <button 
                onClick={() => setActiveTab("services")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-colors ${
                  activeTab === "services" 
                    ? "bg-[#111111] text-white" 
                    : "bg-gray-100/50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Microscope className="w-5 h-5" /> Lab Services
              </button>
              <button 
                onClick={() => setActiveTab("software")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-colors ${
                  activeTab === "software" 
                    ? "bg-[#111111] text-white" 
                    : "bg-gray-100/50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Activity className="w-5 h-5" /> TxA Software
              </button>
            </div>

            {/* Contenido dinámico (Espacio reservado) */}
            <div className="text-center py-20 bg-[#F9FAFB] rounded-2xl">
               <p className="text-gray-400 font-medium">
                 [ Aquí irá el flujo dinámico para {currentData.name} en {selectedLanguage} seleccionando {activeTab} ]
               </p>
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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-8">
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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4 mb-8">
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
              <div className="mt-12 pt-8 border-t border-gray-100">
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