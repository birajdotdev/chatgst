import { Navbar } from "@/components/navbar";
import { UserProfile } from "@/lib/auth";
import { ChatLayout } from "@/modules/chat/layouts/chat-layout";

interface ChatViewProps {
  isAuthenticated?: boolean;
  user?: UserProfile | null;
}

export function ChatView({ isAuthenticated, user }: ChatViewProps) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar
        className="shrink-0 border-b bg-background"
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <div className="flex flex-1 pt-16">
        <ChatLayout>
          <section className="flex flex-1 flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold">Logged in Successfully!</h1>
          </section>
        </ChatLayout>
      </div>
    </div>
  );
}
