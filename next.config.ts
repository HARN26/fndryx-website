import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old pages; their code was removed in Nov 2026, the redirects stay.
      { source: "/capital-partners", destination: "/", permanent: false },
      { source: "/accelerators", destination: "/", permanent: false },
      { source: "/raise-right", destination: "/", permanent: true },
      // Short link for slides and QR codes (cleared by Ted). After the Summit
      // (Dec 3, 2026) point it at "/" (PR 8).
      { source: "/grand-rapids", destination: "/#grand-rapids", permanent: false },
      // The Journal is down until the outlet launches (Kevin, Nov 4, 2026).
      // Temporary on purpose: remove these when pieces return as fresh releases.
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:path*", destination: "/", permanent: false },
      { source: "/feed.xml", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
