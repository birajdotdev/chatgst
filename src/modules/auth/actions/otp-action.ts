"use server";

import { cookies } from "next/headers";

import { returnValidationErrors } from "next-safe-action";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import {
  sendOtpSchema,
  verifyOtpSchema,
} from "@/modules/auth/validations/otp-schema";

/**
 * Sends an OTP to the user's email.
 */
export const sendOtpAction = actionClient
  .inputSchema(sendOtpSchema)
  .action(async ({ parsedInput }) => {
    const params = new URLSearchParams(parsedInput);
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
export const verifyOtpAction = actionClient
  .inputSchema(verifyOtpSchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${env.API_URL}/register/otp/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const errorData = await res.json();

      return returnValidationErrors(verifyOtpSchema, {
        otp: {
          _errors: [
            typeof errorData.detail === "string"
              ? errorData.detail
              : "OTP verification failed. Please try again.",
          ],
        },
      });
    }

    const cookieStore = await cookies();
    const storedData = cookieStore.get("pendingRegistration")?.value;

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

    cookieStore.delete("pendingRegistration");

    return {
      success: true,
      message: "Account created successfully!",
    };
  });
