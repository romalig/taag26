import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";
import Header from "../components/Header";
import TxAHero from "../components/TxA/TxAHero";
import TxASystem from "../components/TxA/TxASystem";
import TxAFeatures from "../components/TxA/TxAFeatures";
import TxAConversational from "../components/TxA/TxAConversational";
import FeaturedStory from "../components/TxA/FeaturedStory";
import FinalCTA from "../components/FinalCTA";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export const metadata: Metadata = pageMetadata({
  title: "TxA — smart microbiology software",
  description:
    "TxA turns isolated lab results into predictive risk insight, surfacing correlations before contamination becomes an outbreak.",
  path: "/TxA",
  keywords: ["TxA", "microbiology software", "LIMS", "predictive risk", "TAAG"],
});

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white"> 
    <Header theme="light" />
      <TxAHero />
      <TxASystem />
      <TxAFeatures />
      <TxAConversational />
      <FeaturedStory />
      <FinalCTA />
      <SolutionModal /> 
    </main>
  </ModalProvider>
  );
}