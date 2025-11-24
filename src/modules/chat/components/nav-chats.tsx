import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { getChats } from "@/modules/chat/apis/get-chats";

export async function NavChats() {
  const chats = await getChats();

  const sidebarItems = chats.reduce(
    (acc, chat) => {
      const chatDate = new Date(chat.created_at);
      const today = new Date();

      const isToday = chatDate.toDateString() === today.toDateString();
      const date = isToday
        ? "Today"
        : chatDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

      const existing = acc.find((group) => group.date === date);

      if (existing) {
        existing.chats.push({ id: chat.id, title: chat.title });
      } else {
        acc.push({
          date,
          chats: [{ id: chat.id, title: chat.title }],
        });
      }

      return acc;
    },
    [] as { date: string; chats: { id: string; title: string }[] }[]
  );
  return (
    <>
      {sidebarItems.length === 0 ? (
        <SidebarGroup className="p-0 px-3 text-center text-sm text-muted-foreground">
          <SidebarMenuItem>There is no recent chat!</SidebarMenuItem>
        </SidebarGroup>
      ) : (
        sidebarItems.map((chat) => (
          <SidebarGroup key={chat.date} className="p-0 px-3">
            <SidebarGroupLabel>{chat.date}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chat.chats.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <div className="flex w-full">
                        <Link
                          href={`/chat/${item.id}`}
                          className="block max-w-xs flex-1 truncate"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))
      )}
    </>
  );
}

export function NavChatsSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <SidebarGroup key={index} className="p-0 px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 4 }).map((_, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

export function NavChatsError() {
  return (
    <SidebarGroup className="p-0 px-3 text-center text-sm text-destructive">
      <SidebarMenuItem>Error loading chats.</SidebarMenuItem>
    </SidebarGroup>
  );
}
