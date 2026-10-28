import Header from "../components/Header";
import Risk from "../components/risk/risk";
import Create from "../components/risk/FlowEditorPage"; 
import Flows from "../components/risk/FlowsPage";

export default function TxAPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Risk />
      <Create />
      <Flows />
    </main>
  );
}