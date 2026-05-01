"use client";

import { useTranslations } from "next-intl";

const COKE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg";

const CLIENTS = Array(6).fill({
  name: "Coca-Cola",
  logo: COKE_LOGO,
});

export default function ProofStrip() {
  const t = useTranslations("Home.ProofStrip");

  return (
    <section className="bg-white border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-10">
          {t("tagline")}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-20">
          {CLIENTS.map((client, i) => (
            <div
              key={i}
              className="group relative h-8 w-28 md:h-10 md:w-32 flex items-center justify-center transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-full w-full object-contain 
                           filter grayscale opacity-30 
                           transition-all duration-500 
                           group-hover:grayscale-0 group-hover:opacity-100 
                           group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
