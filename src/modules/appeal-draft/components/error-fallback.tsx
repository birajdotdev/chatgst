"use client";

import { CircleXIcon, RotateCcwIcon } from "lucide-react";
import { FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Empty className="w-full rounded-xl bg-card">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="bg-destructive text-destructive-foreground dark:bg-destructive/60"
        >
          <CircleXIcon />
        </EmptyMedia>
        <EmptyTitle>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </EmptyTitle>
        <EmptyDescription>
          Please try again or contact support if the problem persists.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="destructive" onClick={resetErrorBoundary}>
          <RotateCcwIcon />
          Try Again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
