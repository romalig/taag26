"use client";

import { Clock, Zap, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SummarySection() {
  const t = useTranslations("EmpTesting.Summary");
  const metrics = t.raw("metrics") as Array<{label: string; value: string; change: string}>;
  const financialMetrics = {
    annualSavings: 228000,
  };

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white text-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
            
            {/* Contexto & Reto */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 border-l-[3px] border-[#FF270A] pl-6 md:pl-8">
                <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tighter leading-tight">
                  {t("problemTitleA")}<br /> {t("problemTitleB")}
                </h2>
              </div>
              <div className="space-y-6 text-sm md:text-lg text-gray-600 leading-relaxed font-medium pl-6 md:pl-8">
                <p>
                  {t("problemBodyA")}
                </p>
                <p>
                  {t("problemBodyB")}
                </p>
              </div>
            </div>

            {/* La Solución */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 border-l-[3px] border-gray-200 pl-6 md:pl-8">
                <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tighter leading-tight">
                  {t("transformationTitleA")}<br /> {t("transformationTitleB")}
                </h2>
              </div>
              <div className="space-y-6 text-sm md:text-lg text-gray-600 leading-relaxed font-medium pl-6 md:pl-8">
                <p>
                  {t("transformationBody")}
                </p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta de Impacto */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-32 relative z-20">
            <div className="bg-[#111111] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF270A] mb-4 block">
                {t("impact")}
              </span>
              
              <h3 className="text-4xl md:text-5xl xl:text-[50px] font-black tracking-tighter mb-4 leading-none break-words">
                €{financialMetrics.annualSavings.toLocaleString('de-DE')}
              </h3>

              <p className="text-sm font-bold text-gray-400 mb-10 max-w-[200px]">
                {t("savings")}
              </p>
              
              <div className="w-full h-px bg-white/10 mb-8" />
              
              <ul className="flex flex-col gap-6">
                {[
                  { icon: Clock, ...metrics[0] },
                  { icon: FlaskConical, ...metrics[1] },
                  { icon: Zap, ...metrics[2] },
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF270A] shrink-0">
                       <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">{item.label}</div>
                      <div className="text-base font-extrabold text-white">{item.value}</div>
                    </div>
                    {/* CAMBIO AQUÍ: de text-white/30 a text-gray-400 para mejor legibilidad */}
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
                      {item.change}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
