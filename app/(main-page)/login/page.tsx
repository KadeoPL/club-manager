"use client";

import React from "react";
import LoginForm from "@/components/main-page-ui/loginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (status === "authenticated") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-primary">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
