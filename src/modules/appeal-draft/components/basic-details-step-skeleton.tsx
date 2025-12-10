import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function BasicDetailsStepSkeleton({
  isEditMode = false,
}: {
  isEditMode?: boolean;
}) {
  return (
    <>
      {!isEditMode && (
        <Skeleton className="min-h-9 min-w-[120px] rounded-md bg-card" />
      )}
      <Skeleton
        className={cn(
          "min-h-80 w-full rounded-xl bg-card",
          isEditMode && "min-h-[31.85rem]"
        )}
      />
    </>
  );
}
