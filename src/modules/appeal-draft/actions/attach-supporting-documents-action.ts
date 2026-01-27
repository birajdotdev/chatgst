import { createServerFn } from "@tanstack/react-start";

import { env } from "@/env";
import { verifySession } from "@/lib/auth";

export interface AttachSupportingDocumentsInput {
  appealId: string;
  files: File | File[];
}

export const attachSupportingDocumentsFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as AttachSupportingDocumentsInput)
  .handler(async ({ data }) => {
    const session = await verifySession();

    const { appealId, files } = data;
    const formData = new FormData();

    // Normalize files to an array
    const fileArray = Array.isArray(files) ? files : [files];

    fileArray.forEach((file) => {
      formData.append("files", file);
    });

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

    return res.json();
  });
