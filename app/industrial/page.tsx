"use client";

import Header from "../components/Header";
import IndustrialHero from "../components/industrial/IndustrialHero";
import FeaturedSolutions from "../components/industrial/FeaturedSolutions";
import Equipment from "../components/industrial/Equipment";
import SolutionsCatalog from "../components/industrial/SolutionsCatalog";
import HowItWorks from "../components/industrial/HowItWorks"; 
import FinalCTA from "../components/FinalCTA";
import Success from "../components/industrial/SuccessStories";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";
import AigorImpactSection from '../components/industrial/AigorImpactSection'

// import Footer from "../../components/Footer"; // Si tienes footer global

export default function IndustrialPage() {
  return (
    <ModalProvider> {/* 1. Wrapper */}
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header forceDark={true} />
      <IndustrialHero />
      <FeaturedSolutions />
      <Equipment />
      <AigorImpactSection />
      <HowItWorks />
      <SolutionsCatalog />
      <Success />
      <FinalCTA />
      <SolutionModal /> {/* 2. Renderizar Modal */}
    </main>
    </ModalProvider>
  );
}