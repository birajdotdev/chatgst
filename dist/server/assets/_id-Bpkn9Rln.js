import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useMemo, useEffect, createContext, useContext } from "react";
import { Chat } from "@ai-sdk/react";
import { useParams, useRouter, Link } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { p as parseClientError } from "./ai-prompt-input-BdA0Jq8v.js";
import { AlertCircleIcon } from "lucide-react";
import { C as ChatBot } from "./chat-bot-CobpGUWL.js";
import { B as Button } from "./button-D5vTpyVN.js";
import { S as Skeleton } from "./skeleton-hioRrLEH.js";
import "./tooltip-DRYX_Imi.js";
import "./scroll-area-Bvwd_GHq.js";
import "@base-ui/react/scroll-area";
import "radix-ui";
import "nanoid";
import "./input-group-HiwdIxtQ.js";
import "class-variance-authority";
import "./input-DokJ73Yy.js";
import "use-stick-to-bottom";
import "streamdown";
import "motion/react";
import "./badge-BlrAC-0Q.js";
import "clsx";
import "tailwind-merge";
const ChatContext = createContext(void 0);
function DefaultChatProvider({
  children,
  chatId: propChatId
}) {
  const params = useParams();
  useRouter();
  const paramChatId = params?.id;
  const chatId = propChatId || paramChatId;
  const [isLoading, setIsLoading] = useState(!!chatId);
  const [error, setError] = useState(null);
  const [initialMessages, setInitialMessages] = useState([]);
  const hasLoadedHistory = useRef(false);
  const chatInstanceRef = useRef(null);
  const justCreatedChatIdRef = useRef(null);
  const [currentChatId, setCurrentChatId] = useState(
    chatId || null
  );
  useRef(false);
  const chat = useMemo(() => {
    const effectiveChatId = currentChatId || chatId;
    if (chatInstanceRef.current) {
      const currentInstanceId = chatInstanceRef.current.id;
      if (currentInstanceId === effectiveChatId) {
        return chatInstanceRef.current;
      }
      if (effectiveChatId && effectiveChatId === justCreatedChatIdRef.current) {
        return chatInstanceRef.current;
      }
      if (currentInstanceId === "default-chat" && !effectiveChatId) {
        return chatInstanceRef.current;
      }
    }
    const apiUrl = effectiveChatId ? `/chat/api?chatId=${effectiveChatId}` : "/chat/api";
    const newChat = new Chat({
      id: effectiveChatId || "default-chat",
      transport: new DefaultChatTransport({
        api: apiUrl
      }),
      onError: (error2) => {
        const errorData = parseClientError(error2);
        if (errorData.status === 401) {
          window.location.href = "/login";
          return;
        }
        toast.error("Failed to send message", {
          description: errorData.message || "An unknown error occurred."
        });
      }
    });
    chatInstanceRef.current = newChat;
    return newChat;
  }, [chatId, currentChatId]);
  useEffect(() => {
    hasLoadedHistory.current = false;
    setError(null);
    async function loadChatHistory() {
      if (!chatId || hasLoadedHistory.current) {
        setIsLoading(false);
        return;
      }
      hasLoadedHistory.current = true;
      const transferKey = `transfer_messages_${chatId}`;
      const transferMessages = sessionStorage.getItem(transferKey);
      if (transferMessages) {
        try {
          const messages = JSON.parse(transferMessages);
          chat.messages = messages;
          setInitialMessages(messages);
          sessionStorage.removeItem(transferKey);
          setIsLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse transfer messages", e);
        }
      }
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
          if (response.status === 404) {
            setError("Chat not found. It may have been deleted.");
          } else {
            setError(errorData.message || "Could not load chat history.");
          }
          toast.error("Failed to load chat history", {
            description: errorData.message || "Could not load previous messages."
          });
          return;
        }
        const historyData = await response.json();
        const messages = [];
        historyData.data.forEach((item) => {
          messages.push({
            id: `user-${messages.length}`,
            role: "user",
            parts: [{ type: "text", text: item.query }]
          });
          messages.push({
            id: `assistant-${messages.length}`,
            role: "assistant",
            parts: [{ type: "text", text: item.response }]
          });
        });
        chat.messages = messages;
      } catch (error2) {
        console.error("Error loading chat history:", error2);
        toast.error("Failed to load chat history", {
          description: "An unexpected error occurred."
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadChatHistory();
  }, [chatId]);
  return /* @__PURE__ */ jsx(
    ChatContext.Provider,
    {
      value: {
        chat,
        chatId: currentChatId || chatId || null,
        isLoading,
        error,
        initialMessages
      },
      children
    }
  );
}
function useDefaultChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useDefaultChat must be used within GeneralChatProvider");
  }
  return context;
}
function ChatSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-end gap-3", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[40px] w-3/4 max-w-[400px] rounded-xl rounded-tr-none" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 rounded-md" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[80px] w-full max-w-[600px] rounded-xl rounded-tl-none" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[120px] w-full max-w-[550px] rounded-xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-end gap-3", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[30px] w-1/2 max-w-[300px] rounded-xl rounded-tr-none" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 rounded-md" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[150px] w-full max-w-[650px] rounded-xl rounded-tl-none" })
    ] })
  ] });
}
function ChatView() {
  const { chat, isLoading, error, initialMessages } = useDefaultChat();
  if (isLoading) {
    return /* @__PURE__ */ jsx("section", { className: "h-full flex-1 overflow-hidden", children: /* @__PURE__ */ jsx(ChatSkeleton, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("section", { className: "flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx(AlertCircleIcon, { className: "h-10 w-10 text-muted-foreground" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: error })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/chat", children: "Start a New Chat" }) })
    ] });
  }
  return /* @__PURE__ */ jsx("section", { className: "h-full flex-1 overflow-hidden", children: /* @__PURE__ */ jsx(ChatBot, { chat, initialMessages }) });
}
function ChatDetailPage() {
  return /* @__PURE__ */ jsx(DefaultChatProvider, { children: /* @__PURE__ */ jsx(ChatView, {}) });
}
export {
  ChatDetailPage as component
};
