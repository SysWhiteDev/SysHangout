import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendingSidebar from "@/components/TrendingSidebar";
import prisma from "@/lib/prisma";
import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";

export default function Home() {
  return (
    <div className="w-full min-w-0 space-y-5">
      <PostEditor />
      <Tabs defaultValue={"for-you"}>
        <TabsList className="w-full">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <ForYouFeed />
        </TabsContent>
        <TabsContent value="following">
          <FollowingFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
}
