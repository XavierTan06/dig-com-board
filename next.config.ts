import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
}

export default nextConfig;
