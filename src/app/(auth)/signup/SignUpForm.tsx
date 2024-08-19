"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        setError(error);
        return;
      }
    });
  }

  return (
    <Form {...form}>
      <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Username</FormLabel>
              <FormControl className="!mt-0.5">
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-1">
              <FormLabel>E-mail</FormLabel>
              <FormControl className="!mt-0.5">
                <Input placeholder="E-mail" {...field} />
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
          Create account
        </LoadingButton>
        {error && (
          <p className="text-sm font-semibold text-destructive">{error}</p>
        )}
      </form>
    </Form>
  );
}
