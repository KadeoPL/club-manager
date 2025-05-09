"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Login musi mieć co najmniej 3 znaki" })
    .max(50, { message: "Login nie może mieć więcej niż 50 znaków" })
    .nonempty({ message: "Login jest wymagany" }),

  email: z
    .string()
    .email({ message: "Podaj poprawny adres e-mail" })
    .nonempty({ message: "Adres e-mail jest wymagany" }),

  password: z
    .string()
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
    .regex(/[A-Z]/, { message: "Hasło musi zawierać wielką literę" })
    .regex(/[a-z]/, { message: "Hasło musi zawierać małą literę" })
    .regex(/[0-9]/, { message: "Hasło musi zawierać cyfrę" })
    .regex(/[^A-Za-z0-9]/, { message: "Hasło musi zawierać znak specjalny" }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[300px] w-1/4"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input
                  className="text-xs md:text-sm"
                  placeholder="Wprowadź nazwę użytkownika"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  className="text-xs md:text-sm"
                  placeholder="Wprowadź swój adres e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input
                  className="text-xs md:text-sm"
                  placeholder="Wybierz silne hasło (min. 8 znaków, cyfry i litery)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Wyślij
        </Button>
      </form>
    </Form>
  );
}
