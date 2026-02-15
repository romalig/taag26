import Header from "../components/Header";
import TxAHero from "../components/TxA/TxAHero";
import TxASystem from "../components/TxA/TxASystem";
import TxAFeatures from "../components/TxA/TxAFeatures";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white"> 
    <Header theme="light" />
      {/* Aquí importamos el Hero de TxA */}
      <TxAHero />
      <TxASystem />
      <TxAFeatures />
      <SolutionModal /> 
    </main>
  </ModalProvider>
  );
}