import { PostData, PostsPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { DeletePost } from "./actions";

export function useDeletePostMutation() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: DeletePost,
        onSuccess: async (deletedPost) => {
            const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if (!oldData) return;

                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            posts: page.posts.filter(post => post.id !== deletedPost.id),
                            nextCursor: page.nextCursor
                        }))
                    }
                }
            )

            toast({ description: "Post deleted" });

            if (pathname === `/posts/${deletedPost.id}`) {
                router.push("/");
            }
        },
        onError: (error) => {
            console.log(error);
            toast({ variant: "destructive", description: "An unknown error occurred while deleting the post" });
        }
    });


    return mutation;
}