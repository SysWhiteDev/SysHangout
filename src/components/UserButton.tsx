"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import {
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Shield,
  Sun,
  UserIcon,
} from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";
import Badges from "./Badges";
import { User } from "@prisma/client";
import { PERMISSIONS } from "@/lib/permissions";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button className="flex-none rounded-full">
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="overflow-hidden rounded-t-xl p-0">
          <div className="flex items-end p-2">
            <UserAvatar
              avatarUrl={user.avatarUrl}
              size={40}
              className="mr-1.5 shadow-md"
            />
            <div>
              <span className="flex items-center gap-1 font-semibold">
                {user.displayName}
                <Badges user={user as User} />
              </span>
              <p className="text-sm font-normal opacity-70 dark:opacity-50">
                {" "}
                @{user.username}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        {((user.permissions as any) & PERMISSIONS.ADMIN) ===
          PERMISSIONS.ADMIN && (
          <>
            <DropdownMenuSeparator />
            <Link href={`/admin`}>
              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 size-4" />
                Admin Panel
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSeparator />
        <Link href={`/user/${user.username}`}>
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            signOut();
          }}
          className="cursor-pointer text-destructive text-red-700 dark:text-red-400"
        >
          <LogOutIcon className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
