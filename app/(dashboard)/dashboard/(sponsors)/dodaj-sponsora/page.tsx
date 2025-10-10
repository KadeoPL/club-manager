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
import { useDropzone } from "react-dropzone";

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
        form.reset();
        setChooseLogo(undefined);
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
              render={({ field }) => {
                const { getRootProps, getInputProps, isDragActive } =
                  useDropzone({
                    maxFiles: 1,
                    accept: {
                      "image/png": [".png"],
                      "image/jpeg": [".jpeg", ".jpg"],
                    },
                    onDrop: (acceptedFiles) => {
                      const file = acceptedFiles[0];

                      field.onChange(file);

                      setChooseLogo(file);
                    },
                  });

                const handleRemoveFile = () => {
                  field.onChange(undefined);
                  setChooseLogo(undefined);
                };

                return (
                  <FormItem>
                    <FormLabel>Logo sponsora</FormLabel>
                    <FormControl>
                      {!chooseLogo ? (
                        <div
                          {...getRootProps()}
                          className={`
                flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer 
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }
              `}
                        >
                          <input {...getInputProps()} />

                          <p className="text-gray-600">
                            {isDragActive
                              ? "Upuść plik tutaj..."
                              : "Przeciągnij i upuść logo lub kliknij, aby wybrać plik"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG/JPEG (max 1 plik)
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 p-3 border rounded-md">
                          <Image
                            src={URL.createObjectURL(chooseLogo)}
                            alt="Podgląd logo"
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                          <span className="flex-1 text-sm truncate">
                            {chooseLogo.name}
                          </span>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveFile}
                          >
                            Usuń
                          </Button>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
