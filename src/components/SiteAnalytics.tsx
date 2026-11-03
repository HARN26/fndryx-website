"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Vercel Web Analytics (added Nov 2, 2026, approved by Kevin). Counts page
// views without cookies. Turn it on in Vercel → Project → Analytics; until
// then the script is served but nothing is recorded. It records nothing in
// local development.
//
// Privacy guard: the unsubscribe links carry a personal token in the URL, so
// those pages are never sent, and every other URL is sent without its query
// string (?...) or #fragment.
function stripPersonalBits(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url);
  if (url.pathname.startsWith("/unsubscribe")) return null;
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
}

export default function SiteAnalytics() {
  return <Analytics beforeSend={stripPersonalBits} />;
}
