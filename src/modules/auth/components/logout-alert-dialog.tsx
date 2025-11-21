import React from "react";

import { useAction } from "next-safe-action/hooks";
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
import { Spinner } from "@/components/ui/spinner";
import { logoutAction } from "@/modules/auth/actions/logout-action";

export default function LogoutAlertDialog(
  props: React.ComponentProps<typeof AlertDialog>
) {
  const { execute, isExecuting, reset } = useAction(logoutAction, {
    onSuccess: () => {
      reset();
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handelLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    execute();
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will need to log in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="min-w-20"
            onClick={handelLogout}
            disabled={isExecuting}
          >
            {isExecuting ? <Spinner /> : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
