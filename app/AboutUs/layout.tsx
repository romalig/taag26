import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About TAAG",
  description:
    "Founded in 2001, TAAG helps organizations manage microbiological risk through advanced molecular solutions and intelligent systems.",
  path: "/AboutUs",
  keywords: ["TAAG", "about", "molecular diagnostics", "company history"],
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
