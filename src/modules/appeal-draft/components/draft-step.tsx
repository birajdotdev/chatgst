import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { DraftContent } from "@/modules/appeal-draft/components/draft-content";
import { DraftStepSkeleton } from "@/modules/appeal-draft/components/draft-step-skeleton";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { generateAppeal } from "@/modules/appeal-draft/queries";

export function DraftStep() {
  const documentId = appealDraftSearchParamsCache.get("documentId");
  if (!documentId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DraftStepSkeleton />}>
          <DraftContent appealPromise={generateAppeal(documentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
