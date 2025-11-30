"use client";

import { Activity } from "react";

import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AppealDraftStepper } from "@/modules/appeal-draft/components/appeal-draft-stepper";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";

export function AppealDraftForm() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));

  return (
    <form className="flex size-full flex-col items-center gap-6">
      <AppealDraftStepper
        className="w-full max-w-2/3"
        stepperProps={{
          value: step,
          onValueChange: setStep,
        }}
      />
      <Card className="size-full overflow-hidden rounded-3xl bg-muted p-0">
        <CardContent className="size-full px-4 py-6">
          <Activity mode={step === 1 ? "visible" : "hidden"}>
            <UploadDocumentStep />
          </Activity>
        </CardContent>
        <CardFooter className="border-t bg-card px-10 py-4!">
          <Button
            type="button"
            variant="secondary"
            className="min-w-28"
            hidden={step <= 1}
          >
            Back
          </Button>
          <Button type="button" className="ml-auto min-w-28">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
