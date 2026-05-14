import Header from "../components/Header";
import Catalog from "../components/catalog/WorkflowBuilder";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Catalog />
      <SolutionModal /> 
    </main>
    </ModalProvider>
  );
}