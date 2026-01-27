import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { env } from "@/env";
import { deleteSessionFn, verifySession } from "@/lib/auth";

import { resetPasswordSchema } from "../validations/reset-password-schema";

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const resetProfilePasswordFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => resetPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    const { current_password, new_password } = data;

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
    await deleteSessionFn();

    return {
      success: true,
      message: "Password changed successfully! Please login again.",
    };
  });
