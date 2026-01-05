"use server";

import { redirect } from "next/navigation";

import { env } from "@/env";
import { protectedActionClient } from "@/lib/safe-action";
import { deleteSession } from "@/lib/session";

import { resetPasswordSchema } from "../validations/reset-password-schema";

export const resetPasswordAction = protectedActionClient
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
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

    // Clear session after password reset
    await deleteSession();

    // Redirect to login page
    redirect("/login");
  });
