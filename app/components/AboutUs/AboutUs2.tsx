"use client";

import { Target, Lightbulb } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="w-full bg-white">
      {/* ========================================================= */}
      {/* 1. OUR STORY                                                 */}
      {/* ========================================================= */}
      <section className="w-full pt-24 md:pt-32 pb-24 md:pb-32">
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
                Today, our global headquarters is in Zug, Switzerland, where we design the solutions that power our own laboratory hubs and our customers' laboratories around the world.
              </p>
            </div>

          </div>

          <dl className="mt-14 md:mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15px] md:text-base">
            <div className="border-l-2 border-[#FF270A] pl-4">
              <dt className="text-gray-500 font-medium">Global headquarters</dt>
              <dd className="text-[#111111] font-semibold mt-1">Zug, Switzerland</dd>
            </div>
            <div className="border-l-2 border-[#111111] pl-4">
              <dt className="text-gray-500 font-medium">Laboratory hubs</dt>
              <dd className="text-[#111111] font-semibold mt-1">United States, Belgium, Mexico, Chile</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MISSION & VISION                                         */}
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
