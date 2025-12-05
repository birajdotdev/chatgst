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
  const { messages, sendMessage, status } = useChat({ chat });

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

  const receivedChatIdRef = useRef<string | null>(null);

  // Monitor for chat ID in the response
  useEffect(() => {
    if (receivedChatIdRef.current) return;

    // Look for chat ID in the messages
    for (const message of messages) {
      if (message.role === "assistant" && message.parts) {
        for (const part of message.parts) {
          if (part.type === "data-chat-id" && "data" in part) {
            const data = part.data as { chatId?: string };
            if (data.chatId) {
              console.log("[ChatInterface] Found chat ID:", data.chatId);
              receivedChatIdRef.current = data.chatId;

              // Update URL shallowly immediately for UX
              window.history.replaceState(null, "", `/chat/${data.chatId}`);
              return;
            }
          }
        }
      }
    }
  }, [messages]);

  // Wait for stream to finish before redirecting
  // This ensures backend has saved the full history
  useEffect(() => {
    if (
      receivedChatIdRef.current &&
      !hasRedirectedRef.current &&
      status === "ready"
    ) {
      // Only redirect if we have messages (sanity check)
      if (messages.length > 0) {
        hasRedirectedRef.current = true;
        const chatId = receivedChatIdRef.current;

        console.log("[ChatInterface] Stream finished, redirecting to:", chatId);

        // Save messages to session storage for immediate rendering on new page
        try {
          sessionStorage.setItem(
            `transfer_messages_${chatId}`,
            JSON.stringify(messages)
          );
        } catch (e) {
          console.error("Failed to save transfer messages", e);
        }

        // Perform full redirect to switch to DefaultChatProvider
        // We use router.replace for a seamless transition now that we wait for the stream
        router.replace(`/chat/${chatId}`);
      }
    }
  }, [status, messages]);

  return <ChatBot chat={chat} />;
}
