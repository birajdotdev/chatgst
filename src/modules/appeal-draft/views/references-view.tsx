"use client";

import { Suspense } from "react";

import { useNavigate } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/modules/appeal-draft/components/error-fallback";
import { ReferenceSectionSkeleton } from "@/modules/appeal-draft/components/reference-section-skeleton";
import { ReferencesContent } from "@/modules/appeal-draft/components/references-content";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
import { getLegalReferences } from "@/modules/appeal-draft/queries";

export function ReferencesView() {
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
        <Suspense fallback={<ReferenceSectionSkeleton />}>
          <ReferencesContent references={getLegalReferences(documentId)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
