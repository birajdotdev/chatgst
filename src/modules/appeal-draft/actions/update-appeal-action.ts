import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

const updateAppealSchema = z.object({
  appealId: z.string(),
  appeal_name: z.string(),
  appeal_text: z.string(),
});

export type UpdateAppealInput = z.infer<typeof updateAppealSchema>;

export const updateAppealFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => updateAppealSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    const { appealId, appeal_name, appeal_text } = data;

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

    return res.json();
  });
