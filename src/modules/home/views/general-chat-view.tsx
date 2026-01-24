"use client";

import { ChatBot } from "@/components/chat-bot";
import { ChatLimitAlertDialog } from "@/modules/chat/components/chat-limit-alert-dialog";
import { useGeneralChat } from "@/modules/chat/components/general-chat-context";

export function GeneralChatView() {
  const {
    messages,
    status,
    sendMessage,
    stop,
    isQuotaExceeded,
    setIsQuotaExceeded,
  } = useGeneralChat();

  return (
    <>
      <main className="mx-auto flex h-full max-h-screen min-h-screen">
        <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pb-6 pt-16 md:rounded-2xl">
          <ChatBot
            messages={messages}
            sendMessage={sendMessage}
            status={status}
            stop={stop}
            viewTransitionName="general-chat"
          />
        </section>
      </main>

      <ChatLimitAlertDialog
        onOpenChange={setIsQuotaExceeded}
        open={isQuotaExceeded}
      />
    </>
  );
}
