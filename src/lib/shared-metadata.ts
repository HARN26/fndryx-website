// Metadata merges shallowly: a page that sets `alternates` replaces the root
// layout's whole object. Spread this into every page-level `alternates` so the
// RSS auto-discovery <link> survives alongside the page's own canonical.
// Same shallow merge applies to `openGraph`. Spread this into every page-level
// `openGraph` so site-wide fields survive. Never add `images` here: a segment
// whose `openGraph` has an `images` key suppresses its opengraph-image route.
// og:title/description fall back to the page's own title/description.
export const baseOpenGraph = {
  type: "website" as const,
  siteName: "FNDRYx",
  locale: "en_US",
};

export const rssAlternateTypes = {
  "application/rss+xml": [
    { url: "https://fndryx.io/feed.xml", title: "FNDRYx Journal" },
  ],
};
