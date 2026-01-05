import { GeneralChatView } from "@/modules/home/views/general-chat-view";

// Auth redirect handled by middleware (src/proxy.ts)
// Authenticated users are redirected to /chat

export default function Page() {
  return <GeneralChatView />;
}
