"use server";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import { createSession } from "@/lib/session";

import { loginSchema } from "../validations/login-schema";

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

interface LoginErrorResponse {
  detail: string;
}

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${env.API_URL}/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const errorData: LoginErrorResponse = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data: LoginResponse = await res.json();

    // Use centralized session management
    await createSession({
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    });

    return {
      success: true,
      message: data.message,
    };
  });
