import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EditModeButton } from "@/modules/appeal-draft/components/edit-mode-button";

export function BasicDetailsStepSkeleton({
  isEditMode = false,
}: {
  isEditMode?: boolean;
}) {
  return (
    <>
      {!isEditMode && <EditModeButton />}
      <Skeleton
        className={cn(
          "min-h-80 w-full rounded-xl bg-card",
          isEditMode && "min-h-[31.85rem]"
        )}
      />
    </>
  );
}
