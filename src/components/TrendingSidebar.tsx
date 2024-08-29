import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import Badges from "./Badges";

export default function TrendingSidebar() {
  return (
    <div className="sticky top-[98px] hidden h-fit w-60 flex-none space-y-5 md:block xl:w-80">
      <Suspense fallback={<Loader2 className="!my-0 mx-auto animate-spin" />}>
        <TrendingUsers />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function TrendingUsers() {
  const { user } = await validateRequest();
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="rounded-xl bg-neutral-200 px-4 py-4 shadow-sm dark:bg-neutral-900 lg:px-4 xl:w-80">
      <div className="mb-4 text-xl font-semibold">Who to follow</div>
      <div className="space-y-3">
        {usersToFollow.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 bg-neutral-100 p-5 py-6 shadow-sm dark:border-neutral-900 dark:bg-black">
            <p className="mx-auto text-center font-semibold">
              No suggested users
            </p>
            <p className="mx-auto text-center text-sm opacity-70 dark:opacity-50">
              Check again in a few hours...
            </p>
          </div>
        )}
        {usersToFollow.map((user: any) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4"
          >
            <Link
              href={`/user/${user.username}`}
              className="group flex flex-none items-center gap-2.5"
            >
              <UserAvatar
                avatarUrl={user.avatarUrl}
                className="hidden flex-none xl:block"
              />
              <div>
                <span className="flex items-center gap-1 truncate font-semibold group-hover:underline">
                  <p className="truncate">{user.displayName}</p>{" "}
                  <Badges user={user} />
                </span>
                <p className="truncate text-sm font-normal opacity-70 dark:opacity-50">
                  @{user.username}
                </p>
              </div>
            </Link>
            {/* <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  (follower: any) => follower.followerId === user.id,
                ),
              }}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts 
    GROUP by (hashtag)
    ORDER by count DESC, hashtag ASC
    LIMIT 5
  `;
    return result.map((row: any) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="rounded-xl bg-neutral-200 px-4 py-4 shadow-sm dark:bg-neutral-900 lg:px-4 xl:w-80">
      <div className="mb-4 text-xl font-semibold">Trending topics</div>
      <div className="space-y-4">
        {trendingTopics.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 bg-neutral-100 p-5 py-6 shadow-sm dark:border-neutral-900 dark:bg-black">
            <p className="mx-auto text-center font-semibold">
              No trending hashtags
            </p>
            <p className="mx-auto text-center text-sm opacity-70 dark:opacity-50">
              Start a trend, use a hashtag!
            </p>
          </div>
        )}
        {trendingTopics.map(({ hashtag, count }: any) => {
          const title = hashtag.split("#")[1];
          return (
            <Link key={title} href={`/hashtag/${title}`} className="block">
              <p
                className="truncate font-semibold hover:underline"
                title={hashtag}
              >
                {hashtag}
              </p>
              <p className="truncate text-sm opacity-70 dark:opacity-50">
                {formatNumber(count)} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
