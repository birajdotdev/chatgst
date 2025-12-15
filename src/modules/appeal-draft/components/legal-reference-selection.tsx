"use client";

import { useOptimisticAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { toggleLegalReferenceSelectionAction } from "@/modules/appeal-draft/actions/toggle-legal-reference-selection-action";

interface LegalReferenceSelectionProps {
  referenceId?: string;
  selected?: boolean;
}

export function LegalReferenceSelection({
  referenceId,
  selected,
}: LegalReferenceSelectionProps) {
  const checkboxId = referenceId || "legal-reference-selection";

  const { execute, optimisticState } = useOptimisticAction(
    toggleLegalReferenceSelectionAction,
    {
      currentState: { selected: selected ?? false },
      updateFn: (state) => ({
        selected: !state.selected,
      }),
      onError: ({ error }) => {
        toast.error(
          error.serverError || "Failed to toggle legal reference selection"
        );
      },
    }
  );

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={checkboxId}
        checked={optimisticState.selected}
        disabled={!referenceId}
        onCheckedChange={() => {
          if (!referenceId) return;
          execute({ sectionId: referenceId });
        }}
      />
      <FieldLabel htmlFor={checkboxId} className="text-muted-foreground">
        Select
      </FieldLabel>
    </Field>
  );
}
