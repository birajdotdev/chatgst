import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import "server-only";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    redirect("/login");
  }

  return { accessToken, refreshToken };
});

export const isAuthenticated = cache(async () => {
  const session = await verifySession();
  return !!session;
});
