import { createServerFn } from "@tanstack/react-start";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

export interface DeleteAppealInput {
  appealId: string;
  documentId: string;
}

export const deleteAppealFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as DeleteAppealInput)
  .handler(async ({ data }) => {
    const session = await verifySession();

    const res = await fetch(
      `${env.API_URL}/documents/appeals/${data.appealId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to delete appeal");
    }

    return { success: true, message: "Appeal deleted successfully" };
  });
