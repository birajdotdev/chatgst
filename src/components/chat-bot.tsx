"use client";

import { Fragment, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { PlusCircle } from "lucide-react";

import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Badge } from "@/components/ui/badge";

import { Shimmer } from "./ai-elements/shimmer";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
  };

  console.log("Messages array:", messages);
  console.log("Status:", status);
  console.log("Error:", error);

  return (
    <div className="relative mx-auto size-full h-screen max-w-4xl p-6">
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => {
              console.log(
                "Message:",
                message.id,
                "Role:",
                message.role,
                "Parts count:",
                message.parts.length
              );
              return (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    console.log("Part type:", part.type, "Part:", part);
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
                                  {message.role === "assistant" ? (
                                    <div
                                      className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none"
                                      dangerouslySetInnerHTML={{
                                        __html: part.text,
                                      }}
                                    />
                                  ) : (
                                    part.text
                                  )}
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
              );
            })}
            {status === "submitted" && (
              <Shimmer>Generating your response...</Shimmer>
            )}
          </ConversationContent>
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4 rounded bg-card"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type any queries related to GST here"
              className="!rounded-2xl"
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton variant="outline" className="rounded-full">
                <PlusCircle />
                <span>Upload Document</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit
              disabled={!input && !status}
              status={status}
              className="rounded-full"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
