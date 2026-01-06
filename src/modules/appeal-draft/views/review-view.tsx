import { redirect } from "next/navigation";

import { DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AttachSupportingDocument } from "@/modules/appeal-draft/components/attach-supporting-document";
import { ExportPdfButton } from "@/modules/appeal-draft/components/export-pdf-button";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getAppeal } from "@/modules/appeal-draft/queries";
import { generateAppealPdf } from "@/modules/appeal-draft/queries/generate-appeal-pdf";

export async function ReviewView() {
  const { appealId } = appealDraftSearchParamsCache.all();
  if (!appealId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <div className="flex items-center justify-end gap-2.5">
        {appealId ? (
          <ExportPdfButton
            appeal={getAppeal(appealId)}
            appealPDF={generateAppealPdf(appealId)}
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

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          Still want to add something?
        </h3>
        {appealId ? (
          <AttachSupportingDocument appealId={appealId} />
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
            Save appeal draft first to attach documents
          </div>
        )}
      </div>
    </div>
  );
}
