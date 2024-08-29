import { User } from "@prisma/client";
import prisma from "./prisma";

export const PERMISSIONS = {
    VERIFIED: 1 << 0,
    ADMIN: 1 << 1,
}

export async function addPermissionToUser(user: User, permission: number) {
    const userResult = await prisma.user.update({
        where: { id: user.id },
        data: {
            permissions: {
                set: user.permissions | permission,
            },
        },
    });

    if (!userResult) {
        throw new Error("User not found");
    }

    return userResult;
}

export async function removePermissionFromUser(user: any, permission: number) {
    const userResult = await prisma.user.update({
        where: { id: user.id },
        data: {
            permissions: {
                set: user.permissions & ~permission,
            },
        },
    });

    if (!userResult) {
        throw new Error("User not found");
    }

    return userResult;
}

export async function hasPermission(user: any, permission: number) {
    return (user.permissions & permission) === permission;
}