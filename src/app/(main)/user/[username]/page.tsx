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
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full space-y-1.5 rounded-2xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={200}
          className="mx-auto my-4"
        />
        <div className="flex items-start justify-between pt-5">
          <div className="">
            <p className="text-3xl font-semibold">{user.displayName}</p>
            <p className="opacity-75 dark:opacity-50">@{user.username}</p>
          </div>
        </div>
        <div className="space-x-2.5 pt-2.5">
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
        <div className="pt-2.5">
          <p className="font-semibold">Biography</p>
          <p className="text-sm opacity-90">
            {user.bio || "The user doesn't have a biography"}
          </p>
        </div>
      </div>
    </div>
  );
}
