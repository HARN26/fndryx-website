import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/unsubscribe",
        destination:
          "https://xcesazshfinwsdqyndlg.supabase.co/functions/v1/unsubscribe",
      },
    ];
  },
};

export default nextConfig;
