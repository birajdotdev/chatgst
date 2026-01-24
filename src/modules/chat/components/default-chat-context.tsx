"use client";

import { useParams } from "next/navigation";
import { type ReactNode, createContext, useCallback, useContext } from "react";

import type { ChatStatus, FileUIPart, UIMessage } from "ai";
import { toast } from "sonner";

import { useChatSession } from "@/modules/chat/hooks/use-chat-session";

interface ChatContextValue {
  messages: UIMessage[];
  status: ChatStatus;
  sendMessage: (message: { text: string; files?: FileUIPart[] }) => void;
  stop: () => void;
  setMessages: (messages: UIMessage[]) => void;
  chatId: string | null;
  isLoadingHistory: boolean;
  historyError: string | null;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function DefaultChatProvider({
  children,
  chatId: propChatId,
}: {
  children: ReactNode;
  chatId?: string;
}) {
  const params = useParams();
  const paramChatId = params?.id as string;
  const chatId = propChatId || paramChatId || undefined;

  const {
    messages,
    status,
    sendMessage: originalSendMessage,
    stop,
    setMessages,
    isLoadingHistory,
    historyError,
  } = useChatSession({
    chatId,
    api: "/chat/api",
    onUnauthorized: () => {
      window.location.href = "/login";
    },
  });

  // Wrap sendMessage to match our expected interface
  const sendMessage = useCallback(
    (message: { text: string; files?: FileUIPart[] }) => {
      if (message.files?.length) {
        toast.success("Files attached", {
          description: `${message.files.length} file(s) attached to message`,
        });
      }
      originalSendMessage({
        text: message.text,
        files: message.files,
      });
    },
    [originalSendMessage]
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        status,
        sendMessage,
        stop,
        setMessages,
        chatId: chatId || null,
        isLoadingHistory,
        historyError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useDefaultChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useDefaultChat must be used within DefaultChatProvider");
  }
  return context;
}
