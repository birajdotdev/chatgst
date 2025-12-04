import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getChats } from "@/modules/chat/apis/get-chats";
import {
  NavChats,
  NavChatsError,
  NavChatsSkeleton,
} from "@/modules/chat/components/nav-chats";
import { SearchForm } from "@/modules/chat/components/search-form";
import SidebarButtons from "@/modules/chat/components/sidebar-buttons";

export async function ChatSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const chatsPromise = getChats();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-4.5 gap-4.5 p-0 px-3 pt-6">
        <SearchForm />
        <SidebarButtons />
      </SidebarHeader>
      <SidebarContent className="gap-4 pb-6">
        <ErrorBoundary fallback={<NavChatsError />}>
          <Suspense fallback={<NavChatsSkeleton />}>
            <NavChats chatsPromise={chatsPromise} />
          </Suspense>
        </ErrorBoundary>
      </SidebarContent>
    </Sidebar>
  );
}
