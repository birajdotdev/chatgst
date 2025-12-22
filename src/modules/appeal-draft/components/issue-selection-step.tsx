import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { IssuesSection } from "@/modules/appeal-draft/components/issues-section";
import { IssuesSectionSkeleton } from "@/modules/appeal-draft/components/issues-section-skeleton";
import { getEffectiveDocumentId } from "@/modules/appeal-draft/lib/get-effective-id";
import { getPotentialIssues } from "@/modules/appeal-draft/queries";

export async function IssueSelectionStep() {
  const effectiveDocumentId = await getEffectiveDocumentId();

  if (!effectiveDocumentId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<IssuesSectionSkeleton />}>
          <IssuesSection issues={getPotentialIssues(effectiveDocumentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
