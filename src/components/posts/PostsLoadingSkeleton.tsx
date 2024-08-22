import { Skeleton } from "../ui/skeleton";

export default function PostsLoadingSkeleton() {
  return (
    <div className="space-y-5 !mt-2.5">
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
}

function PostLoadingSkeleton() {
  return (
    <div className="w-full p-5 animate-pulse space-y-3 rounded-xl bg-neutral-200 shadow-sm dark:bg-neutral-900">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
}
