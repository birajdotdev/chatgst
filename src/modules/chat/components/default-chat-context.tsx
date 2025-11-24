"use client";

import { type ReactNode, createContext, useContext } from "react";

import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";

import { parseClientError } from "@/types/errors";

interface ChatContextValue {
  chat: Chat<UIMessage>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function DefaultChatProvider({ children }: { children: ReactNode }) {
  const chat = new Chat<UIMessage>({
    id: "default-chat",
    transport: new DefaultChatTransport({
      api: "/chat/api",
    }),
    onError: (error) => {
      const errorData = parseClientError(error);
      toast.error("Failed to send message", {
        description: errorData.message || "An unknown error occurred.",
      });
    },
  });
  return (
    <ChatContext.Provider value={{ chat }}>{children}</ChatContext.Provider>
  );
}

export function useDefaultChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useDefaultChat must be used within GeneralChatProvider");
  }
  return context;
}
