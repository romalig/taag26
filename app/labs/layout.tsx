import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Your lab, fully optimized",
  description:
    "Become a TAAG lab partner: technologies, software, products, and workflows for productivity, agility, and cost savings.",
  path: "/labs",
  keywords: ["lab partner", "diagnostics", "TAAG", "laboratory ecosystem"],
});

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
