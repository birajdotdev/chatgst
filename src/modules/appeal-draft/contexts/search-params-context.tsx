"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

import { useNavigate } from "@tanstack/react-router";

import type { AppealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";

interface SearchParamsContextValue {
  searchParams: AppealDraftSearchParams;
  setSearchParams: (
    updates: Partial<AppealDraftSearchParams>,
    options?: { shallow?: boolean }
  ) => void;
  get: <K extends keyof AppealDraftSearchParams>(
    key: K
  ) => AppealDraftSearchParams[K];
  all: () => AppealDraftSearchParams;
}

const SearchParamsContext = createContext<SearchParamsContextValue | null>(
  null
);

interface SearchParamsProviderProps {
  children: React.ReactNode;
  searchParams: AppealDraftSearchParams;
}

export function SearchParamsProvider({
  children,
  searchParams,
}: SearchParamsProviderProps) {
  const navigate = useNavigate();

  const setSearchParams = useCallback(
    (
      updates: Partial<AppealDraftSearchParams>,
      options?: { shallow?: boolean }
    ) => {
      // Convert null values to undefined for clearing params
      const cleanedUpdates = Object.fromEntries(
        Object.entries(updates).map(([key, value]) => [
          key,
          value === null ? undefined : value,
        ])
      );

      navigate({
        to: "/appeal-draft",
        search: (prev) => ({
          ...prev,
          ...cleanedUpdates,
        }),
        replace: options?.shallow ?? true,
      });
    },
    [navigate]
  );

  const get = useCallback(
    <K extends keyof AppealDraftSearchParams>(
      key: K
    ): AppealDraftSearchParams[K] => {
      return searchParams[key];
    },
    [searchParams]
  );

  const all = useCallback(() => searchParams, [searchParams]);

  const value = useMemo(
    () => ({
      searchParams,
      setSearchParams,
      get,
      all,
    }),
    [searchParams, setSearchParams, get, all]
  );

  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useSearchParamsContext must be used within a SearchParamsProvider"
    );
  }
  return context;
}

// Compatibility layer for nuqs-style APIs
export function useAppealDraftSearchParams() {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  return [searchParams, setSearchParams] as const;
}

// For server components / cache-like access (though not actually cached in TanStack)
export const appealDraftSearchParamsCache = {
  get: <K extends keyof AppealDraftSearchParams>(
    _key: K
  ): AppealDraftSearchParams[K] | undefined => {
    // This will be overridden by actual context usage
    // Components using this should migrate to useSearchParamsContext
    throw new Error(
      "appealDraftSearchParamsCache.get() cannot be used outside of SearchParamsProvider. Use useSearchParamsContext() instead."
    );
  },
  all: (): AppealDraftSearchParams => {
    throw new Error(
      "appealDraftSearchParamsCache.all() cannot be used outside of SearchParamsProvider. Use useSearchParamsContext() instead."
    );
  },
};
