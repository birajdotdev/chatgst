import { cookies } from "next/headers";

import {
  RESET_SESSION_COOKIE_NAME,
  RESET_SESSION_MAX_AGE,
} from "@/modules/auth/constants/reset-session";

/**
 * Retrieves the reset session cookie.
 */
export async function getResetSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(RESET_SESSION_COOKIE_NAME);
}

/**
 * Sets the reset session cookie with secure attributes.
 */
export async function setResetSessionCookie(value: string) {
  const cookieStore = await cookies();
  cookieStore.set(RESET_SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    maxAge: RESET_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Deletes the reset session cookie.
 */
export async function deleteResetSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(RESET_SESSION_COOKIE_NAME);
}

/**
 * Parses the reset_session_id value from a Set-Cookie header.
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
 */
export function createCookieHeader(value: string): string {
  return `${RESET_SESSION_COOKIE_NAME}=${value}`;
}
