import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";
import Header from "../components/Header";
import WhereWeAre from "../components/where/WhereWeAre";
import { ModalProvider } from "../components/industrial/ModalProvider"; 
import SolutionModal from "../components/industrial/SolutionModal";

export const metadata: Metadata = pageMetadata({
  title: "Global science, local support",
  description:
    "TAAG hubs, partner labs, and distributors worldwide—support in your language and time zone for kits, TxA, MILA, and lab services.",
  path: "/where",
  keywords: ["TAAG locations", "lab partner", "global support", "distributors"],
});

export default function TxAPage() {
  return (
    <ModalProvider>
    <main className="bg-white"> 
    <Header theme="light" />
      <WhereWeAre />
      <SolutionModal /> 
    </main>
  </ModalProvider>
  );
}