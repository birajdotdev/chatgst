"use server";

import { returnValidationErrors } from "next-safe-action";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import {
  createCookieHeader,
  deleteResetSessionCookie,
  getResetSessionCookie,
  parseSetCookieHeader,
  setResetSessionCookie,
} from "@/modules/auth/lib/reset-session";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyResetOtpSchema,
} from "@/modules/auth/validations/forgot-password-schema";

/**
 * Sends an OTP to the user's email for password reset.
 */
export const forgotPasswordAction = actionClient
  .inputSchema(forgotPasswordSchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${env.API_URL}/forget-password/send-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const errorData = await res.json();

      // Return field-level validation error for email
      returnValidationErrors(forgotPasswordSchema, {
        email: {
          _errors: [
            errorData.detail || "Failed to send OTP. Please try again.",
          ],
        },
      });
    }

    // Parse and set the reset session cookie from response
    const setCookieHeader = res.headers.get("Set-Cookie");
    const sessionId = parseSetCookieHeader(setCookieHeader);

    if (sessionId) {
      await setResetSessionCookie(sessionId);
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "OTP sent successfully!",
    };
  });

/**
 * Verifies the OTP entered by the user during password reset.
 */
export const verifyResetOtpAction = actionClient
  .inputSchema(verifyResetOtpSchema)
  .action(async ({ parsedInput }) => {
    const resetSessionCookie = await getResetSessionCookie();

    if (!resetSessionCookie) {
      // Return form-level error for session expiration
      returnValidationErrors(verifyResetOtpSchema, {
        _errors: ["Session expired. Please request a new OTP."],
      });
    }

    const res = await fetch(`${env.API_URL}/forget-password/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: createCookieHeader(resetSessionCookie.value),
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const errorData = await res.json();

      // Return field-level validation error for OTP
      returnValidationErrors(verifyResetOtpSchema, {
        otp: {
          _errors: [errorData.detail || "Invalid OTP. Please try again."],
        },
      });
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "OTP verified successfully!",
    };
  });

/**
 * Resets the user's password with a new password.
 */
export const resetPasswordAction = actionClient
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const resetSessionCookie = await getResetSessionCookie();

    if (!resetSessionCookie) {
      // Return form-level error for session expiration
      returnValidationErrors(resetPasswordSchema, {
        _errors: [
          "Session expired. Please start the password reset process again.",
        ],
      });
    }

    const res = await fetch(`${env.API_URL}/forget-password/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: createCookieHeader(resetSessionCookie.value),
      },
      body: JSON.stringify({
        new_password: parsedInput.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();

      // Return field-level validation error for password
      returnValidationErrors(resetPasswordSchema, {
        password: {
          _errors: [
            errorData.detail || "Failed to reset password. Please try again.",
          ],
        },
      });
    }

    // Clear the reset session cookie after successful password reset
    await deleteResetSessionCookie();

    const data = await res.json();
    return {
      success: true,
      message:
        data.message ||
        "Password reset successfully! Please login with your new password.",
    };
  });
