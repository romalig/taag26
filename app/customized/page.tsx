// app/customized/page.tsx
import Header from "../components/Header";
import CustomizedMolecularHero from "../components/Customized/CustomizedMolecularHero";
import MilaSection from "../components/Customized/MilaSection";
import CustomDevSection from "../components/Customized/CustomDevSection";
import ClientProfileTabs from "../components/Customized/ClientProfileTabs";


export default function CustomizedPage() {
  return (
    <main className="bg-white">
      {/* Header en modo Light (Logo Rojo, Texto Negro) */}
      <Header theme="dark" />
      
      <CustomizedMolecularHero />
      <MilaSection />
      <CustomDevSection />
      <ClientProfileTabs />
      
      {/* Resto de secciones... */}
      <div className="py-20 text-center">
      </div>
    </main>
  );
}