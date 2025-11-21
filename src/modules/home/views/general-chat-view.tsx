import { ChatBot } from "@/components/chat-bot";

export function GeneralChatView() {
  return (
    <main className="mx-auto flex h-full max-h-screen min-h-screen">
      <section className="m-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 pt-16 pb-6 md:rounded-2xl">
        <ChatBot
          chatId="chat-gst-general"
          chatApiPath="/general/api"
          viewTransitionName="general-chat"
        />
      </section>
    </main>
  );
}
