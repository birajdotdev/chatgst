import { Suspense } from "react";

import { ChatBot } from "@/components/chat-bot";
import { Spinner } from "@/components/ui/spinner";

export function ChatView() {
  return (
    <main className="mx-auto flex h-full max-h-screen min-h-screen">
      <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pt-16 pb-6 md:rounded-2xl">
        <Suspense fallback={<ChatBotSkeleton />}>
          <ChatBot />
        </Suspense>
      </section>
    </main>
  );
}

function ChatBotSkeleton() {
  return (
    <div className="relative mx-auto size-full max-w-4xl">
      <div className="flex h-full flex-col items-center justify-center">
        <Spinner className="size-10 text-primary" />
      </div>
    </div>
  );
}
