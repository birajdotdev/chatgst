"use client";

import { useAction } from "next-safe-action/hooks";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteAppealAction } from "@/modules/appeal-draft/actions/delete-appeal";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";
import { AppealHistory } from "@/modules/appeal-draft/types/appeal-history";

interface DeleteAppealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appeal: AppealHistory;
}

export function DeleteAppealDialog({
  open,
  onOpenChange,
  appeal,
}: DeleteAppealDialogProps) {
  const [documentId] = useQueryState(
    "documentId",
    appealDraftSearchParams.documentId
  );

  const { execute, isExecuting } = useAction(deleteAppealAction, {
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const handleDelete = () => {
    if (documentId) {
      execute({ appealId: appeal.id, documentId });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            appeal draft &quot;
            <span className="break-all">{appeal.appeal_name}</span>
            &quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={buttonVariants({ variant: "destructive" })}
            disabled={isExecuting}
          >
            {isExecuting ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
