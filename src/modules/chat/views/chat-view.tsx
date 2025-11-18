"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { logoutAction } from "@/modules/auth/actions/logout-action";
import { ChatLayout } from "@/modules/chat/layouts/chat-layout";
import { Navbar } from "@/modules/home/components/navbar";

export function ChatView() {
  const { execute, isExecuting, reset } = useAction(logoutAction, {
    onSuccess: () => {
      reset();
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  return (
    <div className="flex h-screen flex-col">
      <Navbar className="shrink-0 border-b bg-background" />
      <div className="flex flex-1 pt-16">
        <ChatLayout>
          <section className="flex flex-1 flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold">Logged in Successfully!</h1>
            <form action={execute}>
              <Button type="submit" size="lg" disabled={isExecuting}>
                {isExecuting ? <Spinner /> : "Logout"}
              </Button>
            </form>
          </section>
        </ChatLayout>
      </div>
    </div>
  );
}
