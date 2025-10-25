"use client";

import { Fragment } from "react";

import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";

import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Badge } from "@/components/ui/badge";

interface AIConversationProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  status?: ChatStatus;
  loadingText?: string;
}

export function AIConversation({
  messages,
  status,
  loadingText = "Generating your response...",
}: AIConversationProps) {
  return (
    <Conversation className="h-full">
      <ConversationContent>
        {messages.map((message) => (
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
        ))}
        {status === "submitted" && <Shimmer>{loadingText}</Shimmer>}
      </ConversationContent>
    </Conversation>
  );
}
