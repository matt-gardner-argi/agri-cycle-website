import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { IS_PRODUCTION_HOST, PRODUCTION_URL, site } from "@/content/site";
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
  applicationName: site.name,
  authors: [{ name: site.legalName, url: PRODUCTION_URL }],
  // Every page sets its own `alternates.canonical`; this is the fallback for
  // any route that forgets to, and it always points at the production domain.
  alternates: { canonical: "/" },
  /**
   * An explicit robots directive rather than relying on the crawler default.
   * Staging and preview hosts serve `noindex, nofollow` so they can never rank
   * against production — see `IS_PRODUCTION_HOST` in `src/content/site.ts`.
   */
  robots: IS_PRODUCTION_HOST
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Agri-Cycle — Food Full Circle",
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agri-Cycle — Food Full Circle",
    description: site.description,
  },
  icons: { icon: "/img/site/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#071711",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organization + WebSite structured data. Search engines use it for the
 * knowledge panel; agents and assistants use it to answer "who are they, where
 * are they, how do I contact them" without having to parse the page.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${PRODUCTION_URL}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: PRODUCTION_URL,
      logo: `${PRODUCTION_URL}/img/site/logo-mark.png`,
      description: site.description,
      foundingDate: "2013",
      slogan: site.tagline,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      sameAs: site.social.map((s) => s.href),
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "WebSite",
      "@id": `${PRODUCTION_URL}/#website`,
      url: PRODUCTION_URL,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${PRODUCTION_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // Serialised server-side from a literal we control; no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ScrollProgress />
        <Header />
        {/* `tabIndex={-1}` so the skip link actually moves focus here. Without it
            only the sequential-focus starting point moves, which Chrome honours
            and other browsers do not. */}
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
