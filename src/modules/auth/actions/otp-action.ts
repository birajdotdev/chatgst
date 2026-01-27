import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie } from "vinxi/http";
import { z } from "zod";

import { env } from "@/env";
import {
  sendOtpSchema,
  verifyOtpSchema,
} from "@/modules/auth/validations/otp-schema";

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

/**
 * Sends an OTP to the user's email.
 */
export const sendOtpFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => sendOtpSchema.parse(data))
  .handler(async ({ data }) => {
    const params = new URLSearchParams(data);
    const res = await fetch(
      `${env.API_URL}/register/otp/?${params.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        typeof errorData.detail === "string"
          ? errorData.detail
          : "Failed to send OTP. Please try again."
      );
    }

    return {
      success: true,
      message: "OTP sent successfully! Please check your email.",
    };
  });

/**
 * Verifies the OTP entered by the user and creates the account.
 */
export const verifyOtpFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => verifyOtpSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(`${env.API_URL}/register/otp/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        typeof errorData.detail === "string"
          ? errorData.detail
          : "OTP verification failed. Please try again."
      );
    }

    const storedData = getCookie("pendingRegistration");

    if (!storedData) {
      throw new Error(
        "Registration data not found. Please start the registration process again."
      );
    }

    const registrationData = JSON.parse(storedData);

    const registerRes = await fetch(`${env.API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (!registerRes.ok) {
      const errorData = await registerRes.json();
      throw new Error(
        errorData.detail || "Account creation failed. Please try again."
      );
    }

    deleteCookie("pendingRegistration");

    return {
      success: true,
      message: "Account created successfully!",
    };
  });
