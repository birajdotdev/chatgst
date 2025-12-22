import { Activity, Suspense } from "react";

import type { SearchParams } from "nuqs/server";

import { Card, CardContent } from "@/components/ui/card";
import { AppealDraftFooter } from "@/modules/appeal-draft/components/appeal-draft-footer";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import BasicDetailsStep from "@/modules/appeal-draft/components/basic-details-step";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { DraftStep } from "@/modules/appeal-draft/components/draft-step";
import { DraftStepSkeleton } from "@/modules/appeal-draft/components/draft-step-skeleton";
import { IssueSelectionStep } from "@/modules/appeal-draft/components/issue-selection-step";
import { IssuesSectionSkeleton } from "@/modules/appeal-draft/components/issues-section-skeleton";
import { ReferenceSectionSkeleton } from "@/modules/appeal-draft/components/reference-section-skeleton";
import { ReferencesStep } from "@/modules/appeal-draft/components/references-step";
import { ReviewStep } from "@/modules/appeal-draft/components/review-step";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";
import { FormProvider } from "@/modules/appeal-draft/contexts/form-context";

interface AppealDraftViewProps {
  searchParams: Promise<SearchParams>;
}

export async function AppealDraftView({ searchParams }: AppealDraftViewProps) {
  const { step, documentId, appealId, ...rest } =
    await appealDraftSearchParamsCache.parse(searchParams);

  const steps = [
    { component: UploadDocumentStep, fallback: null },
    {
      component: BasicDetailsStep,
      fallback: <BasicDetailsStepSkeleton isEditMode={rest.mode === "edit"} />,
    },
    { component: IssueSelectionStep, fallback: <IssuesSectionSkeleton /> },
    { component: ReferencesStep, fallback: <ReferenceSectionSkeleton /> },
    { component: DraftStep, fallback: <DraftStepSkeleton /> },
    { component: ReviewStep, fallback: null },
  ];

  return (
    <FormProvider>
      <main className="size-full p-6">
        <section className="mx-auto size-full max-w-(--breakpoint-xl)">
          <div className="flex size-full flex-col items-center gap-6">
            <AppealDraftStepper className="w-full md:max-w-2/3" />
            <Card className="size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0">
              <CardContent className="size-full px-4 py-6">
                {steps.map((stepItem, index) => {
                  const { component: Step, fallback } = stepItem;
                  return (
                    <Activity
                      key={Step.name || index}
                      mode={step === index + 1 ? "visible" : "hidden"}
                    >
                      <Suspense fallback={fallback}>
                        <Step />
                      </Suspense>
                    </Activity>
                  );
                })}
                <Activity mode={step > steps.length ? "visible" : "hidden"}>
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                    Step {step} Content Placeholder
                  </div>
                </Activity>
              </CardContent>
              <AppealDraftFooter
                searchParams={{
                  step,
                  documentId,
                  appealId,
                  ...rest,
                }}
              />
            </Card>
          </div>
        </section>
      </main>
    </FormProvider>
  );
}
