import { validateRequest } from "@/auth";
import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getPostDataInclude, getUserDataSelect, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser || !(await hasPermission(loggedInUser, PERMISSIONS.VERIFIED))) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 5;

        const posts = await prisma.post.findMany({
            where: {
                userId: userId
            },
            include: getPostDataInclude(loggedInUser.id),
            orderBy: { createdAt: "desc" },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined,
        })


        const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

        const data: PostsPage = {
            posts: posts.slice(0, pageSize),
            nextCursor
        }

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }



}