"use client";

import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

interface UseActionOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: { error: { serverError?: string } }) => void;
}

/**
 * A wrapper around useMutation that provides a similar API to next-safe-action's useAction.
 * This makes migration easier while using TanStack Query under the hood.
 */
export function useAction<TInput, TData, TError = Error>(
  mutationFn: (input: TInput) => Promise<TData>,
  options?: UseActionOptions<TData>
) {
  const mutation = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
    onError: (error: TError) => {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      options?.onError?.({ error: { serverError: message } });
    },
  });

  return {
    execute: mutation.mutate,
    executeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isExecuting: mutation.isPending, // Alias for compatibility
    result: { data: mutation.data },
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Direct re-export of useMutation for cases where the full API is needed
 */
export { useMutation, type UseMutationOptions };
