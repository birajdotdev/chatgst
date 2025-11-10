import { z } from "zod";

import { emailField, passwordField } from "@/modules/auth/validations/helpers";

/**
 * Login schema for user authentication
 */
export const loginSchema = z.object({
  email: emailField(),
  password: passwordField(),
});

/**
 * TypeScript type for login form data
 */
export type LoginInput = z.infer<typeof loginSchema>;
