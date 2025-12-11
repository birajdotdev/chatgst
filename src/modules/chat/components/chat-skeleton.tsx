import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* User message skeleton */}
      <div className="flex flex-col items-end gap-3">
        <Skeleton className="h-[40px] w-3/4 max-w-[400px] rounded-xl rounded-tr-none" />
      </div>

      {/* Assistant message skeleton */}
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-[80px] w-full max-w-[600px] rounded-xl rounded-tl-none" />
        <Skeleton className="h-[120px] w-full max-w-[550px] rounded-xl" />
      </div>

      {/* User message skeleton */}
      <div className="flex flex-col items-end gap-3">
        <Skeleton className="h-[30px] w-1/2 max-w-[300px] rounded-xl rounded-tr-none" />
      </div>

      {/* Assistant message skeleton */}
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-[150px] w-full max-w-[650px] rounded-xl rounded-tl-none" />
      </div>
    </div>
  );
}
