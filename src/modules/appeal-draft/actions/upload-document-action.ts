"use server";

import { zfd } from "zod-form-data";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";

export interface APIResponse {
  message: string;
  data: Data;
}

export interface Data {
  file_name: string;
  time_taken: string;
  ocr_type: string;
  page_texts: string[];
}

const inputSchema = zfd.formData({
  pdf_file: zfd.file(),
});

export const uploadDocumentAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    try {
      const res = await fetch(`${env.API_URL}/documents/ocr/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: parsedInput.pdf_file,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while processing the file"
        );
      }

      const data: APIResponse = await res.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Unexpected error occurred!");
    }
  });
