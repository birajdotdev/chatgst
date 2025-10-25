"use client";

import { Activity } from "react";

import { ChatStatus } from "ai";
import { PlusCircle } from "lucide-react";

import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProps,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";

interface AIPromptInputProps {
  ref: React.Ref<HTMLTextAreaElement>;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  status?: ChatStatus;
  onSubmit: PromptInputProps["onSubmit"];
  placeholder?: string;
  showUploadButton?: boolean;
}

export function AIPromptInput({
  ref,
  className,
  value,
  onChange,
  onSubmit,
  status = "ready",
  placeholder = "Type any queries related to GST here",
  showUploadButton = false,
}: AIPromptInputProps) {
  return (
    <PromptInput
      className={cn("drop-shadow-xl", className)}
      onSubmit={onSubmit}
      globalDrop
      multiple
    >
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea
          ref={ref}
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
          placeholder={placeholder}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <Activity mode={showUploadButton ? "visible" : "hidden"}>
            <AIPromptInputUploadButton />
          </Activity>
        </PromptInputTools>
        <PromptInputSubmit
          disabled={(!value?.trim() && !status) || status === "streaming"}
          status={status}
          className="rounded-full"
        />
      </PromptInputFooter>
    </PromptInput>
  );
}

function AIPromptInputUploadButton() {
  const attachments = usePromptInputAttachments();

  return (
    <PromptInputButton
      variant="outline"
      className="rounded-full"
      onClick={() => attachments.openFileDialog()}
    >
      <PlusCircle />
      <span>Upload Document</span>
    </PromptInputButton>
  );
}
