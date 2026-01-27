"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { extractEntitiesFn } from "@/modules/appeal-draft/actions/extract-entities-action";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";

export function UploadDocumentView() {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const { documentId } = searchParams;

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const file = formData.get("pdf_file") as File;
      if (!file) {
        throw new Error("No file provided");
      }
      return extractEntitiesFn({ data: { pdf_file: file } });
    },
    onSuccess: (data) => {
      // Navigate to step 2 with the document ID
      setSearchParams({ step: 2, documentId: data.data.id });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to process file"
      );
    },
  });

  const handleOpenFileDialog = () => {
    if (documentId) {
      setSearchParams({ documentId: undefined });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="w-full max-w-lg text-center text-sm leading-loose">
        Upload your GST Show Cause Notice or Order. Our AI will extract all
        relevant information to begin drafting your appeal.
      </p>

      <FileUploader
        className="max-w-3xl"
        isExecuting={mutation.isPending}
        onOpenFileDialog={handleOpenFileDialog}
        onFileUpload={(formData) => mutation.mutate(formData)}
      />
    </div>
  );
}
