import { ChatBot } from "@/components/chat-bot";
import { ChatProps } from "@/modules/home/types/chat-props";

export function GeneralChatView(props: ChatProps) {
  return (
    <main className="mx-auto flex h-full max-h-screen min-h-screen">
      <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pt-16 pb-6 md:rounded-2xl">
        <ChatBot viewTransitionName="general-chat" {...props} />
      </section>
    </main>
  );
}
