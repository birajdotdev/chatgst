"use client";

import { ChatBot } from "@/components/chat-bot";
import { ChatLimitAlertDialog } from "@/modules/chat/components/chat-limit-alert-dialog";
import { useGeneralChat } from "@/modules/chat/components/general-chat-context";

export function GeneralChatView() {
  const { chat, isQuotaExceeded, setIsQuotaExceeded } = useGeneralChat();

  return (
    <>
      <main className="mx-auto flex h-full max-h-screen min-h-screen">
        <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pt-16 pb-6 md:rounded-2xl">
          <ChatBot chat={chat} viewTransitionName="general-chat" />
        </section>
      </main>

      <ChatLimitAlertDialog
        open={isQuotaExceeded}
        onOpenChange={setIsQuotaExceeded}
      />
    </>
  );
}
