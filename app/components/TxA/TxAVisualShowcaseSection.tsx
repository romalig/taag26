"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import TxAVisualShowcasePanel from "./TxAVisualShowcasePanel";

/**
 * Section wrapper (headline + line animation) for the shared visual panel
 * used on /TxA. Same panel as /LabNetwork — no chat, visual only.
 */
export default function TxAVisualShowcaseSection() {
  const t = useTranslations("TxA.VisualSection");
  const [isLineVisible, setIsLineVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsLineVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="txa-expert-visual"
      className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden relative scroll-mt-24"
      ref={sectionRef}
    >
      {isLineVisible && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[20px] pointer-events-none z-50">
          <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[20px] opacity-0 animate-line-glow origin-center" />
          <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[4px] opacity-0 animate-line-glow origin-center" />
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-16 text-center flex flex-col items-center relative z-10 pt-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-6 font-sora tracking-tight leading-[1.1] md:leading-tight">
          {t("titleA")} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400">
            {t("titleB")}
          </span>
        </h2>
        <p className="text-[17px] md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          {t("body")}
        </p>
      </div>

      <div className="w-full flex justify-center px-4 md:px-6 relative z-10">
        <TxAVisualShowcasePanel className="max-w-[900px]" />
      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }

        @keyframes expandLine {
          0% {
            transform: scaleX(0.01);
          }
          100% {
            transform: scaleX(1.1);
          }
        }
        @keyframes fadeLine {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-line-glow {
          animation: expandLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            fadeLine 1.5s linear forwards;
        }
      `}</style>
    </section>
  );
}
