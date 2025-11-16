"use client";

import { useRouter } from "next/navigation";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { logoutAction } from "@/modules/auth/actions/logout-action";

export default function Page() {
  const router = useRouter();
  const { execute, isExecuting, reset } = useAction(logoutAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      router.push("/");
      reset();
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Logged in Successfully!</h1>
      <form action={execute}>
        <Button type="submit" size="lg" disabled={isExecuting}>
          {isExecuting ? <Spinner /> : "Logout"}
        </Button>
      </form>
    </div>
  );
}
