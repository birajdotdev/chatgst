import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/dal";
import { GenerateAppealApiResponse } from "@/modules/appeal-draft/types";

export const getAppeal = cache(async (appealId: string) => {
  // verifySession redirects to login if not authenticated
  const session = await verifySession();

  try {
    const res = await fetch(`${env.API_URL}/documents/appeals/${appealId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: [`appeal-${appealId}`],
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Error occurred while fetching the appeal";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }

      throw new Error(errorMessage);
    }

    const data: GenerateAppealApiResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
