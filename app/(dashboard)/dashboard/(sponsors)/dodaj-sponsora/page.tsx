"use client";
import React from "react";
import { addSponsorSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function page() {
  const form = useForm<z.infer<typeof addSponsorSchema>>({
    resolver: zodResolver(addSponsorSchema),
    defaultValues: {
      name: "",
      logo: undefined,
      isPartnership: false,
    },
  });

  async function onSubmit(values: z.infer<typeof addSponsorSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("isPartnership", values.isPartnership.toString());
    if (values.logo && values.logo instanceof File) {
      formData.append("logo", values.logo);
    }

    const res = await fetch("/api/sponsors", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("File uploaded:", data);
  }

  return (
    <div>
      <h1 className="text-2xl mb-10">Dodawanie sponsora</h1>
      <div className="w-full md:w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input placeholder="Wpisz nazwę sponsora" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo sponsora</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPartnership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Czy sponsor jest partnerem?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Dodaj</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
