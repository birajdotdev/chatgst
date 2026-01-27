import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "vinxi/http";
import { type z } from "zod";

import { env } from "@/env";
import {
  RESET_SESSION_COOKIE_NAME,
  RESET_SESSION_MAX_AGE,
} from "@/modules/auth/constants/reset-session";
import {
  createCookieHeader,
  parseSetCookieHeader,
} from "@/modules/auth/lib/reset-session";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyResetOtpSchema,
} from "@/modules/auth/validations/forgot-password-schema";

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetOtpInput = z.infer<typeof verifyResetOtpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Sends an OTP to the user's email for password reset.
 */
export const forgotPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => forgotPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(`${env.API_URL}/forget-password/send-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Failed to send OTP. Please try again."
      );
    }

    // Parse and set the reset session cookie from response
    const setCookieHeader = res.headers.get("Set-Cookie");
    const sessionId = parseSetCookieHeader(setCookieHeader);

    if (sessionId) {
      setCookie(RESET_SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,
        maxAge: RESET_SESSION_MAX_AGE,
        path: "/",
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
      });
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData.message || "OTP sent successfully!",
    };
  });

/**
 * Verifies the OTP entered by the user during password reset.
 */
export const verifyResetOtpFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => verifyResetOtpSchema.parse(data))
  .handler(async ({ data }) => {
    const resetSessionValue = getCookie(RESET_SESSION_COOKIE_NAME);

    if (!resetSessionValue) {
      throw new Error("Session expired. Please request a new OTP.");
    }

    const res = await fetch(`${env.API_URL}/forget-password/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: createCookieHeader(resetSessionValue),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Invalid OTP. Please try again.");
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData.message || "OTP verified successfully!",
    };
  });

/**
 * Resets the user's password with a new password.
 */
export const resetPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => resetPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const resetSessionValue = getCookie(RESET_SESSION_COOKIE_NAME);

    if (!resetSessionValue) {
      throw new Error(
        "Session expired. Please start the password reset process again."
      );
    }

    const res = await fetch(`${env.API_URL}/forget-password/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: createCookieHeader(resetSessionValue),
      },
      body: JSON.stringify({
        new_password: data.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        typeof errorData.detail === "string"
          ? errorData.detail
          : "Failed to reset password. Please try again."
      );
    }

    // Clear the reset session cookie after successful password reset
    deleteCookie(RESET_SESSION_COOKIE_NAME);

    const responseData = await res.json();
    return {
      success: true,
      message:
        responseData.message ||
        "Password reset successfully! Please login with your new password.",
    };
  });
