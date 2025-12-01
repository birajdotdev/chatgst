"use server";

import { zfd } from "zod-form-data";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import { ExtractEntitiesApiResponse } from "@/modules/appeal-draft/types";

const inputSchema = zfd.formData({
  pdf_file: zfd.file(),
});

export const extractEntitiesAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const res = await fetch(`${env.API_URL}/documents/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ctx.accessToken}`,
        },
        body: parsedInput.pdf_file,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while processing the file"
        );
      }

      const data: ExtractEntitiesApiResponse = await res.json();

      return {
        success: true,
        message: data.message,
        documentId: data.data.id,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Unexpected error occurred!");
    }
  });
