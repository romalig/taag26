"use client";

import { useState, useEffect } from "react";
import { Globe, X, ChevronDown, Users, Brain, Dna, MapPin, CheckCircle2 } from "lucide-react";

// --- TRADUCCIONES PARA EL EFECTO DEL TÍTULO ---
const IMPACT_TRANSLATIONS = [
  "Local Impact.",       // English
  "Impacto Local.",      // Spanish / Portuguese
  "Impact Local.",       // French
  "Lokale Wirkung.",     // German
  "Impatto Locale.",     // Italian
  "Lokale Impact.",      // Dutch
  "地域への影響。",         // Japanese
  "本地影响。"             // Chinese (Simplified)
];

// --- BASE DE DATOS DE PAÍSES E IDIOMAS ---
// Se agregó 'flagDirection' para saber si los orbes de luz deben ir arriba/abajo (horizontal) o lado a lado (vertical).
const COUNTRY_DATA: Record<string, { name: string; languages: string[]; glowColors: string[]; hasHub: boolean; flagDirection: "horizontal" | "vertical" }> = {
  // HUBS
  USA: { name: "United States", languages: ["English", "Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Mexico: { name: "México", languages: ["Español"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  Chile: { name: "Chile", languages: ["Español"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: true, flagDirection: "horizontal" },
  Belgium: { name: "Belgium", languages: ["English", "Français", "Nederlands"], glowColors: ["bg-black", "bg-yellow-400", "bg-red-600"], hasHub: true, flagDirection: "vertical" },
  
  // AMERICAS
  Brazil: { name: "Brasil", languages: ["Português", "English"], glowColors: ["bg-emerald-500", "bg-yellow-400", "bg-blue-500"], hasHub: false, flagDirection: "horizontal" },
  Argentina: { name: "Argentina", languages: ["Español"], glowColors: ["bg-blue-400", "bg-white", "bg-blue-400"], hasHub: false, flagDirection: "horizontal" },
  Colombia: { name: "Colombia", languages: ["Español"], glowColors: ["bg-yellow-400", "bg-blue-600", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  Peru: { name: "Perú", languages: ["Español"], glowColors: ["bg-red-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  
  // EUROPE
  Spain: { name: "España", languages: ["Español", "English"], glowColors: ["bg-red-600", "bg-yellow-400", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  France: { name: "France", languages: ["Français", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  Germany: { name: "Deutschland", languages: ["Deutsch", "English"], glowColors: ["bg-black", "bg-red-600", "bg-yellow-400"], hasHub: false, flagDirection: "horizontal" },
  Italy: { name: "Italia", languages: ["Italiano", "English"], glowColors: ["bg-emerald-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "vertical" },
  
  // ASIA PACIFIC
  Japan: { name: "Japan", languages: ["日本語", "English"], glowColors: ["bg-gray-100", "bg-red-600", "bg-gray-100"], hasHub: false, flagDirection: "horizontal" },
  Australia: { name: "Australia", languages: ["English"], glowColors: ["bg-blue-800", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  SouthKorea: { name: "South Korea", languages: ["한국어", "English"], glowColors: ["bg-blue-600", "bg-white", "bg-red-600"], hasHub: false, flagDirection: "horizontal" },
  India: { name: "India", languages: ["English", "हिन्दी"], glowColors: ["bg-orange-500", "bg-white", "bg-emerald-600"], hasHub: false, flagDirection: "horizontal" },
  
  // MIDDLE EAST & AFRICA
  UAE: { name: "UAE", languages: ["English", "العربية"], glowColors: ["bg-emerald-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },
  SouthAfrica: { name: "South Africa", languages: ["English"], glowColors: ["bg-emerald-600", "bg-yellow-400", "bg-blue-600"], hasHub: false, flagDirection: "horizontal" },
  SaudiArabia: { name: "Saudi Arabia", languages: ["العربية", "English"], glowColors: ["bg-emerald-600", "bg-emerald-500", "bg-emerald-700"], hasHub: false, flagDirection: "horizontal" },
  Egypt: { name: "Egypt", languages: ["العربية", "English"], glowColors: ["bg-red-600", "bg-white", "bg-black"], hasHub: false, flagDirection: "horizontal" },

  // REST OF WORLD
  Rest: { name: "Rest of the world", languages: ["English", "Español"], glowColors: ["bg-gray-200", "bg-gray-300", "bg-gray-200"], hasHub: false, flagDirection: "horizontal" }
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
    <div className="bg-white min-h-screen relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION (PANTALLA COMPLETA Y CENTRADA)            */}
      {/* ========================================================= */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20">
        <div className="max-w-[1000px] w-full text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight mb-10 md:mb-12">
            Global Science. <br />
            <span key={impactIndex} className="block text-gray-400 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2 md:mt-4">
              {IMPACT_TRANSLATIONS[impactIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
            With operational TAAG Hubs and a network of partner labs and distributors, we bring the TAAG ecosystem directly to your facility. Support in your language, in your time zone, right by your side.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCAL SUPPORT INFO (FONDO BLANCO)                      */}
      {/* ========================================================= */}
      <section className="w-full pt-16 pb-24 md:pb-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto">
            
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
              <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Service Lab partner</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accessible local laboratory services utilizing TAAG's advanced kits and proprietary software to deliver highly reliable and ultra-fast results near you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SELECTOR DE PAÍSES Y TARJETAS DINÁMICAS                */}
      {/* ========================================================= */}
      <section className="w-full pb-32 px-4 md:px-6 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
            
          {/* Botón Selector (Cero Bordes, Flat Puro) */}
          <div className="flex flex-col items-center justify-center mb-16 w-full relative z-20">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
              Select your region
            </span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-[#F9FAFB] rounded-full hover:bg-gray-100 transition-colors group"
            >
              <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#111111] transition-colors" />
              <span className="text-base font-semibold text-[#111111]">
                {currentData.name} — {selectedLanguage}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#111111] transition-colors" />
            </button>
          </div>

          {/* ÁREA DE CONTENIDO (Tarjetas Estructuradas) */}
          <div className="w-full text-left relative">

            {/* --- MESH GRADIENT GLOW (Dinámico: Horizontal o Vertical) --- */}
            {/* Opacidad reducida y Blur aumentado para ser más "atmósfera" que "mancha" */}
            <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center overflow-visible">
              
              {currentData.flagDirection === "vertical" ? (
                // FRANZAS VERTICALES (Lado a Lado) ej: México, Francia, Bélgica
                <div key={`glow-v-${selectedCountry}`} className="w-full max-w-6xl h-[80%] flex flex-row justify-between items-center px-4 animate-in fade-in duration-1000">
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[0]} opacity-20 md:opacity-30`} />
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[1]} opacity-10 md:opacity-20`} />
                   <div className={`w-[30%] h-full rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[2]} opacity-20 md:opacity-30`} />
                </div>
              ) : (
                // FRANJAS HORIZONTALES (Apiladas) ej: USA, Chile, Alemania
                <div key={`glow-h-${selectedCountry}`} className="w-full max-w-6xl h-[90%] flex flex-col justify-between items-center py-4 animate-in fade-in duration-1000">
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[0]} opacity-20 md:opacity-30`} />
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[1]} opacity-10 md:opacity-20`} />
                   <div className={`w-full h-[30%] rounded-full blur-[100px] md:blur-[140px] ${currentData.glowColors[2]} opacity-20 md:opacity-30`} />
                </div>
              )}

            </div>

            {/* --- LÓGICA DE RENDERIZADO CONDICIONAL DE TARJETAS --- */}
            <div className="relative z-10 flex flex-col gap-12 w-full animate-in fade-in duration-500" key={`cards-${selectedCountry}`}>
              
              {/* SI EL PAÍS TIENE HUB (TARJETA HORIZONTAL) */}
              {currentData.hasHub && (
                  
                  <div className="bg-[#F9FAFB] rounded-[2rem] flex flex-col lg:flex-row overflow-hidden relative w-full shadow-sm">
                    
                    {/* Columna 1: Imagen Full Height (Pegada a la izquierda absoluta) */}
                    <div className="w-full lg:w-[35%] relative min-h-[250px] lg:min-h-auto bg-gray-200">
                      <img src="/hub_USA.png" alt="TAAG Hub" className="absolute inset-0 w-full h-full object-cover" />
                    </div>

                    {/* Columna 2: Contenido a la Derecha */}
                    <div className="w-full lg:w-[65%] p-8 md:p-12 flex flex-col">
                      
                      <h3 className="text-2xl md:text-4xl font-bold text-[#111111] mb-10 tracking-tight">
                        TAAG HUB {currentData.name}
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Izquierda: Ubicación */}
                        <div className="flex flex-col gap-8">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-[#111111] font-bold text-sm">TAAG Hub Facility</span>
                                <span className="text-gray-600 text-sm leading-snug">Main Science District<br/>{currentData.name}</span>
                                <a href="#" className="text-[#0066cc] text-sm hover:underline font-medium mt-1">View on Google Maps</a>
                              </div>
                            </div>
                        </div>

                        {/* Derecha: Capacidades */}
                        <div className="flex flex-col">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Capabilities</h4>
                            <ul className="flex flex-col gap-3">
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                                Rapid molecular detection of pathogens.
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                                Next Generation Sequencing (NGS) and traceability.
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                                Scientific support for method selection.
                              </li>
                              <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                                Distribution center for fast kit supply.
                              </li>
                            </ul>
                        </div>
                      </div>

                      {/* Contactos */}
                      <div className="mt-10 pt-8 border-t border-gray-200/80">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Key Contacts</h4>
                          <div className="flex flex-col sm:flex-row gap-8">
                            
                            <div className="flex items-center gap-5">
                              {/* Caras grandes: w-20 en móvil, w-24 en desktop */}
                              <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                              <div className="flex flex-col">
                                  <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Regional Director</span>
                                  <span className="text-base md:text-lg font-bold text-[#111111]">John Doe</span>
                                  <a href="mailto:jdoe@taag.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">jdoe@taag.com</a>
                                  <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 234 567 8900</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-5">
                              <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                              <div className="flex flex-col">
                                  <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">App Scientist</span>
                                  <span className="text-base md:text-lg font-bold text-[#111111]">Ana Smith</span>
                                  <a href="mailto:asmith@taag.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">asmith@taag.com</a>
                                  <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 234 567 8901</span>
                              </div>
                            </div>

                          </div>
                      </div>

                    </div>
                  </div>
              )}

              {/* LAS 2 TARJETAS VERTICALES SIEMPRE PRESENTES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* TARJETA VERTICAL: LOCAL PARTNER */}
                <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full relative overflow-hidden shadow-sm">
                    
                    <h3 className="text-2xl font-bold text-[#111111] mb-8 mt-2">Local Partner</h3>

                    {/* Logo B&N y Mapa */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
                        {/* Contenedor de Logo sin borde ni sombra */}
                        <div className="w-32 h-20 sm:w-40 sm:h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                          <img src="/logo_kreglinger.png" alt="Local Partner Logo" className="w-full h-full object-contain p-3 grayscale" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-[#111111] font-bold text-sm">Distribuidora Local S.A.</span>
                              <span className="text-gray-600 text-sm leading-snug">Av. Comercial 456<br/>{currentData.name}</span>
                            </div>
                          </div>
                          <a href="#" className="text-[#0066cc] text-xs hover:underline font-medium ml-6">View on Google Maps</a>
                        </div>
                    </div>

                    {/* Capacidades */}
                    <div className="flex flex-col flex-grow mb-10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Capabilities</h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Direct commercial support and local pricing.
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Fast inventory management and kit replenishment.
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Initial kit implementation and training.
                          </li>
                        </ul>
                    </div>

                    {/* Contactos */}
                    <div className="flex flex-col pt-6 border-t border-gray-200/80 mt-auto">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Key Contacts</h4>
                        <div className="flex items-center gap-5">
                          <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Sales Executive</span>
                              <span className="text-base md:text-lg font-bold text-[#111111]">Mario Rossi</span>
                              <a href="mailto:mrossi@partner.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">mrossi@partner.com</a>
                              <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 987 654 3210</span>
                          </div>
                        </div>
                    </div>

                </div>

                {/* TARJETA VERTICAL: SERVICE LAB PARTNER */}
                <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full relative overflow-hidden shadow-sm">
                    
                    <h3 className="text-2xl font-bold text-[#111111] mb-8 mt-2">Service Lab partner</h3>

                    {/* Logo B&N y Mapa */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
                        {/* Contenedor de Logo sin borde ni sombra */}
                        <div className="w-32 h-20 sm:w-40 sm:h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                          <img src="/cabbage.png" alt="Service Lab Logo" className="w-full h-full object-contain p-3 grayscale opacity-80" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-[#111111] font-bold text-sm">Laboratorio Avanzado</span>
                              <span className="text-gray-600 text-sm leading-snug">Ruta Científica 789<br/>{currentData.name}</span>
                            </div>
                          </div>
                          <a href="#" className="text-[#0066cc] text-xs hover:underline font-medium ml-6">View on Google Maps</a>
                        </div>
                    </div>

                    {/* Capacidades */}
                    <div className="flex flex-col flex-grow mb-10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Capabilities</h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Routine testing executed fully with TAAG Kits.
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Direct integration with TxA Software.
                          </li>
                          <li className="flex items-start gap-3 text-[#111111] font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2}/> 
                            Local sampling logistics and collection.
                          </li>
                        </ul>
                    </div>

                    {/* Contactos */}
                    <div className="flex flex-col pt-6 border-t border-gray-200/80 mt-auto">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Key Contacts</h4>
                        <div className="flex items-center gap-5">
                          <img src="/face.png" alt="Contact" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[10px] font-bold uppercase tracking-widest">Lab Director</span>
                              <span className="text-base md:text-lg font-bold text-[#111111]">Laura Davis</span>
                              <a href="mailto:ldavis@lab.com" className="text-sm md:text-base text-gray-500 hover:text-[#111111]">ldavis@lab.com</a>
                              <span className="text-sm md:text-base text-gray-500 mt-0.5">+1 555 444 3333</span>
                          </div>
                        </div>
                    </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] pb-4 mb-8 border-b border-gray-100">
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

    </div>
  );
}