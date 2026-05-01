"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Microscope, Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AigorSection() {
  const t = useTranslations("Home.AigorSection");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-header-theme="dark"
      ref={sectionRef}
      className="relative bg-[#050505] py-24 lg:py-40 overflow-hidden text-white border-t border-white/5"
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600 via-purple-600 to-[#FF270A] rounded-full pointer-events-none transition-all duration-[2s] ease-out ${
          isVisible ? "opacity-25 blur-[120px] scale-100" : "opacity-0 blur-0 scale-50"
        }`}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div
          className={`relative mb-16 transition-all duration-[1.5s] ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
          }`}
        >
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-[#FF270A] rounded-3xl blur transition-opacity duration-[2s] delay-300 ${
              isVisible ? "opacity-60" : "opacity-0"
            }`}
          />
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
            <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
              AiGOR
            </h2>
            <span className="mt-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#FF270A]">
              {t("chipSubtitle")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {t("headline1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#FF270A]">
              {t("headlineAccent")}
            </span>
          </h3>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">{t("intro")}</p>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 w-full max-w-5xl transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Microscope className="w-8 h-8 text-purple-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">{t("card1Stat")}</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">{t("card1Label")}</p>
            <p className="text-sm text-white/60">{t("card1Body")}</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Timer className="w-8 h-8 text-[#FF270A] mb-4" />
            <div className="text-4xl font-bold text-white mb-2">{t("card2Stat")}</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">{t("card2Label")}</p>
            <p className="text-sm text-white/60">{t("card2Body")}</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <div className="text-4xl font-bold text-white mb-2">{t("card3Stat")}</div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">{t("card3Label")}</p>
            <p className="text-sm text-white/60">{t("card3Body")}</p>
          </div>
        </div>

        <div className={`mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Link
            href="/aigor"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#FF270A] transition-colors group cursor-pointer"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
