import { PostData } from "@/lib/types";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
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
      <Link href={`/post/${post.id}`}>
        <div>
          <p className="max-h-[20rem] w-full whitespace-pre-line overflow-y-auto pt-2 text-xl">
            {post.content}
          </p>
        </div>
      </Link>
    </div>
  );
}
