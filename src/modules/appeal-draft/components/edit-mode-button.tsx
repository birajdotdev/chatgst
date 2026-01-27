"use client";

import { SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";

export function EditModeButton() {
  const { setSearchParams } = useSearchParamsContext();

  const handleClick = () => {
    setSearchParams({ mode: "edit" });
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      <SquarePenIcon />
      Edit Details
    </Button>
  );
}
