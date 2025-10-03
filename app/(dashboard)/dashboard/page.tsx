"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function page() {
  const router = useRouter();

  return (
    <div>
      Dashboard
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
        Strona główna
      </Button>
    </div>
  );
}
