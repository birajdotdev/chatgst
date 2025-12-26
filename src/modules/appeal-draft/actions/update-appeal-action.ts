"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

const updateAppealSchema = z.object({
  appealId: z.string(),
  appeal_name: z.string(),
  appeal_text: z.string(),
});

export const updateAppealAction = actionClient
  .inputSchema(updateAppealSchema)
  .action(async ({ parsedInput }) => {
    const session = await verifySession();
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    const { appealId, appeal_name, appeal_text } = parsedInput;

    try {
      const res = await fetch(`${env.API_URL}/documents/appeals/${appealId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          appeal_name,
          appeal_text,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while updating the appeal"
        );
      }

      revalidatePath(`/appeal-draft`);

      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Unexpected error occurred!");
    }
  });
