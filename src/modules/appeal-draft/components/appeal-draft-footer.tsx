"use client";

import { CircleCheckIcon } from "lucide-react";
import { inferParserType, useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";
import { useFormContext } from "@/modules/appeal-draft/contexts/form-context";

interface AppealDraftFooterProps {
  searchParams: inferParserType<typeof appealDraftSearchParams>;
}

export function AppealDraftFooter({ searchParams }: AppealDraftFooterProps) {
  const { step, mode } = searchParams;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useQueryStates(appealDraftSearchParams);
  const { isSubmitting, isDirty } = useFormContext();

  const handelBack = () => {
    setSearchParams({ step: step - 1, mode: null });
  };

  const handelNext = () => {
    setSearchParams({ step: step + 1, mode: null });
  };

  const handelCancel = () => {
    setSearchParams({ mode: null });
  };

  return (
    <CardFooter className="border-t bg-card px-10 py-4!" hidden={step === 1}>
      {/* Back button */}
      <Button
        type="button"
        variant="secondary"
        className="min-w-28"
        onClick={handelBack}
        hidden={step === 1 || mode === "edit"}
      >
        Back
      </Button>

      {/* Cancel button */}
      <Button
        type="button"
        variant="secondary"
        className="min-w-28"
        onClick={handelCancel}
        hidden={mode !== "edit"}
      >
        Cancel
      </Button>

      {/* Save Details button */}
      <Button
        type="submit"
        form="extracted-details-form"
        className="ml-auto min-w-28"
        hidden={step !== 2 || mode !== "edit"}
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Saving...
          </>
        ) : (
          <>
            <CircleCheckIcon />
            Save Details
          </>
        )}
      </Button>

      {/* Continue button */}
      <Button
        type="button"
        className="ml-auto min-w-28"
        onClick={handelNext}
        hidden={step === 2 && mode === "edit"}
      >
        Continue
      </Button>
    </CardFooter>
  );
}
