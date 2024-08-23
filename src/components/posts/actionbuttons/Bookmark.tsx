"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { set } from "date-fns";
import { BookmarkIcon } from "lucide-react";
import { pages } from "next/dist/build/templates/app-page";
import { useState } from "react";

export default function Bookmark({ post }: { post: PostData }) {
  const { user } = useSession();
  const { toast } = useToast();
  let [isBookmarked, setIsBookmarked] = useState(
    post.bookmarks.some((bookmark) => bookmark.userId === user.id),
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      !isBookmarked
        ? kyInstance.delete(`/api/post/${post.id}/bookmark`)
        : kyInstance.post(`/api/post/${post.id}/bookmark`),
    onMutate: async () => {
      const queryKey: QueryKey = ["posts-feed"];
      const previousState = queryClient.getQueryData<any>(queryKey);
      setIsBookmarked(!isBookmarked);
      return { previousState };
    },
    onError(error, variables, context) {
      setIsBookmarked(
        post.bookmarks.some((bookmark) => bookmark.userId === user.id),
      );
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
