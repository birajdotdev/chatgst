import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "vinxi/http";
import { z } from "zod";

import { env } from "@/env";

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

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(`${env.API_URL}/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData: LoginErrorResponse = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const responseData: LoginResponse = await res.json();

    // Set session cookies
    setCookie("access_token", responseData.data.access_token, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    setCookie("refresh_token", responseData.data.refresh_token, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      message: responseData.message,
    };
  });
