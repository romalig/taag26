"use client";

import Header from "../components/Header";
import LabHero from "../components/labs/LabHero";
import PartnerEcosystem from "../components/labs/PartnerEcosystem";
import FinalCTA from "../components/FinalCTA";
import { ModalProvider } from "../components/labs/ModalProvider"; 
import SolutionModal from "../components/labs/SolutionModal";

// import Footer from "../../components/Footer"; // Si tienes footer global

export default function IndustrialPage() {
  return (
    <ModalProvider> {/* 1. Wrapper */}
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <LabHero />
      <PartnerEcosystem />
      <FinalCTA />
      <SolutionModal /> {/* 2. Renderizar Modal */}
    </main>
    </ModalProvider>
  );
}