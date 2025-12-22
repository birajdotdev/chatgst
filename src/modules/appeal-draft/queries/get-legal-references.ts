import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { GetLegalReferencesApiResponse } from "@/modules/appeal-draft/types";

export const getLegalReferences = cache(async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${env.API_URL}/documents/${documentId}/references/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        next: {
          tags: [`document-${documentId}-legal-references`],
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );
    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Failed to fetch legal references";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data: GetLegalReferencesApiResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred");
  }
});
