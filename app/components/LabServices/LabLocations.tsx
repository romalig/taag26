"use client";

import { MapPin, Phone, Mail, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

// --- COMPONENTE DEL FORMULARIO DE COTIZACIÓN (MODAL) ---
function QuoteModal({ isOpen, onClose, city }: { isOpen: boolean; onClose: () => void; city: string }) {
  const t = useTranslations("LabNetwork.Locations");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in-up">
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="p-10 md:p-14">
          <h3 className="text-3xl font-bold text-[#111111] mb-2 font-sora tracking-tight">{t("modalTitle")}</h3>
          <p className="text-gray-500 font-medium mb-10">{t("modalBodyA")} <span className="text-[#FF270A] font-bold">{city} {t("modalBodyB")}</span></p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Área de texto para Programa / Necesidades (Reemplaza al selector) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {t("program")}
              </label>
              <textarea 
                rows={4}
                placeholder={t("programPlaceholder")}
                className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A] resize-none" 
              />
            </div>

            {/* Datos de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("fullName")}</label>
                <input type="text" placeholder={t("namePlaceholder")} className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("email")}</label>
                <input type="email" placeholder="name@company.com" className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("company")}</label>
              <input type="text" placeholder={t("companyPlaceholder")} className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
            </div>

            <button className="w-full py-5 bg-[#111111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-all duration-300 shadow-lg mt-4">
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function LabLocations() {
  const t = useTranslations("LabNetwork.Locations");
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const locations = [
    {
      city: "Chicago",
      country: "United States",
      image: "/Lab_US.png",
      address: "3710 Illinois Avenue, Unit A, St. Charles, IL.60174 United States",
      phone: "(630) 246-7777",
      email: "contact_US@taag-genetics.com"
    },
    {
      city: "Mexico City",
      country: "Mexico",
      image: "/Lab_MX.png",
      address: "Av. Coyoacán 1622. Colonia del Valle Sur. CDMX, Mexico.",
      phone: "+52 55 52 003 250",
      email: "contacto_MX@taag-genetics.com"
    },
    {
      city: "Santiago",
      country: "Chile",
      image: "/Lab_CL.png",
      address: "Río Refugio 9663, Pudahuel. Santiago, Chile.",
      phone: "+56 229 353 216",
      email: "contacto_CL@taag-genetics.com"
    },
    {
      city: "Brussels",
      country: "Belgium",
      image: "/Lab_EU.png",
      address: "Excelsiorlaan 33, 1930 Zaventem, Brussels, Belgium.",
      phone: "+32 3 222 20 87",
      email: "info@taageurope.com"
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            {t("body")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {locations.map((loc, i) => (
            <div key={i} className="bg-[#F4F4F5] rounded-[2rem] flex flex-col overflow-hidden">
              <div className="relative w-full h-48 sm:h-52 bg-gray-200 shrink-0">
                <Image src={loc.image} alt={loc.city} fill className="object-cover" />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#FF270A] uppercase tracking-widest mb-1">{loc.country}</p>
                  <h3 className="text-2xl font-bold text-[#111111] font-sora tracking-tight">{loc.city}</h3>
                </div>
                
                <div className="space-y-4 text-sm text-gray-600 font-medium mb-10">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="whitespace-pre-line leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p>{loc.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <a href={`mailto:${loc.email}`} className="hover:text-[#FF270A] transition-colors">{loc.email}</a>
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN POR HUB */}
                <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => setActiveHub(loc.city)}
                    className="w-full py-3 bg-[#111111] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-colors flex items-center justify-center gap-2"
                  >
                    {t("requestQuote")} <ArrowRight className="w-3 h-3" />
                  </button>
                  <a 
                    href={`mailto:${loc.email}`}
                    className="w-full py-3 bg-white border border-gray-200 text-[#111111] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    {t("contactHub")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE COTIZACIÓN */}
      <QuoteModal 
        isOpen={!!activeHub} 
        onClose={() => setActiveHub(null)} 
        city={activeHub || ""} 
      />

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </section>
  );
}
