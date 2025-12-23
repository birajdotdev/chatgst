"use server";

import { cache } from "react";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import type { GetDocumentApiResponse } from "@/modules/appeal-draft/types";

/**
 * Fetches a document by ID with automatic deduplication via React cache.
 * This is a query function (read operation), not a Server Action (mutation).
 */
export const getDocument = cache(async (documentId: string) => {
  const session = await verifySession();

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: [`document-${documentId}`],
        revalidate: 60, // Cache for 60 seconds
      },
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Error occurred while fetching the document";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data: GetDocumentApiResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
