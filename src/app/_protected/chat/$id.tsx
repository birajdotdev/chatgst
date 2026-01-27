import { createFileRoute } from "@tanstack/react-router";

import { DefaultChatProvider } from "@/modules/chat/components/default-chat-context";
import { ChatView } from "@/modules/chat/views/chat-view";

export const Route = createFileRoute("/_protected/chat/$id")({
  component: ChatDetailPage,
});

function ChatDetailPage() {
  return (
    <DefaultChatProvider>
      <ChatView />
    </DefaultChatProvider>
  );
}
