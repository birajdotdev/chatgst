import { nanoid } from "nanoid";

import { PromptInputProvider } from "@/components/ai-elements/prompt-input";
import ChatBot from "@/components/chat-bot";

const suggestions: { key: string; value: string }[] = [
  { key: nanoid(), value: "How can I file a GST appeal?" },
  { key: nanoid(), value: "What documents do I need for GST compliance?" },
  { key: nanoid(), value: "How does AI help in drafting appeals?" },
  { key: nanoid(), value: "What are the common GST penalty reasons?" },
  {
    key: nanoid(),
    value: "How to calculate interest on delayed GST payments?",
  },
];

export function ChatView() {
  return (
    <PromptInputProvider>
      <main className="mx-auto flex h-full max-h-screen min-h-screen">
        <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-background to-primary/20 px-6 pt-16 md:rounded-2xl md:px-6">
          <ChatBot />
        </section>
      </main>
    </PromptInputProvider>
  );
}
