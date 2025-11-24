"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";

import { ErrorCodes, parseClientError } from "@/types/errors";

interface ChatContextValue {
  chat: Chat<UIMessage>;
  isQuotaExceeded: boolean;
  setIsQuotaExceeded: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function GeneralChatProvider({ children }: { children: ReactNode }) {
  const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);

  const chat = new Chat<UIMessage>({
    id: "general-chat",
    transport: new DefaultChatTransport({
      api: "/general/api",
    }),
    onError: (error) => {
      const errorData = parseClientError(error);

      switch (errorData.code) {
        case ErrorCodes.QUOTA_EXCEEDED:
          setIsQuotaExceeded(true);
          break;

        default:
          toast.error("Failed to send message", {
            description: errorData.message || "An unknown error occurred.",
          });
          break;
      }
    },
  });
  return (
    <ChatContext.Provider value={{ chat, isQuotaExceeded, setIsQuotaExceeded }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useGeneralChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useGeneralChat must be used within GeneralChatProvider");
  }
  return context;
}
