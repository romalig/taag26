"use client";

import { Target, Lightbulb } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="w-full bg-white min-h-screen">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative w-full pt-40 pb-20 md:pb-32 flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-8 font-sora tracking-tight leading-[1.1]">
            Hi, we’re TAAG.
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
            We help organizations manage microbiological risk through advanced molecular solutions and intelligent systems.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR STORY (Opción 1: Premium & Corporate)                */}
      {/* ========================================================= */}
      <section className="w-full pb-24 md:pb-32">
        <div className="max-w-[1000px] mx-auto px-6">
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] font-sora tracking-tight mb-10 md:mb-12">
            Our story
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-[17px] md:text-lg text-gray-600 leading-relaxed font-medium">
            
            {/* Columna Izquierda */}
            <div className="space-y-6">
              <p>
                Founded in 2001, TAAG began as a highly specialized testing laboratory. Over the years, we steadily expanded our footprint, establishing operations across the United States, Belgium, Mexico, and Chile.
              </p>
              <p>
                As the global demand for faster, more precise, and scalable diagnostics grew, we recognized the need to push beyond the boundaries of traditional service models.
              </p>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-6">
              <p>
                This realization drove our transformation from a regional service provider into a technology-driven biotechnology organization—seamlessly integrating expert laboratory services, advanced kit manufacturing, and software development into our core operations.
              </p>
              <p>
                Today, our focus is firmly on advancing the standard of diagnostics. We design, manufacture, and distribute cutting-edge molecular solutions that empower our own hubs and a growing worldwide network of partner laboratories.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MISSION & VISION                                         */}
      {/* ========================================================= */}
      <section className="w-full bg-[#F4F7FB] py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">

            {/* --- Misión --- */}
            <div className="flex flex-col items-start">
              <Target className="w-12 h-12 text-[#FF270A] mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl md:text-[28px] font-bold text-[#111111] mb-4 font-sora tracking-tight">
                TAAG’s Mission
              </h3>
              <p className="text-[17px] md:text-lg text-[#111111] font-medium leading-relaxed">
                Make advanced biological testing accessible to every laboratory and organization, revolutionizing how biological entities are detected, identified, and managed.
              </p>
            </div>

            {/* --- Visión --- */}
            <div className="flex flex-col items-start">
              <Lightbulb className="w-12 h-12 text-[#FF270A] mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl md:text-[28px] font-bold text-[#111111] mb-4 font-sora tracking-tight">
                TAAG’s Vision
              </h3>
              <p className="text-[17px] md:text-lg text-[#111111] font-medium leading-relaxed">
                To build a future where biological testing is fast, automated, predictive, and universally accessible, enabling every organization to protect health, optimize production, and unlock the full potential of biotechnology.
              </p>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </main>
  );
}