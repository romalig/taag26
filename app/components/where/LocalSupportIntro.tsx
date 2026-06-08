"use client";

import { Brain, Users, Dna, MapPin, Phone, Mail, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// --- COMPONENTE DEL FORMULARIO DE COTIZACIÓN (MODAL) ---
function QuoteModal({ isOpen, onClose, city }: { isOpen: boolean; onClose: () => void; city: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in-up">
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="p-10 md:p-14">
          <h3 className="text-3xl font-bold text-[#111111] mb-2 tracking-tight">Request a Quote</h3>
          <p className="text-gray-500 font-medium mb-10">Requesting services for our <span className="text-[#FF270A] font-bold">{city} Hub</span>.</p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Microbiological Program / Testing Needs
              </label>
              <textarea 
                rows={4}
                placeholder="Please describe your current environmental monitoring program, specific assays of interest, or volume requirements..." 
                className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A] resize-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Corporate Email</label>
                <input type="email" placeholder="name@company.com" className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Name</label>
              <input type="text" placeholder="Your Biotech Co." className="w-full bg-[#F4F4F5] border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF270A]" />
            </div>

            <button className="w-full py-5 bg-[#111111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-all duration-300 shadow-lg mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL COMBINADO ---
export default function LocalSupportIntro() {
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const locations = [
    {
      city: "Chicago",
      country: "United States",
      image: "/hub_USA.png",
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
    <main className="w-full bg-white">
      {/* SECCIÓN 1: Local Support */}
      <section className="w-full pt-24 pb-20 px-6 relative z-20">
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

      {/* SECCIÓN 2: Global Hubs (Sin borde y con menos padding inferior) */}
      <section className="w-full pb-28 px-6 relative z-20 pt-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6">
              Strategic hubs to accelerate your results.
            </h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Our state-of-the-art laboratories are strategically located to provide rapid, high-quality microbiological testing services wherever you operate.
            </p>
          </div>

          {/* Cuadrícula 2x2 para las tarjetas de los Hubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-5xl mx-auto">
            {locations.map((loc, i) => (
              <div key={i} className="flex flex-col group cursor-pointer" onClick={() => setActiveHub(loc.city)}>
                
                {/* Imagen del Hub */}
                <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden mb-8 bg-gray-100">
                  <div className="absolute inset-0 bg-[#111111]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image 
                    src={loc.image} 
                    alt={loc.city} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                {/* Información del Hub */}
                <div className="px-2">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#111111] tracking-tight">{loc.city}</h3>
                    <span className="text-xs font-bold text-[#FF270A] uppercase tracking-widest">{loc.country}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500 font-medium">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{loc.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <p>{loc.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <p>{loc.email}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE COTIZACIÓN */}
      <QuoteModal 
        isOpen={!!activeHub} 
        onClose={() => setActiveHub(null)} 
        city={activeHub || ""} 
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
}

// Componente auxiliar para la primera sección
function SupportIconCard({ Icon, title, desc }: { Icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="w-8 h-8 text-[#FF270A] mb-4" strokeWidth={1.5} />
      <h4 className="font-bold text-[#111111] mb-3 text-sm uppercase tracking-wide">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}