"use client";

import { ArrowRight } from "lucide-react";
import { useCTA } from "@/app/components/CTAProvider";

export default function CTASection() {
  const { openMeeting } = useCTA();

  return (
    <section className="relative w-full bg-[#111111] py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Elementos decorativos de fondo para darle un "look" tecnológico */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF270A]/5 blur-[100px] rounded-full"></div>
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        <span className="px-5 py-2 rounded-full bg-[#FF270A]/10 border border-[#FF270A]/20 text-[#FF270A] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,39,10,0.1)] mb-8">
          Calculate Your Own ROI
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05] max-w-4xl mx-auto drop-shadow-lg">
          Ready to eliminate 72 hours of waiting and secure your budget?
        </h2>
        
        <p className="text-gray-400 text-base md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Speak directly with one of our Experts to get a personalized economic proposal tailored to your facility's volume and current testing methods.
        </p>
        
        <button 
          onClick={openMeeting}
          className="group inline-flex items-center justify-center gap-4 px-10 py-5 md:px-12 md:py-6 rounded-full bg-[#FF270A] text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all duration-300 shadow-[0_0_30px_rgba(255,39,10,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
        >
          <span>Request custom ROI Analysis</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </section>
  );
}