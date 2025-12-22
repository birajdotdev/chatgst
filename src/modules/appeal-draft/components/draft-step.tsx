import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { DraftContent } from "@/modules/appeal-draft/components/draft-content";
import { DraftStepSkeleton } from "@/modules/appeal-draft/components/draft-step-skeleton";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { generateAppeal, getAppeal } from "@/modules/appeal-draft/queries";

export function DraftStep() {
  const documentId = appealDraftSearchParamsCache.get("documentId");
  const appealId = appealDraftSearchParamsCache.get("appealId");

  if (!documentId && !appealId) {
    redirect("/appeal-draft?step=1");
  }

  const appealPromise = appealId
    ? getAppeal(appealId)
    : documentId
      ? generateAppeal(documentId)
      : null;

  if (!appealPromise) {
    redirect("/appeal-draft?step=1");
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
