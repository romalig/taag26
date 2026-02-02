"use client";

import Header from "../components/Header";
import IndustrialHero from "../components/industrial/IndustrialHero";
import FeaturedSolutions from "../components/industrial/FeaturedSolutions";
import Equipment from "../components/industrial/Equipment";
import SolutionsCatalog from "../components/industrial/SolutionsCatalog";
import HowItWorks from "../components/industrial/HowItWorks"; // <--- Importar
import FinalCTA from "../components/FinalCTA";
import Success from "../components/industrial/SuccessStories";

import EquipmentSection from "../components/industrial/Equipment";
// import Footer from "../../components/Footer"; // Si tienes footer global

export default function IndustrialPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header forceDark={true} />
      <IndustrialHero />
      <FeaturedSolutions />
      <Equipment />
      <HowItWorks />
      <SolutionsCatalog />
      <Success />
      <FinalCTA />
      
    </main>
  );
}