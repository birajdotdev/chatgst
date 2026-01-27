import { z } from "zod";
import { e as emailField, b as otpField, r as requiredString, p as passwordField } from "./helpers-CIAyAvNc.js";
const forgotPasswordSchema = z.object({
  email: emailField()
});
const verifyResetOtpSchema = z.object({
  otp: otpField()
});
const resetPasswordSchema = z.object({
  password: passwordField(),
  confirmPassword: requiredString()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
export {
  forgotPasswordSchema as f,
  resetPasswordSchema as r,
  verifyResetOtpSchema as v
};
