"use server";

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

    console.log("Parsed Input", parsedInput);

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
        console.log("Error:", errorData);
        throw new Error(
          errorData.detail || "Error occurred while updating the document"
        );
      }

      await res.json();

      // Redirect to view mode - automatically fetches fresh data
      redirect(`/appeal-draft?step=2&documentId=${parsedInput.id}`);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Unexpected error occurred!");
    }
  });
