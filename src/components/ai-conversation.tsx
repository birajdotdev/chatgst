"use client";

import { Fragment, useEffect, useRef } from "react";

import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Badge } from "@/components/ui/badge";
import { ChatSuggestions } from "@/modules/chat/components/chat-suggestions";

interface AIConversationProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  status?: ChatStatus;
  loadingText?: string;
  onSuggestionClick?: (suggestion: string) => void;
}

export function AIConversation({
  messages,
  status,
  loadingText = "Generating your response...",
  onSuggestionClick,
}: AIConversationProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(messages.length);

  // Auto-scroll to bottom when messages change or when streaming
  useEffect(() => {
    const shouldScroll =
      messages.length > lastMessageCountRef.current ||
      status === "streaming" ||
      status === "submitted";

    if (shouldScroll && contentRef.current) {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }

    lastMessageCountRef.current = messages.length;
  }, [messages, status]);

  return (
    <Conversation className="h-full">
      <ConversationContent className="h-full">
        {messages.length === 0 ? (
          <ConversationEmptyState className="flex size-full items-center justify-center p-0">
            <ChatSuggestions onClick={onSuggestionClick} />
          </ConversationEmptyState>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <Fragment key={`${message.id}-${i}`}>
                        <Message from={message.role}>
                          <div className="flex flex-col gap-3">
                            <Badge
                              className="hidden w-fit rounded-full border-primary/25 bg-primary/5 px-3 py-1.5 text-primary uppercase group-[.is-assistant]:block"
                              variant="outline"
                            >
                              ChatGST AI
                            </Badge>
                            <MessageContent className="group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-user]:max-w-full group-[.is-user]:border group-[.is-user]:bg-card group-[.is-user]:text-foreground">
                              <Response>{part.text}</Response>
                            </MessageContent>
                          </div>
                        </Message>
                      </Fragment>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          ))
        )}
        {status === "submitted" && <Shimmer>{loadingText}</Shimmer>}
        {/* Scroll anchor */}
        <div ref={contentRef} />
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
