import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cloud.appwrite.io"],
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;