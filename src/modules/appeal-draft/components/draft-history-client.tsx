"use client";

import { use } from "react";

import { useQueryStates } from "nuqs";

import { SidebarMenu } from "@/components/ui/sidebar";
import { DraftHistoryItem } from "@/modules/appeal-draft/components/draft-history-item";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";
import { AppealHistory } from "@/modules/appeal-draft/types/appeal-history";

interface DraftHistoryClientProps {
  appeals: Promise<AppealHistory[]>;
}

export function DraftHistoryClient({ appeals }: DraftHistoryClientProps) {
  const appealsData = use(appeals);
  const [{ appealId }, setSearchParams] = useQueryStates(
    appealDraftSearchParams
  );

  return (
    <SidebarMenu>
      {appealsData.map((appeal) => (
        <DraftHistoryItem
          key={appeal.id}
          appeal={appeal}
          isActive={appealId === appeal.id}
          onSelect={() => setSearchParams({ appealId: appeal.id })}
        />
      ))}
    </SidebarMenu>
  );
}
