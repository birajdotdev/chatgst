"use client";

import { useParams, useRouter } from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";

import { parseClientError } from "@/types/errors";

interface ChatContextValue {
  chat: Chat<UIMessage>;
  chatId: string | null;
  isLoading: boolean;
  error: string | null;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatHistoryResponse {
  message: string;
  data: Array<{
    query: string;
    response: string;
  }>;
}

export function DefaultChatProvider({
  children,
  chatId: propChatId,
}: {
  children: ReactNode;
  chatId?: string;
}) {
  const params = useParams();
  const router = useRouter();
  const paramChatId = params?.id as string;
  const chatId = propChatId || paramChatId;

  const [isLoading, setIsLoading] = useState(!!chatId);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedHistory = useRef(false);
  const chatInstanceRef = useRef<Chat<UIMessage> | null>(null);
  const justCreatedChatIdRef = useRef<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(
    chatId || null
  );

  // Track if we've already redirected to prevent duplicate redirects
  const hasRedirectedRef = useRef(false);

  // Create a stable chat instance using useMemo
  const chat = useMemo(() => {
    const effectiveChatId = currentChatId || chatId;

    // Check if we can reuse the existing instance
    if (chatInstanceRef.current) {
      const currentInstanceId = chatInstanceRef.current.id;

      // If IDs match, reuse
      if (currentInstanceId === effectiveChatId) {
        return chatInstanceRef.current;
      }

      // If we just created this chat (transition from default -> specific ID)
      if (effectiveChatId && effectiveChatId === justCreatedChatIdRef.current) {
        // Reuse the instance to keep stream alive!
        return chatInstanceRef.current;
      }

      // If current is "default-chat" and effective is null/undefined, reuse
      if (currentInstanceId === "default-chat" && !effectiveChatId) {
        return chatInstanceRef.current;
      }
    }

    const apiUrl = effectiveChatId
      ? `/chat/api?chatId=${effectiveChatId}`
      : "/chat/api";

    const newChat = new Chat<UIMessage>({
      id: effectiveChatId || "default-chat",
      transport: new DefaultChatTransport({
        api: apiUrl,
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

    chatInstanceRef.current = newChat;
    return newChat;
  }, [chatId, currentChatId]); // Recreate if chatId or currentChatId changes

  // Load chat history when chatId is provided
  useEffect(() => {
    // Reset the loaded state when chatId changes
    hasLoadedHistory.current = false;
    setError(null);

    async function loadChatHistory() {
      // Prevent loading if no chatId or already loaded
      if (!chatId || hasLoadedHistory.current) {
        setIsLoading(false);
        return;
      }

      hasLoadedHistory.current = true;

      // Only show loading if we don't have messages (e.g. fresh load)
      // If we preserved messages from previous instance, skip loading state
      if (chat.messages.length === 0) {
        setIsLoading(true);
      }

      try {
        const response = await fetch(`/chat/api?chatId=${chatId}`);

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login";
            return;
          }
          const errorData = await response.json();
          // Set error state for 404 (chat not found) or other errors
          if (response.status === 404) {
            setError("Chat not found. It may have been deleted.");
          } else {
            setError(errorData.message || "Could not load chat history.");
          }
          toast.error("Failed to load chat history", {
            description:
              errorData.message || "Could not load previous messages.",
          });
          return;
        }

        const historyData: ChatHistoryResponse = await response.json();

        // Convert chat history to UIMessage format
        const messages: UIMessage[] = [];
        historyData.data.forEach((item) => {
          // Add user message
          messages.push({
            id: `user-${messages.length}`,
            role: "user",
            parts: [{ type: "text", text: item.query }],
          });
          // Add assistant message
          messages.push({
            id: `assistant-${messages.length}`,
            role: "assistant",
            parts: [{ type: "text", text: item.response }],
          });
        });

        // Directly set messages on the chat instance
        // @ts-ignore - messages is a writable property
        chat.messages = messages;

        // Don't show toast - loading state is sufficient feedback
      } catch (error) {
        console.error("Error loading chat history:", error);
        toast.error("Failed to load chat history", {
          description: "An unexpected error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]); // chat not needed in deps - it's memoized with [chatId]

  return (
    <ChatContext.Provider
      value={{
        chat,
        chatId: currentChatId || chatId || null,
        isLoading,
        error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useDefaultChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useDefaultChat must be used within GeneralChatProvider");
  }
  return context;
}
