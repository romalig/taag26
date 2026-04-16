// app/customized/page.tsx
import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";
import Header from "../components/Header";
import CustomizedMolecularHero from "../components/Customized/CustomizedMolecularHero";
import MilaSection from "../components/Customized/MilaSection";
import CustomDevSection from "../components/Customized/CustomDevSection";
import ClientProfileTabs from "../components/Customized/ClientProfileTabs";
import FeaturedStory from "../components/Customized/FeaturedStory";
import ContactSection from "../components/Customized/ContactSection";

export const metadata: Metadata = pageMetadata({
  title: "MILA — AI-designed molecular assays",
  description:
    "Design custom multiplex microbiological assays with MILA™: from target sequences to production-ready panels for your lab.",
  path: "/customized",
  keywords: ["MILA", "custom PCR", "multiplex assay", "AI diagnostics", "TAAG"],
});

export default function CustomizedPage() {
  return (
    <main className="bg-white">
      {/* Header en modo Light (Logo Rojo, Texto Negro) */}
      <Header theme="hybrid" />
      
      <CustomizedMolecularHero />
      <MilaSection />
      <CustomDevSection />
      <ClientProfileTabs />
      <FeaturedStory />
      <ContactSection />
      
      {/* Resto de secciones... */}
      <div className="py-20 text-center">
      </div>
    </main>
  );
}