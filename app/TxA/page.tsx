import Header from "../components/Header";
import TxAHero from "../components/TxA/TxAHero";

export default function TxAPage() {
  return (
    <main className="bg-white"> 
    <Header theme="light" />
      {/* Aquí importamos el Hero de TxA */}
      <TxAHero />
      
      {/* Aquí irán las siguientes secciones de TxA que creemos... */}
    </main>
  );
}