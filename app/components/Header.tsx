"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, Globe, User, ChevronRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sora } from "next/font/google";
import { SITE_URLS } from "@/app/lib/api-config";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });

const NAV_LINKS = [
  { name: "Industrial Microbiology", href: "/industrial" },
  { name: "Customized Molecular", href: "/customized" },
  { name: "Digital Transformation", href: "/TxA" },
  { name: "Lab services", href: "/LabNetwork" },
  { name: "Lab Partners", href: "/labs" },
  { name: "Where We Are", href: "/where" },
  { name: "About", href: "/AboutUs" },
];

const LANGUAGES = [
  { name: "English", label: "English" },
  { name: "Español", label: "Español" },
  { name: "Français", label: "Français" },
  { name: "Nederlands", label: "Nederlands" },
  { name: "Português", label: "Português" },
  { name: "Arabic", label: "العربية" },
];

// --- Featured (mismo contenido que FeaturedSolutions.tsx, sin AiGOR) ---
// TODO: mover a /app/lib/featured.ts e importarlo también en FeaturedSolutions.
const SLATE_GRADIENT = "linear-gradient(180deg, #050608 0%, #39414C 30%, #A3AEBB 100%)";
const RANGE_GRADIENT = "linear-gradient(100deg, #FF270A 0%, #c22c98 38%, #9333EA 68%, #2563EB 100%)";
const BRAND_COLORS = ["#FF270A", "#c22c98", "#9333EA", "#2563EB"];

// 4 anillos entrelazados con los colores de marca
const FourRings = () => (
  <svg viewBox="0 0 64 22" className="h-5 w-auto" aria-hidden>
    {BRAND_COLORS.map((c, i) => (
      <circle key={c} cx={11 + i * 14} cy={11} r={8.5} fill="none" stroke={c} strokeWidth={2.2} />
    ))}
  </svg>
);

type Featured = {
  href: string;
  title: string;      // nombre de la solución (arriba)
  lead: string;       // contexto sobre el mensaje principal
  visual: string;     // mensaje principal
  size: string;       // tamaño del mensaje principal
  gradient?: boolean; // mensaje principal con degradado de marca
  deco: ReactNode;    // acento de color abajo
};

const FEATURED: Featured[] = [
  {
    href: "/products/elevia-1-1",
    title: "Elevia 1.1 Salmonella kit",
    lead: "Salmonella results as fast as",
    visual: "3–6h",
    size: "text-[2rem]",
    gradient: true,
    deco: <Image src="/aoac_elevia11.png" alt="AOAC Performance Tested Method" width={100} height={40} className="h-8 w-auto" />,
  },
  {
    href: "/solutions/seafood",
    title: "New matrix validated: Shrimp",
    lead: "Salmonella in shrimp, results within the",
    visual: "Same shift",
    size: "text-2xl",
    deco: <span aria-hidden className="text-2xl leading-none select-none">🦐</span>,
  },
  {
    href: "/solutions/beverage-spoilage",
    title: "Fast & broad spoilage testing",
    lead: "Main spoilage threats in one PCR reaction",
    visual: "4 in 1",
    size: "text-[2rem]",
    deco: <FourRings />,
  },
  {
    href: "/laboratory-services", // NAV_LINKS usa /LabNetwork — unificar
    title: "Laboratory services",
    lead: "Pathogen results with AI-powered analysis",
    visual: "Same-day",
    size: "text-2xl",
    deco: (
      <span aria-hidden className="flex items-center gap-1.5">
        <Zap className="w-5 h-5 text-[#FF270A]" fill="currentColor" strokeWidth={0} />
        <Sparkles className="w-5 h-5 text-[#9333EA]" strokeWidth={1.75} />
      </span>
    ),
  },
];

const FeaturedTile = ({ item, onClick }: { item: Featured; onClick: () => void }) => (
  <Link
    href={item.href}
    onClick={onClick}
    className="snap-start shrink-0 w-[170px] h-[250px] rounded-2xl bg-[#F5F5F7] p-4 flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
  >
    <p className="h-9 text-center [text-wrap:balance] text-[13px] font-medium leading-snug text-[#111111] line-clamp-2">{item.title}</p>
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <p className="text-[11px] leading-snug text-black/50 mb-2 [text-wrap:balance]">{item.lead}</p>
      <span
        className={`${item.size} ${item.gradient ? "font-bold" : "font-semibold"} tracking-tighter leading-none whitespace-nowrap bg-clip-text text-transparent pb-[0.08em]`}
        style={{ backgroundImage: item.gradient ? RANGE_GRADIENT : SLATE_GRADIENT }}
      >
        {item.visual}
      </span>
    </div>
    <div className="h-10 flex items-center justify-center">{item.deco}</div>
  </Link>
);

export default function Header({ theme = "light" }: { theme?: "light" | "dark" | "hybrid" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [dynamicTheme, setDynamicTheme] = useState(theme);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      if (!scrolled) {
        setDynamicTheme(theme);
        return;
      }

      const sections = Array.from(document.querySelectorAll("[data-header-theme]"));

      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (activeSection) {
        const newTheme = activeSection.getAttribute("data-header-theme");
        if (newTheme === "dark" || newTheme === "light" || newTheme === "hybrid") {
          setDynamicTheme(newTheme);
        }
      } else {
        setDynamicTheme(theme);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  // Bloqueo de scroll + cierre con Escape; limpia al desmontar
  useEffect(() => {
    const open = isMenuOpen || isLangOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isLangOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const headerBg = isScrolled
    ? dynamicTheme === "dark"
      ? "bg-black/70 backdrop-blur-md border-b border-white/10"
      : "bg-white border-b border-black/5"
    : "bg-transparent border-transparent";

  const useWhiteForeground =
    !isMenuOpen && !isLangOpen && (dynamicTheme === "dark" || (dynamicTheme === "hybrid" && !isScrolled));

  const textColor = useWhiteForeground ? "text-white" : "text-[#111111]";
  const logoClasses = useWhiteForeground ? "brightness-0 invert" : "";

  return (
    <div className={sora.className}>
      <header className={`fixed top-0 left-0 right-0 z-[50] transition-colors duration-300 ${headerBg} py-4`}>
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <Link
            href="/"
            className="relative z-[102] shrink-0"
            onClick={() => {
              setIsMenuOpen(false);
              setIsLangOpen(false);
            }}
          >
            <div className="relative w-24 h-6 md:w-28 md:h-7 transition-opacity hover:opacity-80">
              <Image
                src="/logo-red1.png"
                alt="TAAG Logo"
                fill
                className={`object-contain object-left ${logoClasses}`}
                priority
              />
            </div>
          </Link>

          <div className={`flex items-center gap-4 md:gap-6 relative z-[102] transition-colors duration-500 ${textColor}`}>
            <Link
              href={SITE_URLS.txalabLogin}
              prefetch={false}
              className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>

            <button
              aria-label="Select language"
              aria-expanded={isLangOpen}
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsMenuOpen(false);
              }}
              className="p-1 hover:opacity-70 transition-transform duration-300 hover:scale-110"
            >
              <Globe className="w-6 h-6" />
            </button>

            <button
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              className="p-1 transition-transform duration-300 hover:scale-110"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsLangOpen(false);
              }}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MENU LATERAL --- */}
      <div
        className={`fixed inset-0 z-[90] bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[480px] bg-white z-[100] sm:shadow-2xl transition-[transform,visibility] duration-300 ease-out will-change-transform flex flex-col ${isMenuOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-black/5 shrink-0">
          <span className="text-xl font-bold text-[#111111]">Menu</span>
          <div className="flex items-center gap-4">
            <Link
              href={SITE_URLS.txalabLogin}
              prefetch={false}
              aria-label="Log in"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5 text-[#111111]" />
            </Link>
            <button
              aria-label="Close menu"
              onClick={closeMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#111111]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="bg-[#F5F5F7] p-6 pb-8 border-b border-black/5">
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">Featured Technology</p>
            <Link href="/aigor" onClick={closeMenu} className="bg-white rounded-2xl p-4 flex items-start gap-5 cursor-pointer block">
              <div className="w-24 h-24 relative flex items-center justify-center rounded-xl overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF270A] via-purple-600 to-blue-600" />
                <div className="absolute inset-[3px] bg-[#111111] rounded-[10px] flex flex-col items-center justify-center z-10 p-1 text-center">
                  <span className="text-xl font-extrabold text-white tracking-tight leading-none mb-1">AiGOR</span>
                  <span className="text-[7px] font-bold text-[#FF270A] uppercase tracking-widest leading-tight">RNA Technology</span>
                </div>
              </div>
              <div className="flex flex-col justify-center pt-1">
                <h4 className="text-lg font-bold text-[#111111] leading-tight mb-1">AiGOR™</h4>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">Advanced RNA technology for ultra-fast results</p>
              </div>
            </Link>
          </div>

          <div className="py-6 border-b border-black/5">
            <div className="px-6 mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Featured solutions</p>
              <Link
                href="/solutions" /* TODO: URL real, misma que "All featured solutions" */
                onClick={closeMenu}
                className="inline-flex items-center gap-0.5 text-xs font-medium text-[#111111] hover:text-[#FF270A] transition-colors"
              >
                See all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FEATURED.map((item) => (
                <FeaturedTile key={item.href} item={item} onClick={closeMenu} />
              ))}
              <div aria-hidden className="shrink-0 w-3" />
            </div>
          </div>

          <nav className="p-6">
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">Explore</p>
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4 border-b border-black/5 text-lg font-medium text-[#111111] hover:text-[#FF270A] transition-colors"
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 text-black/20 group-hover:text-[#FF270A]" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* --- SELECTOR DE IDIOMA --- */}
      {isLangOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select language"
          className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-500 flex items-center justify-center"
        >
          <button
            aria-label="Close language selector"
            onClick={() => setIsLangOpen(false)}
            className="absolute top-8 right-8 p-4 hover:opacity-50 transition-opacity"
          >
            <X className="w-10 h-10 text-[#111111]" strokeWidth={1} />
          </button>

          <div className="flex flex-col items-center gap-8 md:gap-12">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setIsLangOpen(false)}
                className="text-3xl md:text-5xl font-bold text-[#111111] hover:text-[#FF270A] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
