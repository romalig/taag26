"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function LabLocations() {
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
      image: "/hub_USA.png",
      address: "Av. Coyoacán 1622. Colonia del Valle Sur. CDMX, Mexico.",
      phone: "+52 55 52.003.250",
      email: "contacto_MX@taag-genetics.com"
    },
    {
      city: "Santiago",
      country: "Chile",
      image: "/hub_USA.png",
      address: "Laboratory: Río Refugio 9641, Pudahuel. Santiago, Chile.",
      phone: "+56 229.353.216.",
      email: "contacto_CL@taag-genetics.com"
    },
    {
      city: "Brussels",
      country: "Belgium",
      image: "/hub_USA.png",
      address: "Main office: Grote Markt 7, 2000 Antwerp, Belgium\nLab headquarters: Excelsiorlaan 33, 1930 Zaventem, Belgium.",
      phone: "+32 3 222 20 87.",
      email: "info@taageurope.com"
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight leading-tight">
            Strategic hubs to accelerate your results.
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            Our state-of-the-art laboratories are strategically located to provide rapid, high-quality microbiological testing services wherever you operate.
          </p>
        </div>

        {/* Grilla de Ubicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {locations.map((loc, i) => (
            <div 
              key={i} 
              // Tarjetas grises planas y 100% estáticas (Sin hovers)
              className="bg-[#F4F4F5] rounded-[2rem] flex flex-col overflow-hidden"
            >
              {/* Mitad Superior: Imagen */}
              <div className="relative w-full h-48 sm:h-52 bg-gray-200 shrink-0 border-b border-gray-200/50">
                <Image 
                  src={loc.image} 
                  alt={`TAAG Genetics Hub in ${loc.city}`} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Mitad Inferior: Información */}
              <div className="p-8 flex flex-col flex-1">
                
                {/* Título: País y Ciudad */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#FF270A] uppercase tracking-widest mb-1">
                    {loc.country}
                  </p>
                  <h3 className="text-2xl font-bold text-[#111111] font-sora tracking-tight">
                    {loc.city}
                  </h3>
                </div>
                
                {/* Información de Contacto con Iconos */}
                {/* Eliminado el mt-auto: Ahora todos los textos inician anclados a la misma altura */}
                <div className="space-y-4 text-sm text-gray-600 font-medium">
                  
                  {/* Dirección */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="whitespace-pre-line leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                  
                  {/* Teléfono */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p>{loc.phone}</p>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <a href={`mailto:${loc.email}`} className="hover:text-[#FF270A] transition-colors">
                      {loc.email}
                    </a>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </section>
  );
}