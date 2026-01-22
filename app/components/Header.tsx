"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Industrial Microbiology", href: "#industrial" },
  { name: "Customized Molecular", href: "#custom" },
  { name: "Digital Transformation", href: "#digital" },
  { name: "Hubs", href: "#hubs" },
  { name: "Resources", href: "#resources" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white border-b border-black/5 ${
          isScrolled
            ? "py-3 shadow-sm" // Un poco más compacto al bajar
            : "py-5"           // Más espacioso al inicio
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          
          {/* LOGO (Alineado a la izquierda con max-w-7xl) */}
          <Link href="/" className="flex items-center gap-2 group relative z-[101] shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-24 h-6 md:w-28 md:h-7 transition-opacity group-hover:opacity-80">
               <Image 
                 src="/logo-red.png" 
                 alt="TAAG Logo"
                 fill
                 className="object-contain object-left"
                 priority
               />
            </div>
          </Link>

          {/* MENÚ ESCRITORIO */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold text-[#111111]/70 hover:text-[#FF270A] transition-colors whitespace-nowrap tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* UTILIDADES */}
          <div className="hidden lg:flex items-center gap-4 relative z-[101] shrink-0">
            <button className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-[#111111]/60 hover:text-[#111111] transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F5F7] border border-black/5 text-[11px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white transition-all group whitespace-nowrap"
            >
              <User className="w-3 h-3" />
              Login TxA
            </Link>
          </div>

          {/* BOTÓN MÓVIL */}
          <button
            className="lg:hidden p-2 text-[#111111] relative z-[101]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-white pt-24 px-6 lg:hidden animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex flex-col gap-6 text-lg font-medium pb-20">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/5 pb-4 text-[#111111]"
              >
                {link.name}
                <ChevronRight className="w-5 h-5 text-black/20" />
              </Link>
            ))}
            
            <div className="mt-8 flex flex-col gap-4">
              <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#111111]/60">
                <Globe className="w-4 h-4" /> Switch Language
              </button>
              
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-widest shadow-lg mt-4"
              >
                Login TxA Platform
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}