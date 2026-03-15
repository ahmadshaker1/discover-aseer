import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tool-portal.discoveraseer.com",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "dmmo-website-asda.oss-me-central-1.aliyuncs.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
