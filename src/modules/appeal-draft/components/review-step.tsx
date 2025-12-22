import { redirect } from "next/navigation";

import { DownloadIcon } from "lucide-react";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { ExportPdfButton } from "@/modules/appeal-draft/components/export-pdf-button";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getEffectiveDocumentId } from "@/modules/appeal-draft/lib/get-effective-id";
import { getAppeal } from "@/modules/appeal-draft/queries";

export async function ReviewStep() {
  const { appealId } = appealDraftSearchParamsCache.all();
  const effectiveDocumentId = await getEffectiveDocumentId();

  if (!effectiveDocumentId) redirect("/appeal-draft?step=1");

  // Fetch appeal data if we have an appealId to get the appeal name
  const appealData = appealId ? await getAppeal(appealId) : null;

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <div className="flex items-center justify-end gap-2.5">
        {appealId ? (
          <ExportPdfButton
            appealId={appealId}
            appealName={appealData?.appeal_name}
          />
        ) : (
          <Button type="button" variant="outline" disabled>
            <DownloadIcon />
            Export as PDF
          </Button>
        )}
        {/* <Button type="button" variant="outline">
          <BookmarkIcon />
          Save Draft
        </Button> */}
      </div>

      {/* <AppealSummary
        document={getDocument(effectiveDocumentId)}
        issues={getPotentialIssues(effectiveDocumentId)}
        references={getLegalReferences(effectiveDocumentId)}
      /> */}

      <FileUploader label="Attach Supporting Document" />
    </div>
  );
}
