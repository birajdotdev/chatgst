"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { updateDocumentSchema } from "@/modules/appeal-draft/validations/extracted-details-schema";

export const updateDocumentAction = actionClient
  .inputSchema(updateDocumentSchema)
  .action(async ({ parsedInput }) => {
    const session = await verifySession();
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    try {
      const res = await fetch(`${env.API_URL}/document/${parsedInput.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while updating the document"
        );
      }

      await res.json();

      // Immediately invalidate document cache for read-your-own-writes
      updateTag(`document-${parsedInput.id}`);

      // Revalidate the page to ensure fresh data on redirect
      revalidatePath("/appeal-draft", "page");

      // Redirect to view mode
      redirect(`/appeal-draft?step=2&documentId=${parsedInput.id}`);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Unexpected error occurred!");
    }
  });
