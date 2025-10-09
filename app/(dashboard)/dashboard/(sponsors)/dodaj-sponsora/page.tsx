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
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function page() {
  const [chooseLogo, setChooseLogo] = useState<File | undefined>(undefined);

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

    try {
      const res = await fetch("/api/sponsors", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error", error);
      toast.error("Błąd połączenia z serwerem.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl mb-10">Dodawanie sponsora</h1>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa sponsora</FormLabel>
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
                        setChooseLogo(file);
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
        {chooseLogo != undefined && (
          <div className="flex items-center justify-center  px-10 py-10">
            <Image
              src={URL.createObjectURL(chooseLogo)}
              width={200}
              height={100}
              alt="Logo sponsora"
            />
          </div>
        )}
      </div>
    </div>
  );
}
