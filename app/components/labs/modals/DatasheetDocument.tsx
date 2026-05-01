"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { SolutionContent } from "./types";
import { hasDisplayValue } from "@/app/lib/spec-values";
import { formatPdfInline } from "@/app/lib/pdf-inline-format";

export type DatasheetPdfLabels = {
  technicalDataSheet: string;
  targetType: string;
  mainIndustries: string;
  intendedUse: string;
  principle: string;
  technicalSpecifications: string;
  targets: string;
  sensitivity: string;
  validatedMatrices: string;
  timeToResults: string;
  technology: string;
  validatedThermocyclers: string;
  detectionChannels: string;
  detectionChemistry: string;
  storageConditions: string;
  shelfLife: string;
  certifications: string;
  limitations: string;
  orderInformation: string;
  catNum: string;
  name: string;
  size: string;
  format: string;
  description: string;
  orderInformationAdditionalSupplies: string;
  pageOf: (page: number, total: number) => string;
};

// 1. REGISTRO DE FUENTE SORA (Localmente para evitar errores)
Font.register({
  family: "Sora",
  fonts: [
    { src: "/fonts/Sora-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sora-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  // Usamos Sora
  page: { padding: 40, paddingBottom: 60, paddingTop: 40, fontFamily: "Sora", fontSize: 9, color: "#374151" },
  
  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30, paddingBottom: 15, borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB" },
  logoImage: { width: 80, height: "auto" }, 
  headerMeta: { textAlign: "right" },
  headerTitle: { fontSize: 8, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 2, fontWeight: "bold" },
  
  // Title Section
  titleContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  titleAccent: { width: 4, height: 24, backgroundColor: "#FF270A", marginRight: 10, borderRadius: 2 },
  title: { fontSize: 24, color: "#111111", fontWeight: "bold" },
  
  // Sections
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", color: "#FF270A", marginBottom: 5, marginTop: 14, textTransform: "uppercase", letterSpacing: 0.5 },
  
  text: { fontSize: 9, lineHeight: 1.6, color: "#4B5563", marginBottom: 4, textAlign: "justify" },
  listItem: { fontSize: 9, lineHeight: 1.6, color: "#4B5563", marginLeft: 10 },

  // Specs Grid
  specContainer: { borderTopWidth: 0.5, borderTopColor: "#E5E7EB", marginTop: 5 },
  specRow: { flexDirection: "row", paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: "#F3F4F6" },
  specLabel: { width: "35%", fontSize: 8, fontWeight: "bold", color: "#374151", textTransform: "uppercase" },
  specValue: { width: "65%", fontSize: 9, color: "#111111" },

  // Tables
  table: { width: "100%", marginTop: 5, marginBottom: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#F9FAFB", paddingVertical: 6, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  tableRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#F3F4F6", paddingVertical: 6, paddingHorizontal: 4 },
  th: { fontSize: 7, color: "#111111", fontWeight: "bold", textTransform: "uppercase" },
  td: { fontSize: 8, color: "#4B5563" },
  
  // Column Widths
  colCat: { width: "18%", color: "#FF270A", fontWeight: "bold" },
  colName: { width: "22%", fontWeight: "bold", color: "#111111" },
  colSize: { width: "15%" },
  colFormat: { width: "15%" },
  colDesc: { width: "30%" },

  // Footer
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, borderTopWidth: 0.5, borderTopColor: "#E5E7EB", paddingTop: 10, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7, color: "#9CA3AF" }
});

export default function DatasheetDocument({ data, labels }: { data: SolutionContent; labels: DatasheetPdfLabels }) {
  const showSensitivity = hasDisplayValue(data.techSpecs.sensitivity);
  const showTargetType = hasDisplayValue(data.targetType);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        
        {/* --- HEADER --- */}
        <View style={styles.header} fixed>
          <Image src="/logo-red1.png" style={styles.logoImage} /> 
          <View style={styles.headerMeta}>
             <Text style={styles.headerTitle}>{labels.technicalDataSheet}</Text>
             <Text style={{ fontSize: 7, color: "#D1D5DB", marginTop: 2, textAlign: "right" }}>{new Date().getFullYear()}.01</Text>
          </View>
        </View>

        {/* --- TITLE BLOCK --- */}
        <View style={styles.titleContainer}>
           <View style={styles.titleAccent} />
           <Text style={styles.title}>{data.title}</Text>
        </View>

        {/* --- DESCRIPTION --- */}
        {showTargetType && (
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>{labels.targetType}</Text>
             <Text style={styles.text}>{formatPdfInline(data.targetType ?? "")}</Text>
          </View>
        )}

        {/* --- DESCRIPTION --- */}
        <View style={styles.section}>
           {data.description.map((p, i) => <Text key={i} style={styles.text}>{p}</Text>)}
        </View>

        {/* --- TWO COLUMNS LAYOUT --- */}
        <View style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>{labels.mainIndustries}</Text>
                {data.mainIndustries.map((ind, i) => <Text key={i} style={styles.listItem}>• {ind}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>{labels.intendedUse}</Text>
                {data.intendedUse.map((use, i) => <Text key={i} style={styles.text}>{use}</Text>)}
            </View>
        </View>

        {/* --- PRINCIPLE --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.principle}</Text>
            {data.principle.map((pr, i) => <Text key={i} style={styles.text}>{pr}</Text>)}
        </View>

        {/* --- SPECS --- */}
        <View style={styles.section} break>
             <Text style={styles.sectionTitle}>{labels.technicalSpecifications}</Text>
             <View style={styles.specContainer}>
                <SpecRow label={labels.targets} value={formatPdfInline(data.techSpecs.targets)} />
                {showSensitivity && <SpecRow label={labels.sensitivity} value={formatPdfInline(data.techSpecs.sensitivity)} />}
                <SpecRow label={labels.validatedMatrices} value={formatPdfInline(data.techSpecs.matrices)} />
                <SpecRow label={labels.timeToResults} value={formatPdfInline(data.techSpecs.time)} />
                <SpecRow label={labels.technology} value={formatPdfInline(data.techSpecs.technology)} />
                <SpecRow label={labels.validatedThermocyclers} value={formatPdfInline(data.techSpecs.thermocyclers)} />
                <SpecRow label={labels.detectionChannels} value={formatPdfInline(data.techSpecs.channels)} />
                <SpecRow label={labels.detectionChemistry} value={formatPdfInline(data.techSpecs.chemistry)} />
                <SpecRow label={labels.storageConditions} value={formatPdfInline(data.techSpecs.storage)} />
                <SpecRow label={labels.shelfLife} value={formatPdfInline(data.techSpecs.shelfLife)} />
                <SpecRow label={labels.certifications} value={formatPdfInline(data.techSpecs.certifications)} />
             </View>
        </View>

        {/* --- LIMITATIONS --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.limitations}</Text>
            {data.limitations.map((lim, i) => <Text key={i} style={styles.listItem}>• {lim}</Text>)}
        </View>

        {/* --- ORDER INFO --- */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]} break>{labels.orderInformation}</Text>
        <View style={styles.table}>
           <View style={styles.tableHeader} fixed>
              <Text style={[styles.th, styles.colCat]}>{labels.catNum}</Text>
              <Text style={[styles.th, styles.colName]}>{labels.name}</Text>
              <Text style={[styles.th, styles.colSize]}>{labels.size}</Text>
              <Text style={[styles.th, styles.colFormat]}>{labels.format}</Text>
              <Text style={[styles.th, styles.colDesc]}>{labels.description}</Text>
           </View>
           {data.pcrKits.map((row, i) => (
             <View key={i} style={styles.tableRow} wrap={false}>
                <Text style={[styles.td, styles.colCat]}>{row.cat}</Text>
                <Text style={[styles.td, styles.colName]}>{row.name}</Text>
                <Text style={[styles.td, styles.colSize]}>{row.size}</Text>
                <Text style={[styles.td, styles.colFormat]}>{row.format}</Text>
                <Text style={[styles.td, styles.colDesc]}>{row.desc}</Text>
             </View>
           ))}
        </View>

        {/* --- SUPPLIES --- */}
        {data.supplies && data.supplies.length > 0 && (
            <View break={data.pcrKits.length > 5}> 
              <Text style={styles.sectionTitle}>{labels.orderInformationAdditionalSupplies}</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader} fixed>
                    <Text style={[styles.th, styles.colCat]}>{labels.catNum}</Text>
                    <Text style={[styles.th, styles.colName]}>{labels.name}</Text>
                    <Text style={[styles.th, styles.colSize]}>{labels.size}</Text>
                    <Text style={[styles.th, styles.colFormat]}>{labels.format}</Text>
                    <Text style={[styles.th, styles.colDesc]}>{labels.description}</Text>
                </View>
                {data.supplies.map((row, i) => (
                    <View key={i} style={styles.tableRow} wrap={false}>
                        <Text style={[styles.td, styles.colCat]}>{row.cat}</Text>
                        <Text style={[styles.td, styles.colName]}>{row.name}</Text>
                        <Text style={[styles.td, styles.colSize]}>{row.size}</Text>
                        <Text style={[styles.td, styles.colFormat]}>{row.format}</Text>
                        <Text style={[styles.td, styles.colDesc]}>{row.desc}</Text>
                    </View>
                ))}
              </View>
            </View>
        )}

        {/* --- FOOTER --- */}
        <View style={styles.footer} fixed>
           <View>
              <Text style={styles.footerText}>support@taag-genetics.com</Text>
              <Text style={styles.footerText}>www.taag-genetics.com</Text>
           </View>
           <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
              labels.pageOf(pageNumber, totalPages)
            )} fixed />
        </View>

      </Page>
    </Document>
  );
}

const SpecRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <View style={styles.specRow}>
     <Text style={styles.specLabel}>{label}</Text>
     <Text style={styles.specValue}>{value}</Text>
  </View>
);
