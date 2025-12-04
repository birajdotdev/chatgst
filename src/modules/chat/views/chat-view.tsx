"use client";

import { ChatBot } from "@/components/chat-bot";
import { useDefaultChat } from "@/modules/chat/components/default-chat-context";

export function ChatView() {
  const { chat, isLoading } = useDefaultChat();

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 items-center justify-center overflow-hidden">
        <div className="text-muted-foreground">Loading chat history...</div>
      </section>
    );
  }

  return (
    <section className="h-full flex-1 overflow-hidden">
      <ChatBot chat={chat} />
    </section>
  );
}
