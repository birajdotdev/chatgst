import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import { AppealDraftView } from "@/modules/appeal-draft/views/appeal-draft-view";

// Loading fallback for appeal draft
function AppealDraftLoading() {
  return (
    <main className="flex size-full items-center justify-center p-6">
      <Spinner className="size-12 text-primary" />
    </main>
  );
}

export default function Page(props: PageProps<"/appeal-draft">) {
  return (
    <Suspense fallback={<AppealDraftLoading />}>
      <AppealDraftView searchParams={props.searchParams} />
    </Suspense>
  );
}
