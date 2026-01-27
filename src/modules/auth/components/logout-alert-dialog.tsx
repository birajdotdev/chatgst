"use client";

import React from "react";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
import { logoutFn } from "@/modules/auth/actions/logout-action";

export default function LogoutAlertDialog(
  props: React.ComponentProps<typeof AlertDialog>
) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handelLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
