import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

export const generateAppealPdf = cache(async (appealId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${env.API_URL}/documents/appeals/${appealId}/pdf/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/pdf",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to generate PDF");
    }

    const pdfBlob = await res.blob();

    return pdfBlob;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while generating the PDF");
  }
});
