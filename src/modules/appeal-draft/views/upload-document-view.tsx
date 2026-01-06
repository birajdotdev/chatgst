"use client";

import { useAction } from "next-safe-action/hooks";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { extractEntitiesAction } from "@/modules/appeal-draft/actions/extract-entities-action";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";

export function UploadDocumentView() {
  const [{ documentId }, setSearchParams] = useQueryStates(
    appealDraftSearchParams
  );

  const { execute, isExecuting } = useAction(extractEntitiesAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const handleOpenFileDialog = () => {
    if (documentId) {
      setSearchParams({ documentId: null });
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
        isExecuting={isExecuting}
        onOpenFileDialog={handleOpenFileDialog}
        onFileUpload={execute}
      />
    </div>
  );
}
