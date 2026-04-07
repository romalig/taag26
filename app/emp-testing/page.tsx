"use client";
import Header from "../components/Header";
import HeroSection from "./components/HeroSection";
import SummarySection from "./components/SummarySection";
import ProductsSection from "./components/ProductsSection";
import FinancialSection from "./components/FinancialSection";
import ImplementationSection from "./components/ImplementationSection"; 
import CTASection from "./components/CTASection"; 

export default function EMPTestingPremiumPage() {
  return (
    <main className="w-full min-h-screen font-sans bg-white">
      <Header/>
      <HeroSection />
      <SummarySection />
      <ProductsSection />
      <FinancialSection />
      <ImplementationSection /> 
      <CTASection />
    </main>
  );
}