import Header from "../components/Header";
import Hero from "../components/catalog/ProductsHero";
import Intro from "../components/catalog/ProductsIntro";
import Catalog from "../components/catalog/WorkflowBuilder";
import Products from "../components/catalog/ProductCatalog";
import { ModalProvider } from "../components/catalog/ModalProvider"; 
import SolutionModal from "../components/catalog/SolutionModal";
import FinalCTA from "../components/FinalCTA";


export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Intro />
      <Catalog />
      <Products />
      <FinalCTA />
      <SolutionModal /> 
    </main>
    </ModalProvider>
  );
}