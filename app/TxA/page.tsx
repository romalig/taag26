import Header from "../components/Header";
import TxAHero from "../components/TxA/TxAHero";
import TxASystem from "../components/TxA/TxASystem";
import TxAFeatures from "../components/TxA/TxAFeatures";

export default function TxAPage() {
  return (
    <main className="bg-white"> 
    <Header theme="light" />
      {/* Aquí importamos el Hero de TxA */}
      <TxAHero />
      <TxASystem />
      <TxAFeatures />
      
      {/* Aquí irán las siguientes secciones de TxA que creemos... */}
    </main>
  );
}