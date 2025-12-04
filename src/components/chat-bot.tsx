"use client";

import { ViewTransition, useRef, useState } from "react";

import { Chat, useChat } from "@ai-sdk/react";
import { UIDataTypes, UIMessage, UITools } from "ai";
import { toast } from "sonner";

import { AIConversation } from "@/components/ai-conversation";
import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { cn } from "@/lib/utils";

interface ChatBotProps {
  aiPromptInputClassName?: string;
  className?: string;
  viewTransitionName?: string;
  chat: Chat<UIMessage<unknown, UIDataTypes, UITools>>;
  onChatIdReceived?: (chatId: string) => void;
}

export function ChatBot({
  aiPromptInputClassName,
  className,
  viewTransitionName,
  chat: sharedChat,
  onChatIdReceived,
}: ChatBotProps) {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, stop, sendMessage } = useChat({
    chat: sharedChat,
  });

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

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
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col">
        <AIConversation
          messages={messages}
          status={status}
          onSuggestionClick={handleSuggestionClick}
        />
        <ViewTransition name={viewTransitionName}>
          <AIPromptInput
            ref={inputRef}
            className={cn("mx-auto mt-4", aiPromptInputClassName)}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            status={status}
          />
        </ViewTransition>
      </div>
    </div>
  );
}
