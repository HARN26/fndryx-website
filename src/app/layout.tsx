import type { Metadata } from "next";
import { Syne, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const SITE_URL = "https://fndryx.io";
const SITE_TITLE = "FNDRYx — The Capital-Readiness Exchange";
const SITE_DESCRIPTION =
  "Exchange infrastructure where founder signals compound over time. We connect qualified founders to aligned capital, systematically.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — FNDRYx",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "capital-readiness",
    "founder forge",
    "venture capital",
    "startup funding",
    "capital exchange",
    "investor matching",
  ],
  authors: [{ name: "FNDRYx" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "FNDRYx",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fndryx.io/#organization",
      name: "FNDRYx",
      url: "https://fndryx.io",
      logo: {
        "@type": "ImageObject",
        url: "https://fndryx.io/icon",
      },
      description:
        "Exchange infrastructure where founder signals compound over time. We connect qualified founders to aligned capital, systematically.",
      sameAs: ["https://www.linkedin.com/company/fndryx"],
    },
    {
      "@type": "WebSite",
      "@id": "https://fndryx.io/#website",
      url: "https://fndryx.io",
      name: "FNDRYx",
      description: "The Capital-Readiness Exchange",
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
      </body>
    </html>
  );
}
