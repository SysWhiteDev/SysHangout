"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action={"/search"}>
      <div className="group relative">
        <Input
          name="q"
          autoComplete="off"
          placeholder="Find anything..."
          className="truncate bg-neutral-100 pe-10 transition-all focus:w-[500px] group-hover:w-[500px] dark:bg-neutral-900"
        ></Input>
        <button
          type="submit"
          className="absolute right-0 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground"
        >
          <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}
