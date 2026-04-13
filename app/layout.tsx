import type { Metadata } from "next";
import { Sora } from "next/font/google"; 
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./contexts/LocaleContext";
import { CTAProvider } from "./components/CTAProvider";
import BookMeetingModal from "./components/BookMeetingModal";
import { ModalProvider } from "./components/industrial/ModalProvider";
import SolutionModal from "./components/industrial/SolutionModal";

const sora = Sora({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "TAAG",
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
        <LocaleProvider defaultLocale="en">
          <CTAProvider>
            <ModalProvider>
              <Header theme="dark" />
              {children}
              <Footer />
              <BookMeetingModal />
              <SolutionModal />
            </ModalProvider>
          </CTAProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}