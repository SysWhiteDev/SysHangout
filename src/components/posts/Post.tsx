import { PostData } from "@/lib/types";
import UserAvatar from "../UserAvatar";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
      <div className="flex gap-2.5">
        <UserAvatar
          avatarUrl={post.user.avatarUrl}
        />
        <div className="flex flex-col">
          <span className="font-semibold">{post.user.displayName}</span>
          <span className="opacity-50">@{post.user.username}</span>
        </div>
      </div>
      <div>
        <p className="max-h-[20rem] w-full overflow-y-auto rounded-xl pt-2 text-xl">
          {post.content}
        </p>
      </div>
    </div>
  );
}
