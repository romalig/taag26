"use client";

import { useCTA } from "./CTAProvider";
import { Calendar, ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTA() {
  const { openMeeting } = useCTA();

  return (
    // CAMBIO ESPACIADO: py-16 md:py-24
    <section className="bg-white py-16 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* TARJETA FLOTANTE */}
        <div className="relative overflow-hidden rounded-[3rem] bg-[#F5F5F7] px-6 py-16 md:px-16 md:py-20 text-center lg:text-left shadow-sm">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* 1. TEXT CONTENT */}
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6 leading-tight">
                Learn more about how you can take your microbiology to the next level<br className="hidden md:block"/>
              </h2>
              
              <p className="text-lg text-black/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Let's coordinate a meeting to learn more about our products, technologies and laboratory services.
              </p>

              {/* Badges de Confianza */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-black/70 shadow-sm border border-black/5">
                    <Calendar className="w-4 h-4 text-[#FF270A]" />
                    <span>Next day availability</span>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-black/70 shadow-sm border border-black/5">
                    <MessageSquare className="w-4 h-4 text-[#FF270A]" />
                    <span>Expert consultation</span>
                 </div>
              </div>
            </div>

            {/* 2. ACTION BUTTON */}
            <div className="shrink-0">
               <button
                onClick={openMeeting}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-extrabold tracking-widest uppercase bg-[#111111] text-white rounded-full overflow-hidden hover:bg-[#FF270A] transition-all duration-300 shadow-xl shadow-black/5 hover:shadow-red-500/30 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Book a Meeting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </span>
              </button>
            </div>

          </div>

          {/* Decoración de Fondo (Sutil) */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-60 pointer-events-none mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-white rounded-full blur-2xl opacity-40 pointer-events-none mix-blend-overlay" />
        </div>

      </div>
    </section>
  );
}