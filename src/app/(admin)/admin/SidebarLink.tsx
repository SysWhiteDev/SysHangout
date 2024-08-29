"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({
  destination,
  children,
}: {
  destination: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === destination;
  return (
    <Link href={destination} className="w-full">
      <div
        className={` ${isActive ? "bg-neutral-300 font-semibold shadow dark:bg-neutral-800" : ""} mb-1.5 flex items-center justify-start gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-neutral-300 hover:shadow dark:hover:bg-neutral-800`}
      >
        {children}
      </div>
    </Link>
  );
}
