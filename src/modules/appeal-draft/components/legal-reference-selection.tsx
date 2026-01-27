"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  type ToggleLegalReferenceInput,
  toggleLegalReferenceSelectionFn,
} from "@/modules/appeal-draft/actions/toggle-legal-reference-selection-action";

interface LegalReferenceSelectionProps {
  referenceId?: string;
  selected?: boolean;
}

export function LegalReferenceSelection({
  referenceId,
  selected,
}: LegalReferenceSelectionProps) {
  const checkboxId = referenceId || "legal-reference-selection";
  const [optimisticSelected, setOptimisticSelected] = useState(
    selected ?? false
  );

  const mutation = useMutation({
    mutationFn: (input: ToggleLegalReferenceInput) =>
      toggleLegalReferenceSelectionFn({ data: input }),
    onMutate: () => {
      // Optimistically update state
      setOptimisticSelected((prev) => !prev);
    },
    onError: (error) => {
      // Revert optimistic update on error
      setOptimisticSelected((prev) => !prev);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to toggle legal reference selection"
      );
    },
  });

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={checkboxId}
        checked={optimisticSelected}
        disabled={!referenceId || mutation.isPending}
        onCheckedChange={() => {
          if (!referenceId) return;
          mutation.mutate({ sectionId: referenceId });
        }}
      />
      <FieldLabel htmlFor={checkboxId} className="text-muted-foreground">
        Select
      </FieldLabel>
    </Field>
  );
}
