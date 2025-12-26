import { SidebarProvider } from "@/components/ui/sidebar";
import DraftHistorySidebar from "@/modules/appeal-draft/components/draft-history-sidebar";

export function DraftHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DraftHistorySidebar />
      <section>{children}</section>
    </SidebarProvider>
  );
}
