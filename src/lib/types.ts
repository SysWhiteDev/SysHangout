import { Prisma } from "@prisma/client";


export function getUserDataSelect(loggedInUserId: string) {
    return {
        username: true,
        displayName: true,
        avatarUrl: true,
        id: true,
        bio: true,
        followers: {
            where: {
                followerId: loggedInUserId
            },
            select: {
                followerId: true
            }
        },
        following: {
            where: {
                followingId: loggedInUserId
            },
            select: {
                followingId: true
            }
        },
        _count: {
            select: {
                followers: true,
                following: true,
            }
        }
    } satisfies Prisma.UserSelect
}

export function getPostDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: getUserDataSelect(loggedInUserId),
        },
    } satisfies Prisma.PostInclude
}

export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
}>;


export interface PostsPage {
    posts: PostData[];
    nextCursor: string | null;
}

export interface FollowerInfo {
    followers: number;
    isFollowedByUser: boolean;
}