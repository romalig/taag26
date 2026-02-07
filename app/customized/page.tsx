// app/customized/page.tsx
import Header from "../components/Header";
import CustomizedMolecularHero from "../components/Customized/CustomizedMolecularHero";
import MilaSection from "../components/Customized/MilaSection";
import CustomDevSection from "../components/Customized/CustomDevSection";

export default function CustomizedPage() {
  return (
    <main className="bg-white">
      {/* Header en modo Light (Logo Rojo, Texto Negro) */}
      <Header theme="dark" />
      
      <CustomizedMolecularHero />
      <MilaSection />
      <CustomDevSection />
      
      {/* Resto de secciones... */}
      <div className="py-20 text-center">
          <p>More content coming soon...</p>
      </div>
    </main>
  );
}