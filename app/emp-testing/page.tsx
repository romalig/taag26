"use client";
import Header from "../components/Header";
import HeroSection from "./components/HeroSection";
import SummarySection from "./components/SummarySection";

export default function EMPTestingPremiumPage() {
  return (
    <main className="w-full min-h-screen font-sans bg-[#111111]">
    <Header/>
      <HeroSection />
      <SummarySection />
      
      {/* Próximas secciones irán aquí */}
    </main>
  );
}