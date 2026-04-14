// app/page.tsx
import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AigorSection from "./components/AigorSection";
import SystemModules from "./components/SystemModules";
import SolutionFinder from "./components/SolutionFinder";
import CaseStudies from "./components/CaseStudies";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export const metadata: Metadata = pageMetadata({
  title: "Detect biological risk before it spreads",
  description:
    "TAAG combines molecular diagnostics, lab services, and intelligent software so every biological risk can be found before it becomes a problem.",
  path: "/",
  keywords: [
    "TAAG",
    "microbiology",
    "food safety",
    "molecular testing",
    "risk detection",
  ],
});

export default function Home() {
  return (
    <main className="bg-white">
      <Header theme="hybrid" />
      {/* 1. Hero Section (Imagen científica + CTA) */}
      
      <Hero />

      {/* 4. Tarjetas de Productos (Estilo Hims/Lilly) */}
      <SystemModules />

      <AigorSection /> {/* <--- Colocar aquí, rompiendo el blanco con negro */}

      {/* 3. Buscador de Soluciones (Sección Oscura/Vibrante) */}
      <SolutionFinder />

      {/* 5. Carrusel de Casos de Éxito (Real Labs, Real Impact) */}
      <CaseStudies />

      {/* 6. Invitación Final (Tarjeta Gris Flotante) */}
      <FinalCTA />

    </main>
  );
}