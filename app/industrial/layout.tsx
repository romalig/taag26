import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Next-generation microbiological solutions",
  description:
    "Multiplex and ultra-fast microbiological detection to accelerate decisions, reduce risk, and improve productivity across industry.",
  path: "/industrial",
  keywords: [
    "industrial microbiology",
    "multiplex PCR",
    "food safety",
    "TAAG",
    "pathogen detection",
  ],
});

export default function IndustrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
