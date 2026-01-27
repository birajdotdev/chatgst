import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

const toggleIssueSelectionSchema = z.object({
  issueId: z.string(),
});

export type ToggleIssueSelectionInput = z.infer<
  typeof toggleIssueSelectionSchema
>;

export const toggleIssueSelectionFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => toggleIssueSelectionSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await verifySession();

    const res = await fetch(
      `${env.API_URL}/documents/potential-issues/${data.issueId}/`,
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

    return { success: true };
  });
