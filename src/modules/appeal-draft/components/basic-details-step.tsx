import { AiProcessingSummaryBanner } from "@/modules/appeal-draft/components/ai-processing-summary-banner";
import { EditModeButton } from "@/modules/appeal-draft/components/edit-mode-button";
import { ExtractedDetails } from "@/modules/appeal-draft/components/extracted-details";
import { ExtractedDetailsForm } from "@/modules/appeal-draft/components/extracted-details-form";
import type { DocumentData } from "@/modules/appeal-draft/types";

export default function BasicDetailsStep({
  documentId,
  mode,
  document,
}: {
  documentId: string;
  mode: string | null;
  document: DocumentData;
}) {
  return (
    <div className="flex size-full max-h-fit flex-col items-end gap-4.5">
      <AiProcessingSummaryBanner />
      <EditModeButton mode={mode || undefined} />
      {mode === "edit" ? (
        <ExtractedDetailsForm document={document} documentId={documentId} />
      ) : (
        <ExtractedDetails document={document} />
      )}
    </div>
  );
}
