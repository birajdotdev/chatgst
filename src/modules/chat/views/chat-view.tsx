"use client";

import { ChatBot } from "@/components/chat-bot";
import { useDefaultChat } from "@/modules/chat/components/default-chat-context";

export function ChatView() {
  const { chat } = useDefaultChat();
  return (
    <section className="h-full flex-1 overflow-hidden">
      <ChatBot
        chat={chat}
        className="max-w-5xl"
        aiPromptInputClassName="max-w-3xl"
      />
    </section>
  );
}
