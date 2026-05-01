"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCTA } from "@/app/components/CTAProvider";

export default function EleviaCaseStudy() {
  const { openMeeting } = useCTA();
  const t = useTranslations("EmpTesting.EleviaCaseStudy");

  return (
    <section className="w-full bg-[#121212] pt-16 md:pt-18 pb-32 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="w-full flex flex-col items-start relative z-10">
          <div className="relative mb-14 w-full max-w-4xl">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[75%] md:w-[75%] h-[90px] md:h-[120px] -z-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-[#FF270A] blur-[20px] md:blur-[30px] opacity-90 mix-blend-screen rounded-full" />
            </div>

            <h2 className="relative text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05] drop-shadow-sm">
              {t("titleLine1")} <br />
              {t("titleLine2")}
            </h2>
          </div>

          <p className="text-base md:text-lg text-[#a1a1a6] max-w-4xl leading-relaxed mb-20 font-medium">
            {t("introLead")}
            <strong className="text-white">{t("introStrong")}</strong>
            {t("introRest")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 w-full">
            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat1Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  {t("stat1Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[220px]">
                {t("stat1Desc")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat2Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  {t("stat2Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                {t("stat2Desc")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat3Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-[60px] font-bold text-[#FF270A] tracking-tighter leading-none">
                  {t("stat3Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                {t("stat3Desc")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat4Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  {t("stat4Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                {t("stat4Desc")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat5Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  {t("stat5Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[250px]">
                {t("stat5Desc")}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-black text-white mb-1 tracking-wide">{t("stat6Label")}</span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-[48px] font-bold text-[#FF270A] tracking-tighter leading-none py-1">
                  {t("stat6Value")}
                </span>
              </div>
              <span className="text-sm text-white/80 font-medium leading-relaxed max-w-[260px]">
                {t("stat6Desc")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-20">
            <Link
              href="/emp-testing"
              className="inline-flex items-center gap-1.5 text-base md:text-lg text-white hover:text-white/70 transition-colors font-medium group"
            >
              {t("learnMore")}
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={openMeeting}
              className="inline-flex items-center gap-1.5 text-base md:text-lg text-white hover:text-white/70 transition-colors font-medium group"
            >
              {t("contactUs")}
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
