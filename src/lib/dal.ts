import { redirect } from "@tanstack/react-router";

import { env } from "@/env";

import {
  deleteSessionFn,
  getSessionFn,
  verifySessionFn,
} from "./session.server";

export interface VerifiedSession {
  accessToken: string;
  refreshToken: string;
}

/**
 * Verify session and auto-refresh if needed.
 * Throws redirect to login if session is invalid.
 *
 * Use this in server functions where you need to ensure the user is authenticated.
 *
 * @throws Redirects to /login if not authenticated
 */
export async function verifySession(): Promise<VerifiedSession> {
  const session = await verifySessionFn();

  if (!session) {
    throw redirect({ to: "/login" });
  }

  return session;
}

/**
 * Get session without redirect (for optional auth scenarios).
 * Returns null if not authenticated.
 *
 * Use this in layouts or components where authentication is optional,
 * such as showing different UI for logged-in vs anonymous users.
 */
export async function getOptionalSession(): Promise<VerifiedSession | null> {
  const session = await verifySessionFn();
  return session;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  gstin: string;
  business_name: string;
  constitution_of_business: string;
  state_or_jurisdiction: string;
  user_type: string;
  organization_name: string;
  designation?: string;
  professional_registration_number?: string;
  address?: string;
  pincode?: string;
  alternate_email_or_phone?: string;
}

/**
 * Get user profile (requires authentication).
 * Redirects to login if not authenticated.
 *
 * Use this when you need user data and the user must be logged in.
 */
export async function getUser(): Promise<UserProfile | null> {
  const session = await verifySession();

  try {
    const res = await fetch(`${env.API_URL}/profile/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

/**
 * Get user profile optionally (for mixed auth scenarios).
 * Returns null if not authenticated or profile fetch fails.
 *
 * Use this in layouts where you want to show user info if logged in,
 * but not require authentication.
 */
export async function getOptionalUser(): Promise<UserProfile | null> {
  const session = await getOptionalSession();

  if (!session) {
    return null;
  }

  try {
    const res = await fetch(`${env.API_URL}/profile/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

// Re-export session utilities for backward compatibility
export { deleteSessionFn, getSessionFn };
