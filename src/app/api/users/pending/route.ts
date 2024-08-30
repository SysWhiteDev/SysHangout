import { validateRequest } from "@/auth";
import { addPermissionToUser, hasPermission, PERMISSIONS } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        const { user } = await validateRequest();
        if (!user || !(await hasPermission(user, PERMISSIONS.ADMIN))) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const users = await prisma.user.findMany({
            where: {
                permissions: 0,
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                email: true,
                createdAt: true,
            }
        })

        return Response.json(users);
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }

}

export async function POST(req: NextRequest) {
    try {
        const { user } = await validateRequest();
        if (!user || !(await hasPermission(user, PERMISSIONS.ADMIN))) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const targetUserID = req.nextUrl.searchParams.get("id") || undefined;
        if (!targetUserID) return Response.json({ error: "Invalid Request" }, { status: 400 });

        const targetUser: any = await prisma.user.findUnique({
            where: {
                id: targetUserID
            }
        });

        await addPermissionToUser(targetUser, PERMISSIONS.VERIFIED);

        return Response.json({ message: "User approved" });

    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest) {
    try {
        const { user } = await validateRequest();
        if (!user || !(await hasPermission(user, PERMISSIONS.ADMIN))) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const targetUserID = req.nextUrl.searchParams.get("id") || undefined;
        if (!targetUserID) return Response.json({ error: "Invalid Request" }, { status: 400 });

        await prisma.user.delete({
            where: {
                id: targetUserID
            }
        });
        return Response.json({ message: "User denied" });
    } catch (error) {
        console.log(error)
        return Response.json({ error: "Internal Server Error" }, { status: 500 })
    }

}