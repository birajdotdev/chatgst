import { z } from "zod";

import { api } from "@/lib/api";

import { loginSchema } from "../validations/login-schema";

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Login API call - sends credentials and receives tokens.
 * The tokens are stored in httpOnly cookies by the API route.
 */
export async function login(
  input: LoginInput
): Promise<{ success: boolean; message: string }> {
  // Call our API route which handles cookie setting server-side
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}
