"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, User, ChevronRight, MapPin } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";
// IMPORTANTE: Importamos Sora directamente para asegurar que se aplique en todo el header
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });

const NAV_LINKS = [
  { name: "Industrial Microbiology", href: "#industrial" },
  { name: "Customized Molecular", href: "#custom" },
  { name: "Digital Transformation", href: "#digital" },
  { name: "Hubs", href: "#hubs" },
  { name: "Technologies", href: "#technologies" },
  { name: "Resources", href: "#resources" },
  { name: "About", href: "/about" },
];

const HUBS_LIST = ["USA", "Belgium", "Mexico", "Chile"];
const PARTNERS_LIST = ["Peru", "Colombia", "Argentina", "Brazil", "Spain"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);

  // Manejo del Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body
  useEffect(() => {
    if (isMenuOpen || isGlobeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen, isGlobeOpen]);

  // Estilos dinámicos
  const headerBg = isScrolled || isMenuOpen || isGlobeOpen ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-black/5" : "bg-transparent border-transparent";
  const textColor = isScrolled || isMenuOpen || isGlobeOpen ? "text-[#111111]" : "text-white";

  return (
    // Aplicamos la fuente Sora a todo el bloque
    <div className={sora.className}>
      <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${headerBg} py-4`}>
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          
          {/* 1. LOGO IZQUIERDA */}
          <Link href="/" className="relative z-[102] shrink-0" onClick={() => {setIsMenuOpen(false); setIsGlobeOpen(false);}}>
            <div className="relative w-24 h-6 md:w-28 md:h-7 transition-opacity hover:opacity-80">
               <Image 
                 src="/logo-red1.png" 
                 alt="TAAG Logo"
                 fill
                 className={`object-contain object-left transition-all duration-500 ${!isScrolled && !isMenuOpen && !isGlobeOpen ? "brightness-0 invert" : ""}`}
                 priority
               />
            </div>
          </Link>

          {/* 2. ACCIONES DERECHA */}
          <div className="flex items-center gap-4 md:gap-6 relative z-[102]">
            
            {/* Login Desktop */}
            <Link
              href="/login"
              className={`hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-colors ${textColor}`}
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>

            {/* Globe Trigger */}
            <button 
                onClick={() => {setIsGlobeOpen(!isGlobeOpen); setIsMenuOpen(false);}}
                className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-colors ${textColor}`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">Locations</span>
            </button>

            {/* Hamburguesa */}
            <button
              className={`p-1 transition-transform duration-300 hover:scale-110 ${textColor}`}
              onClick={() => {setIsMenuOpen(!isMenuOpen); setIsGlobeOpen(false);}}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* --- DRAWER MENU LATERAL --- */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[480px] bg-white z-[100] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
          {/* CABECERA DEL DRAWER */}
          <div className="flex items-center justify-between p-6 border-b border-black/5 shrink-0">
             <span className="text-xl font-bold text-[#111111]">Menu</span>
             <div className="flex items-center gap-4">
                <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="w-5 h-5 text-[#111111]" />
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-[#111111]" />
                </button>
             </div>
          </div>

          {/* CONTENIDO SCROLLABLE */}
          <div className="flex-1 overflow-y-auto">
             
             {/* Lista de Links */}
             <nav className="p-6">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">Explore</p>
                <div className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between py-4 border-b border-black/5 text-lg font-medium text-[#111111] hover:text-[#FF270A] hover:pl-2 transition-all"
                    >
                        {link.name}
                        <ChevronRight className="w-5 h-5 text-black/20 group-hover:text-[#FF270A]" />
                    </Link>
                  ))}
                </div>
             </nav>

             {/* FEATURED SECTION (AiGOR) */}
             <div className="bg-[#F5F5F7] p-6 mt-4 pb-12">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">Featured Technology</p>
                
                {/* AiGOR Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex items-start gap-5 cursor-pointer hover:shadow-md transition-shadow group">
                    
                    {/* LOGO AiGOR GENERADO (Tipográfico + RNA Technology en Rojo) */}
                    <div className="w-24 h-24 relative flex items-center justify-center rounded-xl overflow-hidden shrink-0">
                        {/* 1. Fondo Gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF270A] via-purple-600 to-blue-600" />
                        
                        {/* 2. Máscara Interior */}
                        <div className="absolute inset-[3px] bg-[#111111] rounded-[10px] flex flex-col items-center justify-center z-10 p-1 text-center">
                            {/* AiGOR */}
                            <span className="text-xl font-extrabold text-white tracking-tight leading-none mb-1">
                              AiGOR
                            </span>
                            {/* RNA TECHNOLOGY */}
                            <span className="text-[7px] font-bold text-[#FF270A] uppercase tracking-widest leading-tight">
                              RNA Technology
                            </span>
                        </div>

                        {/* 3. Brillo */}
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                    </div>

                    {/* Texto Descriptivo */}
                    <div className="pt-1">
                        <h4 className="text-lg font-bold text-[#111111] leading-tight mb-1">AiGOR™ Technology</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            RNA-based detection 10,000X more sensitive than PCR.
                        </p>
                    </div>
                </div>
             </div>
          </div>
      </div>

      {/* --- GLOBE OVERLAY --- */}
      {isGlobeOpen && (
        <div className={`fixed inset-0 z-[99] bg-white/95 backdrop-blur-xl pt-24 px-6 animate-in zoom-in-95 duration-200 ${sora.className}`}>
            <button 
              onClick={() => setIsGlobeOpen(false)}
              className="absolute top-6 right-6 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            <div className="max-w-5xl mx-auto mt-10 h-full overflow-y-auto pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">Our Global Presence</h2>
                    <p className="text-lg text-gray-500">Delivering precision diagnostics across borders.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 text-[#FF270A]">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xs font-bold text-black/40 uppercase tracking-[0.2em] mb-8">Direct Hubs</h3>
                        <ul className="space-y-6">
                            {HUBS_LIST.map((country) => (
                                <li key={country} className="text-3xl md:text-4xl font-bold text-[#111111]">
                                    {country}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 text-gray-400">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xs font-bold text-black/40 uppercase tracking-[0.2em] mb-8">Partner Network</h3>
                        <ul className="space-y-6">
                            {PARTNERS_LIST.map((country) => (
                                <li key={country} className="text-2xl md:text-3xl font-medium text-gray-400">
                                    {country}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}