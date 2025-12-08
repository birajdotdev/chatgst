import { Spinner } from "@/components/ui/spinner";

export function BasicDetailsStepSkeleton() {
  return (
    <div className="flex size-full items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
