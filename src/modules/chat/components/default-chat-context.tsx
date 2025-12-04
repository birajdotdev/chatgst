"use client";

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
  chatId,
}: {
  children: ReactNode;
  chatId?: string;
}) {
  const [isLoading, setIsLoading] = useState(!!chatId);
  const hasLoadedHistory = useRef(false);

  // Create a stable chat instance using useMemo
  const chat = useMemo(() => {
    return new Chat<UIMessage>({
      id: chatId || "default-chat",
      transport: new DefaultChatTransport({
        api: chatId ? `/chat/api?chatId=${chatId}` : "/chat/api",
      }),
      onError: (error) => {
        const errorData = parseClientError(error);
        toast.error("Failed to send message", {
          description: errorData.message || "An unknown error occurred.",
        });
      },
    });
  }, [chatId]); // Only recreate if chatId changes

  // Load chat history when chatId is provided
  useEffect(() => {
    // Reset the loaded state when chatId changes
    hasLoadedHistory.current = false;

    async function loadChatHistory() {
      // Prevent loading if no chatId or already loaded
      if (!chatId || hasLoadedHistory.current) {
        setIsLoading(false);
        return;
      }

      hasLoadedHistory.current = true;
      setIsLoading(true);

      try {
        const response = await fetch(`/chat/api?chatId=${chatId}`);

        if (!response.ok) {
          const error = await response.json();
          toast.error("Failed to load chat history", {
            description: error.message || "Could not load previous messages.",
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

        toast.success("Chat history loaded", {
          // description: `Loaded previous messages.`,
        });
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
    <ChatContext.Provider value={{ chat, chatId: chatId || null, isLoading }}>
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
