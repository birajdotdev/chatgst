"use client";

import { useMutation } from "@tanstack/react-query";
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
import {
  DeleteAppealInput,
  deleteAppealFn,
} from "@/modules/appeal-draft/actions/delete-appeal";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
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
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");

  const mutation = useMutation({
    mutationFn: (input: DeleteAppealInput) => deleteAppealFn({ data: input }),
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete appeal"
      );
    },
  });

  const handleDelete = () => {
    if (!documentId) {
      toast.error("Unable to delete: missing document context");
      return;
    }
    mutation.mutate({ appealId: appeal.id, documentId });
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
