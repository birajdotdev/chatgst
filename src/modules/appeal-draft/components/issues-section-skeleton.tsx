import { Skeleton } from "@/components/ui/skeleton";
import { AlertMessage } from "@/modules/appeal-draft/components/alert-message";

export function IssuesSectionSkeleton() {
  return (
    <>
      <AlertMessage message="Identifying potential issues using legal pattern recognition..." />
      <section className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-72 w-full rounded-xl bg-card" />
        ))}
      </section>
    </>
  );
}
