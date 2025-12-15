import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { AlertMessage } from "@/modules/appeal-draft/components/alert-message";
import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { References } from "@/modules/appeal-draft/components/references";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getReferences } from "@/modules/appeal-draft/queries/get-references";

export function ReferencesStep() {
  const documentId = appealDraftSearchParamsCache.get("documentId");
  if (!documentId) redirect("/appeal-draft?step=1");

  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <AlertMessage message="Analyzed 6 legal authorities from our comprehensive GST database. Machine learning algorithms have ranked references by relevance to your specific issues." />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading references...</div>}>
          <References references={getReferences(documentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
