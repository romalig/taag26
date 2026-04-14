import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Laboratory services",
  description:
    "Multiplex and ultra-fast microbiological detection, NGS, same-day pathogen results, and custom assay development for your operation.",
  path: "/LabNetwork",
  keywords: [
    "laboratory services",
    "NGS",
    "same-day testing",
    "TAAG",
    "microbiology lab",
  ],
});

export default function LabNetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
