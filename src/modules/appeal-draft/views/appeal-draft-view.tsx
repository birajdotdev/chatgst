import { AppealDraftClient } from "@/modules/appeal-draft/components/appeal-draft-client";

export function AppealDraftView() {
  return (
    <main className="size-full p-6">
      <section className="mx-auto size-full max-w-(--breakpoint-xl)">
        <AppealDraftClient />
      </section>
    </main>
  );
}
