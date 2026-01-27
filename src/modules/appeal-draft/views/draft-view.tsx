"use client";

import { Suspense } from "react";

import { useNavigate } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import { DraftContent } from "@/modules/appeal-draft/components/draft-content";
import { DraftStepSkeleton } from "@/modules/appeal-draft/components/draft-step-skeleton";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
import { generateAppeal, getAppeal } from "@/modules/appeal-draft/queries";

export function DraftView() {
  const { all } = useSearchParamsContext();
  const { appealId, documentId } = all();
  const navigate = useNavigate();

  if (!appealId && !documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }

  const appealPromise = appealId
    ? getAppeal(appealId)
    : documentId
      ? generateAppeal(documentId)
      : null;

  if (!appealPromise) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DraftStepSkeleton />}>
          <DraftContent
            appealId={appealId}
            documentId={documentId}
            appealPromise={appealPromise}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
