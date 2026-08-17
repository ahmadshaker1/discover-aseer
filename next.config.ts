import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Standalone is for Docker/Coolify. On Vercel it breaks Next 16.3
  // (ENOENT .next/next-server.js.nft.json in onBuildComplete).
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
