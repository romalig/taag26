import Header from "../components/Header";
import Hero from "../components/featured/FeaturedPage";
import All from "../components/featured/SolutionsCatalog"; 

export default function TxAPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FF270A] selection:text-white">
      <Header/>
      <Hero />
      <All />
    </main>
  );
}