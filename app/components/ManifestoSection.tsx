"use client";

import { Box, Cpu, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ManifestoSection() {
  const t = useTranslations("Home.Manifesto");

  return (
    <section className="relative bg-[#050505] py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
          {t("titleLine1")} <br />
          <span className="text-[#FF270A]">{t("titleAccent")}</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
          <p>
            {t("p1Before")}
            <span className="text-white">{t("p1Highlight")}</span>
            {t("p1After")}
          </p>
          <p>
            {t("p2Before")}
            <span className="text-white">{t("p2Highlight")}</span>
            {t("p2After")}
          </p>
        </div>

        <div className="h-px w-24 bg-white/20 mx-auto my-16" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Box className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("pillar1Title")}</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">{t("pillar1Body")}</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Cpu className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("pillar2Title")}</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">{t("pillar2Body")}</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF270A]/50 transition-colors">
              <Globe className="w-6 h-6 text-white group-hover:text-[#FF270A] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("pillar3Title")}</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">{t("pillar3Body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
