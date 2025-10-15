import { nanoid } from "nanoid";

import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { PromptInputProvider } from "@/components/ai-elements/prompt-input";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

type Message = {
  key: string;
  value: string;
  name: string;
  avatar: string;
};

const messages: Message[] = [
  {
    key: nanoid(),
    value: "Hello, how are you?",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value:
      "I'm good, thank you! How can I assist you today? Sure! We offer a variety of AI solutions. What are you interested in?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "I'm looking for information about your services.",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value:
      "Sure! We offer a variety of AI solutions. What are you interested in?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "I'm interested in natural language processing tools.",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "Great choice! We have several NLP APIs. Would you like a demo?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "Yes, a demo would be helpful.",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "Alright, I can show you a sentiment analysis example. Ready?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "Yes, please proceed.",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "Here is a sample: 'I love this product!' → Positive sentiment.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "Impressive! Can it handle multiple languages?",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "Absolutely, our models support over 20 languages.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "How do I get started with the API?",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "You can sign up on our website and get an API key instantly.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "Is there a free trial available?",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "Yes, we offer a 14-day free trial with full access.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "What kind of support do you provide?",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "We provide 24/7 chat and email support for all users.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
  {
    key: nanoid(),
    value: "Thank you for the information!",
    name: "Alex Johnson",
    avatar: "https://github.com/haydenbleasel.png",
  },
  {
    key: nanoid(),
    value: "You're welcome! Let me know if you have any more questions.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
  },
];

export function ChatView() {
  const hasConversationStarted = messages.length > 0;

  return (
    <PromptInputProvider>
      <main className="mx-auto flex h-full max-h-screen min-h-screen">
        <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-background to-primary/20 px-6 pt-16 md:rounded-2xl md:px-6">
          {/* Conversation */}
          <div className="flex w-full max-w-2xl flex-1 flex-col">
            <ScrollArea className="h-[400px]">
              <Conversation>
                <ConversationContent>
                  {hasConversationStarted &&
                    messages.map((message, index) => (
                      <Message
                        from={index % 2 === 0 ? "user" : "assistant"}
                        key={message.key}
                      >
                        <div className="flex flex-col gap-3">
                          <Badge
                            className="hidden w-fit rounded-full border-primary/25 bg-primary/5 px-3 py-1.5 text-primary uppercase group-[.is-assistant]:block"
                            variant="outline"
                          >
                            ChatGST AI
                          </Badge>
                          <MessageContent className="group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-user]:max-w-full group-[.is-user]:border group-[.is-user]:bg-card group-[.is-user]:text-foreground">
                            {message.value}
                          </MessageContent>
                        </div>
                      </Message>
                    ))}
                </ConversationContent>
              </Conversation>
            </ScrollArea>
          </div>
          {/* Prompt Input */}
          <div className="w-full max-w-3xl text-center">
            <AIPromptInput
              className={cn(
                "mx-auto mb-8 max-w-none sm:max-w-md md:my-12 md:max-w-xl",
                hasConversationStarted && "w-full !max-w-none"
              )}
            />
            {!hasConversationStarted && (
              <>
                <h2 className="mb-3 text-base font-medium sm:text-lg md:mb-0">
                  Here are some sample questions you can start with:
                </h2>
                <div className="mt-3 flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-2 md:mt-4 md:gap-4">
                  {suggestions.map((suggestion) => (
                    <Suggestion
                      key={suggestion.key}
                      suggestion={suggestion.value}
                      className="border-muted-foreground/80 !bg-transparent text-xs tracking-tight text-foreground/80 shadow-none hover:border-muted-foreground sm:text-sm"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </PromptInputProvider>
  );
}
