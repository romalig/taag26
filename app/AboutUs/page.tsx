"use client";

import Header from "../components/Header";
import AboutHero from "../components/AboutUs/AboutHero";
import AboutUs from "../components/AboutUs/AboutUs2";
import InnovationsTimeline from "../components/AboutUs/InnovationsTimeline";
import OurValues from "../components/AboutUs/OurValues";
import FinalCTA from "../components/FinalCTA";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function IndustrialPage() {
  return (
    <ModalProvider>
      <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
        <Header/>
        <AboutHero/>
        <AboutUs/>
        <InnovationsTimeline/>
        <FinalCTA />
      </main>
      <SolutionModal /> {/* ← Este es el que faltaba: renderiza el modal en pantalla */}
    </ModalProvider>
  );
}
