"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { actionClient } from "@/lib/safe-action";

export const logoutAction = actionClient.action(async () => {
  const cookieStore = await cookies();

  // Delete authentication cookies
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/");
});
