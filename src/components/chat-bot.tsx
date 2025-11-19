"use client";

import { ViewTransition } from "react";

import { AIConversation } from "@/components/ai-conversation";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { cn } from "@/lib/utils";
import { ChatProps } from "@/modules/home/types/chat-props";

interface ChatBotProps extends ChatProps {
  aiPromptInputClassName?: string;
  className?: string;
  viewTransitionName?: string;
}

export function ChatBot({
  messages,
  aiPromptInputClassName,
  className,
  viewTransitionName,
  ...props
}: ChatBotProps) {
  return (
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col">
        <AIConversation messages={messages} status={props.status} />
        <ViewTransition name={viewTransitionName}>
          <AIPromptInput
            className={cn("mx-auto mt-4", aiPromptInputClassName)}
            {...props}
          />
        </ViewTransition>
      </div>
    </div>
  );
}
