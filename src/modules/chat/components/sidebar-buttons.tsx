import { CirclePlusIcon, ClockIcon, PaperclipIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function SidebarButtons() {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenuButton>
          <CirclePlusIcon />
          <span>New Chat</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <ClockIcon />
          <span>History</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <PaperclipIcon />
          <span>Files Uploaded</span>
        </SidebarMenuButton>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
