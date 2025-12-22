import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { DraftContent } from "@/modules/appeal-draft/components/draft-content";
import { DraftStepSkeleton } from "@/modules/appeal-draft/components/draft-step-skeleton";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getEffectiveDocumentId } from "@/modules/appeal-draft/lib/get-effective-id";
import { generateAppeal, getAppeal } from "@/modules/appeal-draft/queries";

export async function DraftStep() {
  const { appealId } = appealDraftSearchParamsCache.all();
  const effectiveDocumentId = await getEffectiveDocumentId();

  if (!effectiveDocumentId && !appealId) {
    redirect("/appeal-draft?step=1");
  }

  const appealPromise = appealId
    ? getAppeal(appealId)
    : effectiveDocumentId
      ? generateAppeal(effectiveDocumentId)
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
            documentId={effectiveDocumentId}
            appealPromise={appealPromise}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
