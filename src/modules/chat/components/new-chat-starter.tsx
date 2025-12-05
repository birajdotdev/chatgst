"use client";

import { useRef, useState } from "react";

import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { cn } from "@/lib/utils";
import { ChatInterface } from "@/modules/chat/components/chat-interface";

/**
 * Component for the /chat route that handles the first message
 * and creates a chat with a real ID on the fly
 */
export function NewChatStarter({ className }: { className?: string }) {
  const [input, setInput] = useState<string>("");
  const [firstMessage, setFirstMessage] = useState<PromptInputMessage | null>(
    null
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    // Store the first message and switch to chat interface
    setFirstMessage(message);
  };

  // If we have a first message, show the chat interface which will handle creating the chat
  if (firstMessage) {
    return <ChatInterface initialMessage={firstMessage} />;
  }

  return (
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              How can I help you today?
            </h1>
          </div>

          <AIPromptInput
            ref={inputRef}
            className="mx-auto"
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            status="idle"
          />
        </div>
      </div>
    </div>
  );
}
