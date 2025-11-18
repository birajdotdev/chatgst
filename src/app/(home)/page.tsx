import { getUserProfile, isAuthenticated } from "@/lib/auth";
import { ChatView } from "@/modules/chat/views/chat-view";
import { HomeView } from "@/modules/home/views/home-view";

export default async function Page() {
  const [authenticated, user] = await Promise.all([
    isAuthenticated(),
    getUserProfile(),
  ]);

  return authenticated ? (
    <ChatView isAuthenticated={authenticated} user={user} />
  ) : (
    <HomeView />
  );
}
