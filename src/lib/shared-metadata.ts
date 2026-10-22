// Metadata merges shallowly: a page that sets `alternates` replaces the root
// layout's whole object. Spread this into every page-level `alternates` so the
// RSS auto-discovery <link> survives alongside the page's own canonical.
export const rssAlternateTypes = {
  "application/rss+xml": [
    { url: "https://fndryx.io/feed.xml", title: "FNDRYx Journal" },
  ],
};
