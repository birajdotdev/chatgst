import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useCallback, memo, useMemo, useRef, useEffect, Fragment as Fragment$1, useState, ViewTransition } from "react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { ArrowDownIcon } from "lucide-react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { cva } from "class-variance-authority";
import { Streamdown } from "streamdown";
import { motion } from "motion/react";
import { B as Badge } from "./badge-BlrAC-0Q.js";
import { C as ChatSuggestions, A as AIPromptInput } from "./ai-prompt-input-BdA0Jq8v.js";
const Conversation = ({ className, ...props }) => /* @__PURE__ */ jsx(
  StickToBottom,
  {
    className: cn("relative flex-1 overflow-y-auto", className),
    initial: "smooth",
    resize: "smooth",
    role: "log",
    ...props
  }
);
const ConversationContent = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(StickToBottom.Content, { className: cn("p-4", className), ...props });
const ConversationEmptyState = ({
  className,
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  children,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
      className
    ),
    ...props,
    children: children ?? /* @__PURE__ */ jsxs(Fragment, { children: [
      icon && /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
      ] })
    ] })
  }
);
const ConversationScrollButton = ({
  className,
  ...props
}) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();
  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  return !isAtBottom && /* @__PURE__ */ jsx(
    Button,
    {
      className: cn(
        "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full",
        className
      ),
      onClick: handleScrollToBottom,
      size: "icon",
      type: "button",
      variant: "outline",
      ...props,
      children: /* @__PURE__ */ jsx(ArrowDownIcon, { className: "size-4" })
    }
  );
};
const Message = ({ className, from, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      className
    ),
    ...props
  }
);
const messageContentVariants = cva(
  "is-user:dark flex flex-col gap-2 overflow-hidden rounded-lg text-sm",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[80%] px-4 py-3",
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
          "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground"
        ],
        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
          "group-[.is-assistant]:text-foreground"
        ]
      }
    },
    defaultVariants: {
      variant: "contained"
    }
  }
);
const MessageContent = ({
  children,
  className,
  variant,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(messageContentVariants({ variant, className })),
    ...props,
    children
  }
);
const Response = memo(
  ({ className, ...props }) => /* @__PURE__ */ jsx(
    Streamdown,
    {
      className: cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      ),
      ...props
    }
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
Response.displayName = "Response";
const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2
}) => {
  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread]
  );
  const sharedProps = {
    animate: { backgroundPosition: "0% center" },
    className: cn(
      "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
      "[background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))]",
      className
    ),
    initial: { backgroundPosition: "100% center" },
    style: {
      "--spread": `${dynamicSpread}px`,
      backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))"
    },
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration,
      ease: "linear"
    }
  };
  const MotionElement = useMemo(() => {
    switch (Component) {
      case "h1":
        return motion.h1;
      case "h2":
        return motion.h2;
      case "h3":
        return motion.h3;
      case "h4":
        return motion.h4;
      case "h5":
        return motion.h5;
      case "h6":
        return motion.h6;
      case "span":
        return motion.span;
      case "div":
        return motion.div;
      case "p":
      default:
        return motion.p;
    }
  }, [Component]);
  return /* @__PURE__ */ jsx(MotionElement, { ...sharedProps, children });
};
const Shimmer = memo(ShimmerComponent);
function AIConversation({
  messages,
  status,
  loadingText = "Generating your response...",
  onSuggestionClick
}) {
  const contentRef = useRef(null);
  const lastMessageCountRef = useRef(messages.length);
  useEffect(() => {
    const shouldScroll = messages.length > lastMessageCountRef.current || status === "streaming" || status === "submitted";
    if (shouldScroll && contentRef.current) {
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      });
    }
    lastMessageCountRef.current = messages.length;
  }, [messages, status]);
  return /* @__PURE__ */ jsxs(Conversation, { className: "h-full", children: [
    /* @__PURE__ */ jsxs(ConversationContent, { className: "h-full", children: [
      messages.length === 0 ? /* @__PURE__ */ jsx(ConversationEmptyState, { className: "flex size-full items-center justify-center p-0", children: /* @__PURE__ */ jsx(ChatSuggestions, { onClick: onSuggestionClick }) }) : messages.map((message) => /* @__PURE__ */ jsx("div", { children: message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(Message, { from: message.role, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                Badge,
                {
                  className: "hidden w-fit rounded-full border-primary/25 bg-primary/5 px-3 py-1.5 text-primary uppercase group-[.is-assistant]:block",
                  variant: "outline",
                  children: "ChatGST AI"
                }
              ),
              /* @__PURE__ */ jsx(MessageContent, { className: "group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-user]:max-w-full group-[.is-user]:border group-[.is-user]:bg-card group-[.is-user]:text-foreground", children: /* @__PURE__ */ jsx(Response, { children: part.text }) })
            ] }) }) }, `${message.id}-${i}`);
          default:
            return null;
        }
      }) }, message.id)),
      status === "submitted" && /* @__PURE__ */ jsx(Shimmer, { children: loadingText }),
      /* @__PURE__ */ jsx("div", { ref: contentRef })
    ] }),
    /* @__PURE__ */ jsx(ConversationScrollButton, {})
  ] });
}
function ChatBot({
  aiPromptInputClassName,
  className,
  viewTransitionName,
  chat: sharedChat,
  initialMessages
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const hasSentPendingMessageRef = useRef(false);
  const { messages, status, stop, sendMessage, setMessages } = useChat({
    chat: sharedChat
  });
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0 && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, messages.length, setMessages]);
  useEffect(() => {
    if (hasSentPendingMessageRef.current) return;
    const pendingMessage = sessionStorage.getItem("pendingChatMessage");
    const pendingChatId = sessionStorage.getItem("pendingChatId");
    if (pendingMessage && pendingChatId) {
      try {
        const message = JSON.parse(pendingMessage);
        sessionStorage.removeItem("pendingChatMessage");
        sessionStorage.removeItem("pendingChatId");
        hasSentPendingMessageRef.current = true;
        if (message.files?.length) {
          toast.success("Files attached", {
            description: `${message.files.length} file(s) attached to message`
          });
        }
        sendMessage({
          text: message.text || "Sent with attachments",
          files: message.files
        });
      } catch (error) {
        console.error("Error sending pending message:", error);
        sessionStorage.removeItem("pendingChatMessage");
        sessionStorage.removeItem("pendingChatId");
      }
    }
  }, [sendMessage]);
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };
  const handleSubmit = (message) => {
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`
      });
    }
    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files
    });
    setInput("");
  };
  return /* @__PURE__ */ jsx("div", { className: cn("relative mx-auto size-full max-w-4xl", className), children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx(
      AIConversation,
      {
        messages,
        status,
        onSuggestionClick: handleSuggestionClick
      }
    ),
    /* @__PURE__ */ jsx(ViewTransition, { name: viewTransitionName, children: /* @__PURE__ */ jsx(
      AIPromptInput,
      {
        ref: inputRef,
        className: cn("mx-auto mt-4", aiPromptInputClassName),
        value: input,
        onChange: setInput,
        onSubmit: handleSubmit,
        status
      }
    ) })
  ] }) });
}
export {
  ChatBot as C
};
