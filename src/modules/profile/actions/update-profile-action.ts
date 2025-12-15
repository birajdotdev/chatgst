"use server";

import { revalidatePath } from "next/cache";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { updateProfileSchema } from "../validations/profile-schema";

export const updateProfileAction = actionClient
  .inputSchema(updateProfileSchema)
  .action(async ({ parsedInput }) => {
    const session = await verifySession();
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    // Exclude email and other non-API fields from the payload

    const {
      email,
      terms_and_privacy_policy,
      receive_updates_or_newsletter,
      ...payload
    } = parsedInput;

    const res = await fetch(`${env.API_URL}/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || "Failed to update profile"
      );
    }

    const data = await res.json();

    revalidatePath("/profile");

    return {
      success: true,
      data,
      message: "Profile updated successfully",
    };
  });
