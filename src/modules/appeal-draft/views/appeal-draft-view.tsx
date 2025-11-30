import { AppealDraftForm } from "@/modules/appeal-draft/components/appeal-draft-form";

export function AppealDraftView() {
  return (
    <main className="size-full p-6">
      <section className="mx-auto size-full max-w-(--breakpoint-xl)">
        <AppealDraftForm />
      </section>
    </main>
  );
}
