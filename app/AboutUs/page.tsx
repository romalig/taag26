"use client";

import Header from "../components/Header";
import AboutUs from "../components/AboutUs/AboutUs";
import InnovationsTimeline from "../components/AboutUs/InnovationsTimeline";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function IndustrialPage() {
  return (
    <ModalProvider>
      <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
        <Header/>
        <AboutUs/>
        <InnovationsTimeline/>
      </main>
      <SolutionModal /> {/* ← Este es el que faltaba: renderiza el modal en pantalla */}
    </ModalProvider>
  );
}
