"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { zfd } from "zod-form-data";

import { env } from "@/env";
import { protectedActionClient } from "@/lib/safe-action";

const attachDocumentsSchema = zfd.formData({
  appealId: zfd.text(),
  files: z.union([zfd.file(), z.array(zfd.file())]),
});

export const attachSupportingDocumentsAction = protectedActionClient
  .inputSchema(attachDocumentsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const { appealId, files } = parsedInput;
    const formData = new FormData();

    // Normalize files to an array
    const fileArray = Array.isArray(files) ? files : [files];

    fileArray.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(
        `${env.API_URL}/documents/appeals/${appealId}/attachments/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || "Error occurred while uploading attachments"
        );
      }

      revalidatePath(`/appeal-draft`);

      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unexpected error occurred!");
    }
  });
