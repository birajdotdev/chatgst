import { z } from "zod";

import { requiredString } from "@/modules/auth/validations/helpers";

/**
 * Login schema for user authentication
 */
export const loginSchema = z.object({
  email: requiredString(),
  password: requiredString(),
});

export const refreshTokenSchema = z.object({
  refresh_token: requiredString(),
});

/**
 * TypeScript type for login form data
 */
export type LoginSchema = z.infer<typeof loginSchema>;
