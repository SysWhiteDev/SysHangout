"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "bookmarks"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/bookmarks",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<any>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return (
      <div className="w-full">
        <PostsLoadingSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="mx-auto w-full text-center text-destructive">
        An error occurred while trying to load your bookmarks
      </p>
    );
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 bg-neutral-100 p-5 py-12 shadow-sm dark:border-neutral-900 dark:bg-black">
          <p className="text-center text-xl font-semibold">
            Uh oh! It seems you haven&apos;t bookmarked any posts yet...
          </p>
          <p className="text-center opacity-70 dark:opacity-50">
            TIP: you can bookmark posts by clicking the bookmark icon on the
            bottom right of a post
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <InfiniteScrollContainer
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        className="space-y-5"
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {isFetchingNextPage && (
          <Loader2 className="mx-auto my-3 animate-spin" />
        )}
      </InfiniteScrollContainer>
    </div>
  );
}
