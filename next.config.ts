import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
