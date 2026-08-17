import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Agri-Cycle — Sustainable Solutions in Food Waste Management",
    template: "%s | Agri-Cycle",
  },
  description: site.description,
  openGraph: {
    title: "Agri-Cycle — Food Full Circle",
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  icons: { icon: "/img/site/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#071711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
