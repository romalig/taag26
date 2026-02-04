"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { SolutionContent } from "./SolutionTemplate";

// NOTA: Usamos Helvetica por seguridad. 
// Si deseas usar Sora, debes descargar los archivos .ttf y ponerlos en tu carpeta /public/fonts/
// y luego registrarlos con Font.register({ family: 'Sora', src: '/fonts/Sora-Regular.ttf' })

const styles = StyleSheet.create({
  // Usamos Helvetica para evitar el error "Unknown font format"
  page: { padding: 40, paddingBottom: 60, paddingTop: 40, fontFamily: "Helvetica", fontSize: 9, color: "#374151" },
  
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

export default function DatasheetDocument({ data }: { data: SolutionContent }) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        
        {/* --- HEADER --- */}
        <View style={styles.header} fixed>
          <Image src="/logo-red1.png" style={styles.logoImage} /> 
          <View style={styles.headerMeta}>
             <Text style={styles.headerTitle}>Technical Data Sheet</Text>
             <Text style={{ fontSize: 7, color: "#D1D5DB", marginTop: 2, textAlign: "right" }}>Rev. {new Date().getFullYear()}.01</Text>
          </View>
        </View>

        {/* --- TITLE BLOCK --- */}
        <View style={styles.titleContainer}>
           <View style={styles.titleAccent} />
           <Text style={styles.title}>{data.title}</Text>
        </View>

        {/* --- DESCRIPTION --- */}
        <View style={styles.section}>
           {data.description.map((p, i) => <Text key={i} style={styles.text}>{p}</Text>)}
        </View>

        {/* --- TWO COLUMNS LAYOUT --- */}
        <View style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Main Industries</Text>
                {data.mainIndustries.map((ind, i) => <Text key={i} style={styles.listItem}>• {ind}</Text>)}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Intended Use</Text>
                {data.intendedUse.map((use, i) => <Text key={i} style={styles.text}>{use}</Text>)}
            </View>
        </View>

        {/* --- PRINCIPLE --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Principle</Text>
            {data.principle.map((pr, i) => <Text key={i} style={styles.text}>{pr}</Text>)}
        </View>

        {/* --- SPECS --- */}
        <View style={styles.section} break>
             <Text style={styles.sectionTitle}>Technical Specifications</Text>
             <View style={styles.specContainer}>
                <SpecRow label="Targets" value={data.techSpecs.targets} />
                <SpecRow label="Limit of Detection (LOD)" value={data.techSpecs.lod} />
                <SpecRow label="Validated Matrices" value={data.techSpecs.matrices} />
                <SpecRow label="Time to Results" value={data.techSpecs.time} />
                <SpecRow label="Technology" value={data.techSpecs.technology} />
                <SpecRow label="Validated Thermocyclers" value={data.techSpecs.thermocyclers} />
                <SpecRow label="Detection Channels" value={data.techSpecs.channels} />
                <SpecRow label="Detection Chemistry" value={data.techSpecs.chemistry} />
                <SpecRow label="Storage Conditions" value={data.techSpecs.storage} />
                <SpecRow label="Shelf Life" value={data.techSpecs.shelfLife} />
                <SpecRow label="Certifications" value={data.techSpecs.certifications} />
             </View>
        </View>

        {/* --- LIMITATIONS --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Limitations</Text>
            {data.limitations.map((lim, i) => <Text key={i} style={styles.listItem}>• {lim}</Text>)}
        </View>

        {/* --- ORDER INFO --- */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]} break>Order Information</Text>
        <View style={styles.table}>
           <View style={styles.tableHeader} fixed>
              <Text style={[styles.th, styles.colCat]}>Cat. Num</Text>
              <Text style={[styles.th, styles.colName]}>Name</Text>
              <Text style={[styles.th, styles.colSize]}>Size</Text>
              <Text style={[styles.th, styles.colFormat]}>Format</Text>
              <Text style={[styles.th, styles.colDesc]}>Description</Text>
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
              <Text style={styles.sectionTitle}>Order Information – Additional Supplies</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader} fixed>
                    <Text style={[styles.th, styles.colCat]}>Cat. Num</Text>
                    <Text style={[styles.th, styles.colName]}>Name</Text>
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

        {/* --- FOOTER --- */}
        <View style={styles.footer} fixed>
           <View>
              <Text style={styles.footerText}>support@taag-genetics.com</Text>
              <Text style={styles.footerText}>www.taag-genetics.com</Text>
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
  <View style={styles.specRow}>
     <Text style={styles.specLabel}>{label}</Text>
     <Text style={styles.specValue}>{value}</Text>
  </View>
);