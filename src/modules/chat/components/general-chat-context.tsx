"use client";

import { type ReactNode, createContext, useCallback, useContext, useState } from "react";

import type { ChatStatus, FileUIPart, UIMessage } from "ai";
import { toast } from "sonner";

import { useChatSession } from "@/modules/chat/hooks/use-chat-session";

interface ChatContextValue {
  messages: UIMessage[];
  status: ChatStatus;
  sendMessage: (message: { text: string; files?: FileUIPart[] }) => void;
  stop: () => void;
  setMessages: (messages: UIMessage[]) => void;
  isQuotaExceeded: boolean;
  setIsQuotaExceeded: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function GeneralChatProvider({ children }: { children: ReactNode }) {
  const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);

  const {
    messages,
    status,
    sendMessage: originalSendMessage,
    stop,
    setMessages,
  } = useChatSession({
    api: "/general/api",
    onQuotaExceeded: () => {
      setIsQuotaExceeded(true);
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
        isQuotaExceeded,
        setIsQuotaExceeded,
      }}
    >
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
