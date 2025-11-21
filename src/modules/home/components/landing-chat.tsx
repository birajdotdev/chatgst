"use client";

import { ViewTransition, useRef, useState } from "react";

import { AIPromptInput } from "@/components/ai-prompt-input";
import { ChatSuggestions } from "@/modules/chat/components/chat-suggestions";

export function LandingChat() {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handelSubmit = () => {};

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
