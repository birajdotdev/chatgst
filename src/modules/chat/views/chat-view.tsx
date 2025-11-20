"use client";

import { useChat } from "@ai-sdk/react";

import { ChatBot } from "@/components/chat-bot";

export function ChatView() {
  const { messages } = useChat();
  return (
    <ChatBot
      messages={messages}
      onSubmit={() => {}}
      className="max-w-5xl"
      aiPromptInputClassName="max-w-3xl"
    />
  );
}
