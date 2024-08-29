import { Prisma } from "@prisma/client";


export function getUserDataSelect(loggedInUserId: string) {
    return {
        username: true,
        displayName: true,
        avatarUrl: true,
        id: true,
        bio: true,
        createdAt: true,
        followers: {
            where: {
                followerId: loggedInUserId
            },
            select: {
                followerId: true
            }
        },
        _count: {
            select: {
                followers: true,
                following: true,
            }
        },
        permissions: true,
    } satisfies Prisma.UserSelect
}

export function getPostDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: getUserDataSelect(loggedInUserId),
        },
        bookmarks: {
            select: {
                id: true,
                postId: true,
                userId: true,
                createdAt: true,
            }
        }
    } as Prisma.PostInclude
}

export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
}>;

export type UserData = {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
}

export interface PostsPage {
    posts: PostData[];
    nextCursor: string | null;
}

export interface FollowerInfo {
    followers: number;
    isFollowedByUser: boolean;
}