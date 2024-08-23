import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 5;

        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) return Response.json({ error: "Unauthorized" }, { status: 401 });


        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: loggedInUser.id
            },
            orderBy: { createdAt: "desc" },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined,
        });

        const nextCursor = bookmarks.length > pageSize ? bookmarks[pageSize].id : null;

        return Response.json({
            bookmarks: bookmarks.slice(0, pageSize),
            nextCursor
        });
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


export async function POST(req: Request, { params: { postId } }: { params: { postId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) return Response.json({ error: "Unauthorized" }, { status: 401 });

        console.log(postId)

        await prisma.bookmark.upsert({
            where: {
                postId_userId: {
                    userId: loggedInUser.id,
                    postId: postId
                }
            },
            create: {
                userId: loggedInUser.id,
                postId: postId
            },
            update: {}
        });

        return new Response(null, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params: { postId } }: { params: { postId: string } }) {
    try {
        const { user: loggedInUser } = await validateRequest();
        if (!loggedInUser) return Response.json({ error: "Unauthorized" }, { status: 401 });

        await prisma.bookmark.deleteMany({
            where: {
                userId: loggedInUser.id,
                postId: postId
            },
        });

        return new Response(null, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }
}