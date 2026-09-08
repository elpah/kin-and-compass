import path from "path";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

loadEnvConfig(path.join(__dirname, ".."));

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  async redirects() {
    return [
      { source: "/stores", destination: "/store", permanent: true },
      { source: "/stores/:path*", destination: "/store/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
