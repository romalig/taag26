"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useModal } from "../industrial/ModalProvider";
import {
  TxAModalContent,
  type TxaModalKey,
} from "../TxA/TxAModalShared";
import TxAVisualShowcasePanel from "../TxA/TxAVisualShowcasePanel";

export default function LabTxA() {
  const t = useTranslations("TxA.System");
  const labT = useTranslations("LabNetwork.TxA");
  const { openModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (logoRef.current) observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpenModule = (key: TxaModalKey) => {
    openModal(<TxAModalContent moduleKey={key} />);
  };

  return (
    <section className="relative w-full bg-[#f5f5f7] py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-gray-200/50">
      <div
        ref={logoRef}
        className={`absolute top-24 md:top-32 w-24 h-24 md:w-32 md:h-32 z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-[150px] opacity-0"
        }`}
      >
        <Image
          src="/LogoTxANB.png"
          alt="TAAG Xpert Assistant Logo"
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>

      <div className="relative z-20 bg-[#f5f5f7] w-full mt-24 md:mt-32 pt-10 flex flex-col items-center">
        <div className="text-center w-full max-w-7xl mx-auto px-6 mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-6 font-sora tracking-tight leading-[1.05]">
            {t("titleA")} <br className="hidden md:block" />
            <span className="text-[#86868b]">{t("titleB")}</span>
          </h2>
          <p className="text-[17px] leading-[1.4] text-[#86868b] font-medium max-w-2xl text-center">
            {labT("body")}
          </p>
        </div>

        <div className="w-full max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 h-[280px] lg:flex-1 relative flex flex-col justify-center">
              <div className="absolute top-8 left-8">
                <span className="text-sm font-bold tracking-widest text-purple-700 uppercase">
                  TxA APP
                </span>
              </div>
              <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
                {t("cards.app")}
              </p>
              <button
                type="button"
                onClick={() => handleOpenModule("app")}
                className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group z-50 cursor-pointer"
              >
                {t("learnMore")}{" "}
                <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 h-[280px] lg:flex-1 relative flex flex-col justify-center">
              <div className="absolute top-8 left-8">
                <span className="text-sm font-bold tracking-widest text-cyan-500 uppercase">
                  TxA QA
                </span>
              </div>
              <p className="text-[19px] font-semibold text-[#1d1d1f] leading-tight max-w-[90%] font-sora">
                {t("cards.qa")}
              </p>
              <button
                type="button"
                onClick={() => handleOpenModule("qa")}
                className="absolute bottom-8 left-8 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1 group z-50 cursor-pointer"
              >
                {t("learnMore")}{" "}
                <span className="transition-transform group-hover:translate-x-0.5">&gt;</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 w-full min-h-[490px] sm:min-h-[500px] md:min-h-[580px] flex flex-col items-stretch">
            <TxAVisualShowcasePanel className="max-w-none w-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}
