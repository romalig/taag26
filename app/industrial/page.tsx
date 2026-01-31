"use client";

import Header from "../components/Header";
import IndustrialHero from "../components/industrial/IndustrialHero";
import FeaturedSolutions from "../components/industrial/FeaturedSolutions";
import Equipment from "../components/industrial/Equipment";
import SolutionsCatalog from "../components/industrial/SolutionsCatalog";
import HowItWorks from "../components/industrial/HowItWorks"; // <--- Importar
import FinalCTA from "../components/FinalCTA";
import EquipmentSection from "../components/industrial/Equipment";
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
      <Equipment />

      {/* 3. CATALOGO INTERACTIVO (Tabs Sticky) */}
      <SolutionsCatalog />

      {/* 3. NUEVA SECCIÓN: CÓMO FUNCIONA (Workflow) */}
      <HowItWorks />

      {/* 6. Invitación Final (Tarjeta Gris Flotante) */}
      <FinalCTA />
      
    </main>
  );
}