import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

export const getReferences = async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${env.API_URL}/documents/${documentId}/references/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        next: {
          tags: [`appeal-${documentId}-references`],
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData:", errorData);
      throw new Error(
        errorData.detail.message || "Error occurred while fetching references"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
};
