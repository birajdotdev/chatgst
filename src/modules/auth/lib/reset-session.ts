import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "vinxi/http";

import { env } from "@/env";
import {
  RESET_SESSION_COOKIE_NAME,
  RESET_SESSION_MAX_AGE,
} from "@/modules/auth/constants/reset-session";

/**
 * Server function to retrieve the reset session cookie.
 */
export const getResetSessionCookieFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const value = getCookie(RESET_SESSION_COOKIE_NAME);
  return value ? { name: RESET_SESSION_COOKIE_NAME, value } : null;
});

/**
 * Server function to set the reset session cookie with secure attributes.
 */
export const setResetSessionCookieFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { value: string })
  .handler(async ({ data }) => {
    setCookie(RESET_SESSION_COOKIE_NAME, data.value, {
      httpOnly: true,
      maxAge: RESET_SESSION_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
    });
    return { success: true };
  });

/**
 * Server function to delete the reset session cookie.
 */
export const deleteResetSessionCookieFn = createServerFn({
  method: "POST",
}).handler(async () => {
  deleteCookie(RESET_SESSION_COOKIE_NAME);
  return { success: true };
});

/**
 * Parses the reset_session_id value from a Set-Cookie header.
 * This is a pure utility function - no cookie access needed.
 */
export function parseSetCookieHeader(
  setCookieHeader: string | null
): string | null {
  if (!setCookieHeader) return null;
  const match = setCookieHeader.match(/reset_session_id=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Creates a Cookie header string with the reset session ID.
 * This is a pure utility function - no cookie access needed.
 */
export function createCookieHeader(value: string): string {
  return `${RESET_SESSION_COOKIE_NAME}=${value}`;
}
