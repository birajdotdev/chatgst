import { PromptInputProvider } from "./ai-elements/prompt-input";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PromptInputProvider>{children}</PromptInputProvider>;
}
