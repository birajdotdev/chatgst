import { z } from "zod";

/**
 * Helper to create required string fields with consistent error message
 * @returns Zod string schema with min(1), trim, and custom message
 */
export const requiredString = () =>
  z
    .string()
    .check(z.minLength(1, { error: "This field is required" }))
    .check(z.trim());

/**
 * Helper to create optional string fields
 * @returns Zod string schema that's optional with trim
 */
export const optionalString = () => z.string().check(z.trim()).optional();

/**
 * Helper to create optional boolean fields
 * @returns Zod boolean schema that's optional
 */
export const optionalBoolean = () => z.boolean().optional();

/**
 * Helper for email validation
 * @returns Zod email schema with lowercase and trim
 */
export const emailField = () =>
  z
    .string()
    .check(z.minLength(1, { error: "This field is required" }))
    .check(z.email())
    .check(z.toLowerCase())
    .check(z.trim());

/**
 * Helper for password validation (8-100 characters, must contain uppercase and lowercase)
 * @returns Zod string schema for password validation
 */
export const passwordField = () =>
  z
    .string()
    .check(z.minLength(1, { error: "This field is required" }))
    .check(
      z.minLength(8, { error: "Password must be at least 8 characters long" })
    )
    .check(
      z.maxLength(100, {
        error: "Password must be at most 100 characters long",
      })
    )
    .check(
      z.regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
      })
    )
    .check(
      z.regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter",
      })
    )
    .check(z.trim());

/**
 * Helper for select fields using enums
 * @param values - Array of valid string values
 * @returns Zod enum schema with provided values and custom error message
 */
export const selectField = <T extends string>(values: readonly T[]) =>
  z.enum(values as [T, ...T[]], {
    error: "Please select a valid option",
  });

/**
 * Helper for OTP validation (exactly 6 digits, numeric only)
 * @returns Zod string schema for OTP validation
 */
export const otpField = () =>
  z
    .string()
    .check(z.length(6, "OTP must be exactly 6 digits"))
    .check(z.regex(/^\d+$/, "OTP must contain only numbers"));
