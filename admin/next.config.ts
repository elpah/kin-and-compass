import path from "path";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

loadEnvConfig(path.join(__dirname, ".."));

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  outputFileTracingRoot: path.join(__dirname, ".."),
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 14,
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost", port: "4000" },
    ],
  },
};

export default nextConfig;
