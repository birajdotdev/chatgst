import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DraftHistorySidebar } from "@/modules/appeal-draft/components/draft-history-sidebar";

export function DraftHistoryLayout({
  children,
  step,
}: {
  children: React.ReactNode;
  step: number;
}) {
  return (
    <SidebarProvider>
      {step === 6 && <DraftHistorySidebar />}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
