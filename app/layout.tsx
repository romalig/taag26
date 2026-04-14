import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocaleProvider } from "./contexts/LocaleContext";
import { CTAProvider } from "./components/CTAProvider";
import BookMeetingModal from "./components/BookMeetingModal";
import { ModalProvider } from "./components/industrial/ModalProvider";
import SolutionModal from "./components/industrial/SolutionModal";
import OrganizationJsonLd from "./seo/OrganizationJsonLd";
import { getMetadataBase, siteUrl } from "./seo/site";

const sora = Sora({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: "--font-sora",
});

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "TAAG | Advanced microbiological solutions",
    template: "%s | TAAG",
  },
  description:
    "TAAG delivers molecular diagnostics, laboratory services, and intelligent software to detect microbiological risk before it becomes a problem.",
  keywords: [
    "TAAG",
    "microbiology",
    "molecular diagnostics",
    "food safety",
    "AiGOR",
    "TxA",
    "MILA",
    "PCR",
    "NGS",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TAAG",
    title: "TAAG | Advanced microbiological solutions",
    description:
      "Molecular testing, lab services, and software for industrial and food safety microbiology.",
    locale: "en_US",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "TAAG" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAAG | Advanced microbiological solutions",
    description:
      "Molecular testing, lab services, and software for industrial and food safety microbiology.",
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sora.className} antialiased`}>
        <OrganizationJsonLd />
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