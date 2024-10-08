"use server"

import { lucia, validateRequest } from "@/auth"
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
    const { session } = await validateRequest();
    if (!session) {
        throw new Error("Unauthorized");
    };
    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/login")
}

export async function getTotalUserCount() {
    return await prisma.user.count();
}