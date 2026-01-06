"use server";

import { revalidatePath } from "next/cache";

import z from "zod";

import { env } from "@/env";
import { protectedActionClient } from "@/lib/safe-action";

export const toggleIssueSelectionAction = protectedActionClient
  .inputSchema(
    z.object({
      issueId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    try {
      const res = await fetch(
        `${env.API_URL}/documents/potential-issues/${parsedInput.issueId}/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ctx.accessToken}`,
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
