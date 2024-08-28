import { validateRequest } from "@/auth";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import UserCard from "@/components/posts/UserCard";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostData, UserData } from "@/lib/types";
import { get } from "http";
import { redirect, useSearchParams } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { user } = await validateRequest();
  if (!user) return null;

  if (!searchParams.q) {
    redirect("/");
  }

  const resultsPosts = await prisma.post.findMany({
    where: {
      OR: [
        { content: { contains: searchParams.q, mode: "insensitive" } },
        {
          user: {
            username: { contains: searchParams.q },
          },
        },
      ],
    },
    include: getPostDataInclude(user.id),
    take: 10,
  });
  const resultsUsers: UserData[] = await prisma.user.findMany({
    where: {
      username: { contains: searchParams.q, mode: "insensitive" },
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
    },
    take: 10,
  });

  if (resultsPosts.length == 0 && resultsUsers.length == 0) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 bg-neutral-100 p-5 py-12 shadow-sm dark:border-neutral-900 dark:bg-black">
          <p className="text-center text-xl font-semibold">
            That search didn&apos;t return any results...
          </p>
          <p className="text-center opacity-70 dark:opacity-50">
            Maybe try something different?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {resultsPosts.length !== 0 ? (
        <>
          <div className="mb-2.5 w-full rounded-xl bg-neutral-300 py-4 text-center text-xl font-semibold dark:bg-neutral-900">
            Posts
          </div>
          <div className="space-y-5">
            {resultsPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : null}
      {resultsUsers.length !== 0 ? (
        <>
          <div className="mb-2.5 mt-5 w-full rounded-xl bg-neutral-300 py-4 text-center text-xl font-semibold dark:bg-neutral-900">
            Users
          </div>
          <div className="space-y-5">
            {resultsUsers.map((user: UserData) => (
              <UserCard user={user} key={user.id} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
