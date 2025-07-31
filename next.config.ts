import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "srv30.mikr.us",
        port: "30209",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
