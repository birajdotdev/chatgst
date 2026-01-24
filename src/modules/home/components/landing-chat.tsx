"use client";

import { useRouter } from "next/navigation";
import { ViewTransition, useRef, useState } from "react";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { ChatSuggestions } from "@/modules/chat/components/chat-suggestions";
import { useGeneralChat } from "@/modules/chat/components/general-chat-context";

export function LandingChat() {
  const { sendMessage } = useGeneralChat();
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;

    sendMessage({ text: message.text });
    router.push("/general");
  };

  return (
    <>
      <ViewTransition name="general-chat">
        <div className="mx-auto my-8 max-w-none px-4 sm:max-w-md md:my-12 md:max-w-xl">
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about GST appeals..."
                ref={inputRef}
                value={input}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </ViewTransition>

      <ChatSuggestions onClick={handleSuggestionClick} />
    </>
  );
}
