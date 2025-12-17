import { Skeleton } from "@/components/ui/skeleton";
import { AlertMessage } from "@/modules/appeal-draft/components/alert-message";

export function ReferenceSectionSkeleton() {
  return (
    <>
      <AlertMessage message="Analyzed 0 legal authorities from our comprehensive GST database." />
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/6 rounded-full bg-card" />
        <Skeleton className="h-6 w-[100px] rounded-full bg-card" />
      </div>
      <section className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-96 w-full rounded-xl bg-card" />
        ))}
      </section>
    </>
  );
}
