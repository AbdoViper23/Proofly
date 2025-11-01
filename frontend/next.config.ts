import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_DFX_NETWORK: process.env.DFX_NETWORK,
    NEXT_PUBLIC_CANISTER_ID_BACKEND: process.env.CANISTER_ID_BACKEND,
  },
};

export default nextConfig;
