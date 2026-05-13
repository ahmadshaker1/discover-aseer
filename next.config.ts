import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale(ar|en)/Getting-here-and-around",
        destination: "/:locale/getting-here-and-around",
        permanent: true,
      },
    ];
  },
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
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
