"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Globe, CheckCircle2 } from "lucide-react"; // Asegúrate de tener estos iconos o usa los que prefieras

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* SECCIÓN SUPERIOR: Logo + Enlaces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMNA 1: Marca & Misión (Logo Blanco Aquí) */}
          <div className="lg:col-span-4 space-y-8">
            {/* LOGO DE IMAGEN - Reemplaza al texto tipográfico */}
            <div className="relative w-40 h-12">
              <Image
                src="/logo-white.png" // Asegúrate que el archivo esté en /public
                alt="TAAG Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-medium leading-tight text-white">
                Reading nature.<br />
                <span className="text-white/50">Interpreting the future.</span>
              </h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                Advanced molecular intelligence and AI-driven diagnostics for the global manufacturing industry.
              </p>
            </div>
          </div>

          {/* COLUMNA 2: Platform */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">Industrial Micro</Link></li>
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">MILA™ Custom Design</Link></li>
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">TxA™ AI Software</Link></li>
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">Global Hubs</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">About Us</Link></li>
              <li>
                <Link href="#" className="hover:text-[#FF270A] transition-colors flex items-center gap-2">
                  Careers 
                  <span className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded text-white/60">Hiring</span>
                </Link>
              </li>
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-[#FF270A] transition-colors">News & Press</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: Connect */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Connect</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#FF270A] transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#FF270A] transition-colors">
                  <Twitter className="w-4 h-4" /> X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#FF270A] transition-colors">
                  <Globe className="w-4 h-4" /> Locations
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SECCIÓN MEDIA: Ubicaciones & Certificación */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
             <span>Chicago, US</span>
             <span>Brussels, Be</span>
             <span>Mexico City, MX</span>
             <span>Santiago, CL</span>
           </div>

           <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/5">
             <CheckCircle2 className="w-3 h-3 text-green-500" />
             <span className="text-[10px] font-medium text-white/70">ISO/IEC 17025 Accredited</span>
           </div>
        </div>

        {/* SECCIÓN INFERIOR: Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 TAAG Genetics. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}