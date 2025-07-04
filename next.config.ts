import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
