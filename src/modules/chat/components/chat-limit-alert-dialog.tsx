import Link from "next/link";

import { CircleAlert } from "lucide-react";

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

export function ChatLimitAlertDialog(
  props: React.ComponentProps<typeof AlertDialog>
) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="gap-6 rounded-xl!">
        <div className="flex h-fit! justify-center">
          <div className="rounded-full bg-primary/5 p-2 pb-0.5">
            <div className="inline-block rounded-full bg-primary/10 p-3">
              <CircleAlert className="text-primary" />
            </div>
          </div>
        </div>
        <AlertDialogHeader className="gap-3 text-center!">
          <AlertDialogTitle className="text-xl">
            Limit reached! Please login to chat more
          </AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;ve used your 3 free chats. Please log in to continue
            chatting without interruptions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center! gap-3">
          <AlertDialogCancel className="min-w-[145px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="min-w-[145px]" asChild>
            <Link href="/login">Log In to continue</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
