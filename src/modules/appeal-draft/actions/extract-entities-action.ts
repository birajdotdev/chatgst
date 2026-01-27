import { createServerFn } from "@tanstack/react-start";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";
import { ExtractEntitiesApiResponse } from "@/modules/appeal-draft/types";

export interface ExtractEntitiesInput {
  pdf_file: File;
}

export interface ExtractEntitiesResult {
  success: boolean;
  data: ExtractEntitiesApiResponse["data"];
}

export const extractEntitiesFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as ExtractEntitiesInput)
  .handler(async ({ data }): Promise<ExtractEntitiesResult> => {
    const session = await verifySession();

    const formData = new FormData();
    formData.append("pdf_file", data.pdf_file);

    const res = await fetch(`${env.API_URL}/documents/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while processing the file"
      );
    }

    const responseData: ExtractEntitiesApiResponse = await res.json();

    return {
      success: true,
      data: responseData.data,
    };
  });
