"use server";

import { redirect } from "next/navigation";

import { zfd } from "zod-form-data";

import { env } from "@/env";
import { protectedActionClient } from "@/lib/safe-action";
import { ExtractEntitiesApiResponse } from "@/modules/appeal-draft/types";

const inputSchema = zfd.formData({
  pdf_file: zfd.file(),
});

export const extractEntitiesAction = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    try {
      const formData = new FormData();
      formData.append("pdf_file", parsedInput.pdf_file);

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

      const data: ExtractEntitiesApiResponse = await res.json();
      redirect(`/appeal-draft?step=2&documentId=${data.data.id}`);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Unexpected error occurred!");
    }
  });
