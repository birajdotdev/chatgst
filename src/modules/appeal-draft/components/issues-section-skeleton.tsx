import { Skeleton } from "@/components/ui/skeleton";

export function IssuesSectionSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-1/3 rounded-full bg-card" />
      <section className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-72 w-full rounded-xl bg-card" />
        ))}
      </section>
    </>
  );
}
