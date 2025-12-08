"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CircleCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

export function AppealDraftFooter({
  step,
  mode,
}: {
  step: number;
  documentId?: string | null;
  mode: string | null;
}) {
  const searchParams = useSearchParams();

  const backUrl = new URLSearchParams(searchParams.toString());
  backUrl.set("step", String(step - 1));
  if (mode) backUrl.delete("mode");

  const nextUrl = new URLSearchParams(searchParams.toString());
  nextUrl.set("step", String(step + 1));
  if (mode) nextUrl.delete("mode");

  return (
    <CardFooter className="border-t bg-card px-10 py-4!" hidden={step === 1}>
      {step > 1 && (
        <Link href={`?${backUrl.toString()}`}>
          <Button type="button" variant="secondary" className="min-w-28">
            Back
          </Button>
        </Link>
      )}
      <Button
        type="submit"
        form="extracted-details-form"
        className="ml-auto min-w-28"
        hidden={step !== 2 || mode !== "edit"}
      >
        <CircleCheckIcon />
        Save Details
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
