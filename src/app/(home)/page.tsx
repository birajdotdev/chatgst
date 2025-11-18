import { isAuthenticated } from "@/lib/auth";
import { ChatView } from "@/modules/chat/views/chat-view";
import { HomeView } from "@/modules/home/views/home-view";

export default async function Page() {
  return (await isAuthenticated()) ? <ChatView /> : <HomeView />;
}
