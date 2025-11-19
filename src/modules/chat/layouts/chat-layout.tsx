import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar";

export function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <section className="flex-1 p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
