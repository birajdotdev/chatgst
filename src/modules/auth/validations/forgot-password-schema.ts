import { z } from "zod";

import {
  emailField,
  otpField,
  passwordField,
  requiredString,
} from "@/modules/auth/validations/helpers";

/**
 * Schema for requesting password reset OTP
 */
export const forgotPasswordSchema = z.object({
  email: emailField(),
});

/**
 * Schema for verifying OTP during password reset
 */
export const verifyResetOtpSchema = z.object({
  otp: otpField(),
});

/**
 * Schema for resetting password with new password
 */
export const resetPasswordSchema = z
  .object({
    password: passwordField(),
    confirmPassword: requiredString(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * TypeScript types
 */
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetOtpSchema = z.infer<typeof verifyResetOtpSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
