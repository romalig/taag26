"use client";

import Header from "../components/Header";
import IndustrialHero from "../components/industrial/IndustrialHero";
import FeaturedSolutions from "../components/industrial/FeaturedSolutions";
import SolutionsCatalog from "../components/industrial/SolutionsCatalog";
// import Footer from "../../components/Footer"; // Si tienes footer global

export default function IndustrialPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      {/* HEADER GLOBAL */}
      <Header forceDark={true} />

      {/* 1. SECCIÓN HERO (Título y Fondo Blur) */}
      <IndustrialHero />

      {/* 2. GRID PRINCIPAL (Tarjetas animadas) */}
      <FeaturedSolutions />

      {/* 3. CATALOGO INTERACTIVO (Tabs Sticky) */}
      <SolutionsCatalog />
      
    </main>
  );
}