"use client";

import { useRouter } from "next/navigation";
import { ViewTransition, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";

import { AIPromptInput } from "@/components/ai-prompt-input";
import { ChatSuggestions } from "@/modules/chat/components/chat-suggestions";
import { useGeneralChat } from "@/modules/chat/components/general-chat-context";

export function LandingChat() {
  const { chat } = useGeneralChat();
  const router = useRouter();
  const { sendMessage } = useChat({ chat });

  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handelSubmit = () => {
    if (!input.trim()) return;

    sendMessage({ text: input });
    router.push("/general");
  };

  return (
    <>
      <ViewTransition name="general-chat">
        <AIPromptInput
          ref={inputRef}
          className="mx-auto my-8 max-w-none sm:max-w-md md:my-12 md:max-w-xl"
          onSubmit={handelSubmit}
          value={input}
          onChange={setInput}
        />
      </ViewTransition>

      <ChatSuggestions onClick={handleSuggestionClick} />
    </>
  );
}
