"use client";

import { Fragment, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

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
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Badge } from "@/components/ui/badge";

export function ChatBot() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
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
    <div className="relative mx-auto size-full max-w-4xl">
      <div className="flex h-full flex-col">
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
            {status === "submitted" && (
              <Shimmer>Generating your response...</Shimmer>
            )}
          </ConversationContent>
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4 rounded"
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
              <PromptInputUploadButton />
            </PromptInputTools>
            <PromptInputSubmit
              disabled={(!input.trim() && !status) || status === "streaming"}
              status={status}
              className="rounded-full"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

function PromptInputUploadButton() {
  const attachments = usePromptInputAttachments();

  return (
    <PromptInputButton
      variant="outline"
      className="rounded-full"
      onClick={() => attachments.openFileDialog()}
    >
      <PlusCircle />
      <span>Upload Document</span>
    </PromptInputButton>
  );
}
