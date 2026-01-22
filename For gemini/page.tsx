import CTAProvider from "./components/CTAProvider";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProofStrip from "./components/ProofStrip";
import SystemModules from "./components/SystemModules";
import SolutionFinder from "./components/SolutionFinder";
import CaseStudies from "./components/CaseStudies";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <CTAProvider>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <SystemModules />
        <SolutionFinder />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </CTAProvider>
  );
}