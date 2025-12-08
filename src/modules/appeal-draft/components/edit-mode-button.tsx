"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EditModeButton({ mode }: { mode?: string }) {
  const searchParams = useSearchParams();

  if (mode === "edit") return null;

  const editUrl = new URLSearchParams(searchParams.toString());
  editUrl.set("mode", "edit");

  return (
    <Link href={`?${editUrl.toString()}`}>
      <Button type="button" variant="outline">
        <SquarePenIcon />
        Edit Details
      </Button>
    </Link>
  );
}
