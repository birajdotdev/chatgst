"use client";

import { Activity, startTransition, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { ChatView } from "@/modules/home/views/chat-view";
import { LandingView } from "@/modules/home/views/landing-view";

export function HomeView() {
  const [hasChatStarted, setHasChatStarted] = useState<boolean>(false);
  const [input, setInput] = useState("");

  const { messages, status, sendMessage, stop } = useChat({
    id: "chat-gst-general",
    transport: new DefaultChatTransport({
      api: "/general/api",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
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
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
    startTransition(() => setHasChatStarted(true));
  };

  return (
    <>
      <Activity mode={hasChatStarted ? "hidden" : "visible"}>
        <LandingView
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          status={status}
        />
      </Activity>
      <Activity mode={hasChatStarted ? "visible" : "hidden"}>
        <ChatView
          value={input}
          onChange={setInput}
          messages={messages}
          onSubmit={handleSubmit}
          status={status}
        />
      </Activity>
    </>
  );
}
