import { z } from "zod";

/**
 * Helper to create required string fields with consistent error message
 * @param message - Custom error message (defaults to "This field is required")
 * @returns Zod string schema with min(1), trim, and custom message
 */
export const requiredString = (message = "This field is required") =>
  z.string().min(1, { message }).trim();

/**
 * Helper to create optional string fields
 * @returns Zod string schema that's optional with trim
 */
export const optionalString = () => z.string().trim().optional();

/**
 * Helper to create optional boolean fields
 * @returns Zod boolean schema that's optional
 */
export const optionalBoolean = () => z.boolean().optional();

/**
 * Helper for email validation
 * @returns Zod email schema with lowercase and trim
 */
export const emailField = () => z.email().toLowerCase().trim();

/**
 * Helper for password validation (8-100 characters, must contain uppercase and lowercase)
 * @returns Zod string schema for password validation
 */
export const passwordField = () =>
  z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .trim();
