"use client";

import { useRef, useState } from "react";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { cn } from "@/lib/utils";
import { ChatInterface } from "@/modules/chat/components/chat-interface";
import { CHAT_SUGGESTIONS } from "@/modules/chat/constants/chat-suggestions";

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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  // If we have a first message, show the chat interface which will handle creating the chat
  if (firstMessage) {
    return <ChatInterface initialMessage={firstMessage} />;
  }

  return (
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-8 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              How can I help you today?
            </h1>
            <p className="mt-2 text-muted-foreground">
              Ask me anything about GST appeals
            </p>
          </div>

          <Suggestions className="flex-wrap justify-center gap-2">
            {CHAT_SUGGESTIONS.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={handleSuggestionClick}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>

          <PromptInput
            className="mx-auto w-full max-w-2xl"
            globalDrop
            multiple
            onSubmit={handleSubmit}
          >
            <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about GST appeals..."
                ref={inputRef}
                value={input}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
