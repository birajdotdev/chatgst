"use client";

import { DefaultChatProvider } from "@/modules/chat/components/default-chat-context";
import { ChatView } from "@/modules/chat/views/chat-view";

export default function Page() {
  return (
    <DefaultChatProvider>
      <ChatView />
    </DefaultChatProvider>
  );
}
