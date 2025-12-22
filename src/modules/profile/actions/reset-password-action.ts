"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { resetPasswordSchema } from "../validations/reset-password-schema";

export const resetPasswordAction = actionClient
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const session = await verifySession();
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    const { current_password, new_password } = parsedInput;

    const res = await fetch(`${env.API_URL}/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ current_password, new_password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || "Failed to reset password"
      );
    }

    // Clear cookies
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    // Redirect to login page
    redirect("/login");
  });
