import { createFileRoute } from "@tanstack/react-router";

import { NewChatStarter } from "@/modules/chat/components/new-chat-starter";

export const Route = createFileRoute("/_protected/chat/")({
  component: ChatPage,
});

function ChatPage() {
  return <NewChatStarter />;
}
