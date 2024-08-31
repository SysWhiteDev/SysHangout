"use server"

import { validateRequest } from "@/auth"
import { hasPermission, PERMISSIONS } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
    const { user } = await validateRequest();

    if (!user || !(await hasPermission(user, PERMISSIONS.VERIFIED))) {
        throw new Error("Unauthorized");
    }

    const { content } = createPostSchema.parse({ content: input });

    const newPost = await prisma.post.create({
        data: {
            content,
            userId: user.id
        },
        include: getPostDataInclude(user.id)
    });

    return newPost;
}