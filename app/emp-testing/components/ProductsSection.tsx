"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Loader2, WifiOff } from "lucide-react";
import { useModal } from "../../components/industrial/ModalProvider";
import SolutionTemplate from "../../components/industrial/modals/SolutionTemplate";
import { getKitSolutionByTitle } from "@/app/lib/products-api";
import type { SolutionContent } from "../../components/industrial/modals/types";
import { useLocale, useTranslations } from "next-intl";

const PRODUCTS = [
  {
    key: "salmonella" as const,
    apiTitle: "Elevia 1.1 Salmonella spp.",
    image: "/Sal11.png",
    large: true,
  },
  {
    key: "salmonellaLS" as const,
    apiTitle: "Elevia 2.8 Salmonella spp. and Listeria spp.",
    image: "/Sal_EB.png",
    large: true,
  },
  {
    key: "salmonellaEB" as const,
    apiTitle: "Elevia 2.9 Salmonella spp. and Enterobacteria",
    large: false,
  },
];

type ProductKey = "salmonella" | "salmonellaLS" | "salmonellaEB";

export default function ProductsSection() {
  const t = useTranslations("EmpTesting.Products");
  const locale = useLocale();
  const upcoming = t.raw("upcoming") as Array<{title: string; desc: string; launch: string}>;
  const { openModal } = useModal();
  const cacheRef = useRef<Partial<Record<ProductKey, SolutionContent>>>({});
  const promiseRef = useRef<Partial<Record<ProductKey, Promise<SolutionContent | null>>>>({});
  const [loadingKey, setLoadingKey] = useState<ProductKey | null>(null);
  const [errorKey, setErrorKey] = useState<ProductKey | null>(null);

  useEffect(() => {
    cacheRef.current = {};
    promiseRef.current = {};
    PRODUCTS.forEach(({ key, apiTitle }) => {
      const p = getKitSolutionByTitle(apiTitle, locale)
        .then((d) => { if (d) cacheRef.current[key] = d; return d; })
        .catch(() => null);
      promiseRef.current[key] = p;
    });
  }, [locale]);

  const handleLearnMore = (key: ProductKey, apiTitle: string) => {
    const cached = cacheRef.current[key];
    if (cached) { openModal(<SolutionTemplate data={cached} />); return; }
    setErrorKey(null);
    setLoadingKey(key);
    const p = promiseRef.current[key] ?? getKitSolutionByTitle(apiTitle, locale).then((d) => { if (d) cacheRef.current[key] = d; return d; });
    p.then((data) => {
        if (data) openModal(<SolutionTemplate data={data} />);
        else setErrorKey(key);
      })
      .catch(() => setErrorKey(key))
      .finally(() => setLoadingKey((cur) => (cur === key ? null : cur)));
  };

  const translatedProducts = PRODUCTS.map((product) => ({
    ...product,
    title: t(`products.${product.key}.title`),
    desc: t(`products.${product.key}.desc`),
  }));
  const largeProducts = translatedProducts.filter((p) => p.large);
  const smallProducts = translatedProducts.filter((p) => !p.large);

  return (
    <section data-header-theme="dark"  className="py-24 md:py-32 bg-[#111111] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* CABECERA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-16 md:mb-20 w-full">
          <div>
            <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 md:mb-4 block">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
              {t("titleA")} <br /> <span className="text-gray-400">{t("titleB")}</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium md:text-right md:max-w-lg pb-1 shrink-0">
            {t("body")}
          </p>
        </div>

        {/* GRILLA */}
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-5">

          {/* TARJETAS GRANDES */}
          {largeProducts.map((prod) => (
            <div key={prod.key} className="md:col-span-3 bg-[#1A1A1A] rounded-[2rem] border border-white/5 relative flex flex-col overflow-hidden min-h-[480px] md:min-h-[550px] group hover:border-white/10 transition-colors">
              <div className="absolute inset-0 w-full h-[250px] md:h-[300px] z-0 pointer-events-none">
                <Image src={(prod as { image: string }).image} alt={prod.title} fill className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10 mt-[220px] md:mt-[280px]">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">{prod.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base mb-8">{prod.desc}</p>
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => handleLearnMore(prod.key, prod.apiTitle)}
                    disabled={loadingKey === prod.key || errorKey === prod.key}
                    className="inline-flex items-center gap-2.5 text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors group disabled:opacity-60"
                  >
                    {loadingKey === prod.key
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("loading")}</>
                      : errorKey === prod.key
                      ? <><WifiOff className="w-4 h-4" /> {t("unavailable")}</>
                      : <>{t("learnMore")} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" /></>}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* TARJETA PEQUEÑA DISPONIBLE */}
          {smallProducts.map((prod) => (
            <div key={prod.key} className="md:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-white/5 p-8 pb-10 h-[300px] md:h-[320px] relative flex flex-col hover:border-white/10 transition-colors">
              <div className="flex-1 flex flex-col">
                <div className="h-16 md:h-20 mb-4 flex items-start">
                  <h3 className="text-xl font-bold text-white leading-snug">{prod.title}</h3>
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{prod.desc}</p>
              </div>
              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleLearnMore(prod.key, prod.apiTitle)}
                  disabled={loadingKey === prod.key || errorKey === prod.key}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-gray-300 transition-colors group pt-2 disabled:opacity-60"
                >
                  {loadingKey === prod.key
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {t("loading")}</>
                    : errorKey === prod.key
                    ? <><WifiOff className="w-3.5 h-3.5" /> {t("unavailable")}</>
                    : <>{t("learnMore")} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </div>
            </div>
          ))}

          {/* TARJETAS UPCOMING */}
          {upcoming.map((prod, i) => (
            <div key={i} className="md:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-white/5 p-8 pb-10 h-[300px] md:h-[320px] relative flex flex-col hover:border-white/10 transition-colors">
              <div className="flex-1 flex flex-col">
                <div className="h-16 md:h-20 mb-4 flex items-start">
                  <h3 className="text-xl font-bold text-white leading-snug">{prod.title}</h3>
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed overflow-hidden">{prod.desc}</p>
              </div>
              <div className="mt-auto pt-6">
                <span className="inline-block border border-white/20 bg-white/5 text-white/50 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-full">
                  {prod.launch}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
