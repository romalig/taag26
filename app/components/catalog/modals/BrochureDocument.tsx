"use client";

import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

Font.register({
  family: "Sora",
  fonts: [
    { src: "/fonts/Sora-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sora-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", fontFamily: "Sora", color: "#374151" },
  
  heroContainer: { position: "relative", height: 220, width: "100%", backgroundColor: "#111111" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 },
  headerLogo: { position: "absolute", top: 30, left: 40, width: 90 },
  
  content: { padding: 40, paddingTop: 30 },
  
  title: { fontSize: 24, color: "#111111", fontWeight: "bold", marginBottom: 10, lineHeight: 1.2 },
  subtitle: { fontSize: 11, color: "#FF270A", fontWeight: "bold", marginBottom: 25, textTransform: "uppercase", letterSpacing: 1 },
  
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: "#111111", marginBottom: 12, borderBottomWidth: 1, borderBottomColor: "#E5E7EB", paddingBottom: 6, marginTop: 10 },
  description: { fontSize: 10, lineHeight: 1.6, color: "#4B5563", marginBottom: 25, textAlign: "justify" },

  row: { flexDirection: "row", gap: 15, marginBottom: 25 },
  colHalf: { flex: 1 },
  
  advBox: { backgroundColor: "#F9FAFB", padding: 12, borderRadius: 6, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#FF270A" },
  advText: { fontSize: 9, color: "#111111", fontWeight: "bold", lineHeight: 1.4 },

  table: { width: "100%", marginTop: 10, marginBottom: 25 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#111111", paddingVertical: 8, paddingHorizontal: 4 },
  tableRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB", paddingVertical: 8, paddingHorizontal: 4 },
  th: { fontSize: 8, fontWeight: "bold", color: "#111111", textTransform: "uppercase", letterSpacing: 1 },
  td: { fontSize: 8, color: "#4B5563", lineHeight: 1.5 },

  productCard: { flexDirection: "row", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 6, padding: 12, marginBottom: 8 },
  productName: { fontSize: 10, fontWeight: "bold", color: "#111111", width: "40%" },
  productDesc: { fontSize: 9, color: "#6B7280", width: "60%", lineHeight: 1.4 },

  txaBox: { backgroundColor: "#F9FAFB", padding: 20, borderRadius: 8, marginTop: 10, alignItems: "center", textAlign: "center" },

  footer: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, backgroundColor: "#111111", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 40 },
  footerText: { fontSize: 8, color: "#9CA3AF" },
  footerLogo: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" }
});

export default function BrochureDocument({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          {data.heroImage && <Image src={data.heroImage} style={styles.heroImage} />}
          <Image src="/logo-red1.png" style={styles.headerLogo} /> 
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          
          <Text style={styles.subtitle}>Featured Solution</Text>
          <Text style={styles.title}>{data.title}</Text>
          
          <Text style={styles.sectionTitle}>Solution Overview</Text>
          <Text style={styles.description}>{data.description}</Text>

          {/* ELEVIA PRODUCTS */}
          {data.eleviaProducts && (
            <View wrap={false} style={{ marginBottom: 25 }}>
              <Text style={styles.sectionTitle}>Welcome to the future. Meet Elevia Products.</Text>
              <Text style={{ fontSize: 9, color: "#4B5563", marginBottom: 15, lineHeight: 1.5 }}>{data.eleviaProducts.intro}</Text>
              
              {data.eleviaProducts.main.map((prod: any, i: number) => (
                 <View key={`main-${i}`} style={styles.productCard} wrap={false}>
                    <Text style={styles.productName}>{prod.title}</Text>
                    <Text style={styles.productDesc}>{prod.desc}</Text>
                 </View>
              ))}
              {data.eleviaProducts.upcoming.map((prod: any, i: number) => (
                 <View key={`up-${i}`} style={styles.productCard} wrap={false}>
                    <Text style={styles.productName}>{prod.title}</Text>
                    <View style={{ width: "60%" }}>
                      <Text style={[styles.productDesc, { width: "100%" }]}>{prod.desc}</Text>
                      <Text style={{ fontSize: 7, color: "#FF270A", marginTop: 4, fontWeight: "bold" }}>{prod.launch}</Text>
                    </View>
                 </View>
              ))}
            </View>
          )}

          {/* ADVANTAGES (2 Columns) */}
          <Text style={styles.sectionTitle}>Key Advantages</Text>
          <View style={styles.row}>
            <View style={styles.colHalf}>
               {data.advantages && data.advantages.slice(0, 3).map((adv: string, i: number) => (
                  <View key={i} style={styles.advBox}>
                    <Text style={styles.advText}>{adv}</Text>
                  </View>
               ))}
            </View>
            <View style={styles.colHalf}>
               {data.advantages && data.advantages.slice(3, 6).map((adv: string, i: number) => (
                  <View key={i} style={styles.advBox}>
                    <Text style={styles.advText}>{adv}</Text>
                  </View>
               ))}
            </View>
          </View>

          {/* PROTOCOLS TABLE */}
          {data.protocolsTable && (
            <View wrap={false}>
               <Text style={styles.sectionTitle}>Protocol zero vs. Protocol xpress</Text>
               <View style={styles.table}>
                  <View style={styles.tableHeader}>
                     <Text style={[styles.th, { width: "30%" }]}>Feature</Text>
                     <Text style={[styles.th, { width: "35%" }]}>PROTOCOL ZERO</Text>
                     <Text style={[styles.th, { width: "35%" }]}>PROTOCOL XPRESS</Text>
                  </View>
                  {data.protocolsTable.map((row: any, i: number) => (
                     <View key={i} style={styles.tableRow} wrap={false}>
                        <Text style={[styles.td, { width: "30%", fontWeight: "bold", color: "#111111" }]}>{row.feature}</Text>
                        <Text style={[styles.td, { width: "35%", paddingRight: 10 }]}>{row.zero}</Text>
                        <Text style={[styles.td, { width: "35%", paddingRight: 10 }]}>{row.xpress}</Text>
                     </View>
                  ))}
               </View>
            </View>
          )}

          {/* TxA SECTION IN PDF */}
          {data.txaSection && (
             <View wrap={false} style={styles.txaBox}>
                <Image src={data.txaSection.logo} style={{ width: 80, marginBottom: 12 }} />
                <Text style={{ fontSize: 13, fontWeight: "bold", color: "#111111", marginBottom: 8 }}>TAAG Xpert Assistant.</Text>
                <Text style={{ fontSize: 13, fontWeight: "bold", color: "#111111", marginBottom: 10 }}>Your AI-powered ecosystem.</Text>
                <Text style={{ fontSize: 9, color: "#4B5563", lineHeight: 1.5, width: "80%" }}>{data.txaSection.desc}</Text>
             </View>
          )}

        </View>

        {/* FOOTER */}
        <View style={styles.footer} fixed>
           <Text style={styles.footerLogo}>TAAG</Text>
           <Text style={styles.footerText}>www.taag.bio  |  support@taag.bio</Text>
        </View>

      </Page>
    </Document>
  );
}