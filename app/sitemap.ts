import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/components/data/caseStudies";
import { siteUrl } from "./seo/site";

const staticPaths = [
  "/",
  "/industrial",
  "/labs",
  "/TxA",
  "/customized",
  "/aigor",
  "/LabNetwork",
  "/AboutUs",
  "/where",
  "/emp-testing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${siteUrl}/cases/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...caseEntries];
}
