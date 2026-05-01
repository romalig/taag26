"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const TXA_MODAL_IMAGES = {
  app: {
    images: ["/TxA_app_1.png", "/TxA_app_5.png", "/TxA_app_4.png"],
  },
  lab: {
    images: ["/your-laboratory-assay.svg", "/create-products.svg", "/laboratory-report.svg"],
  },
  qa: {
    images: ["/TxA_QA1.svg", "/TxA_QA2.svg", "/TxA_QA3.svg"],
  },
} as const;

export type TxaModalKey = keyof typeof TXA_MODAL_IMAGES;

export function TxAModalContent({
  moduleKey,
}: {
  moduleKey: TxaModalKey;
}) {
  const t = useTranslations(`TxA.Modal.${moduleKey}`);
  const features = t.raw("features") as Array<{title: string; text: string}>;
  const images = TXA_MODAL_IMAGES[moduleKey].images;

  return (
    <div className="w-full p-8 md:p-14 pb-12">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {t("intro")}
        </p>
      </div>

      <div className="space-y-16">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-8 items-start w-full border-b border-gray-100 pb-16 last:border-0 last:pb-0"
          >
            <div className="w-full max-w-4xl">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] text-white font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-[#111111] mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.text}</p>
            </div>

            <div className="w-full bg-[#F5F5F7] rounded-[2.5rem] h-[350px] md:h-[550px] relative flex items-center justify-center overflow-hidden border border-gray-100 mt-2">
              <Image
                src={images[idx]}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
