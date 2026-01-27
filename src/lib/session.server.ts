import { createServerFn } from "@tanstack/react-start";
import { decodeJwt } from "jose";
import { deleteCookie, getCookie, setCookie } from "vinxi/http";

import { env } from "@/env";

// Auth debug logging - only logs in development
const DEBUG_AUTH = env.NODE_ENV === "development";

function authLog(level: "info" | "warn" | "error", message: string) {
  if (!DEBUG_AUTH) return;
  const prefix = "[Auth]";
  switch (level) {
    case "info":
      console.log(prefix, message);
      break;
    case "warn":
      console.warn(prefix, message);
      break;
    case "error":
      console.error(prefix, message);
      break;
  }
}

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
 */
function decodeToken(token: string): JWTPayload | null {
  try {
    return decodeJwt(token) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired.
 */
function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000 - 10000;
}

/**
 * Server function to get current session tokens from cookies.
 */
export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  }
);

/**
 * Server function to create a new session by storing tokens in httpOnly cookies.
 */
export const createSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as SessionTokens)
  .handler(async ({ data }) => {
    setCookie("access_token", data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    setCookie("refresh_token", data.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  });

/**
 * Server function to update only the access token cookie.
 */
export const updateAccessTokenFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { accessToken: string })
  .handler(async ({ data }) => {
    setCookie("access_token", data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  });

/**
 * Server function to delete the session by removing all auth cookies.
 */
export const deleteSessionFn = createServerFn({ method: "POST" }).handler(
  async () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");

    return { success: true };
  }
);

/**
 * Server function to verify session and get a valid access token.
 * Handles token refresh if needed.
 */
export const verifySessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    if (!accessToken || !refreshToken) {
      authLog("warn", "No session tokens found");
      return null;
    }

    // Check if access token is expired
    if (!isTokenExpired(accessToken)) {
      return { accessToken, refreshToken };
    }

    authLog("info", "Access token expired, attempting refresh");

    // Try to refresh the token
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
        authLog("warn", `Token refresh failed: ${res.status}`);
        // Clear invalid session
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        return null;
      }

      const data = await res.json();
      const newAccessToken = data.data.access_token;

      // Update the access token cookie
      setCookie("access_token", newAccessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24, // 24 hours
      });

      authLog("info", "Token refreshed successfully");
      return { accessToken: newAccessToken, refreshToken };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      authLog("error", `Network error during refresh: ${message}`);
      return null;
    }
  }
);
