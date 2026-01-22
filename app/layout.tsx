import type { Metadata } from "next";
import { Sora } from "next/font/google"; 
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CTAProvider } from "./components/CTAProvider"; // <--- FIXED: Changed to Named Import
import BookMeetingModal from "./components/BookMeetingModal";

const sora = Sora({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "TAAG Genetics",
  description: "Advanced microbiological solutions.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sora.className} antialiased`}>
        <CTAProvider>
          <Header />
          {children}
          <Footer />
          <BookMeetingModal />
        </CTAProvider>
      </body>
    </html>
  );
}