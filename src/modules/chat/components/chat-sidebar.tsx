import { Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  NavChats,
  NavChatsSkeleton,
} from "@/modules/chat/components/nav-chats";
import { SearchForm } from "@/modules/chat/components/search-form";
import SidebarButtons from "@/modules/chat/components/sidebar-buttons";

export function ChatSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-4.5 gap-4.5 p-0 px-3 pt-6">
        <SearchForm />
        <SidebarButtons />
      </SidebarHeader>
      <SidebarContent className="gap-4 pb-6">
        <Suspense fallback={<NavChatsSkeleton />}>
          <NavChats />
        </Suspense>
      </SidebarContent>
    </Sidebar>
  );
}
