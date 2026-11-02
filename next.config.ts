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
    ];
  },
};

export default nextConfig;
