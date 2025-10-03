"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { name, password } = values;

    const result = await signIn("credentials", {
      redirect: false,
      name,
      password,
    });

    if (result?.error) {
      form.setError("root", {
        type: "server",
        message: "Nieprawidłowy login lub hasło",
      });
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full max-w-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white aria-invalid:text-red-200">
                Login
              </FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-gray-300 placeholder:font-light text-white font-bold py-6 "
                  placeholder="Wpisz swój login"
                  {...field}
                />
              </FormControl>
              <FormMessage className="bg-red-100 p-2 rounded-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Hasło</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-gray-300 placeholder:font-light text-white font-bold py-6"
                  type="password"
                  placeholder="Wpisz swoje hasło"
                  {...field}
                />
              </FormControl>
              <FormMessage className="bg-red-100 p-2 rounded-sm" />
            </FormItem>
          )}
        />
        <Button
          className="bg-white text-primary w-full cursor-pointer py-6 hover:bg-transparent border-2 border-white hover:text-white transition-all duration-500 ease-in-out mt-5"
          type="submit"
        >
          Zaloguj
        </Button>
      </form>
      {form.formState.errors.root && (
        <p className="text-sm text-destructive mt-4 bg-red-100 p-2 rounded-sm w-full max-w-sm">
          {form.formState.errors.root.message}
        </p>
      )}
    </Form>
  );
}
