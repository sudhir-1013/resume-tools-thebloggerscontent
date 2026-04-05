import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@react-pdf/renderer"],
  serverExternalPackages: ["pdfjs-dist", "canvas"],
};

export default nextConfig;
