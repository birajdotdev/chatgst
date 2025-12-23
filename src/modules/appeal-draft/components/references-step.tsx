import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { ReferenceSectionSkeleton } from "@/modules/appeal-draft/components/reference-section-skeleton";
import { ReferencesContent } from "@/modules/appeal-draft/components/references-content";
import { getEffectiveDocumentId } from "@/modules/appeal-draft/lib/get-effective-id";
import { getLegalReferences } from "@/modules/appeal-draft/queries";

export async function ReferencesStep() {
  const effectiveDocumentId = await getEffectiveDocumentId();

  if (!effectiveDocumentId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ReferenceSectionSkeleton />}>
          <ReferencesContent
            references={getLegalReferences(effectiveDocumentId)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
