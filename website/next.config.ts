import path from "path";
import type { NextConfig } from "next";

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
