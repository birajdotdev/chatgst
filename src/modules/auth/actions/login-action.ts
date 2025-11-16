"use server";

import { cookies } from "next/headers";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import {
  loginSchema,
  refreshTokenSchema,
} from "@/modules/auth/validations/login-schema";

interface LoginSuccessResponse {
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

    const data: LoginSuccessResponse = await res.json();
    const { access_token, refresh_token } = data.data;

    // Store tokens in httpOnly cookies
    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return {
      success: true,
      message: data.message,
    };
  });

interface RefreshTokenSuccessResponse {
  message: string;
  data: {
    access_token: string;
  };
}

interface RefreshTokenErrorResponse {
  detail: string;
}

export const refreshTokenAction = actionClient
  .inputSchema(refreshTokenSchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${env.API_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      const errorData: RefreshTokenErrorResponse = await res.json();
      throw new Error(errorData.detail || "Token refresh failed");
    }

    const data: RefreshTokenSuccessResponse = await res.json();

    // Update access token in httpOnly cookie
    const cookieStore = await cookies();

    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return {
      success: true,
      message: data.message,
    };
  });
