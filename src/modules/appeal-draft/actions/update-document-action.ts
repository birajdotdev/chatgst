import { createServerFn } from "@tanstack/react-start";
import { type z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { updateDocumentSchema } from "@/modules/appeal-draft/validations/extracted-details-schema";

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;

export const updateDocumentFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => updateDocumentSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    const res = await fetch(`${env.API_URL}/document/${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while updating the document"
      );
    }

    return res.json();
  });
