import type { Metadata } from "next";
import { pageMetadata } from "@/app/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "EMP as a profit center",
  description:
    "Business case: in-house environmental pathogen testing, six-figure annual savings, and fewer production bottlenecks.",
  path: "/emp-testing",
  keywords: ["EMP", "environmental monitoring", "pathogen testing", "TAAG"],
});

export default function EmpTestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
