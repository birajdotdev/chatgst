"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import DraftHistorySidebar from "./draft-history-sidebar";

interface DraftSidebarWrapperProps {
  step: number;
  children: React.ReactNode;
}

export function DraftSidebarWrapper({
  step,
  children,
}: DraftSidebarWrapperProps) {
  return (
    <SidebarProvider>
      {step === 6 && <DraftHistorySidebar />}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
