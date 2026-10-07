import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/capital-partners", destination: "/", permanent: false },
      { source: "/accelerators", destination: "/", permanent: false },
      { source: "/raise-right", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
