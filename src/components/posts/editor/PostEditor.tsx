"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./style.css";
import Link from "next/link";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/LoadingButton";

export default function PostEditor() {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Share something amazing...",
      }),
    ],
    immediatelyRender: false,
  });

  const input = editor?.getText({ blockSeparator: "\n" }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-200 p-5 shadow-sm dark:bg-neutral-900">
      <div className="flex gap-2.5">
        <Link href={`/user/${user.username}`}>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </Link>
        <div className="flex flex-col">
          <Link href={`/user/${user.username}`}>
            <span className="font-semibold hover:underline">
              {user.displayName}
            </span>
          </Link>
          <span className="text-sm font-normal opacity-50">Just now</span>
        </div>
      </div>
      <div>
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-xl bg-neutral-300 px-4 py-2 text-xl dark:bg-neutral-800"
        />
        <div className="mt-2.5 flex justify-end">
          <LoadingButton
            loading={mutation.isPending}
            disabled={!input.trim()}
            onClick={onSubmit}
            className="min-w-20"
          >
            Post
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
