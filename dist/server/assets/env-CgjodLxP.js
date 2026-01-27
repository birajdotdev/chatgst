import { z } from "zod";
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  VITE_API_URL: z.string().url()
});
const parsed = envSchema.safeParse({
  NODE_ENV: "production",
  VITE_API_URL: void 0
});
if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}
const env = {
  NODE_ENV: parsed.data.NODE_ENV,
  API_URL: parsed.data.VITE_API_URL
};
export {
  env as e
};
