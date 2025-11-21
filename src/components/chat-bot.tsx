"use client";

import { Route } from "next";
import { ViewTransition, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

import { AIConversation } from "@/components/ai-conversation";
import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { cn } from "@/lib/utils";
import { parseClientError } from "@/types/errors";

interface ChatBotProps {
  aiPromptInputClassName?: string;
  className?: string;
  viewTransitionName?: string;
  chatId?: string;
  chatApiPath?: Route;
}

export function ChatBot({
  aiPromptInputClassName,
  className,
  viewTransitionName,
  chatId,
  chatApiPath,
}: ChatBotProps) {
  const [input, setInput] = useState<string>("");
  const { messages, regenerate, status, stop, sendMessage } = useChat({
    id: chatId,
    transport: new DefaultChatTransport({
      api: chatApiPath,
    }),
    onError: (error) => {
      const errorData = parseClientError(error);

      switch (errorData.code) {
        case "QUOTA_EXCEEDED":
          break;

        default:
          toast.error("Failed to send chat", {
            description: errorData.message || "An unknown error occurred.",
            action: {
              label: "Retry",
              onClick: () => regenerate(),
            },
          });
          break;
      }
    },
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
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col">
        <AIConversation messages={messages} status={status} />
        <ViewTransition name={viewTransitionName}>
          <AIPromptInput
            className={cn("mx-auto mt-4", aiPromptInputClassName)}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
          />
        </ViewTransition>
      </div>
    </div>
  );
}
