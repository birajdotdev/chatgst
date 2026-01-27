import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

const toggleLegalReferenceSchema = z.object({
  sectionId: z.string(),
});

export type ToggleLegalReferenceInput = z.infer<
  typeof toggleLegalReferenceSchema
>;

export const toggleLegalReferenceSelectionFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => toggleLegalReferenceSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    const res = await fetch(
      `${env.API_URL}/documents/references/sections/${data.sectionId}/`,
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
        errorData.detail ||
          "Error occurred while toggling legal reference selection"
      );
    }

    return { success: true };
  });
