"use client";

import { SquarePenIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";

export function EditModeButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useQueryStates(appealDraftSearchParams);

  const handelClick = () => {
    setSearchParams({ mode: "edit" });
  };

  return (
    <Button type="button" variant="outline" onClick={handelClick}>
      <SquarePenIcon />
      Edit Details
    </Button>
  );
}
