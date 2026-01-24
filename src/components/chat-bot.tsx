"use client";

import { ViewTransition, useEffect, useRef, useState } from "react";

import type { ChatStatus, FileUIPart, UIMessage } from "ai";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
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
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CHAT_SUGGESTIONS } from "@/modules/chat/constants/chat-suggestions";

interface ChatBotProps {
  messages: UIMessage[];
  status: ChatStatus;
  sendMessage: (message: { text: string; files?: FileUIPart[] }) => void;
  stop: () => void;
  promptInputClassName?: string;
  className?: string;
  viewTransitionName?: string;
  loadingText?: string;
}

export function ChatBot({
  messages,
  status,
  sendMessage,
  stop,
  promptInputClassName,
  className,
  viewTransitionName,
  loadingText = "Generating your response...",
}: ChatBotProps) {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasSentPendingMessageRef = useRef(false);

  // Check for pending message from /chat redirect and send it
  useEffect(() => {
    if (hasSentPendingMessageRef.current) return;

    const pendingMessage = sessionStorage.getItem("pendingChatMessage");
    const pendingChatId = sessionStorage.getItem("pendingChatId");

    if (pendingMessage && pendingChatId) {
      try {
        const message: PromptInputMessage = JSON.parse(pendingMessage);

        // Clear from session storage
        sessionStorage.removeItem("pendingChatMessage");
        sessionStorage.removeItem("pendingChatId");

        hasSentPendingMessageRef.current = true;

        // Send the message
        if (message.files?.length) {
          toast.success("Files attached", {
            description: `${message.files.length} file(s) attached to message`,
          });
        }

        sendMessage({
          text: message.text || "Sent with attachments",
          files: message.files as FileUIPart[] | undefined,
        });
      } catch (error) {
        console.error("Error sending pending message:", error);
        sessionStorage.removeItem("pendingChatMessage");
        sessionStorage.removeItem("pendingChatId");
      }
    }
  }, [sendMessage]);

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

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files as FileUIPart[] | undefined,
    });

    setInput("");
  };

  return (
    <div className={cn("relative mx-auto size-full max-w-4xl", className)}>
      <div className="flex h-full flex-col">
        {/* Conversation Area */}
        <Conversation className="h-full">
          <ConversationContent className="h-full">
            {messages.length === 0 ? (
              <ConversationEmptyState className="flex size-full items-center justify-center p-0">
                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    <h2 className="mb-2 text-2xl font-semibold">
                      How can I help you today?
                    </h2>
                    <p className="text-muted-foreground">
                      Ask me anything about GST appeals
                    </p>
                  </div>
                  <Suggestions className="max-w-2xl flex-wrap justify-center gap-2">
                    {CHAT_SUGGESTIONS.map((suggestion) => (
                      <Suggestion
                        key={suggestion}
                        onClick={handleSuggestionClick}
                        suggestion={suggestion}
                      />
                    ))}
                  </Suggestions>
                </div>
              </ConversationEmptyState>
            ) : (
              messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Message from={message.role} key={`${message.id}-${i}`}>
                            <div className="flex flex-col gap-3">
                              <Badge
                                className="hidden w-fit rounded-full border-primary/25 bg-primary/5 px-3 py-1.5 uppercase text-primary group-[.is-assistant]:block"
                                variant="outline"
                              >
                                ChatGST AI
                              </Badge>
                              <MessageContent className="group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-user]:max-w-full group-[.is-user]:border group-[.is-user]:bg-card group-[.is-user]:text-foreground">
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </div>
                          </Message>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))
            )}
            {status === "submitted" && <Shimmer>{loadingText}</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Prompt Input Area */}
        <ViewTransition name={viewTransitionName}>
          <div className={cn("mx-auto mt-4 w-full px-4 pb-4", promptInputClassName)}>
            <PromptInput globalDrop multiple onSubmit={handleSubmit}>
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
                <PromptInputSubmit status={status} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}
