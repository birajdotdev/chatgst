import { Skeleton } from "@/components/ui/skeleton";

export function DraftStepSkeleton() {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex items-center gap-2 border-b p-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
      <div className="space-y-4 p-4">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[88%]" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-[94%]" />
        <Skeleton className="h-4 w-[91%]" />
      </div>
    </div>
  );
}
