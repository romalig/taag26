"use client";

import { useCTA } from "./CTAProvider"; 
import { X, Check, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function BookMeetingModal() {
  const { isMeetingOpen, closeMeeting } = useCTA();
  const [step, setStep] = useState(1); // 1: Formulario, 2: Éxito
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMeeting();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeMeeting]);

  // Si no está abierto, no renderizamos nada
  if (!isMeetingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  return (
    // CAMBIO 1: 'overflow-y-auto' permite hacer scroll si el modal es muy alto
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      
      {/* CAMBIO 2: Wrapper flexible que asegura el centrado pero permite expansión */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">

          {/* FONDO OSCURO (Backdrop) - Fixed para que siempre cubra todo */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeMeeting}
          />

          {/* TARJETA DEL MODAL */}
          {/* CAMBIO 3: 'my-8' da aire arriba y abajo al hacer scroll */}
          <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 my-8 text-left">
            
            {/* BOTÓN CERRAR */}
            <button 
              onClick={closeMeeting}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5 text-black/60" />
            </button>

            {/* COLUMNA IZQUIERDA (Dark Side) */}
            {/* CAMBIO 4: Reduje p-10 a p-6 en móvil para ganar espacio */}
            <div className="md:w-2/5 bg-[#111111] text-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
              
              <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#FF270A] rounded-full blur-[80px] opacity-20 pointer-events-none" />

              <div className="relative z-10">

                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  Let's engineer your solution.
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Speak directly with our technical team. No sales scripts, just science and strategy.
                </p>

                <ul className="space-y-4 mb-8 md:mb-0">
                  <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                    <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                    <span>Expert technical support</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                    <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                    <span>NDA included if requested</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-white/80">
                    <Check className="w-5 h-5 text-[#FF270A] shrink-0" />
                    <span>Custom molecular solutions</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-10">
                <a 
                  href="mailto:roberto.t@taag-genetics.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
                >
                   <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden border-2 border-white/10 flex items-center justify-center group-hover:border-[#FF270A] transition-colors shrink-0">
                     <span className="text-xs font-bold text-white">DB</span>
                   </div>
                   <div className="min-w-0">
                     <div className="text-xs font-bold text-white group-hover:text-[#FF270A] transition-colors truncate">
                        Denis B.
                     </div>
                     <div className="text-[10px] text-white/50 uppercase tracking-wider truncate">
                        DB@taag.bio
                     </div>
                     <div className="text-[10px] text-white/50 uppercase tracking-wider truncate">
                        Head of Technical Sales
                     </div>
                   </div>
                </a>
              </div>
            </div>

            {/* COLUMNA DERECHA (Form) */}
            {/* CAMBIO 5: Reduje p-10 a p-6 en móvil */}
            <div className="md:w-3/5 p-6 md:p-12 bg-white flex flex-col justify-center">
              
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Name</label>
                      <input required type="text" placeholder="Jane Doe" className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Company</label>
                      <input required type="text" placeholder="Global Foods Inc." className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Work Email</label>
                    <input required type="email" placeholder="jane@company.com" className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Challenge</label>
                    <textarea required placeholder="Tell us about your detection targets..." className="w-full bg-[#F5F5F7] border-none rounded-xl px-4 py-3 text-sm font-medium text-[#111111] focus:ring-2 focus:ring-[#FF270A]/20 focus:bg-white transition-all outline-none min-h-[100px] resize-none" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-full hover:bg-[#FF270A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-4">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Processing</> : <>Send Request <ArrowRight className="w-4 h-4"/></>}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-black/30 font-medium pt-2">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Encrypted & Confidential.</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">Request Received</h3>
                  <p className="text-black/60 max-w-xs mx-auto mb-8 text-sm">We will contact you shortly.</p>
                  <button onClick={closeMeeting} className="inline-flex items-center justify-center px-8 py-3 bg-[#F5F5F7] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors">Close Window</button>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}