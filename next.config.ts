import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dev-cv',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
