import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";
import Header from "../components/Header";
import Hero from "../components/AiGOR/Aigor_hero";
import Elevia from "../components/AiGOR/Elevia";
import EleviaEnvironmental from "../components/AiGOR/EleviaEnvironmental";
import EleviaCaseStudy from "../components/AiGOR/EleviaCaseStudy";
import EleviaFood from "../components/AiGOR/EleviaFood";
import EleviaROICalculator from "../components/AiGOR/EleviaROICalculator";
import FinalCTA from "../components/FinalCTA";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export const metadata: Metadata = pageMetadata({
  title: "AiGOR — RNA-powered microbiology",
  description:
    "AiGOR™ RNA technology for a new generation of microbiological solutions: sensitive, fast pathogen and spoilage detection.",
  path: "/aigor",
  keywords: ["AiGOR", "RNA detection", "Salmonella", "food safety", "TAAG"],
});

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white"> 
      <Header theme="dark" />
      <Hero />
      <Elevia />
      <EleviaEnvironmental />
      <EleviaCaseStudy />
      <EleviaFood />
      <EleviaROICalculator />
      <FinalCTA />
      <SolutionModal /> 
    </main>
    </ModalProvider>
  );
}