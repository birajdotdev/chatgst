import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { GetDocumentApiResponse } from "@/modules/appeal-draft/types";

export const getDocument = async (documentId: string) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while fetching the document"
      );
    }

    const data: GetDocumentApiResponse = await res.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
};
