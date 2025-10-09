"use client";

import { useRef, useState } from "react";

import { PlusCircleIcon } from "lucide-react";

import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

interface ExamplePromptInputProps {
  className?: string;
}

export function AIPromptInput(props: ExamplePromptInputProps) {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const attachments = usePromptInputAttachments();

  const stop = () => {
    console.log("Stopping request...");

    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setStatus("ready");
  };

  const handleSubmit = (message: PromptInputMessage) => {
    // If currently streaming or submitted, stop instead of submitting
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus("submitted");

    console.log("Submitting message:", message);

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    timeoutRef.current = setTimeout(() => {
      setStatus("ready");
      timeoutRef.current = null;
    }, STREAMING_TIMEOUT);
  };

  return (
    <PromptInput
      globalDrop
      multiple
      onSubmit={handleSubmit}
      className={cn("drop-shadow-2xl", props.className)}
    >
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          ref={textareaRef}
          value={text}
          placeholder="Type any queries related to GST here..."
        />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton
            variant="outline"
            className="rounded-full"
            onClick={() => attachments.openFileDialog()}
          >
            <PlusCircleIcon />
            <span>Upload Documents</span>
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit status={status} className="rounded-full" />
      </PromptInputToolbar>
    </PromptInput>
  );
}
