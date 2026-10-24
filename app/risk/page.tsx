import Header from "../components/Header";
import Risk from "../components/risk/risk";

export default function TxAPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Risk />
    </main>
  );
}