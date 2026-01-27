"use client";

import { Suspense } from "react";

import { useNavigate } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import { AiProcessingSummaryBanner } from "@/modules/appeal-draft/components/ai-processing-summary-banner";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { EditModeButton } from "@/modules/appeal-draft/components/edit-mode-button";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { ExtractedDetails } from "@/modules/appeal-draft/components/extracted-details";
import { ExtractedDetailsForm } from "@/modules/appeal-draft/components/extracted-details-form";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
import { getDocument } from "@/modules/appeal-draft/queries";

export function BasicDetailsView() {
  const { all } = useSearchParamsContext();
  const { mode, documentId } = all();
  const navigate = useNavigate();

  if (!documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }

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
