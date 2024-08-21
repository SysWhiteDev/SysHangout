"use client";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();
  return (
    <div className={className}>
      <Button
        variant={pathname === "/" ? "secondary" : "ghost"}
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/notifications" ? "secondary" : "ghost"}
        className="flex items-center justify-start gap-3"
        title="Notifcations"
        asChild
      >
        <Link href="/notifications">
          <Bell />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/bookmarks" ? "secondary" : "ghost"}
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
