import { Activity } from "react";

import type { SearchParams } from "nuqs/server";

import { Card, CardContent } from "@/components/ui/card";
import { AppealDraftFooter } from "@/modules/appeal-draft/components/appeal-draft-footer";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import BasicDetailsStep from "@/modules/appeal-draft/components/basic-details-step";
import { IssueSelectionStep } from "@/modules/appeal-draft/components/issue-selection-step";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";
import { FormProvider } from "@/modules/appeal-draft/contexts/form-context";

interface AppealDraftViewProps {
  searchParams: Promise<SearchParams>;
}

export async function AppealDraftView({ searchParams }: AppealDraftViewProps) {
  const { step, ...rest } =
    await appealDraftSearchParamsCache.parse(searchParams);

  const steps = [
    <UploadDocumentStep key="upload" />,
    <BasicDetailsStep key="basic-details" />,
    <IssueSelectionStep key="issues" />,
  ];

  return (
    <FormProvider>
      <main className="size-full p-6">
        <section className="mx-auto size-full max-w-(--breakpoint-xl)">
          <div className="flex size-full flex-col items-center gap-6">
            <AppealDraftStepper className="w-full md:max-w-2/3" />
            <Card className="size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0">
              <CardContent className="size-full px-4 py-6">
                {steps.map((stepComponent, index) => (
                  <Activity
                    key={index}
                    mode={step === index + 1 ? "visible" : "hidden"}
                  >
                    {stepComponent}
                  </Activity>
                ))}
                <Activity mode={step > steps.length ? "visible" : "hidden"}>
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                    Step {step} Content Placeholder
                  </div>
                </Activity>
              </CardContent>
              <AppealDraftFooter searchParams={{ step, ...rest }} />
            </Card>
          </div>
        </section>
      </main>
    </FormProvider>
  );
}
