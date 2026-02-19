// app/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import AigorSection from "./components/AigorSection";
import SystemModules from "./components/SystemModules";
import SolutionFinder from "./components/SolutionFinder";
import CaseStudies from "./components/CaseStudies";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Header theme="hybrid" />
      {/* 1. Hero Section (Imagen científica + CTA) */}
      
      <Hero />

      {/* 4. Tarjetas de Productos (Estilo Hims/Lilly) */}
      <SystemModules />

      <AigorSection /> {/* <--- Colocar aquí, rompiendo el blanco con negro */}

      {/* 3. Buscador de Soluciones (Sección Oscura/Vibrante) */}
      <SolutionFinder />

      {/* 5. Carrusel de Casos de Éxito (Real Labs, Real Impact) */}
      <CaseStudies />

      {/* 6. Invitación Final (Tarjeta Gris Flotante) */}
      <FinalCTA />

    </main>
  );
}