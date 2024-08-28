"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import {
  QueryFilters,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { set } from "date-fns";
import { BookmarkIcon } from "lucide-react";
import { pages } from "next/dist/build/templates/app-page";
import { useState } from "react";

export default function Bookmark({ post }: { post: PostData }) {
  const { user } = useSession();
  const { toast } = useToast();
  let isBookmarked = post.bookmarks.some(
    (bookmark: any) => bookmark.userId === user.id,
  );

  const queryClient = useQueryClient();
  const queryFilters: QueryFilters = { queryKey: ["post-feed"] };
  const mutation = useMutation({
    mutationFn: () =>
      isBookmarked
        ? kyInstance.delete(`/api/post/${post.id}/bookmark`)
        : kyInstance.post(`/api/post/${post.id}/bookmark`),
    onMutate: async () => {
      const previousState = queryClient.getQueriesData<any>(queryFilters);

      await queryClient.cancelQueries(queryFilters);

      await queryClient.setQueriesData(queryFilters, (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => {
            return {
              ...page,
              posts: page.posts.map((p: any) => {
                if (p.id === post.id) {
                  return {
                    ...p,
                    bookmarks: isBookmarked
                      ? p.bookmarks.filter(
                          (bookmark: any) => bookmark.userId !== user.id,
                        )
                      : [...p.bookmarks, { userId: user.id }],
                  };
                }
                return p;
              }),
            };
          }),
        };
      });
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueriesData(queryFilters, context?.previousState);
      toast({ description: "Failed to follow the user" });
    },
  });

  return (
    <>
      <BookmarkIcon
        onClick={() => mutation.mutate()}
        color={isBookmarked ? "red-500" : "#fff"}
        className={`cursor-pointer ${isBookmarked ? "!fill-red-500" : ""}`}
        size={24}
      />
    </>
  );
}
