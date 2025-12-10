import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { AiProcessingSummaryBanner } from "@/modules/appeal-draft/components/ai-processing-summary-banner";
import { BasicDetailsError } from "@/modules/appeal-draft/components/basic-details-error";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { EditModeButton } from "@/modules/appeal-draft/components/edit-mode-button";
import { ExtractedDetails } from "@/modules/appeal-draft/components/extracted-details";
import { ExtractedDetailsForm } from "@/modules/appeal-draft/components/extracted-details-form";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getDocument } from "@/modules/appeal-draft/queries";

export default function BasicDetailsStep() {
  const { documentId, mode } = appealDraftSearchParamsCache.all();
  const isEditMode = mode === "edit";

  if (!documentId)
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-destructive">
            Missing document ID
          </p>
          <p className="text-sm text-muted-foreground">
            Please upload a document first to continue.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex size-full max-h-fit flex-col items-end gap-4.5">
      <AiProcessingSummaryBanner />
      {isEditMode ? (
        <ErrorBoundary FallbackComponent={BasicDetailsError}>
          <Suspense fallback={<BasicDetailsStepSkeleton isEditMode />}>
            <ExtractedDetailsForm document={getDocument(documentId)} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary FallbackComponent={BasicDetailsError}>
          <Suspense fallback={<BasicDetailsStepSkeleton />}>
            <EditModeButton />
            <ExtractedDetails document={getDocument(documentId)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
