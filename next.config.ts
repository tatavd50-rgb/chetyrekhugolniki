import type { NextConfig } from "next";

const basePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : process.env.NODE_ENV === "production"
      ? "/quadrilaterals-site"
      : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  ...(basePath && {
    basePath,
    assetPrefix: basePath,
  }),

  allowedDevOrigins: ["*"],
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverSourceMaps: false,
    turbopackSourceMaps: false,
  },
};

export default nextConfig;
