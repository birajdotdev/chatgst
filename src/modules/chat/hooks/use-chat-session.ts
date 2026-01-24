"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ErrorCodes, parseClientError } from "@/types/errors";

interface ChatHistoryResponse {
  message: string;
  data: Array<{
    query: string;
    response: string;
  }>;
}

interface UseChatSessionOptions {
  chatId?: string;
  api?: string;
  onQuotaExceeded?: () => void;
  onUnauthorized?: () => void;
}

export function useChatSession({
  chatId,
  api = "/chat/api",
  onQuotaExceeded,
  onUnauthorized,
}: UseChatSessionOptions = {}) {
  const [isLoadingHistory, setIsLoadingHistory] = useState(!!chatId);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const hasLoadedHistory = useRef(false);

  // Build the API URL with chatId if provided
  const apiUrl = chatId ? `${api}?chatId=${chatId}` : api;

  const chatSession = useChat({
    id: chatId || "new-chat",
    transport: new DefaultChatTransport({
      api: apiUrl,
    }),
    onError: (error) => {
      const errorData = parseClientError(error);

      switch (errorData.code) {
        case ErrorCodes.QUOTA_EXCEEDED:
          onQuotaExceeded?.();
          break;

        default:
          if (errorData.status === 401) {
            onUnauthorized?.();
            return;
          }
          toast.error("Failed to send message", {
            description: errorData.message || "An unknown error occurred.",
          });
          break;
      }
    },
  });

  const { setMessages } = chatSession;

  // Load chat history when chatId is provided
  const loadChatHistory = useCallback(async () => {
    if (!chatId || hasLoadedHistory.current) {
      setIsLoadingHistory(false);
      return;
    }

    hasLoadedHistory.current = true;
    setHistoryError(null);

    // Check for transferred messages from redirect
    const transferKey = `transfer_messages_${chatId}`;
    const transferMessages = sessionStorage.getItem(transferKey);

    if (transferMessages) {
      try {
        const messages = JSON.parse(transferMessages) as UIMessage[];
        setMessages(messages);
        sessionStorage.removeItem(transferKey);
        setIsLoadingHistory(false);
        return;
      } catch (e) {
        console.error("Failed to parse transfer messages", e);
      }
    }

    setIsLoadingHistory(true);

    try {
      const response = await fetch(`${api}?chatId=${chatId}`);

      if (!response.ok) {
        if (response.status === 401) {
          onUnauthorized?.();
          return;
        }
        const errorData = await response.json();
        if (response.status === 404) {
          setHistoryError("Chat not found. It may have been deleted.");
        } else {
          setHistoryError(errorData.message || "Could not load chat history.");
        }
        toast.error("Failed to load chat history", {
          description: errorData.message || "Could not load previous messages.",
        });
        return;
      }

      const historyData: ChatHistoryResponse = await response.json();

      // Convert chat history to UIMessage format
      const messages: UIMessage[] = [];
      historyData.data.forEach((item) => {
        messages.push({
          id: `user-${messages.length}`,
          role: "user",
          parts: [{ type: "text", text: item.query }],
        });
        messages.push({
          id: `assistant-${messages.length}`,
          role: "assistant",
          parts: [{ type: "text", text: item.response }],
        });
      });

      setMessages(messages);
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast.error("Failed to load chat history", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [chatId, api, setMessages, onUnauthorized]);

  // Load history on mount or chatId change
  useEffect(() => {
    hasLoadedHistory.current = false;
    loadChatHistory();
  }, [loadChatHistory]);

  return {
    ...chatSession,
    isLoadingHistory,
    historyError,
    chatId,
  };
}
