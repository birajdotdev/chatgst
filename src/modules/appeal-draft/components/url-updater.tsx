"use client";

import { useEffect } from "react";

import { useQueryStates } from "nuqs";

import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";

interface URLUpdaterProps {
  appealId: string;
}

export function URLUpdater({ appealId }: URLUpdaterProps) {
  const [params, setParams] = useQueryStates(appealDraftSearchParams);

  useEffect(() => {
    if (params.documentId && !params.appealId) {
      setParams({ appealId: appealId }, { shallow: false });
    }
  }, [appealId, params, setParams]);

  return null;
}
