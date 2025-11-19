"use client";

import { useChat } from "@ai-sdk/react";

import { ChatBot } from "@/components/chat-bot";
import { Navbar } from "@/components/navbar";
import { UserProfile } from "@/lib/auth";
import { ChatLayout } from "@/modules/chat/layouts/chat-layout";

interface ChatViewProps {
  isAuthenticated?: boolean;
  user?: UserProfile | null;
}

export function ChatView({ isAuthenticated, user }: ChatViewProps) {
  const { messages } = useChat();
  return (
    <div className="flex h-screen flex-col">
      <Navbar
        className="shrink-0 border-b bg-background"
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <div className="flex flex-1 pt-16">
        <ChatLayout>
          <ChatBot
            messages={messages}
            onSubmit={() => {}}
            className="max-w-5xl"
            aiPromptInputClassName="max-w-3xl"
          />
        </ChatLayout>
      </div>
    </div>
  );
}
