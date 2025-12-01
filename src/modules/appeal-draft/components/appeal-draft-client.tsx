"use client";

import { Activity } from "react";

import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import BasicDetailsStep from "@/modules/appeal-draft/components/basic-details-step";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";

export function AppealDraftClient() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));

  const handleBack = () => {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  };

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex size-full flex-col items-center gap-6">
      <AppealDraftStepper
        className="w-full md:max-w-2/3"
        stepperProps={{
          value: step,
          onValueChange: setStep,
        }}
      />
      <Card className="size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0">
        <CardContent className="size-full px-4 py-6">
          <Activity mode={step === 1 ? "visible" : "hidden"}>
            <UploadDocumentStep onSuccess={() => setStep(2)} />
          </Activity>
          <Activity mode={step === 2 ? "visible" : "hidden"}>
            <BasicDetailsStep />
          </Activity>
          <Activity mode={step !== 1 ? "visible" : "hidden"}>
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
              Step {step} Content Placeholder
            </div>
          </Activity>
        </CardContent>
        <CardFooter className="border-t bg-card px-10 py-4!">
          <Button
            type="button"
            variant="secondary"
            className="min-w-28"
            hidden={step <= 1}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="button"
            className="ml-auto min-w-28"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
