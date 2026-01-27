"use client";

import { useEffect } from "react";

import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";

interface URLUpdaterProps {
  appealId: string;
}

export function URLUpdater({ appealId }: URLUpdaterProps) {
  const { searchParams, setSearchParams } = useSearchParamsContext();

  useEffect(() => {
    if (searchParams.documentId && !searchParams.appealId) {
      setSearchParams({ appealId: appealId }, { shallow: false });
    }
  }, [appealId, searchParams, setSearchParams]);

  return null;
}
