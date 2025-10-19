import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod/v4";

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  validatePassword,
} from "@/lib/password-requirements";

export const loginSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name is too long" })
      .trim(),
    middleName: z.string().max(50).trim().optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name is too long" })
      .trim(),
    email: z.email().toLowerCase().trim(),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .refine((val) => isValidPhoneNumber(val), {
        message: "Please enter a valid phone number",
      }),
    city: z.string().trim().optional(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `Password must be no more than ${PASSWORD_MAX_LENGTH} characters long`,
      })
      .refine(
        (val) => {
          const result = validatePassword(val);
          return result.isValid;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)",
        }
      ),
    confirmPassword: z.string(),
    organizationName: z
      .string()
      .min(1, { message: "Organization name is required" })
      .trim(),
    designation: z
      .string()
      .min(1, { message: "Designation is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
