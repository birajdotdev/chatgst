import { Suspense } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";
import { appealDraftSearchSchema } from "@/modules/appeal-draft/components/search-params";
import { AppealDraftView } from "@/modules/appeal-draft/views/appeal-draft-view";

export const Route = createFileRoute("/_protected/appeal-draft")({
  validateSearch: appealDraftSearchSchema,
  component: AppealDraftPage,
});

function AppealDraftLoading() {
  return (
    <main className="flex size-full items-center justify-center p-6">
      <Spinner className="size-12 text-primary" />
    </main>
  );
}

function AppealDraftPage() {
  const searchParams = Route.useSearch();

  return (
    <Suspense fallback={<AppealDraftLoading />}>
      <AppealDraftView searchParams={searchParams} />
    </Suspense>
  );
}
