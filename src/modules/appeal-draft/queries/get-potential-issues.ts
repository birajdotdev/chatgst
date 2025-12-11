import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { GetIssuesApiResponse } from "@/modules/appeal-draft/types";

export const getPotentialIssues = async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${env.API_URL}/documents/${documentId}/potential-issues/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        next: {
          tags: [`document-${documentId}-potential-issues`],
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while fetching potential issues"
      );
    }

    const data: GetIssuesApiResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
};
