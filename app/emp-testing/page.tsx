"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, Target, Lightbulb, 
  TrendingUp, Zap, Clock, ShieldCheck, Database, FlaskConical 
} from "lucide-react";
import { useCTA } from "@/app/components/CTAProvider";

export default function EMPTestingPremiumPage() {
  const { openMeeting } = useCTA();

  // Datos derivados del PDF para las visualizaciones (Genéricos)
  const financialMetrics = {
    externalLabSpend: 300000, // Estimado basado en el ahorro
    aigorInHouseCost: 71117, // Costo operativo estimado de TAAG
    annualSavings: 228883, // DATO EXACTO DEL PDF
    sampleVolume: 1300 // DATO EXACTO DEL PDF
  };

  return (
    <main className="w-full bg-[#111111] text-white min-h-screen font-sans">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-end pb-24 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/env.png" 
            alt="TAAG Environmental Testing Solutions" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
        </div>
        
        {/* Gradientes Premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-transparent to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="flex flex-col items-start gap-4 mb-8">
            <span className="px-5 py-2 rounded-full bg-[#FF270A]/10 border border-[#FF270A]/30 text-[#FF270A] text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,39,10,0.2)]">
              FEATURED BUSINESS CASE
            </span>
            <span className="text-white/60 font-bold uppercase tracking-widest text-sm drop-shadow-md">
              Target: Global Food Manufacturers
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[1.05] max-w-5xl mb-8 drop-shadow-2xl">
            Transforming EMP into a <span className="text-gray-400">Profit Center.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-12 drop-shadow-md font-medium">
             How moving environmental pathogen testing in-house generates six-figure annual savings while eliminating 72 hours of production bottlenecks.
          </p>

          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl hover:-translate-y-1"
          >
            Request custom ROI Analysis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* --- BUSINESS CASE SUMMARY --- */}
      <section className="py-24 md:py-32 bg-white text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-8 flex flex-col gap-16">
              
              {/* Contexto & Reto */}
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-10 border-l-4 border-[#FF270A] pl-8">
                  <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter leading-tight">
                    The Business Problem:<br /> Slow, Reactive, and Costly EMP.
                  </h2>
                </div>
                <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  <p>
                    A global leader in food production faced a significant operational hurdle: their Environmental Monitoring Program (EMP) was entirely outsourced. External laboratories demanded <strong className="text-[#111111]">turnaround times of 48 to 72 hours</strong>.
                  </p>
                  <p>
                    This meant that Zone 1 and Zone 2 surfaces—critical areas directly affecting product safety—were sampled, sanitized, and reused before results were known. This created a reactive environment where corrective actions were delayed by days, introducing significant risk and massive logistical costs.
                  </p>
                </div>
              </div>

              {/* La Solución */}
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-10 border-l-4 border-gray-100 pl-8">
                  <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter leading-tight">
                    The Transformation:<br /> Molecular Intelligence In-House.
                  </h2>
                </div>
                <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  <p>
                    The proposed solution shifted the paradigm. By implementing <strong className="text-[#111111]">AiGOR™ technology</strong> on-site, the manufacturer could perform highly sensitive screening for <strong className="text-[#111111]">Salmonella spp.</strong> and <strong className="text-[#111111]">Enterobacteriaceae</strong> without the need for biological enrichment.
                  </p>
                  <p>
                    This "Protocol ZERO" approach delivered actionable results in <strong className="text-[#FF270A]">just 3 hours</strong>, enabling same-day corrective actions for post-sanitation hotspots.
                  </p>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Resumen de KPIs */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-24">
              <div className="bg-[#111111] text-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF270A] mb-4 block">
                  Core Business Impact
                </span>
                <h3 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
                  €{financialMetrics.annualSavings.toLocaleString('de-DE')}
                </h3>
                <p className="text-lg font-bold text-gray-400 mb-10">
                  Documented Annual Savings (Per Facility)
                </p>
                
                <div className="w-full h-px bg-white/10 mb-10" />
                
                <ul className="flex flex-col gap-6">
                  {[
                    { icon: Clock, label: "Time to Result", value: "< 3 Hours", change: "was 72h" },
                    { icon: FlaskConical, label: "Enrichment Phase", value: "Zero", change: "was 16-24h" },
                    { icon: Zap, label: "Corrective Action", value: "Same-Day", change: "was Delayed" },
                    { icon: Database, label: "Sample Tracking", value: "100% Digital", change: "was Manual" },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF270A]">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">{item.label}</div>
                        <div className="text-lg font-extrabold text-white">{item.value}</div>
                      </div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{item.change}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINANCIAL DEEP DIVE (Chart Simulation) --- */}
      <section className="py-24 md:py-32 bg-[#F4F4F5] text-[#111111] border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 max-w-4xl">
             <div>
                <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
                  ROI ANALYSIS
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                  Economic Impact:<br /> Slashing operational costs by <span className="text-[#FF270A]">€228k.</span>
                </h2>
             </div>
             <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium md:text-right md:max-w-md pb-1 shrink-0">
                Detailed comparison based on the analysis of {financialMetrics.sampleVolume.toLocaleString('de-DE')} samples per year, per facility.
             </p>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
            
            {/* Fake Chart Visualization */}
            <div className="w-full md:w-3/5 flex flex-col gap-5 border border-gray-100 p-8 rounded-2xl bg-[#FBFBFC]">
               {/* Gráfico Barras */}
               <div className="flex justify-around items-end h-[300px] gap-8 pt-10 pb-4 px-6 border-b-2 border-gray-100 relative">
                  
                  {/* Etiqueta Ahorro */}
                  <div className="absolute top-10 left-[50%] -translate-x-1/2 flex items-center gap-3 bg-[#FF270A] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
                    <TrendingUp className="w-5 h-5" />
                    + €228,883 Annual Profit
                  </div>

                  {/* Barra Actual */}
                  <div className="w-2/5 flex flex-col items-center gap-3 group">
                     <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">CURRENT</div>
                     <div className="w-full bg-gray-200 rounded-lg relative overflow-hidden group-hover:bg-gray-300 transition-colors" style={{ height: '280px' }}>
                        <div className="absolute inset-0 bg-[#FF270A] rounded-lg transition-transform duration-1000 origin-bottom" style={{ transform: 'scaleY(1)' }}></div>
                        <div className="absolute top-2 left-0 right-0 text-center text-xs font-bold text-white uppercase tracking-widest drop-shadow-md">€{financialMetrics.externalLabSpend.toLocaleString('de-DE')}</div>
                     </div>
                     <div className="text-xs font-bold text-black/60 uppercase tracking-wider">Outsourced Lab</div>
                  </div>

                  {/* Barra AiGOR */}
                  <div className="w-2/5 flex flex-col items-center gap-3 group">
                     <div className="text-sm font-bold text-[#FF270A] uppercase tracking-widest">AiGOR</div>
                     <div className="w-full bg-gray-200 rounded-lg relative overflow-hidden group-hover:bg-gray-300 transition-colors" style={{ height: '280px' }}>
                        <div className="absolute inset-0 bg-[#111111] rounded-lg transition-transform duration-1000 origin-bottom" style={{ transform: `scaleY(${(financialMetrics.aigorInHouseCost / financialMetrics.externalLabSpend)})` }}></div>
                        <div className="absolute top-2 left-0 right-0 text-center text-xs font-bold text-white uppercase tracking-widest drop-shadow-md">€{financialMetrics.aigorInHouseCost.toLocaleString('de-DE')}</div>
                     </div>
                     <div className="text-xs font-bold text-black/60 uppercase tracking-wider">In-House Protocol</div>
                  </div>
               </div>
            </div>

            {/* Texto Descriptivo ROI */}
            <div className="w-full md:w-2/5 space-y-8">
               <h4 className="text-3xl font-bold leading-tight">Key Financial Findings</h4>
               <ul className="space-y-6">
                 <li className="flex gap-4 items-start">
                   <TrendingUp className="w-10 h-10 text-[#FF270A] shrink-0 mt-1" />
                   <div>
                     <strong className="block text-lg font-bold">€228,883 Net Savings</strong>
                     <span className="text-sm text-gray-600 font-medium">Derived from eliminating sample logistics and external labor overhead.</span>
                   </div>
                 </li>
                 <li className="flex gap-4 items-start">
                   <Zap className="w-10 h-10 text-[#FF270A] shrink-0 mt-1" />
                   <div>
                     <strong className="block text-lg font-bold">Operational Agility</strong>
                     <span className="text-sm text-gray-600 font-medium">Immediate post-sanitation feedback prevents line downtime and large product holds.</span>
                   </div>
                 </li>
                 <li className="flex gap-4 items-start">
                   <Database className="w-10 h-10 text-[#FF270A] shrink-0 mt-1" />
                   <div>
                     <strong className="block text-lg font-bold">Risk Capital Reduction</strong>
                     <span className="text-sm text-gray-600 font-medium">Predictive AI-driven software reduces the financial liability of unseen contamination.</span>
                   </div>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- WORKFLOW TRANSFORMATION (Timeline simulation) --- */}
      <section className="py-24 md:py-32 border-t border-white/5 bg-[#111111]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              OPERATIONAL TIMELINE
             </span>
             <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter mb-8">
              Bypassing biological limits: <span className="text-gray-400">was 72h, now &lt;3h.</span>
             </h2>
             <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">
                Visualizing the Protocol ZERO shift, targeting active RNA directly without waiting for pathogen growth.
             </p>
          </div>

          <div className="bg-[#1A1A1A] rounded-[3rem] p-12 border border-white/5 space-y-12">
              {/* Tradicional Timeline */}
              <div className="grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-3">
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">TRADITIONAL</div>
                      <div className="text-2xl font-black text-white tracking-tight">OUTSOURCED LAB</div>
                  </div>
                  <div className="col-span-8 flex items-center gap-1.5 h-10 relative">
                      <div className="h-full bg-gray-600 rounded-l-full" style={{ width: '5%' }} title="Sampling (0h)"></div>
                      <div className="h-full bg-gray-600" style={{ width: '45%' }} title="Logistics (TAT 4-24h)"></div>
                      <div className="h-full bg-red-600 animate-pulse relative" style={{ width: '45%' }} title="Enrichment (TAT 16-24h)">
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-center text-red-500 text-xs font-bold uppercase tracking-wider drop-shadow-lg">BOTTLENECK: ENRICHMENT (16-24h)</span>
                      </div>
                      <div className="h-full bg-gray-600 rounded-r-full" style={{ width: '5%' }} title="Test (3h)"></div>
                  </div>
                  <div className="col-span-1 text-right text-3xl font-extrabold text-gray-600">72h</div>
              </div>

              {/* Separador */}
              <div className="w-full h-px bg-white/10 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FF270A] shadow-2xl flex items-center justify-center text-white border-8 border-[#1A1A1A]">
                    <Zap className="w-7 h-7" />
                  </div>
              </div>

              {/* AiGOR Timeline */}
              <div className="grid grid-cols-12 gap-5 items-center pt-6">
                  <div className="col-span-3">
                      <div className="text-sm font-bold text-[#FF270A] uppercase tracking-widest mb-1">AiGOR ZERO</div>
                      <div className="text-2xl font-black text-white tracking-tight">IN-HOUSE EMP</div>
                  </div>
                  <div className="col-span-8 flex items-center gap-1.5 h-10 relative">
                      <div className="h-full bg-white rounded-l-full" style={{ width: '5%' }} title="Sampling (0h)"></div>
                      <div className="h-full bg-[#FF270A] flex items-center justify-center relative rounded-r-full group" style={{ width: '95%' }} title="Direct Extraction/AiGOR Test (<3h)">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-center text-white/90 text-xs font-bold uppercase tracking-wider drop-shadow-lg group-hover:text-white transition-colors">DIRECT MOLECULAR TESTING (less than 3h)</span>
                      </div>
                  </div>
                  <div className="col-span-1 text-right text-3xl font-extrabold text-white animate-pulse">&lt;3h</div>
              </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTION COMPONENTS --- */}
      <section className="py-24 md:py-32 bg-white text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.05]">
                  The Integrated<br /> <span className="text-gray-300">Molecular Ecosystem.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  We deploy a complete ecosystem designed for global food manufacturers, marrying extreme sensitivity chemistry with predictive AI intelligence.
                </p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { 
                icon: FlaskConical,
                title: "ELEVIA™ Kits",
                category: "Technical Chemistry",
                desc: "Powered by AiGOR technology, targeting highly specific and amplified RNA sequences rather than DNA. This allows Protocol ZERO (No Enrichment) detection down to < 10 CFU/sample in environmental complex matrices.",
                features: [
                  "Detect metabolically active pathogens only (Live-Cell differentiation)",
                  "Triplex multiplexed assay (*Salmonella* & Indicator in one tube)",
                  "Optimized RNA extraction for challenging food matrices",
                  "Validated workflow from sampling to result in under 3 hours."
                ]
              },
              { 
                icon: Database,
                title: "TxA™ Software",
                category: "AI Intelligence",
                desc: "An advanced middleware software that digitizes the microbiological ecosystem of the facility, providing managers and executives with real-time risk intelligence to preventcontamination dynamically.",
                features: [
                  "100% digital data capture & blockchain-level security",
                  "AI-driven predictive risk assessment and plant mapping",
                  "Automated compliance reporting (ISO 17025 ready)",
                  "Simultaneous control of multiple instruments and lab workflows."
                ]
              }
            ].map(comp => (
              <div key={comp.title} className="bg-[#FBFBFC] rounded-3xl p-10 md:p-12 border border-gray-100 flex flex-col items-start gap-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-[#FF270A]/5 flex items-center justify-center border border-[#FF270A]/10 text-[#FF270A]">
                       <comp.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{comp.category}</div>
                      <div className="text-3xl font-black text-[#111111] tracking-tight">{comp.title}</div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">{comp.desc}</p>
                  <ul className="space-y-4">
                    {comp.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#FF270A] shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-gray-800 leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARTNERSHIP TIMELINE (Next Steps from PDF) --- */}
      <section className="py-24 md:py-32 bg-[#F4F4F5] border-t border-gray-200 text-[#111111]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-24 max-w-2xl mx-auto">
             <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              NEXT STEPS
             </span>
             <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter mb-8">
              Proposed Timeline:<br /> From validation to <span className="text-[#FF270A]">Value.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { step: "1", title: "Project Approval", desc: "Define facility constraints, purchase order issuance, and secure data access.", icon: CheckCircle2 },
                { step: "2", title: "Validation Protocol", desc: "Comparative validation between current lab method vs. AiGORZERO (ISO 16140).", icon: FlaskConical },
                { step: "3", title: "Site Implementation", desc: "Equipment installation, TxA integration, and personnel technical training.", icon: Zap },
                { step: "4", title: "Routine Testing", desc: "Official launch of internal Protocol ZERO EMP monitoring and AI predictive analytics.", icon: ShieldCheck },
              ].map((item, index) => (
                <div key={item.step} className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col items-start gap-6 relative group transition-all duration-300 hover:border-[#FF270A]/20 hover:shadow-xl hover:-translate-y-1">
                  
                  {/* Etiqueta Paso y Flecha */}
                  <div className="absolute top-8 right-8 text-6xl font-black text-gray-100 group-hover:text-[#FF270A]/10 transition-colors">{item.step}</div>
                  {index < 3 && (
                     <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 text-[#FF270A] group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-6 h-6" />
                     </div>
                  )}

                  <div className="w-16 h-16 rounded-full bg-[#111111]/5 flex items-center justify-center text-[#FF270A]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-[#111111] tracking-tight relative z-10">{item.title}</h4>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION (ROI focus) --- */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <span className="text-[#FF270A] font-bold tracking-widest uppercase text-xs mb-3 block">
              CALCULATE YOUR ROI
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold text-[#111111] mb-10 tracking-tight leading-[1.05]">
            Secure your product holds & your budget.<br /> Speak to a Biorisk Expert.
          </h2>
          <button 
            onClick={openMeeting}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#111111] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#FF270A] transition-all shadow-xl hover:-translate-y-1"
          >
            Request personalized economic proposal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </main>
  );
}