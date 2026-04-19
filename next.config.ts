import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    LARRY_CONTRACT_ADDRESS: process.env.LARRY_CONTRACT_ADDRESS,
  },
  allowedDevOrigins: ['172.20.10.6'],
};

export default nextConfig;
