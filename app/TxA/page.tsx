import Header from "../components/Header";
import TxAHero from "../components/TxA/TxAHero";
import TxASystem from "../components/TxA/TxASystem";
import TxAFeatures from "../components/TxA/TxAFeatures";
import TxAConversational from "../components/TxA/TxAConversational";
import FeaturedStory from "../components/TxA/FeaturedStory";
import FinalCTA from "../components/FinalCTA";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

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