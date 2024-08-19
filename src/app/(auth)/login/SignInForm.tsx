"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema, SignInValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";

export default function SignInForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(values);
      if (error) setError(error);
    });
  };

  return (
    <Form {...form}>
      <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Username</FormLabel>
              <FormControl className="!mt-0.5">
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="!space-y-0">
              <FormLabel>Password</FormLabel>
              <FormControl className="!mt-0.5 !space-y-0">
                <PasswordInput
                  type="password"
                  className="!mt-0.5"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          className="mt-6 w-full"
          type="submit"
        >
          Log in
        </LoadingButton>
        {error && <p className="text-sm font-semibold text-destructive">{error}</p>}

      </form>
    </Form>
  );
}
