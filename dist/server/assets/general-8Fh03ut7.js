import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useGeneralChat, G as GeneralChatProvider, H as HomeLayout } from "./home-layout-CWwjapkw.js";
import { C as ChatBot } from "./chat-bot-CobpGUWL.js";
import { Link } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cj9ELzHO.js";
import "react";
import "@ai-sdk/react";
import "ai";
import "sonner";
import "./ai-prompt-input-BdA0Jq8v.js";
import "./tooltip-DRYX_Imi.js";
import "./button-D5vTpyVN.js";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "./scroll-area-Bvwd_GHq.js";
import "@base-ui/react/scroll-area";
import "nanoid";
import "./input-group-HiwdIxtQ.js";
import "./input-DokJ73Yy.js";
import "./index-CQF8ySRG.js";
import "./logo-DoHeR5o3.js";
import "next-themes";
import "@tanstack/react-query";
import "./field-CcmYbgZh.js";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "./profile-form-Kv1Sy6HW.js";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./select-CfgWoe1T.js";
import "react-phone-number-input";
import "react-phone-number-input/flags";
import "cmdk";
import "./user-types-DQBxjyNb.js";
import "./profile-schema-CGuN1h7-.js";
import "libphonenumber-js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "./password-input-CeIDaVYP.js";
import "./reset-password-schema-FFnudqMF.js";
import "./skeleton-hioRrLEH.js";
import "use-stick-to-bottom";
import "streamdown";
import "motion/react";
import "./badge-BlrAC-0Q.js";
function ChatLimitAlertDialog(props) {
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, children: /* @__PURE__ */ jsxs(AlertDialogContent, { className: "gap-6 rounded-xl!", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-fit! justify-center", children: /* @__PURE__ */ jsx("div", { className: "rounded-full bg-primary/5 p-2 pb-0.5", children: /* @__PURE__ */ jsx("div", { className: "inline-block rounded-full bg-primary/10 p-3", children: /* @__PURE__ */ jsx(CircleAlert, { className: "text-primary" }) }) }) }),
    /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "gap-3 text-center!", children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { className: "text-xl", children: "Limit reached! Please login to chat more" }),
      /* @__PURE__ */ jsx(AlertDialogDescription, { children: "You've used your 3 free chats. Please log in to continue chatting without interruptions." })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "justify-center! gap-3", children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { className: "min-w-[145px]", children: "Cancel" }),
      /* @__PURE__ */ jsx(AlertDialogAction, { className: "min-w-[145px]", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log In to continue" }) })
    ] })
  ] }) });
}
function GeneralChatView() {
  const { chat, isQuotaExceeded, setIsQuotaExceeded } = useGeneralChat();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("main", { className: "mx-auto flex h-full max-h-screen min-h-screen", children: /* @__PURE__ */ jsx("section", { className: "m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pt-16 pb-6 md:rounded-2xl", children: /* @__PURE__ */ jsx(ChatBot, { chat, viewTransitionName: "general-chat" }) }) }),
    /* @__PURE__ */ jsx(
      ChatLimitAlertDialog,
      {
        open: isQuotaExceeded,
        onOpenChange: setIsQuotaExceeded
      }
    )
  ] });
}
function GeneralPage() {
  return /* @__PURE__ */ jsx(GeneralChatProvider, { children: /* @__PURE__ */ jsx(HomeLayout, { children: /* @__PURE__ */ jsx(GeneralChatView, {}) }) });
}
export {
  GeneralPage as component
};
