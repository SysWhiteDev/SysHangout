"use client";
import { PostData } from "@/lib/types";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import PostActionButtons from "./PostActionButtons";
import { SeparatorHorizontal } from "lucide-react";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-2.5">
          <Link href={`/user/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div className="flex flex-col">
            <Link href={`/user/${post.user.username}`}>
              <span className="font-semibold hover:underline">
                {post.user.displayName}
              </span>
            </Link>
            <span className="text-sm font-normal opacity-50">
              {formatRelativeDate(post.createdAt)}
            </span>
          </div>
        </div>
        {post.user.id === user.id && <PostMoreButton post={post} />}
      </div>
      <Link href={`/post/${post.id}`}>
        <div className="whitespace-pre-wrap break-words pt-2 text-xl">
          {post.content}
        </div>
      </Link>
      <div className="border-t pt-2.5">
        <PostActionButtons post={post} />
      </div>
    </div>
  );
}
