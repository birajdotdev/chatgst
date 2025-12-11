import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { IssuesSection } from "@/modules/appeal-draft/components/issues-section";
import { IssuesSectionSkeleton } from "@/modules/appeal-draft/components/issues-section-skeleton";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getPotentialIssues } from "@/modules/appeal-draft/queries/get-potential-issues";

export function IssueSelectionStep() {
  const documentId = appealDraftSearchParamsCache.get("documentId");
  if (!documentId) redirect("/appeal-draft?step=1");

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
