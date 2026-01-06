import { Activity } from "react";

import type { SearchParams } from "nuqs/server";

import { Card, CardContent } from "@/components/ui/card";
import { AppealDraftFooter } from "@/modules/appeal-draft/components/appeal-draft-footer";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { FormProvider } from "@/modules/appeal-draft/contexts/form-context";
import { DraftHistoryLayout } from "@/modules/appeal-draft/layouts/draft-history-layout";
import { BasicDetailsView } from "@/modules/appeal-draft/views/basic-details-view";
import { DraftView } from "@/modules/appeal-draft/views/draft-view";
import { IssueSelectionView } from "@/modules/appeal-draft/views/issue-selection-view";
import { ReferencesView } from "@/modules/appeal-draft/views/references-view";
import { ReviewView } from "@/modules/appeal-draft/views/review-view";
import { UploadDocumentView } from "@/modules/appeal-draft/views/upload-document-view";

interface AppealDraftViewProps {
  searchParams: Promise<SearchParams>;
}

const APPEAL_DRAFT_STEPS = [
  { step: 1, Component: UploadDocumentView },
  { step: 2, Component: BasicDetailsView },
  { step: 3, Component: IssueSelectionView },
  { step: 4, Component: ReferencesView },
  { step: 5, Component: DraftView },
  { step: 6, Component: ReviewView },
] as const;

export async function AppealDraftView({ searchParams }: AppealDraftViewProps) {
  const { step, ...rest } =
    await appealDraftSearchParamsCache.parse(searchParams);

  return (
    <FormProvider>
      <DraftHistoryLayout step={step}>
        <main className="size-full p-6">
          <section className="mx-auto size-full max-w-(--breakpoint-xl)">
            <div className="flex size-full flex-col items-center gap-6">
              <AppealDraftStepper className="w-full md:max-w-2/3" />
              <Card className="size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0">
                <CardContent className="size-full px-4 py-6">
                  {APPEAL_DRAFT_STEPS.map(({ step: itemStep, Component }) => (
                    <Activity
                      key={`appeal-draft-step-${itemStep}`}
                      mode={step === itemStep ? "visible" : "hidden"}
                    >
                      <Component />
                    </Activity>
                  ))}
                </CardContent>
                <AppealDraftFooter
                  searchParams={{
                    step,
                    ...rest,
                  }}
                />
              </Card>
            </div>
          </section>
        </main>
      </DraftHistoryLayout>
    </FormProvider>
  );
}
