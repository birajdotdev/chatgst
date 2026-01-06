import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { AiProcessingSummaryBanner } from "@/modules/appeal-draft/components/ai-processing-summary-banner";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { EditModeButton } from "@/modules/appeal-draft/components/edit-mode-button";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { ExtractedDetails } from "@/modules/appeal-draft/components/extracted-details";
import { ExtractedDetailsForm } from "@/modules/appeal-draft/components/extracted-details-form";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getDocument } from "@/modules/appeal-draft/queries";

export function BasicDetailsView() {
  const { mode, documentId } = appealDraftSearchParamsCache.all();
  if (!documentId) redirect("/appeal-draft?step=1");

  const isEditMode = mode === "edit";

  return (
    <div className="flex size-full max-h-fit flex-col items-end gap-4.5">
      <AiProcessingSummaryBanner />
      {isEditMode ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<BasicDetailsStepSkeleton isEditMode />}>
            <ExtractedDetailsForm document={getDocument(documentId)} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<BasicDetailsStepSkeleton />}>
            <EditModeButton />
            <ExtractedDetails document={getDocument(documentId)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
