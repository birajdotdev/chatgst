import { z } from "zod";

import { emailField, otpField } from "@/modules/auth/validations/helpers";

/**
 * Schema for sending OTP to email
 */
export const sendOtpSchema = z.object({
  email: emailField(),
});

/**
 * Verify OTP schema for email verification
 */
export const verifyOtpSchema = z.object({
  email: emailField(),
  otp: otpField(),
});

/**
 * TypeScript types
 */
export type SendOtpSchema = z.infer<typeof sendOtpSchema>;
export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
