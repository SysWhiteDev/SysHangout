import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { UserData } from "@/lib/types";

export default async function UserCard({ user }: { user: UserData }) {
  return (
    <Link
      href={`/user/${user.username}`}
      className="flex flex-col group gap-2.5 rounded-xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900"
    >
      <div className="flex gap-2.5">
        <Link href={`/user/${user.username}`}>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </Link>
        <div className="flex flex-col">
          <Link href={`/user/${user.username}`}>
            <span className="font-semibold group-hover:underline">
              {user.displayName}
            </span>
          </Link>
          <span className="text-sm font-normal opacity-50">
            @{user.username}
          </span>
        </div>
      </div>
    </Link>
  );
}
