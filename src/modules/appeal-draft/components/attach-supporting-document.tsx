"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { attachSupportingDocumentsFn } from "@/modules/appeal-draft/actions/attach-supporting-documents-action";

interface AttachSupportingDocumentProps {
  appealId: string;
}

export function AttachSupportingDocument({
  appealId,
}: AttachSupportingDocumentProps) {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const files = formData.getAll("files") as File[];
      return attachSupportingDocumentsFn({ data: { appealId, files } });
    },
    onSuccess: () => {
      toast.success("Supporting documents attached successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to attach documents"
      );
    },
  });

  const handleFileUpload = (formData: FormData) => {
    mutation.mutate(formData);
  };

  return (
    <FileUploader
      label="Attach Supporting Document"
      onFileUpload={handleFileUpload}
      isExecuting={mutation.isPending}
      fileKey="files"
      maxFiles={5}
      hideSubmitButton={!!mutation.data}
      onOpenFileDialog={mutation.reset}
    />
  );
}
