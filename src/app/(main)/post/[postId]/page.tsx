import { validateRequest } from "@/auth";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export default async function Page({ params: {postId} }: { params: { postId: string } }) {
  const { user } = await validateRequest();
  if (!user) return null;

  const post: any = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: getPostDataInclude(user.id),
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="w-full">
      <Post post={post} />
    </div>
  );
}
