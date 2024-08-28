import { PostData } from "@/lib/types";
import Bookmark from "./actionbuttons/Bookmark";

export default function PostActionButtons({ post }: { post: PostData}) {
  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div>
        <Bookmark  post={post} />
      </div>
    </div>
  );
}
