"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import {
  type ToggleIssueSelectionInput,
  toggleIssueSelectionFn,
} from "@/modules/appeal-draft/actions/toggle-issue-selection-action";

interface IssueToggleSwitchProps {
  issueId?: string;
  selected?: boolean;
}

export function IssueToggleSwitch({
  issueId,
  selected,
}: IssueToggleSwitchProps) {
  const [optimisticSelected, setOptimisticSelected] = useState(
    selected ?? false
  );

  const mutation = useMutation({
    mutationFn: (input: ToggleIssueSelectionInput) =>
      toggleIssueSelectionFn({ data: input }),
    onMutate: () => {
      // Optimistically update the state
      const previousValue = optimisticSelected;
      setOptimisticSelected(!optimisticSelected);
      return { previousValue };
    },
    onError: (error, _, context) => {
      // Revert to previous value on error
      if (context?.previousValue !== undefined) {
        setOptimisticSelected(context.previousValue);
      }
      toast.error(error.message || "Failed to toggle issue selection");
    },
  });

  return (
    <Field
      orientation="horizontal"
      className="text-muted-foreground has-data-[state=checked]:*:last:text-primary"
    >
      <FieldLabel>Dispute</FieldLabel>
      <Switch
        checked={optimisticSelected}
        disabled={!issueId}
        onCheckedChange={() => {
          if (!issueId) return;
          mutation.mutate({ issueId });
        }}
      />
      <FieldLabel>Accept</FieldLabel>
    </Field>
  );
}
