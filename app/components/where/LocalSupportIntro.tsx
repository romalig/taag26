"use client";

import { Brain, Users, Dna } from "lucide-react";

export default function LocalSupportIntro() {
  return (
    // CAMBIO AQUÍ: pt-24 y pb-40 para dar mucho más espacio hacia abajo
    <section className="w-full pt-24 pb-40 px-6 bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FF270A] font-bold uppercase tracking-widest text-xs mb-4 block">
            LOCAL SUPPORT
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
            How we support your lab locally.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 w-full max-w-5xl mx-auto">
          {/* CAMBIO AQUÍ: Descripciones estrictamente traducidas al inglés */}
          <SupportIconCard 
            Icon={Brain} 
            title="TAAG Hubs" 
            desc="Expert scientific guidance for method selection, customized molecular developments, and technical troubleshooting."
          />
          <SupportIconCard 
            Icon={Users} 
            title="Local Partners" 
            desc="Day-to-day commercial assistance, seamless kit implementation, and fast logistics tailored to your plant's needs."
          />
          <SupportIconCard 
            Icon={Dna} 
            title="Service Lab partner" 
            desc="Accessible local laboratory services using advanced TAAG kits to deliver reliable results near you."
          />
        </div>
      </div>
    </section>
  );
}

function SupportIconCard({ Icon, title, desc }: { Icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
      <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}