import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchForm } from "@/modules/chat/components/search-form";
import SidebarButtons from "@/modules/chat/components/sidebar-buttons";
import { SIDEBAR_MENU_ITEMS } from "@/modules/chat/constants/menu-items";

export function ChatSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-4.5 gap-4.5 p-0 px-3 pt-6">
        <SearchForm />
        <SidebarButtons />
      </SidebarHeader>
      <SidebarContent className="gap-4">
        {SIDEBAR_MENU_ITEMS.map((menuItem) => (
          <SidebarGroup key={menuItem.title} className="p-0 px-3">
            <SidebarGroupLabel>{menuItem.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              {menuItem.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <div className="flex w-full">
                      <Link
                        href={item.href}
                        className="block max-w-xs flex-1 truncate"
                      >
                        {item.label}
                      </Link>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
