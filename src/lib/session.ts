import { cookies } from "next/headers";

import { decodeJwt } from "jose";
import "server-only";

import { env } from "@/env";

// Types
export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  exp: number;
  iat: number;
  user_id?: string;
  [key: string]: unknown;
}

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/**
 * Decode a JWT token without verification (backend owns the secret).
 * This is safe because we only use the decoded data for expiry checks,
 * and actual authorization happens on the backend.
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return decodeJwt(token) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired.
 * Adds a 10 second buffer for clock skew.
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  // Add 10 second buffer for clock skew
  return Date.now() >= payload.exp * 1000 - 10000;
}

/**
 * Get current session tokens from cookies.
 * Returns null if either token is missing.
 */
export async function getSession(): Promise<SessionTokens | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

/**
 * Create a new session by storing tokens in httpOnly cookies.
 * Called after successful login.
 */
export async function createSession(tokens: SessionTokens): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("access_token", tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24, // 24 hours
  });

  cookieStore.set("refresh_token", tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Update only the access token cookie (after token refresh).
 */
export async function updateAccessToken(accessToken: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

/**
 * Delete the session by removing all auth cookies.
 * Called on logout or when session is invalid.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

/**
 * Refresh the access token using the refresh token.
 * Returns the new access token or null if refresh failed.
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const res = await fetch(`${env.API_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data.access_token;
  } catch {
    return null;
  }
}
