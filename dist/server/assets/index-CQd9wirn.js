import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { p as parseClientError, A as AIPromptInput } from "./ai-prompt-input-BdA0Jq8v.js";
import { c as cn } from "./button-D5vTpyVN.js";
import { Chat, useChat } from "@ai-sdk/react";
import { useRouter } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { C as ChatBot } from "./chat-bot-CobpGUWL.js";
import "./tooltip-DRYX_Imi.js";
import "./scroll-area-Bvwd_GHq.js";
import "@base-ui/react/scroll-area";
import "radix-ui";
import "lucide-react";
import "nanoid";
import "./input-group-HiwdIxtQ.js";
import "class-variance-authority";
import "./input-DokJ73Yy.js";
import "clsx";
import "tailwind-merge";
import "use-stick-to-bottom";
import "streamdown";
import "motion/react";
import "./badge-BlrAC-0Q.js";
function ChatInterface({ initialMessage }) {
  const router = useRouter();
  const hasRedirectedRef = useRef(false);
  const chatInstanceRef = useRef(null);
  if (!chatInstanceRef.current) {
    chatInstanceRef.current = new Chat({
      id: "new-chat",
      transport: new DefaultChatTransport({
        api: "/chat/api"
      }),
      onError: (error) => {
        const errorData = parseClientError(error);
        if (errorData.status === 401) {
          window.location.href = "/login";
          return;
        }
        toast.error("Failed to send message", {
          description: errorData.message || "An unknown error occurred."
        });
      }
    });
  }
  const chat = chatInstanceRef.current;
  const { messages, sendMessage, status } = useChat({ chat });
  useEffect(() => {
    if (chat.messages.length === 0) {
      if (initialMessage.files?.length) {
        toast.success("Files attached", {
          description: `${initialMessage.files.length} file(s) attached to message`
        });
      }
      sendMessage({
        text: initialMessage.text || "Sent with attachments",
        files: initialMessage.files
      });
    }
  }, []);
  const receivedChatIdRef = useRef(null);
  useEffect(() => {
    if (receivedChatIdRef.current) return;
    for (const message of messages) {
      if (message.role === "assistant" && message.parts) {
        for (const part of message.parts) {
          if (part.type === "data-chat-id" && "data" in part) {
            const data = part.data;
            if (data.chatId) {
              console.log("[ChatInterface] Found chat ID:", data.chatId);
              receivedChatIdRef.current = data.chatId;
              window.history.replaceState(null, "", `/chat/${data.chatId}`);
              return;
            }
          }
        }
      }
    }
  }, [messages]);
  useEffect(() => {
    if (receivedChatIdRef.current && !hasRedirectedRef.current && status === "ready") {
      if (messages.length > 0) {
        hasRedirectedRef.current = true;
        const chatId = receivedChatIdRef.current;
        console.log("[ChatInterface] Stream finished, redirecting to:", chatId);
        try {
          sessionStorage.setItem(
            `transfer_messages_${chatId}`,
            JSON.stringify(messages)
          );
        } catch (e) {
          console.error("Failed to save transfer messages", e);
        }
        router.navigate({ to: `/chat/${chatId}`, replace: true });
      }
    }
  }, [status, messages]);
  return /* @__PURE__ */ jsx(ChatBot, { chat });
}
function NewChatStarter({ className }) {
  const [input, setInput] = useState("");
  const [firstMessage, setFirstMessage] = useState(
    null
  );
  const inputRef = useRef(null);
  const handleSubmit = (message) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    setFirstMessage(message);
  };
  if (firstMessage) {
    return /* @__PURE__ */ jsx(ChatInterface, { initialMessage: firstMessage });
  }
  return /* @__PURE__ */ jsx("div", { className: cn("relative mx-auto size-full max-w-4xl", className), children: /* @__PURE__ */ jsx("div", { className: "flex h-full flex-col items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold", children: "How can I help you today?" }) }),
    /* @__PURE__ */ jsx(
      AIPromptInput,
      {
        ref: inputRef,
        className: "mx-auto",
        value: input,
        onChange: setInput,
        onSubmit: handleSubmit,
        status: "ready"
      }
    )
  ] }) }) });
}
function ChatPage() {
  return /* @__PURE__ */ jsx(NewChatStarter, {});
}
export {
  ChatPage as component
};
