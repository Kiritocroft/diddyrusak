import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Meningkatkan batas ukuran body untuk upload file besar
    }
  }
};

export default nextConfig;
