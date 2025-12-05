"use client";

import Link from "next/link";

import { AlertCircleIcon } from "lucide-react";

import { ChatBot } from "@/components/chat-bot";
import { Button } from "@/components/ui/button";
import { useDefaultChat } from "@/modules/chat/components/default-chat-context";

export function ChatView() {
  const { chat, isLoading, error, initialMessages } = useDefaultChat();

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 items-center justify-center overflow-hidden">
        <div className="text-muted-foreground">Loading chat history...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden">
        <div className="flex flex-col items-center gap-2">
          <AlertCircleIcon className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">{error}</p>
        </div>
        <Button asChild>
          <Link href="/chat">Start a New Chat</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="h-full flex-1 overflow-hidden">
      <ChatBot chat={chat} initialMessages={initialMessages} />
    </section>
  );
}
