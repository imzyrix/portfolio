import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for Cloudflare Pages (no Node server)
  output: "export",
};

export default nextConfig;
