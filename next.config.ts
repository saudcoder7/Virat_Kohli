import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages for compatibility
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
