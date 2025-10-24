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
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
