import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar";

export function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <main className="max-h-[calc(100vh-4rem)] flex-1 overflow-hidden p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
