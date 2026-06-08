"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font, Svg, Defs, LinearGradient, Stop, Rect } from "@react-pdf/renderer";
import type { ValueBriefData } from "./ProductBrief";

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

const iconSrc = (key: string) => `/icons/${key}.png`;

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
  descCol: { width: "22%" },
  descText: { fontSize: 11, color: C.gray, fontWeight: 400, lineHeight: 1.6 },
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
  c6CardTop: { backgroundColor: C.card, borderRadius: 18, padding: 22, borderWidth: 0.5, borderColor: C.line, height: 209 },
  c6CardBottom: { backgroundColor: C.card, borderRadius: 18, padding: 22, borderWidth: 0.5, borderColor: C.line, height: 209 },
  c6Row: { flexDirection: "row", paddingVertical: 7, borderBottomWidth: 0.5, borderBottomColor: C.soft, alignItems: "flex-start" },
  c6Cat: { width: "26%", fontSize: 8, color: C.red, fontWeight: 700, paddingRight: 8 },
  c6RowMain: { width: "74%" },
  c6Name: { fontSize: 9, color: C.ink, fontWeight: 700, marginBottom: 1 },
  c6Meta: { fontSize: 7.5, color: C.gray, fontWeight: 400, lineHeight: 1.35 },
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
  colFeature: { width: "16%", fontSize: 9.5, color: C.ink, fontWeight: 700, paddingRight: 10 },
  colTaag: { width: "18%", fontSize: 9.5, color: C.red, fontWeight: 400, paddingRight: 14 },
  colImpact: { width: "30%", fontSize: 8.5, color: C.gray, paddingRight: 24, lineHeight: 1.4, fontWeight: 400 },
  colComp: { width: "17%", fontSize: 8.5, color: "#6B7280", fontWeight: 400, paddingRight: 14 },
  colCompLast: { width: "17%", fontSize: 8.5, color: "#6B7280", fontWeight: 400 },
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

export default function ProductBriefDocument({ data }: { data: ValueBriefData }) {
  const plant = data.pdfPlant && data.pdfPlant.length ? data.pdfPlant : data.plant;
  const lab = data.pdfLab && data.pdfLab.length ? data.pdfLab : data.lab;
  const hasComparison = data.comparisonRows.length > 0;
  const hasFormats = data.presentations.length > 0;
  const hasRelated = data.relatedProducts.length > 0;

  return (
    <Document>
      {/* ───────── CARA 1: COVER full-bleed — image is the protagonist ───────── */}
      <Page size={{ width: 1080, height: 612 }}>
        <View style={styles.cover}>
          <Image src="/hero_brochure.png" style={styles.coverImg} />
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
        <Text style={styles.pageTitle}>Kit description and highlights</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: description — modal description, prefixed with the kit name */}
          <View style={styles.descCol}>
            {data.description && (
              <Text style={styles.descText}>
                The {data.name} is {startsWithVowel(data.description) ? "an" : "a"} {lowerFirst(data.description)}
                {data.isAigor ? " It is powered by AiGOR\u2122, TAAG's RNA-based detection technology." : ""}
              </Text>
            )}
          </View>
          {/* Col 2: 4 highlight cards (light gray; title, description, red icon at bottom) */}
          <View style={styles.hlCol}>
            <View style={styles.hlGrid2}>
              {data.highlights.map((h, i) => (
                <View key={i} style={styles.hlCard2}>
                  <Text style={styles.hlCard2Title}>{h.title}</Text>
                  <Text style={styles.hlCard2Sub}>{h.pdfText ?? h.subtitle}</Text>
                  <Image src="/logo-red1.png" style={styles.hlCard2Icon} />
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
        <Text style={styles.pageTitle}>Why it matters</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: intro */}
          <View style={styles.descCol}>
            <Text style={styles.colHeading}>For your plant</Text>
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
        <Text style={styles.pageTitle}>Why it matters</Text>
        <View style={[styles.threeCol, { marginTop: 24 }]}>
          {/* Col 1: intro */}
          <View style={styles.descCol}>
            <Text style={styles.colHeading}>For your lab</Text>
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
        <Text style={styles.pageTitleWhite}>How it compares</Text>
        <Text style={styles.pageLedeWhite}>TAAG versus leading PCR and traditional culture methods.</Text>
        {hasComparison && (
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colFeature, styles.th]}>Feature</Text>
              <Text style={[styles.colTaag, styles.thRed]}>TAAG</Text>
              <Text style={[styles.colImpact, styles.th]}>Business Impact</Text>
              <Text style={[styles.colComp, styles.thMute]}>Leading PCR</Text>
              <Text style={[styles.colCompLast, styles.thMuteLast]}>Traditional</Text>
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
        <Text style={styles.pageTitle}>Formats & products</Text>
        <View style={styles.c6Cols}>
          {/* COLUMN 1 */}
          <View style={styles.c6Col}>
            {/* Formats card */}
            <View style={styles.c6CardTop}>
              <Text style={styles.listHeading}>Formats</Text>
              {data.presentations.map((pr, i) => (
                <View key={i} style={styles.c6Row}>
                  <Text style={styles.c6Cat}>Cat #{pr.catalogCode ?? "—"}</Text>
                  <View style={styles.c6RowMain}>
                    <Text style={styles.c6Name}>{data.name}</Text>
                    <Text style={styles.c6Meta}>{[pr.format, pr.size].filter(Boolean).join(" · ") || "—"}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Additional supplies card */}
            <View style={styles.c6CardBottom}>
              <Text style={styles.listHeading}>Additional supplies</Text>
              {data.relatedProducts.map((r, i) => (
                <View key={i} style={styles.c6Row}>
                  <Text style={styles.c6Cat}>Cat #{r.cat}</Text>
                  <View style={styles.c6RowMain}>
                    <Text style={styles.c6Name}>{r.name}</Text>
                    {(r.format || r.size) && <Text style={styles.c6Meta}>{[r.format, r.size].filter(Boolean).join(" · ")}</Text>}
                    {r.note && <Text style={styles.c6Meta}>{r.note}</Text>}
                  </View>
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
