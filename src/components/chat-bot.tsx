"use client";

import { AIConversation } from "@/components/ai-conversation";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { ChatProps } from "@/modules/home/types/chat-props";

export function ChatBot({ messages, ...props }: ChatProps) {
  return (
    <div className="relative mx-auto size-full max-w-4xl">
      <div className="flex h-full flex-col">
        <AIConversation messages={messages} status={props.status} />
        <AIPromptInput className="mt-4" {...props} />
      </div>
    </div>
  );
}
