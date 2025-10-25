"use client";

import { useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";

import { AIConversation } from "./ai-conversation";
import { AIPromptInput } from "./ai-prompt-input";

export function ChatBot() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/chat/api",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
  };

  return (
    <div className="relative mx-auto size-full max-w-4xl">
      <div className="flex h-full flex-col">
        <AIConversation messages={messages} status={status} />
        <AIPromptInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          status={status}
          className="mt-4"
        />
      </div>
    </div>
  );
}
