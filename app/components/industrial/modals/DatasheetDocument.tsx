"use client";

import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { SolutionContent } from "./types";

Font.register({
  family: "Sora",
  fonts: [
    { src: "/fonts/Sora-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sora-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 40, paddingBottom: 60, paddingTop: 40, fontFamily: "Sora", fontSize: 9, color: "#374151" },
  
  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30, paddingBottom: 15, borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB" },
  logoImage: { width: 80, objectFit: "contain" }, 
  headerMeta: { textAlign: "right" },
  headerTitle: { fontSize: 8, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 2, fontWeight: "bold" },
  
  // Title Section
  titleContainer: { marginBottom: 4 },
  title: { fontSize: 24, color: "#111111", fontWeight: "bold" },
  versionText: { fontSize: 9, color: "#9CA3AF", marginBottom: 15 },
  
  // Chips (Más espacio abajo)
  chipsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginBottom: 35 },
  chip: { backgroundColor: "#F3F4F6", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, fontSize: 7, color: "#4B5563", fontWeight: "bold", textTransform: "uppercase" },

  // Metrics Grid (Más padding y más margin inferior)
  metricsGrid: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB", paddingBottom: 20, marginBottom: 30 },
  metricCol: { flex: 1, paddingRight: 10 },
  metricLabel: { fontSize: 7, color: "#9CA3AF", textTransform: "uppercase", fontWeight: "bold", marginBottom: 4, letterSpacing: 1 },
  metricValue: { fontSize: 10, color: "#111111", fontWeight: "bold" },

  // Sections & Layout (Margen ampliado entre bloques paralelos)
  row: { flexDirection: "row", gap: 20, marginBottom: 30, alignItems: "flex-start" },
  col23: { flex: 2, paddingRight: 15 },
  col13: { flex: 1 },
  colHalf: { flex: 1 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", color: "#111111", marginBottom: 10 },
  text: { fontSize: 9, lineHeight: 1.6, color: "#4B5563", marginBottom: 6, textAlign: "justify" },
  
  // Boxes
  boxGray: { backgroundColor: "#F9FAFB", padding: 12, borderRadius: 8, borderWidth: 0.5, borderColor: "#E5E7EB" },
  boxOrange: { backgroundColor: "#FFF7ED", padding: 12, borderRadius: 8, borderWidth: 0.5, borderColor: "#FFEDD5" },
  boxTitle: { fontSize: 8, fontWeight: "bold", color: "#111111", textTransform: "uppercase", marginBottom: 6, letterSpacing: 1 },
  boxTitleOrange: { fontSize: 8, fontWeight: "bold", color: "#EA580C", textTransform: "uppercase", marginBottom: 6, letterSpacing: 1 },
  
  // Bullets
  bulletRow: { flexDirection: "row", marginBottom: 5 },
  bulletIcon: { fontSize: 8, color: "#4B5563", marginRight: 4 },
  bulletIconOrange: { fontSize: 8, color: "#EA580C", marginRight: 4 },
  bulletText: { fontSize: 8, lineHeight: 1.5, color: "#4B5563", flex: 1 },
  bulletTextOrange: { fontSize: 8, lineHeight: 1.5, color: "#C2410C", flex: 1 },

  // Specs Table
  specContainer: { borderTopWidth: 0.5, borderTopColor: "#E5E7EB", marginTop: 5 },
  specRow: { flexDirection: "row", paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: "#F3F4F6" },
  specLabel: { width: "35%", fontSize: 8, fontWeight: "bold", color: "#6B7280" },
  specValue: { width: "65%", fontSize: 9, color: "#111111" },

  // Storage Sub-labels
  subLabel: { fontSize: 7, fontWeight: "bold", color: "#9CA3AF", textTransform: "uppercase", marginTop: 8, marginBottom: 2, letterSpacing: 1 },

  // Product Tables (Aumentado el espacio alrededor de las tablas)
  table: { width: "100%", marginTop: 8, marginBottom: 30 },
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

export default function DatasheetDocument({ data }: { data: SolutionContent }) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        
        {/* HEADER */}
        <View style={styles.header} fixed>
          <Image src="/logo-red1.png" style={styles.logoImage} /> 
          <View style={styles.headerMeta}>
             <Text style={styles.headerTitle}>Technical Data Sheet</Text>
          </View>
        </View>

        {/* TITLE BLOCK */}
        <View style={styles.titleContainer}>
           <Text style={styles.title}>{data.title}</Text>
        </View>
        
        {/* VERSIÓN */}
        {data.version && (
           <Text style={styles.versionText}>Rev. {data.version}</Text>
        )}

        {/* CHIPS */}
        <View style={styles.chipsContainer}>
           {data.chips.map((chip, i) => <Text key={i} style={styles.chip}>{chip}</Text>)}
        </View>

        {/* METRICS GRID */}
        <View style={styles.metricsGrid}>
           <View style={styles.metricCol}>
              <Text style={styles.metricLabel}>Targets</Text>
              <Text style={styles.metricValue}>{data.techSpecs.targets}</Text>
           </View>
           <View style={styles.metricCol}>
              <Text style={styles.metricLabel}>LOD</Text>
              <Text style={styles.metricValue}>{data.techSpecs.lod}</Text>
           </View>
           <View style={styles.metricCol}>
              <Text style={styles.metricLabel}>Main Industries</Text>
              <Text style={styles.metricValue}>{data.mainIndustries.slice(0, 3).join(", ")}</Text>
           </View>
        </View>

        {/* INTENDED USE & ADVANTAGES */}
        <View style={styles.row}>
           <View style={styles.col23}>
              <Text style={styles.sectionTitle}>Intended Use</Text>
              {data.intendedUse.map((p, i) => <Text key={i} style={styles.text}>{p}</Text>)}
           </View>
           <View style={styles.col13}>
              <View style={styles.boxGray}>
                 <Text style={styles.boxTitle}>Key Advantages</Text>
                 {data.advantages.map((adv, i) => (
                    <View key={i} style={styles.bulletRow} wrap={false}>
                       <Text style={styles.bulletIcon}>•</Text>
                       <Text style={styles.bulletText}>{adv}</Text>
                    </View>
                 ))}
              </View>
           </View>
        </View>

        {/* PRINCIPLE (Mayor separación) */}
        <View style={{ marginBottom: 30 }}>
            <Text style={styles.sectionTitle}>Principle</Text>
            {data.principle.map((pr, i) => <Text key={i} style={styles.text}>{pr}</Text>)}
        </View>

        {/* INDUSTRIES & LIMITATIONS */}
        <View style={styles.row}>
           <View style={styles.colHalf}>
              <Text style={styles.sectionTitle}>Industries</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                 {data.mainIndustries.map((ind, i) => <Text key={i} style={styles.chip}>{ind}</Text>)}
              </View>
           </View>
           <View style={styles.colHalf}>
              <View style={styles.boxOrange}>
                 <Text style={styles.boxTitleOrange}>Limitations</Text>
                 {data.limitations.map((lim, i) => (
                    <View key={i} style={styles.bulletRow} wrap={false}>
                       <Text style={styles.bulletIconOrange}>•</Text>
                       <Text style={styles.bulletTextOrange}>{lim}</Text>
                    </View>
                 ))}
              </View>
           </View>
        </View>

        {/* TECH SPECS (Mayor separación) */}
        <View style={{ marginBottom: 30 }}>
             <Text style={styles.sectionTitle}>Technical Specifications</Text>
             <View style={styles.specContainer}>
                <SpecRow label="Microorganisms" value={data.techSpecs.targets} />
                <SpecRow label="Performance (LOD)" value={data.techSpecs.lod} />
                <SpecRow label="Validated Matrices" value={data.techSpecs.matrices} />
                <SpecRow label="Time" value={data.techSpecs.time} />
                <SpecRow label="Technology" value={data.techSpecs.technology} />
                <SpecRow label="Validated Thermocyclers" value={data.techSpecs.thermocyclers} />
                <SpecRow label="Detection Chemistry" value={data.techSpecs.chemistry} />
                <SpecRow label="Detection Channel" value={data.techSpecs.channels} />
             </View>
        </View>

        {/* STORAGE & CERTIFICATIONS */}
        <View style={styles.row}>
           <View style={styles.colHalf}>
              <View style={styles.boxGray}>
                 <Text style={styles.boxTitle}>Storage Conditions</Text>
                 <Text style={styles.subLabel}>Temperature</Text>
                 <Text style={styles.text}>{data.techSpecs.storage}</Text>
                 <Text style={styles.subLabel}>Shelf Life</Text>
                 <Text style={styles.text}>{data.techSpecs.shelfLife}</Text>
              </View>
           </View>
           <View style={styles.colHalf}>
              <View style={styles.boxGray}>
                 <Text style={styles.boxTitle}>Certifications</Text>
                 <Text style={styles.text}>{data.techSpecs.certifications}</Text>
                 {data.certImage && <Image src={data.certImage} style={{ width: 60, marginTop: 5, objectFit: "contain" }} />}
              </View>
           </View>
        </View>

        {/* ORDER INFO KITS (Margen superior agregado) */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Order Information</Text>
        <View style={styles.table}>
           <View style={styles.tableHeader} fixed>
              <Text style={[styles.th, styles.colCat]}>Cat. No</Text>
              <Text style={[styles.th, styles.colName]}>Name</Text>
              <Text style={[styles.th, styles.colSize]}>Size</Text>
              <Text style={[styles.th, styles.colFormat]}>Format</Text>
              <Text style={[styles.th, styles.colDesc]}>Kit Content</Text>
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

        {/* SUPPLIES */}
        {data.supplies && data.supplies.length > 0 && (
            <View wrap={false}> 
              <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Additional Supplies</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader} fixed>
                    <Text style={[styles.th, styles.colCat]}>Cat. No</Text>
                    <Text style={[styles.th, styles.colName]}>Product</Text>
                    <Text style={[styles.th, styles.colSize]}>Size</Text>
                    <Text style={[styles.th, styles.colFormat]}>Format</Text>
                    <Text style={[styles.th, styles.colDesc]}>Description</Text>
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

        {/* FOOTER */}
        <View style={styles.footer} fixed>
           <View>
              <Text style={styles.footerText}>support@taag.bio</Text>
              <Text style={styles.footerText}>www.taag.bio</Text>
           </View>
           <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
              `Page ${pageNumber} of ${totalPages}`
            )} fixed />
        </View>

      </Page>
    </Document>
  );
}

const SpecRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.specRow} wrap={false}>
     <Text style={styles.specLabel}>{label}</Text>
     <Text style={styles.specValue}>{value}</Text>
  </View>
);