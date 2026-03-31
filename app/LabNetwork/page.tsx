"use client";

import Header from "../components/Header";
import LabNetwork from "../components/LabServices/LabNetwork";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

// import Footer from "../../components/Footer"; // Si tienes footer global

export default function IndustrialPage() {
  return (
    <ModalProvider> {/* 1. Wrapper */}
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <LabNetwork/>
    </main>
    </ModalProvider>
  );
}