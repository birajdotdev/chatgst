"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Chat, useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { toast } from "sonner";

import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { ChatBot } from "@/components/chat-bot";
import { parseClientError } from "@/types/errors";

interface ChatInterfaceProps {
  initialMessage: PromptInputMessage;
}

/**
 * Component that handles sending the first message to create a new chat
 * and redirects to the chat ID once received from the backend
 */
export function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const router = useRouter();
  const hasRedirectedRef = useRef(false);
  const chatInstanceRef = useRef<Chat<UIMessage> | null>(null);

  // Create a chat instance without an ID (new chat)
  if (!chatInstanceRef.current) {
    chatInstanceRef.current = new Chat<UIMessage>({
      id: "new-chat",
      transport: new DefaultChatTransport({
        api: "/chat/api",
      }),
      onError: (error) => {
        const errorData = parseClientError(error);
        if (errorData.status === 401) {
          window.location.href = "/login";
          return;
        }
        toast.error("Failed to send message", {
          description: errorData.message || "An unknown error occurred.",
        });
      },
    });
  }

  const chat = chatInstanceRef.current;
  const { messages, sendMessage } = useChat({ chat });

  // Send the initial message when component mounts
  useEffect(() => {
    if (chat.messages.length === 0) {
      if (initialMessage.files?.length) {
        toast.success("Files attached", {
          description: `${initialMessage.files.length} file(s) attached to message`,
        });
      }

      sendMessage({
        text: initialMessage.text || "Sent with attachments",
        files: initialMessage.files,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Monitor for chat ID in the response and redirect
  useEffect(() => {
    if (hasRedirectedRef.current) return;

    // Look for chat ID in the messages (sent by backend in stream)
    for (const message of messages) {
      if (message.role === "assistant" && message.parts) {
        for (const part of message.parts) {
          // Check if this part contains the chat ID
          if (part.type === "data-chat-id" && "data" in part) {
            const data = part.data as { chatId?: string };
            if (data.chatId) {
              console.log(
                "[ChatInterface] Found chat ID, redirecting:",
                data.chatId
              );
              hasRedirectedRef.current = true;

              // Redirect to the real chat ID
              router.replace(`/chat/${data.chatId}`);
              return;
            }
          }
        }
      }
    }
  }, [messages, router]);

  return <ChatBot chat={chat} />;
}
