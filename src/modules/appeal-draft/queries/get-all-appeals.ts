import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { GetAllAppealsApiResponse } from "@/modules/appeal-draft/types";

export const getAllAppeals = cache(async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/appeals/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: [`document-appeals-${documentId}`],
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Error fetching appeals");
    }

    const data: GetAllAppealsApiResponse = await res.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occurred while fetching appeals");
  }
});
