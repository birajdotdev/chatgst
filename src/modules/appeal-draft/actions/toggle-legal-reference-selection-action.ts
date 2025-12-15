"use server";

import { revalidatePath } from "next/cache";

import z from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const toggleLegalReferenceSelectionAction = actionClient
  .inputSchema(
    z.object({
      sectionId: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const session = await verifySession();
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    try {
      const res = await fetch(
        `${env.API_URL}/documents/references/sections/${parsedInput.sectionId}/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while toggling issue selection"
        );
      }

      revalidatePath("/appeal-draft");

      return { success: true };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Unexpected error occurred!");
    }
  });
