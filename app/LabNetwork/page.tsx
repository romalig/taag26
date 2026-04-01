"use client";

import Header from "../components/Header";
import LabNetwork from "../components/LabServices/LabNetwork";
import LabCapabilities from "../components/LabServices/LabCapabilities";
import LabTxA from "../components/LabServices/LabTxA";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function IndustrialPage() {
  return (
    <ModalProvider>
      <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
        <Header/>
        <LabNetwork/>
        <LabCapabilities/>
        <LabTxA/>
      </main>
      <SolutionModal /> {/* ← Este es el que faltaba: renderiza el modal en pantalla */}
    </ModalProvider>
  );
}
