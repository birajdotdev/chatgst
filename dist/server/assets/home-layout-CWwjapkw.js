import { jsx, jsxs } from "react/jsx-runtime";
import { useState, createContext, useContext, useEffect } from "react";
import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { p as parseClientError, E as ErrorCodes } from "./ai-prompt-input-BdA0Jq8v.js";
import { N as Navbar } from "./index-CQF8ySRG.js";
import { c as cn } from "./button-D5vTpyVN.js";
const ChatContext = createContext(void 0);
function GeneralChatProvider({ children }) {
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const chat = new Chat({
    id: "general-chat",
    transport: new DefaultChatTransport({
      api: "/general/api"
    }),
    onError: (error) => {
      const errorData = parseClientError(error);
      switch (errorData.code) {
        case ErrorCodes.QUOTA_EXCEEDED:
          setIsQuotaExceeded(true);
          break;
        default:
          toast.error("Failed to send message", {
            description: errorData.message || "An unknown error occurred."
          });
          break;
      }
    }
  });
  return /* @__PURE__ */ jsx(ChatContext.Provider, { value: { chat, isQuotaExceeded, setIsQuotaExceeded }, children });
}
function useGeneralChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useGeneralChat must be used within GeneralChatProvider");
  }
  return context;
}
function useScroll({ threshold = 10 } = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  return { isScrolled };
}
function HomeLayout({
  children
}) {
  const { isScrolled } = useScroll({ threshold: 10 });
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(
      Navbar,
      {
        className: cn(
          "fixed top-0 right-0 left-0 z-50 h-16 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          isScrolled ? "border-b bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/60" : "border-b-transparent bg-transparent"
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grow", children })
  ] });
}
export {
  GeneralChatProvider as G,
  HomeLayout as H,
  useGeneralChat as u
};
