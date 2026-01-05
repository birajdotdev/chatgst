import { redirect } from "next/navigation";
import { cache } from "react";

import "server-only";

import { env } from "@/env";

import {
  deleteSession,
  getSession,
  isTokenExpired,
  refreshAccessToken,
  updateAccessToken,
} from "./session";

export interface VerifiedSession {
  accessToken: string;
  refreshToken: string;
}

/**
 * Verify session and auto-refresh if needed.
 * Redirects to login if session is invalid.
 *
 * Use this in Server Components, Route Handlers, and data fetching functions
 * where you need to ensure the user is authenticated.
 *
 * @throws Redirects to /login if not authenticated
 */
export const verifySession = cache(async (): Promise<VerifiedSession> => {
  const session = await getSession();

  // No session at all
  if (!session) {
    redirect("/login");
  }

  const { accessToken, refreshToken } = session;

  // Check if refresh token is expired (can't recover)
  if (isTokenExpired(refreshToken)) {
    await deleteSession();
    redirect("/login");
  }

  // Check if access token needs refresh
  if (isTokenExpired(accessToken)) {
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      // Refresh failed - session is invalid
      await deleteSession();
      redirect("/login");
    }

    // Update the cookie with new access token
    await updateAccessToken(newAccessToken);

    return {
      accessToken: newAccessToken,
      refreshToken,
    };
  }

  return {
    accessToken,
    refreshToken,
  };
});

/**
 * Get session without redirect (for optional auth scenarios).
 * Returns null if not authenticated.
 *
 * Use this in layouts or components where authentication is optional,
 * such as showing different UI for logged-in vs anonymous users.
 */
export const getOptionalSession = cache(
  async (): Promise<VerifiedSession | null> => {
    const session = await getSession();

    if (!session) {
      return null;
    }

    const { accessToken, refreshToken } = session;

    // Check if refresh token is expired
    if (isTokenExpired(refreshToken)) {
      await deleteSession();
      return null;
    }

    // Check if access token needs refresh
    if (isTokenExpired(accessToken)) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (!newAccessToken) {
        await deleteSession();
        return null;
      }

      await updateAccessToken(newAccessToken);

      return {
        accessToken: newAccessToken,
        refreshToken,
      };
    }

    return {
      accessToken,
      refreshToken,
    };
  }
);

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
export const getUser = cache(async (): Promise<UserProfile | null> => {
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
});

/**
 * Get user profile optionally (for mixed auth scenarios).
 * Returns null if not authenticated or profile fetch fails.
 *
 * Use this in layouts where you want to show user info if logged in,
 * but not require authentication.
 */
export const getOptionalUser = cache(async (): Promise<UserProfile | null> => {
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
});
