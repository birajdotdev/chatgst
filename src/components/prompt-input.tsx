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
}

export function PromptInput({ className }: PromptInputProps) {
  return (
    <InputGroup
      className={cn(
        "rounded-xl border-muted bg-background drop-shadow-2xl",
        className
      )}
    >
      <InputGroupTextarea placeholder="Type any queries related to GST here..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton variant="outline" size="sm" className="rounded-full">
          <PlusCircleIcon /> Upload Document
        </InputGroupButton>

        <InputGroupButton
          variant="default"
          className="ml-auto rounded-full"
          size="icon-sm"
        >
          <ArrowUpRightIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
