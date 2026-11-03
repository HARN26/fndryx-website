import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  baseOpenGraph,
  baseTwitter,
  rssAlternateTypes,
} from "@/lib/shared-metadata";
import SiteAnalytics from "@/components/SiteAnalytics";
import "./globals.css";

// Fonts are self-hosted from @fontsource packages (the Google Fonts files),
// so builds never depend on reaching Google. Syne and DM Sans are variable
// fonts: one file each covers every weight the site uses (homepage and
// Journal), so three small files load instead of thirteen. Paths must be
// literal strings.
const syne = localFont({
  src: "../../node_modules/@fontsource-variable/syne/files/syne-latin-wght-normal.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
});

const dmSans = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  variable: "--font-body",
});

const playfair = localFont({
  src: "../../node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-serif",
});

const SITE_URL = "https://fndryx.io";
const SITE_TITLE = "FNDRYx — The readiness record for early-stage capital";
const SITE_DESCRIPTION =
  "FNDRYx helps founders build a readiness record: a structured assessment, a founder report built from their own answers and, with consent, check-ins every 21 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — FNDRYx",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "FNDRYx" }],
  // Site-wide fields only. og:url is set per page; og:title/description fall
  // back to each page's own title/description, so none of them live here.
  openGraph: baseOpenGraph,
  twitter: baseTwitter,
  robots: {
    index: true,
    follow: true,
  },
  // No canonical here: every child would inherit it. Each indexable page sets
  // its own; the RSS entry stays so pages without `alternates` keep it.
  alternates: {
    types: rssAlternateTypes,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fndryx.io/#organization",
      name: "FNDRYx, Inc.",
      url: "https://fndryx.io",
      // /icon is 32px; Google wants a logo at least 112px wide.
      logo: {
        "@type": "ImageObject",
        url: "https://fndryx.io/apple-icon",
        width: 180,
        height: 180,
      },
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: "727 Madison Ave, Suite 45",
        addressLocality: "Covington",
        addressRegion: "KY",
        postalCode: "41011",
        addressCountry: "US",
      },
      sameAs: ["https://www.linkedin.com/company/109594033"],
    },
    {
      "@type": "WebSite",
      "@id": "https://fndryx.io/#website",
      url: "https://fndryx.io",
      name: "FNDRYx",
      description: SITE_DESCRIPTION,
      publisher: { "@id": "https://fndryx.io/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-fire-400 focus-visible:text-steel-900 focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-md focus-visible:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
        >
          Skip to content
        </a>
        <script
          key="ld-json-organization-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
