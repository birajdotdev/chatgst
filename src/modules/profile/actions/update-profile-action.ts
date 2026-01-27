import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

import { updateProfileSchema } from "../validations/profile-schema";

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateProfileFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => updateProfileSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    // Exclude email and other non-API fields from the payload
    const {
      email,
      terms_and_privacy_policy,
      receive_updates_or_newsletter,
      ...payload
    } = data;

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

    const responseData = await res.json();

    return {
      success: true,
      data: responseData,
      message: "Profile updated successfully",
    };
  });
