"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { attachSupportingDocumentsAction } from "@/modules/appeal-draft/actions/attach-supporting-documents-action";

interface AttachSupportingDocumentProps {
  appealId: string;
}

export function AttachSupportingDocument({
  appealId,
}: AttachSupportingDocumentProps) {
  const { execute, isExecuting, result, reset } = useAction(
    attachSupportingDocumentsAction,
    {
      onSuccess: () => {
        toast.success("Supporting documents attached successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to attach documents");
      },
    }
  );

  const handleFileUpload = (formData: FormData) => {
    formData.append("appealId", appealId);
    execute(formData);
  };

  return (
    <FileUploader
      label="Attach Supporting Document"
      onFileUpload={handleFileUpload}
      isExecuting={isExecuting}
      fileKey="files"
      maxFiles={5}
      hideSubmitButton={!!result.data}
      onOpenFileDialog={reset}
    />
  );
}
