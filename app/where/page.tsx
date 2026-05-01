import Header from "../components/Header";
import WhereWeAre from "../components/where/WhereWeAre";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export default function WherePage() {
  return (
    <ModalProvider>
      <main className="bg-white"> 
        <Header theme="light" />
        <WhereWeAre />
        <SolutionModal /> 
      </main>
    </ModalProvider>
  );
}