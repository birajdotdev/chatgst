"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CircleCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/modules/appeal-draft/contexts/form-context";

export function AppealDraftFooter({
  step,
  mode,
}: {
  step: number;
  documentId?: string | null;
  mode: string | null;
}) {
  const searchParams = useSearchParams();
  const { isSubmitting, isDirty } = useFormContext();

  const backUrl = new URLSearchParams(searchParams.toString());
  backUrl.set("step", String(step - 1));
  if (mode) backUrl.delete("mode");

  const nextUrl = new URLSearchParams(searchParams.toString());
  nextUrl.set("step", String(step + 1));
  if (mode) nextUrl.delete("mode");

  const cancelUrl = new URLSearchParams(searchParams.toString());
  cancelUrl.delete("mode");

  return (
    <CardFooter className="border-t bg-card px-10 py-4!" hidden={step === 1}>
      {step > 1 && mode !== "edit" && (
        <Link href={`?${backUrl.toString()}`}>
          <Button type="button" variant="secondary" className="min-w-28">
            Back
          </Button>
        </Link>
      )}
      {mode === "edit" && (
        <Link href={`?${cancelUrl.toString()}`}>
          <Button type="button" variant="secondary" className="min-w-28">
            Cancel
          </Button>
        </Link>
      )}
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
      {!(step === 2 && mode === "edit") && (
        <Link href={`?${nextUrl.toString()}`} className="ml-auto">
          <Button type="button" className="min-w-28">
            Continue
          </Button>
        </Link>
      )}
    </CardFooter>
  );
}
