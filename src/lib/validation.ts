import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().trim().min(1, "Required").email("Invalid email address"),
    username: z.string().trim().min(1, "Required").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string().min(6, "Must be at least 6 characters long"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    username: z.string().trim().min(1, "Required"),
    password: z.string().trim().min(1, "Required"),
})

export type SignInValues = z.infer<typeof signInSchema>;

export const createPostSchema = z.object({
    content: z.string().trim().min(1, "Required").max(256, "Must can be maximum 256 characters long"),
});
