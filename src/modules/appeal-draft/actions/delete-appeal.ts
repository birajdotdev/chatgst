"use server";

import { refresh, revalidateTag } from "next/cache";

import z from "zod";

import { env } from "@/env";
import { protectedActionClient } from "@/lib/safe-action";

const deleteAppealSchema = z.object({
  appealId: z.string(),
  documentId: z.string(),
});

export const deleteAppealAction = protectedActionClient
  .inputSchema(deleteAppealSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const res = await fetch(
        `${env.API_URL}/documents/appeals/${parsedInput.appealId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${ctx.accessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to delete appeal");
      }

      revalidateTag(`document-appeals-${parsedInput.documentId}`, "max");
      refresh();

      return { success: true, message: "Appeal deleted successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unexpected error occurred!");
    }
  });
