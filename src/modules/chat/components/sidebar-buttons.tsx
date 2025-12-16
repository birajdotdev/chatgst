import Link from "next/link";

import { CirclePlusIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function SidebarButtons() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenuButton
          asChild
          className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
        >
          <Link href="/chat">
            <CirclePlusIcon />
            <span className="font-semibold">New Chat</span>
          </Link>
        </SidebarMenuButton>
        {/* <SidebarMenuButton>
          <ClockIcon />
          <span>History</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <PaperclipIcon />
          <span>Files Uploaded</span>
        </SidebarMenuButton> */}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
