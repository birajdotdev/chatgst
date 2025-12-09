import { Card, CardContent } from "@/components/ui/card";
import { AppealDraftFooter } from "@/modules/appeal-draft/components/appeal-draft-footer";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import { FormProvider } from "@/modules/appeal-draft/contexts/form-context";

export function AppealDraftView({
  step,
  documentId,
  mode,
  children,
}: {
  step: number;
  documentId: string | null;
  mode: string | null;
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <main className="size-full p-6">
        <section className="mx-auto size-full max-w-(--breakpoint-xl)">
          <div className="flex size-full flex-col items-center gap-6">
            <AppealDraftStepper step={step} className="w-full md:max-w-2/3" />
            <Card className="size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0">
              <CardContent className="size-full px-4 py-6">
                {children}
              </CardContent>
              <AppealDraftFooter
                step={step}
                documentId={documentId}
                mode={mode}
              />
            </Card>
          </div>
        </section>
      </main>
    </FormProvider>
  );
}
