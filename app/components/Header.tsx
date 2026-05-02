"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, ChevronRight, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { Sora } from "next/font/google";
import { SITE_URLS } from "@/app/lib/api-config";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });

const NAV_LINKS = [
  { key: "industrial", href: "/industrial" },
  { key: "customized", href: "/customized" },
  { key: "txa", href: "/TxA" },
  { key: "labNetwork", href: "/LabNetwork" },
  { key: "labs", href: "/labs" },
  { key: "where", href: "/where" },
  { key: "about", href: "/AboutUs" },
];

const LANGUAGES = [
  { locale: "de", label: "Deutsch" },
  { locale: "en", label: "English" },
  { locale: "es", label: "Español" },
  { locale: "fr", label: "Français" },
  { locale: "it", label: "Italiano" },
  { locale: "pt", label: "Português" },
  { locale: "nl", label: "Nederlands" },
  { locale: "ar", label: "العربية" },
] as const;

// Crea un tipo basado en los locales que pusiste arriba
type SupportedLocales = (typeof LANGUAGES)[number]["locale"];

/*
 * ---------------------------------------------------------------------------
 * Language selector (Globe + full-screen picker) — DISABLED in the UI.
 * To re-enable: restore the pieces marked ENABLE_LANG_SELECTOR below, and
 * uncomment this block (then remove the slashes around const LANGUAGES only).
 *
 * import: add `Globe` next to Menu, X, User in the lucide-react import.
 *
 * const LANGUAGES = [
 *   { name: "English", label: "English" },
 *   { name: "Español", label: "Español" },
 *   { name: "Français", label: "Français" },
 *   { name: "Nederlands", label: "Nederlands" },
 *   { name: "Português", label: "Português" },
 *   { name: "Arabic", label: "العربية" },
 * ];
 *
 * Inside Header():
 *   const [isLangOpen, setIsLangOpen] = useState(false);
 *
 * Body scroll lock — include isLangOpen:
 *   useEffect(() => {
 *     if (isMenuOpen || isLangOpen) document.body.style.overflow = "hidden";
 *     else document.body.style.overflow = "unset";
 *   }, [isMenuOpen, isLangOpen]);
 *
 * Hero/logo contrast — include !isLangOpen:
 *   const useWhiteForeground =
 *     !isMenuOpen && !isLangOpen && (dynamicTheme === "dark" || ...);
 *
 * Logo Link onClick: also call setIsLangOpen(false) when closing overlays.
 *
 * Toolbar — Globe opens picker, closes menu:
 *   <button onClick={() => { setIsLangOpen(!isLangOpen); setIsMenuOpen(false); }}>
 *     <Globe className="w-6 h-6" />
 *   </button>
 *
 * Hamburger — toggle menu and close language overlay:
 *   onClick={() => { setIsMenuOpen(!isMenuOpen); setIsLangOpen(false); }}
 *
 * After the lateral menu panel, render overlay when isLangOpen (paste before closing </div> of outer wrapper):
 *
 *   {isLangOpen && (
 *     <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-500 flex items-center justify-center">
 *       <button onClick={() => setIsLangOpen(false)} className="absolute top-8 right-8 p-4 hover:opacity-50 transition-opacity">
 *         <X className="w-10 h-10 text-[#111111]" strokeWidth={1} />
 *       </button>
 *       <div className="flex flex-col items-center gap-8 md:gap-12">
 *         {LANGUAGES.map((lang) => (
 *           <button key={lang.name} onClick={() => setIsLangOpen(false)} className="text-3xl md:text-5xl font-bold text-[#111111] hover:text-[#FF270A] transition-all duration-300 hover:scale-105 active:scale-95">
 *             {lang.label}
 *           </button>
 *         ))}
 *       </div>
 *     </div>
 *   )}
 * ---------------------------------------------------------------------------
 */

export default function Header({ theme = "light" }: { theme?: "light" | "dark" | "hybrid" }) {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
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

      const sections = Array.from(document.querySelectorAll('[data-header-theme]'));
      
      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (activeSection) {
        const newTheme = activeSection.getAttribute('data-header-theme');
        if (newTheme === 'dark' || newTheme === 'light' || newTheme === 'hybrid') {
          setDynamicTheme(newTheme);
        }
      } else {
        setDynamicTheme(theme);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  useEffect(() => {
    // ENABLE_LANG_SELECTOR: also lock scroll when `isLangOpen` is true (see comment block above).
    if (isMenuOpen || isLangOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen, isLangOpen]);

  const switchLocale = (nextLocale: "en" | "es" | "fr" | "de" | "nl" | "it" | "pt"  | "ar") => {
    router.replace(pathname, { locale: nextLocale });
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const headerBg = isScrolled 
    ? (dynamicTheme === "dark" 
        ? "bg-black/70 backdrop-blur-lg border-b border-white/10" 
        : "bg-white/100 backdrop-blur-md border-b border-black/5") 
    : "bg-transparent border-transparent";

  // ENABLE_LANG_SELECTOR: add `&& !isLangOpen` so the hero logo stays correct when the lang overlay is open.
  const useWhiteForeground = !isMenuOpen && !isLangOpen && (dynamicTheme === "dark" || (dynamicTheme === "hybrid" && !isScrolled));

  const textColor = useWhiteForeground ? "text-white" : "text-[#111111]";
  const logoClasses = useWhiteForeground ? "brightness-0 invert" : "";

  return (
    <div className={sora.className}>
      <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${headerBg} py-4`}>
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          
          {/* ENABLE_LANG_SELECTOR: onClick={() => { setIsMenuOpen(false); setIsLangOpen(false); }} */}
          <Link href="/" className="relative z-[102] shrink-0" onClick={() => { setIsMenuOpen(false); setIsLangOpen(false); }}>
            <div className="relative w-24 h-6 md:w-28 md:h-7 transition-opacity hover:opacity-80">
               <Image 
                 src="/logo-red1.png" 
                 alt="TAAG Logo"
                 fill
                 className={`object-contain object-left transition-all duration-500 ${logoClasses}`}
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
              <span>{t("login")}</span>
            </Link>

            <button
              type="button"
              aria-label={t("language")}
              className="p-1 transition-transform duration-300 hover:scale-110"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsMenuOpen(false);
              }}
            >
              <Globe className="w-6 h-6" />
            </button>

            <button
              type="button"
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
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[480px] bg-white z-[100] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
          <div className="flex items-center justify-between p-6 border-b border-black/5 shrink-0">
             <span className="text-xl font-bold text-[#111111]">{t("mobileMenu.title")}</span>
             <div className="flex items-center gap-4">
                <Link href={SITE_URLS.txalabLogin} prefetch={false} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="w-5 h-5 text-[#111111]" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-[#111111]" />
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto">
             <div className="bg-[#F5F5F7] p-6 pb-8 border-b border-black/5">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">{t("mobileMenu.featuredTechnology")}</p>
                <Link href="/aigor" onClick={() => setIsMenuOpen(false)} className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex items-start gap-5 cursor-pointer hover:shadow-md transition-shadow group block">
                    <div className="w-24 h-24 relative flex items-center justify-center rounded-xl overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF270A] via-purple-600 to-blue-600" />
                        <div className="absolute inset-[3px] bg-[#111111] rounded-[10px] flex flex-col items-center justify-center z-10 p-1 text-center">
                            <span className="text-xl font-extrabold text-white tracking-tight leading-none mb-1">{t("mobileMenu.aigorLogoWordmark")}</span>
                            <span className="text-[7px] font-bold text-[#FF270A] uppercase tracking-widest leading-tight">{t("mobileMenu.aigorSubtitle")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pt-1">
                        <h4 className="text-lg font-bold text-[#111111] leading-tight mb-1">{t("mobileMenu.aigorProductTitle")}</h4>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{t("mobileMenu.aigorDescription")}</p>
                    </div>
                </Link>
             </div>
             <nav className="p-6">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">{t("mobileMenu.explore")}</p>
                <div className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.key} href={link.href} onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-4 border-b border-black/5 text-lg font-medium text-[#111111] hover:text-[#FF270A] hover:pl-2 transition-all">
                        {t(`mobileMenu.nav.${link.key}`)}
                        <ChevronRight className="w-5 h-5 text-black/20 group-hover:text-[#FF270A]" />
                    </Link>
                  ))}
                </div>
             </nav>
          </div>
      </div>

      {isLangOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-500 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsLangOpen(false)}
            className="absolute top-8 right-8 p-4 hover:opacity-50 transition-opacity"
            aria-label={t("closeLanguageSelector")}
          >
            <X className="w-10 h-10 text-[#111111]" strokeWidth={1} />
          </button>
          <div className="flex flex-col items-center gap-8 md:gap-12">
            {LANGUAGES.map((lang) => (
              <button
                type="button"
                key={lang.locale}
                onClick={() => switchLocale(lang.locale)}
                className={`text-3xl md:text-5xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  locale === lang.locale ? "text-[#FF270A]" : "text-[#111111] hover:text-[#FF270A]"
                }`}
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
