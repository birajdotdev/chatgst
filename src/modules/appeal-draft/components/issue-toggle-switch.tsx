"use client";

import { useOptimisticAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { toggleIssueSelectionAction } from "@/modules/appeal-draft/actions/toggle-issue-selection-action";

interface IssueToggleSwitchProps {
  issueId?: string;
  selected?: boolean;
}

export function IssueToggleSwitch({
  issueId,
  selected,
}: IssueToggleSwitchProps) {
  const { execute, optimisticState } = useOptimisticAction(
    toggleIssueSelectionAction,
    {
      currentState: { selected: selected ?? false },
      updateFn: (state) => ({
        selected: !state.selected,
      }),
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to toggle issue selection");
      },
    }
  );
  return (
    <Field
      orientation="horizontal"
      className="text-muted-foreground has-data-[state=checked]:*:last:text-primary"
    >
      <FieldLabel>Dispute</FieldLabel>
      <Switch
        checked={optimisticState?.selected ?? false}
        disabled={!issueId}
        onCheckedChange={() => {
          if (!issueId) return;
          execute({ issueId });
        }}
      />
      <FieldLabel>Accept</FieldLabel>
    </Field>
  );
}
