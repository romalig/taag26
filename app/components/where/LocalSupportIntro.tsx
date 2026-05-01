"use client";

import type { LucideIcon } from "lucide-react";
import { Brain, Users, Dna } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LocalSupportIntro() {
  const t = useTranslations("Pages.Where.localSupport");

  return (
    <section className="w-full pt-24 pb-40 px-6 bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
            {t("headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto">
          <SupportIconCard
            Icon={Brain}
            title={t("hubsTitle")}
            desc={t("hubsDesc")}
          />
          <SupportIconCard
            Icon={Users}
            title={t("partnersTitle")}
            desc={t("partnersDesc")}
          />
          <SupportIconCard Icon={Dna} title={t("labTitle")} desc={t("labDesc")} />
        </div>
      </div>
    </section>
  );
}

function SupportIconCard({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
      <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
