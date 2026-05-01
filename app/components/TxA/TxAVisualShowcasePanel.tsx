"use client";

/**
 * Decorative “Expert” showcase card (gradient panel + animated mock conversation).
 * Shared by /LabNetwork (LabTxA) and /TxA — visual only, no chat API.
 */

import { useEffect, useRef, useState } from "react";
import { Sparkles, MoreHorizontal, MousePointerClick, Map } from "lucide-react";
import { useTranslations } from "next-intl";

export type TxAVisualShowcasePanelProps = {
  className?: string;
};

export default function TxAVisualShowcasePanel({ className = "" }: TxAVisualShowcasePanelProps) {
  const t = useTranslations("TxA.VisualPanel");
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isCardVisible) {
      const t1 = setTimeout(() => setShowUserMessage(true), 1000);
      const t2 = setTimeout(() => setIsTyping(true), 2000);
      const t3 = setTimeout(() => {
        setIsTyping(false);
        setShowAiResponse(true);
      }, 4000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isCardVisible]);

  const shell =
    "w-full h-[490px] sm:h-[500px] md:h-[580px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-500 bg-gradient-to-br from-indigo-600 to-blue-500 shadow-2xl shadow-indigo-600/20";

  return (
    <div ref={cardRef} className={`${shell} ${className}`.trim()}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />

      <div className="absolute top-0 left-0 w-full p-6 sm:p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 font-sora tracking-tight">
          {t("title")}
        </h3>
        <p
          className={`text-[13px] md:text-base font-medium leading-relaxed text-indigo-100 max-w-[90%] md:max-w-[340px] transition-all duration-1000 transform ${
            isCardVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ animationDelay: "100ms" }}
        >
          {t("body")}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[70%] md:h-full z-10 pointer-events-none overflow-hidden flex items-end justify-end">
        <div className="w-full h-full flex items-end justify-end p-4 md:p-10">
          <div className="w-full max-w-[480px] flex flex-col gap-2.5 md:gap-4 transform scale-[0.82] sm:scale-[0.88] md:scale-100 origin-bottom-right">
            <div
              className={`self-end bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[90%] border border-white/20 shadow-lg transition-all duration-500 transform ${
                showUserMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-[13px] md:text-sm font-medium">{t("question")}</p>
            </div>

            <div
              className={`self-start flex gap-3 transition-all duration-300 ${
                isTyping ? "opacity-100" : "opacity-0 pointer-events-none hidden"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl rounded-tl-sm border border-white/10">
                <MoreHorizontal className="w-5 h-5 text-white animate-pulse" />
              </div>
            </div>

            <div
              className={`self-start flex flex-col gap-3 max-w-[95%] transition-all duration-500 transform ${
                showAiResponse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 hidden"
              }`}
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {t("insight")}
                    </span>
                  </div>
                  <p className="text-[13px] md:text-sm leading-relaxed font-medium">
                    {t("detectedPrefix")} <span className="font-bold text-indigo-900">{t("detectedHighlight")}</span> {t("detectedSuffix")}{" "}
                    <span className="italic">Listeria spp.</span> {t("detectedEnd")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0" />
                <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-xl w-full pointer-events-auto">
                  <p className="text-[13px] md:text-sm leading-relaxed font-medium mb-3">
                    {t("map")} <span className="italic">Listeria spp.</span> {t("mapEnd")}
                  </p>
                  <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group/cta">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] md:text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">
                        {t("scheme")}
                      </span>
                      <MousePointerClick className="w-4 h-4 text-indigo-500 group-hover/cta:scale-110 transition-transform" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <Map className="w-3 h-3 text-indigo-600" />
                      </div>
                      <p className="text-[9px] md:text-[10px] font-bold text-indigo-700 leading-tight">
                        {t("cta")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(12deg);
          }
          to {
            transform: translateX(200%) skewX(12deg);
          }
        }
        .animate-shine {
          animation: shine 8s infinite linear;
        }
      `}</style>
    </div>
  );
}
