import Link from "next/link";

import { CirclePlusIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function SidebarButtons() {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenuButton asChild>
          <Link href="/chat">
            <CirclePlusIcon />
            <span>New Chat</span>
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
