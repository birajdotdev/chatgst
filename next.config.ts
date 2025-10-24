import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};

export default nextConfig;
