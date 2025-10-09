import { ArrowUpRightIcon, PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";

interface PromptInputProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  onUpload?: () => void;
}

export function PromptInput({
  className,
  value,
  onChange,
  onKeyDown,
  placeholder = "Type any queries related to GST here...",
  disabled = false,
  onSubmit,
  onUpload,
}: PromptInputProps) {
  const handleSubmit = () => {
    if (onSubmit && !disabled) {
      onSubmit();
    }
  };

  const handleUpload = () => {
    if (onUpload && !disabled) {
      onUpload();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    // Handle Ctrl+Enter or Cmd+Enter for submission
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !disabled) {
      e.preventDefault();
      handleSubmit();
      return;
    }

    // Handle plain Enter for submission (without Shift for new line)
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <InputGroup
      className={cn(
        "rounded-xl border-muted bg-background drop-shadow-2xl",
        className
      )}
    >
      <InputGroupTextarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={handleUpload}
          type="button"
          disabled={disabled}
        >
          <PlusCircleIcon /> Upload Document
        </InputGroupButton>

        <InputGroupButton
          variant="default"
          className="ml-auto rounded-full"
          size="icon-sm"
          onClick={handleSubmit}
          type="button"
          disabled={disabled}
        >
          <ArrowUpRightIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
