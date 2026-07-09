import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.resolve(),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
