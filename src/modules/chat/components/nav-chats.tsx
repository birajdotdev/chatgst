"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

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
import { useSearch } from "@/modules/chat/contexts/search-context";

export function NavChats({
  chatsPromise,
}: {
  chatsPromise: Promise<Awaited<ReturnType<typeof getChats>>>;
}) {
  const chats = use(chatsPromise);
  const pathname = usePathname();
  const { searchQuery } = useSearch();

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort chats by date descending
  const sortedChats = [...filteredChats].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const sidebarItems = sortedChats
    .reduce(
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
    )
    .sort((a, b) => {
      if (a.date === "Today") return -1;
      if (b.date === "Today") return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <>
      {sidebarItems.length === 0 ? (
        <SidebarGroup className="p-0 px-3 text-center text-sm text-muted-foreground">
          <SidebarMenuItem>
            {searchQuery
              ? "No matching chats found."
              : "There is no recent chat!"}
          </SidebarMenuItem>
        </SidebarGroup>
      ) : (
        sidebarItems.map((chat) => (
          <SidebarGroup key={chat.date} className="p-0 px-3">
            <SidebarGroupLabel>{chat.date}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chat.chats.map((item) => {
                  const isActive = pathname === `/chat/${item.id}`;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link
                          href={`/chat/${item.id}`}
                          className="block w-full"
                        >
                          <span className="block truncate">
                            <HighlightedText
                              text={item.title}
                              highlight={searchQuery}
                            />
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))
      )}
    </>
  );
}

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight.trim()) return <>{text}</>;

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            className="rounded-[2px] bg-yellow-200 px-0.5 font-medium dark:bg-yellow-900/50 dark:text-yellow-100"
          >
            {part}
          </span>
        ) : (
          part
        )
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
