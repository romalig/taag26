"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Linkedin, Twitter, Globe, CheckCircle2 } from "lucide-react"; 
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* SECCIÓN SUPERIOR: Logo + Enlaces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMNA 1: Marca */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative w-40 h-12">
              <Image
                src="/logo-white-1.png"
                alt="TAAG Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-medium leading-tight text-white">
                {t("taglineA")}<br />
                <span className="text-white/50">{t("taglineB")}</span>
              </h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                {t("description")}
              </p>
            </div>
          </div>

          {/* COLUMNA 2: Solutions */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">{t("solutions")}</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li>
                <Link href="/industrial" className="hover:text-[#FF270A] transition-colors">{t("links.industrial")}</Link></li>
              <li><Link href="/customized" className="hover:text-[#FF270A] transition-colors">{t("links.customized")}</Link></li>
              <li><Link href="/TxA" className="hover:text-[#FF270A] transition-colors">{t("links.txa")}</Link></li>
              <li><Link href="/LabNetwork" className="hover:text-[#FF270A] transition-colors">{t("links.labServices")}</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Technologies */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">{t("technologies")}</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li><Link href="/aigor" className="hover:text-[#FF270A] transition-colors">AIGOR</Link></li>
              <li><Link href="/customized" className="hover:text-[#FF270A] transition-colors">MILA</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">{t("company")}</h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li><Link href="/AboutUs" className="hover:text-[#FF270A] transition-colors">{t("links.about")}</Link></li>
              <li>
                <Link href="/where" className="flex items-center gap-2 hover:text-[#FF270A] transition-colors">
                  <Globe className="w-4 h-4" /> {t("links.locations")}
                </Link>
              </li>
              <li><a href="mailto:support@taag.bio" className="hover:text-[#FF270A] transition-colors">{t("links.contact")}</a></li>
            </ul>
          </div>
        </div>

        {/* SECCIÓN MEDIA: Ubicaciones & Certificación (CORREGIDA) */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           
           {/* IZQUIERDA: Ubicaciones */}
           <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
             <span>Chicago, US</span>
             <span>Brussels, Be</span>
             <span>Mexico City, MX</span>
             <span>Santiago, CL</span>
           </div>

           {/* DERECHA: Grupo de Certificaciones (Wrapper Nuevo) */}
           <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/5">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-medium text-white/70">{t("certifications.iso17025")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/5">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-medium text-white/70">{t("certifications.iso13485")}</span>
              </div>
           </div>
        </div>

        {/* SECCIÓN INFERIOR: Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 TAAG. {t("rights")}
          </p>
          <div className="flex gap-6 text-xs text-white/30 font-medium">
            <Link href="#" className="hover:text-white transition-colors">{t("links.privacy")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("links.terms")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
