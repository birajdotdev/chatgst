import { Suspense } from "react";

import { ClockIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DraftHistoryClient } from "@/modules/appeal-draft/components/draft-history-client";
import { appealDraftSearchParamsCache } from "@/modules/appeal-draft/components/search-params";
import { getAllAppeals } from "@/modules/appeal-draft/queries/get-all-appeals";

export function DraftHistorySidebar() {
  const documentId = appealDraftSearchParamsCache.get("documentId");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col gap-2 group-data-[collapsible=icon]:items-center">
          <div className="flex flex-row-reverse items-center justify-between gap-2 px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:px-0">
            <SidebarTrigger className="group-data-[collapsible=icon]:order-first" />
            <div className="flex items-center gap-2 text-sm font-medium group-data-[collapsible=icon]:order-last">
              <ClockIcon className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Recent Drafts
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <ErrorBoundary
              fallback={
                <SidebarMenuItem className="text-destructive">
                  Error loading drafts
                </SidebarMenuItem>
              }
            >
              <Suspense fallback={<AppealHistorySkeleton />}>
                <DraftHistoryClient appeals={getAllAppeals(documentId!)} />
              </Suspense>
            </ErrorBoundary>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function AppealHistorySkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 8 }).map((_, idx) => (
        <SidebarMenuItem key={idx}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
