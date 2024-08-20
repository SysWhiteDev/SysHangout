import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendingSidebar from "@/components/TrendingSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
  return (
    <div className="w-full min-w-0 space-y-5">
      <PostEditor />
      <ForYouFeed />
    </div>
  );
}
