"use client";

import { useState, useEffect } from "react";
import { Globe, X, ChevronDown, Brain, Users, Dna, MapPin, CheckCircle2, Building2, FlaskConical } from "lucide-react";

// --- TRADUCCIONES PARA EL EFECTO DEL TÍTULO ---
const IMPACT_TRANSLATIONS = [
  "Local Impact.",       // English
  "Impacto Local.",      // Spanish / Portuguese
  "Impact Local.",       // French
  "Lokale Wirkung.",     // German
  "Impatto Locale.",     // Italian
  "Lokale Impact.",      // Dutch
  "地域への影響。",         // Japanese
  "تأثير محلي."          // Arabic
];

// --- BASE DE DATOS DE PAÍSES E IDIOMAS ---
const COUNTRY_DATA: Record<string, { name: string; languages: string[]; flagColors: string }> = {
  USA: { name: "United States", languages: ["English", "Español"], flagColors: "from-blue-600 via-purple-500 to-red-600" },
  Mexico: { name: "México", languages: ["Español"], flagColors: "from-emerald-600 via-white to-red-600" },
  Chile: { name: "Chile", languages: ["Español"], flagColors: "from-blue-600 via-white to-red-600" },
  Belgium: { name: "Belgium", languages: ["English", "Français", "Nederlands"], flagColors: "from-gray-800 via-yellow-400 to-red-600" },
  Brazil: { name: "Brasil", languages: ["Português", "English"], flagColors: "from-emerald-500 via-yellow-400 to-blue-500" },
  Argentina: { name: "Argentina", languages: ["Español"], flagColors: "from-blue-400 via-white to-blue-400" },
  Colombia: { name: "Colombia", languages: ["Español"], flagColors: "from-yellow-400 via-blue-600 to-red-600" },
  Peru: { name: "Perú", languages: ["Español"], flagColors: "from-red-600 via-white to-red-600" },
  Spain: { name: "España", languages: ["Español", "English"], flagColors: "from-red-600 via-yellow-400 to-red-600" },
  France: { name: "France", languages: ["Français", "English"], flagColors: "from-blue-600 via-white to-red-600" },
  Germany: { name: "Deutschland", languages: ["Deutsch", "English"], flagColors: "from-gray-800 via-red-600 to-yellow-400" },
  Italy: { name: "Italia", languages: ["Italiano", "English"], flagColors: "from-emerald-600 via-white to-red-600" },
  Japan: { name: "Japan", languages: ["日本語", "English"], flagColors: "from-white via-red-600 to-white" },
  Australia: { name: "Australia", languages: ["English"], flagColors: "from-blue-800 via-white to-red-600" },
  SouthKorea: { name: "South Korea", languages: ["한국어", "English"], flagColors: "from-white via-blue-600 to-red-600" },
  India: { name: "India", languages: ["English", "हिन्दी"], flagColors: "from-orange-500 via-white to-emerald-600" },
  UAE: { name: "UAE", languages: ["English", "العربية"], flagColors: "from-emerald-600 via-white to-gray-800" },
  SouthAfrica: { name: "South Africa", languages: ["English"], flagColors: "from-emerald-600 via-yellow-400 to-blue-600" },
  SaudiArabia: { name: "Saudi Arabia", languages: ["العربية", "English"], flagColors: "from-emerald-700 via-emerald-600 to-emerald-700" },
  Egypt: { name: "Egypt", languages: ["العربية", "English"], flagColors: "from-red-600 via-white to-gray-800" },
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
  
  const [impactIndex, setImpactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactIndex((prev) => (prev + 1) % IMPACT_TRANSLATIONS.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight mb-12 md:mb-16">
          Global Science. <br />
          <span key={impactIndex} className="block text-gray-400 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2 md:mt-4">
            {IMPACT_TRANSLATIONS[impactIndex]}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
          With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
        </p>
      </div>

      {/* 2. GRAN CONTENEDOR GRIS */}
      <div className="relative z-20 w-full max-w-7xl mx-auto md:px-6">
        <div className="bg-[#F5F5F7] rounded-none md:rounded-[3rem] pt-16 md:pt-24 pb-20 px-4 md:px-12 lg:px-16 w-full">
          
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

          {/* B. 3 ICONOS MINIMALISTAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto mb-24">
            
            <div className="flex flex-col items-center text-center">
              <Brain className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">TAAG Hubs</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Friendly, expert scientific guidance for method selection, custom molecular developments, and seamless technical troubleshooting to keep your lab at peak performance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Local Partners</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated day-to-day commercial assistance, smooth kit implementation, fluid communication, and fast on-the-ground logistics tailored to your facility's unique needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Dna className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Partner Labs</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accessible local laboratory services utilizing TAAG's advanced kits and proprietary software to deliver highly reliable and ultra-fast results near you.
              </p>
            </div>

          </div>

          {/* C. SELECTOR Y TARJETA BLANCA DINÁMICA */}
          <div className="flex flex-col items-center w-full">
            
            {/* Botón Selector (Cero Bordes) */}
            <div className="flex flex-col items-center justify-center mb-10 w-full relative z-20">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Select your region
              </span>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-50 transition-colors group"
              >
                <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#111111] transition-colors" />
                <span className="text-base font-semibold text-[#111111]">
                  {currentData.name} — {selectedLanguage}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#111111] transition-colors" />
              </button>
            </div>

            {/* TARJETA BLANCA PRINCIPAL */}
            <div className="relative w-full bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden">
              
              {/* GLOW SUTIL SUPERIOR */}
              <div key={selectedCountry} className="absolute top-0 left-0 right-0 z-0 pointer-events-none animate-in fade-in duration-500">
                  <div className={`absolute top-1 left-0 right-0 h-[8px] bg-gradient-to-r ${currentData.flagColors} blur-[6px] opacity-60`} />
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentData.flagColors} opacity-100`} />
              </div>

              <div className="relative z-10 p-6 pt-16 md:p-14 md:pt-20 text-left">
                
                {/* CABECERA DE LA TARJETA (Alineado a la izquierda) */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 tracking-tight">
                    Your TAAG support team in {currentData.name}
                  </h2>
                  <p className="text-gray-500 font-medium text-lg md:text-xl max-w-3xl">
                    Expert scientists, dedicated local partners, and world-class laboratory facilities ready to accelerate your diagnostics operations seamlessly.
                  </p>
                </div>

                {/* CONTENEDOR DE LAS 3 TARJETAS GRISES */}
                <div className="flex flex-col gap-12 w-full">
                  
                  {/* --- TARJETA 1: TAAG HUB --- */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-[#111111]">TAAG HUB {currentData.name}</h3>
                    <div className="bg-[#F5F5F7] rounded-[2rem] p-8 md:p-10 flex flex-col gap-10">
                      
                      {/* Arriba: Foto/Mapa y Capacidades */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        {/* Izquierda */}
                        <div className="md:col-span-5 flex flex-col gap-5">
                           {/* Placeholder de Foto del Hub */}
                           <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center text-gray-400">
                             <Building2 className="w-10 h-10 mb-2 opacity-50" />
                             <span className="text-sm font-medium">Hub Facility Photo</span>
                           </div>
                           <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-[#111111] font-bold text-sm">TAAG Genetics Corp.</span>
                                <span className="text-gray-600 text-sm leading-snug">123 Innovation Drive, Science Park<br/>{currentData.name}</span>
                                <a href="#" className="text-[#0066cc] text-sm hover:underline font-medium mt-1">View on Google Maps</a>
                              </div>
                           </div>
                        </div>
                        {/* Derecha: Lista de capacidades */}
                        <div className="md:col-span-7">
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Hub Capabilities</h4>
                           <ul className="grid grid-cols-1 gap-y-4">
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Rapid molecular detection of pathogens and spoilage microorganisms.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Next Generation Sequencing (NGS) for traceability and root-cause analysis.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Technical and scientific support: method selection and troubleshooting.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Distribution and logistics center for immediate TAAG molecular kits supply.
                             </li>
                           </ul>
                        </div>
                      </div>

                      {/* Abajo: Contactos */}
                      <div className="pt-8 border-t border-gray-200/60">
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Key Hub Contacts</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-gray-500 font-bold text-xl">JD</div>
                              <div className="flex flex-col">
                                 <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Regional Director</span>
                                 <span className="text-lg font-bold text-[#111111]">John Doe</span>
                                 <a href="mailto:jdoe@taag.com" className="text-sm text-gray-500 hover:text-[#111111]">jdoe@taag.com</a>
                                 <span className="text-sm text-gray-500">+1 234 567 8900</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-gray-500 font-bold text-xl">AS</div>
                              <div className="flex flex-col">
                                 <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Application Scientist</span>
                                 <span className="text-lg font-bold text-[#111111]">Ana Smith</span>
                                 <a href="mailto:asmith@taag.com" className="text-sm text-gray-500 hover:text-[#111111]">asmith@taag.com</a>
                                 <span className="text-sm text-gray-500">+1 234 567 8901</span>
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* --- TARJETA 2: LOCAL PARTNER (DISTRIBUIDOR) --- */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-[#111111]">Local Partner</h3>
                    <div className="bg-[#F5F5F7] rounded-[2rem] p-8 md:p-10 flex flex-col gap-10">
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-5 flex flex-col gap-5">
                           {/* Placeholder Logo del Partner */}
                           <div className="w-full h-32 bg-white rounded-2xl flex items-center justify-center text-gray-400">
                             <span className="text-xl font-bold tracking-widest opacity-30">PARTNER LOGO</span>
                           </div>
                           <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-[#111111] font-bold text-sm">Distribuidora Local S.A.</span>
                                <span className="text-gray-600 text-sm leading-snug">Av. Comercial 456, Business Center<br/>{currentData.name}</span>
                                <a href="#" className="text-[#0066cc] text-sm hover:underline font-medium mt-1">View on Google Maps</a>
                              </div>
                           </div>
                        </div>
                        <div className="md:col-span-7">
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Partner Capabilities</h4>
                           <ul className="grid grid-cols-1 gap-y-4">
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Direct commercial support and localized pricing strategies.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               On-the-ground inventory management for rapid kit replenishment.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Initial kit implementation and routine laboratory training.
                             </li>
                           </ul>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-gray-200/60">
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Key Partner Contacts</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-gray-500 font-bold text-xl">MR</div>
                              <div className="flex flex-col">
                                 <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Sales Executive</span>
                                 <span className="text-lg font-bold text-[#111111]">Mario Rossi</span>
                                 <a href="#" className="text-sm text-gray-500 hover:text-[#111111]">mrossi@partner.com</a>
                                 <span className="text-sm text-gray-500">+1 987 654 3210</span>
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* --- TARJETA 3: PARTNER LAB --- */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-[#111111]">Partner Lab</h3>
                    <div className="bg-[#F5F5F7] rounded-[2rem] p-8 md:p-10 flex flex-col gap-10">
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-5 flex flex-col gap-5">
                           <div className="w-full h-32 bg-white rounded-2xl flex items-center justify-center text-gray-400">
                             <FlaskConical className="w-10 h-10 mb-1 opacity-30" />
                           </div>
                           <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-[#111111] font-bold text-sm">Laboratorio Clínico Avanzado</span>
                                <span className="text-gray-600 text-sm leading-snug">Ruta Científica 789<br/>{currentData.name}</span>
                                <a href="#" className="text-[#0066cc] text-sm hover:underline font-medium mt-1">View on Google Maps</a>
                              </div>
                           </div>
                        </div>
                        <div className="md:col-span-7">
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Lab Capabilities</h4>
                           <ul className="grid grid-cols-1 gap-y-4">
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Routine microbiology testing executed fully with TAAG Kits.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Direct integration with TxA Software for automated local reporting.
                             </li>
                             <li className="flex items-start gap-3 text-[#111111] font-medium text-sm md:text-base">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                               Sampling logistics and material collection within the country.
                             </li>
                           </ul>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-gray-200/60">
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Key Lab Contacts</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-gray-500 font-bold text-xl">LD</div>
                              <div className="flex flex-col">
                                 <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Lab Director</span>
                                 <span className="text-lg font-bold text-[#111111]">Laura Davis</span>
                                 <a href="#" className="text-sm text-gray-500 hover:text-[#111111]">ldavis@lab.com</a>
                                 <span className="text-sm text-gray-500">+1 555 444 3333</span>
                              </div>
                            </div>
                         </div>
                      </div>
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