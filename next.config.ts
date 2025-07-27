import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    LARRY_CONTRACT_ADDRESS: process.env.LARRY_CONTRACT_ADDRESS,
  },
  /* config options here */
};

export default nextConfig;
