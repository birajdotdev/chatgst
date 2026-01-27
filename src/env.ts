/// <reference types="vite/client" />
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  VITE_API_URL: z.string().url(),
});

// Parse environment variables
const parsed = envSchema.safeParse({
  NODE_ENV: import.meta.env.MODE,
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = {
  NODE_ENV: parsed.data.NODE_ENV,
  API_URL: parsed.data.VITE_API_URL,
};
