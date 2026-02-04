"use client";

import { CheckCircle2, FlaskConical, Timer, Microscope, FileText } from "lucide-react";

export default function Modal1() {
  return (
    <div className="w-full h-full bg-white p-6 md:p-12 overflow-y-auto scroll-smooth">
      
      {/* --- SECCIÓN 1: HEADER (Título y Chips de Tecnología) --- */}
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
          Zero-Risk Internal EMP
        </h2>
        
        {/* Chips de Tecnologías (Estilo Botones Apple) */}
        <div className="flex flex-wrap gap-3 mb-10">
           {["Real-Time PCR", "AiGOR Technology", "Lysis Inactivation", "Multiplex Ready"].map((tech) => (
             <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
               {tech}
             </span>
           ))}
        </div>
      </div>

      {/* --- SECCIÓN 2: METRICS GRID (Targets, LoD, etc) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-b border-gray-100 pb-12">
         <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Targets</span>
            <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">Listeria spp. & Salmonella spp.</span>
         </div>
         <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Limit of Detection</span>
            <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">1 CFU / Sample</span>
         </div>
         <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Validated Matrices</span>
            <span className="block text-lg md:text-xl font-bold text-[#111111] leading-tight">Sponges, Swabs, Liquids</span>
         </div>
         <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Time to Results</span>
            <span className="block text-lg md:text-xl font-bold text-[#FF270A] leading-tight">&lt; 3 Hours</span>
         </div>
      </div>

      {/* --- SECCIÓN 3: DESCRIPTION & ADVANTAGES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
         <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#111111] mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
               The Zero-Risk Internal EMP kit is designed to allow food production facilities to bring pathogen testing in-house without the need for a BSL-2 laboratory. By utilizing our proprietary lysis buffer, pathogens are inactivated immediately upon sampling, eliminating biohazard risks during transport and processing.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
               Combined with the TxA platform and AiGOR analysis, this solution provides qualitative results in record time, enabling faster corrective actions and preventing product release delays.
            </p>
         </div>
         <div className="md:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-4">Key Advantages</h3>
            <ul className="space-y-3">
               {[
                 "No enrichment required",
                 "Total pathogen inactivation",
                 "No microbiologist needed",
                 "High-throughput compatible"
               ].map((adv, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#FF270A] mt-0.5 shrink-0" />
                    <span>{adv}</span>
                 </li>
               ))}
            </ul>
         </div>
      </div>

      {/* --- SECCIÓN 4: TECHNICAL SPECIFICATIONS --- */}
      <div className="mb-16">
         <h3 className="text-2xl font-bold text-[#111111] mb-6">Technical Specifications</h3>
         <div className="border-t border-gray-200">
            {[
              { label: "Methodology", value: "Real-Time PCR (TaqMan Probes)" },
              { label: "Fluorophores", value: "FAM (Listeria), HEX (Salmonella), ROX (Internal Control)" },
              { label: "Sample Volume", value: "Up to 10ml liquid / 1 Sponge" },
              { label: "Storage Conditions", value: "-20°C for Reagents, Room Temp for Buffer" },
              { label: "Shelf Life", value: "12 Months from manufacturing date" }
            ].map((row, i) => (
               <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-4 border-b border-gray-100">
                  <div className="text-sm font-semibold text-gray-500">{row.label}</div>
                  <div className="md:col-span-2 text-sm font-medium text-[#111111]">{row.value}</div>
               </div>
            ))}
         </div>
      </div>

      {/* --- SECCIÓN 5: ORDER INFORMATION (PCR KITS) --- */}
      <div className="mb-12">
         <h3 className="text-2xl font-bold text-[#111111] mb-2">Order Information</h3>
         <p className="text-sm text-gray-500 mb-6">Select the appropriate kit size for your throughput needs.</p>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 pr-4">Cat. Number</th>
                    <th className="py-4 px-4">Size</th>
                    <th className="py-4 px-4">Format</th>
                    <th className="py-4 pl-4">Description</th>
                 </tr>
              </thead>
              <tbody className="text-sm">
                 {[
                   { cat: "TAAG-S11-100", size: "100 Rxns", format: "Liquid", desc: "Complete PCR mix for Listeria spp." },
                   { cat: "TAAG-S11-500", size: "500 Rxns", format: "Liquid", desc: "High-volume PCR mix for Listeria spp." },
                   { cat: "TAAG-S12-100", size: "100 Rxns", format: "Lyophilized", desc: "Ambient storage ready PCR beads." },
                   { cat: "TAAG-S13-MPT", size: "96 Rxns", format: "Plate", desc: "Pre-plated 96-well breakdown." },
                 ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                       <td className="py-4 pr-4 font-mono text-[#FF270A] font-medium">{row.cat}</td>
                       <td className="py-4 px-4 font-medium text-[#111111]">{row.size}</td>
                       <td className="py-4 px-4 text-gray-600">{row.format}</td>
                       <td className="py-4 pl-4 text-gray-600">{row.desc}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
         </div>
      </div>

      {/* --- SECCIÓN 6: ORDER INFORMATION (ADDITIONAL SUPPLIES) --- */}
      <div className="mb-8">
         <h4 className="text-lg font-bold text-[#111111] mb-6 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-gray-400" />
            Additional Supplies
         </h4>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b-2 border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 pr-4">Cat. Number</th>
                    <th className="py-4 px-4">Size</th>
                    <th className="py-4 px-4">Format</th>
                    <th className="py-4 pl-4">Description</th>
                 </tr>
              </thead>
              <tbody className="text-sm">
                 {[
                   { cat: "TAAG-X20-BUF", size: "1 Liter", format: "Bottle", desc: "Lysis Inactivation Buffer (Bulk)" },
                   { cat: "TAAG-E10-KIT", size: "96 Preps", format: "Kit", desc: "Magnetic Beads DNA Extraction Kit" },
                   { cat: "TAAG-C50-CTRL", size: "10 Vials", format: "Pellet", desc: "Positive Control (Inactivated)" },
                 ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                       <td className="py-4 pr-4 font-mono text-[#FF270A] font-medium">{row.cat}</td>
                       <td className="py-4 px-4 font-medium text-[#111111]">{row.size}</td>
                       <td className="py-4 px-4 text-gray-600">{row.format}</td>
                       <td className="py-4 pl-4 text-gray-600">{row.desc}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
         </div>
      </div>
      
      {/* Footer Espaciador */}
      <div className="h-12"></div>
      
    </div>
  );
}