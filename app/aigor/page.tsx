import Header from "../components/Header";
import Hero from "../components/AiGOR/Aigor_hero";
import Elevia from "../components/AiGOR/Elevia";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white"> 
    <Header theme="dark" />
      <Hero />
      <Elevia />
      <SolutionModal /> 
    </main>
    </ModalProvider>
  );
}