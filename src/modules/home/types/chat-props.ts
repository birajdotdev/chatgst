import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";

import { PromptInputProps } from "@/components/ai-elements/prompt-input";

export interface ChatProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  status?: ChatStatus;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: PromptInputProps["onSubmit"];
}
