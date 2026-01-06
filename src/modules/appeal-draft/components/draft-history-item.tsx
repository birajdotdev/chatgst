"use client";

import { useState } from "react";

import { EllipsisIcon, PenBoxIcon, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DeleteAppealDialog } from "@/modules/appeal-draft/components/delete-appeal-dialog";
import { AppealHistory } from "@/modules/appeal-draft/types/appeal-history";

interface DraftHistoryItemProps {
  appeal: AppealHistory;
  isActive: boolean;
  onSelect: () => void;
}

export function DraftHistoryItem({
  appeal,
  isActive,
  onSelect,
}: DraftHistoryItemProps) {
  const { isMobile } = useSidebar();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={isActive}
          onClick={(e) => {
            e.preventDefault();
            onSelect();
          }}
        >
          <span className="block truncate">{appeal.appeal_name}</span>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover
              className="rounded-sm data-[state=open]:bg-accent"
            >
              <EllipsisIcon />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-24 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
          >
            <DropdownMenuItem>
              <PenBoxIcon />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteDialogOpen(true)}
            >
              <Trash2Icon />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <DeleteAppealDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        appeal={appeal}
      />
    </>
  );
}
