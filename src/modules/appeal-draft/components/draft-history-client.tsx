"use client";

import { use } from "react";

import { useQueryStates } from "nuqs";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";
import { AppealHistory } from "@/modules/appeal-draft/types/appeal-history";

interface DraftHistoryClientProps {
  appeals: Promise<AppealHistory[]>;
}

export function DraftHistoryClient({ appeals }: DraftHistoryClientProps) {
  const appealsData = use(appeals);
  const [, setSearchParams] = useQueryStates(appealDraftSearchParams);

  return (
    <SidebarMenu>
      {appealsData.map((appeal) => (
        <SidebarMenuItem key={appeal.id}>
          <SidebarMenuButton
            onClick={(e) => {
              e.preventDefault();
              setSearchParams({ appealId: appeal.id });
            }}
          >
            {appeal.appeal_name}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
