import Header from "../components/Header";
import Catalog from "../components/catalog/WorkflowBuilder";
import Products from "../components/catalog/ProductCatalog";
import { ModalProvider } from "../components/catalog/ModalProvider"; 
import SolutionModal from "../components/catalog/SolutionModal";

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Catalog />
      <Products />
      <SolutionModal /> 
    </main>
    </ModalProvider>
  );
}