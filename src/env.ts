import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    API_URL: z.string().url(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
