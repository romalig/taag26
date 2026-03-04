"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, X, ChevronDown, Users, Brain, Dna, MapPin, CheckCircle2, Box, Zap, Activity, Newspaper } from "lucide-react";
import Image from "next/image";

// IMPORTACIONES EXTERNAS
import { IMPACT_TRANSLATIONS, TRANSLATIONS } from "./data/translations";
import { COUNTRY_DATA, REGIONS } from "./data/countryData";

// =========================================================
// COMPONENTE INTERNO: CARRUSEL LOCALIZADO
// =========================================================
interface LocalCarouselProps {
  title: string;
  items: any[];
}

const LocalCarousel = ({ title, items }: LocalCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="w-full relative mb-24">
      <div className="mb-10 pr-4 text-center md:text-left">
        <h3 className="text-[28px] md:text-3xl font-bold text-[#111111] tracking-tight">{title}</h3>
      </div>
      
      <div 
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="snap-start shrink-0 flex flex-col w-[260px] md:w-[280px] h-full">
            <div className="relative w-full rounded-[2rem] bg-white border border-gray-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden mb-6 flex items-center justify-center aspect-[4/5] shrink-0">
               <div className={`absolute w-32 h-32 ${item.glowClass} blur-3xl rounded-full opacity-15`}></div>
               <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center relative z-10 shadow-sm">
                  {item.icon}
               </div>
            </div>
            
            <div className="pr-4 flex flex-col flex-grow">
               {/* FECHA (Solo si existe en la data) */}
               {item.date && (
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                   {item.date}
                 </span>
               )}
               
               <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed mb-4">
                 <strong className="text-[#111111] font-semibold mr-1">{item.title}.</strong>
                 {item.desc}
               </p>

               {/* BOTÓN LEARN MORE */}
               {item.linkText && (
                 <a href="#" className="text-sm text-[#0066cc] font-medium hover:underline mt-auto flex items-center w-fit">
                   {item.linkText} <span className="text-[10px] leading-none ml-1 mt-0.5">&gt;</span>
                 </a>
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Controles del Carrusel */}
      <div className="hidden md:flex justify-end gap-3 mt-8 pr-4 w-full">
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
            canScrollLeft ? "bg-white border-gray-200 text-[#111111] hover:bg-gray-50 cursor-pointer" : "bg-transparent border-gray-200/50 text-gray-300 cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
            canScrollRight ? "bg-white border-gray-200 text-[#111111] hover:bg-gray-50 cursor-pointer" : "bg-transparent border-gray-200/50 text-gray-300 cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
};


// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================
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
  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS["English"];

  const LOCAL_SOLUTIONS = [
    { title: "Multiplex PCR Kits", desc: `Optimize your testing workflow with ready-to-use multiplex kits available directly in ${currentData.name}.`, icon: <Dna className="w-6 h-6 text-blue-600" />, glowClass: "bg-blue-500", linkText: "Learn more" },
    { title: "TxA Software", desc: `Automate your lab reporting. TxA is fully compliant with local regulations in ${currentData.name}.`, icon: <Activity className="w-6 h-6 text-purple-600" />, glowClass: "bg-purple-500", linkText: "Learn more" },
    { title: "Elevia Enrichment", desc: `Achieve same-day results. Skip traditional enrichment steps and stay ahead of local competitors.`, icon: <Zap className="w-6 h-6 text-orange-600" />, glowClass: "bg-orange-500", linkText: "Learn more" },
    { title: "MILA AI", desc: `Need a custom test in ${currentData.name}? MILA designs new multiplex panels in record time.`, icon: <Brain className="w-6 h-6 text-[#FF270A]" />, glowClass: "bg-red-500", linkText: "Learn more" }
  ];

  const LOCAL_NEWS = [
    { title: "Supply Chain Update", date: "MAR 03, 2026", desc: `New distribution center expansions ensure faster delivery times across ${currentData.name}.`, icon: <Box className="w-6 h-6 text-emerald-600" />, glowClass: "bg-emerald-500", linkText: "Learn more" },
    { title: "ISO 17025 Compliance", date: "FEB 28, 2026", desc: `Our local partner labs have successfully renewed their international quality certifications.`, icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />, glowClass: "bg-blue-500", linkText: "Learn more" },
    { title: "Upcoming Webinar", date: "FEB 15, 2026", desc: `Join our experts for a session on next-generation sequencing tailored for the local industry.`, icon: <Users className="w-6 h-6 text-purple-600" />, glowClass: "bg-purple-500", linkText: "Learn more" },
    { title: "Food Safety Report", date: "JAN 30, 2026", desc: `Read the latest insights on pathogen detection trends affecting production in the region.`, icon: <Newspaper className="w-6 h-6 text-gray-600" />, glowClass: "bg-gray-500", linkText: "Learn more" }
  ];

  return (
    <div className="min-h-screen relative flex flex-col font-sans">

      {/* ========================================================= */}
      {/* SECCIÓN BLANCA: Hero & Local Support Intro                  */}
      {/* ========================================================= */}
      <div className="bg-white relative z-20 pb-20"> 
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

        <section className="w-full pt-16 px-6 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
                LOCAL SUPPORT
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
                How we support your lab locally.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <Brain className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">TAAG Hubs</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Friendly, expert scientific guidance for method selection, custom molecular developments, and seamless technical troubleshooting to keep your lab at peak performance.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Local Partners</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Dedicated day-to-day commercial assistance, smooth kit implementation, fluid communication, and fast on-the-ground logistics tailored to your facility's unique needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Dna className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">Service Lab partner</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Accessible local laboratory services utilizing TAAG's advanced kits and proprietary software to deliver highly reliable and ultra-fast results near you.
                </p>
              </div>
            </div>
            
            <div className="w-full flex justify-center mt-32 relative z-20 translate-y-2">
              <span className="text-xs font-bold text-[#FF270A] uppercase tracking-[0.2em]">
                Select your region
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN GRIS: Selector País y Contenido Local               */}
      {/* ========================================================= */}
      <div className="bg-[#F4F4F5] relative w-full flex-grow pb-32 flex flex-col items-center">
        
        {/* LÍNEAS MINIMALISTAS EN EL BORDE SUPERIOR (Efecto Bandera Estático) */}
        <div className="absolute top-0 inset-x-0 z-10">
          {/* Resplandor suave detrás */}
          <div className="absolute top-0 inset-x-0 flex flex-row h-3 opacity-30 blur-md">
            <div className={`flex-1 ${currentData.glowColors[0]} transition-colors duration-500`}></div>
            <div className={`flex-1 ${currentData.glowColors[1]} transition-colors duration-500`}></div>
            <div className={`flex-1 ${currentData.glowColors[2]} transition-colors duration-500`}></div>
          </div>
          {/* Líneas nítidas principales */}
          <div className="relative flex flex-row h-[3px] w-full opacity-90">
            <div className={`flex-1 ${currentData.glowColors[0]} transition-colors duration-500`}></div>
            <div className={`flex-1 ${currentData.glowColors[1]} transition-colors duration-500`}></div>
            <div className={`flex-1 ${currentData.glowColors[2]} transition-colors duration-500`}></div>
          </div>
        </div>

        {/* BOTÓN SELECTOR ANCLADO AL BORDE */}
        <div className="relative -mt-7 z-30">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-4 px-10 py-4 bg-white rounded-full border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-sm"
          >
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="text-xl font-bold text-[#111111]">
              {currentData.name} — {selectedLanguage}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* ÁREA DE CONTENIDO */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 text-left mt-16">
          <div className="w-full animate-in fade-in duration-500" key={`content-${selectedCountry}-${selectedLanguage}`}>
            
            <LocalCarousel title={`${t.featuredSolutions} ${currentData.name}`} items={LOCAL_SOLUTIONS} />
            <LocalCarousel title={`${t.latestNews} ${currentData.name}`} items={LOCAL_NEWS} />

            <div className="mb-14 text-center md:text-left pt-8">
              <h2 className="text-[28px] md:text-3xl font-bold text-[#111111] tracking-tight">
                {t.supportTeam} {currentData.name}
              </h2>
            </div>

            {/* GRID DE EQUIPOS LOCALES CON ITEMS-STRETCH */}
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 w-full items-stretch">
              
              {/* === COLUMNA IZQUIERDA: TAAG HUB === */}
              {currentData.hasHub && (
                  <div className="w-full xl:w-[60%] flex flex-col bg-white rounded-[2rem] overflow-hidden">
                    
                    <div className="w-full relative h-[200px] md:h-[240px] bg-gray-100 shrink-0">
                      <Image src="/hub_USA.png" alt="TAAG Hub" fill className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="w-full p-6 md:p-8 lg:p-10 flex flex-col flex-grow gap-8">
                      
                      <div className="flex flex-col items-start gap-4">
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-[#111111] uppercase tracking-widest">
                              {t.hubTitle} {currentData.name}
                            </h3>
                            <span className="text-[11px] md:text-xs font-bold text-[#FF270A] bg-red-50 px-3 py-1.5 rounded-full w-fit mt-3 inline-block">
                              {t.hubPurpose}
                            </span>
                          </div>

                          <div className="flex items-start gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-[#FF270A] shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-700">Main Science District, {currentData.name}</span>
                              <a href="#" className="text-[#0066cc] text-[11px] hover:underline font-medium mt-0.5">{t.viewMap}</a>
                            </div>
                          </div>
                      </div>

                      <div className="flex flex-col">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.capabilities}</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.hubCap1}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.hubCap2}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.hubCap3}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.hubCap4}
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> Comprehensive training & onboarding.
                            </li>
                            <li className="flex items-start gap-2 text-gray-600 font-medium text-xs md:text-[13px] leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> Custom multiplex assay development.
                            </li>
                          </ul>
                      </div>

                      <div className="pt-6 border-t border-gray-50 mt-auto">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{t.keyContacts}</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-center text-center gap-3">
                              <img src="/face.png" alt="Contact" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shrink-0 ring-4 ring-gray-50" />
                              <div className="flex flex-col items-center">
                                  <span className="text-[#FF270A] text-[9px] font-bold uppercase tracking-widest mb-1">{t.roleReg}</span>
                                  <span className="text-sm font-bold text-[#111111]">John Doe</span>
                                  <a href="mailto:jdoe@taag.com" className="text-xs text-gray-500 hover:text-[#111111] mt-0.5">jdoe@taag.com</a>
                                  <span className="text-xs text-gray-500 mt-0.5">+1 234 567 8900</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                              <img src="/face.png" alt="Contact" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shrink-0 ring-4 ring-gray-50" />
                              <div className="flex flex-col items-center">
                                  <span className="text-[#FF270A] text-[9px] font-bold uppercase tracking-widest mb-1">{t.roleApp}</span>
                                  <span className="text-sm font-bold text-[#111111]">Ana Smith</span>
                                  <a href="mailto:asmith@taag.com" className="text-xs text-gray-500 hover:text-[#111111] mt-0.5">asmith@taag.com</a>
                                  <span className="text-xs text-gray-500 mt-0.5">+1 234 567 8901</span>
                              </div>
                            </div>
                          </div>
                      </div>

                    </div>
                  </div>
              )}

              {/* === COLUMNA DERECHA: PARTNERS APILADOS === */}
              <div className={`w-full flex flex-col gap-8 lg:gap-10 ${currentData.hasHub ? 'xl:w-[40%]' : 'grid grid-cols-1 md:grid-cols-2'}`}>
                
                {/* LOCAL PARTNER */}
                <div className="bg-white rounded-[2rem] p-6 lg:p-8 flex flex-col h-full flex-1">
                    <div className="flex flex-col mb-6">
                      <h3 className="text-sm md:text-base font-bold text-[#111111] uppercase tracking-widest">{t.partnerTitle}</h3>
                      <span className="text-[10px] md:text-xs font-bold text-[#FF270A] bg-red-50 px-2.5 py-1 rounded-full w-fit mt-2 inline-block">
                        {t.partPurpose}
                      </span>
                    </div>

                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 mb-6 text-gray-400 hover:text-[#0066cc] transition-colors group w-fit">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold text-gray-600 group-hover:text-[#0066cc]">Distribuidora Local S.A.</span>
                        <span className="text-[11px] font-medium leading-snug group-hover:underline">Av. Comercial 456, {currentData.name}</span>
                      </div>
                    </a>

                    <div className="flex flex-col flex-grow mb-6">
                        <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.capabilities}</h4>
                        <ul className="flex flex-col gap-2.5">
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.partCap1}
                          </li>
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.partCap2}
                          </li>
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.partCap3}
                          </li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-gray-50 mt-auto">
                        <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.keyContacts}</h4>
                        <div className="flex items-center gap-4">
                          <img src="/face.png" alt="Contact" className="w-14 h-14 object-cover rounded-full shrink-0 ring-2 ring-gray-50" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[9px] font-bold uppercase tracking-widest mb-0.5">{t.roleSales}</span>
                              <span className="text-xs font-bold text-[#111111]">Mario Rossi</span>
                              <a href="mailto:mrossi@partner.com" className="text-[11px] text-gray-500 hover:text-[#111111] mt-0.5">mrossi@partner.com</a>
                              <span className="text-[11px] text-gray-500 mt-0.5">+1 987 654 3210</span>
                          </div>
                        </div>
                    </div>
                </div>

                {/* SERVICE LAB PARTNER */}
                <div className="bg-white rounded-[2rem] p-6 lg:p-8 flex flex-col h-full flex-1">
                    <div className="flex flex-col mb-6">
                      <h3 className="text-sm md:text-base font-bold text-[#111111] uppercase tracking-widest">{t.labTitle}</h3>
                      <span className="text-[10px] md:text-xs font-bold text-[#FF270A] bg-red-50 px-2.5 py-1 rounded-full w-fit mt-2 inline-block">
                        {t.labPurpose}
                      </span>
                    </div>

                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 mb-6 text-gray-400 hover:text-[#0066cc] transition-colors group w-fit">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold text-gray-600 group-hover:text-[#0066cc]">Laboratorio Avanzado</span>
                        <span className="text-[11px] font-medium leading-snug group-hover:underline">Ruta Científica 789, {currentData.name}</span>
                      </div>
                    </a>

                    <div className="flex flex-col flex-grow mb-6">
                        <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.capabilities}</h4>
                        <ul className="flex flex-col gap-2.5">
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.labCap1}
                          </li>
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.labCap2}
                          </li>
                          <li className="flex items-start gap-2 text-gray-600 font-medium text-[11px] md:text-xs leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5}/> {t.labCap3}
                          </li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-gray-50 mt-auto">
                        <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.keyContacts}</h4>
                        <div className="flex items-center gap-4">
                          <img src="/face.png" alt="Contact" className="w-14 h-14 object-cover rounded-full shrink-0 ring-2 ring-gray-50" />
                          <div className="flex flex-col">
                              <span className="text-[#FF270A] text-[9px] font-bold uppercase tracking-widest mb-0.5">{t.roleLab}</span>
                              <span className="text-xs font-bold text-[#111111]">Laura Davis</span>
                              <a href="mailto:ldavis@lab.com" className="text-[11px] text-gray-500 hover:text-[#111111] mt-0.5">ldavis@lab.com</a>
                              <span className="text-[11px] text-gray-500 mt-0.5">+1 555 444 3333</span>
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
      {/* MODAL SELECTOR ESTILO TESLA                               */}
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