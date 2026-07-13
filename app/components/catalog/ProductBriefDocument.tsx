"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font, Svg, Defs, LinearGradient, Stop, Rect, Path, G } from "@react-pdf/renderer";
import type { ValueBriefData } from "./ProductBrief";
import type { ProductPresentation } from "./data/products";

// ── FONTS ───────────────────────────────────────────────────────────
Font.register({
  family: "Sora",
  fonts: [
    { src: "/fonts/Sora-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sora-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Sora-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/Sora-ExtraBold.ttf", fontWeight: 800 },
  ],
});

// Highlight icons as inline Lucide SVG paths (Lucide v0.383, viewBox 0 0 24 24, stroke-based).
// Inline SVG renders crisply at any size and lets us set the brand color in code — and it keeps
// the PDF visually consistent with the web modal, which uses the same Lucide set. Keys mirror
// HIGHLIGHT_ICONS in ProductBrief.tsx. "rna" reuses the dna glyph.
const ICON_PATHS: Record<string, string[]> = {
  timer: ["M10 2h4", "M12 14l3-3", "M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"],
  target: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  zap: ["M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"],
  shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
  layers: ["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"],
  droplet: ["M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"],
  thermometer: ["M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"],
  activity: ["M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"],
  check: ["M20 6 9 17l-5-5"],
  flask: ["M10 2v7.31", "M14 9.3V1.99", "M8.5 2h7", "M14 9.3a6.5 6.5 0 1 1-4 0", "M5.58 16.5h12.85"],
  dna: ["M9.5 22c1.5-2 2.5-4 2.5-6 0-2-1-4-2.5-6", "M14.5 2c-1.5 2-2.5 4-2.5 6 0 2 1 4 2.5 6"],
};
ICON_PATHS.rna = ICON_PATHS.dna;
const ICON_FALLBACK = "activity";

function HighlightIcon({ icon, size = 24, color = "#FF270A" }: { icon?: string; size?: number; color?: string }) {
  const paths = (icon && ICON_PATHS[icon]) || ICON_PATHS[ICON_FALLBACK];
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <G>
        {paths.map((d, i) => (
          <Path key={i} d={d} stroke={color} strokeWidth={2} fill="none" />
        ))}
      </G>
    </Svg>
  );
}

// Disable automatic hyphenation: return the word as a single chunk so it wraps
// to the next line whole instead of being split with a hyphen.
Font.registerHyphenationCallback((word: string) => [word]);

// Lowercases the first letter (so "Ultra-fast..." → "ultra-fast..." after "The {name} is a ").
function lowerFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}
// Picks "an" vs "a" based on the first letter of the (lowercased) description.
function startsWithVowel(s: string): boolean {
  return /^[aeiou]/i.test(s.trim());
}
// Turns a bulleted/newline kit-content string into a single inline list separated by " · ".
function inlineKit(s: string): string {
  return s
    .split(/\n+/)
    .map(x => x.replace(/^[\u2022•\-\s]+/, "").trim())
    .filter(Boolean)
    .join("  \u00B7  ");
}

// Title line-breaking for the cover:
//  • Prefer 2 words per line. If that fits in ≤4 lines, use it.
//  • Otherwise, distribute all words as evenly as possible across exactly 4 lines.
function chunkWords(text: string, maxLines = 4): string[] {
  const words = text.trim().split(/\s+/);
  // Attempt: 2 words per line
  const byTwo: string[] = [];
  for (let i = 0; i < words.length; i += 2) byTwo.push(words.slice(i, i + 2).join(" "));
  if (byTwo.length <= maxLines) return byTwo;
  // Fallback: spread evenly across exactly maxLines (balanced word count per line)
  const lines: string[] = [];
  const per = Math.ceil(words.length / maxLines);
  for (let i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(" "));
  return lines;
}
const C = { red: "#FF270A", ink: "#111111", gray: "#4B5563", mute: "#9CA3AF", line: "#E8E8EA", soft: "#F5F5F7", card: "#FFFFFF" };

// Landscape LETTER: 792 x 612 pt. Apple-style generous margins.
const styles = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", fontFamily: "Sora", paddingTop: 54, paddingBottom: 46, paddingHorizontal: 54 },
  pageSoft: { backgroundColor: C.soft, fontFamily: "Sora", paddingTop: 54, paddingBottom: 46, paddingHorizontal: 54 },
  pageDark: { backgroundColor: C.ink, fontFamily: "Sora", paddingTop: 54, paddingBottom: 46, paddingHorizontal: 54 },
  pageTitleWhite: { fontSize: 40, color: "#FFFFFF", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 },
  pageLedeWhite: { fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 400, lineHeight: 1.5, marginBottom: 28, maxWidth: "60%" },
  footerFixedDark: { position: "absolute", bottom: 22, left: 54, right: 54, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "#3A3A3A", paddingTop: 9 },
  footerTextDark: { fontSize: 6.5, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" },

  // Header (logo only, top-left) + report tag top-right
  headerRow: { position: "absolute", top: 30, left: 54, right: 54, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", zIndex: 10 },
  logo: { width: 84, height: 25, objectFit: "contain" },
  headerTag: { fontSize: 7, color: C.mute, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" },

  footerFixed: { position: "absolute", bottom: 22, left: 54, right: 54, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: C.line, paddingTop: 9 },
  footerText: { fontSize: 6.5, color: C.mute, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" },

  // Big page title (TAAG black, Apple scale)
  pageTitle: { fontSize: 40, color: C.ink, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 },
  pageLede: { fontSize: 11, color: C.gray, fontWeight: 400, lineHeight: 1.5, marginBottom: 28, maxWidth: "60%" },

  // Label mono-style
  label: { fontSize: 7.5, color: C.red, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 },

  // ── DESCRIPTION + HIGHLIGHTS (cara 2) — 3 columns on white ──
  threeCol: { flexDirection: "row", gap: 28 },
  descCol: { width: "22%", height: 404, flexDirection: "column" },
  descText: { fontSize: 11, color: C.gray, fontWeight: 400, lineHeight: 1.6 },
  detectedWrap: { marginTop: 20 },
  detectedTitle: { fontSize: 11, color: C.ink, fontWeight: 700, marginBottom: 6 },
  detectedRow: { flexDirection: "row", marginBottom: 3 },
  detectedBullet: { fontSize: 10, color: C.red, fontWeight: 700, marginRight: 5, lineHeight: 1.5 },
  detectedItem: { fontSize: 10, color: C.red, fontWeight: 700, lineHeight: 1.5, flex: 1 },
  hlCol: { width: "46%" },
  hlGrid2: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  hlCard2: { width: "48%", height: 195, backgroundColor: C.soft, borderRadius: 16, padding: 18, marginBottom: 14, flexDirection: "column" },
  hlCard2Title: { fontSize: 12, color: C.ink, fontWeight: 800, marginBottom: 6, letterSpacing: -0.2 },
  hlCard2Sub: { fontSize: 8.5, color: C.gray, fontWeight: 400, lineHeight: 1.45, flex: 1 },
  hlCard2Icon: { width: 34, height: 34, objectFit: "contain", marginTop: 10 },
  blockCard: { width: "48%", height: 195, backgroundColor: C.soft, borderRadius: 16, padding: 18, marginBottom: 14, flexDirection: "column" },
  imgCol: { width: "32%" },
  kitImage: { width: "100%", height: 404, objectFit: "cover", borderRadius: 16 },

  // ── Cara 6: Formats + Supplies + TxA + Contact ──
  c6Cols: { flexDirection: "row", gap: 24, marginTop: 20, height: 438 },
  c6Col: { flex: 1, flexDirection: "column", gap: 20 },
  c6CardTop: { backgroundColor: C.card, borderRadius: 18, padding: 22, borderWidth: 0.5, borderColor: C.line, flex: 1 },
  c6CardBottom: { backgroundColor: C.card, borderRadius: 18, padding: 22, borderWidth: 0.5, borderColor: C.line, flex: 1 },
  c6Row: { flexDirection: "row", paddingVertical: 7, borderBottomWidth: 0.5, borderBottomColor: C.soft, alignItems: "flex-start" },
  c6Cat: { width: "26%", fontSize: 8, color: C.red, fontWeight: 700, paddingRight: 8 },
  c6RowMain: { width: "74%" },
  c6Name: { fontSize: 9, color: C.ink, fontWeight: 700, marginBottom: 1 },
  c6Meta: { fontSize: 7.5, color: C.gray, fontWeight: 400, lineHeight: 1.35 },
  // Formats: presentations stacked vertically; each format's components inline ("·"-separated)
  c6KitName: { fontSize: 9.5, color: C.ink, fontWeight: 700, marginBottom: 6 },
  c6FmtStack: { paddingTop: 7, marginTop: 7, borderTopWidth: 0.5, borderTopColor: C.soft },
  c6FmtHead: { flexDirection: "row", alignItems: "baseline", marginBottom: 2 },
  c6FmtCat: { fontSize: 8, color: C.red, fontWeight: 700, marginRight: 10 },
  c6FmtSize: { fontSize: 7.5, color: C.gray, fontWeight: 700 },
  c6FmtContent: { fontSize: 7, color: C.gray, fontWeight: 400, lineHeight: 1.4 },
  c6SupName: { fontSize: 9, color: C.ink, fontWeight: 700, marginRight: 6 },
  c6SupHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 },
  c6SupLeft: { flexDirection: "row", alignItems: "baseline", flex: 1 },
  c6SupDesc: { fontSize: 7.5, color: C.gray, fontWeight: 400, lineHeight: 1.4, marginTop: 1 },
  // AOAC logo above the detected-microorganisms list (Cara 2, col 1)
  aoacWrap: { alignItems: "flex-start", marginBottom: 10 },
  aoacLogo: { width: 84, height: 30, objectFit: "contain" },
  c6TxaCard: { backgroundColor: C.card, borderRadius: 18, overflow: "hidden", borderWidth: 0.5, borderColor: C.line, height: 326, position: "relative" },
  c6TxaText: { position: "absolute", top: 24, left: 24, width: "52%", fontSize: 13, color: C.ink, fontWeight: 400, letterSpacing: -0.2, lineHeight: 1.3, zIndex: 2 },
  c6TxaImg: { position: "absolute", bottom: 0, right: 0, width: "82%", height: "72%", objectFit: "contain", objectPosition: "bottom right" },
  c6ContactCard: { backgroundColor: C.ink, borderRadius: 18, padding: 22, height: 92, flexDirection: "column", justifyContent: "center" },
  c6ContactName: { fontSize: 13, color: "#FFFFFF", fontWeight: 800, letterSpacing: -0.3, marginBottom: 4 },
  c6ContactLine: { fontSize: 8, color: "rgba(255,255,255,0.6)", fontWeight: 400, marginBottom: 8 },
  c6ContactInfoRow: { flexDirection: "row", gap: 16 },
  c6ContactInfo: { fontSize: 8.5, color: "rgba(255,255,255,0.85)", fontWeight: 600 },
  c6ContactWeb: { fontSize: 8.5, color: C.red, fontWeight: 700 },

  // ── COVER (cara 1) — image is the protagonist ──
  cover: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  coverImg: { width: "100%", height: "100%", objectFit: "cover" },
  coverOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  coverContent: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, paddingTop: 44, paddingBottom: 64, paddingHorizontal: 56, justifyContent: "space-between", alignItems: "flex-start" },
  coverLogo: { width: 92, height: 27, objectFit: "contain" },
  coverTitleWrap: { flexDirection: "column", alignItems: "flex-start" },
  coverTitle: { fontSize: 54, color: "#FFFFFF", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.0 },

  // ── Impact cards (cara 2) — Apple white cards on soft bg ──
  twoCol: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  colHeading: { fontSize: 15, color: C.ink, fontWeight: 800, letterSpacing: -0.4, marginBottom: 3 },
  colSub: { fontSize: 8.5, color: C.mute, fontWeight: 400, marginBottom: 14 },
  impactCard: { backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: C.red },
  impactCardGray: { backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: C.ink },
  impactTitle: { fontSize: 10.5, color: C.ink, fontWeight: 800, marginBottom: 4, letterSpacing: -0.2 },
  impactBody: { fontSize: 8.5, color: C.gray, lineHeight: 1.5, fontWeight: 400 },

  // ── Table (cara 3) — Apple data card ──
  tableCard: { backgroundColor: C.card, borderRadius: 18, overflow: "hidden", borderWidth: 0.5, borderColor: C.line },
  tableHeader: { flexDirection: "row", backgroundColor: C.soft, paddingVertical: 11, paddingHorizontal: 18, borderBottomWidth: 0.5, borderBottomColor: C.line },
  tableRow: { flexDirection: "row", paddingVertical: 9, paddingHorizontal: 18, borderBottomWidth: 0.5, borderBottomColor: C.line, alignItems: "flex-start" },
  colFeature: { width: "14%", fontSize: 9.5, color: C.ink, fontWeight: 700, paddingRight: 10 },
  colTaag: { width: "21%", fontSize: 9.5, color: C.red, fontWeight: 400, paddingRight: 14 },
  colImpact: { width: "33%", fontSize: 8.5, color: C.gray, paddingRight: 24, lineHeight: 1.4, fontWeight: 400 },
  colComp: { width: "15%", fontSize: 8.5, color: "#6B7280", fontWeight: 400, paddingRight: 14 },
  colCompLast: { width: "17%", fontSize: 8.5, color: "#6B7280", fontWeight: 400, paddingLeft: 12 },
  th: { fontSize: 7.5, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: C.ink },
  thRed: { fontSize: 7.5, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: C.red },
  thMute: { fontSize: 7.5, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: C.mute },
  thMuteLast: { fontSize: 7.5, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: C.mute },

  // ── Lists (cara 4) ──
  twoColLists: { flexDirection: "row", gap: 24, marginBottom: 22 },
  listCard: { flex: 1, backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 0.5, borderColor: C.line },
  listHeading: { fontSize: 13, color: C.ink, fontWeight: 800, letterSpacing: -0.3, marginBottom: 12 },
  compactRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.soft, alignItems: "center" },
  compactCat: { width: "30%", fontSize: 7.5, color: C.red, fontWeight: 700 },
  compactMain: { width: "70%", fontSize: 8.5, color: C.ink, fontWeight: 600 },
  relatedStage: { width: "26%", fontSize: 6.5, color: C.mute, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 },
  relatedContent: { width: "74%" },
  relatedName: { fontSize: 8.5, color: C.ink, fontWeight: 700, marginBottom: 1 },
  relatedDesc: { fontSize: 7, color: "#6B7280", lineHeight: 1.35, fontWeight: 400 },

  // TxA + contact (cara 4)
  txaCard: { backgroundColor: C.ink, borderRadius: 18, padding: 24, flexDirection: "row", alignItems: "center", marginBottom: 16 },
  txaLogo: { width: 96, height: 34, objectFit: "contain", marginRight: 24 },
  txaTextWrap: { flex: 1 },
  txaTitle: { fontSize: 13, color: "#FFFFFF", fontWeight: 800, marginBottom: 5, letterSpacing: -0.3 },
  txaText: { fontSize: 8.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, fontWeight: 400 },
  contactRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  contactName: { fontSize: 12, color: C.ink, fontWeight: 800, letterSpacing: 1 },
  contactInfo: { fontSize: 8.5, color: C.gray, fontWeight: 600, textAlign: "right" },
  contactWeb: { fontSize: 8.5, color: C.red, fontWeight: 700, textAlign: "right", marginTop: 2 },

  // ─── Non-PCR condensed brochure (single page, white bg) ───
  npKicker: { fontSize: 7.5, color: C.red, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: 22, marginBottom: 8 },
  npTitle: { fontSize: 22, color: C.ink, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.05, marginBottom: 8 },
  npDesc: { fontSize: 9, color: C.gray, fontWeight: 400, lineHeight: 1.5, marginBottom: 24 },
  npRedBaseline: { position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: C.red },
  npSectionTitle: { fontSize: 11, color: C.ink, fontWeight: 800, letterSpacing: -0.2, marginTop: 14, marginBottom: 9 },
  npPage: { backgroundColor: "#FFFFFF", fontFamily: "Sora", paddingTop: 48, paddingBottom: 42, paddingHorizontal: 44 },
  npCols: { flexDirection: "row", flex: 1 },
  npColLeft: { width: "45%", flexDirection: "column" },
  npColSpacer: { width: "10%" },
  npColRight: { width: "45%", flexDirection: "column" },
  npKitImage: { width: "100%", borderRadius: 12, marginTop: 14, marginBottom: 0 },
  npFeatureList: { flexDirection: "column", gap: 8 },
  npFeatureRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  npFeatureDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.red, marginTop: 4 },
  npFeatureText: { fontSize: 8.5, color: "#333333", fontWeight: 500, lineHeight: 1.45, flex: 1 },
  // Black contact card under the features (mirrors the PCR brief's contact card)
  npContactCard: { backgroundColor: C.ink, borderRadius: 14, padding: 16, marginTop: 18, flexDirection: "column", justifyContent: "center" },
  npContactName: { fontSize: 11, color: "#FFFFFF", fontWeight: 800, letterSpacing: -0.3, marginBottom: 3 },
  npContactLine: { fontSize: 7, color: "rgba(255,255,255,0.6)", fontWeight: 400, marginBottom: 7 },
  npContactInfoRow: { flexDirection: "row", gap: 12 },
  npContactInfoTxt: { fontSize: 7.5, color: "rgba(255,255,255,0.85)", fontWeight: 600 },
  npContactWebTxt: { fontSize: 7.5, color: C.red, fontWeight: 700 },
  // Formats table — proportional columns so it fits the narrow Letter column
  npTable: { flexDirection: "column", borderWidth: 1, borderColor: "#EAEAEA", borderRadius: 8, overflow: "hidden" },
  npTableHead: { flexDirection: "row", backgroundColor: "#F4F4F4", paddingVertical: 5, paddingHorizontal: 7 },
  npThCat: { width: "22%", fontSize: 5.5, color: C.gray, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" },
  npThFmt: { width: "38%", fontSize: 5.5, color: C.gray, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" },
  npThSpec: { width: "40%", fontSize: 5.5, color: C.gray, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" },
  npTr: { flexDirection: "row", paddingVertical: 5, paddingHorizontal: 7, alignItems: "flex-start" },
  npTrAlt: { backgroundColor: "#FAFAFA" },
  npGroupHead: { backgroundColor: C.ink, paddingVertical: 4, paddingHorizontal: 7 },
  npGroupName: { fontSize: 6.5, color: "#FFFFFF", fontWeight: 800, letterSpacing: 0.3 },
  npTdCat: { width: "22%", fontSize: 6, color: C.red, fontWeight: 700 },
  npTdFmt: { width: "38%", flexDirection: "column", paddingRight: 4 },
  npTdFmtMain: { fontSize: 6.5, color: C.ink, fontWeight: 700 },
  npTdFmtSub: { fontSize: 5.5, color: C.gray, fontWeight: 500, marginTop: 1 },
  npTdSpec: { width: "40%", fontSize: 5.5, color: "#555555", fontWeight: 500, lineHeight: 1.35 },
});

function Header({ soft }: { soft?: boolean }) {
  return (
    <View style={styles.headerRow} fixed>
      <Image src="/logo-red1.png" style={styles.logo} />
    </View>
  );
}
function Footer() {
  return (
    <View style={styles.footerFixed} fixed>
      <Text style={styles.footerText}>TAAG | www.taag.bio</Text>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}`} fixed />
    </View>
  );
}

// Fixed template labels by language (en/es/pt). Kit content comes from `data`; these are the
// structural labels of the brochure. Pass `lang` to ProductBriefDocument to localize them.
export type BriefLang = "en" | "es" | "pt";
const PDF_LABELS: Record<BriefLang, Record<string, string>> = {
  en: {
    kitDesc: "Kit description and highlights", detected: "Detected microorganisms:",
    whyMatters: "Why it matters", forPlant: "For your plant", forLab: "For your lab",
    howCompares: "How it compares", compareLede: "TAAG versus leading PCR and traditional culture methods.",
    feature: "Feature", impact: "Business Impact", leadingPcr: "Leading PCR", traditional: "Traditional",
    formats: "Formats & products",
  },
  es: {
    kitDesc: "Descripción del kit y aspectos destacados", detected: "Microorganismos detectados:",
    whyMatters: "Por qué importa", forPlant: "Para tu planta", forLab: "Para tu laboratorio",
    howCompares: "Cómo se compara", compareLede: "TAAG frente a PCR líder y métodos tradicionales de cultivo.",
    feature: "Característica", impact: "Impacto en el negocio", leadingPcr: "PCR líder", traditional: "Tradicional",
    formats: "Formatos y productos",
  },
  pt: {
    kitDesc: "Descrição do kit e destaques", detected: "Microrganismos detectados:",
    whyMatters: "Por que importa", forPlant: "Para sua planta", forLab: "Para seu laboratório",
    howCompares: "Como se compara", compareLede: "TAAG frente ao PCR líder e métodos tradicionais de cultura.",
    feature: "Característica", impact: "Impacto no negócio", leadingPcr: "PCR líder", traditional: "Tradicional",
    formats: "Formatos e produtos",
  },
};

export default function ProductBriefDocument({ data, lang = "en" }: { data: ValueBriefData; lang?: BriefLang }) {
  const L = PDF_LABELS[lang] ?? PDF_LABELS.en;
  const plant = data.pdfPlant && data.pdfPlant.length ? data.pdfPlant : data.plant;
  const lab = data.pdfLab && data.pdfLab.length ? data.pdfLab : data.lab;
  const hasComparison = data.comparisonRows.length > 0;
  const hasFormats = data.presentations.length > 0;
  const hasRelated = data.relatedProducts.length > 0;

  // ─── Non-PCR products (consumables: media, extraction kits, sampling, supplements) get a
  //     condensed 2-page brochure: a hero-less cover + a features/formats page with per-format
  //     technical specs. They have no marketing highlights, plant/lab impact or competitor table. ───
  if (!data.isPcr) {
    const fmtSpecs = (pr: ProductPresentation): string[] => [
      pr.shelfLifeMonths && pr.shelfLifeMonths !== "-" ? `Shelf life: ${pr.shelfLifeMonths} mo` : null,
      pr.storeTemp && pr.storeTemp !== "-" ? `Storage: ${pr.storeTemp}` : null,
      typeof pr.isReadyToUse === "boolean" ? (pr.isReadyToUse ? "Ready to use" : "Requires preparation") : null,
      pr.incubationTimeH && pr.incubationTimeH !== "-" ? `Incubation: ${pr.incubationTimeH.replace(/\n/g, " · ")} h` : null,
    ].filter((x): x is string => Boolean(x));
    return (
      <Document>
        <Page size="LETTER" style={styles.npPage}>
          <Header soft />
          {/* Header block: category kicker + name + description (mirrors the modal, no hero) */}
          {(data.category || data.productLine) && (
            <Text style={styles.npKicker}>{[data.category, data.productLine].filter(Boolean).join("  ·  ")}</Text>
          )}
          <Text style={styles.npTitle}>{data.name}</Text>
          {data.description ? <Text style={styles.npDesc}>{data.description}</Text> : null}

          <View style={styles.npCols}>
            {/* Col 1: key features + black contact card pinned to the bottom */}
            <View style={styles.npColLeft}>
              <Text style={styles.npSectionTitle}>Key features</Text>
              <View style={styles.npFeatureList}>
                {data.features.map((f, i) => (
                  <View key={i} style={styles.npFeatureRow}>
                    <View style={styles.npFeatureDot} />
                    <Text style={styles.npFeatureText}>{f}</Text>
                  </View>
                ))}
              </View>
              {/* Spacer pushes the contact card down so it sits just above the red baseline */}
              <View style={{ flexGrow: 1 }} />
              {/* Black contact card (same as the PCR brief) */}
              <View style={styles.npContactCard}>
                <Text style={styles.npContactName}>Contact us</Text>
                <Text style={styles.npContactLine}>Talk to our team about validation, pricing and getting started.</Text>
                <View style={styles.npContactInfoRow}>
                  <Text style={styles.npContactInfoTxt}>contact@taag.bio</Text>
                  <Text style={styles.npContactWebTxt}>www.taag.bio</Text>
                </View>
              </View>
            </View>
            {/* 10% white-space spacer column */}
            <View style={styles.npColSpacer} />
            {/* Col 2: formats as a compact table so more rows fit (grouped by product when combined) */}
            <View style={styles.npColRight}>
              {/* Kit image — rounded corners, no background card; marginTop matches npSectionTitle so it
                  lines up with "Key features" on the left. Same /V-XXXX.png convention as PCR. */}
              <Image src={data.kitImage} style={styles.npKitImage} />
              <Text style={styles.npSectionTitle}>{L.formats}</Text>
              <View style={styles.npTable}>
                {/* table header */}
                <View style={styles.npTableHead}>
                  <Text style={[styles.npThCat]}>Cat #</Text>
                  <Text style={[styles.npThFmt]}>Format · Size</Text>
                  <Text style={[styles.npThSpec]}>Specifications</Text>
                </View>
                {data.formatGroups && data.formatGroups.length ? (
                  data.formatGroups.map((grp, gi) => (
                    <View key={gi}>
                      <View style={styles.npGroupHead}><Text style={styles.npGroupName}>{grp.name}</Text></View>
                      {grp.presentations.map((pr, i) => {
                        const specs = fmtSpecs(pr);
                        return (
                          <View key={i} style={[styles.npTr, i % 2 === 1 ? styles.npTrAlt : {}]}>
                            <Text style={styles.npTdCat}>{pr.catalogCode ?? "—"}</Text>
                            <View style={styles.npTdFmt}>
                              <Text style={styles.npTdFmtMain}>{[pr.format, pr.size].filter(Boolean).join(" · ") || "—"}</Text>
                              {pr.kitContent ? <Text style={styles.npTdFmtSub}>{pr.kitContent}</Text> : null}
                            </View>
                            <Text style={styles.npTdSpec}>{specs.join("  ·  ") || "—"}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ))
                ) : (
                  data.presentations.map((pr, i) => {
                    const specs = fmtSpecs(pr);
                    return (
                      <View key={i} style={[styles.npTr, i % 2 === 1 ? styles.npTrAlt : {}]}>
                        <Text style={styles.npTdCat}>{pr.catalogCode ?? "—"}</Text>
                        <View style={styles.npTdFmt}>
                          <Text style={styles.npTdFmtMain}>{[pr.format, pr.size].filter(Boolean).join(" · ") || "—"}</Text>
                          {pr.kitContent ? <Text style={styles.npTdFmtSub}>{pr.kitContent}</Text> : null}
                        </View>
                        <Text style={styles.npTdSpec}>{specs.join("  ·  ") || "—"}</Text>
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </View>
          {/* Thin TAAG-red baseline at the foot of the page */}
          <View style={styles.npRedBaseline} fixed />
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      {/* ───────── CARA 1: COVER full-bleed — image is the protagonist ───────── */}
      <Page size={{ width: 1080, height: 612 }}>
        <View style={styles.cover}>
          <Image src={data.heroImage ?? "/hero_brochure.png"} style={styles.coverImg} />
          {/* Two stacked gradients: a stronger bottom band + a left wash → reads as bottom-left dark, right clean */}
          <Svg width="1080" height="612" style={styles.coverOverlay}>
            <Defs>
              <LinearGradient id="gbottom" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#000000" stopOpacity={0.7} />
                <Stop offset="0.45" stopColor="#000000" stopOpacity={0.15} />
                <Stop offset="0.75" stopColor="#000000" stopOpacity={0} />
              </LinearGradient>
              <LinearGradient id="gleft" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#000000" stopOpacity={0.45} />
                <Stop offset="0.5" stopColor="#000000" stopOpacity={0.08} />
                <Stop offset="1" stopColor="#000000" stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="1080" height="612" fill="url(#gbottom)" />
            <Rect x="0" y="0" width="1080" height="612" fill="url(#gleft)" />
          </Svg>
          <View style={styles.coverContent}>
            <Image src="/logo-white.png" style={styles.coverLogo} />
            <View style={styles.coverTitleWrap}>
              {chunkWords(data.name).map((line, i) => (
                <Text key={i} style={styles.coverTitle}>{line}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>

      {/* ───────── CARA 2: KIT DESCRIPTION + HIGHLIGHTS + IMAGE (3 cols, white) ───────── */}
      <Page size={{ width: 1080, height: 612 }} style={styles.page}>
        <Header />
        <Text style={styles.pageTitle}>{L.kitDesc}</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: description (top) + detected list (bottom-aligned with lower card row) */}
          <View style={styles.descCol}>
            {data.description && (
              data.descriptionIsCustom ? (
                <Text style={styles.descText}>{data.description}</Text>
              ) : (
                <Text style={styles.descText}>
                  The {data.name} is {startsWithVowel(data.description) ? "an" : "a"} {lowerFirst(data.description)}
                  {data.isAigor ? " It is powered by AiGOR\u2122, TAAG's RNA-based detection technology." : ""}
                </Text>
              )
            )}
            {(data.isAoac || (data.detectedList && data.detectedList.length > 0)) && (
              <>
                <View style={{ flex: 1 }} />
                {data.isAoac && (
                  <View style={styles.aoacWrap}>
                    <Image src="/AOAC.png" style={styles.aoacLogo} />
                  </View>
                )}
                {data.detectedList && data.detectedList.length > 0 && (
                  <View style={styles.detectedWrap}>
                    <Text style={styles.detectedTitle}>{L.detected}</Text>
                    {data.detectedList.map((m, i) => (
                      <View key={i} style={styles.detectedRow}>
                        <Text style={styles.detectedBullet}>{"\u2022"}</Text>
                        <Text style={styles.detectedItem}>{m}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
          {/* Col 2: 4 highlight cards (light gray; title, description, red icon at bottom) */}
          <View style={styles.hlCol}>
            <View style={styles.hlGrid2}>
              {data.highlights.map((h, i) => (
                <View key={i} style={styles.hlCard2}>
                  <Text style={styles.hlCard2Title}>{h.title}</Text>
                  <Text style={styles.hlCard2Sub}>{h.pdfText ?? h.subtitle}</Text>
                  <View style={styles.hlCard2Icon}><HighlightIcon icon={h.icon} size={26} color={C.red} /></View>
                </View>
              ))}
            </View>
          </View>
          {/* Col 3: kit image */}
          <View style={styles.imgCol}>
            <Image src={data.kitImage} style={styles.kitImage} />
          </View>
        </View>
        <Footer />
      </Page>

      {/* ───────── CARA 3: WHY IT MATTERS — FOR YOUR PLANT ───────── */}
      <Page size={{ width: 1080, height: 612 }} style={styles.page}>
        <Header />
        <Text style={styles.pageTitle}>{L.whyMatters}</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: intro */}
          <View style={styles.descCol}>
            <Text style={styles.colHeading}>{L.forPlant}</Text>
            <Text style={styles.descText}>What this kit changes for your production line — fewer stoppages, lower outbreak risk and leaner inventory.</Text>
          </View>
          {/* Col 2: 4 plant blocks as cards (long modal copy) */}
          <View style={styles.hlCol}>
            <View style={styles.hlGrid2}>
              {data.plant.map((item, i) => (
                <View key={i} style={styles.blockCard}>
                  <Text style={styles.hlCard2Title}>{item.title}</Text>
                  <Text style={styles.hlCard2Sub}>{item.body}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Col 3: plant image */}
          <View style={styles.imgCol}>
            <Image src="/plant_brochure.png" style={styles.kitImage} />
          </View>
        </View>
        <Footer />
      </Page>

      {/* ───────── CARA 4: WHY IT MATTERS — FOR YOUR LAB ───────── */}
      <Page size={{ width: 1080, height: 612 }} style={styles.page}>
        <Header />
        <Text style={styles.pageTitle}>{L.whyMatters}</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: intro */}
          <View style={styles.descCol}>
            <Text style={styles.colHeading}>{L.forLab}</Text>
            <Text style={styles.descText}>The technical edge your team works with every day — faster, cleaner, more reliable results.</Text>
          </View>
          {/* Col 2: 4 lab blocks as cards (long modal copy) */}
          <View style={styles.hlCol}>
            <View style={styles.hlGrid2}>
              {data.lab.map((item, i) => (
                <View key={i} style={styles.blockCard}>
                  <Text style={styles.hlCard2Title}>{item.title}</Text>
                  <Text style={styles.hlCard2Sub}>{item.body}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Col 3: lab image */}
          <View style={styles.imgCol}>
            <Image src="/lab_brochure.jpg" style={styles.kitImage} />
          </View>
        </View>
        <Footer />
      </Page>

      {/* ───────── CARA 5: COMPARISON (black page, white table card) ───────── */}
      <Page size={{ width: 1080, height: 612 }} style={styles.pageDark}>
        <View style={styles.headerRow} fixed>
          <Image src="/logo-white.png" style={styles.logo} />
        </View>
        <Text style={styles.pageTitleWhite}>{L.howCompares}</Text>
        <Text style={styles.pageLedeWhite}>{L.compareLede}</Text>
        {hasComparison && (
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colFeature, styles.th]}>{L.feature}</Text>
              <Text style={[styles.colTaag, styles.thRed]}>TAAG</Text>
              <Text style={[styles.colImpact, styles.th]}>{L.impact}</Text>
              <Text style={[styles.colComp, styles.thMute]}>{L.leadingPcr}</Text>
              <Text style={[styles.colCompLast, styles.thMuteLast]}>{L.traditional}</Text>
            </View>
            {data.comparisonRows.map((row, i) => (
              <View key={i} style={[styles.tableRow, i === data.comparisonRows.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                <Text style={styles.colFeature}>{row.feature}</Text>
                <Text style={styles.colTaag}>{row.taag ?? "—"}</Text>
                <Text style={styles.colImpact}>{row.businessImpact ?? "—"}</Text>
                <Text style={styles.colComp}>{row.leadingPcr ?? "—"}</Text>
                <Text style={styles.colCompLast}>{row.traditional ?? "—"}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.footerFixedDark} fixed>
          <Text style={styles.footerTextDark}>TAAG | www.taag.bio</Text>
          <Text style={styles.footerTextDark} render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}`} fixed />
        </View>
      </Page>

      {/* ───────── CARA 6: FORMATS + SUPPLIES + TxA + CONTACT (2 cols, 2 cards each) ───────── */}
      <Page size={{ width: 1080, height: 612 }} style={styles.pageSoft}>
        <Header soft />
        <Text style={styles.pageTitle}>{L.formats}</Text>
        <View style={styles.c6Cols}>
          {/* COLUMN 1 */}
          <View style={styles.c6Col}>
            {/* Formats card */}
            <View style={styles.c6CardTop}>
              <Text style={styles.listHeading}>Formats</Text>
              <Text style={styles.c6KitName}>{data.name}</Text>
              {data.presentations.map((pr, i) => (
                <View key={i} style={styles.c6FmtStack}>
                  <View style={styles.c6FmtHead}>
                    <Text style={styles.c6FmtCat}>Cat #{pr.catalogCode ?? "—"}</Text>
                    <Text style={styles.c6FmtSize}>{[pr.format, pr.size].filter(Boolean).join(" · ") || "—"}</Text>
                  </View>
                  {pr.kitContent ? <Text style={styles.c6FmtContent}>{inlineKit(pr.kitContent)}</Text> : null}
                </View>
              ))}
            </View>
            {/* Additional supplies card — same format as Formats */}
            <View style={styles.c6CardBottom}>
              <Text style={styles.listHeading}>Additional supplies</Text>
              {data.relatedProducts.map((r, i) => (
                <View key={i} style={styles.c6FmtStack}>
                  <View style={styles.c6SupHead}>
                    <View style={styles.c6SupLeft}>
                      <Text style={styles.c6SupName}>{r.name}</Text>
                      <Text style={styles.c6FmtCat}>Cat #{r.cat}</Text>
                    </View>
                    <Text style={styles.c6FmtSize}>{[r.format, r.size].filter(Boolean).join(" · ") || "—"}</Text>
                  </View>
                  {r.note ? <Text style={styles.c6SupDesc}>{r.note}</Text> : null}
                </View>
              ))}
            </View>
          </View>
          {/* COLUMN 2 */}
          <View style={styles.c6Col}>
            {/* TxA image card (3/4 height) */}
            <View style={styles.c6TxaCard}>
              <Text style={styles.c6TxaText}>Connect this kit to the TxA platform — automated interpretation, predictive monitoring and real-time dashboards.</Text>
              <Image src="/TxA_app.png" style={styles.c6TxaImg} />
            </View>
            {/* Contact card (1/4 height) */}
            <View style={styles.c6ContactCard}>
              <Text style={styles.c6ContactName}>Contact us</Text>
              <Text style={styles.c6ContactLine}>Talk to our team about validation, pricing and getting started.</Text>
              <View style={styles.c6ContactInfoRow}>
                <Text style={styles.c6ContactInfo}>contact@taag.bio</Text>
                <Text style={styles.c6ContactWeb}>www.taag.bio</Text>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}
