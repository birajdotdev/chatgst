"use client";

import { Suspense } from "react";

import { useNavigate } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { IssuesSection } from "@/modules/appeal-draft/components/issues-section";
import { IssuesSectionSkeleton } from "@/modules/appeal-draft/components/issues-section-skeleton";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
import { getPotentialIssues } from "@/modules/appeal-draft/queries";

export function IssueSelectionView() {
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");
  const navigate = useNavigate();

  if (!documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<IssuesSectionSkeleton />}>
          <IssuesSection issues={getPotentialIssues(documentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
