import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api",
        port: "",
        pathname: "/placeholder/**",
      },
    ],
  },
};

export default nextConfig;
