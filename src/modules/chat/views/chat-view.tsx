"use client";

import Link from "next/link";

import { AlertCircleIcon } from "lucide-react";

import { ChatBot } from "@/components/chat-bot";
import { Button } from "@/components/ui/button";
import { ChatSkeleton } from "@/modules/chat/components/chat-skeleton";
import { useDefaultChat } from "@/modules/chat/components/default-chat-context";

export function ChatView() {
  const {
    messages,
    status,
    sendMessage,
    stop,
    isLoadingHistory,
    historyError,
  } = useDefaultChat();

  if (isLoadingHistory) {
    return (
      <section className="h-full flex-1 overflow-hidden">
        <ChatSkeleton />
      </section>
    );
  }

  if (historyError) {
    return (
      <section className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden">
        <div className="flex flex-col items-center gap-2">
          <AlertCircleIcon className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">{historyError}</p>
        </div>
        <Button asChild>
          <Link href="/chat">Start a New Chat</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="h-full flex-1 overflow-hidden">
      <ChatBot
        messages={messages}
        sendMessage={sendMessage}
        status={status}
        stop={stop}
      />
    </section>
  );
}
