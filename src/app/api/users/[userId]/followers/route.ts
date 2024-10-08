import { validateRequest } from "@/auth";
import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { FollowerInfo } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser || !(await hasPermission(loggedInUser, PERMISSIONS.VERIFIED))) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                followers: {
                    where: {
                        followerId: loggedInUser.id
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
                }
            },
        });

        if (!user) return Response.json({ error: "User not found" }, { status: 404 });

        const data: FollowerInfo = {
            followers: user.followers.length,
            isFollowedByUser: !!user.followers.length
        }


        return Response.json(data);
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) return Response.json({ error: "Unauthorized" }, { status: 401 });
        if (loggedInUser.id === userId) return Response.json({ error: "You can't follow yourself" }, { status: 400 });

        await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: loggedInUser.id,
                    followingId: userId
                }
            }, create: {
                followerId: loggedInUser.id,
                followingId: userId
            },
            update: {}
        })

        return new Response(null, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })

    }
}

export async function DELETE(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) return Response.json({ error: "Unauthorized" }, { status: 401 });
        if (loggedInUser.id === userId) return Response.json({ error: "You can't unfollow yourself" }, { status: 400 });

        await prisma.follow.deleteMany({
            where: {
                followerId: loggedInUser.id,
                followingId: userId
            }
        })

        return new Response(null, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}