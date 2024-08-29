import { validateRequest } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import FollowersCounter from "@/components/FollowersCounter";
import { formatNumber } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { formatDate } from "date-fns";
import FollowButton from "@/components/FollowButton";
import UserPosts from "./UserPosts";
import Badges from "@/components/Badges";
import { User } from "@prisma/client";

interface PageProps {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) {
    notFound();
  }

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser)
    return (
      <p className="mx-auto text-center text-destructive">
        You are not authorized to view this page.
      </p>
    );

  const user = await getUser(username, loggedInUser.id);

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <div className="w-full space-y-1.5 rounded-xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <UserAvatar
              avatarUrl={user.avatarUrl}
              size={60}
              className="mx-auto"
            />
            <div className="">
              <span className="flex items-center gap-1 text-2xl font-semibold">
                {user.displayName}
                <Badges user={user as any} />
              </span>
              <p className="opacity-75 dark:opacity-50">@{user.username}</p>
            </div>
          </div>
          {user.id !== loggedInUser.id && (
            <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  (follower: any) => follower.followerId === user.id,
                ),
              }}
            />
          )}
        </div>

        <div className="pt-3">
          <p className="font-semibold">Biography</p>
          <p className="text-sm opacity-90">
            {user.bio || "The user doesn't have a biography"}
          </p>
        </div>
        <div className="space-x-2.5 pt-4">
          <FollowersCounter
            userId={user.id}
            initialState={{ followers: 0, isFollowedByUser: false }}
          />
          <span>
            Following:
            <span className="font-bold">
              {" "}
              {formatNumber(user._count.following)}
            </span>
          </span>
        </div>
        <div className="">
          <p className="flex items-center gap-2 text-sm opacity-40">
            <Calendar className="size-4" />
            Joined on {formatDate(new Date(user.createdAt), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
      <div className="w-full space-y-3">
        <div className="w-full rounded-xl bg-neutral-300 py-4 text-center text-xl font-semibold dark:bg-neutral-900">
          This user&apos;s posts
        </div>
        <UserPosts userId={user.id} />
      </div>
    </div>
  );
}
