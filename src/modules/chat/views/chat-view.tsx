"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

import { ChatBot } from "@/components/chat-bot";
import { useDefaultChat } from "@/modules/chat/components/default-chat-context";

export function ChatView() {
  const { chat, isLoading, chatId } = useDefaultChat();
  const router = useRouter();
  const redirectedRef = useRef(false);

  const handleChatIdReceived = useCallback(
    (newChatId: string) => {
      // Only redirect if we're not already on a chat page and haven't redirected yet
      if (!chatId && !redirectedRef.current) {
        redirectedRef.current = true;
        router.push(`/chat/${newChatId}`);
      }
    },
    [chatId, router]
  );

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 items-center justify-center overflow-hidden">
        <div className="text-muted-foreground">Loading chat history...</div>
      </section>
    );
  }

  return (
    <section className="h-full flex-1 overflow-hidden">
      <ChatBot chat={chat} onChatIdReceived={handleChatIdReceived} />
    </section>
  );
}
