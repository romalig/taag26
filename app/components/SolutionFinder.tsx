"use client";

import { useState } from "react";
import { recommendSolution } from "../lib/recommendSolution";
import { Solution } from "../lib/solutionFinderCatalog";
import { Loader2, ArrowRight, Check, Sparkles, Terminal } from "lucide-react"; 

interface UISolution extends Solution {
  description?: string;
  href?: string;
}

export default function SolutionFinder() {
  const [challenge, setChallenge] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<UISolution | null>(null);

  function handleGenerate() {
    if (!challenge.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const rec = recommendSolution(challenge);
      
      const enhancedResult: UISolution = {
        ...rec,
        description: `Our ${rec.name} platform is designed specifically for this challenge. It utilizes ${rec.technology} to isolate target organisms without interference, ensuring compliance and preventing costly holds.`,
        href: "/solutions/industrial" 
      };

      setResult(enhancedResult);
      setIsAnalyzing(false);
    }, 1200); 
  }

  return (
    <section className="bg-[#F5F5F7] py-24 lg:py-32 relative overflow-hidden" id="solution-finder">
      
      {/* Patrón de Malla de Puntos (Tech Texture) */}
      <div className="absolute inset-0 opacity-[0.4]" 
           style={{ 
             backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }} 
      />

      {/* Orbes de luz ambientales */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white opacity-80 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50 opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 border border-black/5 rounded-full backdrop-blur-md mb-6 shadow-sm">
             <Terminal className="w-3 h-3 text-[#FF270A]" />
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111111]">
               AI Diagnostic Tool
             </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            Share your challenge.<br />
            <span className="text-gray-400">Discover your solution.</span>
          </h2>
        </div>

        {/* MAIN INTERFACE */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT: INPUT AREA (Always Active Tech Card) */}
            <div className={`lg:col-span-5 flex flex-col transition-all duration-500 ${result ? 'lg:opacity-100' : 'lg:col-span-8 lg:col-start-3'}`}>
                
                {/* CAMBIOS APLICADOS:
                   1. Shadow permanente roja suave: shadow-[0_20px_40px_-15px_rgba(255,39,10,0.15)]
                   2. Hover intensificado
                */}
                <div className="group bg-white/80 backdrop-blur-xl border border-white/40 ring-1 ring-black/5 rounded-[2.5rem] p-8 md:p-10 h-full flex flex-col shadow-[0_20px_40px_-15px_rgba(255,39,10,0.12)] hover:shadow-[0_30px_60px_-15px_rgba(255,39,10,0.2)] transition-all duration-500 relative overflow-hidden">
                    
                    {/* BARRA LATERAL ROJA (SIEMPRE ACTIVA) */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF270A]" />

                    <label className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-widest mb-6 font-mono">
                        <Sparkles className="w-3 h-3 text-[#FF270A]" />
                        Input Parameters
                    </label>
                    
                    <textarea
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="e.g. I need to detect Salmonella in cocoa powder in less than 24 hours to avoid shipment delays..."
                        className="w-full bg-transparent border-none text-xl md:text-2xl text-[#111111] placeholder:text-gray-300 focus:ring-0 p-0 resize-none flex-grow min-h-[160px] leading-relaxed font-medium"
                    />

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
                        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF270A] animate-pulse" />
                            System Active
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isAnalyzing || !challenge}
                            className="group/btn relative overflow-hidden flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-white rounded-full font-bold hover:bg-[#FF270A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isAnalyzing ? (
                                    <>Processing <Loader2 className="w-4 h-4 animate-spin"/></>
                                ) : (
                                    <>Analyze Request <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"/></>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: RESULT AREA (Tech Reveal) */}
            {result && (
                <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="h-full">
                        
                        <div className="bg-gradient-to-br from-white to-[#F0F0F2] rounded-[2.5rem] h-full p-8 md:p-12 flex flex-col relative overflow-hidden border border-white ring-1 ring-black/5 shadow-2xl shadow-[#FF270A]/10">
                            
                            {/* Decoración de fondo */}
                            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] border-[40px] border-white rounded-full opacity-50 blur-xl pointer-events-none" />
                            <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] bg-gray-100 rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                
                                {/* Header Tech */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm">
                                        <div className="w-4 h-4 rounded-full bg-[#FF270A] flex items-center justify-center text-white shadow-[0_0_10px_#FF270A]">
                                            <Check className="w-2.5 h-2.5" />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111]">
                                            Match Found
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono font-bold text-gray-400">
                                        ID: {result.id.toUpperCase()}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-3xl md:text-5xl font-extrabold text-[#111111] mb-6 leading-tight tracking-tight">
                                    {result.name}
                                </h3>
                                
                                <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl border-l-2 border-[#FF270A]/20 pl-6">
                                    {result.description}
                                </p>

                                {/* Footer Action */}
                                <div className="mt-auto pt-8 border-t border-gray-200/60">
                                     <a 
                                        href={result.href || "#"} 
                                        className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 rounded-full bg-[#FF270A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#d92008] transition-all shadow-[0_10px_30px_-10px_rgba(255,39,10,0.4)] hover:shadow-[0_15px_35px_-10px_rgba(255,39,10,0.5)] hover:-translate-y-1"
                                     >
                                         View Solution 
                                         <ArrowRight className="w-4 h-4" />
                                     </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </section>
  );
}