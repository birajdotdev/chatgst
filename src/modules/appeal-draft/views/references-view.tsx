import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { ReferenceSectionSkeleton } from "@/modules/appeal-draft/components/reference-section-skeleton";
import { ReferencesContent } from "@/modules/appeal-draft/components/references-content";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getLegalReferences } from "@/modules/appeal-draft/queries";

export function ReferencesView() {
  const documentId = appealDraftSearchParamsCache.get("documentId");
  if (!documentId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ReferenceSectionSkeleton />}>
          <ReferencesContent references={getLegalReferences(documentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
