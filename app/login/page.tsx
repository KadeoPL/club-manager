import React from "react";
import { LoginForm } from "@/components/ui/loginForm";

export default function page() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-1/3 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
