"use client";
import Header from "../components/Header";
import HeroSection from "./components/HeroSection";
import SummarySection from "./components/SummarySection";
import FinancialSection from "./components/FinancialSection";

export default function EMPTestingPremiumPage() {
  return (
    <main className="w-full min-h-screen font-sans bg-white">
      <Header/>
      <HeroSection />
      <SummarySection />
      <FinancialSection />
      
      {/* Próximas secciones irán aquí */}
    </main>
  );
}