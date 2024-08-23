import Bookmark from "./actionbuttons/Bookmark";

export default function PostActionButtons({ postId }: { postId: string }) {
  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div>
        <Bookmark postId={postId} />
      </div>
    </div>
  );
}
