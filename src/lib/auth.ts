import { cookies } from "next/headers";
import { cache } from "react";

import "server-only";

import { env } from "@/env";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
});

export const isAuthenticated = cache(async () => {
  const session = await verifySession();
  return !!session;
});

export const getUserProfile = cache(async () => {
  const session = await verifySession();
  if (!session?.accessToken) {
    return null;
  }

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

  const profile: UserProfile = await res.json();
  return profile;
});

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
