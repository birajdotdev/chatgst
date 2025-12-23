import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { GenerateAppealApiResponse } from "@/modules/appeal-draft/types";

export const generateAppeal = cache(async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/appeal/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: [`document-${documentId}-appeal`],
        revalidate: 60, // Cache for 60 seconds
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while generating the appeal"
      );
    }

    const data: GenerateAppealApiResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
